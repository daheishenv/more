<template>
    <view class="phone-content">
        <!-- 预览组件 -->
        <!-- <view
            v-show="showComponentPreview"
            class="tip-content-show"
        >
            <view class="tip-content-show-content">
                <template v-if="componentPreviewName !== 'myComponent'">
                    <component
                        :is="componentPreviewName"
                        :isPreview="true"
                        :config="getConfig_(componentPreviewConfig)"
                    ></component>
                </template>
                <template v-if="componentPreviewName === 'myComponent'">
                    <my-components-entity :list="myComponentPreviewData"></my-components-entity>
                </template>
            </view>
        </view> -->
        <!-- <sub-home-define-form /> -->
        <scroll-view
            scroll-y
            class="phone"
            id="phone-scroll-view"
            ref="contextMenuTarget"
            @scroll="pageScroll"
            :scroll-top="pageScrollTop_"
            :scroll-with-animation="scrollAnimation_"
            :style="[phoneSize_]"
        >
            <div id="phone-scroll-container">
                <draggable
                    class="phone-draggable"
                    :list="pageList_"
                    :style="[bgStyle_]"
                    group="components"
                    animation="100"
                    ghostClass="sortable-ghost"
                    :options="{
                    forceFallback: true
                }"
                    :distance="1"
                    @change="draggableChange"
                    @choose="chooseDragComponent"
                >
                    <!-- 这个组件是为了解决点击事件失效问题 -->
                    <ComponentItem
                        v-for="(item,index) in pageList_"
                        :key="index"
                        :id="item.module_name === 'header' ? ('home-' + item.module_name) : ('cmpt-' + item.module_no)"
                        @selected="selComponent(index)"
                    >
                        <component
                            class="drag-component"
                            :class="{
                        'drag-component--active': activeIndex === index,
                        'drag-component--header': item.fixed === 'top',
                        'drag-component--float': item.fixed === 'float' || item.cmptId === 'sub-home-header-cate'
                    }"
                            :data-name="item.name"
                            :data-remark="item.extra.componentRemarks"
                            :is="item.componentName"
                            :data-fixed="item.fixed"
                            :data-module-name="item.module_name"
                            :data-module-no="item.module_no"
                            :data-cmpt-id="item.cmptId"
                            :data-index="index"
                            v-bind="item"
                            :config="item"
                        >
                        </component>
                    </ComponentItem>
                </draggable>
            </div>
        </scroll-view>

        <!-- iphone8高度提示 -->
        <view class="phone-8-tip">iPhone 8手机高度</view>

        <!-- 屏蔽托拉拽组件的右键操作 -->
        <!-- <vue-context-menu
            class="right-menu"
            :target="contextMenuTarget"
            :show="contextMenuVisible"
            @update:show="contextMenuVisibleFun"
        > -->
        <!-- <a
                href="javascript:"
                @click="deleteDataIndex"
            >删除</a> -->
        <!-- </vue-context-menu> -->

        <c-modal
            v-model="modalFlag"
            title="是否继续上一次操作？"
            @confirm="handleConfirm"
            @cancel="handleCancel"
        ></c-modal>
    </view>
</template>

<script>
import draggable from '@/utils/vuedraggable'
//TODO 本地引用了vue-context-menu，添加一项鼠标右键时顶层元素点输出。解决在拖拽区域内右键删除非布局元素时无法定位到具体的元素问题
import { component as VueContextMenu } from '@/utils/vue-context-menu'
import MyComponentsEntity from '../LeftComponents/ComponentContainer/MyComponents/MyComponentsEntity'
// import { getCachesFolder } from '@/utils/localStore'
import { getQueryVariable, getDragNode } from '@/utils/utils'
import ComponentItem from './ComponentItem'
export default {
    name: 'PhoneFrame',
    props: {
    },
    watch: {
    },
    data() {
        return {
            contextMenuTarget: undefined,
            contextMenuVisible: false,
            dragging: false,
            modalFlag: false,
            status: 0,
            activeIndex: -1
        }
    },
    mounted() {
        this.contextMenuTarget = this.$refs.contextMenuTarget.$el
    },
    created() {
        this.isDrafts()
    },
    methods: {
        deleteComponent(index) {
            this.delComponent(index);
        },
        pageScroll({ detail: { scrollTop } }) {
            uni.$emit('pageScroll', {
                scrollTop
            })
        },
        // 是否存在草稿箱
        async isDrafts() {
            this.$loading()
            const isChangeHome = getQueryVariable('is_change_home')
            // 切换模板
            if (isChangeHome == 1) {
                this.$store.dispatch('getModuleList', 1)
                this.$hideLoading()
            } else {
                const { data } = await this.$http('isDrafts', {
                    page_id: this.$store.state.page_id
                })
                this.$hideLoading()
                this.status = data.status
                if (data.status == 1) {
                    this.modalFlag = true
                } else {
                    this.$store.dispatch('getModuleList', data.status)
                }
            }

        },
        // 确认进入草稿箱
        handleConfirm() {
            this.$store.dispatch('getModuleList', 1)
        },
        handleCancel() {
            this.$store.dispatch('getModuleList', 0)
        },
        contextMenuVisibleFun({ show, dataset }) {
            if (dataset && dataset['iIndex'] !== undefined) {
                this.$store.dispatch('setTempCurrentCheckIndex', dataset['iIndex'])
            } else {
                // 避免点击布局元素高亮处后，鼠标又移至背景面板而右键删除的不合理
                this.$store.dispatch('clearCurrentCheckIndex', '')
            }

            //二开 如果是默认布局元素,删除框不显示
            if (dataset && dataset['nodel'] && dataset['nodel'] == 1) {
                return
            }
            //
            this.contextMenuVisible = show
        },
        deleteDataIndex() {
            // do delete action
            if (this.$store.state.currentCheckAttr.currentCheckIndex === '') {
                this.$notify({
                    title: '请先选取元素!',
                    message: '右键删除请将鼠标移至元素，布局内若有元素，优先删除布局内元素。若要删除布局元素，请将鼠标移至布局元素上方高亮处再右键。',
                    type: 'warning'
                })
            } else {
                this.$store.dispatch('deleteCurrentCheckeAttr')
            }
            this.contextMenuVisibleFun(false)
            this.activeIndex = -1
        },
        computedClassToStyle(classNames) {
            let style = {}
            classNames.forEach(e => {
                style = { ...style, ...this.customClass[e] }
            })
            return style
        },

        /**
         * @name: 删除组件按钮事件
         * @param {Number} index 组件的索引
         */
        async delComponent(index) {
            await this.$store.dispatch('deleteCurrentCheckeAttr')
            // 删除当前，默认选中上一个
            this.activeIndex = index - 1
            this.$store.dispatch('setCurrentCheckAttr', this.activeIndex)
        },
        /**
         * @name: 选中组件按钮事件
         * @param {Object,Number} evt 选中的组件信息
         */
        selComponent(index) {
            this.$store.dispatch('setCurrentCheckAttr', index, this.activeIndex)
            this.activeIndex = index
        },
        // 浮动组件删除
        chooseDragComponent(evt) {
            // 手动选择才有改属性，才有可能进入删除方法
            if (evt.originalEvent && evt.oldDraggableIndex > 0) {
                if (getDragNode(evt.item).dataset['fixed'] !== "float") return
                const delSize = {
                    width: 18,
                    height: 20
                }
                const { target: { offsetWidth: elWidth }, layerX, layerY } = evt.originalEvent
                // 这边点击了删除按钮
                if (evt.oldDraggableIndex !== undefined && elWidth - delSize.width <= layerX && layerY <= delSize.height) {
                    // this.delComponent(evt.oldDraggableIndex)
                    this.$store.commit('REMOVE_PAGE_ITEM', { index: evt.oldDraggableIndex })
                }
            }
        },
        /**
         * 拖拽改变,这边会先执行chooseComponent导致拖拽有点卡死(要去掉choose事件)
         * @param e
         */
        async draggableChange(e) {
            this.activeIndex = e.added ? e.added.newIndex : e.moved.newIndex
            if (e.added) {
                await this.$store.dispatch('addItemList', { index: e.added.newIndex, data: e.added.element })
            } else if (e.moved) {
                await this.$store.dispatch('moveItemList', { newIndex: e.moved.newIndex, oldIndex: e.moved.oldIndex })
            }
        }
    },
    computed: {
        // 页面滚动动画
        scrollAnimation_() {
            return this.$store.state.project.scrollAnimation
        },
        // 页面滚动距离
        pageScrollTop_() {
            return this.$store.state.project.pageScrollTop
        },
        myComponentPreviewData() {
            return this.$store.state.myComponentPreviewData
        },
        componentPreviewName() {
            return this.$store.state.componentPreviewName
        },
        // 获取预览组件传入的所有参数
        componentPreviewConfig() {
            return this.$store.state.componentPreviewConfig
        },
        showComponentPreview() {
            return this.$store.state.showComponentPreview
        },
        customClass() {
            return this.$store.state.currentCheckAttr.customClass
        },
        phoneSize_() {
            let rote = this.$store.state.phoneSize / 100
            console.log(this.$store.state.project.pageInfo);
            return {
                transform: `scale(${rote})`,
                top: `${this.$store.state.phoneSize - 100}%`
            }
        },
        bgStyle_() {
            return {
                ...this.$store.state.project.pageInfo,
            }
        },
        pageList_: {
            get() {
                return this.$deepClone(this.$store.state.project.pageList)
            },
            set(value) {
                // this.$store.commit('setCheckFileDragList', value)
            }
        }
    },
    components: {
        draggable,
        VueContextMenu,
        MyComponentsEntity,
        ComponentItem
    }
}
</script>

<style lang="scss">
.phone {
    width: $phoneWidth;
    height: 100%;
    background-color: #f5f5f5;
    box-shadow: 0px 0px 10px 1px #ddd;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    overflow: scroll;
    #phone-scroll-container {
        width: 100%;
        height: 100%;
    }

    &-content {
        height: 100%;
    }
    &-draggable {
        min-height: 100%;
        background-size: 100% auto;
        background-position: center top;
        background-repeat: no-repeat;
    }

    /deep/ .item-tag {
        text-align: center;
        width: 100%;
        padding: 10px 0;
        background-color: #d0e0f5;
        color: #333;
        height: auto;
        .title {
            @include flex(row);
            align-items: center;
            justify-content: center;
        }
        .title-name {
            margin-left: 10px;
        }
        .title-num {
            display: none;
        }
    }

    &-8-tip {
        @include abs($phoneHeight, 50%);
        margin-top: -5px;
        margin-right: $phoneWidth / 2;
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        line-height: 25px;
        padding-right: 16px;
        border-bottom: 1px solid #ebedf0;
    }

    .drag-component {
        position: relative;
        cursor: move;

        &:hover {
            ::v-deep > view::before,
            &.drag-component--float ::v-deep > view > view::before,
            &.drag-component--header ::v-deep .c-fixed-menu > view::before {
                border-color: $uni-color-primary;
            }
            ::v-deep > view::after,
            &.drag-component--float ::v-deep > view > view::after {
                opacity: 1;
            }
        }
        &.drag-component--active {
            ::v-deep > view::before,
            &.drag-component--float ::v-deep > view > view::before,
            &.drag-component--header
                ::v-deep
                .c-fixed-menu--active
                > view::before {
                border: 4px solid transparent;
                border-color: $uni-color-primary;
            }
            &.drag-component--header ::v-deep > view::before {
                display: none;
            }
            ::v-deep > view::after,
            &.drag-component--float ::v-deep > view > view::after {
                opacity: 1;
            }
        }
        ::v-deep > view::before,
        &--float ::v-deep > view > view::before,
        &--header ::v-deep .c-fixed-menu--active > view::before {
            content: '';
            width: 200%;
            height: 200%;
            border: 4px dashed transparent;
            position: absolute;
            left: 0;
            top: 0;
            transform: scale(0.5);
            transform-origin: 0 0;
            z-index: 4;
        }
        // ::v-deep > view::after,
        &--float ::v-deep > view > view::after {
            cursor: pointer;
            content: '\e6d7';
            font-family: element-icons !important;
            font-style: normal;
            font-weight: 400;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            vertical-align: baseline;
            display: inline-block;
            -webkit-font-smoothing: antialiased;
            @include abs(0, 0);
            padding: 6rpx 4rpx;
            background-color: #007aff;
            color: #fff;
            border-radius: 4rpx;
            opacity: 0;
            z-index: 5;
        }
        // 头部相关的样式
        &--header {
            ::v-deep > view::after,
            ::v-deep > view > view::after {
                z-index: 22;
            }
            ::v-deep .c-fixed-menu::after,
            ::v-deep .c-fixed-menu::before {
                display: none !important;
            }
        }
        // 浮动元素样式
        &--float {
            ::v-deep > view::after,
            ::v-deep > view::before {
                display: none !important;
            }
        }
    }
    [data-fixed*='float']::before {
        display: none;
    }
}

.sortable-fallback {
    display: none;
}

.phone-top {
    height: 25px;
    width: 100%;
    background-color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #aeb1b7;
    justify-content: space-between;
    padding: 0 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-size: 12px;

    i {
        color: rgb(174, 177, 183);
        font-weight: 600;
    }
}
.phone-top-blok {
    height: 25px;
    width: 100%;
}

a {
    color: #333;
}
.right-menu {
    position: fixed;
    background: #fff;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    z-index: 999999;
    display: none;
}
.right-menu a {
    width: 100px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: block;
    padding: 0 10px;
    color: #1a1a1a;
}
.right-menu a:hover {
    background: #eee;
    color: #fff;
}
.right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
    border-radius: 1px;
    flex-direction: column;
}
a {
    text-decoration: none;
}
.right-menu a {
    padding: 2px;
}
.right-menu a:hover {
    background: #42b983;
}
path {
    fill: black;
}

.tip-content-show {
    position: fixed;
    left: 200px;
    top: 50%;
    transform: translate(0, -50%);
    width: 375px;
    box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.1);
    z-index: 9999;
    background-color: white;
    // border: rgba(169, 169, 173, 0.96) solid 1px;
    box-sizing: content-box;
}
.tip-content-show-content {
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>

<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-12 10:32:47
-->
<template>
    <view>
        <!-- 左侧标签 -->
        <draggable
            v-if="showEditTool"
            class="component-tips"
            :list="componentList"
            @change="handleChange"
        >
            <template v-for="(item, index) in componentList">
                <view
                    :id="'compentent-label' + index"
                    v-if="item.dataset.fixed !== 'float'"
                    class="component-tips__item"
                    :class="{
                    'component-tips__item--big': item.dataset.remark,
                    'component-tips__item--fixed': item.dataset.fixed === 'top',
                    'component-tips__item--delete': componentIndex === index && item.dataset.fixed !== 'top'
                }"
                    :style="{top: item.fixedTop + 'px'}"
                    :key="index"
                >
                    <div
                        v-if="!item.dataset.fixed || item.dataset.fixed === 'top'"
                        class="component-tips__text"
                        @click="selectComponent(index, item.dataset.fixed, true)"
                    >
                        <p
                            class="component-tips__remark"
                            v-if="item.dataset.remark"
                        >{{item.dataset.remark}}</p>
                        <p class="component-tips__name">{{item.dataset.name}}</p>
                    </div>
                    <!-- <i
                        v-if="componentIndex === index && item.dataset.fixed !== 'top'"
                        class="el-icon-delete"
                        @click="deleteComponent(index)"
                    ></i> -->
                </view>
            </template>
        </draggable>
        <!-- 上下移动功能菜单 -->
        <view
            class="component-edit-menu"
            :class="{'component-edit-menu--active': hasActionList_ && curComponent}"
        >
            <view
                id="edit-menu"
                class="component-edit-menu-box"
                :style="{top:  curComponent && curComponent.editTop + 'px'}"
            >
                <el-tooltip
                    v-for="(item, index) in actionList"
                    :key="index"
                    v-bind="item"
                >
                    <div
                        v-if="item.action !== 'edit'"
                        class="component-edit-item"
                        @click="handleAction(item.action)"
                    >
                        <span :class="item.iconClass"></span>
                    </div>
                    <el-popover
                        v-else
                        v-model="editFlag"
                        class="component-edit-item"
                        placement="top"
                        width="260"
                        trigger="manual"
                    >
                        <el-form
                            ref="form"
                            label-width="55px"
                        >
                            <el-form-item label="备注：">
                                <el-input
                                    v-model="remark"
                                    size="mini"
                                    placeholder="最多8个字"
                                    maxlength="8"
                                ></el-input>
                            </el-form-item>
                            <div class="flex justify-end">
                                <el-button
                                    size="mini"
                                    @click="editFlag = false"
                                >取消</el-button>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handleEditSubmit"
                                >确定</el-button>
                            </div>
                        </el-form>
                        <span
                            slot="reference"
                            @click="handleEdit"
                            :class="item.iconClass"
                        ></span>
                    </el-popover>
                </el-tooltip>
            </view>
        </view>
    </view>
</template>
<script>
import draggable from 'vuedraggable'
import { mapActions } from 'vuex'
let hasAnimate = true
export default {
    components: {
        draggable
    },
    data() {
        return {
            componentList: [],
            componentIndex: -1,
            scrollTop: 0,
            oldComponentList: [],
            actionList: [{
                content: '向上移动',
                placement: 'right',
                effect: 'dark',
                popperClass: "component-edit-tip",
                action: 'top',
                iconClass: 'component-edit-menu__icon el-icon-top border'
            }, {
                content: '向下移动',
                placement: 'right',
                effect: 'dark',
                popperClass: "component-edit-tip",
                action: 'bottom',
                iconClass: 'component-edit-menu__icon el-icon-bottom border'
            }, {
                content: '复制',
                placement: 'right',
                effect: 'dark',
                popperClass: "component-edit-tip",
                action: 'copy',
                iconClass: 'component-edit-menu__icon el-icon-document-copy'
            }, {
                content: '备注',
                placement: 'right',
                effect: 'dark',
                popperClass: "component-edit-tip",
                action: 'edit',
                iconClass: 'component-edit-menu__icon el-icon-edit'
            }, {
                content: '删除',
                placement: 'right',
                effect: 'dark',
                popperClass: "component-edit-tip",
                action: 'delete',
                iconClass: 'component-edit-menu__icon el-icon-delete'
            }],
            remark: '',
            editFlag: false,
            curComponent: undefined,
            showEditTool: false, //隐藏小图标，因为首次进入数据都在请求，一开始展示的话  标签位置不准确
        }
    },
    computed: {
        componentInfo_() {
            return this.$store.state.currentCheckAttr.componentInfo || {}
        },
        hasActionList_() {
            const { rightConfig = [] } = this.componentInfo_
            const allConfig = [...(rightConfig.attribute || []), ...(rightConfig.source || [])]
            return allConfig.findIndex(o => o.pro === 'componentRemarks') !== -1
        }
    },
    watch: {
        '$store.state.project.pageList': {
            async handler() {
                this.getElSizeInfo()
            },
            deep: true,
            immediate: true
        },
        componentList: {
            handler(val) {
                this.curComponent = val[this.componentIndex]
            },
            deep: true,
            immediate: true
        },
        '$store.state.currentCheckAttr.tempCurrentCheckIndex': {
            handler(val) {
                if (val === -1) return
                this.showEditTool = true
                this.componentIndex = val
                if (!this.curComponent) {
                    this.curComponent = this.componentList[val]
                }
                // 隐藏编辑备注
                this.editFlag = false
            },
            immediate: true
        },
        '$store.state.project.insertIndex'(val) {
            if (val === -1) return
            this.$nextTick(() => {
                this.$c.debounce(async () => {
                    await this.getElSizeInfo()
                    // 插入位置
                    const curCmpt = this.componentList[val]
                    // 如果添加了一个浮动元素，页面不重新计算
                    if (curCmpt.dataset.fixed) {
                        // 选中组件
                        this.selectComponent(val, curCmpt.fixed)
                        // 清除插入位置
                        this.$store.commit('SET_INSERT_INDEX', -1)
                        return
                    }
                    // 插入位置距离容器本身的基准点高度
                    let top = 0
                    // curCmpt.top + this.scrollTop
                    // 头部组件的高度
                    let navHeight = 0
                    if (this.componentList[0].dataset.fixed === 'top') {
                        navHeight = this.componentList[0].height
                    }
                    //可见高度
                    const windowHeight = document.getElementById('phone-scroll-view').clientHeight
                    const clientHeight = windowHeight - navHeight
                    const halfSize = clientHeight / 2
                    // 计算组件全部展示,异步获取的会有误差,这边无法做处理
                    // 组件高度超过可视区域
                    if (curCmpt.height >= clientHeight) {
                        top = this.scrollTop + curCmpt.top - navHeight
                    } else {
                        // 算组件基准点的top值  star
                        top = this.scrollTop + curCmpt.top
                        // 算组件基准点的top值  end
                        // 居中计算(可视区域) start
                        if (curCmpt.height > clientHeight) {
                            console.log('组件超过全屏')
                            top -= navHeight
                        } else if (curCmpt.height > halfSize) {
                            top -= (windowHeight - curCmpt.height) / 2
                            console.log('组件超过半屏')
                        } else {
                            top -= (windowHeight - curCmpt.height) / 2
                            console.log('组件低于半屏')
                        }
                        // 居中计算 end
                    }
                    // 滚动页面到添加当前组件
                    this.$store.dispatch('setScrollTop', { top })
                    // this.$store.commit('SET_SCROLL_TOP', top)
                    // 选中组件
                    this.selectComponent(val, curCmpt.fixed)
                    // 清除插入位置
                    this.$store.commit('SET_INSERT_INDEX', -1)
                }, 100)
            })
        }
    },
    created() {
        this.pageScroll()
    },
    methods: {
        ...mapActions(['setCurrentRightConfig', 'saveItemList', 'addComponents']),
        pageScroll() {
            uni.$on('pageScroll', async ({ scrollTop }) => {
                // 节流防止标签过多卡顿
                // this.$c.debounce(() => {
                this.scrollTop = scrollTop
                await this.getElSizeInfo()
                // this.curComponent = this.componentList[this.componentIndex]
                this.showEditTool = true
                // }, 30)
            })
        },
        // 确定备注
        handleEditSubmit() {
            const { rightConfig } = this.componentInfo_
            Object.keys(rightConfig).forEach(key => {
                rightConfig[key].forEach(o => {
                    if (o.pro === 'componentRemarks') {
                        o.value = this.remark
                    }
                })
            })
            // 这边是为了同步视图的数据
            this.setCurrentRightConfig(rightConfig)
            this.saveItemList({ flag: 2 })
            this.editFlag = false
        },
        // 开启编辑
        handleEdit() {
            const { rightConfig = {} } = this.componentInfo_
            Object.keys(rightConfig).forEach(key => {
                rightConfig[key].forEach(o => {
                    if (o.pro === 'componentRemarks') {
                        this.remark = o.value || ''
                    }
                })
            })
            this.editFlag = true
        },
        // 操作列表点击
        async handleAction(action) {
            switch (action) {
                case 'top':
                case 'bottom':
                    // 方向
                    const direction = (action === 'top' ? -1 : 1)
                    // 新的位置
                    const newIndex = this.componentIndex + direction
                    // 被替换对象
                    const replacedCompt = this.componentList[newIndex]
                    const replaceIndex = await this.handleChange({
                        moved: {
                            newIndex,
                            oldIndex: this.componentIndex,
                            element: this.curComponent
                        }
                    })
                    if (String(replaceIndex) !== 'false') {
                        const top = this.scrollTop + replacedCompt.height * direction
                        this.$store.dispatch('setScrollTop', { top, animate: false })
                        this.selectComponent(replaceIndex)
                    }
                    break;
                case 'copy':
                    this.handleCopy()
                    break;
                case 'delete':
                    this.deleteComponent(this.componentIndex)
                    break;
                default:
                    break;
            }
        },
        // 复制组件
        handleCopy() {
            const pageList = (this.$store.state.project.pageList || [])
            const componentInfo = this.$store.state.currentCheckAttr.componentInfo
            const useNum = pageList.filter(o => o.module_name === componentInfo.module_name).length
            if (useNum >= componentInfo.limitNum) {
                this.$message.warning('该组件已达最大数量无法复制');
                return false
            }
            this.addComponents({ data: componentInfo })
        },
        // 组件位置改变或者删除
        async handleChange(e) {
            let newIndex = (e.moved || e.removed).newIndex
            if (e.moved) {
                // 这边要对浮动标签进行加减替换处理 start
                let repaceAllObj = []
                if (e.moved.oldIndex < newIndex) {
                    repaceAllObj = this.oldComponentList.slice(newIndex)
                } else {
                    repaceAllObj = this.oldComponentList.slice(0, newIndex + 1).reverse()
                }
                const replaceIndex = repaceAllObj.findIndex(o => o.dataset.fixed !== 'float')
                newIndex = e.moved.oldIndex < newIndex ? newIndex + replaceIndex : repaceAllObj.length - replaceIndex - 1
                const replaceObj = repaceAllObj[replaceIndex]
                // end
                if (!replaceObj) return false
                if (replaceObj.dataset.fixed === 'top') {
                    this.$message.warning('头部组件不能被替换');
                    this.componentList = this.$deepClone(this.oldComponentList)
                    return false
                } else if (e.moved.element.dataset.moduleName === 'recommend_goods') {
                    this.$message.warning('推荐商品组件不能被移动');
                    this.componentList = this.$deepClone(this.oldComponentList)
                    return false
                } else if (replaceObj.dataset.moduleName === 'recommend_goods') {
                    this.$message.warning('推荐商品组件不能被替换');
                    this.componentList = this.$deepClone(this.oldComponentList)
                    return false
                }
            }
            if (e.removed) {
                this.$store.dispatch('delItemList', { newIndex })
            } else if (e.moved) {
                await this.$store.dispatch('moveItemList', { newIndex, oldIndex: e.moved.oldIndex, isSelect: false })
            }
            return newIndex
        },
        // 选中右侧组件
        selectComponent(index, fixed, hasClick = false) {
            if (fixed !== 'float') {
                this.componentIndex = index
                // 加这个方法他会重定向组件到指定位置
                hasClick && this.$store.commit('SET_INSERT_INDEX', index)
            } else {
                this.componentIndex = -1
            }
            this.$emit('select', {
                type: 'click',
                detail: {
                    value: index
                }
            })
        },
        // 刪除右侧组件
        deleteComponent(index) {
            this.componentIndex = -1
            this.$emit('delete', {
                type: 'click',
                detail: {
                    value: index
                }
            })
        },
        async getElSizeInfo() {
            let data = await this.$c.getRect.call(this.$root, '.drag-component', { dataset: true })
            if (!data) {
                this.componentList = []
                return
            }
            const navTop = 80 // 容器距离页面的高度
            const labelHeight = 24 // 右侧label高度
            const minLabelMargin = 6 // label间距
            const minLabelDistance = labelHeight + minLabelMargin // 2个label的最小距离
            let hasNav = false // 是否有头部
            data = Array.isArray(data) ? data : [data]
            const fixedData = data.filter(o => !o.dataset.fixed) //  固定元素
            // 是否有头部
            if (data[0].dataset.fixed === 'top') {
                data[0].fixedTop = 0
                hasNav = true
            }
            if (fixedData.length) {
                // 2个组件的top间隔至少要大于labelHeight
                const navHeight = hasNav ? data[0].height : 0
                //可见高度
                const windowHeight = document.getElementById('phone-scroll-view').clientHeight
                const editHeight = document.getElementById('edit-menu').offsetHeight
                fixedData.reduce((a, b) => {
                    b.top -= navTop // 默认距离顶部高度
                    b.editTop = b.top // 操作框距离顶部高度
                    b.fixedTop = b.top // 校准top值，让它根据我们的展示容器定位（左侧小标签）
                    // 如果组件在可视区域内还能被看见，则展示label在右侧
                    // 内容可见
                    if (b.fixedTop + b.height >= minLabelMargin) {
                        // 组件只是被隐藏了一部分
                        if (b.fixedTop + b.height > (navHeight - labelHeight)) {
                            b.fixedTop = b.fixedTop > navHeight ? b.fixedTop : navHeight
                            b.editTop = b.editTop > navHeight ? b.editTop : navHeight
                            // 如果组件的高度小于labelHeight,就会导致箭头无法居中组件，不美观，这边要做居中处理
                            if (b.height <= labelHeight) {
                                b.fixedTop -= (labelHeight - b.height) / 2
                            }
                            // 这边是判断上下2个label标签间距要大于labelHeight，不然会重叠
                            if (a.length) b.fixedTop = b.fixedTop - a[a.length - 1].fixedTop > minLabelDistance ? b.fixedTop : a[a.length - 1].fixedTop + minLabelDistance
                        } else if (b.fixedTop + b.height > minLabelDistance * 2) {
                            b.fixedTop = minLabelDistance
                            b.editTop = minLabelDistance
                        }
                    }
                    // 如果组件高度不够，会静止在底部
                    if (b.editTop + editHeight > windowHeight) {
                        if (b.editTop >= windowHeight) {
                            b.editTop = b.fixedTop + b.height - editHeight
                        } else {
                            b.editTop = windowHeight - editHeight
                        }
                    }
                    a.push(b)
                    return a
                }, [])
                const componentList = data.reduce((a, b) => {
                    b.fixedTop = (fixedData.find(o1 => o1.dataset.moduleNo === b.dataset.moduleNo) || b).fixedTop
                    a.push(b)
                    return a
                }, [])
                this.componentList = componentList
            } else {
                this.componentList = data
            }
            this.oldComponentList = this.$deepClone(this.componentList)
        }
    }
}
</script>

<style lang="scss">
.component-edit-menu {
    @include abs(20px, null, null, 50%);
    width: 38px;
    bottom: 0;
    margin-left: $phoneWidth / 2;
    opacity: 0;
    pointer-events: none;
    &--active {
        opacity: 1;
        pointer-events: auto;
    }
    &-box {
        position: relative;
        background-color: #ffffff;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
        padding: 8px 0;
        @include flex;
        align-items: center;
        // @include tst;
    }
    .component-edit-item {
        padding: 5px 8px;
        cursor: pointer;
    }
    &__icon {
        height: 22px;
        width: 22px;
        font-size: 18px;
        @include flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #969799;
        &.border {
            border: 2px solid #969799;
            font-size: 14px;
            border-radius: 100%;
        }
    }
}
.component-tips {
    @include abs(20px, 50%);
    width: 110px;
    overflow: hidden;
    margin-right: $phoneWidth / 2;
    bottom: 0;
    &__item {
        cursor: pointer;
        @include flex(row);
        align-items: center;
        position: absolute;
        right: 10px;
        background-color: #ffffff;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
        font-size: 12px;
        border-radius: 2px;
        font-weight: 400;
        color: #666666;
        height: 24px;
        padding: 0 12px;
        z-index: 9;
        top: 0;
        &--fixed {
            z-index: 10;
        }
        &--big {
            height: 40px;
        }
        &::after {
            content: '';
            width: 6px;
            height: 6px;
            background-color: #fff;
            transform: rotate(45deg);
            margin-top: -3px;
            @include abs(50%, -4px);
            z-index: 30;
        }
        .el-icon-delete {
            padding: 5px 0 5px 10px;
        }
    }
    &__text {
        display: block;
        max-width: 80px;
        @include ellipsis;
        text-align: right;
    }
    &__name {
        @include tst;
    }
    &__remark {
        line-height: 24px;
        & + .component-tips__name {
            transform-origin: 100% 0;
            transform: scale(0.85);
            color: #999;
            // height: 16px;
        }
    }
}
</style>
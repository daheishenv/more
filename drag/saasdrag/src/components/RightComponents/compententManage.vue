<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-29 14:25:52
-->
<template>
    <view class="compentent-manage">
        <!-- group="components" -->
        <view class="flex justify-end compentent-manage__tooltip">
            <el-popconfirm
                title="确定要清空页面的所有组件？"
                icon="el-icon-warning-outline"
                placement="left"
                icon-color="#f00"
                @confirm="handleClearAll"
            >
                <el-button
                    type="primary"
                    plain
                    size="mini"
                    class="compentent-manage__clear"
                    slot="reference"
                >
                    <text class="el-icon-delete"></text>清空组件
                </el-button>
            </el-popconfirm>
        </view>
        <view class="compentent-manage__list">
            <draggable
                :list="pageList_"
                animation="200"
                filter=".undraggable"
                ghostClass="compentent-manage__ghost"
                dragClass="compentent-manage__drag"
                :options="{
                    forceFallback: true
                }"
                @change="handleChange"
            >
                <view
                    class="compentent-manage__item"
                    v-for="(item, index) in pageList_"
                    :key="index"
                    :class="isUnDraggable(item) ? 'undraggable' : 'draggable'"
                    @click="handleClick(index)"
                    :data-module-name="item.module_name"
                >
                    <text class="el-icon-s-operation"></text>
                    <view class="flex-1">
                        <view
                            class="compentent-manage__remark"
                            v-if="item.extra.componentRemarks"
                        >{{`${index + 1}. `}}{{item.extra.componentRemarks}}</view>
                        <view class="compentent-manage__name">{{!item.extra.componentRemarks ? `${index + 1}. ` : ''}}{{item.name}}</view>
                    </view>
                    <view
                        v-if="item.fixed !== 'top' && hasActionList_(index)"
                        @click.stop
                    >
                        <!-- 复制 -->
                        <text
                            class="compentent-manage__icon el-icon-document-copy"
                            @click="handleCopy(index)"
                        ></text>
                        <!-- 备注 -->
                        <el-popover
                            class="compentent-manage__icon"
                            placement="top"
                            width="260"
                            trigger="manual"
                            v-model="editFlags[index]"
                            @confirm="handleClearAll"
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
                                        @click="handleEditConcal(index)"
                                    >取消</el-button>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="handleEditSubmit(index)"
                                    >确定</el-button>
                                </div>
                            </el-form>
                            <span
                                slot="reference"
                                @click="handleEdit(index)"
                                class="el-icon-edit"
                            ></span>
                        </el-popover>
                        <!-- 删除 -->

                        <el-popconfirm
                            class="compentent-manage__icon"
                            placement="left"
                            width="260"
                            trigger="click"
                            title="確定要刪除？"
                            icon="el-icon-warning-outline"
                            @confirm="handleDelete(index)"
                        >
                            <span
                                slot="reference"
                                class="el-icon-delete"
                            ></span>
                        </el-popconfirm>
                        <!-- <text
                            class="compentent-manage__icon el-icon-delete"
                            @click.stop="handleDelete(index)"
                        ></text> -->
                    </view>
                </view>
            </draggable>
        </view>
    </view>
</template>

<script>
import { mapActions } from 'vuex'
import draggable from '@/utils/vuedraggable'
export default {
    components: {
        draggable
    },
    data() {
        return {
            editFlags: [], // 下标表示选中
            remark: ''
        }
    },
    computed: {
        isUnDraggable() {
            return ({ fixed, cmptId }) => {
                return ['c-recommend-goods', 'sub-home-recommend-cate-goods'].includes(cmptId) || fixed === 'top'
            }
        },
        pageList_: {
            get() {
                return this.$deepClone(this.$store.state.project.pageList)
            },
            set(value) {
                // this.$store.commit('setCheckFileDragList', value)
            }
        },
        hasActionList_() {
            return index => {
                const { rightConfig = [] } = this.pageList_[index]
                const allConfig = [...(rightConfig.attribute || []), ...(rightConfig.source || [])]
                return allConfig.findIndex(o => o.pro === 'componentRemarks') !== -1
            }
        }
    },
    methods: {
        ...mapActions(['setCurrentRightConfig', 'saveItemList', 'addComponents', 'replaceItemList']),
        // 显示编辑弹窗
        handleEdit(index, eidtFlag) {
            const curEdit = eidtFlag !== undefined ? eidtFlag : !this.editFlags[index]
            let editFlags = []
            editFlags.length = this.pageList_.length
            editFlags.fill(false)
            editFlags[index] = curEdit
            const { extra = {} } = this.$deepClone(this.pageList_[index])
            if (curEdit) {
                this.remark = extra.componentRemarks || ''
            }
            this.editFlags = editFlags
        },
        // 添加备注
        handleEditSubmit(index) {
            const curConponentInfo = this.$deepClone(this.pageList_[index])
            const { rightConfig } = curConponentInfo
            Object.keys(rightConfig).forEach(key => {
                rightConfig[key].forEach(o => {
                    if (o.pro === 'componentRemarks') {
                        o.value = this.remark
                    }
                })
            })
            curConponentInfo.rightConfig = rightConfig
            this.saveItemList({ flag: 2, data: curConponentInfo })
            this.replaceItemList({ index, data: curConponentInfo })
            this.handleEditConcal(index)
        },
        // 清空备注
        handleEditConcal(index) {
            this.handleEdit(index, false)
            this.remark = ''
        },
        handleCopy(index) {
            const componentInfo = this.pageList_[index]
            const useNum = this.pageList_.filter(o => o.module_name === componentInfo.module_name).length
            if (useNum >= componentInfo.limitNum) {
                this.$message.warning('该组件已达最大数量无法复制');
                return false
            }
            this.addComponents({ data: componentInfo, index })
        },
        async handleClearAll() {
            this.$store.dispatch('delAllItemList')
        },
        handleClick(index) {
            this.$store.commit('SET_INSERT_INDEX', index)
        },
        handleChange(e) {
            if (e.removed) {
                this.$store.dispatch('delItemList', { newIndex: e.removed.newIndex })
            } else if (e.moved) {
                this.$store.dispatch('moveItemList', { newIndex: e.moved.newIndex, oldIndex: e.moved.oldIndex, isSelect: false })
            }
        },
        handleDelete(index) {
            this.handleChange({
                removed: {
                    element: this.pageList_[index],
                    newIndex: index
                }
            })
        }
    }
}
</script>

<style lang="scss">
.compentent-manage {
    position: relative;
    &__tooltip {
        margin-bottom: 10px;
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 2;
        padding: 12px 15px;
    }
    &__list {
        padding: 0 15px 12px 15px;
    }
    &__clear {
        font-size: 14px;
        cursor: pointer;
        padding: 7px 10px;
        .el-icon-delete {
            margin-right: 5px;
        }
    }

    &__remark {
        & + .compentent-manage__name {
            font-size: 12px;
            opacity: 0.65;
        }
    }

    &__item {
        @include flex(row);
        align-items: center;
        height: 60px;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
        font-size: 14px;
        border-radius: 2px;
        font-weight: 400;
        color: #666666;
        padding: 8px 12px;
        margin-bottom: 15px;
        cursor: pointer;
        .flex-1 {
            padding: 0 10px;
        }
        &.draggable {
            cursor: move;
        }
        &:hover,
        &.compentent-manage__drag {
            background-color: #ecf5ff;
            box-shadow: 0px 2px 8px 0px rgba(64, 158, 255, 0.25);
            color: #409eff;
        }
    }
    &__icon {
        cursor: pointer;
        padding: 5px;
    }
    &__ghost {
        visibility: hidden;
    }
}
</style>
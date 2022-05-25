<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sky
 * @Date: 2021-09-15 15:28:00
-->
<template>
    <view class="base-select-category">
        <view class="base-select-category-hd">
            <view class="flex-space-between">
                <view class="base-select-category">{{ text }}</view>
                <view class="base-select-category">
                    <template v-if="value.length">
                        <el-popconfirm
                            title="确定要清空已选择内容？"
                            icon="el-icon-warning-outline"
                            placement="left"
                            icon-color="#f00"
                            @confirm="handleClear"
                        >
                            <el-button
                                size="mini"
                                class="compentent-manage__clear"
                                slot="reference"
                            >清空</el-button>
                        </el-popconfirm>
                        <text class="pl12"></text>
                        <el-button
                            type="primary"
                            @click="$emit('select')"
                        >添加</el-button>
                    </template>
                    <template v-else>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="$emit('select')"
                        >{{ selectText }}</el-button>
                    </template>
                </view>
            </view>

            <view class="base-select-category-hd__item">
                <view
                    class="base-select-category__summary"
                    v-if="summary"
                >{{summary}}</view>
            </view>
        </view>

        <view class="base-select-category-bd">

            <view v-loading="operationLoading">
                <draggable
                    v-model="dataList"
                    animation="500"
                    @change="handleChange"
                >
                    <view
                        v-for="(item, index) in dataList"
                        :key="index"
                        class="choose-item move"
                    >
                        <view class="choose-item__content flex-space-between ">
                            <text
                                class="el-icon-s-operation choose-item__action-btn pl12 pr4 move"
                                title="拖动排序"
                            ></text>
                            <view class="flex-1 flex">
                                <view class="choose-item__label">{{index + 1}}.</view>
                                <view class="choose-item__text c-ellipsis">{{item.cat_name}}</view>
                            </view>
                            <view class="choose-item__action">
                                <!--  <text
                                    v-if="!item.editing"
                                    class="el-icon-edit-outline choose-item__action-btn"
                                    @click="handleEdit(index, true)"
                                    title="编辑"
                                ></text>
                                <text
                                    v-else
                                    class="el-icon-finished choose-item__action-btn"
                                    @click="handleEdit(index,false)"
                                    title="保存"
                                ></text> -->

                                <el-popconfirm
                                    class="choose-item__action-btn"
                                    placement="left"
                                    width="260"
                                    trigger="click"
                                    title="确定要删除"
                                    icon="el-icon-warning-outline"
                                    @confirm="handleDelete(index,item.cat_id)"
                                >
                                    <span
                                        slot="reference"
                                        class="el-icon-delete"
                                        title="删除"
                                    ></span>
                                </el-popconfirm>
                            </view>
                        </view>
                    </view>
                </draggable>
            </view>
        </view>
    </view>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    props: {
        value: {
            type: [Array, String],
            default: () => []
        },
        selectText: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        summary: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            dataList: [],
            defaultList: [],
            editing: false,

            operationLoading: false,
            componentInfo: {},
            changeFlag: false, // 拖拽换顺序不重新请求
            operationReqName: 'GoodsCategory/getTopCategoryByIds',

        }
    },
    computed: {
        api_() {
            return this.$store.state.currentCheckAttr.componentInfo.api
        },
        apiParam_() {
            return {
                ids: this.value,
                idType: 'categoryId'
            }
        },
    },

    watch: {
        'apiParam_': {
            handler(val) {
                if (this.changeFlag) {
                    this.changeFlag = false
                    return
                }
                this.$c.debounce(() => {
                    this.initPage()
                }, 50)
            },
            deep: true
        }
    },
    created() {
        this.initPage()
    },

    methods: {
        async initPage() {
            if (this.operationLoading) return
            this.operationLoading = true
            try {
                const { data } = await this.$http(this.operationReqName, this.apiParam_)
                this.dataList = data
                this.operationLoading = false
            } catch (error) {
                this.operationLoading = false
            }
        },
        handleChange() {
            console.log('this.dataList', this.dataList)
            this.changeFlag = true
            this.$emit('input', this.dataList.map(o => o.cat_id).join(','))
        },
        handleClear() {
            this.$emit('input', '')
            this.dataList = []
        },
        handleDelete(index, id) {
            this.dataList.splice(index, 1)
            this.$emit('input', this.dataList.map(o => o.cat_id).join(','))
        }
    }
}
</script>

<style lang="scss" scope>
.move {
    cursor: move !important;
}
.base-select-category {
    &__summary {
        font-size: 12px;
        color: #999999;
        line-height: 17px;
        margin-top: 12px;
    }
    &-hd__item {
        @include flex(row);
        justify-content: space-between;
        align-items: center;
    }
    &__title {
        color: #333;
        font-weight: bold;
        font-size: 14px;
    }
    &-bd {
        margin-top: 16px;
    }
    .choose-item {
        width: 100%;
        & + .choose-item {
            margin-top: 8px;
        }
        &__content {
            background: #f7f8fa;
            padding: 6px 7px;
        }
        &__label {
            margin-right: 8px;
            margin-left: 8px;
            //color: #999;
            text-align: left;
        }
        &__text {
            text-align: left;
            white-space: nowrap;
            border-radius: 4px;
            flex: 1;
        }
        &__action-btn {
            cursor: pointer;
            padding: 5px;
            &:hover {
                color: $uni-color-primary;
            }
        }
    }
}
</style>
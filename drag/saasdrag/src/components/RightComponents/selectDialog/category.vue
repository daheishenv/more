<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sky
 * @Date: 2021-09-14 18:20:21
-->
<template>
    <select-dialog
        v-model="showDialog_"
        :title="title"
        @submit="handleSubmit"
    >
        <!-- 筛选区 -->
        <div class="dialog-form-inline mb24">
            <div class="flex-space-between">
                <div class="flex">
                    <el-button
                        type="primary"
                        size="mini"
                        @click="handleQuery"
                    >刷新</el-button>
                </div>
            </div>
        </div>

        <!-- 内容区 -->
        <el-tabs
            class="select-category"
            type="border-card"
            v-model="currentTabName"
            @tab-click="handleTabClick"
        >
            <el-tab-pane
                label="所有分类"
                name="table"
            >
                <div
                    class="select-category-list scrollbar1"
                    v-loading="isLoading"
                >
                    <el-checkbox-group
                        v-model="multipleSelection"
                        size="medium"
                        @change="handleSelect"
                    >
                        <el-checkbox
                            v-for="item in list"
                            :key="item.cat_id"
                            :label="item.cat_id"
                            :disabled="item.disabled"
                            border
                        >{{item.cat_name}}</el-checkbox>
                    </el-checkbox-group>

                    <c-no-data
                        text="暂无相关数据"
                        showImg
                        v-if="!isLoading && !list.length"
                    />
                </div>
            </el-tab-pane>
            <el-tab-pane
                label="注：请勾选需要展示的分类"
                disabled
            >
            </el-tab-pane>
        </el-tabs>
    </select-dialog>
</template>

<script>
import tableMixins from './mixins/table'
export default {
    mixins: [tableMixins],
    data() {
        return {
            listReqName: 'GoodsCategory/getTopCategoryByIds', // 全部分类接口
            operationReqName: '', // 已选分类接口

            currentTabName: 'table',
            list: [],
            max: 10
        }
    },
    methods: {
        initData() {
            console.log(1, this.defaultValue)
            this.multipleSelection = this.defaultValue.length ? this.defaultValue.split(',').map(o => Number(o)) : []
        },
        // 查询
        handleQuery() {
            this.getList()
        },

        // 重写getList方法
        async getList() {
            if (this.isLoading) return
            this.isLoading = true
            try {
                const { data } = await this.$http(this.listReqName)
                this.isLoading = false
                this.list = data.map(o => {
                    return {
                        ...o,
                        disabled: false
                    }
                })
                //console.log('this.list', this.list)
                this.handleSelect(this.multipleSelection, false)
            } catch (error) {
                this.isLoading = false
            }
        },

        handleSelect(arr, needAlert = true) {
            console.log(arr)
            // 如果超过最多选择限制，则禁用剩余候选项
            if (arr.length >= this.max) {
                this.list.filter(o => !this.multipleSelection.includes(o.cat_id)).forEach(o => o.disabled = true);
                needAlert && this.$message.error(`最多只能选择${this.max}项`)
            } else {
                this.list.filter(o => !this.multipleSelection.includes(o.cat_id)).forEach(o => o.disabled = false);
            }
            this.multipleSelection = arr
        },
        handleSubmit(e) {
            this.$emit('input', false)
            this.$emit('submit', {
                ...e,
                detail: {
                    /* value: this.list.filter(o => this.multipleSelection.includes(o.cat_id)).map((o) => {
                        return {
                            title: o.cat_name,
                            cat_id: o.cat_id,
                            app_page: "searchList",
                            name: "分类搜索"
                        }
                    }) */
                    value: this.list.filter(o => this.multipleSelection.includes(o.cat_id)).map((o) => o.cat_id).join(',')
                }
            })
        }
    },
    computed: {
        showDialog_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
                this.$emit('change', {
                    type: 'change',
                    detail: {
                        value: val
                    }
                })
            }
        },
    },
    created() {
        this.init()
    }
}
</script>

<style lang='scss' scoped>
.select-category {
    /deep/ .el-checkbox {
        margin: 6px !important;
    }
    /deep/ .el-tabs__item.is-active {
        background-color: inherit !important;
        border-right: none !important;
    }
    /deep/ #tab-1 {
        padding-left: 0 !important;
        font-size: 24rpx;
    }
}
</style>
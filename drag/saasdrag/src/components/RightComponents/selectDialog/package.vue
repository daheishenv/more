<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sky
 * @Date: 2021-10-30 16:06:40
-->
<template>
    <select-dialog
        v-model="showDialog_"
        :title="title"
        @submit="handleSubmit"
    >
        <div class="dialog-form-inline">
            <el-form
                :inline="true"
                label-width="85px"
            >
                <el-form-item label="套餐包名称">
                    <el-input
                        v-model="keyword"
                        placeholder="请输入套餐包名称"
                    />
                </el-form-item>
                <el-form-item label="来源">
                    <el-select
                        v-model="sourceType"
                        :loading="sourceTypeLoading"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="(value,key,index) in sourceTypes"
                            :key="index"
                            :label="value"
                            :value="key"
                        >
                        </el-option>
                        <el-option
                            label="全部"
                            value=""
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="flex-space-between form-btn-group">
                <div class="flex">
                    <el-button
                        type="primary"
                        class="el-form-item__btn"
                        @click="handleRefrsh"
                    >刷新</el-button>
                </div>
                <div>
                    <el-button
                        type="primary"
                        class="el-form-item__btn"
                        @click="handleQuery"
                    >查询</el-button>
                </div>
            </div>
        </div>
        <el-tabs
            type="border-card"
            v-model="tabValue"
            @tab-click="handleTabClick"
        >
            <el-tab-pane
                label="全部套餐"
                name="table"
            >
                <el-table
                    v-loading="isLoading"
                    ref="multipleTable"
                    border
                    :data="tableData"
                    :title="title"
                    @select="handleSelectionChange"
                    @select-all="handleSelectAll"
                >
                    <el-table-column
                        type="selection"
                        align="center"
                        width="55"
                    >
                    </el-table-column>

                    <el-table-column
                        label="编号"
                        align="center"
                        width="60"
                    >
                        <template slot-scope="{row}">
                            {{row.id}}
                        </template>>
                    </el-table-column>
                    <el-table-column
                        label="封面图"
                        align="center"
                        width="120"
                    >
                        <template slot-scope="{row}">
                            <view class="flex-ajcenter">
                                <c-image
                                    size="80"
                                    :src="row.image"
                                />
                            </view>
                        </template>>
                    </el-table-column>
                    <el-table-column
                        property="name"
                        label="套餐包名称"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                        property="source_type_text"
                        width="100"
                        label="来源"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        property="package_price_range"
                        width="212"
                        align="center"
                        label="套餐价"
                    >
                    </el-table-column>
                </el-table>
                <div class="el-pagination-box">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page"
                        :page-sizes="[10, 20, 50, 100]"
                        background
                        :page-size="limit"
                        layout="prev, pager, next, sizes"
                        :total="count"
                    >
                    </el-pagination>
                    <span>共{{count}}条</span>
                </div>
            </el-tab-pane>
            <el-tab-pane
                :label="`已选套餐（${multipleSelection.length}）`"
                name="operation"
            >
                <chooseOperation
                    ref="chooseOperation"
                    imgKey="image"
                    titleKey="name"
                    row="5"
                    :operationReqName='operationReqName'
                    :operationReqParam="operationReqParam_"
                    @change="handleDragChange"
                />
            </el-tab-pane>
        </el-tabs>
    </select-dialog>
</template>

<script>
import tableMixins from './mixins/table'
export default {
    mixins: [tableMixins],
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableData: [],
            selectData: [],
            sourceTypeLoading: true,
            sourceType: '',
            sourceTypes: [],
            reqParams: {
                source_type: '',
            }, // 请求参数
            keyword: '',
            multipleSelection: [],
            isLoading: false,
            listReqName: 'getCustomPackageList',
            autoReq: true,
            operationReqName: 'Package/getCustomPackageList'
        }
    },
    methods: {
        initDialog() {
            this.getPackageSourceTypeList()
        },

        // 获取套餐包来源
        async getPackageSourceTypeList() {
            this.sourceTypeLoading = true
            const { data: { list = [] } } = await this.$http('getPackageSourceTypeList', {
                limit: 100
            })
            this.sourceTypes = list
            this.sourceTypeLoading = false
        },
        // 查询
        handleQuery() {
            this.page = 1
            const reqParams = {}
            if (this.keyword) {
                reqParams.keyword = this.keyword
            }
            if (this.sourceType) {
                reqParams.source_type = this.sourceType
            }
            this.reqParams = reqParams
            this.getList()
        }
    }
}
</script>
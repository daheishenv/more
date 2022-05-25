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
                @submit.native.prevent
            >
                <el-form-item label="关键词">
                    <el-input
                        v-model="keywords"
                        placeholder="请输入名称、手机号"
                    />
                </el-form-item>
                <el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="handleQuery"
                        >查询</el-button>
                    </el-form-item>
                </el-form-item>
            </el-form>
            <div class="flex-space-between">
                <div class="flex">
                    <!-- <el-button
                        type="primary"
                        size="mini"
                        @click="handleAdd"
                    >新增</el-button> -->
                    <el-button
                        type="primary"
                        size="mini"
                        @click="handleQuery"
                    >刷新</el-button>
                </div>
            </div>
        </div>
        <el-tabs
            type="border-card"
            v-model="tabValue"
            @tab-click="handleTabClick"
        >
            <el-tab-pane
                label="全部施工团队"
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
                        width="80"
                    >
                        <template slot-scope="{row}">
                            {{row.id}}
                        </template>>
                    </el-table-column>
                    <el-table-column
                        label="头像"
                        align="center"
                        width="60"
                    >
                        <template slot-scope="{row}">
                            <c-image
                                size="80"
                                :src="row.head_img_url_oss"
                            />
                        </template>>
                    </el-table-column>
                    <el-table-column
                        property="username"
                        label="工长名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="mobile"
                        label="手机号"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="year"
                        align="center"
                        label="工龄"
                    ></el-table-column>
                    <el-table-column
                        property="proficient_name"
                        align="center"
                        label="熟练度"
                    ></el-table-column>
                    <!-- <el-table-column
                        fixed="right"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                plain
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column> -->
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
                :label="`已选施工团队（${multipleSelection.length}）`"
                name="operation"
            >
                <chooseOperation
                    ref="chooseOperation"
                    imgKey="head_img_url_oss"
                    titleKey="username"
                    row="5"
                    @change="handleDragChange"
                    :operationReqName="operationReqName"
                    :operationReqParam="operationReqParam_"
                />
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
            keywords: '',
            listReqName: 'shopForeman',
            operationReqName: 'ShopForeman/ajaxList'
        }
    },
    methods: {
        // 查询
        handleQuery() {
            this.page = 1
            const reqParams = {}
            if (this.keywords) {
                reqParams.keywords = this.keywords
            }
            this.reqParams = reqParams
            this.getList()
        }
    }
}
</script>
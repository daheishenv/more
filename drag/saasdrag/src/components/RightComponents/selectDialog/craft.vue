<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-20 11:48:28
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
                <el-form-item label="资讯标题">
                    <el-input
                        v-model="keyword"
                        placeholder="请输入标题"
                    />
                </el-form-item>
                <el-form-item label="资讯分类">
                    <el-select
                        v-model="designStyle"
                        :loading="designStyleLoading"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in designStyles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
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
                :label="`全部${title}`"
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
                        property="id"
                        label="编号"
                        align="center"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        property="title"
                        label="资讯标题"
                    ></el-table-column>
                    <el-table-column
                        property="cat_name"
                        label="资讯分类"
                    ></el-table-column>
                    <el-table-column
                        property="source_name"
                        width="120"
                        align="center"
                        label="来源"
                    ></el-table-column>
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
                :label="`已选${title}（${multipleSelection.length}）`"
                name="operation"
            >
                <chooseOperation
                    ref="chooseOperation"
                    imgKey="cover_image"
                    titleKey="title"
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
            designStyleLoading: true,
            designStyle: '',
            designStyles: [],

            reqParams: {
                title: '',
                cat_id: '',
            }, // 请求参数
            keyword: '',
            listReqName: 'recommendArticle',
            operationReqName: 'Article/recommendArticle'
        }
    },
    methods: {
        initDialog() {
            this.getJobStyle()
        },
        // 获取设计师风格
        async getJobStyle() {
            this.designStyleLoading = true
            const { data: {
                list = []
            } } = await this.$http('articleArticleCategory', {
                limit: 100
            })
            this.designStyles = list.map(o => {
                return {
                    value: o.id,
                    label: o.cat_name
                }
            })
            this.designStyleLoading = false
        },
        // 查询
        handleQuery() {
            this.page = 1
            const reqParams = {}
            if (this.keyword) {
                reqParams.title = this.keyword
            }
            if (this.designStyle) {
                reqParams.cat_id = this.designStyle
            }
            this.reqParams = reqParams
            this.getList()
        },
    }
}
</script>
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
                <el-form-item label="擅长风格">
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
                <el-form-item label="设计师名称">
                    <el-input
                        v-model="keyword"
                        placeholder="请输入名称、手机号"
                    />
                </el-form-item>
                <el-form-item label="来源">
                    <el-select
                        v-model="sourceType"
                        placeholder="请选择"
                        clearable
                        :loading="sourceTypeLoading"
                    >
                        <el-option
                            v-for="item in sourceTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="flex justify-between form-btn-group">
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
                label="全部设计师"
                name="table"
            >
                <el-table
                    v-loading="isLoading"
                    ref="multipleTable"
                    border
                    :data="tableData"
                    :title="title"
                    max-height="500px"
                    @select="handleSelectionChange"
                    @select-all="handleSelectAll"
                >
                    <el-table-column
                        fixed="left"
                        type="selection"
                        align="center"
                        width="55"
                    >
                    </el-table-column>
                    <!-- <el-table-column
                property="id"
                label="标号"
                align="center"
                width="60"
            ></el-table-column> -->
                    <el-table-column
                        label="头像"
                        align="center"
                        width="60"
                    >
                        <template slot-scope="{row}">
                            <c-image
                                size="80"
                                :src="row.user_picture_url"
                            />
                        </template>>
                    </el-table-column>
                    <el-table-column
                        property="username"
                        label="设计师名称"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        property="job_name"
                        width="120"
                        label="职位"
                    ></el-table-column>
                    <el-table-column
                        property="source_type_text"
                        width="100"
                        label="来源"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="mobile_phone"
                        width="120"
                        align="center"
                        label="手机号"
                    ></el-table-column>
                    <el-table-column
                        property="year"
                        width="50"
                        align="center"
                        label="年限"
                    >
                        <template slot-scope="{row}">
                            {{row.year}}年
                        </template>>
                    </el-table-column>
                    <el-table-column
                        property="job_style_text"
                        width="140"
                        align="center"
                        label="擅长风格"
                    ></el-table-column>
                    <el-table-column
                        property="job_name"
                        label="归属城市"
                    >
                        <template slot-scope="{row}">
                            {{row.province}}{{row.city}}{{row.district}}
                        </template>
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
                :label="`已选设计师（${multipleSelection.length}）`"
                name="operation"
            >
                <chooseOperation
                    ref="chooseOperation"
                    :operationReqName="operationReqName"
                    :operationReqParam="operationReqParam_"
                    imgKey="user_picture_url"
                    row="5"
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
    data() {
        return {
            designStyleLoading: true,
            designStyle: '',
            designStyles: [],
            sourceTypeLoading: true,
            sourceType: '',
            sourceTypes: [],
            reqParams: {
                job_style_id: '',
                source_type: ''
            }, // 请求参数
            keyword: '',
            operationReqName: 'JobUser/getListByIds',
        }
    },
    methods: {
        initDialog() {
            this.getJobStyle()
            this.getSourceTypeList()
        },
        // 获取设计师风格
        async getJobStyle() {
            this.designStyleLoading = true
            const { data: {
                list = []
            } } = await this.$http('getJobStyle', {
                limit: 100
            })
            this.designStyles = list.map(o => {
                return {
                    value: o.id,
                    label: o.name
                }
            })
            this.designStyleLoading = false
        },
        async getSourceTypeList() {
            this.sourceTypeLoading = true
            const { data: {
                list = []
            } } = await this.$http('getSourceTypeList', {
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
            if (this.designStyle) {
                reqParams.job_style_id = this.designStyle
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
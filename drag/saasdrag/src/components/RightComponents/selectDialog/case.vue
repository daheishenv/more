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
                <el-form-item label="案例名称">
                    <el-input
                        v-model="keyword"
                        placeholder="请输入名称、手机号"
                    />
                </el-form-item>
                <el-form-item label="风格">
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
                <el-form-item label="设计师">
                    <el-select
                        v-model="designer"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in designers"
                            :key="item.id"
                            :label="item.username"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
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
                <el-form-item
                    label="所属区域"
                    style="width: 600px"
                >
                    <div
                        class="flex"
                        style="width: 500px"
                    >
                        <div class="ml24">
                            <el-select
                                v-model="province"
                                clearable
                                placeholder="请选择"
                                @change="handleSelect('city',province)"
                            >
                                <el-option
                                    v-for="item in region.province"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="ml24">
                            <el-select
                                v-model="city"
                                clearable
                                placeholder="请选择"
                                @change="handleSelect('area',city)"
                            >
                                <el-option
                                    v-for="item in region.city"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="ml24">
                            <el-select
                                v-model="area"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in region.area"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
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
                label="全部案例"
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
                        property="name"
                        label="案例名称"
                        width="100"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                        property="source_type"
                        width="100"
                        label="来源"
                        align="center"
                    >
                        <template slot-scope="{row}">
                            <view v-if="row.source_type === 1">平台</view>
                            <view v-else-if="row.source_type === 2">自营</view>
                            <view v-else-if="row.source_type === 3">中装速配</view>
                            <view v-else-if="row.source_type === 4">模版数据</view>
                            <view v-else-if="row.source_type === 5">excel导入</view>
                            <view v-else-if="row.source_type === 6">工厂</view>
                            <view v-else>全部</view>
                        </template>
                    </el-table-column>
                    <el-table-column
                        property="housing_estate.name"
                        width="120"
                        align="center"
                        label="小区名称"
                    ></el-table-column>
                    <el-table-column
                        width="212"
                        align="center"
                        label="地区"
                    >
                        <template slot-scope="{row}">
                            {{row.housing_estate.province_name}}-{{row.housing_estate.city_name}}-{{row.housing_estate.district_name}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        property="job_user_name"
                        width="100"
                        label="设计师"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="style"
                        width="140"
                        align="center"
                        label="风格"
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
                :label="`已选案例（${multipleSelection.length}）`"
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
            designStyleLoading: true,
            designStyle: '',
            designStyles: [],
            designer: '',
            designerLoading: true,
            designers: [],
            sourceTypeLoading: true,
            sourceType: '',
            sourceTypes: [],
            reqParams: {
                job_style_id: '',
                source_type: '',
            }, // 请求参数
            keyword: '',
            multipleSelection: [],
            isLoading: false,
            province: '',
            city: '',
            area: '',
            region: {
                province: [],
                city: [],
                area: []
            },
            listReqName: 'PatternCase',
            autoReq: true,
            operationReqName: 'PatternCase/getListByIds'
        }
    },
    methods: {
        initDialog() {
            this.getJobStyle()
            this.getDesignerInfo()
            this.getSourceTypeList()
            this.getRegion()
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
        async getDesignerInfo() {
            const { data } = await this.$http('designerList', {
                page: this.page,
                limit: this.limit,
            })
            this.designers = data.list || []
        },
        async getRegion(pro = 'province', id) {
            const { data: { list = [] } } = await this.$http('toolsGetRegion', {
                region_id: id
            })
            const arr = Object.keys(list).map(o => {
                return {
                    value: o,
                    label: list[o]
                }
            });
            this.region[pro] = arr
        },
        handleSelect(pro, id) {
            this[pro] = ''
            pro === 'city' && (this.area = '')
            this.getRegion(pro, id)
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
            if (this.designStyle) {
                reqParams.job_style_id = this.designStyle
            }
            if (this.designer) {
                reqParams.job_user_id = this.designer
            }
            if (this.sourceType) {
                reqParams.source_type = this.sourceType
            }
            if (this.province || this.city || this.area) {
                reqParams.province_id = this.province
                reqParams.city_id = this.city
                reqParams.district_id = this.area
            }
            this.reqParams = reqParams
            this.getList()
        }
    }
}
</script>
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
                <el-form-item label="优惠券名称">
                    <el-input
                        v-model="formData.keyword"
                        placeholder="请输入优惠券名称"
                    />
                </el-form-item>
                <el-form-item label="风格">
                    <el-select
                        v-model="formData.coupon_type"
                        clearable
                        placeholder="请选择"
                    >
                        <el-option label="全部" value="" />
                        <el-option label="满减券" value="1" />
                        <el-option label="折扣券" value="2" />
                        <el-option label="现金券" value="3" />
                        <el-option label="兑换券" value="4" />
                        <el-option label="免邮券" value="5" />
                    </el-select>
                </el-form-item>
                <el-form-item label="开始面额">
                    <el-input
                        v-model="formData.start_amount"
                        placeholder="请输入开始面额"
                    />
                    
                </el-form-item>
                <el-form-item label="结束面额">
                    <el-input
                        v-model="formData.end_amount"
                        placeholder="请输入结束面额"
                    />
                </el-form-item>
                <el-form-item label="开始时间">
                     <el-date-picker
                        v-model="formData.start_time"
                        type="datetime"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                     <el-date-picker
                        v-model="formData.end_time"
                        type="datetime"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div class="flex-space-between mb24">
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
                label="优惠券"
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
                        property="coupon_name"
                        label="优惠券名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="coupon_inside_name"
                        label="优惠券内部名称"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        property="coupon_type_name"
                        align="center"
                        label="类型"
                    ></el-table-column>
                    <el-table-column
                        property="coupon_price"
                        align="center"
                        label="面值"
                    ></el-table-column>
                    <el-table-column
                        property="coupon_num"
                        align="center"
                        label="总发行量"
                    ></el-table-column>
                    <el-table-column
                        property="time"
                        align="center"
                        label="有效期"
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
        </el-tabs>
    </select-dialog>
</template>

<script>
import tableMixins from './mixins/table'
export default {
    mixins: [tableMixins],
    data() {
        return {
            formData: {
                keyword: '',
                coupon_type: '',
                start_amount: '',
                end_amount: '',
                start_time: '',
                end_time: '',
            },
            listReqName: 'couponSelectList',
        }
    },
    methods: {
        // 查询
        handleQuery() {
            this.page = 1
            this.reqParams = this.formData
            this.getList()
        }
    }
}
</script>
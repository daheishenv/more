<style lang="scss" scoped>
.discounts-foot {
    display: flex;
    justify-content: flex-end;
    padding-top: 15px;
}
.discounts-query {
    display: flex;
    justify-content: flex-start;
    &__input {
        width: 350px;
        margin-left: 20px;
    }
    &__button {
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    &__pagination {
        padding-top: 15px;
        display: flex;
        justify-content: space-between;
        /deep/.el-pagination {
            display: flex;
            align-items: center;
            .btn-prev,
            .btn-next {
                outline: none;
                border: 0 !important;
            }
        }
    }
}

/deep/.el-radio {
    display: flex;
    .el-radio__label {
        white-space: break-spaces !important;
    }
}
</style>
<template>
    <el-dialog
        :visible.sync="value_"
        title="选择优惠卷"
        width="970px"
    >
        <el-tabs v-model="tabsActiveName">
            <el-tab-pane
                label="优惠卷"
                name="discounts"
            >
                <template>
                    <section class="discounts-query">
                        <el-select
                            v-model="remoteQuery.type"
                            @change="getQuery"
                            placeholder="全部类型"
                        >
                            <el-option
                                v-for="(v, i) in remoteData.types"
                                :label="v.label"
                                :value="v.value"
                                :key="i"
                            ></el-option>
                        </el-select>

                        <el-input
                            placeholder="请输入优惠卷名称"
                            class="discounts-query__input"
                            v-model="remoteQuery.input"
                            @keydown.native.enter="getQuery"
                        >
                            <template v-slot:append>
                                <el-button
                                    class="discounts-query__button"
                                    type="primary"
                                    plain
                                    @click="getQuery"
                                >查询</el-button>
                            </template>
                        </el-input>
                    </section>
                    <el-table
                        :data="remoteData.table"
                        ref="table"
                        @selection-change="handleSelectionChange"
                        @row-click="handleRowClick"
                        height="500"
                        v-loading="remoteQuery.loading"
                    >
                        <el-table-column
                            v-for="(v,i) in tableColumns"
                            :key="i"
                            :label="v.label"
                            :prop="v.prop"
                            :min-width="v.width"
                            :formatter="v.formatter"
                        >
                        </el-table-column>
                    </el-table>
                    <div class="discounts-query__pagination wopwo">
                        <div>已选择{{isCheck_ ? 0 : 1}}条,总共{{remoteData.total}}条,当前第{{remoteQuery.page}}页</div>
                        <el-pagination
                            @current-change="getCouponSelectList"
                            layout="prev, pager, next"
                            :page-size="remoteQuery.limit"
                            :total="remoteData.total"
                            :current-page.sync="remoteQuery.page"
                        >
                        </el-pagination>
                    </div>
                </template>
            </el-tab-pane>

        </el-tabs>
        <div class="discounts-foot">
            <el-button
                size="small"
                type="primary"
                @click="submit"
            >确定</el-button>
            <el-button
                size="small"
                @click="toggle(false)"
            >取消</el-button>
        </div>
    </el-dialog>
</template>

<script >
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        value_: {
            get() {
                return this.value
            },
            set(value) {
                this.toggle(value);
            }
        },
        isCheck_() {
            return this.remoteQuery.select === "";
        }
    },
    data() {
        return {
            tabsActiveName: "discounts",
            remoteData: {
                types: [],
                table: [],
                total: 1
            },
            tableColumns: [
                { label: '优惠卷名称', width: 125, formatter: (row) => <el-radio value={this.remoteQuery.select} label={row.id}>{row.coupon_name}</el-radio> },
                { label: '优惠券描述', prop: "coupon_name" },
                { label: '类型', prop: "coupon_type_name" },
                // {
                //     label: '有效时间', formatter: (row) => {
                //         return <div>
                //             <div>{row.start_time_date}</div>
                //             <div>{row.end_time_date}</div>
                //         </div>
                //     }
                // },
                { label: '面值', prop: "coupon_price"},
                {
                    label: '总发行量', formatter: (row) => {
                        return <div>
                            <div>{row.coupon_num - row.received}</div>
                        </div>
                    }
                },
                { label: '有效期', prop: "time" },
            ],
            remoteQuery: {
                type: "", //优惠卷类型
                input: "",//优惠卷名称
                select: "",//table切换下一页之后,radio label保存对象则回去前页面没有选中,故而使用两个对象来保存
                selectRow: {},//保存当前选中行数据
                limit: 10,
                page: 1,
                loading: false
            }
        }
    },
    created() {
        this.getCouponSelectList();
    },
    methods: {
        handleRowClick(row) {
            this.remoteQuery.select = row.id;
            this.remoteQuery.selectRow = row;
        },
        getQuery() {
            this.remoteQuery.page = 1;
            this.remoteQuery.row = "";
            this.remoteQuery.selectRow = {};
            this.getCouponSelectList();
        },
        async getCouponSelectList() {

            this.remoteQuery.loading = true;

            const { type, input, limit, page } = this.remoteQuery;

            const { data } = await this.$http("couponSelectList", {
                keyword: input,
                coupon_type: type,
                page: page,
                limit: limit,
                start_time: "",//发行 - 开始时间
                end_time: "",//发行 - 结束时间
                start_amount: "",//开始面额
                end_amount: ""//结束面额
            })

            this.remoteQuery.loading = false;

            //格式化type
            if (!this.remoteData.types.length) {
                this.remoteData.types = Object.entries(data.coupon_type).map(v => {
                    return { value: v[0], label: v[1] };
                })
            }

            this.remoteData.table = data.list;
            this.remoteData.total = data.count;
        },
        toggle(value) {
            this.$emit("input", value);
        },
        submit() {
            if (Object.keys(this.remoteQuery.selectRow).length <= 0) {
                this.$message.warning('请选择优惠券')
                return
            }
            this.remoteQuery.selectRow.surplus = this.remoteQuery.selectRow.coupon_num - this.remoteQuery.selectRow.received
            this.$emit("submit", {
                detail: {
                    value: this.remoteQuery.selectRow
                }
            })
            this.toggle(false);
        }
    },
}
</script>
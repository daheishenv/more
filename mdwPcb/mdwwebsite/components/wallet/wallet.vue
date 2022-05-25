<template>
    <div class="wallet">
        <div class="wallet-t flex">
            <div
                v-for="(item, index) in detail.wallet"
                :key="index"
                class="wallet-t-item"
                :class="{'border-r': index !== detail.wallet.length - 1 }"
            >
                <div class="wallet-t-item__word">{{ item.word }}</div>
                <div class="wallet-t-item__num">{{ item.num }}</div>
            </div>
        </div>
        <div class="wallet-b">
            <div class="wallet-b-title">
                <line-title title="交易明细">
                    <div class="wallet-b-time">
                        <div class="block">
                            <span class="demonstration">请选择时间：</span>
                            <el-date-picker
                                v-model="time"
                                type="month"
                                placeholder="请选择时间"
                                :editable="false"
                                format="yyyy-MM"
                                value-format="yyyy-MM"
                                @change="handleGetTime"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </line-title>
                </b-line-title>
            </div>
            <div
                v-if="contData.length"
                class="wallet-b-cont"
            >
                <div
                    v-for="(item, index) in contData"
                    :key="index"
                    class="wallet-b-cont-item"
                >
                    <div class="wallet-b-cont-item__title">
                        <div class="wallet-b-cont-item__title-l">
                            <span>{{ item.log_type || '账户充值' }}</span>
                            <span>{{ item.fuhao }}{{ item.total_money }}</span>
                        </div>
                        <div
                            class="wallet-b-cont-item__title-r"
                            :class="{'error-cls': item.res_type === '扣款失败'}"
                        >{{ item.res_type }}</div>
                    </div>
                    <div class="wallet-b-cont-item__cont">
                        <div class="wallet-b-cont-item__cont-row">
                            <div class="block-cont">
                                <span class="block-l">现金钱包：</span>
                                <span class="block-r">{{ item.pay_type == 10 ? '-' : '+' }}{{ item.cash_money }}</span>
                            </div>
                            <div class="block-cont">
                                <span class="block-l">优惠钱包：</span>
                                <span class="block-r">{{ item.pay_type == 10 ? '-' : '+' }}{{ item.coupon_money }}</span>
                            </div>
                            <div
                                v-if="item.pay_type != 10"
                                class="block-cont"
                            >
                                <span class="block-l">入账渠道：</span>
                                <span class="block-r">{{ item.inner_type || '-' }}</span>
                            </div>
                            <div
                                v-if="item.res_type === '充值成功'"
                                class="block-cont"
                            >
                                <span class="block-l">订单ID：</span>
                                <span class="block-r">{{ item.order_id }}</span>
                            </div>
                        </div>
                        <div class="wallet-b-cont-item__cont-row">
                            <div class="block-cont">
                                <span class="block-l">交易编号：</span>
                                <span class="block-r">{{ item.pay_sn }}</span>
                            </div>
                            <div class="block-cont">
                                <span class="block-l">交易时间：</span>
                                <span class="block-r">{{ item.create_time }}</span>
                            </div>
                        </div>
                        <div class="wallet-b-cont-item__cont-row">
                            <div class="block-cont">
                                <span class="block-l">备 注：</span>
                                <span class="block-r">{{ item.remark || '-' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <no-data
                v-else
                :show-img="!contData.length"
            />
        </div>
        <div
            v-if="contData.length"
            class="page"
        >
            <el-pagination
                v-if="showPageCom"
                ref="page"
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
                @current-change="changePage"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Wallet', // 钱包
    props: {
        contData: {
            type: Array,
            default: () => { return [] }
        },
        total: {
            type: [String, Number],
            default: 0
        },
        currentPage: {
            type: [String, Number],
            default: 1
        }
    },
    data() {
        return {
            showPageCom: true,
            time: '',
            detail: {}
        }
    },
    async created() {
        const { data: detail } = await this.$axios.$post('/company/getInfo')
        this.detail = detail
    },
    methods: {
        handleGetTime(e) {
            this.$emit('changeTime', {
                data: e
            })
        },
        changePage(e) {
            this.$emit('changePage', e)
        }
    }

}
</script>

<style lang="scss" scoped>
.wallet {
    // margin: 0 auto;
    // width: 980px;
    padding-bottom: 30px;
    .error-cls {
        color: #f60d0d !important;
    }

    &-t {
        background: #fff;
        justify-content: space-around;
        margin-bottom: 20px;
        padding: 46px 0;
        &-item {
            text-align: center;
            flex: 1;
            &.border-r {
                position: relative;
                &::before {
                    position: absolute;
                    content: "";
                    right: 0;
                    top: 50%;
                    width: 1px;
                    height: 40px;
                    background: #d6d6d6;
                    transform: translateY(-50%);
                }
            }
            &__word {
                font-size: 14px;
                color: #999;
                margin-bottom: 8px;
            }
            &__num {
                font-size: 28px;
                color: $--color-primary;
                font-weight: 600;
            }
        }
    }
    &-b {
        font-size: 16px;
        &-title {
            background: #fff;
            padding: 15px 40px;
            border-bottom: 2px solid #f3f5f6;
            .wallet-b-time {
                display: flex;
                flex-direction: row-reverse;
            }
        }
        &-cont {
            &-item {
                background: #fff;
                padding: 0 40px 26px;
                margin-bottom: 10px;
                &__title {
                    line-height: 78px;
                    border-bottom: 1px solid #f3f5f6;
                    display: flex;
                    justify-content: space-between;
                    &-l {
                        span:nth-child(1) {
                            color: #999;
                        }
                        span:nth-child(2) {
                            color: $--color-primary;
                            font-size: 20px;
                            font-weight: 500;
                            margin-left: 3px;
                        }
                    }
                    &-r {
                        color: $--color-primary;
                        // line-height: 70px;
                    }
                }
                &__cont {
                    .block-cont {
                        margin-top: 20px;
                        margin-left: 30px;
                        &:first-child {
                            margin-left: 0;
                        }
                    }
                    .block-l {
                        color: #999999;
                    }
                    .block-r {
                        color: #333333;
                    }
                    &-row {
                        display: flex;
                        flex-wrap: wrap;
                    }
                }
            }
        }
    }
    /deep/ .el-date-editor {
        width: 100px;
        .el-input__inner {
            line-height: 26px;
            height: 26px;
            padding: 0 10px;
        }
        .el-input__icon {
            display: none;
        }
    }
}
.page {
    width: 100%;
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
}
</style>

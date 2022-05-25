<template>
    <div class="order">
        <div class="order__header">
            <div class="order__header-flex">
                <div class="order__header-name">{{ order.plot }}</div>
                <el-select
                    v-show="mode == 'info'"
                    v-model="status"
                    class="status-select"
                    placeholder="请选择"
                    @change="selectChang"
                >
                    <el-option
                        v-for="item in order.status_option"
                        :key="item.status"
                        :label="item.title"
                        :value="item.status"
                    >
                    </el-option>
                </el-select>
            </div>
            <div
                class="order__header-info"
                :class="mode==='grab'?'grab':''"
            >
                <div class="left">
                    <div class="item">
                        <div class="item-lab">业主称呼：</div>
                        <div class="item-value">{{ order.owner_name }}</div>
                    </div>
                    <div class="item">
                        <div class="item-lab">联系电话：</div>
                        <div class="item-value">{{ order.owner_mobile }}</div>
                    </div>
                    <div class="item">
                        <div class="item-lab">订单编号：</div>
                        <div class="item-value">{{ order.order_sn }}</div>
                    </div>
                    <div class="item">
                        <div class="item-lab">出单时间：</div>
                        <div class="item-value">{{ order.out_time }}</div>
                    </div>
                    <div
                        v-if="mode==='grab'"
                        class="item"
                    >
                        <div class="item-lab">订单价格：</div>
                        <div class="item-value price">¥{{ order.order_price }}</div>
                    </div>
                </div>
                <div
                    v-if="mode==='info'"
                    class="btn"
                    @click="handleBtn('写记录',order)"
                >
                    <i class="iconfont icon-tianxiejilu"></i>
                    <span>写记录</span>
                </div>
                <div v-show="mode === 'grab'">

                    <div
                        v-if="order.btn_status"
                        class="btn grab"
                        @click="handleBtn('立即抢单',order)"
                    >
                        <span>{{ order.btn_text||'立即抢单' }}</span>
                    </div>
                    <div
                        v-else
                        class="btn grab btn-gray"
                    >
                        <span>{{ order.btn_text || order.btn_status_txt||'立即抢单' }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="order__house order__block">
            <line-title title="房屋信息" />
            <div class="order__house-info">
                <div class="item">
                    <div class="item-lab">房屋面积</div>
                    <div class="item-value">{{ order.house_area ||'—' }}</div>
                </div>
                <div class="item">
                    <div class="item-lab">装修类型</div>
                    <div class="item-value">{{ order.decorate_type_text ||'—' }}</div>
                </div>
                <div class="item">
                    <div class="item-lab">空间户型</div>
                    <div class="item-value">{{ order.house_type_name || '—' }}</div>
                </div>
                <div class="item">
                    <div class="item-lab">装修方式</div>
                    <div class="item-value">{{ order.decorate_way_text ||'—' }}</div>
                </div>
                <div class="item">
                    <div class="item-lab">预算费用</div>
                    <div class="item-value">{{ order.budget_money ||'—' }}</div>
                </div>
                <div class="item">
                    <div class="item-lab">风格偏好</div>
                    <div class="item-value">{{ order.decorate_name ||'—' }}</div>
                </div>
            </div>
        </div>
        <div
            v-if="lastest_"
            class="order__news order__block"
        >
            <img
                :src="require('@/assets/image/home/index-news.png')"
                alt="最新记录"
                class="order__news-banner"
            >
            <div class="order__news-info">
                <div class="lab">{{ lastest_.remark }}</div>
                <div class="time">{{ lastest_.create_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
            </div>
        </div>
        <div v-show="ismore">
            <div class="order__demand order__block">
                <line-title title="业主需求" />
                <div
                    class="order__demand-info"
                    v-html="order.owner_want"
                ></div>
            </div>
            <div
                v-if="mode === 'info'"
                class="order__track order__block"
            >
                <line-title title="跟踪记录" />
                <div class="order__track-info">
                    <steps
                        :active="1"
                        :list="order.log"
                    />
                </div>
            </div>
        </div>
        <div
            class="order__more"
            @click="handleMore"
        >
            <div class="order__more-btn">{{ moreText_ }}</div>
            <i
                class="iconfont icon-shouqigengduo"
                :class="ismore?'':'rade'"
            ></i>
        </div>
    </div>
</template>

<script>
import lineTitle from '@/components/line-title/line-title'
import steps from '@/components/home/steps'
import { parseTime } from '@/utils'

export default {
    components: {
        lineTitle,
        steps
    },
    filters: { parseTime },
    props: {
        order: {
            type: Object,
            default: () => {
                return {}
            }
        },
        mode: { // info|grab
            type: String,
            default: 'info'
        }
    },
    data() {
        return {
            ismore: false,
            status: ''
        }
    },
    computed: {
        lastest_() {
            return this.order.lastest && Object.keys(this.order.lastest).length && this.order.lastest
        },
        moreText_() {
            return this.ismore ? '收起更多' : '查看更多'
        }
    },
    created() {
        this.status = this.order.order_status
    },
    methods: {
        handleMore() {
            this.ismore = !this.ismore
        },
        handleCommand(e) {
            this.typeIndex = e.index
            this.$emit('changeState', {
                msg: '我全都要'
            })
        },
        handleBtn(e, order) {
            this.$emit('handleClick', {
                msg: e,
                data: order
            })
        },
        selectChang(val) {
            if (val === this.order.order_status) return false
            this.saveStatus(val)
        },
        async saveStatus(order_status) {
            const { order_id } = this.order
            const params = {
                order_status,
                order_id
            }
            const { code, msg } = await this.$axios.$post('/order/handleOrder', params)
            this.$message({
                type: code === 0 ? 'success' : 'error',
                message: msg
            })
            code === 0 && this.$emit('handleClick', {
                msg: 'refresh',
                data: this.order
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.order {
    padding: 26px 40px 0px 40px;
    background: #ffffff;
    &__header {
        &-flex {
            display: flex;
            align-items: center;
            .status-select {
                /deep/.el-input__icon {
                    line-height: 30px;
                    color: #4185ec;
                }
                /deep/.el-input__inner {
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 15px;
                    border-color: #4185ec;
                    color: #4185ec;
                }
                /deep/ .el-select__caret::before {
                    content: "\e78f";
                }
            }
        }
        &-name {
            font-size: 18rpx;
            font-weight: bold;
            color: #333333;
            line-height: 25px;
            margin-right: 16px;
        }

        &-btn {
            width: 80px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border-radius: 15px;
            border: 1px solid #4185ec;
            font-size: 14px;
            font-weight: 400;
            color: $--color-primary;
            line-height: 1em;
            cursor: pointer;
            .iconfont {
                width: 12px;
                font-size: 12px;
                transform: scale(0.8);
            }
        }

        &-menu {
            ::v-deep .el-dropdown-menu__item:focus,
            .el-dropdown-menu__item:not(.is-disabled):hover {
                background-color: #f5faf7;
                color: #4185ec;
            }
        }

        &-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 28px;
            &.grab {
                .item {
                    &:not(:last-child) {
                        margin-right: 32px;
                    }
                }
            }
            .left {
                display: flex;
                align-items: center;
            }
            .btn {
                padding: 5px 15px;
                font-size: 14px;
                font-weight: 400;
                color: $--color-primary;
                line-height: 20px;
                border-radius: 36px;
                border: 1px solid $--color-primary;
                cursor: pointer;
                .iconfont {
                    font-size: 14px;
                    vertical-align: middle;
                }
                span {
                    cursor: pointer;
                    vertical-align: middle;
                }
                &.grab {
                    color: #ffffff;
                    background: linear-gradient(
                        360deg,
                        #4185ec 0%,
                        #8db6f4 100%
                    );
                    border: none;
                }
                &.btn-gray {
                    background: #dedede;
                    color: #ffffff;
                    border: #dedede;
                }
            }
            .item {
                display: flex;
                align-items: center;
                &:not(:last-child) {
                    margin-right: 60px;
                }
                &-lab {
                    font-size: 14px;
                    font-weight: 400;
                    color: #999999;
                    line-height: 20px;
                }
                &-value {
                    font-size: 14px;
                    font-weight: 400;
                    color: #333333;
                    line-height: 20px;
                }
            }
            .price {
                font-size: 20px;
                font-weight: bold;
                color: $--color-primary;
                line-height: 28px;
            }
        }
    }
    &__block {
        padding: 20px 20px 30px 20px;
        background: rgba(51, 51, 51, 0.03);
        margin-top: 20px;
    }
    &__house {
        &-info {
            display: flex;
            align-items: flex-start;
            justify-content: space-around;
            margin-top: 30px;
            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                &-lab {
                    font-size: 12px;
                    font-weight: 400;
                    color: #999999;
                    line-height: 17px;
                }
                &-value {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333333;
                    line-height: 22px;
                    margin-top: 12px;
                }
            }
        }
    }
    &__demand {
        &-info {
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            line-height: 30px;
            padding: 0 52px 0 57px;
            margin-top: 25px;
            white-space: pre-line;
            word-break: break-all;
        }
    }
    &__track {
        &-info {
            margin-top: 28px;
            padding: 0 60px;
        }
    }
    &__more {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0;
        &-btn {
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            line-height: 20px;
            cursor: pointer;
            margin-right: 4px;
        }
        .iconfont {
            color: #979797;
            font-size: 12px;
            transition: 0.5s;
            &.rade {
                transform: rotate(180deg);
            }
        }
    }

    &__news {
        padding: 18px 20px 18px 20px;
        display: flex;
        align-items: center;
        &-banner {
            height: 15px;
            margin-right: 30px;
        }
        &-info {
            display: flex;
            align-items: center;
            word-break: break-all;
            .lab {
                font-size: 16px;
                font-weight: 400;
                color: #333333;
                line-height: 22px;
            }
            .time {
                font-size: 16px;
                font-weight: 400;
                color: #999999;
                line-height: 22px;
                margin-left: 40px;
                flex-shrink: 0;
            }
        }
    }
}
</style>

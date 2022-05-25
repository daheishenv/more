<template>
    <view>
        <view
            v-if="cFinish && cData.length"
            class="home-market-coupons"
            :style="[outerLayer_]"
        >
            <view
                class="home-market-coupons-bd"
                :style="[{padding: outerLayer_.padding}]"
            >
                <scroll-view :scroll-x="true">
                    <view
                        class="coupons-wrap c-row"
                        :style="[wrappingLines]"
                        :class="'coupons-wrap--' + mode_"
                    >
                        <view
                            v-for="(item, index) in cData"
                            :key="index"
                            :class="[
                                `c-col-${colIndex_}`, 
                                arrange_ === 'arr4' ? 'fixed-width' : '',
                                item.user_receive_status !== 1 ? 'coupons-invalid' : ''
                            ]"
                        >
                            <view
                                class="coupons"
                                :style="[ couponsStyle_(item.user_receive_status) ]"
                                :class="['coupons-' + arrange_]"
                            >
                                <template v-if="mode_ === 'style1' || mode_ === 'style2'">
                                    <view
                                        class="coupons-left"
                                        :class="'coupons-left-' + arrange_"
                                        @click="gainCoupons(index)"
                                    >
                                        <view class="coupons-price c-ellipsis">
                                            <view
                                                class="price price-com"
                                                :class="{isNoPrice: item.coupon_type != 1 && item.coupon_type != 3}"
                                            >
                                                <text>{{ item.show_coupon_price_text }}</text>
                                            </view>
                                        </view>
                                        <view class="coupons-left-content flex-1">
                                            <view
                                                v-if="arrange_ === 'arr1'"
                                                class="title c-ellipsis"
                                            >{{ item.coupon_name }}</view>
                                            <!-- <template v-if="item.rule.length">
                                                <view
                                                    v-for="(val,idx)  in item.rule"
                                                    :key="idx"
                                                    class="subtitle c-ellipsis"
                                                >{{ val }}</view>
                                            </template> -->
                                            <view class="subtitle c-ellipsis">{{ item.condition }}</view>
                                        </view>
                                    </view>
                                    <view v-if="mode_ === 'style2' && arrange_ !== 'arr1'"></view>
                                    <view
                                        v-else
                                        class="coupons-right"
                                        @click.stop
                                    >
                                        <c-button
                                            :width="arrange_ === 'arr1' ? 120 : 20"
                                            size="mini"
                                            radius="4"
                                            height="100%"
                                            @click="gainCoupons(index)"
                                        >
                                            <text>{{ btnText_(item.user_receive_status) }}</text>
                                        </c-button>
                                    </view>
                                </template>
                                <template v-else-if="mode_ === 'style3'">
                                    <view
                                        class="coupons-left"
                                        :class="'coupons-left-' + arrange_"
                                        @click="gainCoupons(index)"
                                    >
                                        <view class="coupons-price c-ellipsis">
                                            <view
                                                class="price price-com"
                                                :class="{isNoPrice: item.coupon_type != 1 && item.coupon_type != 3, grey: item.user_receive_status != 1}"
                                            >
                                                <text>{{ item.show_coupon_price_text }}</text>
                                            </view>
                                        </view>
                                        <view class="coupons-left-content c-fff flex-1">
                                            <view class="title c-ellipsis">{{ item.coupon_name }}</view>
                                            <!-- <template v-if="item.rule.length">
                                                <view
                                                    v-for="(val,idx)  in item.rule"
                                                    :key="idx"
                                                    class="subtitle c-ellipsis"
                                                >{{ val }}</view>
                                            </template> -->
                                            <view
                                                class="subtitle c-ellipsis"
                                                :class="arrange_ === 'arr3' ? 'w120' : ''"
                                            >{{ item.condition }}</view>
                                        </view>
                                    </view>
                                    <view
                                        v-if="arrange_ === 'arr1'"
                                        class="coupons-right"
                                    >

                                        <c-colors
                                            :theme="['#fff', item.user_receive_status == 1 ?  couponsTxt_: '#9b989c' ]"
                                            :pro="['bgc', 'c']"
                                            radius="4"
                                        >
                                            <c-button
                                                width="128"
                                                height="40"
                                                size="mini"
                                                radius="4"
                                            >
                                                <text>{{ btnText_(item.user_receive_status) }}</text>
                                            </c-button>
                                        </c-colors>
                                    </view>
                                </template>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[outerLayer_]"
        >
            <c-image
                :src="`skeleton-screen/${config.module}_${mode_}-${arrange_}.png`"
                width="100%"
                mode="widthFix"
            />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HomeMarketCoupons',
    mixins: [homeComponentMixins],
    computed: {
        btnText_() {
            return function (val) {
                if (val === 0) {
                    return '已领取'
                } else if (val === 2) {
                    return '已领完'
                } else if (val === 1) {
                    return this.arrange_ === 'arr1' ? '立即领取' : '领取'
                }
                return '已领取'
            }
        },
        // 排列样式
        arrange_() {
            return this.extra_.arrange || 'arr1'
        },
        wrappingLines() {
            console.log(this.arrange_ === 'arr4')
            return { flexWrap: this.arrange_ === 'arr4' ? 'nowrap' : 'wrap' }
        },
        // flex 一行几个
        colIndex_() {
            let index = 12
            switch (this.arrange_) {
                case 'arr1':
                    index = 12
                    break
                case 'arr2':
                    index = 6
                    break
                case 'arr3':
                    index = 4
                    break
            }
            return index
        },
        couponsColor_() {
            return this.extra_.couponsColor || ''
        },
        // 优惠券背景色
        couponsBg_() {
            return this.couponsColor_.split('-')[0] || 'red'
        },
        // 优惠券文字颜色, 风格1,2中文字颜色为白色
        couponsTxt_() {
            if (this.mode_ === 'style1' || this.mode_ === 'style2') {
                if (this.couponsBg_ === 'red' || this.couponsBg_ === 'blue' || this.couponsBg_ === 'black') return '#ffffff'
            }
            return this.couponsColor_.split('-')[1] || '#ffffff'
        },
        // 背景图
        couponsStyle_() {
            return (status) => {
                const flag = status === 1
                const color = flag ? this.couponsBg_ : 'grey'
                return {
                    backgroundImage: `url(${this.frontOssImgUrl_}drag/coupons/${this.mode_}-${this.arrange_}-${color}.png)`,
                    color: flag ? this.couponsTxt_ : '#fff'
                }
            }
        }
    },
    methods: {
        async gainCoupons(index) {
            const { coupon_id, user_receive_status } = this.cData[index]
            // if (user_receive_status === 0) return
            try {
                const { data } = await this.$http('giveCoupon', { coupon_id: coupon_id })
                this.$set(this.cData[index], 'user_receive_status', data.user_receive_status)
            } catch ({ data }) {
                if (!data) return
                this.$set(this.cData[index], 'user_receive_status', data.user_receive_status)
                console.log(this.cData)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home-market-coupons {
    .coupons-wrap {
        .coupons {
            &:nth-child(1) {
                margin-top: 0 !important;
            }
            // background: rgb(253, 244, 237);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            @include flex(row);
            align-items: center;
            justify-content: space-between;
            border-radius: 16rpx;
            padding: 0px 24rpx 0 0 !important;
            &-price {
                font-weight: bold;
                padding-left: 24rpx;
                .pice-com {
                    vertical-align: baseline;
                }
                .price {
                    &.isNoPrice {
                        font-size: 36rpx;
                        vertical-align: middle;
                        &::before {
                            content: '';
                        }
                    }
                }
            }
            &-left {
                @include flex(row);
                align-items: center;
                justify-content: space-between;
                padding: 32rpx 0;
                flex: 1;
                &-content {
                    padding-left: 24rpx;
                    @include flex(column);
                    width: 100%;
                }
                .title {
                    font-size: 28rpx;
                    font-weight: bold;
                    & + .subtitle {
                        margin-top: 8rpx;
                    }
                }
                .subtitle {
                    font-size: 24rpx;
                    line-height: 33rpx;
                }
            }
            &-right {
                padding-right: 0;
            }
        }
        .fixed-width {
            width: 272rpx;
            flex-shrink: 0;
        }

        // 风格1
        &--style1 {
            .coupons {
                height: 160rpx;
            }
            .coupons-left {
                width: calc(100% - 24rpx);
                &-content {
                    padding-top: 4rpx;
                }
                // 一行一列
                &-arr1 {
                    display: flex;
                    .coupons-price {
                        width: 180rpx;
                        padding-left: 48rpx;
                    }
                    .coupons-left-content {
                        width: 250rpx;
                        padding-left: 0;
                    }
                }
                // 一行两列
                &-arr2 {
                    display: block;
                }
                // 一行三列
                &-arr3 {
                    display: block;
                }
                // 横向滑动
                &-arr4 {
                    display: block;
                }
            }
        }
        // 风格2
        &--style2 {
            .coupons {
                height: 160rpx;
            }
            .coupons-left {
                width: calc(100% - 24rpx);
                &-content {
                    padding-top: 4rpx;
                }
                // 一行一列
                &-arr1 {
                    .coupons-price {
                        width: 180rpx;
                        padding-left: 48rpx;
                    }
                    .coupons-left-content {
                        width: 250rpx;
                        padding-left: 0;
                    }
                }
                // 一行两列
                &-arr2 {
                    display: block;
                    text-align: center;
                }
                // 一行三列
                &-arr3 {
                    display: block;
                    text-align: center;
                }
                // 横向滑动
                &-arr4 {
                    display: block;
                    text-align: center;
                    .coupons-price {
                        padding: 0 0 0 24rpx;
                    }
                }
            }
        }

        // 风格3
        &--style3 {
            .coupons {
                &-arr1,
                &-arr2 {
                    height: 160rpx;
                }
                &-arr3,
                &-arr4 {
                    height: 262rpx;
                }
            }
            .coupons-left {
                width: 100%;
                // 一行一列
                &-arr1 {
                    .coupons-price {
                        width: 220rpx;
                        padding-left: 48rpx;
                    }
                    .coupons-left-content {
                        width: 250rpx;
                        padding-left: 0;
                    }
                }
                // 一行两列
                &-arr2 {
                    .coupons-price {
                        width: 160rpx;
                        flex-shrink: 0;
                        padding-left: 40rpx;
                    }
                    .coupons-left-content {
                        padding-left: 12rpx;
                        width: 50%;
                    }
                }
                // 一行三列
                &-arr3 {
                    display: block;
                    width: calc(100% - 24rpx);
                    text-align: center;
                    padding: 10rpx 0;
                    .coupons-price {
                        padding-left: 24rpx;
                    }
                    .coupons-left-content {
                        padding-top: 52rpx;
                        padding-left: 24rpx;
                        width: 100%;
                    }
                }
                // 横向滑动
                // 横向滑动
                &-arr4 {
                    display: block;
                    text-align: center;
                    padding: 16px 0 12px;
                    .coupons-price {
                        padding-left: 24rpx;
                    }
                    .coupons-left-content {
                        padding-top: 48rpx;
                        padding-left: 24rpx;
                        width: 100%;
                    }
                }
                .coupons-left-content {
                    color: #ffffff;
                }
            }
        }
    }
    .price-com {
        font-size: 48rpx;
    }
    .grey {
        color: #9b989c;
    }
}
</style>

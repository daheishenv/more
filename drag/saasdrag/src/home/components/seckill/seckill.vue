<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-seckill"
            :class="[
                hasBg_ ? 'home-seckill--hasBg' : '',
                `home-seckill--${extra_.mode}`
            ]"
            :style="[outerLayer_]"
        >
            <view :style="[titleLayer_]">
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    @click="$jump('seckill')"
                >
                    <template v-if="extra_.countdown && (curList_.status === 1 || curList_.status === 0)">
                        <view class="flex justify-end">
                            <text class="pr12">{{ curList_.status === 1 ? '距结束' : '距开始' }}</text>
                            <gc-count-down
                                font-size="26"
                                :timestamp="timestamp_"
                                :bg-color="outerLayer_.isBGC === 0 ? 'linear-gradient(136deg, #F15053 0%, #FC7384 100%)': 't'"
                                :separator-color="outerLayer_.isBGC === 0 ? '#FA3F1E' : 't'"
                                color="#fff"
                                @zero="handleGetList"
                            ></gc-count-down>
                        </view>
                    </template>
                </sub-home-module-title>
            </view>
            <view
                :style="[innerLayer_]"
                class="pt24 home-seckill-bd"
            >
                <scroll-view
                    class="c-underline"
                    scroll-x
                    scroll-with-animation
                    :scroll-into-view="timeTabId_"
                >
                    <view class="time-tabs">
                        <view
                            v-for="(item, index) in cData.list"
                            :id="'timeTab' + index"
                            :key="index"
                            class="time-tabs__item"
                            :class="{'time-tabs__item--active': menuIndex === index}"
                            @click="handleChangeTime(index)"
                        >
                            <c-colors :theme="[menuIndex === index ? 't': '#333']">
                                <view
                                    class="time-tabs__label d-din"
                                    :class="[
                                        !item.start_time ? 'bright-card' : '',
                                        menuIndex === index ? 'time-tabs__label--active' : ''
                                    ]"
                                >{{ item.start_time }}
                                </view>
                                <view
                                    v-if="extra_.statusTxt"
                                    class="time-tabs__name"
                                    :class="[!item.status_txt ? 'bright-card' : '']"
                                >{{ item.status_txt }}
                                </view>
                            </c-colors>
                            <c-colors
                                :pro="['bgc']"
                                :theme="[menuIndex === index ? 't': 'transparent']"
                                class="time-tabs__line"
                            >
                                <view class="time-tabs__line--bg"></view>
                            </c-colors>
                        </view>
                    </view>
                </scroll-view>
                <view
                    v-if="cFinish && curData_.length === 0"
                    class="ptb36"
                >
                    <c-no-data
                        show-img
                        :text="noDataText_"
                    ></c-no-data>
                </view>
                <sub-home-goods-list
                    :list="curData_"
                    :extra="extra_"
                    type="seckill"
                    jump-name="seckillDetails"
                />
            </view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[outerLayer_]"
        >
            <c-image
                :src="`skeleton-screen/${config.module}_${mode_}.png`"
                width="100%"
                mode="widthFix"
            />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页秒杀组件
export default {
    name: 'HomeSeckill',
    mixins: [homeComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    data() {
        return {
            cData: {},
            menuIndex: 0
        }
    },
    computed: {
        timeTabId_() {
            return 'timeTab' + (this.menuIndex - 1)
        },
        curData_() {
            // console.log((this.cData.list && this.cData.list[this.menuIndex] ? this.cData.list[this.menuIndex] : {}).goods || []);
            return (this.cData.list && this.cData.list[this.menuIndex] ? this.cData.list[this.menuIndex] : {}).goods || []
        },
        curList_() {
            return (this.cData.list || [])[this.menuIndex] || {}
        },
        timestamp_() {
            const serverTime = this.cData.server_time
            if (!Object.keys(this.curList_).length || !serverTime) return 0
            return (this.curList_.status === 0 ? this.curList_.start_time_stamp : this.curList_.end_time_stamp) - serverTime
        },
        hasBg_() {
            return parseInt(this.outerLayer_.isBGC) === 0
        }
    },
    methods: {
        handleChangeTime(index) {
            this.menuIndex = index
        }
    }
}
</script>

<style lang="scss" scoped>
.home-seckill {
    background-size: cover !important;
    overflow: hidden;
    /deep/ .c-btn__border {
        display: none;
    }
    // &-bd {
    //     background-size: cover !important;
    // }
    .time-tabs {
        text-align: left;
        white-space: nowrap;
        font-size: 0;
        // height: 92rpx;

        &__item {
            position: relative;
            padding: 0 44rpx;
            display: inline-block;
            // height: 94rpx;
            color: #999999;
            text-align: center;
            min-width: 82rpx;
            padding: 0 44rpx 16rpx;

            &--active {
                font-weight: bold;
            }
        }

        &__line {
            @include abs(null, 50%, 4rpx);
            transform: translateX(50%);
            z-index: 10;

            &--bg {
                height: 6rpx;
                width: 80rpx;
            }
        }

        &__label {
            font-size: 32rpx;
            line-height: 38rpx;
            height: 38rpx;
            &--active {
                font-weight: bold;
            }
        }

        &__name {
            font-size: 26rpx;
            line-height: 30rpx;
            height: 30rpx;
            margin-top: 10rpx;
        }
    }
    &--hasBg {
        .c-underline::after {
            background-color: rgba(0, 0, 0, 0.05);
            left: 24rpx;
            right: 24rpx;
        }
        .time-tabs {
            &__item {
                &--active {
                    /deep/ .c-colors {
                        color: #f25255 !important;
                    }
                    .time-tabs__line {
                        // #ifdef H5
                        background-color: #f25255 !important;
                        // #endif
                        /deep/ .c-colors {
                            background-color: #f25255 !important;
                        }
                    }
                }
            }
        }
        /deep/ .home-goods__item {
            padding: 20rpx 16rpx 0;
            .home-goods__title {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                display: block;
                height: 40rpx;
                font-size: 26rpx;
                color: #333;
            }
            .home-goods__seckill-text {
                display: none;
            }
            .home-goods__shopcard {
                .c-btn {
                    background: linear-gradient(
                        136deg,
                        #f15053 0%,
                        #fc7384 100%
                    ) !important;
                    height: 40rpx !important;
                    font-size: 22rpx;
                }
                .c-btn__border {
                    display: none;
                }
            }
        }
    }
    &--style2,
    &--style3,
    &--style4,
    &--style6 {
        /deep/ .home-goods__desc {
            flex-direction: column;
            .home-goods__shopcard {
                position: relative;
                top: 0;
                transform: translateY(0);
                margin-top: 12rpx;
            }
        }
        /deep/ .style6-big {
            .home-goods__desc {
                flex-direction: row;
                .home-goods__shopcard {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>

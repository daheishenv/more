<template>
    <c-popup
        v-model="showPopup"
        mode="bottom"
        :show-close="false"
        radius="24rpx 24rpx 0 0"
    >
        <view class="popup">
            <view
                class="popup__close"
                @click="showPopup=false"
            >
                <c-image
                    src="activity/lucky-draw/chance-close.png"
                    height="64"
                    width="50"
                />
            </view>
            <view class="popup__title">获得抽奖机会</view>
            <view class="popup__try">剩余次数
                <c-colors
                    :theme="['t']"
                    :pro="['c']"
                >
                    {{ chanceInfo.todaySurplusJoinTimes }}
                </c-colors>次
            </view>
            <view class="popup__content">
                <view class="popup__content-item">
                    <view class="info">
                        <c-image
                            src="activity/lucky-draw/chance-point.png"
                            height="116"
                            shape="circle"
                            width="116"
                            class="info__img"
                        />
                        <view class="info__right">
                            <view class="info__right-name">积分兑换</view>
                            <view class="info__right-desc">{{ chanceInfo.pointExchangeTimes }}积分兑换一次</view>
                        </view>
                    </view>
                    <c-colors
                        :theme="['t', '#fff']"
                        :pro="['bgc', 'c']"
                        radius="38"
                        type="button"
                        class="btn"
                    >
                        <c-button
                            plain
                            font-size="24rpx"
                            height="56rpx"
                            @click="handleExchange"
                        >立即兑换</c-button>
                    </c-colors>
                </view>
                <view class="popup__content-item">
                    <view class="info">
                        <c-image
                            src="activity/lucky-draw/chance-pull.png"
                            height="116"
                            shape="circle"
                            width="116"
                            class="info__img"
                        />
                        <view class="info__right">
                            <view class="info__right-name">邀请{{ chanceInfo.pullNewTimes }}位新人注册可兑换{{ chanceInfo.pullNewExchangeTime }}次</view>
                            <view class="info__right-desc">今日兑换次数{{ chanceInfo.todayPullNewGetTimes }}次</view>
                        </view>
                    </view>
                    <c-colors
                        :theme="['t', '#fff']"
                        :pro="['bgc', 'c']"
                        radius="38"
                        type="button"
                        class="btn"
                    >
                        <c-button
                            plain
                            font-size="24rpx"
                            height="56rpx"
                            @click="handleShare"
                        >立即邀请</c-button>
                    </c-colors>
                </view>
                <!-- <view class="popup__content-vtip">
                    <view class="popup__content-tip">
                        <c-icons
                            color="#B8B8B8"
                            :size="36"
                            type="icon-tishi"
                        ></c-icons>
                        <view class="tip">好友进入邀请链接，点击参与活动您可以获得次数啦～
                            同一好友24小时之内首次邀请有效哦！</view>
                    </view>
                </view> -->
            </view>
        </view>
    </c-popup>
</template>

<script>
export default {
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        chanceInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            showPopup: this.value
        }
    },
    computed: {

    },
    watch: {
        value(nValue) {
            this.showPopup = nValue
        },
        showPopup(nValue) {
            this.$emit('input', nValue)
        }
    },
    methods: {
        handleExchange() {
            this.$emit('chancePoint')
        },
        handleShare() {
            this.$emit('chanceShare')
        },
        handleContinue() {
            this.showPopup = false
        }
    }
}
</script>

<style lang="scss" scoped>
.popup {
    padding-top: 30rpx;
    background: linear-gradient(180deg, #fff7ee 0%, #ffffff 20%);
    &__title {
        font-size: 36rpx;
        font-weight: 400;
        color: #333333;
        line-height: 50rpx;
        padding: 0 24rpx;
    }
    &__close {
        position: absolute;
        right: 38rpx;
        top: 0;
    }
    &__try {
        display: flex;
        font-size: 28rpx;
        color: #999999;
        padding: 0 24rpx;
        font-weight: 400;
        color: #999999;
        line-height: 40rpx;
        margin-top: 8rpx;
    }
    &__content {
        padding: 24rpx;
        &-item {
            height: 154rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff8f2;
            &:not(:first-of-type) {
                margin-top: 24rpx;
            }
            padding: 0 16rpx;
            .info {
                display: flex;
                align-items: center;
                &__img {
                    flex-shrink: 0;
                    margin-right: 20rpx;
                }
                &__right {
                    flex: 1;
                    overflow: hidden;
                    &-name {
                        overflow: hidden;
                        font-size: 28rpx;
                        font-weight: 400;
                        color: #333333;
                        line-height: 40rpx;
                        @include ellipsis(2);
                    }
                    &-desc {
                        max-width: 360rpx;
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #999999;
                        line-height: 33rpx;
                        margin-top: 8rpx;
                        @include ellipsis(1);
                    }
                }
            }
            .btn {
                flex-shrink: 0;
            }
        }
        &-vtip {
            padding: 0 16rpx;
            background: #fff8f2;
        }
        &-tip {
            display: flex;
            // align-items: center;
            font-size: 24rpx;
            color: #999999;
            padding: 22rpx 0 24rpx 0;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            font-size: 22rpx;
            font-weight: 400;
            color: #999999;
            line-height: 34rpx;
            .tip {
                margin-left: 13rpx;
            }
        }
    }
}
</style>

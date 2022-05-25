<template>
    <c-popup
        v-model="showPopup"
        mode="bottom"
        radius="24rpx 24rpx 0 0"
        :show-close="false"
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
            <view class="popup__prize">
                <view class="popup__prize-left">
                    <c-image
                        :src="prize.prize_img"
                        height="124"
                        width="124"
                    />
                </view>
                <view class="popup__prize-right">
                    <view class="name">{{ prize.prize_name }}</view>
                    <view>
                        <c-tag
                            radius="8"
                            :bg-color="prize.isAsh?'#F5F5F5':'#FFF0E7'"
                            :color="prize.isAsh?'#999999':'#FF6C00'"
                        >{{ prize.status_text }}</c-tag>
                    </view>
                </view>
            </view>
            <view class="popup__info">
                <view
                    v-if="prize.prize_type ===1"
                    class="popup__info-item"
                >
                    <view class="title">
                        <c-image
                            src="activity/lucky-draw/details-hourglass.png"
                            height="27"
                            width="27"
                            class="title-icon"
                        />
                        <view class="title-t1">兑奖期限</view>
                    </view>
                    <view class="content">
                        {{ prize.exchangeTime }}
                    </view>
                </view>
                <view
                    v-else-if="prize.prize_type ===2"
                    class="popup__info-item"
                >
                    <view class="title">
                        <c-image
                            src="activity/lucky-draw/details-gif.png"
                            height="27"
                            width="27"
                            class="title-icon"
                        />
                        <view class="title-t1">活动奖品</view>
                    </view>
                    <view class="content content--block">
                        <view class="content-t1">{{ prize.couponStr }}</view>
                        <view class="content-t2">{{ prize.couponName }}</view>
                        <!-- <view class="content-ellipsis">{{ prize.couponStr }}</view> -->
                    </view>
                </view>
                <view
                    v-else-if="prize.prize_type ===3"
                    class="popup__info-item"
                >
                    <view class="title">
                        <c-image
                            src="activity/lucky-draw/details-integral.png"
                            height="27"
                            width="27"
                            class="title-icon"
                        />
                        <view class="title-t1">积分</view>
                    </view>
                    <view class="content content--block">
                        <view class="content-ellipsis">{{ prize.points }}积分</view>
                    </view>
                </view>
                <view class="popup__info-item">
                    <view class="title">
                        <c-image
                            src="activity/lucky-draw/details-rules.png"
                            height="27"
                            width="27"
                            class="title-icon"
                        />
                        <view class="title-t1">奖品说明</view>
                    </view>
                    <view class="content">
                        <view class="content-value">{{ prize.prize_desc }}</view>
                    </view>
                </view>
                <view class="popup__info-item">
                    <view class="title">
                        <c-image
                            src="activity/lucky-draw/details-time.png"
                            height="27"
                            width="27"
                            class="title-icon"
                        />
                        <view class="title-t1">中奖时间</view>
                    </view>
                    <view class="content">
                        <view>{{ prize.create_time }}</view>
                    </view>
                </view>

            </view>
            <view class="popup__btns">
                <c-colors
                    v-if="prize.status===0 && prize.receive_prize_way===1"
                    :theme="['t', '#fff']"
                    :pro="['bgc', 'c']"
                    type="button"
                >
                    <c-button
                        radius="36"
                        font-size="28rpx"
                        height="72rpx"
                        form-type="submit"
                        @click.stop="handleGet"
                    >立即领取</c-button>
                </c-colors>
            </view>
        </view>
    </c-popup>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        prize: {
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
    watch: {
        value(nValue) {
            this.showPopup = nValue
        },
        showPopup(nValue) {
            this.$emit('input', nValue)
        }
    },
    methods: {
        handleGet() {
            this.showPopup = false
            this.$emit('handle-get')
        }
    }
}
</script>

<style lang="scss" scoped>
.popup {
    padding: 88rpx 32rpx 40rpx 32rpx;
    &__close {
        position: absolute;
        right: 38rpx;
        top: 0;
    }
    &__prize {
        display: flex;
        align-items: center;
        &-left {
            display: flex;
            width: 170rpx;
            height: 170rpx;
            background: #fff8f4;
            flex-shrink: 0;
            margin-right: 24rpx;
            align-items: center;
            justify-content: center;
        }
        &-right {
            flex: 1;
            align-self: stretch;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 12rpx 0 29rpx 0;
            overflow: hidden;
            .name {
                font-size: 32rpx;
                font-weight: 500;
                color: #333333;
                line-height: 34rpx;
                @include ellipsis(2);
            }
        }
    }
    &__info {
        margin-top: 47rpx;
        &-item {
            margin-top: 40rpx;
            .title {
                display: flex;
                align-items: center;
                &-icon {
                    flex-shrink: 0;
                    margin-right: 16rpx;
                }
                &-t1 {
                    flex: 1;
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #333333;
                    line-height: 34rpx;
                }
            }
            .content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20rpx;
                font-size: 24rpx;
                font-weight: 400;
                color: #333333;
                line-height: 40rpx;
                @include ellipsis;
                &--block {
                    height: 88rpx;
                    background: #fff8f4;
                    border-radius: 8px;
                    padding: 0 28rpx;
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #ff7815;
                    line-height: 34rpx;
                }
                &-value {
                    @include ellipsis(4);
                }
                &-t1 {
                    width: 180rpx;
                    @include ellipsis;
                }
                &-t2 {
                    max-width: 400rpx;
                    @include ellipsis;
                }
                &-ellipsis {
                    @include ellipsis;
                }
            }
        }
    }
    &__btns {
        margin-top: 40rpx;
    }
}
</style>

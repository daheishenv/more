<template>
    <c-popup
        v-model="showPopup"
        mode="right"
        width="100%"
        mask="false"
        bg-color="transparent"
    >
        <view class="poster">
            <view class="poster__header">
                <sub-activity-header :config="config" />
            </view>
            <view class="poster__content">
                <c-image
                    :src="info.shareImg"
                    width="100%"
                    height="1228"
                    mode="aspectFit"
                    type="upload"
                />
                <view class="user">
                    <view class="user__left">
                        <c-image
                            :src="info.avatar"
                            height="120"
                            shape="circle"
                            width="120"
                            class="user__left_avatar"
                        />
                        <view class="user__left-info">
                            <view class="name">{{info.userName}}</view>
                            <view class="desc">{{info.desc}}</view>
                        </view>
                    </view>
                    <view class="user__code">
                        <c-image
                            :src="info.qrCode"
                            height="107"
                            width="143"
                        />
                    </view>
                </view>
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
        config: {
            type: Object,
            default() {
                return {}
            }
        },
        info: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            showPopup: this.value,
        }
    },
    watch: {
        value(nValue) {
            this.showPopup = nValue
        },
        showPopup(nValue) {
            this.$emit('input', nValue)
        }
    }
}
</script>

<style lang="scss" scoped>
.poster {
    width: 100%;
    height: 789px;
    background-color: white;
    display: flex;
    flex-direction: column;
    overflow: auto;
    &__header {
        flex-shrink: 0;
    }
    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .user {
        height: 220rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 49rpx;
        // flex: 1;
        &__left {
            flex: 1;
            display: flex;
            align-items: center;
            &_avatar {
                flex-shrink: 0;
                margin-right: 24rpx;
            }
            &-info {
                align-self: stretch;
                padding-top: 20rpx;
                .name {
                    width: 300rpx;
                    height: 45rpx;
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #333333;
                    line-height: 45rpx;
                    @include ellipsis;
                }
                .desc {
                    width: 300rpx;
                    font-size: 24rpx;
                    font-weight: 500;
                    color: #666666;
                    line-height: 33rpx;
                    margin-top: 8rpx;
                    @include ellipsis;
                }
            }
        }
        &__code {
            height: 180rpx;
            width: 180rpx;
            flex-shrink: 0;
            margin-left: 24rpx;
            box-shadow: 0px 0px 10px 0px rgba(192, 192, 192, 0.5);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>

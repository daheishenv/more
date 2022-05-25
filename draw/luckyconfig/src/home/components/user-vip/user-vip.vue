<template>
    <!-- 会员升级 -->
    <view v-if="shopInfo_ && shopInfo_.member_upgrade_show" class="user-vip-content">
        <view v-if="mode_ === 'style1'">
            <view
                v-if="type_ === 'type1'"
                class="card back1"
            >
                <view class="style1-left">
                    <view class="style1-vip flex">
                        <c-image
                            size="40"
                            radius="28"
                            src="home/user/user-vip2.png"
                        ></c-image>
                        <view class="style1-title">
                            {{ extra_.title }}
                        </view>
                    </view>
                    <view class="style1-word c-ellipsis">
                        {{ extra_.sub_title }}
                    </view>
                </view>
                <view
                    class="right"
                    @tap="$jump('memberVip')"
                >
                    <text>{{ extra_.btn_text }}</text>
                </view>
            </view>
            <view
                v-else-if="type_ === 'type2'"
                class="card back2"
            >
                <view class="style2-left">
                    <view class="style2-vip flex">
                        <c-image
                            size="30"
                            radius="28"
                            src="home/user/user-vip1.png"
                        ></c-image>
                        <view class="style2-title">
                            {{ extra_.title }}
                        </view>
                    </view>
                    <view class="style2-word c-ellipsis">
                        {{ extra_.sub_title }}
                    </view>
                </view>
                <view @tap="$jump('memberVip')">
                    <c-image
                        size="56"
                        src="home/user/user-right.png"
                    ></c-image>
                </view>
            </view>
            <view
                v-else-if="type_ === 'type3'"
                class="card back3"
            >
                <view class="left">
                    <view class="vip">
                        <view class="img">
                            <c-image
                                size="56"
                                radius="28"
                                src="user/updata_vip.png"
                            ></c-image>
                        </view>
                    </view>
                    <view class="equity">
                        <view class="text">{{ extra_.title }}</view>
                        <view class="word c-ellipsis">{{ extra_.sub_title }}</view>
                    </view>
                </view>
                <view
                    class="right"
                    @tap="$jump('memberVip')"
                >
                    <text>{{ extra_.btn_text }}</text>
                </view>
            </view>
        </view>
        <view v-else-if="mode_ === 'style2'">
            <view
                class="card"
                style="margintop: -24rpx"
            >
                <c-image
                    width="710"
                    height="120"
                    radius="16"
                    type="upload"
                    :src="extra_.backgroundImage"
                ></c-image>
            </view>
        </view>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'

export default {
    mixins: [userComponentMixins],
    data() {
        return {}
    },
    computed: {
        type_() {
            return this.extra_.type || {}
        }
    }
}
</script>

<style lang="scss" scoped>
.user-vip-content {
    position: relative;
    z-index: 2;
    .card {
        margin: -60rpx 24rpx 0 24rpx;
        background-color: #333333;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            .vip {
                padding-right: 34rpx;
                flex-shrink: 0;
                width: 100rpx;
                .img {
                    width: 56rpx;
                    margin: 0 auto;
                }
            }
            .equity {
                color: #fff;
                line-height: 36rpx;
                font-size: 28rpx;
                width: 400rpx;
                .text {
                    color: #ffd7a9;
                    margin-top: 8rpx;
                    white-space: nowrap;
                }
                .word {
                    font-size: 24rpx;
                    margin-top: 8rpx;
                }
            }
        }
        .right {
            @include flex(row);
            align-items: center;
            justify-content: center;
            background: linear-gradient(90deg, #ffe4c0 0%, #ffc88e 100%);
            border-radius: 28rpx;
            padding: 12rpx 18rpx 12rpx 18rpx;
            font-size: 24rpx;
            line-height: 32rpx;
        }
        .style2-left {
            padding-left: 12rpx;
            width: 73%;
            .style2-vip {
                margin-bottom: 12rpx;
                align-items: center;
                .style2-title {
                    font-size: 26rpx;
                    color: #ffd7a9;
                    margin-left: 12rpx;
                    line-height: 44rpx;
                }
            }
            .style2-word {
                font-size: 24rpx;
                color: #e2be8b;
            }
        }
    
        .style1-left {
            padding-left: 12rpx;
            width: 73%;
            .style1-vip {
                margin-bottom: 8rpx;
                align-items: center;
                .style1-title {
                    font-size: 28rpx;
                    color: #ffd7a9;
                    margin-left: 12rpx;
                }
            }
            .style1-word {
                font-size: 22rpx;
                color: #e2be8b;
            }
        }
    }
    .back1 {
        padding: 24rpx;
        background: url($ossImgUrl + 'home/user/user-back1.png') no-repeat;
        background-size: 100% 100%;
    }
    .back2 {
        padding: 24rpx;
        background: url($ossImgUrl + 'home/user/user-back2.png') no-repeat;
        background-size: 100% 100%;
    }
    .back3 {
        padding: 24rpx;
        background: url($ossImgUrl + 'home/user/user-back3.png') no-repeat;
        background-size: 100% 100%;
    }
}
</style>

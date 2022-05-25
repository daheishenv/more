<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-shop-info"
            :style="[outerLayer_]"
        >
            <view
                class="home-shop-info-bd"
                :style="[ innerLayer_ ]"
            >
                <view class="home-shop-info__top">
                    <c-image
                        :src="cData.shop_logo"
                        height="82"
                        mode="heightFix"
                    />
                    <view class="flex-1 pl24">
                        <view
                            class="dt"
                            :class="{'dtCls': !mode}"
                        >{{ cData.shop_name }}</view>
                        <view
                            v-if="cData.advertise && mode"
                            class="dd"
                        >{{ cData.advertise }}</view>
                    </view>
                </view>
                <view
                    v-if="mode"
                    class="home-shop-info__middle"
                >
                    <view
                        class="item"
                        @tap="$jump('company?type=0')"
                    >
                        <text>企业介绍</text>
                    </view>
                    <view class="bar">
                        <text>|</text>
                    </view>
                    <view
                        class="item"
                        @tap="$jump('company?type=1')"
                    >
                        <text>企业动态</text>
                    </view>
                    <view class="bar">
                        <text>|</text>
                    </view>
                    <view
                        class="item"
                        @tap="$jump('company?type=2')"
                    >
                        <text>企业荣誉</text>
                    </view>
                    <view
                        class="right"
                        @tap="$jump('company')"
                    >
                        <text>详情</text>
                        <view class="icon">
                            <c-icons
                                size="24"
                                color="#666"
                                type="icon-tiaozhuan"
                            />
                        </view>
                    </view>
                </view>
                <view
                    v-else
                    class="home-shop-info__middle middle-style2"
                    @click="makePhoneCall"
                >
                    <c-colors :pro="['c']">
                        <view class="icon">
                            <c-icons
                                size="30"
                                type="icon-dianhua5"
                            />
                        </view>
                    </c-colors>
                    <view class="plr12 flex-1">{{ cData.mobile }}</view>
                    <view class="right">
                        <c-icons type="icon-tiaozhuan" />
                    </view>
                </view>
                <view
                    v-if="mode"
                    class="home-shop-info__bottom"
                >
                    <view class="home-shop-info__bottom-left flex-1">
                        <c-colors :pro="['c']">
                            <view class="icon">
                                <c-icons
                                    size="30"
                                    type="icon-dizhi"
                                />
                            </view>
                        </c-colors>
                        <text class="plr12">{{ cData.address }}</text>
                    </view>
                    <view class="home-shop-info__bottom-right">
                        <c-colors
                            :pro="['c']"
                            radius="25"
                            @tap="handleToMap"
                        >
                            <view class="icon">
                                <c-icons
                                    size="28"
                                    type="icon-daohang"
                                />
                            </view>
                        </c-colors>
                        <c-colors
                            :pro="['c']"
                            radius="25"
                            @tap="makePhoneCall()"
                        >
                            <view class="icon">
                                <c-icons
                                    size="28"
                                    type="icon-dianhua5"
                                />
                            </view>
                        </c-colors>
                    </view>
                </view>
                <view
                    v-else
                    class="home-shop-info__bottom bottom-style2"
                    @click="handleToMap"
                >{{ cData.address }}</view>
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
export default {
    name: 'HomeShopInfo',
    mixins: [homeComponentMixins],
    data() {
        return {
        }
    },
    computed: {
        // 风格类型
        mode() {
            if (this.mode_ === 'style1') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        makePhoneCall() {
            uni.makePhoneCall({
                phoneNumber: this.cData.mobile
            })
        },
        async handleToMap() {
            if (!this.cData.address) return this.$toast('公司地址不存在')
            const {
                data: {
                    location = {}
                }
            } = await this.$http('getLocalInfo', {
                address: this.cData.address
            })
            if (location.lat) {
                uni.openLocation({
                    latitude: location.lat,
                    longitude: location.lng,
                    name: this.cData.company_name,
                    address: this.cData.address,
                    complete: (err) => {
                        console.log(err)
                        if (err.errMsg !== 'openLocation:ok') {
                            this.$toast('暂无地图')
                        }
                    }
                })
                return
            }
            this.$toast('暂无地图')
        }
    }
}
</script>

<style lang="scss" scoped>
.home-shop-info {
    &-bd {
        padding: 24rpx;
    }

    &__top {
        @include flex(row);
        align-items: center;

        .img {
            padding-right: 26rpx;
        }

        .flex-1 {
            @include flex;
            justify-content: space-between;

            .dt {
                font-size: 28rpx;
                line-height: 1;
                color: #333;
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
            }

            .dd {
                margin-top: 16rpx;
                font-size: 22rpx;
                color: #999;
            }
        }
    }

    &__bottom {
        margin-top: 24rpx;
        display: flex;
        align-items: center;

        &.bottom-style2 {
            margin-top: 0;
            display: flex;
            align-items: center;
            height: 100rpx;
            padding: 0 88rpx 0 24rpx;
            font-size: 28rpx;
            color: #333333;
            line-height: 40rpx;
            background: #fbfbfb url($ossImgUrl + 'home/address.png') right
                center / auto 120% no-repeat;
        }

        &-left {
            padding-right: 24rpx;
            color: #333;
            @include flex(row);
            align-items: center;
            font-size: 24rpx;
            line-height: 1.5;
        }

        &-right {
            flex-shrink: 0;
            margin-left: auto;
            @include flex(row);
            justify-content: space-between;
            width: 128rpx;

            .icon {
                background-color: #f9f9f9;
                border-radius: 50%;
                display: flex;
                align-items: flex-end;
                align-items: center;
                justify-content: center;
                height: 50rpx;
                width: 50rpx;
            }
        }
    }

    &__middle {
        margin-top: 24rpx;
        display: flex;
        align-items: center;
        background-color: #fbfbfb;
        border-radius: 4rpx;
        color: #666;
        font-size: 24rpx;
        height: 92rpx;
        padding: 0 24rpx;
        margin-bottom: 24rpx;

        &.middle-style2 {
            margin: 0;
            @include flex(row);
            align-items: center;
            font-size: 28rpx;
            color: #333333;
            padding: 0;
            height: 90rpx;
            background: #fff;
        }

        .right {
            margin-left: auto;
            display: flex;
            align-items: center;
            line-height: 1;

            .icon {
                position: relative;
                bottom: -3rpx;
            }
        }

        .bar {
            padding: 0 4rpx;
        }
    }
}
</style>

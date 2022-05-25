<template>
    <view
        v-if="!$isEmpty(config)"
        class="guide"
        :class="{'guide-style3': mode==='style3'}"
    >
        <view v-if="mode==='style1' || mode==='style3'">
            <view
                v-if="mode==='style1'"
                class="guide-title"
            >
                当前服务导购
            </view>
            <view class="flex">
                <view class="shop-logo">
                    <c-image
                        size="88"
                        radius="44"
                        :src="config.head || 'gongchang/shop/index/guide2.png'"
                    />
                    <view class="shop-logo-word"></view>
                </view>
                <view class="flex pl24 guide-cont">
                    <view class="guide-l">
                        <view class="flex align-center">
                            <view class="guide__name c-ellipsis flex-1">
                                {{ config.real_name || '用户名' }}
                            </view>
                        </view>
                        <view class="flex align-center pr16">
                            <view class="guide__collection-num">{{ config.shop_name || '官方旗舰店' }}</view>
                        </view>
                    </view>
                    <view
                        v-if="mode==='style1'"
                        class="flex guide-r"
                    >
                        <view class="flex guide-r-item">
                            <view class="plr12 flex">
                                <c-colors
                                    :pro="['bgc']"
                                    :theme="['#FFEBEA']"
                                    radius="50"
                                    class="p12"
                                >
                                    <c-icons
                                        type="icon-daohang"
                                        size="36"
                                        color="#FF4432"
                                    />
                                </c-colors>
                            </view>
                            <view class="guide-r-item-word">导航</view>
                        </view>
                        <view class="flex guide-r-item">
                            <view
                                class="plr12 flex"
                                @click="openLocation"
                            >
                                <c-colors
                                    :pro="['bgc']"
                                    :theme="['#FFF2E2']"
                                    radius="50"
                                    class="p12"
                                >
                                    <c-icons
                                        type="icon-dianhua5"
                                        size="36"
                                        color="#FF9B1E"
                                    />
                                </c-colors>
                            </view>
                            <view
                                class="guide-r-item-word"
                                @click="makePhone(config.mobile)"
                            >电话</view>
                        </view>
                    </view>
                    <view
                        v-if="mode==='style3'"
                        class="user-advisory-img"
                    >
                        <c-image
                            size="50"
                            src="home/user/user-advisory1.png"
                        />
                    </view>
                </view>
            </view>
            <view
                class="guide__address flex align-center"
                @click="openLocation"
            >
                <view class="guide__address-icon">
                    <c-icons
                        color="#999"
                        :size="28"
                        type="icon-dizhi-empty"
                    ></c-icons>
                </view>
                <view class="right-address">{{ config.address_text || '福建省厦门市思明区软件园望海路65之一' }}</view>
            </view>

        </view>
        <view v-if="mode==='style2'">
            <view class="guide-caption">
                {{ config.shop_name || '' }}
            </view>
            <view
                class="guide-style2-address flex"
                @click="openLocation"
            >
                <view class="guide-style2-address-l flex">
                    <c-icons
                        color="#999"
                        :size="28"
                        type="icon-dizhi-empty"
                        class="icon-l"
                    ></c-icons>
                    <view class="guide-style2-address-l-text">{{ config.address_text }}</view>
                    <c-icons
                        color="#999"
                        :size="28"
                        type="icon-tiaozhuan"
                        class="icon-r"
                    ></c-icons>
                </view>
                <view class="guide-style2-address-r">
                    距离{{ distance || 0 }}m
                </view>
            </view>
            <view class="guide-contact">
                <view class="flex align-center">
                    <c-image
                        size="48"
                        radius="100"
                        :src="config.head"
                        class="guide-contact__img"
                    />
                    <view class="guide-contact__word">{{ config.real_name }}</view>
                </view>
                <view class="flex guide-contact-btn">
                    <c-colors
                        :theme="['#F5F6FA', '#333']"
                        :pro="['bgc', 'c']"
                        type="button"
                        @click="handleCustomerService"
                    >
                        <c-button radius="60">在线咨询</c-button>
                    </c-colors>
                    <!-- #ifdef MP-WEIXIN -->
                    <c-button
                        open-type="contact"
                        bindcontact="handleContact"
                        height="110"
                    >
                        <c-image
                            src="home/kefu.png"
                            size="110"
                            radius="56"
                            mode="aspectFill"
                        />
                    </c-button>
                    <!-- #endif -->
                    <c-colors
                        :theme="['#F5F6FA', '#333']"
                        :pro="['bgc', 'c']"
                        type="button"
                        class="ml24"
                        @click="makePhone(config.mobile)"
                    >
                        <c-button radius="60">电话沟通</c-button>
                    </c-colors>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'
export default {
    name: 'Guide',
    mixins: [userComponentMixins], // 服务导购
    props: {
        mode: {
            type: String,
            default: 'style3'
        },
        config: {
            type: [Object, Array],
            default() {
                return {}
            }
        },
        shop: {
            type: Object,
            default: () => ({
                shop_name: '店铺名'
            })
        }
    },
    data() {
        return {
        }
    },
    watch: {
        config: {
            handler() {
                if (this.config.lat && this.mode === 'style2') {
                    this.getLocation()
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        getLocation() {
            const getStorage = uni.getStorageSync(this.$config.localCityCatchName)
            const lng1 = getStorage[0].longitude
            const lat1 = getStorage[0].latitude
            const lat2 = this.config.lat
            const lng2 = this.config.lng
            const rad1 = lat1 * Math.PI / 180.0
            const rad2 = lat2 * Math.PI / 180.0
            const a = rad1 - rad2
            const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0

            let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(
                rad2) * Math.pow(
                    Math.sin(b / 2), 2)))
            s = s * 6378.137
            s = Math.round(s * 10000) / 10000
            s = s.toString()
            s = s.substring(0, s.indexOf('.') + 2)
            this.distance = s || 0
        },
        openLocation() {
            if (this.config.lat && this.config.lng) {
                uni.openLocation({
                    latitude: Number(this.config.lat),
                    longitude: Number(this.config.lng),
                    name: this.shop.shop_name,
                    address: this.config.address_text,
                    complete: (err) => {
                        console.log(err)
                        if (err.errMsg !== 'openLocation:ok') {
                            this.$toast('暂无地图')
                        }
                    }
                })
            }
        },
        // 拨打电话
        makePhone(item) {
            if (item) {
                uni.makePhoneCall({
                    phoneNumber: item
                })
            } else {
                this.$toast('暂无电话')
            }
        },
        handleCustomerService() {
            const url = this.shopInfo_.customer_url
            if (!url) return this.$toast('未配置地址')
            this.$serverJump({
                app_page: (/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g.test(url) ? url : this.curDomain_ + url)
            })
        }
    }
}
</script>

<style lang="scss">
.guide {
    padding: 32rpx 24rpx 24rpx;
    background-color: #fff;
    border-radius: 16rpx;

    &.guide-style3 {
        margin: 24rpx 24rpx 0;
        padding: 12rpx 24rpx;

        .user-advisory-img {
            margin: 24rpx 12rpx 0 0;
        }
        .guide__collection-num {
            font-size: 24rpx !important;
        }
        .guide-l {
            padding-top: 10rpx;
        }
        .guide__address {
            display: flex;
            align-items: center;
            margin-top: 24rpx;
            .right-address {
                margin-left: 6rpx !important;
                line-height: 36rpx;
            }
            &-icon {
                align-self: flex-start;
                // #ifdef MP-WEIXIN
                margin-top: -6rpx;
                // #endif
            }
            /deep/ .c-icons {
                padding-top: 4rpx;
                align-items: flex-start;
            }
        }
    }
    &-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #222222;
        line-height: 40rpx;
        margin-bottom: 32rpx;
    }
    &__name {
        font-size: 32rpx;
        font-weight: 600;
        color: #333333;
        margin-bottom: 10rpx;
    }
    &__collection-num {
        font-size: 24rpx;
        color: #999;
        line-height: 28rpx;
        text-align: center;
    }
    &-cont {
        width: 100%;
    }
    &-l {
        flex: 3;
    }
    &-r {
        flex: 1;

        &-item {
            flex-direction: column;
            align-items: center;

            &-word {
                font-size: 22rpx;
                color: #222;
                margin-top: 2rpx;
            }
        }
    }
    &-caption {
        font-weight: bold;
        color: #333333;
        line-height: 45rpx;
        font-size: 32rpx;
    }
    &-style2-address {
        align-items: center;
        margin-top: 15rpx;
        padding-bottom: 28rpx;
        border-bottom: 1px solid #ebebeb;
        &-l {
            color: #333;
            font-size: 24rpx;
            width: 100rpx;
            display: flex;
            flex: 1;
            line-height: 33rpx;
            &-text {
                flex: 1;
                width: 200rpx;
                @include ellipsis(1);
            }
        }
        &-r {
            flex-shrink: 0;
            color: #999999;
            font-size: 24rpx;
            line-height: 33rpx;
            margin-left: 44rpx;
        }
    }
    .icon-l {
        flex-shrink: 0;
    }
    .icon-r {
        flex-shrink: 0;
    }
    &-contact {
        padding-top: 23rpx;
        display: flex;
        justify-content: space-between;

        &__word {
            font-weight: bold;
            color: #333333;
            line-height: 45rpx;
            margin-left: 8rpx;
            width: 300rpx;
            flex: 1;
            @include ellipsis(1);
        }

        &-img {
            flex-shrink: 0;
        }

        &-btn {
            flex-shrink: 0;
            /deep/ .c-btn {
                height: 60rpx;
            }
        }
    }
    &__address {
        margin-top: 12rpx;
        font-size: 24rpx;
    }
    .shop-logo {
        position: relative;
        &-word {
            width: 98rpx;
            height: 30rpx;
            position: absolute;
            bottom: -16rpx;
            left: -5rpx;
            background: url($ossImgUrl + 'gongchang/shop/index/guide1.png')
                center / contain no-repeat;
        }
    }
}
</style>

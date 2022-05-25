<template>
    <!-- 改组件与前台不一致, 不能直接覆盖  -->
    <view>
        <view
            v-if="mode_ === 'style1'"
            class="user-header"
        >
            <view v-if="!followTheme_" class="user-header__bgc">
                <c-image
                    height="100%"
                    :src="backgroundImage_"
                />
            </view>
            <c-colors
                :theme="[ followTheme_ ? 't' : 'transparent']"
                :pro="['bgc']"
            >
                <view class="my-account">
                    <!-- <c-page-head
                        v-if="colors_.theme"
                        gradient-title
                        title="我的"
                        :start-color="colors_.theme"
                        back="false"
                        color="#fff"
                    ></c-page-head> -->
                    <view class="main">
                        <view class="head">
                            <view class="left">
                                <view
                                    class="portrait"
                                    @tap="isAuth_ ? userInfoJump('informationUser') : ''"
                                >
                                    <c-image
                                        size="108"
                                        radius="54"
                                        err-src="common/avatar-error6.png"
                                        :src="userInfo.user_picture"
                                    />
                                </view>
                                <view
                                    class="info"
                                >
                                    <view
                                        class="name"
                                        @tap="userInfoJump('informationUser')"
                                    >
                                        <text>用户名</text>
                                    </view>
                                    <template v-if="isAuth_">
                                        <!-- 6800版本才有可能没有手机号码 -->
                                        <view
                                            v-if="userInfo.wx_mobile_bind === 0"
                                            class="mt12 auth-btn"
                                        >
                                            <c-colors
                                                :theme="['#fff|0.4', 't']"
                                                :pro="['bgc', 'c']"
                                                type="button"
                                            >
                                                <c-button
                                                    open-type="getPhoneNumber"
                                                    radius="8"
                                                    size="mini"
                                                    plain
                                                    width="160"
                                                    @getphonenumberencry="wxUsersBindMobile"
                                                >绑定手机</c-button>
                                            </c-colors>
                                        </view>
                                        <view class="user-type">
                                            <view
                                                v-if="userInfo.level_name"
                                                class="user-type-item"
                                            >
                                                <text>{{ userInfo.level_name }}</text>
                                            </view>
                                            <view
                                                v-else-if="userInfo.nick_name && userInfo.mobile"
                                                class="user-type-item"
                                                @tap="userInfoJump('informationUser')"
                                            >
                                                <text>{{ userInfo.mobile }}</text>
                                            </view>
                                            <view
                                                class="user-type-item"
                                            >{{ userInfo.agent_name || '用户等级' }}</view>
                                        </view>
                                    </template>
                                    <template v-else>
                                        <view class="mt12 auth-btn">
                                            <!-- #ifdef MP-WEIXIN -->
                                            <c-colors
                                                :theme="['#fff|0.4', 't']"
                                                :pro="['bgc', 'c']"
                                                type="button"
                                            >
                                                <c-button
                                                    open-type="getUserInfo"
                                                    radius="8"
                                                    size="mini"
                                                    plain
                                                    width="160"
                                                    @getuserinfoencry="handleBindWechat($event, true)"
                                                >微信授权</c-button>
                                            </c-colors>
                                            <!-- #endif -->
                                            <!-- #ifdef H5 -->
                                            <c-colors
                                                :theme="['#fff|0.4', 't']"
                                                :pro="['bgc', 'c']"
                                                type="button"
                                            >
                                                <c-button
                                                    size="mini"
                                                    width="160"
                                                    radius="8"
                                                    @click="getWxUrl('home/user/index')"
                                                >微信授权</c-button>
                                            </c-colors>
                                            <!-- #endif -->
                                        </view>
                                    </template>
                                </view>
                            </view>
                            <view class="right">
                                <view
                                    v-if="isOpenIntegralShare"
                                    class="sign"
                                    @tap="$jump('signIn')"
                                >
                                    <c-image
                                        class="sign-img"
                                        src="integral/gold-coin.png"
                                        size="30"
                                        mode="aspectFill"
                                    />
                                    <view class="text">
                                        <text>签到</text>
                                    </view>
                                    <c-icons
                                        size="30"
                                        color="#fff"
                                        type="icon-tiaozhuan"
                                    />
                                </view>
                                <c-icons
                                    size="44"
                                    color="#fff"
                                    type="icon-shezhi"
                                    @click="$jump('informationSet')"
                                />
                            </view>
                        </view>
                        <!-- 我的资产 -->
                        <view
                            v-if="isShowData"
                            class="assetsList"
                        >
                            <template v-for="(item, index) in assetsList_">
                                <view
                                    v-if="!item.visible || (item.visible && userInfo[item.visible]) || allConfig_"
                                    :key="index"
                                    class="item flex-1"
                                    @tap="$jump(item.path, item.params)"
                                >
                                    <view class="value">{{ userInfo[item.prop] || (item.prop === 'credit' ? '0' : '0.00') }}
                                        <text class="small">{{ userInfo[item.prop+'Unit'] }}</text>
                                    </view>
                                    <!-- 如果有设置label优先取label值,如果没有再取onlineLabel字段,如果前两个均为undefined,为了防止小程序显示出undefined,最终复制为空字符串 -->
                                    <view class="label">{{ item.label || userInfo[item.onlineLabel] || '我的积分' }}</view>
                                </view>
                            </template>
                        </view>
                    </view>
                </view>
            </c-colors>
        </view>
        <view
            v-else-if="mode_ === 'style2'"
            class="user-header"
        >
            <view class="user-header__image">
                <c-image
                    v-if="isShared_"
                    height="520"
                    src="user/useinfo-bg.png"
                />
                <c-image
                    height="520"
                    :src="backgroundImage_"
                />
            </view>
            <view class="user-header__info">
                <view class="flex-ajcenter">
                    <view class="user-logo">
                        <view class="user-logo-picture">
                            <c-image
                                size="168"
                                radius="80"
                                err-src="common/avatar-error6.png"
                                :src="userInfo.user_picture"
                            />
                        </view>
                        <!-- <view
                            v-if="userInfo.level_name"
                            class="user-logo-text flex-ajcenter"
                        >{{ userInfo.level_name || '普通会员' }}</view> -->
                    </view>
                    <view
                        v-if="shopInfo_ && shopInfo_.member_upgrade_show"
                        class="user-vip flex-ajcenter"
                        @tap="$jump('memberVip')"
                    >
                        <view class="pr12">
                            <c-image
                                size="32"
                                src="user/index/member.png"
                            > </c-image>
                        </view>
                        升级会员
                    </view>
                </view>
                <view class="user-name ptb24">
                    <view v-if="userInfo.nick_name && userInfo.mobile">
                        {{ userInfo.nick_name ? userInfo.nick_name : userInfo.mobile }}
                    </view>
                    <view class="user-type">
                        <view
                            v-if="userInfo.level_name"
                            class="user-type-item"
                        >
                            <view class="user-type-item-center">{{ userInfo.level_name }}</view>
                        </view>
                        <view
                            v-else-if="userInfo.nick_name && userInfo.mobile"
                            class="user-type-item"
                            @tap="userInfoJump('informationUser')"
                        >
                            <view class="user-type-item-center">{{ userInfo.mobile }}</view>
                        </view>
                        <view
                            v-if="userInfo.agent_name"
                            class="user-type-item"
                        >
                            <view class="user-type-item-center">{{ userInfo.agent_name }}</view>
                        </view>
                    </view>
                    <view
                        v-if="userInfo.wx_mobile_bind === 0"
                        class="mt12 flex-ajcenter"
                    >
                        <!-- #ifdef MP-WEIXIN -->
                        <c-colors
                            :theme="['t', 't']"
                            :pro="['bdc', 'c']"
                            type="button"
                        >
                            <c-button
                                open-type="getPhoneNumber"
                                radius="8"
                                size="mini"
                                plain
                                width="160"
                                @getphonenumberencry="wxUsersBindMobile"
                            >绑定手机</c-button>
                        </c-colors>
                        <!-- #endif -->
                    </view>
                    <view
                        v-if="!isAuth_"
                        class="mt12 flex-ajcenter"
                    >
                        <!-- #ifdef MP-WEIXIN -->
                        <c-colors
                            :theme="['t', 't']"
                            :pro="['bdc', 'c']"
                            type="button"
                        >
                            <c-button
                                open-type="getUserInfo"
                                radius="8"
                                size="mini"
                                plain
                                width="160"
                                @getuserinfoencry="handleBindWechat($event, true)"
                            >微信授权</c-button>
                        </c-colors>
                        <!-- #endif -->
                        <!-- #ifdef H5 -->
                        <c-colors
                            :theme="['t', 't']"
                            :pro="['bdc', 'c']"
                            type="button"
                        >
                            <c-button
                                size="mini"
                                plain
                                width="180"
                                radius="8"
                                @click="getWxUrl('home/user/index')"
                            >微信授权</c-button>
                        </c-colors>
                        <!-- #endif -->
                    </view>
                </view>

                <view class="plr24">
                    <view class="c-underline"></view>
                </view>
                <view class="flex user-header-list">
                    <template v-for="(item, index) in assetsList_">
                        <view
                            v-if="!item.visible || (item.visible && userInfo[item.visible]) || allConfig"
                            :key="index"
                            class="flex-1 ptb24 user-header-item"
                            @tap="$jump(item.path, item.params)"
                        >
                            <view class="d-din-bold">{{ userInfo[item.prop] || 0 }}</view>
                            <view>{{ item.label || userInfo[item.onlineLabel] || '我的积分' }}</view>
                        </view>
                    </template>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import wechatMixins from './mixins/user-header'
import loginMainMixins from '@/common/mixins/home/login/main'
import userComponentMixins from '@/home/components/user-component/user-component-mixins'
import allConfig from '@/config'

export default {
    mixins: [loginMainMixins, wechatMixins, userComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    props: {
        userInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 接口控制是否显示组件
        isShowData: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
        }
    },
    computed: {
        followTheme_() {
            return parseInt(this.extra_.followTheme) || 0
        },
        backgroundImage_() {
            return this.outerLayer_.backgroundImage
        },
        // 用户是否为合伙人权益
        isShared_() {
            return this.userInfo.is_partner_equity
        },
        // 我的资产
        assetsList_() {
            let assetsList = []
            const style1List = [
                {
                    label: this.isShared_ ? '分红金额' : '累计佣金',
                    prop: 'totalSplit',
                    path: 'income',
                    params: {
                        type: 'totalSplit'
                    }
                },
                {
                    label: '今日收入',
                    prop: 'todaySplit',
                    params: {
                        type: 'todaySplit'
                    },
                    path: 'income'
                },
                {
                    label: this.isShared_ ? '总销售额' : '总分销额',
                    prop: 'totalSale',
                    params: {
                        type: 'totalSale'
                    },
                    path: 'income'
                },
                {
                    onlineLabel: 'credit_name',
                    prop: 'credit',
                    params: {},
                    path: 'myIntegral',
                    visible: 'credit_status'
                }
            ]
            const style2List = [
                {
                    label: '我的收藏',
                    prop: 'collect_count',
                    params: {},
                    path: 'collect'
                }, {
                    label: '优惠券',
                    prop: 'coupon_count',
                    params: {
                        status: 0
                    },
                    path: 'myCoupons'
                },
                {
                    label: '我的活动',
                    prop: 'activities_count',
                    params: {
                        my_join: 1 // 跳转到我的活动界面查询自己已经加入的活动
                    },
                    path: 'activityIndex'
                }, {
                    onlineLabel: 'credit_name',
                    prop: 'credit',
                    params: {},
                    path: 'myIntegral',
                    visible: 'credit_status'
                }
            ]
            if (this.mode_ === 'style1') {
                assetsList = style1List.filter(v => Number(this.extra_.style1[v.prop]) === 1)
            }
            if (this.mode_ === 'style2') {
                assetsList = style2List.filter(v => Number(this.extra_.style2[v.prop]) === 1)
            }
            return assetsList
        },
        allConfig_() {
            return allConfig.projectSource
        }
    },
    methods: {
        getUserInfo(e) {
            this.$emit('getuserinfo', e)
        },
        inviteToFriend() {
            this.$emit('inviteToFriend')
        }
    }
}
</script>

<style lang="scss" scoped>
.user-header {
    position: relative;
    &__bgc {
        @include abs(0, 0, 0, 0);
    }
    &__image {
        position: relative;
        overflow: hidden;
    }
    &__info {
        position: relative;
        border-radius: $border-radius-lg;
        z-index: 10;
        margin: -100rpx auto 0;
        background-color: #fff;
        width: 700rpx;
        // height: 334rpx;
        box-shadow: 0 4rpx 40rpx -6rpx rgba(0, 0, 0, 0.1);
        .user-logo {
            position: relative;
            height: 120rpx;
            &-picture {
                position: absolute;
                left: 50%;
                top: -80rpx;
                transform: translate(-50%);
                border: 8rpx solid #fff;
                border-radius: 50%;
                // margin-top: -80rpx;
            }
            &-text {
                position: absolute;
                left: 50%;
                top: 72rpx;
                transform: translate(-50%);
                background-color: #f49554;
                border-radius: 18rpx;
                color: #fff;
                font-size: 22rpx;
                padding: 0 16rpx;
                white-space: nowrap;
                height: 36rpx;
            }
        }
        .user-vip {
            @include abs(32rpx, 0, null, null);
            padding: 0 16rpx;
            height: 48rpx;
            background: #000;
            border-radius: 100rpx 0px 0px 100rpx;
            font-size: 22rpx;
            color: #f49554;
        }
        .user-name {
            font-size: 32rpx;
            font-weight: bold;
            text-align: center;
        }

        .user-type {
            @include flex(row);
            justify-content: center;
            margin-top: 12rpx;
            font-weight: normal;
            &-item {
                background-color: #f49554;
                border-radius: 18rpx;
                color: #fff;
                padding: 0 16rpx;
                white-space: nowrap;
                height: 36rpx;
                &:not(:first-of-type) {
                    margin-left: 16rpx;
                }
                &-center {
                    display: inline-block;
                    height: 46rpx;
                    line-height: 35rpx;
                    font-size: 24rpx;
                    transform: scale(0.9, 0.9);
                }
            }
        }

        .user-header-list {
            text-align: center;
            font-size: 24rpx;
            color: #999999;
            padding-bottom: 8rpx;
            .user-header-item {
                .d-din-bold {
                    font-size: 32rpx;
                    color: #333;
                }
            }
        }
    }
}
.my-account {
    background: url($ossImgUrl + 'user/index/top_bg.png') center center / 100%
        auto no-repeat;
    position: relative;
    .auth-btn {
        width: 160rpx;
    }
    .main {
        padding: 26rpx 24rpx 70rpx;
        .head {
            display: flex;
            justify-content: space-between;
            padding: 0 0 48rpx;
            .left {
                @include flex(row);
                align-items: center;
                min-width: 0;
                flex: 1;
                .info {
                    line-height: 1;
                    font-size: 24rpx;
                    color: #fff;
                    @include flex;
                    justify-content: center;
                    position: relative;
                    padding: 0 24rpx;
                    &.hasPadding {
                        // padding: 0 24rpx 48rpx;
                        padding: 12rpx 24rpx 12rpx;
                    }
                    .vip {
                        @include abs(null, 50%, 0);
                        height: 48rpx;
                        border-radius: 24rpx;
                        background-color: #333;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ffd7a9;
                        padding: 0 24rpx;
                        transform: translateX(50%) scale(0.5);
                        font-size: 40rpx;
                        white-space: nowrap;
                    }
                    .mobile {
                        @include abs(null, null, 0, 24rpx);
                        font-size: 24rpx;
                        color: #8e5822;
                        height: 36rpx;
                        line-height: 36rpx;
                        background: #ffc487;
                        border-radius: 18rpx;
                        padding: 0 14rpx;
                        margin-top: 24rpx;
                    }
                    .name {
                        font-size: 36rpx;
                        height: 36rpx;
                        color: #fff;
                        font-weight: bold;
                        @include ellipsis;
                    }
                    .user-type {
                        @include flex(row);
                        margin-top: 12rpx;
                        &-item {
                            font-size: 24rpx;
                            color: #8e5822;
                            height: 36rpx;
                            line-height: 36rpx;
                            background: #ffc487;
                            border-radius: 18rpx;
                            padding: 0 14rpx;

                            &:not(:first-of-type) {
                                margin-left: 16rpx;
                            }
                        }
                    }
                }
            }
            .right,
            .sign {
                display: flex;
                align-items: center;
                height: 52rpx;
                padding-top: 12rpx;
                .sign {
                    margin-right: 32rpx;
                    background-color: rgba($color: #fff, $alpha: 0.2);
                    border-radius: 26rpx;
                    padding: 0 8rpx 0 20rpx;
                    line-height: 1;
                    .text {
                        font-size: 24rpx;
                        color: #fff;
                        padding-left: 8rpx;
                        white-space: nowrap;
                    }
                    &-img {
                        height: 30rpx;
                    }
                }
            }
        }
        .assetsList {
            display: flex;
            align-items: center;
            padding-bottom: 40rpx;
            .item {
                text-align: center;
                color: #fff;
                .label {
                    font-size: 24rpx;
                    padding-top: 24rpx;
                }
                .value {
                    font-size: 42rpx;
                    line-height: 1;
                    font-weight: bold;
                    .small {
                        line-height: 50rpx;
                        font-size: 12px;
                        font-weight: normal;
                        margin-left: 5rpx;
                    }
                }
            }
        }
    }
}
</style>

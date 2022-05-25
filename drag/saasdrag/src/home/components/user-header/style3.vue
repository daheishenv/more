<template>
    <view class="">
        <view class="user-header">
            <view class="user-header__image">
                <c-image height="520" width="750" src="user/index/userbg.png" />
            </view>
            <view class="user-header__info">
                <view class="flex-ajcenter">
                    <view class="user-logo">
                        <c-image class="user-logo-picture" size="168" radius="80" :src="userInfo.user_picture" />
                        <view class="user-logo-text flex-ajcenter">{{userInfo.level_name || '普通会员'}}</view>
                    </view>
                    <view class="user-vip flex-ajcenter" v-if="shopInfo && shopInfo.member_upgrade_show" @tap="$jump('memberVip')">
						<view class="pr12">
                       		<c-image size="32" src="user/index/member.png"> </c-image>
						</view>
						升级会员
                    </view>
                </view>
                <view class="user-name ptb24" v-if="isAuth">{{userInfo.nick_name}}</view>
				<view class="ptb24 flex-ajcenter" v-else>
                    <!-- #ifdef MP-WEIXIN -->
                    <wechatInfo @getUserInfo="wechatUserInfo">
                        <c-colors :theme="['t', 't']" :pro="['bdc', 'c']" radius="8">
                            <c-button size="mini" plain width="180">微信授权</c-button>
                        </c-colors>
                    </wechatInfo>
                    <!-- #endif -->
                    <!-- #ifdef H5 -->
                    <c-colors :theme="['t', 't']" :pro="['bdc', 'c']" radius="8">
                        <c-button size="mini" plain width="180">微信授权</c-button>
                    </c-colors>
                    <!-- #endif -->
                </view>


                <view class="plr24"><view class="c-underline"></view></view>
                <view class="flex user-header-list">
					<template v-for="(item, index) in assetsList">
						<view v-if="!item.visible || (item.visible && userInfo[item.visible])" class="flex-1 ptb24 user-header-item" :key="index" @tap="$jump(item.path, item.params)">
							<view class="d-din-bold">{{ userInfo[item.prop] || 0 }}</view>
							<view>{{ item.label || userInfo[item.onlineLabel] || '' }}</view>
						</view>
					</template>
                </view>
            </view>
        </view>
        <view class="pt24 plr12 flex user-tracks">
            <view class="plr12 flex-1">
                <view class="user-tracks-item c-radius-lg" @click="handleTeam">
   	                <c-image class="mr12" src="user/index/footprint.png" size="48" mode="aspectFill" />
                    <text class="flex-1">我的足迹</text>
                    <c-icons color="#d4d4d4" type="icon-tiaozhuan" size="32"></c-icons>
                </view>
            </view>
            <view class="plr12 flex-1">
                <view class="user-tracks-item c-radius-lg" @tap="inviteToFriend">
					<c-image class="mr12" src="user/index/qrcode.png" size="48" mode="aspectFill" />
                    <text class="flex-1">我的二维码</text>
                    <c-icons color="#d4d4d4" type="icon-tiaozhuan" size="32"></c-icons>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import wechatInfo from '@/common/mixins/home/login/components/wechat-info'
	// #endif
	import { mapState } from 'vuex'
	export default {
		name: 'user-header',
		options: {
			styleIsolation: 'shared',
		},
		components: {
			// #ifdef MP-WEIXIN
			wechatInfo
			// #endif
		},
		props: {
			userInfo: {
				type: Object,
				default: () => {
					return {}
				},
			},
			isOpenIntegral: {
				type: Boolean,
				default: false,
			},
			assetsList: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {}
		},
		computed: {
			...mapState('config', ['pagePathFrom', 'shopConfig', 'shopInfo']),
			colors_() {
				return this.shopConfig ? this.shopConfig.color : {}
			},
			isAuth() {
				// 是否授权
				/**
				 * @Number wx_app_auth 公众号授权 0 未授权 1 已授权
				 * @String unionid 小程序unionid
				 */
				const { wx_app_auth = 3 } = this.userInfo || {};
				// #ifdef H5
				return !this.$isWechatBrowser ? true : wx_app_auth
				// #endif
				return !!wx_app_auth;
			},
		},
		methods: {
			async handleTeam(){
				const { data } = await this.$http('userInfo')
				this.$jumpDetail('footprint', data.uid);
			},
			inviteToFriend() {
				this.$emit('inviteToFriend')
			},
			userInfoJump(path) {
				const { token } = uni.getStorageSync('jscode2session')
				if (token) {
					this.$jump('informationUser')
				} else {
					this.$jump('login')
				}
			},
			// #ifdef MP-WEIXIN
			async wechatUserInfo(data) {
				// 获取微信用户信息回调
				if (!data.encryptedData) return
				this.$loading()
				await this.bindwechat(data)
				this.$hideLoading()
			},
			getCode(provider) {
				// 获取登录code
				return new Promise((resolve, reject) => {
					uni.login({
						provider,
						success: (loginRes) => {
							resolve(loginRes)
						},
						fail: (res) => {
							reject(res)
						},
					})
				})
			},
			async bindwechat(data) {
				// 绑定微信
				let newCode = await this.getCode('weixin')
				const postData = { ...data, code: newCode.code }
				const res = await this.$http('usersbindwechat', postData)
				switch (res.bizCode) {
					case 1011: // 绑定成功
						// this.getUserInfo(false)
						this.$emit('getUserInfo', {
							type: 'getUserInfo',
							detail: {},
						})
						this.$toast('绑定成功')
						break
					case 1012: // 微信绑定失败
						this.$toast('微信绑定失败')
						break
					case -41003: // 授权超时
						this.$toast('授权超时，请重新操作')
						break
					case 1013: // 微信已被绑
						this.$toast('微信已被绑')
						break
					default:
						this.$toast(res.msg)
						break
				}
			},
			// #endif
			// #ifdef H5
			async getWxUrl() {
				// 获取微信
				let baseUrl = window.location.origin + this.$Router.$route.options.base
				const relate_type = uni.getStorageSync(this.$config.relateTypeCatchName) || (this.pagePathFrom.meta ? this.pagePathFrom.meta : {}).relate_type
				// const {relate_type = 99} = this.pagePathFrom.meta || {}
				uni.setStorageSync('loginQuery', this.$Route.query)
				const parent_id = uni.getStorageSync(this.$config.shareParentName)
				location.href = `${this.$config.hostUrl}/WxApp/getWxUrl?h5_redirect=${baseUrl}home/user/index&relate_type=${relate_type}&parent_id=${parent_id}&bind_type=1`
			},
			// #endif
		},
	}
</script>

<style lang="scss">
.user-header {
    // &__image{
    // 	position: relative;
    // }
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
.user-tracks {
    font-size: 26rpx;
    font-weight: bold;
    color: #333;
    &-item {
        height: 104rpx;
        background: #ffffff;
        box-shadow: 0px 8rpx 50rpx -16rpx rgba(0, 0, 0, 0.1);
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        padding: 24rpx;
    }
}
</style>

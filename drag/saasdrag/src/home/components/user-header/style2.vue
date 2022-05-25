<template>
	<view class="user-header">
		<c-colors :theme="['t']" :pro="['bgc']">
			<view class="my-account">
				<c-page-head gradientTiele title="我的" v-if="colors_.theme" :startColor="colors_.theme" back="false" color="#fff"></c-page-head>
				<view class="main">
					<view class="head">
						<view class="left">
							<view class="portrait" @tap="isAuth ? userInfoJump('informationUser') : ''">
								<c-image size="108" radius="54" errSrc="common/avatar-error.png" :src="userInfo.user_picture" />
							</view>
							<view class="info" :class="{'hasPadding flex-1': isAuth}">
								<block v-if="isAuth">
									<view class="name" @tap="userInfoJump('informationUser')">
										<text>{{ userInfo.nick_name ? userInfo.nick_name : userInfo.mobile }}</text>
									</view>
									<view class="mobile" v-if="userInfo.level_name">
										<text>{{userInfo.level_name}}</text>
									</view>
									<view class="mobile" v-else-if="userInfo.nick_name && userInfo.mobile" @tap="userInfoJump('informationUser')">
										<text>{{ userInfo.mobile }}</text>
									</view>
								</block>
								<block v-else>
									<!-- #ifdef MP-WEIXIN -->
									<wechatInfo @getUserInfo="wechatUserInfo">
										<c-colors :theme="['#fff|0.4', 't']" :pro="['bgc', 'c']" radius="8">
											<c-button size="mini" plain width="160">微信授权</c-button>
										</c-colors>
									</wechatInfo>
									<!-- #endif -->
									<!-- #ifdef H5 -->
									<c-colors :theme="['#fff|0.4', 't']" :pro="['bgc', 'c']" radius="8">
									    <c-button size="mini" width="160" @tap="getWxUrl">微信授权</c-button>
									</c-colors>
									<!-- #endif -->
								</block>
							</view>
						</view>
						<view class="right">
							<view v-if="isOpenIntegral" class="sign" @tap="$jump('signIn')">
								<c-image class="sign-img" src="integral/gold-coin.png" size="30" mode="aspectFill" />
								<view class="text">
									<text>签到</text>
								</view>
								<c-icons size="30" color="#fff" type="icon-tiaozhuan" />
							</view>
							<c-icons size="44" color="#fff" type="icon-shezhi" @click="$jump('informationSet')" />
						</view>
					</view>
					<!-- 我的资产 -->
					<view v-if="isShowData" class="assetsList">
						<template v-for="(item, index) in assetsList">
							<view v-if="!item.visible || (item.visible && userInfo[item.visible])" class="item flex-1" :key="index" @tap="$jump(item.path, item.params)">
								<view class="value">{{ userInfo[item.prop] || (item.prop === 'credit' ? '0' : '0.00') }}</view>
								<!-- 如果有设置label优先取label值,如果没有再取onlineLabel字段,如果前两个均为undefined,为了防止小程序显示出undefined,最终复制为空字符串 -->
								<view class="label">{{ item.label || userInfo[item.onlineLabel] || '' }}</view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</c-colors>
		<!-- 会员升级 -->
		<view class="vipCard" @tap="$jump('memberVip')" v-if="shopInfo && shopInfo.member_upgrade_show">
			<c-image src="user/index/updata_vip2.png?v=4.0" mode="aspectFill"></c-image>
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
			wechatInfo,
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
            isShowData:{
                type:Boolean,
                default:true
            }
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
			userInfoJump(path) {
				const { token } = uni.getStorageSync('jscode2session');
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
		}
	}
</script>

<style lang="scss" scoped>
	.my-account {
		background: url($ossImgUrl + 'user/index/top_bg.png') center center / 100% auto no-repeat;
		position: relative;
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
						&.hasPadding{
							padding: 0 24rpx 48rpx;
						}
						.vip {
							@include abs(null, 50%, 0);
							height: 48rpx;
							border-radius: 24rpx;
							background-color: #333;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #FFD7A9;
							padding: 0 24rpx;
							transform: translateX(50%) scale(0.5);
							font-size: 40rpx;
							white-space: nowrap;
						}
						.mobile {
							@include abs(null, null, 0, 24rpx);
							font-size: 24rpx;
							color: #8E5822;
							height: 36rpx;
							line-height: 36rpx;
							background: #FFC487;
							border-radius: 18rpx;
							padding: 0 14rpx;
							margin-top: 24rpx;
						}
						.name {
							font-size: 36rpx;
							height: 36rpx;
							color: #fff;
							font-weight: 500;
							@include ellipsis;
						}
					}
				}
				.right,
				.sign {
					display: flex;
					align-items: center;
					height: 52rpx;
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
					}
				}
			}
		}
	}
	.vipCard {
		margin: -70rpx 24rpx 0;
		height: 168rpx;
		position: relative;
		z-index: 99;
		overflow: hidden;
		/deep/.c-image {
			height: 100%;
			width: 100%;
		}
	}
</style>
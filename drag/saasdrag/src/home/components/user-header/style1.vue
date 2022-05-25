<template>
	<view class="user-header">
		<c-colors :pro="['bglg']" :theme="['180deg|t|t']">
			<c-page-head gradientTiele title="我的" back="false" v-if="colors_.theme" :startColor="colors_.theme" color="#fff"></c-page-head>
			<view class="main">
				<view class="body">
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
						<view class="signBox">
							<view v-if="isOpenIntegral" class="sign" @tap="$jump('signIn')">
								<c-image src="integral/gold-coin.png" size="30" mode="aspectFill" />
								<c-colors>
									<view class="flex-ajcenter pl12">
										<text>签到</text>
										<c-icons class="sign-img" size="30" color="t" type="icon-tiaozhuan" />
									</view>
								</c-colors>
							</view>
						</view>
						<c-icons size="44" color="#fff" type="icon-shezhi" @click="$jump('informationSet')" />
					</view>
					<!-- 会员升级 -->
					<view class="card" v-if="shopInfo && shopInfo.member_upgrade_show">
						<view class="left">
							<view class="vip">
								<view class="img">
									<c-image size="56" radius="28" src="https://mjb-zzyx-static.oss-cn-zhangjiakou.aliyuncs.com/sass/user/updata_vip.png"></c-image>
								</view>
								<view class="text">升级会员</view>
							</view>
							<view class="equity">
								<view v-for="(item, index) in equity" :key="index">
									<text>{{ item }}</text>
								</view>
							</view>
						</view>
						<view class="right" @tap="$jump('memberVip')">
							<text>立即升级</text>
							<c-icons size="32" color="#333" type="saas-tiaozhuan" />
						</view>
					</view>
				</view>
			</view>
		</c-colors>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	// #ifdef MP-WEIXIN
	import wechatInfo from '@/common/mixins/home/login/components/wechat-info'
	// #endif
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
		},
		data() {
			return {
				equity: ['严选好物 专属福利', '限时折扣 分享抽佣'],
			}
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
		}
	}
</script>

<style lang="scss" scoped>
	.user-header {
		position: relative;
		&::before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: url($ossImgUrl + 'my/bg1.png') center top / 100% auto no-repeat;
			z-index: 0;
		}
		.main {
			position: relative;
			z-index: 1;
			padding-top: 24rpx;
			.body {
				.head {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 24rpx 40rpx;
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
					.signBox {
						margin-left: auto;
						.sign {
							height: 52rpx;
							display: flex;
							align-items: center;
							margin-right: 32rpx;
							background-color: rgba($color: #fff, $alpha: 0.5);
							border-radius: 26rpx;
							padding: 0 8rpx 0 20rpx;
						}
						.right {
							margin-right: 22rpx;
							height: 106rpx;
							display: flex;
							align-items: center;
						}
					}
				}
				.card {
					margin: 0 24rpx;
					background-color: #333333;
					border-radius: 16rpx 16rpx 0 0;
					padding: 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.left {
						display: flex;
						align-items: center;
						.vip {
							padding-right: 24rpx;
							border-right: solid 0.5px rgba($color: #fff, $alpha: 0.1);
							flex-shrink: 0;
							.img {
								width: 56rpx;
								margin: 0 auto;
								// image {
								// 	width: 56rpx;
								// 	height: 56rpx;
								// 	border-radius: 50%;
								// }
							}
							.text {
								color: #ffd7a9;
								font-size: 20rpx;
								line-height: 1;
								margin-top: 8rpx;
								white-space: nowrap;
								// text {
								// 	font-size: 20rpx;
								// }
							}
						}
						.equity {
							padding-left: 30rpx;
							color: #fff;
							line-height: 36rpx;
							font-size: 24rpx;
						}
					}
					.right {
						@include flex(row);
						align-items: center;
						background: linear-gradient(90deg, #ffe4c0 0%, #ffc88e 100%);
						border-radius: 28rpx;
						padding: 12rpx 8rpx 12rpx 18rpx;
						font-size: 24rpx;
						line-height: 32rpx;
					}
				}
			}
		}
	}
</style>
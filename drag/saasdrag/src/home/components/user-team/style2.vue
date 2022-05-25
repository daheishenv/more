<template>
	<view class="my-team">
		<c-cell :cellStyle="{ padding: '0 24rpx', height: '90rpx' }" title="我的团队" @tap="$jump('teamAnalysis')" border arrow arrowSize="30">
			<view slot="value" class="my-team__title">
				<c-colors :theme="['t']" :pro="['c']" class="my-team__icon">
					<c-icons size="30" type="saas-baobiao" />
				</c-colors>
				<c-colors :theme="['t']" :pro="['c']" class="my-team__text">
					<text style="padding-left: 8rpx">智能报表</text>
				</c-colors>
			</view>
		</c-cell>
		<view class="c-row">
			<view class="c-col-12">
				<c-colors :pro="['bgc']" :theme="['t|0.05']" radius="8">
					<view class="invitation">
						<view class="label">
							<text>邀请好友</text>
						</view>
						<view class="sub">
							<text>邀请好友获取佣金</text>
						</view>
						<c-colors class="btn" :pro="['c', 'bgc']" :theme="['#fff', 't']" @tap="inviteToFriend" radius="30">
							<view class="btn-content">
								<block v-if="isAuth">
									<c-button width="180" height="60">邀请好友</c-button>
								</block>
								<block v-else>
									<!-- #ifdef MP-WEIXIN -->
									<wechatInfo @getUserInfo="wechatUserInfo"><text style="color: #fff">邀请好友</text></wechatInfo>
									<!-- #endif -->
									<!-- #ifdef H5 -->
									<view @tap="getWxUrl">
										<text style="color: #fff">邀请好友</text>
									</view>
									<!-- #endif -->
								</block>
							</view>
						</c-colors>
					</view>
				</c-colors>
			</view>
			<view class="c-col-6">
				<c-colors :pro="['bgc']" :theme="['t|0.05']" radius="8">
					<view class="item" @click="$jump('teamMember')">
						<c-colors class="item__icon" :theme="['t|0.15']">
							<c-icons color="false" size="86" type="saas-jd02_wodetuandui"></c-icons>
						</c-colors>
						<view class="value">
							<text>{{ teamCount.total_count }}</text>
						</view>
						<view class="label">
							<text>我的团队</text>
						</view>
					</view>
				</c-colors>
			</view>
			<view class="c-col-6">
				<c-colors :pro="['bgc']" :theme="['t|0.05']" radius="8">
					<view class="item" @click="$jump('teamMember', { menuIndex: 1 })">
						<c-colors class="item__icon" :theme="['t|0.15']">
							<c-icons color="false" size="86" type="saas-jd02_jinrixinzeng"></c-icons>
						</c-colors>
						<view class="value">
							<text>{{ teamCount.today_count }}</text>
						</view>
						<view class="label">
							<text>今日新增</text>
						</view>
					</view>
				</c-colors>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import wechatInfo from '@/common/mixins/home/login/components/wechat-info'
	// #endif
	export default {
		name: 'user-team',
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
			teamCount: {
				type: Object,
				default: () => {
					return {}
				},
			},
		},
		data() {
			return {}
		},
		computed: {
			isAuth() {
				// 是否授权
				/**
				 * @Number wx_app_auth 公众号授权 0 未授权 1 已授权
				 * @String unionid 小程序unionid
				 */
				const { wx_app_auth = 3 } = this.userInfo || {}
				const h5Normal = !this.$isWechatBrowser
				return h5Normal ? true : wx_app_auth
			},
		},
		methods: {
			inviteToFriend() {
				this.$emit('inviteToFriend', {
					type: 'inviteToFriend',
					detail: {},
				})
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
		},
	}
</script>

<style lang="scss" scoped>
	.my-team {
		&__icon {
			display: inline-block;
			height: 32rpx;
			line-height: 32rpx;
			vertical-align: middle;
		}
		&__title {
			@include flex(row);
			align-items: center;
		}
		border-radius: 16rpx;
		background: #fff;
		overflow: hidden;
		.top {
			display: flex;
			align-items: center;
			border-bottom: solid 0.5px #ededed;
			.label {
				font-size: 32rpx;
				color: #000;
				line-height: 44rpx;
			}
			.value {
				font-size: 26rpx;
				color: #999;
				line-height: 38rpx;
				margin-left: auto;
				display: flex;
				align-items: center;
			}
		}
		.invitation {
			padding: 24rpx;
			position: relative;
			border-radius: 8rpx;
			.label {
				font-size: 32rpx;
				color: #000;
				line-height: 44rpx;
				padding-bottom: 12rpx;
				font-weight: 500;
			}
			.sub {
				font-size: 28rpx;
				color: #999;
				line-height: 40rpx;
				padding-bottom: 12rpx;
			}
			.btn {
				position: absolute;
				bottom: 18rpx;
				right: 22rpx;
			}
			.btn-content {
				width: 180rpx;
				height: 60rpx;
				@include flex;
				justify-content: center;
				align-items: center;
			}
		}
		.item {
			padding: 24rpx;
			position: relative;
			&__icon {
				@include abs(null, 0, 0);
			}
			.value {
				font-size: 42rpx;
				font-weight: bold;
				color: #333;
				line-height: 42rpx;
				padding-bottom: 24rpx;
			}
			.label {
				font-size: 24rpx;
				color: #999;
				line-height: 34rpx;
			}
		}
	}
</style>
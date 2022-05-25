<template>
	<view class="my-panel my-team">
		<c-cell title="我的团队" border :titleStyle="{ fontSize: '32rpx', fontWeight: 'bold' }"></c-cell>
		<view class="c-row">
			<view class="c-col-6" @click="$jump('teamMember')">
				<c-colors :pro="['bgc']" :theme="['t|0.05']" radius="8">
					<view class="my-team__item ptb24 flex-column flex-ajcenter">
						<text class="my-team__num d-din-bold">{{ teamCount.total_count }}</text>
						<text class="pt12">团队总成员</text>
					</view>
				</c-colors>
			</view>
			<view class="c-col-6" @click="$jump('teamMember', { menuIndex: 1 })">
				<c-colors :pro="['bgc']" :theme="['t|0.05']" radius="8">
					<view class="my-team__item ptb24 flex-column flex-ajcenter">
						<text class="my-team__num d-din-bold">{{ teamCount.today_count }}</text>
						<text class="pt12">今日新增</text>
					</view>
				</c-colors>
			</view>
			<view class="c-col-12">
				<c-colors class="btn" :pro="['c', 'bgc']" :theme="['#fff', 't']" @tap="inviteToFriend()" radius="8">
					<c-button>
						<block v-if="isAuth">
							<text>邀请好友</text>
						</block>
						<block v-else>
							<!-- #ifdef MP-WEIXIN -->
							<wechatInfo @getUserInfo="wechatUserInfo">
								<text style="color: #fff">邀请好友</text>
							</wechatInfo>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<text style="color: #fff">邀请好友</text>
							<!-- #endif -->
						</block>
						<c-icons class="pl12" size="30" color="#fff" type="saas-tiaozhuan" />
					</c-button>
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
	.my-panel {
		background-color: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		font-size: 24rpx;
		.value {
			@include flex(row);
			align-items: center;
			margin-left: auto;
			&-num {
				font-size: 28rpx;
				color: #333;
			}
		}
	}
	.my-team {
		&__item {
			font-size: 24rpx;
			color: #999999;
		}

		&__num {
			font-size: 42rpx;
			font-weight: bold;
			color: #333333;
		}
	}
</style>
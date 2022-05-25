<template>
	<c-popup v-model="newRedShow" showClose="false" bgColor="transparent">
		<view class="newRed">
			<c-image src="home/red/red_bg.png" width="560" height="600" mode="aspectFit" />
			<view class="content">
				<view class="title">
					<text>- {{redInfo.coupon_name}}-</text>
				</view>
				<view class="price price-com"
					:class="{isNoPrice: redInfo.coupon_type != 1 && redInfo.coupon_type != 3}">
					<text>{{redInfo.show_coupon_price_text}}</text>
				</view>
				<view class="summary">
					<text>{{redInfo.remark}}</text>
				</view>
				<view class="btn" @tap="giveCoupon">
					<text>{{redBtnName}}</text>
				</view>
			</view>
			<view class="close" @tap="newRedShow = false">
				<c-image src="home/red/close.png" size="56" mode="aspectFit" />
			</view>
		</view>
	</c-popup>
</template>
<script>
	import homeComponentMixins from '@/home/components/component/home-component-mixins';
	// 首页新人红包组件
	export default {
		name: 'home-limited-time-activities',
		mixins: [homeComponentMixins],
		data() {
			return {
				token: '',
				newRedShow: false,
				redInfo: {}
			}
		},
		computed: {
			redBtnName() {
				return this.token ? '立即领取' : '登录领取';
			}
		},
		created() {
			this.getToken();
		},
		methods: {
			async getToken() {
				let {
					data: {
						token
					}
				} = await this.$http('wxuserinfo', null, {
					source: 'catch'
				});
				this.token = token;
			},
			finishData(data) {
				//is_can_receive 0:未领取 ,1:已领取 ,2:没有优惠券
				this.newRedShow = data.is_can_receive === 0;
				this.redInfo = data;
			},
			// 红包领券
			async giveCoupon() {
				await this.$http('giveCoupon', {
					coupon_relation_activity_id: this.redInfo.coupon_relation_activity_id
				})
				this.newRedShow = false;
				this.$jump('myCoupons');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.newRed {
		width: 560rpx;
		position: relative;

		.close {
			width: 56rpx;
			height: 56rpx;
			margin: 14rpx auto 0;
		}

		.content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.title {
				margin: 48rpx 0 0;
				text-align: center;
				line-height: 50rpx;
				color: #FA3F1E;
				font-size: 36rpx;
			}

			.price {
				padding: 24rpx 0 0;
				line-height: 104rpx;
				font-size: 104rpx;
				color: #FA3F1E;
				text-align: center;
				display: flex;
				font-weight: bold;
				justify-content: center;
				align-items: flex-end;

				&::before {
					font-size: 48rpx;
					bottom: -16rpx;
					vertical-align: text-bottom;
				}

				&.isNoPrice {
					&::before {
						content: '';
					}
				}
			}

			.summary {
				color: #907037;
				font-size: 24rpx;
				line-height: 32rpx;
				padding-top: 4rpx;
				text-align: center;
				padding: 0 48rpx;
				min-height: 32rpx;
			}

			.btn {
				font-size: 32rpx;
				color: #980900;
				width: 380rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 40rpx;
				background: linear-gradient(0deg, #F6AF67, #FFD2A3);
				position: absolute;
				bottom: 168rpx;
				left: 50%;
				margin-left: -190rpx;
			}
		}
	}
</style>

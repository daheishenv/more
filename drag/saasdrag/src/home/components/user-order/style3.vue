<template>
	<view class="my-panel my-order">
		<c-cell title="我的订单" border @click="$jump('orderList')" :titleStyle="{ fontSize: '32rpx', fontWeight: 'bold' }" value="查看全部" :valueStyle="{ color: '#666' }" arrowColor="#666" arrow></c-cell>
		<view class="flex">
			<view class="flex-column flex-1 ptb24 flex-ajcenter" v-for="(item, index) in orderStatus" :key="index" @click="$jump(item.name, item.params)">
				<c-colors :theme="['t']" :pro="['c']">
					<c-icons size="44" :type="item.icon" />
				</c-colors>
				<view class="color-text pt12">{{ item.label }}</view>
				<view class="my-order__count" v-if="order[item.prop]">{{ order[item.prop] }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'user-order',
		props: {
			orderStatus: {
				type: Array,
				default: () => [],
			},
			order: {
				type: Object,
				default: () => {
					return {}
				},
			},
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	.my-panel {
		background-color: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		font-size: 24rpx;
		&.my-order {
			.flex-ajcenter {
				position: relative;

				.full {
					width: 100%;
					height: 100%;
				}
			}
			.my-order__count {
				position: absolute;
				top: 50%;
				right: 50%;
				margin: -74rpx -56rpx 0 0;
				min-width: 60rpx;
				// padding: 0 10rpx;
				height: 56rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 28rpx;
				font-size: 34rpx;
				background-color: #fa3f1e;
				transform: scale(0.5);
			}
		}
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
</style>
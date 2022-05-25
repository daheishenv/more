<template>
	<view class="my-panel my-assets">
		<c-cell title="我的资产" border :titleStyle="{ fontSize: '32rpx', fontWeight: 'bold' }"></c-cell>
		<view class="flex">
			<template v-for="(item, index) in assetsList">
				<view v-if="!item.visible || (item.visible && userInfo[item.visible])" class="flex-column ptb24 flex-ajcenter flex-1" :key="index" @tap="$jump(item.path, item.params)">
					<view class="my-assets__num d-din-bold">{{ userInfo[item.prop] || 0 }}</view>
					<view class="pt12 my-assets__text">{{ item.label || userInfo[item.onlineLabel] || '' }}</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'user-asset',
		props: {
			assetsList: {
				type: Array,
				default: () => [],
			},
			userInfo: {
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
	.my-assets {
		&__num {
			font-size: 42rpx;
			height: 60rpx;
			font-weight: bold;
			color: #333333;
		}

		&__text {
			color: #999;
		}
	}
</style>
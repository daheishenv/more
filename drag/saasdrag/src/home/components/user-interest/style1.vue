<template>
	<view class="my-panel">
		<c-cell v-for="(item, i) in cardList" :key="i" @tap="$jump(item.path)" :border="i !== cardList.length - 1" arrow :icon="item.icon" iconSize="44" :title="item.label"></c-cell>
	</view>
</template>

<script>
	export default {
		name: 'user-interest',
		props: {
			cardList: {
				type: Array,
				default: () => [],
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
	}
</style>
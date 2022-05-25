<template>
	<view class="c-content async-error-content">
		<c-no-data icon="common/no-network.png" showImg text="网络连接失败,请检查网络设置" />
		<c-colors class="async-error__btn" :theme="['t', '#fff']" :pro="['bgc', 'c']" radius="36">
			<c-button @click="reloadPage">刷新</c-button>
		</c-colors>
	</view>
</template>

<script>
	export default {
		name: "ss-async-error",
		methods: {
			reloadPage() {
                this.$jump(this.$Route.name, this.$Route.query, this.$route.meta.isTabBar ? 'pushTab' : 'replace');
			}
		}
	}
</script>

<style lang="scss">
	.async-error-content {
		padding: 110rpx 0;
		flex: 1;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		.async-error__btn{
			width: 288rpx;
		}
	}
</style>

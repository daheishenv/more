<template>
	<view v-if="cmptStyle_ === 'style1'">
		<sub-home-user-asset-style1 :assetsList="assetsList" :userInfo="userInfo" />
	</view>
</template>

<script>
	export default {
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
	}
</script>
<template>
	<view>
		<template v-if="cmptStyle_ === 'style1'">
			<sub-home-user-header-style1 :assetsList="assetsList" :isOpenIntegral="isOpenIntegral" :userInfo="userInfo" @getUserInfo="getUserInfo" />
		</template>
		<template v-else-if="cmptStyle_ === 'style2'">
			<sub-home-user-header-style2 :assetsList="assetsList" :isShowData="isShowData" :isOpenIntegral="isOpenIntegral" :userInfo="userInfo" @getUserInfo="getUserInfo" />
		</template>
		<template v-else-if="cmptStyle_ === 'style3'">
			<sub-home-user-header-style3 @inviteToFriend="inviteToFriend" :assetsList="assetsList" :isOpenIntegral="isOpenIntegral" :userInfo="userInfo" @getUserInfo="getUserInfo" />
		</template>
	</view>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared',
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
            //接口控制是否显示组件
            isShowData:{
                type:Boolean,
                default:true
            }
		},
		methods: {
			getUserInfo(e) {
				this.$emit('getUserInfo', e)
			},
			inviteToFriend() {
				this.$emit('inviteToFriend')
			},
		},
	}
</script>

<style lang="scss" scoped>
</style>
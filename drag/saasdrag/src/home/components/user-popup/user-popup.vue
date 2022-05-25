<template>
	<view>
		<template v-if="cmptStyle_ === 'style1'">
			<sub-home-user-popup-style1 v-model="modalFlag" :userInfo="userInfo" />
		</template>
		<template v-else-if="cmptStyle_ === 'style2'">
			<sub-home-user-popup-style2 v-model="modalFlag" :userInfo="userInfo" />
		</template>
		<template v-else-if="cmptStyle_ === 'style3'">
			<sub-home-user-popup-style2 v-model="modalFlag" :userInfo="userInfo" />
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			//双向绑定值
			value: {
				type: Boolean,
				default: false,
			},
			userInfo: {
				type: Object,
				default: () => {
					return {}
				},
			},
		},
		data() {
			return {
				modalFlag: false,
			}
		},
		watch: {
			value: {
				handler(val) {
					this.modalFlag = val
				},
				immediate: true,
			},
			modalFlag(val) {
				this.$emit('input', val)
			},
		},
	}
</script>
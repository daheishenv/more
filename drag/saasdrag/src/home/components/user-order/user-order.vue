<template>
	<view>
		<template v-if="cmptStyle_ === 'style1'">
			<sub-home-user-order-style1 :orderStatus="orderStatus" :order="order" />
		</template>
		<template v-else-if="cmptStyle_ === 'style2'">
			<sub-home-user-order-style2 :orderStatus="orderStatus" :order="order" />
		</template>
		<template v-else-if="cmptStyle_ === 'style3'">
			<sub-home-user-order-style3 :orderStatus="orderStatus" :order="order" />
		</template>
	</view>
</template>

<script>
	export default {
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
	}
</script>
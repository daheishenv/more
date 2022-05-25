<template>
	<view>
		<template v-if="cmptStyle_ === 'style1'">
			<sub-home-cate-list-style1 :list="list" :showTitle="showTitle" :isSub="isSub" />
		</template>
		<template v-else-if="cmptStyle_ === 'style2'">
			<sub-home-cate-list-style2 :list="list" :showTitle="showTitle" :isSub="isSub" />
		</template>
	</view>
</template>
<script>
	import cateListMixins from '@/home/components/cate-list/mixins/index';
	const { props } = cateListMixins;
	export default {
		mixins: [ { props } ]
	}
</script>
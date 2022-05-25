<template>
	<view class="home-brand" v-if="cData && cData.length" :style="[outerLayer_]">
		<sub-home-card :radius="config.radius" :title="config.title">
			<view class="c-row">
				<view class="c-col-3" v-for="(brand, index) in cData" :key="index" @tap="$jump('searchList', { brand_id: brand.id})">
					<c-image width="142" height="82" :src="brand.brand_logo_img" mode="aspectFit" />
					<view class="brand-name c-ellipsis">
						<text>{{brand.brand_name}}</text>
					</view>
				</view>
			</view>
		</sub-home-card>
	</view>
</template>

<script>
	import homeComponentMixins from '@/home/components/component/home-component-mixins';
	// 首页品牌推荐组件
	export default {
		name: 'homeBrand',
		mixins: [ homeComponentMixins ],
		data () {
			return {
				cData: {}
			}
		}
	}
</script>

<style lang="scss">
	.brand{
		&-name{
			font-size: 24rpx;
			color: #666666;
			line-height: 34rpx;
		}
		.c-col-3{
			@include flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>

<template>
	<view class="home-construction-team" :class="[ blockClass_ ]" v-if="!noData_">
		<sub-home-module-title :full="config.isFull" :title="config.title" more="worker" />
		<view class="home-construction-team-bd">
			<scroll-view :scroll-x="true" :scroll-with-animation="true">
				<sub-home-construction-team-list :list="cData.list" imgWidth="188" imgHeight="246" :radius="config.isFull ? 0 : 16" imgRadius="0" />
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import homeComponentMixins from '@/home/components/component/home-component-mixins';
	// 首页施工团队组件
	export default {
		name: 'home-construction-team',
		mixins: [ homeComponentMixins ],
		options: {
			styleIsolation: 'shared',
		},
		data() {
			return {
				cData: {
					list: [
						{
							"id": 2126,
							"username": "包工头",
							"mobile": "18888888888",
							"in_time": 1611936000,
							"year": 10,
							"head_img_url": "/saas/upload/20210130/2519465eef3f44934ee5378fef6a40c1.jpg",
							"shop_uid": 3,
							"proficient_id": 2066,
							"sort_order": 1,
							"proficient_name": "测试熟练度12",
							"head_img_url_oss": "https://betastatic-saas.zzsupei.com/saas/upload/20210130/2519465eef3f44934ee5378fef6a40c1.jpg",
							"default_img": "https://betastatic-saas.zzsupei.com/static/images/noimg.jpg"
						},
						{
							"id": 1971,
							"username": "admin cloud serial2",
							"mobile": "13444444444",
							"in_time": 1611676800,
							"year": 11,
							"head_img_url": "/saas/upload/20210113/5aab47a4f1075e9bd4cc78514eba1faa.jpg",
							"shop_uid": 3,
							"proficient_id": 1911,
							"sort_order": 2,
							"proficient_name": "111222",
							"head_img_url_oss": "https://betastatic-saas.zzsupei.com/saas/upload/20210113/5aab47a4f1075e9bd4cc78514eba1faa.jpg",
							"default_img": "https://betastatic-saas.zzsupei.com/static/images/noimg.jpg"
						},
						{
							"id": 38,
							"username": "长青-李白",
							"mobile": "13599534184",
							"in_time": 1610380800,
							"year": 10,
							"head_img_url": "/saas/upload/20210119/2c27011a9b5299c0dce30fe5a30cdcd8.png",
							"shop_uid": 3,
							"proficient_id": 1,
							"sort_order": 3,
							"proficient_name": "高级工长",
							"head_img_url_oss": "https://betastatic-saas.zzsupei.com/saas/upload/20210119/2c27011a9b5299c0dce30fe5a30cdcd8.png",
							"default_img": "https://betastatic-saas.zzsupei.com/static/images/noimg.jpg"
						},
						{
							"id": 1,
							"username": "许常青",
							"mobile": "13599534184",
							"in_time": 1611763200,
							"year": 6,
							"head_img_url": "/saas/upload/20210108/486b966d8be022556c03757668fdc870.png",
							"shop_uid": 3,
							"proficient_id": 1,
							"sort_order": 3,
							"proficient_name": "高级工长",
							"head_img_url_oss": "https://betastatic-saas.zzsupei.com/saas/upload/20210108/486b966d8be022556c03757668fdc870.png",
							"default_img": "https://betastatic-saas.zzsupei.com/static/images/noimg.jpg"
						},
						{
							"id": 139,
							"username": "哈哈哈哈",
							"mobile": "18875704746",
							"in_time": 1609776000,
							"year": 6,
							"head_img_url": "/saas/upload/20210131/e6c77ed42ffd984967d47410cd843743.png",
							"shop_uid": 3,
							"proficient_id": 1,
							"sort_order": 4,
							"proficient_name": "高级工长",
							"head_img_url_oss": "https://betastatic-saas.zzsupei.com/saas/upload/20210131/e6c77ed42ffd984967d47410cd843743.png",
							"default_img": "https://betastatic-saas.zzsupei.com/static/images/noimg.jpg"
						}
					]
				}
			}
		},
		created() {
			this.config.title = '施工团队'
		},
	}
</script>

<style lang="scss">
	.home-construction-team {
		
		/deep/ .home-construction-team-list{
			padding-top: 0;
		}
		
		&-bd{
			margin: -24rpx;
		}
		
		&[class*='area-mt-']{
			.home-construction-team-bd {
				margin: 0;
			}
		}
	}
</style>

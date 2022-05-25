<template>
	<view class="home-construction-technology" :class="[ blockClass_ ]" v-if="!noData_">
		<sub-home-module-title :full="config.isFull" :title="config.title" more="decoration" />
		<view class="home-construction-technology-bd">
			<scroll-view scroll-x :scroll-with-animation="true">
				<view class="home-construction-technology__list">
					<view class="home-construction-technology__item" v-for="(item, index) in cData.list" :key="index">
						<view class="home-construction-technology__box c-radius-sm" @tap="$jumpDetail('decorationDetails', item.id)">
							<c-image height="200" width="266" :radius="config.isFull ? '4rpx' : '4rpx 4rpx 0 0'" :src="item.cover_image" mode="aspectFill" />
							<view class="home-construction-technology__text" :class="{'plr0': config.isFull}">
								<view class="home-construction-technology__title c-ellipsis">{{item.title}}</view>
								<view class="home-construction-technology__desc c-ellipsis-2">{{item.desc}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import homeComponentMixins from '@/home/components/component/home-component-mixins';
	export default {
		name: 'home-company-profile',
		mixins: [homeComponentMixins],
		data() {
			return {
				cData: {
					list: [
						{
							"id": 763,
							"shop_uid": 3,
							"cover_image": "https://shop.oss.meijiabang.com/mjb/mjb_article_cover/2021/01/11/admin_64_5ffc0eba254ef.jpeg",
							"create_time": "2021-03-25 09:51:32",
							"update_time": "2021-03-25 09:51:32",
							"cat_id": 412,
							"title": "全屋定制市场趋势及未来发展新方向 整装大家居势不可挡",
							"keyword": "",
							"is_show": 1,
							"sort_order": 1,
							"is_recommend_shop": 1,
							"is_recommend": 1,
							"is_top": 2,
							"view_num": 10296,
							"invented_view_num": 10258,
							"virtual_win_user_num": 6012,
							"poster_image": "https://shop.oss.meijiabang.com/mjb/mjb_article_poster/2021/01/11/admin_64_5ffc0eb82c32e.jpeg",
							"source_id": 233,
							"source_type": 4,
							"desc": "近年来，随着互联网技术的传播与发展，传统的门店已经无法轻易的获得更多的流量；面对流量的分散，全屋定制",
							"win_user_num": 12,
							"cat_name": "装修宝典1",
							"source_name": "模版数据",
							"share_num": 500
						},
						{
							"id": 762,
							"shop_uid": 3,
							"cover_image": "https://shop.oss.meijiabang.com/mjb/mjb_article_cover/2021/01/08/admin_64_5ff816b695c7d.jpeg",
							"create_time": "2021-03-25 09:51:32",
							"update_time": "2021-03-25 09:51:32",
							"cat_id": 412,
							"title": "玄关只放鞋柜OUT了！现在流行这样设计！",
							"keyword": "",
							"is_show": 1,
							"sort_order": 1,
							"is_recommend_shop": 1,
							"is_recommend": 1,
							"is_top": 2,
							"view_num": 13515,
							"invented_view_num": 13257,
							"virtual_win_user_num": 5278,
							"poster_image": "https://shop.oss.meijiabang.com/mjb/mjb_article_poster/2021/01/08/admin_64_5ff816b47559c.jpeg",
							"source_id": 232,
							"source_type": 4,
							"desc": "你家玄关，有几种设计方式？相信80%的人就是配置鞋柜，或者衣柜，加些自己喜爱的装饰或价值不菲的摆件，",
							"win_user_num": 46,
							"cat_name": "装修宝典1",
							"source_name": "模版数据",
							"share_num": 500
						},
						{
							"id": 757,
							"shop_uid": 3,
							"cover_image": "https://shop.oss.meijiabang.com/mjb/mjb_article_cover/2021/01/12/admin_64_5ffd627fb6821.png",
							"create_time": "2021-03-25 09:51:31",
							"update_time": "2021-05-07 15:07:40",
							"cat_id": 415,
							"title": "“老破小”旧房改造攻略，让你的新家省钱又好看！",
							"keyword": "",
							"is_show": 1,
							"sort_order": 1,
							"is_recommend_shop": 1,
							"is_recommend": 1,
							"is_top": 2,
							"view_num": 10242,
							"invented_view_num": 10235,
							"virtual_win_user_num": 5985,
							"poster_image": "https://shop.oss.meijiabang.com/mjb/mjb_article_poster/2021/01/12/admin_64_5ffd627e184ab.png",
							"source_id": 29,
							"source_type": 4,
							"desc": "123",
							"win_user_num": 2,
							"cat_name": "装修流程",
							"source_name": "模版数据",
							"share_num": 500
						}
					]
				}
			}
		},
		created() {
			this.config.title = '施工工艺'
		},
	}
</script>

<style lang="scss">
	.home-construction-technology {
		&-bd {
			margin: -24rpx;
		}

		&[class*='area-mt-'] {
			.home-construction-technology-bd {
				margin: 0;
			}

			&__text {
				padding: 24rpx 0;
			}
		}

		&__list {
			white-space: nowrap;
			font-size: 0;
			padding: 12rpx 0;
			padding-left: 24rpx;
		}

		&__item {
			// padding: 12rpx;
			margin-right: 24rpx;
			display: inline-block;

		}

		&__box {
			width: 266rpx;
			background: #fff;
			position: relative;
		}

		&__text {
			padding: 24rpx 24rpx;
		}

		&__title {
			font-size: 28rpx;
			color: #333333;
			line-height: 40rpx;
		}

		&__desc {
			margin-top: 10rpx;
			font-size: 20rpx;
			color: #999999;
			line-height: 28rpx;
			height: 56rpx;
		}

	}
</style>

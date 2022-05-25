<template>
	<block>
		<view class="category-right__item" v-if="showTitle">
			<view class="category-right__item_title flex-ajcenter">{{isSub ? list.cat_name : list.goods_branch.title}}</view>
			<view class="category-list flex flex-wrap">
				<view class="category-item c-col-4" @click="jumpSearch(item)" v-for="(item, index) in dataList_" :key="index">
					<c-image v-if="isSub" :src="item.touch_icon_img" size="142"></c-image>
					<c-image v-else :src="item.brand_logo_img" width="142" height="82" mode="aspectFit"></c-image>
					<view class="category-item__text">{{isSub ? item.cat_name : item.brand_name}}</view>
				</view>
			</view>
		</view>
		<view class="category-right__item" v-else>
			<view class="category-list flex flex-wrap">
				<view class="category-item c-col-4" @click="$jump('searchList', { cat_id: list.cat_id})">
					<c-image :src="list.touch_icon_img" size="142"></c-image>
					<view class="category-item__text">{{list.cat_name}}</view>
				</view>
			</view>
		</view>
	</block>
</template>
<script>
	import cateListMixins from '@/home/components/cate-list/mixins/index';
	export default {
		mixins: [ cateListMixins ]
	}
</script>
<style lang="scss" scoped>
	.category-right{
		&__item{
			padding: 12rpx;
			background-color: #fff;
			border-radius: 16rpx;
			.category-list{
				.category-item{
					@include flex;
					align-items: center;
					&__image{
						width: 100%;
						height: 82rpx;
						background: #fff center center / contain no-repeat;
					}
					&__text{
						margin-top: 8rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #666666;
						line-height: 33rpx;
						width: 100%;
						text-align: center;
						@include ellipsis();
					}
				}
			}
		}
		&__item_title{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #666666;
			line-height: 28px;
			letter-spacing: 1px;
			padding-left: 1px;
			&::before, &::after{
				content: '';
				margin: 0 24rpx;
				width: 46rpx;
				height: 2rpx;
				background: linear-gradient(90deg, rgba(216, 216, 216, 1), rgba(216, 216, 216, 1) 100%);
			}
			&::after {
				transform: rotate(180deg);
			}
		}
	}
</style>

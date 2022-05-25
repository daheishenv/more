<template>
	<view class="swiper-content">
		<swiper class="swiper-box" :autoplay="autoplay" :interval="interval" :duration="duration" :style="{height: height, width: width}"
		 @change="change" :vertical="vertical" circular :current="active">
			<swiper-item v-for="(item,index) in list" :key="index">
				<slot :item="item" :height="height" :width="width" :radius="radius" />
			</swiper-item>
		</swiper>
		<block v-if="list.length > 1">
			<view class="swiper-doted" :style="{width: originWidth, backgroundColor: bg, bottom: bottom}" v-if="origin">
				<view class="swiper-doted__item" :style="{left: originLeft, backgroundColor: activeBg}"></view>
			</view>
			<view v-if="dotted === 'style1'" class="swiper-doted-style1">
				<view class="swiper-doted-style1__item" :class="{'swiper-doted-style1__item--active': active === index}" v-for="(item,index) in list" :key="index"></view>
			</view>
		</block>
	</view>
</template>
<script>
	export default {
		props: {
			height: {
				type: String,
				default: 'auto'
			},
			width: {
				type: String,
				default: '100%'
			},
			autoplay: {
				type: Boolean,
				default: false
			},
			interval: {
				type: Number,
				default: 15000
			},
			radius: {
				type: [ Number, String ],
				default: 16
			},
			duration: {
				type: Number,
				default: 300
			},
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			bg: { // 原点背景
				type: String,
				default: ''
			},
			activeBg: { // 当前原点
				type: String,
				default: ''
			},
			bottom: { // 原点位置
				type: String,
				default: ''
			},
			origin: { // 原点是否显示
				type: Boolean,
				default: true
			},
			dotted: {
				type: String,
				default: ''
			},
			vertical: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			originWidth() {
				return (this.list.length * 25) + 'rpx'
			},
			originLeft() {
				return (this.active * 25) + 'rpx'
			}
		},
		data() {
			return {
				active: 0
			}
		},
		methods: {
			change(event) {
				this.active = event.detail.current
				this.$emit('change', event)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.swiper-content {
		position: relative;

		.swiper-box {
			width: 100%;
		}
		
		.swiper-doted-style1{
			@include abs(null, 50%, 8rpx);
			transform: translateX(50%);
			line-height: 1;
			&__item{
				width: 12rpx;
				height: 12rpx;
				background: rgba(240, 240, 240, .5);
				border-radius: 100%;
				display: inline-block;
				margin: 0 4rpx;
				&--active{
					background-color: #497AFF;
				}
			}
		}

		.swiper-doted {
			position: absolute;
			bottom: 16rpx;
			left: 50%;
			transform: translateX(-50%);
			height: 4rpx;
			white-space: nowrap;
			font-size: 0;
			background-color: rgba($color: #fff, $alpha: .3);
			border-radius: 2rpx;

			&__item {
				position: absolute;
				top: 0;
				height: 100%;
				border-radius: 2rpx;
				width: 25rpx;
				background-color: #fff;
				@include tst();
			}

		}
	}
</style>

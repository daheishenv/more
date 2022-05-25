<template>
	<view class="shipping-address-item flex align-center">
		<view class="flex-column flex-1">
			<view class="shipping-address__title">
				<text>{{config.user_name}}</text>
				<text class="pl24">{{displayTel_(config.mobile)}}</text>
				<c-colors class="shipping-address__tag" :theme="['t', 't']" :pro="['bdc', 'c']" v-if="config.is_default === 1">
					<view>默认</view>
				</c-colors>
			</view>
			<view class="shipping-address__local mt12">{{ completeAdd_(config) }}</view>
		</view>
		<view class="shipping-address__line" v-if="edit_" @click.stop="handleEdit">编辑</view>
	</view>
</template>

<script>
	export default {
		props: {
			config: {
				type: Object,
				default:() => {
					return {}
				}
			},
			edit: {
				type: [ String, Boolean ],
				default: true
			}
		},
		computed: {
			edit_() {
				return String(this.edit) === 'false' ? false : true;
			},
            displayTel_() {
                return (tel) => {
                    return tel.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
                }
            },
			completeAdd_() {
			    return (obj) => {
			        return `${obj.province}${obj.city}${obj.district}${obj.address}`
			    }
			}
		},
		methods: {
			handleEdit() {
				this.$emit('edit', {
					type: 'click',
					detail: this.config
				})
			}
		}
	}
</script>

<style lang="scss">
	.shipping-address {
		&-item {
			background-color: #fff;
		}

		&__content {
			padding-right: 24rpx;
			flex: 1;

		}

		&__title {
			font-size: 32rpx;
			font-weight: bold;
			line-height: 52rpx;
			color: #333333;

		}

		&__tag {
			display: inline-block;
			font-size: 40rpx;
			// color: #fa3f1e;
			border: 1px solid inherit;
			line-height: 52rpx;
			transform: scale(.5);
			transform-origin: 0 50%;
			padding: 0 16rpx;
			margin-left: 16rpx;
			border-radius: 8rpx;
		}

		&__local {
			font-size: 24rpx;
			color: #333333;
			line-height: 34rpx;
		}

		&__line {
			padding-left: 24rpx;
			position: relative;
			color: #999;
			font-size: 28rpx;

			&::after {
				content: "";
				position: absolute;
				left: 0;
				top: 50%;
				width: 1px;
				height: 52rpx;
				transform: translateY(-50%) scaleX(.5);
				background: #d8d8d8;
				display: block;
			}
		}
	}
</style>

<template>
	<c-popup v-model="modalFlag" radius="34" :closePos="closePos" :showClose="showClose_" maskabled="false" :hdStyle="hdStyle">
		<view class="c-modal">
			<view class="c-modal__title" v-if="showTitle_" :style="[ titleStyle ]">{{title}}</view>
			<view class="c-modal__content" :style="[ contentStyle ]">
				<block v-if="$slots.default || content">
					<view class="c-modal-bd">
						<view v-if="content">{{content}}</view>
						<slot></slot>
					</view>
				</block>
			</view>
			<view class="c-modal-ft">
				<c-colors class="c-modal__btn" radius="16" plain size="large" :pro="['bgc', 'c']" :theme="['#EDEDED', '#333']" v-if="showCancel_">
					<c-button size="large" @click="handleCancel" :style="{ color: cancelColor }">{{cancelText}}</c-button>
				</c-colors>
				<c-colors class="c-modal__btn" radius="16" size="large" :pro="['bgc', 'c']" :theme="['t', '#fff']" v-if="showConfirm_">
					<c-button size="large" @click="handleConfirm" :style="{ color: confirmColor }" :open-type="openType">
						<c-loading v-if="loading" color="confirmColor"></c-loading>
						{{loading ? '' : confirmText}}
					</c-button>
				</c-colors>
			</view>
		</view>
		<view slot="other" v-if="$slots.other">
			<slot name="other"></slot>
		</view>
	</c-popup>
</template>

<script>
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			/**
			 * 提示的标题
			 */
			title: {
				type: [String, Boolean],
				default: '提示'
			},
			// 标题样式
			titleStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			// 关闭按钮
			showClose: {
				type: [String, Boolean],
				default: false
			},
			closePos: {
				type: String,
				default: 'top-left'
			},
			/**
			 * 提示的内容
			 */
			content: {
				type: String,
				default: ''
			},
			// 标题样式
			contentStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			/**
			 * 是否显示取消按钮，默认为 true
			 */
			showCancel: {
				type: [String, Boolean],
				default: true
			},
			/**
			 * 取消按钮的文字，默认为"取消"，最多 4 个字符
			 */
			cancelText: {
				type: String,
				default: '取消'
			},
			/**
			 * 取消按钮的文字颜色，默认为"#666666"
			 */
			cancelColor: {
				type: String,
				default: '#333'
			},
			/**
			 * 是否显示确定按钮，默认为 true
			 */
			showConfirm: {
				type: [String, Boolean],
				default: true
			},
			/**
			 * 确定按钮的文字，默认为"确定"，最多 4 个字符
			 */
			confirmText: {
				type: String,
				default: '确定'
			},
			/**
			 * 确定按钮的文字颜色，默认为"#0260fe"
			 */
			confirmColor: {
				type: String,
				default: '#fff'
			},
			/**
			 * 是否开启异步关闭，H5平台默认为"#007aff"
			 */
			asyncClose: {
				type: [String, Boolean],
				default: false
			},
			// 内容体额外样式
			hdStyle: {
				type: Object,
				default:() => {
					return {}
				}
			},
			openType: {
				type: String,
				default: ''
			}
		},
		computed: {
			modalFlag: {
				get(val) {
					return val.value;
				},
				set(val) {
					this.$emit('input', val);
				}
			},
			showClose_() {
				return String(this.showClose) === 'false' ? false : true;
			},
			showCancel_() {
				return String(this.showCancel) === 'false' ? false : true;
			},
			showConfirm_() {
				return String(this.showConfirm) === 'false' ? false : true;
			},
			showTitle_() {
				return String(this.title) === 'false' ? false : true;
			},
			asyncClose_() {
				return String(this.asyncClose) === 'false' ? false : true;
			}
		},
		data() {
			return {
				loading: false, //确认按钮loading状态
			}
		},
		watch: {
			// 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态
			// 避免下次打开的时候，状态混乱
			value(n) {
				if (n === true) this.loading = false;
			}
		},
		methods: {
			clearLoading() {
				this.loading = false;
			},
			handleCancel() {
				this.$emit('input', false);
				let res = {
					type: 'confirm',
					detail: {
						value: false
					}
				}
				this.$emit('cancel', res);
				this.$emit('change', res);
			},
			handleConfirm() {
				if (this.asyncClose_) {
					this.loading = true;
				} else {
					this.$emit('input', false);
				}
				let res = {
					type: 'confirm',
					detail: {
						value: true
					}
				}
				this.$emit('confirm', res);
				this.$emit('change', res);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.c-modal {
		width: 600rpx;
		text-align: center;
		padding: 24rpx;

		&__title {
			height: auto;
			font-size: 32rpx;
			padding: 24rpx;
			line-height: 46rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			font-weight: bold;
			word-wrap: break-word;
			word-break: break-all;
			white-space: pre-wrap;
		}
		
		&__content {
			padding: 24rpx 0;
		}

		&-bd {
			min-height: 80rpx;
			font-size: 28rpx;
			line-height: 40rpx;
			color: #666;
			// min-height: 150rpx;
			max-height: 400rpx;
			max-height: 30vh;
			overflow-y: auto;
		}

		&-ft {
			position: relative;
			font-size: 36rpx;
			line-height: 96rpx;
			@include flex(row);
		}

		&__btn {
			flex: 1;
			margin: 0 12rpx;
		}
	}
</style>

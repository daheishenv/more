<template>
	<c-popup v-model="modalFlag" :showClose="showClose" radius="16">
		<view class="qrcode">
			<view class="title">
				<view class="img">
					<c-image width="100" height="100" radius="8" :src="userInfo.user_picture" mode="aspectFill" />
				</view>
				<view class="text">
					<text>{{ userInfo.nick_name }}</text>
				</view>
				<view class="close">
					<c-image @tap="modalFlag = false" size="32" src="guest/close@2x.png" />
				</view>
			</view>
			<view class="main">
				<view class="img">
					<c-image :src="inviteImg" size="480"></c-image>
				</view>
				<!-- #ifdef H5 -->
				<view class="text">
					<text>长按保存图片，分享好友</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="friend__content-btn">
					<c-colors :theme="['t']" :pro="['bgc']" radius="16">
						<button class="share" open-type="share">
							<view class="shareBox flex flex-ajcenter">
								<c-icons size="28" color="#fff" type="icon-fenxiang1" class="icon" />
								<text>分享</text>
							</view>
						</button>
					</c-colors>
					<view class="hr"></view>
					<c-colors :theme="['s1']" radius="16" :pro="['bgc']" @tap="saveImg">
						<view class="save">
							<text>保存图片</text>
						</view>
					</c-colors>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view class="friend__content-btn">
					<c-colors :theme="['s1']" radius="16" :pro="['bgc']" @tap="saveImg">
						<view class="save">
							<text>保存图片</text>
						</view>
					</c-colors>
				</view>
				<!-- #endif -->
			</view>
		</view>
	</c-popup>
</template>

<script>
	export default {
		name: 'user-popup',
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
				showClose: false, //是否显示关闭按钮
				inviteImg: '',
			}
		},
		created() {
			this.getUserQrcode()
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
		methods: {
			async getUserQrcode() {
				// 获取二维码
				// #ifdef MP-WEIXIN
				const {
					data: { src },
				} = await this.$http('getUserQrcode')
				// #endif
				// #ifndef MP-WEIXIN
				const {
					data: { src },
				} = await this.$http('h5Qrcode')
				// #endif
				this.inviteImg = src
			},
			async saveImg() {
				// #ifdef H5
				this.$toast('请长按图片保存')
				// #endif
				// #ifndef H5
				if (!this.inviteImg) return
				const tempFilePath = await this.uniDownloadFile(this.inviteImg)
				const savedFilePath = await this.uniSaveFile(tempFilePath)
				await this.saveImageToPhotosAlbum(savedFilePath)
				this.$toast('保存成功,快去分享吧~')
				// #endif
			},
			saveImageToPhotosAlbum(filePath) {
				return new Promise((resolve, reject) => {
					uni.saveImageToPhotosAlbum({
						filePath,
						success: function () {
							resolve()
						},
						fail: (err) => {
							reject(err)
						},
					})
				})
			},
			uniDownloadFile(url) {
				return new Promise((resolve, reject) => {
					uni.downloadFile({
						url: this.$config.proxyImgUrl + url,
						success: (res) => {
							if (res.statusCode === 200) {
								resolve(res.tempFilePath)
							}
						},
					})
				})
			},
			uniSaveFile(tempFilePath) {
				return new Promise((resolve, reject) => {
					uni.saveFile({
						tempFilePath,
						success: function ({ savedFilePath }) {
							resolve(savedFilePath)
						},
						fail: (err) => {
							reject(err)
						},
					})
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.qrcode {
		margin: 0;
		border-radius: 16rpx;
		background-color: #fff;
		padding: 32rpx 24rpx 0;
		width: 600rpx;
		.title {
			display: flex;
			align-items: center;
			position: relative;
			.close {
				position: absolute;
				top: 0;
				right: 8rpx;
			}
			.img {
				height: 100rpx;
				width: 100rpx;
				margin-right: 24rpx;
				border-radius: 8rpx;
				// image {
				// 	height: 100%;
				// 	width: 100%;
				// 	border-radius: 8rpx;
				// }
			}
			.text {
				color: #333;
				font-size: 32rpx;
				line-height: 1;
			}
		}
		.main {
			.img {
				width: 480rpx;
				margin: 30rpx auto 0;
				height: 480rpx;
				border-radius: 8rpx;
				display: flex;
				align-content: center;
				flex-wrap: wrap;
				// image {
				// 	height: 100%;
				// 	width: 100%;
				// }
				.text {
					font-size: 24rpx;
					color: #333;
					line-height: 32rpx;
					height: 32rpx;
					text-align: center;
					width: 100%;
				}
			}
			.text {
				padding: 16rpx 0 50rpx;
				text-align: center;
				line-height: 34rpx;
				color: #999;
				font-size: 24rpx;
			}
		}

		.friend__content-btn {
			padding: 24rpx 0;
			.share,
			.save {
				height: 88rpx;
				border-radius: 16rpx;
				text-align: center;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon {
					line-height: 28rpx;
					height: 28rpx;
					display: inline-block;
				}
			}
			.hr {
				height: 24rpx;
			}
			.share {
				color: #fff;
				font-size: 28rpx;
				background: none;
				padding: 0;
				&::after {
					display: none;
				}
			}
			.save {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 28rpx;
			}
			.c-btn {
				line-height: 1;
			}
			.icon {
				margin-right: 16rpx;
			}
		}
	}
</style>
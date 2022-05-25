<template>
    <view
        class="lucky"
        :style="[luckyStyle_]"
    >
        <view class="lucky__title">
            <c-image
                v-if="baseConfig_.pageTitle"
                mode="aspectFill"
                :src="baseConfig_.pageTitle"
                width="498"
                height="106"
                type="upload"
            />
        </view>
        <view class="lucky__notice">
            <sub-activity-lucky-notice-list
                v-if="noticeList_ && noticeList_.length>0"
                :list="noticeList_"
            />
        </view>
        <view
            class="lucky__hover"
            :class="{'lucky__hover--show': isDemo,'lucky__hover--square':defaultValue.type !== 1 }"
        >
            <view
                v-if="isDemo"
                class="lucky__hover--show-icon"
                @click="triggerLeft"
            >
                <c-icons
                    color="#ffffff"
                    :size="36"
                    type="icon-zuopin"
                ></c-icons>
            </view>
            <sub-activity-lucky-turntable
                ref="luckyTurntable"
                :type="defaultValue.type"
                :draw="defaultValue.draw"
                @startCallBack="startCallBack"
                @endCallBack="endCallBack"
            />
        </view>

        <view class="lucky__btns">
            <view
                class="lucky__btns-item"
                @click="jump(0)"
            >
                <c-image
                    src="activity/lucky-draw/rule.png"
                    width="124rpx"
                    height="124rpx"
                />
            </view>
            <view
                class="lucky__btns-item"
                @click="jump(1)"
            >
                <c-image
                    src="activity/lucky-draw/prize.png"
                    width="124rpx"
                    height="124rpx"
                />
            </view>
        </view>
        <view
            class="lucky__share"
            @click="!isDemo?handleShowPopup('showShare'):''"
        >
            <c-icons
                color="#FFEFDC"
                :size="36"
                type="icon-fenxiangfangshi"
            ></c-icons>
        </view>
        <view class="lucky__chance">
            你还有{{ joinTimes_ }}次机会
        </view>
        <!-- 结果 -->
        <sub-activity-lucky-reward-popup
            v-model="showReward"
            :is-demo="isDemo"
            :type="rewardData.type"
            :desc="rewardData.desc"
            :good-img="rewardData.goodImg"
            :detail-id="rewardData.detailId"
        />
        <!-- 分享 -->
        <sub-activity-lucky-share-wechat
            v-if="shareInfo_"
            ref="luckShareWechat"
            v-model="showShare"
            :title="shareInfo_.title"
            :summary="shareInfo_.summary"
            :share-img="shareInfo_.shareImg"
            :share-url="shareInfo_.shareUrl"
            :img-height="1228"
        >
        </sub-activity-lucky-share-wechat>
    </view>
</template>

<script>
export default {
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        defaultValue: {
            type: Object,
            default() {
                return {}
            }
        },
        rewardData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            showReward: false,
            showShare: false
        }
    },
    computed: {
        baseConfig_() {
            return this.defaultValue.baseConfig || {}
        },
        isCircular_() {
            return this.defaultValue.type === 1
        },
        noticeList_() {
            return this.defaultValue.noticeList || {}
        },
        shareInfo_() {
            return this.defaultValue.shareInfo || null
        },
        joinTimes_() { // 剩余抽奖次数
            return this.defaultValue.joinTimes || 0
        },
        luckyStyle_() {
            let url = ''
            if (this.baseConfig_.pageBg && this.baseConfig_.pageBg.indexOf('http') === 0) {
                url = this.baseConfig_.pageBg
            } else {
                url = `${this.$config.baseOssImgUrl}${this.baseConfig_.pageBg}` || ''
            }
            return {
                backgroundImage: `url(${url})`
            }
        },
        cantPlay_() {
            return this.showShare || this.showReward
        }
    },
    methods: {
        handleShowPopup(pro) {
            this[pro] = true
        },
        startCallBack() {
            if (this.cantPlay_) return
            this.$emit('startCallBack') // 点击抽奖
        },
        endCallBack(prize) {
            this.$emit('endCallBack', prize) // 抽奖完成
        },
        play() { // 运行转盘
            this.$refs.luckyTurntable.play()
        },
        stop(index) { // 停止转盘
            this.$refs.luckyTurntable.stop(index)
        },
        showSharePosters() {
            this.$refs.luckShareWechat.hanlderShowShare('posters')
        },
        jump(index) {
            if (this.isDemo) {
                return ''
            }
            this.$jumpDetail('luckyDetails', this.defaultValue.detailId, { index })
        },
        triggerLeft() {
            // 管理后台-显示右侧奖品图像设置页
            this.$store.dispatch('setChangeImgStatus', true)
        }
        // handleCanvarToImg() {
        //     const canvas = this.$refs.LuckyDraw.canvas
        //     return new Promise((resolve, reject) => {
        //         wx.canvasToTempFilePath({
        //             canvas: canvas,
        //             quality: 1,
        //             success: (res) => {
        //                 console.log('store success: ', res)
        //                 this.drawImg = res.tempFilePath
        //                 resolve()
        //             },
        //             fail: (res) => {
        //                 console.log('store fail: ', res)
        //                 reject(res)
        //             }
        //         })
        //     })
        // }
    }
}
</script>

<style lang="scss" scoped>
.lucky {
    position: relative;
    min-height: 100%;
    background-size: cover;
    padding-top: 133rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20rpx;
    background-position: center center;
    flex: 1;
    &__title {
        // width: 498rpx;
        margin-bottom: 38rpx;
    }
    &__hover {
        position: relative;
        margin-top: 84rpx;
        // border: 2rpx dashed transparent;
        &--show {
            border: 2rpx dashed rgb(168, 168, 168);
            // &:hover {
            //     border: 2rpx dashed rgb(168, 168, 168);
            // }

            // &:hover &-icon {
            //     display: block;
            // }
            &-icon {
                // display: none;
                display: block;
                position: absolute;
                left: -4rpx;
                top: 0;
                transform: translateY(-100%);
                padding: 12rpx 12rpx;
                background-color: rgba(1, 1, 1, 0.3);
                cursor: pointer;
            }
        }
        &--square {
            margin-top: 140rpx;
        }
    }
    &__draw {
        position: relative;
        width: 687rpx;
        height: 720rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        &-shadow {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 16%);
            z-index: -1;
        }
        &-square {
            position: absolute;
            transform: translateY(-6rpx);
        }
    }
    &__btns {
        position: absolute;
        right: 10rpx;
        top: 236rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 3;
        &-item {
            &:not(:first-child) {
                margin-top: 20rpx;
            }
        }
    }
    &__share {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64rpx;
        height: 64rpx;
        border-radius: 39rpx;
        position: absolute;
        right: 23rpx;
        top: 32rpx;
        background: rgba(255, 224, 187, 0.47);
    }
    &__chance {
        height: 50rpx;
        font-size: 36rpx;
        font-weight: 600;
        color: #ffe4c1;
        line-height: 50rpx;
        margin-top: 20rpx;
    }
    &__notice {
        height: 54rpx;
    }
}
</style>

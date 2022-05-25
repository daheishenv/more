<template>
    <c-popup
        v-model="showPopup"
        bg-color="transparent"
        :show-close="false"
    >
        <view class="popup">
            <view
                class="popup__cancel"
                @click="showPopup=false"
            >
                <c-icons
                    color="#bababa"
                    :size="40"
                    type="icon-shanchu1"
                ></c-icons>
            </view>
            <view class="popup__title">
                {{ title_ }}
            </view>
            <view class="popup__desc">
                {{ desc_ }}
            </view>
            <view
                class="popup__content"
                :style="[contentStyle_]"
            >
                <c-image
                    :src="goodImg_"
                    :width="imgWidth_"
                    :height="imgHeight_"
                />
            </view>
            <view
                v-if="showPopup"
                class="popup__btns"
            >
                <template v-if="type===0">
                    <view class="popup__btns-item">
                        立即兑奖
                        <cover-view
                            class="popup__btns-item-cover"
                            @click="!isDemo?handleExc():handleContinue()"
                        ></cover-view>
                    </view>
                    <view class="popup__btns-item popup__btns-item--empty">
                        继续抽奖
                        <cover-view
                            class="popup__btns-item-cover"
                            @click="handleContinue"
                        ></cover-view>
                    </view>
                </template>
                <template v-else-if="type===1">
                    <view class="popup__btns-item">
                        继续抽奖
                        <cover-view
                            class="popup__btns-item-cover"
                            @click="handleContinue"
                        ></cover-view>
                    </view>
                    <!-- <view class="popup__btns-item popup__btns-item--empty">
                        立即兑奖
                        <cover-view
                            class="popup__btns-item-cover"
                            @click="!isDemo?handleExc():handleContinue()"
                        ></cover-view>
                    </view> -->
                </template>
                <view
                    v-else
                    class="popup__btns-item"
                >
                    去商城看看
                    <cover-view
                        class="popup__btns-item-cover"
                        @click="!isDemo?$jump('home'):handleContinue()"
                    ></cover-view>
                </view>
            </view>
        </view>
    </c-popup>
</template>

<script>
export default {
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        type: { // 0：中奖、1：没中奖、2：没机会
            type: Number,
            default: 0
        },
        desc: {
            type: String,
            default: ''
        },
        goodImg: {
            type: String,
            default: ''
        },
        detailId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            showPopup: this.value,
            defaultData: [
                { type: 0, title: '恭喜你中奖了', desc: '', goodImg: 'activity/lucky-draw/gift.png' },
                { type: 1, title: '好可惜', desc: '离大奖就差一步，加油哦', goodImg: 'activity/lucky-draw/nogift.png' },
                { type: 2, title: '抽奖机会以用完', desc: '明天再来吧', goodImg: 'activity/lucky-draw/nochance.png' }
            ]
        }
    },
    computed: {
        title_() {
            if (this.title) {
                return this.title
            }
            const obj = this.defaultData.find(o => o.type === this.type) || {}
            return obj.title || ''
        },
        desc_() {
            if (this.desc) {
                return this.desc
            }
            const obj = this.defaultData.find(o => o.type === this.type) || {}
            return obj.desc || ''
        },
        goodImg_() {
            if (this.goodImg) {
                return this.goodImg
            }
            const obj = this.defaultData.find(o => o.type === this.type) || {}
            return obj.goodImg || ''
        },
        imgWidth_() {
            if (this.type === 1) {
                return '633rpx'
            } else if (this.type === 2) {
                return '424rpx'
            }
            return '380rpx'
        },
        imgHeight_() {
            if (this.type === 1) {
                return '400rpx'
            } else if (this.type === 2) {
                return '333rpx'
            }
            return '380rpx'
        },
        contentStyle_() {
            if (this.type === 1) {
                return {
                    padding: '35rpx 0 0 0'
                }
            } else if (this.type === 2) {
                return {
                    padding: '54rpx 0'
                }
            }
            return {
                padding: '19rpx 0 52rpx 0'
            }
        }
    },
    watch: {
        value(nValue) {
            this.showPopup = nValue
        },
        showPopup(nValue) {
            this.$emit('input', nValue)
        }
    },
    methods: {
        handleContinue() {
            this.showPopup = false
        },
        handleExc() {
            this.showPopup = false
            this.$jumpDetail('luckyDetails', this.detailId, { index: 1 })
        }
    }
}
</script>

<style lang="scss" scoped>
.popup {
    position: relative;
    width: 560rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding-top: 80rpx;
    margin-bottom: 160rpx;
    &__cancel {
        position: absolute;
        right: 24rpx;
        top: 24rpx;
    }
    &__title {
        line-height: 78rpx;
        font-size: 56rpx;
        font-weight: 600;
        color: #f9f9f9;
        margin-bottom: 16rpx;
    }
    &__desc {
        font-size: 36rpx;
        font-weight: 600;
        color: #fce067;
        line-height: 50rpx;
    }
    &__content {
        // padding: 64rpx 84rpx;
    }
    &__btns {
        &-item {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 450rpx;
            height: 100rpx;
            background: linear-gradient(
                to bottom,
                rgba(252, 242, 130, 1) 0%,
                rgba(252, 184, 36, 1) 100%
            );
            font-size: 36rpx;
            border-radius: 80rpx;
            color: #6b430e;
            font-weight: 600;
            box-shadow: 0 -17px 0px -11px rgba(0, 0, 0, 0.2) inset;
            letter-spacing: 2rpx;
            overflow: hidden;
            &:not(:first-child) {
                margin-top: 45rpx;
            }
            &--empty {
                border: 2px solid #fcf383;
                box-shadow: none;
                background: transparent;
                color: #fcf383;
            }
            &-cover {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
}
</style>

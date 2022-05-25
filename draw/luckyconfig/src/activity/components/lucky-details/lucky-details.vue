<template>
    <view class="details">
        <c-fixed-menu
            v-model="tabFinish"
            height="88"
            :top="top_"
        >
            <gc-menu-scroll
                v-if="showMenu_"
                v-model="menuIndex"
                height="88"
                :list="menuList"
                mode="center"
            />
        </c-fixed-menu>
        <template v-if="showRules_">
            <view class="rules">
                <view class="rules__header">
                    <view class="rules__header-left">
                        <c-image
                            src="activity/lucky-draw/qua.png"
                            height="36"
                            width="36"
                        />
                        <view class="t1">{{ rulesInfo.joinPermissionText }}</view>
                    </view>
                    <view
                        v-if="rulesInfo.joinPermission===1"
                        class="rules__header-right"
                    >
                        <c-colors
                            :theme="['t', '#fff']"
                            :pro="['bgc', 'c']"
                            radius="38"
                            type="button"
                        >
                            <c-button
                                plain
                                font-size="26rpx"
                                height="56rpx"
                                @click="handleGetChance"
                            >获取机会</c-button>
                        </c-colors>
                    </view>
                </view>
                <view class="rules__content">
                    <view class="rules__content-title">
                        <c-image
                            src="activity/lucky-draw/details-gif.png"
                            height="36"
                            width="36"
                        />
                        <view class="t1">活动奖品</view>
                    </view>
                    <sub-activity-lucky-prize-list
                        type="rule"
                        :is-demo="isDemo"
                        :list="activeList"
                    />
                </view>
                <view class="rules__content">
                    <view class="rules__content-title">
                        <c-image
                            src="activity/lucky-draw/details-time.png"
                            height="36"
                            width="36"
                        />
                        <view class="t1">活动时间</view>
                    </view>
                    <view class="rules__content-desc">
                        {{ rulesInfo.activeTime }}
                    </view>
                </view>
                <view
                    v-if="showActiveDesc_"
                    class="rules__content"
                >
                    <view class="rules__content-title">
                        <c-image
                            src="activity/lucky-draw/details-rules.png"
                            height="36"
                            width="36"
                        />
                        <view class="t1">活动说明</view>
                    </view>
                    <view class="rules__content-desc rules__content-desc--explain">
                        {{ rulesInfo.activeDesc }}
                    </view>
                </view>
            </view>
        </template>
        <sub-activity-lucky-prize-list
            v-else
            :is-demo="isDemo"
            :list="pageList_"
        />
        <sub-activity-lucky-chance-popup
            v-model="chancePopup"
            :is-demo="isDemo"
            :chance-info="chanceInfo_"
            @chanceShare="chanceShare"
            @chancePoint="chancePoint"
        />
        <!-- 分享 -->
        <sub-activity-lucky-share-wechat
            v-if="shareInfo_"
            v-model="showShare"
            :title="shareInfo_.title"
            :summary="shareInfo_.summary"
            :share-img="shareInfo_.shareImg"
            :share-url="shareInfo_.shareUrl"
            :img-height="1228"
        />
    </view>
</template>

<script>
const throttle = (function () {
    let timeout = null
    return function (func, wait) {
        const context = this
        const args = arguments
        if (!timeout) {
            func.apply(context, args)
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
        }
    }
})()

export default {
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            default: -1
        },
        detailId: {
            type: Number,
            default: -1
        },
        pageList: { // 在后台使用的时候传递的pageList实例
            type: Array,
            default() {
                return []
            }
        },
        shareInfo: {
            type: Object,
            default() {
                return {}
            }
        },
        rulesInfo: {
            type: Object,
            default() {
                return {}
            }
        },
        activeList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            chancePopup: false,
            showShare: false,
            menuList: [{
                label: `活动规则`,
                value: 1
            }, {
                label: `我的奖品`,
                value: 2
            }],
            menuIndex: this.value,
            tabFinish: true,
            todaySurplusJoinTimes: null
        }
    },
    computed: {
        pageList_() {
            return this.pageList.map(item => {
                let exchangeTimeStr = `兑奖时间 ${item.create_time}`
                if (item.prize_type === 1) {
                    if ([1, 2].indexOf(item.status) !== -1 && item.receive_time) {
                        exchangeTimeStr = `兑奖时间 ${item.receive_time}`
                    } else {
                        exchangeTimeStr = `有效期至 ${item.big_wheel_prize?.receive_prize_end_time}`
                    }
                }
                return {
                    ...item,
                    prize_img: item.big_wheel_prize?.prize_img,
                    prize_name: item.big_wheel_prize?.prize_name,
                    receive_prize_end_time: item.big_wheel_prize?.receive_prize_end_time,
                    receive_prize_start_time: item.big_wheel_prize?.receive_prize_start_time,
                    receive_prize_way: item.big_wheel_prize?.receive_prize_way,
                    points: item.big_wheel_prize?.points,
                    prize_type: item.big_wheel_prize?.prize_type,
                    create_time: item.create_time,
                    prize_desc: item.big_wheel_prize?.prize_desc,
                    isAsh: item.status === 3,
                    exchangeTime: item.prize_type === 1 ? `${item.big_wheel_prize?.receive_prize_start_time}-${item.big_wheel_prize?.receive_prize_end_time}` : item.create_time,
                    exchangeTimeStr,
                    couponStr: item.coupon_info?.coupon_price_text,
                    couponName: item.coupon_info?.coupon_name
                }
            })
            // return this.pageList
        },
        showRules_() {
            return this.menuIndex === 0
        },
        top_() {
            return this.isDemo ? 130 : 0
        },
        shareInfo_() {
            return this.shareInfo
        },
        chanceInfo_() {
            const todaySurplusJoinTimes = this.todaySurplusJoinTimes || this.todaySurplusJoinTimes === 0 ? this.todaySurplusJoinTimes : this.rulesInfo.todaySurplusJoinTimes
            return {
                ...this.rulesInfo,
                todaySurplusJoinTimes // 今日剩余抽奖次数
            }
        },
        showActiveDesc_() {
            return this.isDemo || this.rulesInfo.activeDesc
        },
        showMenu_() {
            return this.menuIndex !== -1
        }
    },
    watch: {
        value(nValue) {
            this.menuIndex = nValue
        },
        menuIndex(nValue) {
            this.$emit('input', nValue)
        }
    },
    methods: {
        handleGetChance() {
            if (this.isDemo) return
            if (this.rulesInfo.joinPermission === 0) {
                this.$toast(this.rulesInfo.joinPermissionText)
                return
            }
            this.chancePopup = true
        },
        chanceShare() {
            if (this.isDemo) return
            this.chancePopup = false
            this.showShare = true
        },
        async chancePoint() {
            if (this.isDemo) return
            throttle(async () => {
                const { data = {} } = await this.$http('pointExchangeTimes', { big_wheel_activity_id: this.detailId })
                this.todaySurplusJoinTimes = data.today_surplus_join_times
                this.$toast('积分兑换成功')
            }, 1000)
        },
        changeIndex({ index }) { // 后台管理中使用
            this.$nextTick(() => {
                this.menuIndex = index
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.details {
    padding: 24rpx;
}
.rules {
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 110rpx;
        background: linear-gradient(180deg, #fffdfb 0%, #fff4e3 100%);
        border-radius: 16px;
        padding: 0 24rpx;
        &-left {
            display: flex;
            align-items: center;
            justify-content: center;
            .t1 {
                max-width: 420rpx;
                margin-left: 16rpx;
                font-size: 28rpx;
                font-weight: 500;
                color: #333333;
                @include ellipsis;
            }
        }
        &-right {
            flex-shrink: 0;
            width: 160rpx;
            font-size: 26rpx;
        }
    }
    &__content {
        margin-top: 24rpx;
        padding: 25rpx 24rpx;
        background: #ffffff;
        border-radius: 16rpx;

        &-title {
            display: flex;
            align-items: center;
            .t1 {
                font-size: 28rpx;
                line-height: 1em;
                font-weight: 500;
                color: #333333;
                margin-left: 16rpx;
            }
        }
        &-desc {
            margin-top: 12rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #333333;
            line-height: 32rpx;
            &--explain {
                white-space: pre-wrap;
                line-height: 40rpx;
            }
        }
    }
}
</style>

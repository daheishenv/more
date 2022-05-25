<template>
    <view class="prize">
        <view
            v-for="(item, index) in list_"
            :key="item.id"
            class="prize-item"
            :class="type==='rule'?'prize-item--border':''"
            @click="handleDetail(item, index)"
        >
            <view class="left">
                <c-image
                    :src="item.prize_img"
                    height="124"
                    width="124"
                />
            </view>
            <view class="prize-item-right right">
                <view>
                    <view
                        class="right__title"
                        :class="item.isAsh?'right__title--isuse':''"
                    >{{ item.prize_name }}</view>
                    <view
                        v-if="type==='rule'"
                        class="right__desc"
                    >{{ item.prize_desc }}</view>
                    <template v-if="type==='prize'">
                        <view
                            class="right__time"
                            :class="item.isAsh?'right__time--isuse':''"
                        >{{ item.exchangeTimeStr }}</view>
                        <!-- <view
                            v-else-if="item.prize_type===3"
                            class="right__time"
                            :class="item.status?'right__time--isuse':''"
                        >{{ item.points }}积分</view> -->
                    </template>
                </view>
                <view
                    v-if="type==='prize'"
                    class="right__bottom"
                >
                    <view>
                        <c-tag
                            radius="8"
                            :bg-color="item.isAsh?'#F5F5F5':'#FFF0E7'"
                            :color="item.isAsh?'#999999':'#FF6C00'"
                        >{{ item.status_text }}</c-tag>
                    </view>
                    <view
                        class="right__bottom-btn"
                        @click.stop
                    >
                        <c-colors
                            v-if="item.status===0 && item.receive_prize_way===1"
                            :theme="['t', '#fff']"
                            :pro="['bgc', 'c']"
                            radius="38"
                            type="button"
                        >
                            <c-button
                                plain
                                font-size="26rpx"
                                height="56rpx"
                                @click.stop="handleGet(item, index)"
                            >立即领取</c-button>

                        </c-colors>
                        <c-colors
                            v-else-if="item.prize_type===2"
                            :theme="['t']"
                            :pro="['c']"
                            radius="38"
                            type="button"
                        >
                            <c-button
                                plain
                                font-size="26rpx"
                                height="56rpx"
                                @click.stop="jump('myCoupons')"
                            >立即使用</c-button>

                        </c-colors>
                        <c-colors
                            v-else-if="item.prize_type===3"
                            :theme="['t']"
                            :pro="['c']"
                            radius="38"
                            type="button"
                        >
                            <c-button
                                plain
                                font-size="26rpx"
                                height="56rpx"
                                @click.stop="jump('myIntegral')"
                            >立即使用</c-button>
                        </c-colors>

                    </view>
                </view>
                <view
                    v-if="item.prize_num!=-1 && type==='rule'"
                    class="right__time right__time--isuse"
                >
                    <c-colors
                        :theme="['t']"
                        :pro="['c']"
                    >
                        奖品数量 {{ item.prize_num }}个
                    </c-colors>
                </view>
            </view>
        </view>
        <sub-activity-lucky-info-popup
            v-if="!isDemo && showInfo"
            v-model="showInfo"
            :prize="prize"
            @success="getSuccess"
        />
        <sub-activity-lucky-prize-item-popup
            v-model="showPrize"
            :prize="prize"
            @handle-get="handleGet(prize, prize.index)"
        />
    </view>
</template>

<script>

export default {
    components: {

    },
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'prize'
        },
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            showInfo: false,
            showPrize: false,
            prize: {},
            defaultData: []
        }
    },
    computed: {
        list_() {
            return this.list.map((o, index) => {
                const info = this.defaultData.find(v => v.id === o.id)
                return info || o
            })
        }
    },
    methods: {
        handleDetail(prize, index) {
            if (this.isDemo || this.type === 'rule') return
            this.prize = this.prize = {
                ...prize,
                index
            }
            this.showPrize = true
        },
        handleGet(prize, index) {
            this.showInfo = true
            this.prize = {
                ...prize,
                index
            }
        },
        getSuccess(data) {
            // 领取成功 修改原数组
            const item = this.list[data.index]
            const index = this.defaultData.findIndex(v => v.id === data.id)
            const changeData = { // 修改项
                ...item,
                status: data.status,
                status_text: data.status_text,
                exchangeTimeStr: `兑奖时间 ${data.receive_time}`
            }
            if (index !== -1) {
                this.defaultData.splice(index, 1, changeData)
            } else {
                this.defaultData.push(changeData)
            }
        },
        jump(name) {
            if (this.isDemo) return
            this.$jump(name)
        }
    }
}
</script>

<style lang="scss" scoped>
.prize {
    &-item {
        display: flex;
        justify-content: space-between;
        height: 218rpx;
        background: #ffffff;
        padding: 24rpx;
        border-radius: 16rpx;
        &:not(:first-child) {
            margin-top: 24rpx;
        }

        .left {
            padding: 22rpx;
            background: #fff8f4;
            flex-shrink: 0;
            margin-right: 24rpx;
            align-self: center;
        }
        .right {
            display: flex;
            flex-direction: column;
            flex: 1;
            overflow: hidden;
            justify-content: space-between;
            &__title {
                height: 34rpx;
                font-size: 28rpx;
                font-weight: 500;
                color: #333333;
                line-height: 34rpx;
                @include ellipsis;
                &--isuse {
                    color: #999999;
                }
            }
            &__time {
                height: 32rpx;
                font-size: 22rpx;
                font-weight: 400;
                color: #333333;
                line-height: 32rpx;
                @include ellipsis;
                margin-top: 16rpx;
                &--isuse {
                    color: #999999;
                }
            }
            &__bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;
                &-btn {
                    width: 160rpx;
                }
            }
            &__desc {
                font-size: 22rpx;
                font-weight: 400;
                color: #333333;
                line-height: 32rpx;
                @include ellipsis(2);
                margin-top: 16rpx;
            }
        }
    }
    &-item--border {
        border-radius: 0;
        border-bottom: 1px solid #dfdfdf;
        padding: 24rpx 0;
        margin-top: 0 !important;
        &:first-child {
            margin-top: 24rpx;
        }
        &:last-of-type {
            border-bottom: none;
        }
    }
}
</style>

<template>
    <div
        v-infinite-scroll="reachBottomFn"
        :infinite-scroll-distance="20"
        :infinite-scroll-disabled="busy"
        class="grab"
    >
        <div class="grab__order">
            <div class="grab__order-header">
                <line-title
                    icon="icon-dingdanliebiao"
                    title="抢单列表"
                >
                    <div
                        v-if="showTime_"
                        class="grab__title-order"
                    >
                        <!-- <div class="grab__order-time">(抢单倒计时：
                            <count-down
                                :timestamp="balance_time"
                                @zero="zero"
                            />)
                        </div> -->

                        <!-- <div class="grab__menu">
                            <div
                                v-for="(item, index) in orderType"
                                :key="item.status"
                                class="grab__menu-item"
                                :class="orderIndex===index?'active':''"
                                @click="handleOrderType(item, index)"
                            >
                                {{ item.title }}
                            </div>
                        </div> -->
                    </div>
                </line-title>
            </div>
            <div class="grab__order-info">
                <order-list-item
                    v-for="item in pageList"
                    :key="item.order_id"
                    mode="grab"
                    :order="item"
                    class="grab__order-info-order"
                    @handleClick="handleOrder"
                />
            </div>
        </div>
        <no-data
            :show-img="noData"
            :description="lodingText"
        />
    </div>
</template>

<script>
import orderListItem from '@/components/home/order-list-item'
import listMixins from '@/mixins/list.js'
// import { Message } from 'element-ui'
export default {
    components: {
        orderListItem
    },
    mixins: [listMixins],
    layout: 'default',
    async asyncData({ $axios }) {
        const { data: orderList } = await $axios.$post('/order/getOrderList', { page: 1, limit: 10, status: 10 })
        // const { data: orderType } = await $axios.$post('/order/getOrderStatus')
        return {
            zeroOver: false,
            // orderType: orderType || [],
            pageList: orderList.list || [],
            page: 2,
            balance_time: orderList.balance_time
        }
    },
    data() {
        return {
            defaultParams: { status: 10 },
            orderIndex: 0,
            balance_time: -1,
            reqName: '/order/getOrderList'
        }
    },
    computed: {
        showTime_() {
            return this.balance_time !== -1 && this.balance_time !== 0 && !this.zeroOver
        }
    },
    // created() {
    //     this.getOrderStatus()
    // },
    methods: {
        // async getOrderStatus() {
        //     const { data } = await this.$axios.$post('/order/getOrderStatus')
        //     this.orderType = data || []
        // },
        handleOrder({ msg, data }) {
            if (msg === '立即抢单') {
                this.pickOrder(data.order_id)
            }
        },
        async pickOrder(order_id) {
            await this.$axios.$post('/order/competitionOrder', { order_id })
            this.updateOrderDetail(order_id)
        },
        async updateOrderDetail(order_id) {
            const { data } = await this.$axios.$post('/order/orderDetail', { order_id })
            this.pageList.forEach((item, index) => {
                if (item.order_id === data.order_id) {
                    this.$set(this.pageList, index, data)
                    console.log(this.pageList[index])
                }
            })
        },
        zero() {
            this.zeroOver = true
            this.$nextTick(() => {
                this.initPage()
            })
        },
        finishInit(data) {
            if (this.zeroOver) {
                this.balance_time = data.balance_time
                this.zeroOver = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.grab {
    // margin-top: 30px;
    padding-bottom: 30px;
    height: calc(100vh - 80px);
    overflow: auto;
    &__order {
        margin-top: 30px;
        &-header {
            padding: 25px 30px 20px 30px;
            border-bottom: 1px solid #d6d6d6;
            background: #ffffff;
        }
        &-time {
            font-size: 14px;
            font-weight: 400;
            color: #fa0000;
            line-height: 1em;
        }
        &-info {
            &-order {
                &:not(:first-child) {
                    margin-top: 30px;
                }
            }
        }
    }
    &__title {
        &-order {
            padding-left: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    &__menu {
        display: flex;
        align-items: center;
        margin-top: 8px;
        &-item {
            position: relative;
            font-size: 16px;
            font-weight: bold;
            color: #333333;
            line-height: 22px;
            padding: 0 30px 28px 30px;
            cursor: pointer;
            &.active {
                color: $--color-primary;
                &::after {
                    position: absolute;
                    display: block;
                    content: "";
                    width: 34px;
                    height: 3px;
                    background: $--color-primary;
                    border-radius: 2px;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }
}
</style>

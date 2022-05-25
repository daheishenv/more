<template>
    <view class="mt24">
        <view
            class="my-panel my-order"
            :style="[ outerLayer_ ]"
        >
            <c-cell
                title="我的订单"
                border
                :title-style="{ fontSize: '32rpx', fontWeight: 'bold' }"
                :cell-style="{backgroundColor: outerLayer_.backgroundColor}"
                value="查看全部"
                :value-style="{ color: '#666' }"
                arrow-color="#666"
                arrow
                @click="$jump('orderList')"
            ></c-cell>
            <view class="flex">
                <view
                    v-for="(item, index) in orderStatus"
                    :key="index"
                    class="flex-column flex-1 ptb24 flex-ajcenter"
                    @click="$jump(item.name, item.params)"
                >
                    <c-colors
                        :theme="['t']"
                        :pro="['c']"
                    >
                        <c-icons
                            size="44"
                            :type="item.icon"
                        />
                    </c-colors>
                    <view class="color-text pt12">{{ item.label }}</view>
                    <view
                        v-if="order_[item.prop]"
                        class="my-order__count"
                    >{{ order_[item.prop] }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'

export default {
    mixins: [userComponentMixins],
    data() {
        return {
            orderStatus: [{
                label: '待付款',
                icon: 'icon-daifukuan',
                name: 'orderList',
                params: {
                    menu_index: 1
                },
                prop: 'notPayCount'
            },
            {
                label: '待发货',
                icon: 'icon-daifahuo',
                name: 'orderList',
                params: {
                    menu_index: 2
                },
                prop: 'notShipCount'
            },
            {
                label: '待收货',
                icon: 'icon-daishouhuo',
                name: 'orderList',
                params: {
                    menu_index: 3
                },
                prop: 'notReceiptCount'
            },
            {
                label: '退换货',
                icon: 'icon-tuihuanhuo',
                name: 'refuseList',
                prop: 'returnCount'
            },
            {
                label: '待评价',
                icon: 'icon-daipingjia',
                name: 'myComment',
                prop: 'notAppraisalCount'
            }],
            cData: {}
        }
    },
    computed: {
        order_() {
            return {
                notPayCount: this.cData.notPayCount < 100 ? this.cData.otPayCount : '99+', // 待支付
                notReceiptCount: this.cData.notReceiptCount < 100 ? this.cData.notReceiptCount : '99+', // 待收货
                notShipCount: this.cData.notShipCount < 100 ? this.cData.notShipCount : '99+', // 待发货
                returnCount: this.cData.returnCount < 100 ? this.cData.returnCount : '99+' // 退换货
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.my-panel {
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    font-size: 24rpx;
    &.my-order {
        .flex-ajcenter {
            position: relative;

            .full {
                width: 100%;
                height: 100%;
            }
        }
        .my-order__count {
            position: absolute;
            top: 50%;
            right: 50%;
            margin: -74rpx -56rpx 0 0;
            min-width: 60rpx;
            // padding: 0 10rpx;
            height: 56rpx;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 28rpx;
            font-size: 34rpx;
            background-color: #fa3f1e;
            transform: scale(0.5);
        }
    }
    .value {
        @include flex(row);
        align-items: center;
        margin-left: auto;
        &-num {
            font-size: 28rpx;
            color: #333;
        }
    }
}
</style>

<template>
    <view class="home-scroll-goods">
        <scroll-view
            :scroll-x="true"
            :scroll-with-animation="true"
        >
            <view
                class="home-scroll-goods__item"
                v-for="(item, index) in config"
                :key="index"
                @click="handleTo(item)"
            >
                <c-image
                    radius="8"
                    size="172"
                    :src="item.goods_img"
                />
                <view class="home-scroll-goods__name c-ellipsis">{{item.goods_name}}</view>
                <view class="home-scroll-goods__price">
                    <c-image
                        v-if="item.hot"
                        class="home-scroll-goods__hot"
                        width="24"
                        :src="item.goods_img"
                        mode="widthFix"
                    />
                    <c-colors :theme="['s2']">
                        <text class="price-com">{{priceFormat_(item.price_show)}}</text>
                    </c-colors>
                </view>
                <view class="home-scroll-goods__marker-price price-com d-din">
                    <text>{{priceFormat_(item.price_market)}}</text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>
<script>
export default {
    name: 'HomeScrollGoods',
    props: {
        config: {
            type: Array,
            default() {
                return []
            }
        },
        jumpName: {
            type: String,
            default: 'goodsDetails'
        },
        mode: {
            type: String,
            default: 'normal'
        }
    },
    computed: {
        priceFormat_() {
            return (price) => {
                return this.$c.numFormat(price);
            }
        }
    },
    methods: {
        handleTo(item) {
            if (this.mode === 'seckill') {
                this.$jumpDetail(('seckillDetails'), item.goods_id, {
                    activity_id: item.id,
                    activity_type: item.activity_type
                })
                return
            } else if (this.mode === 'group') {
                this.$jumpDetail('groupDetails', item.goods_id, {
                    activity_id: item.id,
                    activity_type: item.activity_type
                })
                return
            }
            this.$jumpDetail((this.jumpName), item.id)
        }
    }
}
</script>
<style lang="scss" scoped>
.home-scroll-goods {
    white-space: nowrap;
    font-size: 0;
    padding-top: 30rpx;
    // padding: 12rpx;
    padding-top: 12rpx;
    padding-left: 12rpx;
    padding-bottom: 12rpx;

    &__item {
        padding: 12rpx;
        position: relative;
        width: 194rpx;
        display: inline-block;
        vertical-align: top;
    }

    &__price {
        margin-top: 16rpx;
        line-height: 30rpx;
        height: 30rpx;
        .price-com {
            font-size: 30rpx;
        }
    }

    &__hot {
        margin-right: 8rpx;
    }

    &__marker-price {
        font-size: 24rpx;
        color: #999999;
        text-decoration: line-through;
        margin-top: 8rpx;
        &::before {
            font-size: 24rpx;
            bottom: 0;
        }
    }

    &__name {
        margin-top: 16rpx;
        height: 34rpx;
        font-size: 24rpx;
        line-height: 34rpx;
        color: #333;
        width: 100%;
    }
}
</style>

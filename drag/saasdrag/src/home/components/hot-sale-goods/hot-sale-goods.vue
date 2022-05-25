<template>
    <view :style="[outerLayer_]">
        <view :style="[titleLayer_]">
            <sub-home-module-title
                :full="config.isFull"
                :title="config.title"
                :sub-title="config.sub_title"
                :title-layer="titleLayer_"
                :more="isMore_ ? '' : ''"
            />
        </view>
        <view class="home-hot-sale-goods">
            <view
                :style="[innerLayer_]"
                class="ptb24 pl24"
            >
                <scroll-view
                    v-if="cData && cData.list"
                    :scroll-x="true"
                    :scroll-with-animation="true"
                >
                    <view
                        v-for="(item, index) in cData.list"
                        :key="index"
                        class="home-hot-sale-goods__item"
                        @click="handleTo(item)"
                    >
                        <c-image
                            class="home-hot-sale-goods__image"
                            radius="8"
                            size="154"
                            :src="item.goods_img"
                        />
                        <c-image
                            class="home-hot-sale-goods__top"
                            width="98"
                            height="46"
                            src="platform/home/jinbang.png"
                        ></c-image>
                        <c-image
                            class="home-hot-sale-goods__bg"
                            width="200"
                            height="296"
                            src="platform/home/hot-sale-bg.png"
                        ></c-image>
                        <view class="home-hot-sale-goods__name c-ellipsis">{{ item.goods_name }}</view>
                        <view class="home-hot-sale-goods__price">
                            <c-colors :theme="['#fff']">
                                <text class="price-com">{{ priceFormat_(item.price_show) }}</text>
                            </c-colors>
                        </view>

                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HotSaleGoods',
    mixins: [homeComponentMixins],
    computed: {
        priceFormat_() {
            return (price) => {
                return this.$c.numFormat(price)
            }
        }
    },
    methods: {
        handleTo(item) {
            this.$jumpDetail('goodsDetails', item.id)
        }
    }
}
</script>
<style lang="scss" scoped>
.home-hot-sale-goods {
    background-size: cover !important;
    white-space: nowrap;
    // padding: 24rpx 0 24rpx 12rpx;
    // padding-left: 24rpx;

    &__item {
        margin-right: 24rpx;
        position: relative;
        width: 200rpx;
        height: 296rpx;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        background-color: inherit;
        padding-top: 34rpx;
        border-radius: 8rpx;
        overflow: hidden;
    }
    &__image {
        z-index: 3;
    }
    &__top {
        @include abs(0, 50%, null, 0);
        transform: translate(50%, 0);
        z-index: 3;
    }
    &__bg {
        @include abs(null, 0, 0, 0);
    }
    &__name {
        color: #333;
        width: 100%;
        text-align: center;
        padding: 0 12rpx;
        margin-top: 24rpx;
        z-index: 10;
        font-size: 24rpx;
        font-weight: bold;
        color: #4d2702;
        line-height: 33rpx;
    }
    &__price {
        margin-top: 6rpx;
        background-color: #a4784d;
        height: 34rpx;
        z-index: 10;
        padding: 0 8rpx;
        border-radius: 22rpx;
        display: flex;
        align-items: center;
        .price-com {
            font-size: 28rpx;
            font-family: 'd-din';
            &::before {
                bottom: 0;
            }
        }
    }
}
</style>

<template>
    <view
        class="home-custom-service"
        :style="[outerLayer_]"
    >

        <view :style="[titleLayer_]">
            <sub-home-module-title
                :title="config.title"
                :full="config.isFull"
                :title-layer="titleLayer_"
                :more="isMore_ ? 'hotSelling' : ''"
            />
        </view>
        <view class="ptb24">
            <view
                v-if="cData && cData.list"
                class="c-row home-custom-service__content"
                :style="[innerLayer_]"
            >
                <view
                    v-for="item in cData.list"
                    :key="item.id"
                    class="home-custom-service__item c-col-4"
                    @click="handleItem(item.id)"
                >
                    <view class="home-custom-service__image">
                        <view class="home-custom-service__image-tag">热门爆款</view>
                        <c-image
                            radius="8"
                            size="206"
                            :src="item.goods_img"
                        />
                    </view>
                    <view class="home-custom-service__name c-ellipsis">{{ item.goods_name }}</view>
                    <view class="home-custom-service__price">
                        <c-colors :theme="['s2']">
                            <text class="price-com">{{ priceFormat_(item.price_show) }}</text>
                        </c-colors>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'CustomService',
    mixins: [homeComponentMixins],
    computed: {
        priceFormat_() {
            return (price) => {
                return this.$c.numFormat(price)
            }
        }
    },
    methods: {
        handleItem(id) {
            this.$jumpDetail('goodsDetails', id)
        }
    }
}
</script>

<style lang="scss">
.home-custom-service {
    background-size: cover !important;
    // &__item {
    //     margin: 12rpx;
    //     width: 206rpx;
    //     height: 318rpx;
    // }
    &__content{
        background-color: #fff;
        border-radius: 8rpx;
        max-height: 678rpx;
        overflow: hidden;
    }
    &__image{
        position: relative;
        border-radius: 8rpx;
        overflow: hidden;
        &-tag{
            @include abs(0, null, 0, 0);
            z-index: 2;
            padding: 0 4rpx;
            height: 36rpx;
            line-height: 36rpx;
            font-size: 20rpx;
            color: #FFFFFF;
            border-radius: 16rpx 0 16rpx 0;
            background-color: rgba(255, 0, 0, .65);
        }
    }
    &__name {
        margin-top: 20rpx;
        font-size: 26rpx;
        font-weight: bold;
        color: #333333;
    }
    &__price {
        margin-top: 12rpx;
        .price-com {
            font-size: 30rpx;
        }
    }
}
</style>

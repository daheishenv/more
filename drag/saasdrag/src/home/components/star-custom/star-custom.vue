<template>
    <view class="home-star-custom">
        <view class="custom-wrap">
            <view
                v-for="(item, index) in list"
                :key="index"
                class="custom"
            >
                <view class="custom-title pl24 c-ellipsis"> {{ item.made_name }} </view>
                <view class="custom-subtitle pl24 c-ellipsis">{{ item.sub_title }}</view>
                <view class="plr24 mt24">
                    <c-image
                        :src="item.img"
                        mode=""
                        width="100%"
                        height="420"
                        radius="8"
                    ></c-image>
                </view>
                <view
                    v-if="item.goods_list.length > 0"
                    class="custom-goods"
                >
                    <scroll-view
                        :scroll-x="true"
                        :scroll-with-animation="true"
                    >
                        <view
                            v-for="(val,idx) in item.goods_list"
                            :key="idx"
                            class="custom-goods__item"
                            @click="$jumpDetail('goodsDetails', val.id)"
                        >
                            <c-image
                                :src="val.goods_img"
                                mode=""
                                width="100%"
                                height="192"
                            ></c-image>
                            <view class="custom-goods__desc">
                                <view class="custom-goods__title c-ellipsis">{{ val.goods_name }}</view>
                                <view class="custom-goods__price">
                                    <c-colors :theme="['s2']">
                                        <text class="custom-goods__com">¥{{ priceFormat_(val.price_show) }}</text>
                                    </c-colors>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'HomeStarCustom',
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: {
        priceFormat_() {
            return (price) => {
                return this.$c.numFormat(price)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home-star-custom {
    .custom-wrap {
        .custom {
            padding-bottom: 8rpx;
            &-title {
                font-size: 28rpx;
                font-weight: bold;
                color: #333333;
                line-height: 40rpx;
            }
            &-subtitle {
                font-size: 24rpx;
                color: #999999;
                line-height: 33rpx;
                padding-top: 6rpx;
            }
            &-goods {
                padding: 24rpx;
                white-space: nowrap;
                &__item {
                    box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(226, 226, 226, 0.33);
                    border-radius: 8rpx;
                    overflow: hidden;
                    border: 1px solid #f2f2f2;
                    background: #fff;
                    width: 192rpx;
                    display: inline-block;
                    margin-left: 24rpx;
                    &:nth-child(1) {
                        margin-left: 0;
                    }
                }
                &__desc {
                    padding: 24rpx 16rpx;
                }
                &__title {
                    font-size: 24rpx;
                    color: #333333;
                    line-height: 32rpx;
                }
                &__price {
                    padding-top: 10rpx;
                    line-height: 30rpx;
                }
                &__com {
                    font-size: 28rpx;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>

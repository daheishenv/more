<template>
    <view
        class="home-new-gift-pack"
        :style="[ outerLayer_ ]"
    >
        <view
            class="home-new-gift-pack-bd c-row"
            v-if="!noData_ && cFinish"
        >
            <view
                class="home-new-gift-pack__left"
                @click="$jump('newGift')"
            >
                <c-image
                    :src="cData.cover_img_url"
                    :radius="innerLayer_.borderRadius"
                    width="218"
                    height="254"
                    mode="aspectFill"
                />
            </view>
            <view class="flex-1">
                <view
                    class="home-new-gift-pack__right"
                    :style="[innerLayer_]"
                >
                    <view
                        class="title"
                        :class="[ !cData.title ? 'bright-card' : '' ]"
                    >
                        {{cData.title}}
                        <view v-if="cData.sub_title"><text class="plr12">|</text>{{ cData.sub_title }}</view>
                    </view>
                    <view class="c-row pb0 goods-box">
                        <view
                            class="c-col-4 ptb0"
                            v-for="(item, i) in cData.goods"
                            :key="i"
                            @click="$jumpDetail('goodsDetails', item.goods_id, {activity_type: item.activity_type,activity_id: item.id})"
                        >
                            <view class="flex-ajcenter">
                                <c-image
                                    size="116"
                                    radius="8"
                                    :src="item.goods_img"
                                    mode="aspectFill"
                                />
                            </view>
                            <view
                                class="goods-name"
                                :class="[ !item.goods_name ? 'bright-card' : '' ]"
                            >
                                <text>{{item.goods_name}}</text>
                            </view>
                            <view
                                class="goods-box__bottom"
                                :class="[ !item.price_show ? 'bright-card' : '' ]"
                            >
                                <view
                                    class="goods-label"
                                    v-if="item.goods_label"
                                >
                                    <text>{{item.goods_label}}</text>
                                </view>
                                <view class="goods-price">
                                    <text
                                        class="price-com"
                                        v-if="item.price_show"
                                    >{{item.price_show}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[outerLayer_]"
        >
            <c-image
                :src="`skeleton-screen/${config.module}_${mode_}.png`"
                width="100%"
                mode="widthFix"
            />
        </view>
    </view>
</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins';
// 首页新人专享组件
export default {
    name: 'home-new-gift-pack',
    mixins: [homeComponentMixins]
}
</script>
<style lang="scss" scoped>
.home-new-gift-pack {
    &-bd {
        @include flex(row);
        justify-content: space-between;
        padding: 0;
    }

    &__right {
        padding-top: 12rpx;
        border-radius: 16rpx;
        height: 254rpx;

        .title {
            height: 32rpx;
            color: #ed3b2b;
            font-size: 24rpx;
            margin: 0 24rpx;
            @include flex(row);
        }

        .goods {
            &-box {
                &__bottom {
                    @include flex(row);
                    align-items: center;
                    transform: scale(0.5);
                    transform-origin: 0 0;
                    width: 200%;
                    height: 44rpx;
                }
            }

            &-name {
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 20rpx;
                color: #333;
                line-height: 28rpx;
                height: 28rpx;
                margin: 8rpx 0;
            }

            &-label {
                border-radius: 22rpx 22rpx 0px 22rpx;
                background-color: #ed3b2b;
                font-size: 28rpx;
                color: #fff;
                line-height: 44rpx;
                height: 44rpx;
                padding: 0 12rpx;
                white-space: nowrap;
            }

            &-price {
                color: #ed3b2b;
                font-size: 44rpx;
                padding-left: 6rpx;
                display: flex;
                align-items: center;

                .price-com {
                    font-size: inherit;

                    &::before {
                        bottom: 0;
                        font-size: inherit;
                    }
                }
            }
        }
    }
}
</style>

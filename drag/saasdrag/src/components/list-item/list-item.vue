<template>
    <view
        class="gc-list-item"
        :class="[
        'gc-list-item--' + itemObj.mode,
        'gc-list-item--' + itemObj.type,
        itemObj.waterfall ? 'gc-list-item--waterfall' : '',
		itemObj.border ? 'c-underline' : '',
		itemData._checked ? 'gc-list-item--active' : ''
    ]"
        :style="[ itemObj.itemStyle ]"
    >
        <view
            class="gc-list-item-hd flex-ajcenter"
            :style="[ itemObj.imgStyle ]"
        >
            <!-- 热销爆品的角标 -->
            <view
                class="gc-list-item__badge"
                v-if="itemObj.type === 'hotSelling' && itemObj.index <= 2"
            >
                <c-image
                    class="gc-list-item__badge--image"
                    width="120"
                    height="132"
                    :src="`goods/hot-top-${itemObj.index + 1}@2x.png`"
                ></c-image>
                <text>TOP</text>
                <text>{{ itemObj.index + 1 }}</text>
            </view>
            <!-- 新人专享的角标 -->
            <view
                class="gc-list-item__badge"
                v-if="itemObj.type === 'giftPack'"
            >{{ itemObj.index + 1 }}</view>
            <!-- 商品图 -->
            <c-image
                :src="itemData[itemObj.imgKey]"
                :width="itemObj.imgStyle.width"
                :height="imgHeight_"
                :radius="itemObj.imgStyle.borderRadius"
            />
        </view>
        <view class="gc-list-item-bd">

            <!-- 商品标题 -->
            <view
                class="gc-list-item-title"
                :style="[ itemObj.titleStyle ]"
                :class="[ itemObj.titleClass ]"
            >
                <template v-if="itemData.goods_tags && itemData.goods_tags.length">
                    <view
                        class="gc-list-item-tag"
                        v-for="tag in itemData.goods_tags"
                        :key="tag.goods_tags"
                    >
                        <c-colors
                            :theme="['s2', '#fff']"
                            :pro="['bgc', 'c']"
                            radius="4"
                        >
                            <text class="gc-list-item-tag__text">{{tag.tag_name}}</text>
                        </c-colors>
                    </view>
                </template>
                {{itemData[itemObj.titleKey]}}
            </view>

            <!-- 正常产品列表 -->
            <view
                v-if="itemObj.type === 'normal' || itemObj.type === 'weiyvLike'"
                class="gc-list-item__desc"
            >
                <view class="flex-ajcenter">
                    <view class="flex-1">
                        <c-colors :theme="['s2']">
                            <view class="price-com">{{itemData.price_show}}</view>
                        </c-colors>
                        <view class="price-com price-com__market d-din">{{itemData.price_market}}</view>
                    </view>
                    <view v-if="itemObj.showShoppingCart && !itemData.api_url && itemData.price_market">
                        <c-colors
                            :theme="['t']"
                            :pro="['bgc']"
                            class="gc-list-item__shopcard"
                            radius="50"
                        >
                            <view
                                @click.stop="handleAddShoppingCar(itemData)"
                                class="gc-list-item__shopcard-box"
                            >
                                <c-icons
                                    color="#fff"
                                    type="icon-gouwuche1"
                                    size="29"
                                ></c-icons>
                            </view>
                        </c-colors>
                    </view>
                </view>
            </view>

            <!-- 拼团列表 -->
            <block v-if="itemObj.type === 'group' || itemObj.type === 'groupDetails'">
                <view class="gc-list-item-num flex justify-between">
                    <view class="flex-1">
                        <text>已拼{{itemData.sales}}件</text>
                        <text class="pl24">{{itemData.joint_quantity}}人团</text>
                    </view>
                    <view class="flex-1 flex justify-end">
                        <block v-if="itemData[itemObj.userImgKey]">
                            <view
                                class="group-imgs"
                                v-for="(e, i) in itemData[itemObj.userImgKey]"
                                :key="i"
                            >
                                <c-image
                                    class="group-imgs__img"
                                    size="32"
                                    radius="16"
                                    :src="e"
                                ></c-image>
                            </view>
                        </block>
                    </view>
                </view>
                <view class="gc-list-item__desc group-info">
                    <c-colors :theme="['#fa3d23']">
                        <view class="price-com">
                            <block v-if="itemObj.type === 'groupDetails' && saleSet_">
                                {{ priceSale_ }}
                                <text class="price-com__samll">(￥{{ priceShow_ }}{{ priceShowUnit_ }})</text>
                            </block>
                            <block v-else>
                                {{ priceShow_ }}
                            </block>
                            <text
                                v-if="itemObj.type === 'group'"
                                class="price-com price-com__market d-din"
                            >{{priceMarket_}}</text>
                        </view>
                    </c-colors>
                    <view
                        class="btn-buy-box"
                        v-if="itemObj.type === 'group'"
                    >
                        <c-colors
                            :theme="['#fff', '#fa3d23']"
                            :pro="['c', 'bgc']"
                            radius="8"
                        >
                            <c-button
                                width="150"
                                size="mini"
                            >我要开团</c-button>
                        </c-colors>
                    </view>
                </view>
            </block>

            <!-- 秒杀列表 -->
            <block v-if="itemObj.type === 'seckill'">
                <view class="gc-list-item-num c-ellipsis">{{itemData.goods_name}}</view>
                <view class="gc-list-item__desc seckill-info">
                    <c-colors :theme="['#fa3d23']">
                        <view class="price-com">{{itemData.price_show}}</view>
                    </c-colors>
                    <view class="price-com price-com__market d-din">{{priceMarket_}}</view>
                    <view class="btn-buy-box">
                        <c-colors
                            :theme="['#fff', '#fa3d23']"
                            :pro="['c', 'bgc']"
                            radius="8"
                        >
                            <c-button
                                width="150"
                                size="mini"
                            >{{itemData.status_txt}}</c-button>
                        </c-colors>
                    </view>
                </view>
            </block>

            <!-- 积分商品兑换 -->
            <view
                v-if="itemObj.type === 'integral'"
                class="gc-list-item__desc"
            >
                <c-colors :theme="['s2']">
                    <view class="flex align-center">
                        <c-image
                            :src="'integral/gold-coin.png'"
                            size="32"
                        ></c-image>
                        <text class="integral-text d-din-bold">
                            {{itemData.credit}}</text>
                        <view class="price-com integral-price__market gc-list-item-num--del">
                            {{priceMarket_}}
                        </view>
                    </view>
                </c-colors>
            </view>

            <!-- 新人福利 -->
            <view
                v-else-if="itemObj.type === 'giftPack'"
                class="gc-list-item__desc"
            >
                <view class="flex">
                    <c-colors :theme="['s2']">
                        <view class="price-com">{{itemData.price_show}}</view>
                    </c-colors>
                    <view class="price-com price-com__market d-din">{{itemData.price_market}}</view>
                </view>
                <!-- <view class="price-com">{{itemData.price_show}}</view> -->
                <view class="gc-list-item-num">已有{{itemData.virtual_sales}}人领取</view>
                <view class="btn-buy-box">
                    <c-colors
                        :theme="['#fff','#FA3F1E']"
                        :pro="['c', 'bgc']"
                        radius="8"
                    >
                        <c-button
                            width="250"
                            size="mini"
                        >立即购买</c-button>
                    </c-colors>
                </view>
            </view>

            <!-- 套餐包列表 -->
            <view
                v-if="itemObj.type === 'setMeal'"
                class="gc-list-item__desc"
            >
                <view class="price-com">{{itemData.package_total_price}}</view>
                <view class="gc-list-item-num">已售{{itemData.virtual_sales_volume}}件</view>
            </view>

            <!-- 热销爆款 -->
            <view
                v-if="itemObj.type === 'hotSelling'"
                class="gc-list-item__desc"
            >
                <view class="price-com">{{priceShow_}}</view>
                <view class="gc-list-item-num gc-list-item-num--del">
                    ¥{{priceMarket_}}
                </view>
                <view class="btn-buy-box">
                    <c-colors
                        :theme="['#fff', 't']"
                        :pro="['c', 'bgc']"
                        radius="8"
                    >
                        <c-button
                            width="120"
                            size="mini"
                        >去抢购</c-button>
                    </c-colors>
                </view>
            </view>

            <!-- 案例列表 -->
            <view
                v-if="itemObj.type === 'case'"
                class="gc-list-item__desc"
            >
                <view class="gc-list-item__case--type">
                    <text>{{ itemData.roomAndArea ? (itemData.roomAndArea + ' | ') : ''}}{{ itemData.style }}</text>
                </view>
                <view
                    class="gc-list-item__case--type  gc-list-item__case_label mt12"
                    v-if="itemData.price"
                >
                    <text>造价：</text>{{ itemData.price }}元
                </view>
                <view
                    class="gc-list-item__case--type  gc-list-item__case_label mt12"
                    v-if="itemData.housing_estate.name"
                >
                    <text>小区：</text>{{ itemData.housing_estate.name }}
                </view>
            </view>

            <!-- 攻略列表 -->
            <view
                v-if="itemObj.type === 'decoration'"
                class="gc-list-item__desc"
            >
                <view class="gc-list-item__case--type  gc-list-item__case_label mt12">
                    <text>浏览量:{{itemData.view_num || 0}}</text>
                    <!-- <text class="pl24">获客数:{{ itemData.virtual_win_user_num || 0}}</text> -->
                    <text
                        class="pl24"
                        v-if="itemData.read_text"
                    >{{ itemData.read_text }}</text>
                </view>
            </view>

            <!-- 获客推荐商品列表 -->
            <view
                v-if="itemObj.type === 'customer'"
                class="gc-list-item__desc"
            >
                <view class="flex">
                    <c-colors :theme="['s2']">
                        <view class="price-com">{{itemData.price_show}}</view>
                    </c-colors>
                </view>
                <view class="price-com price-com__market d-din customer_market">
                    {{itemData.price_market}}
                </view>
                <view
                    class="customer_share tr"
                    @click.stop="handleShare(itemData)"
                >分享</view>
            </view>

        </view>
    </view>
</template>

<script>
export default {
    name: 'gc-list-item',
    options: {
        styleIsolation: 'shared',
    },
    computed: {
        priceShow_() {
            return this.$c.numFormat(this.itemData.price_show);
        },
        priceMarket_() {
            return this.$c.numFormat(this.itemData.price_market);
        },
        priceShowUnit_() {
            let {
                goods_piece_ratio = {}
            } = this.itemData
            return goods_piece_ratio ? goods_piece_ratio.price_show_unit : ''
        },
        priceSale_() {
            let {
                goods_piece_ratio = {}
            } = this.itemData;
            return goods_piece_ratio ? this.$c.numFormat(Number(goods_piece_ratio.price_sale).toFixed(2)) : ''
        },
        saleSet_() {
            let {
                goods_piece_ratio,
                sale_set
            } = this.itemData
            return sale_set === 1 && goods_piece_ratio
        },
        imgHeight_() {
            const { img_width, img_height, waterfall } = this.itemData
            const { imgStyle: {
                width, height
            } } = this.itemObj
            if (this.mode === 'row' && waterfall) {
                if (img_width === img_height) return width
                return img_width / parseInt(width) * img_height
            }
            return height
        }
    },
    props: {
        itemData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        itemObj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    methods: {
        handleShare(item) {
            this.$emit("share", {
                detail: {
                    value: item
                }
            })
        },
        // 加入购物车
        handleAddShoppingCar(e) {
            console.log(e);
            this.$emit("addShopCar", {
                detail: e
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.gc-list-item {
    background: #ffffff;
    height: 100%;
    display: flex;
    flex-direction: column;

    .price-com__samll {
        font-size: 80%;
    }

    .price-com__market {
        margin-left: 4rpx;
        margin-bottom: 4rpx;
        font-size: 80%;
        color: #999;
        text-decoration: line-through;

        &::before {
            font-size: 88%;
        }
    }

    &--decoration {
        .gc-list-item-bd {
            line-height: 1.2;
        }
    }

    &__badge {
        @include abs(12rpx, null, null, 36rpx);
        width: 120rpx;
        height: 132rpx;
        z-index: 2;
        @include flex(column);
        justify-content: center;
        align-items: center;
        line-height: 44rpx;
        font-size: 40rpx;
        transform: scale(0.5);
        transform-origin: 0 0;
        color: #fff;

        &--image {
            @include abs(0, 0, 0, 0);
        }

        text {
            position: relative;
            z-index: 2;
        }
    }

    &-hd {
        overflow: hidden;
        display: block;
        margin: 0 auto;
    }

    &-bd {
        padding: 2 * $spacing-col-sm 2 * $spacing-row-sm $spacing-col-lg;
        line-height: 1.5;
        position: relative;
    }

    .group-imgs {
        &__img {
            float: left;
            margin-left: -16rpx;
            position: relative;
        }
    }

    &__desc {
        margin-top: 16rpx;
        line-height: 1;
        position: relative;
        @include flex(row);
        justify-content: space-between;
        align-content: center;

        .customer_market {
            padding-top: 8rpx;
        }

        .flex-ajcenter {
            width: 100%;
        }

        .customer_share {
            position: absolute;
            text-align: center;
            font-size: 24rpx;
            right: 0;
            bottom: 0;
            width: 104rpx;
            height: 56rpx;
            line-height: 56rpx;
            background: #f5f5f5;
            border-radius: 28rpx;
        }
    }

    .integral-price__market {
        margin-bottom: -4rpx;
        font-size: 24rpx;
        color: #ccc;
    }

    .integral-price__market::before {
        bottom: 0;
    }

    .integral-text {
        padding-left: 8rpx;
        font-size: 40rpx;
    }

    &-num {
        font-size: 24rpx;
        margin-top: 8rpx;
        font-weight: 400;
        color: #999999;
        line-height: 28rpx;

        &--del {
            text-decoration: line-through;
        }
    }

    &-title {
        font-size: 28rpx;
        color: #333333;
        word-break: break-all;
    }

    &--tag {
        margin-right: 6rpx;
        font-size: 22rpx;
        font-weight: 400;
        // color: #FFFFFF;
        display: inline-block;
        line-height: 32rpx;
        vertical-align: revert;
        padding: 0 10rpx;
        // background: linear-gradient(90deg, #EB3819 0%, #F0590B 100%);
        border-radius: 4rpx;
        margin-top: 6rpx;
    }

    .btn-buy-box {
        @include abs(null, 0, 0);
    }

    &__shopcard {
        &-box {
            width: 50rpx;
            height: 50rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    &-tag {
        margin-right: 6rpx;
        font-size: 22rpx;
        font-weight: 400;
        display: inline-block;
        vertical-align: middle;
        line-height: 32rpx;
        border-radius: 4rpx;

        &__text {
            padding: 0 10rpx;
        }
    }

    &__case--type {
        font-size: 24rpx;
        color: #43548f;
        line-height: 34rpx;

        &.gc-list-item__case_label {
            color: #333333;

            text {
                color: #999999;
            }
        }
    }

    &--row {
        padding: 24rpx;
        flex-direction: row;

        .gc-list-item-bd {
            flex: 1;
            width: 50%;
            padding: 0;
            padding-left: 24rpx;
        }
        .gc-list-item__desc {
            @include abs(null, 0, 0, 0);
            padding-left: 24rpx;
            @include flex;
        }
    }

    &--giftPack {
        padding: 0;

        .gc-list-item-bd {
            padding: $spacing-col-lg $spacing-row-base * 2;
        }
        .gc-list-item__desc {
            @include abs(null, null, $spacing-col-lg, 24rpx);
            @include flex;
            align-items: flex-start;

            .btn-buy-box {
                right: auto;
                margin-top: $spacing-col-lg / 3 * 2;
                position: relative;
            }
        }

        .gc-list-item__badge {
            @include abs(12rpx, null, null, 36rpx);
            transform: scale(1);
            z-index: 2;
            width: 56rpx;
            height: 66rpx;
            color: #fff;
            background: linear-gradient(180deg, #f17a42 0%, #ec5049 100%);
            border-radius: 0px 0px 100rpx 100rpx;
            @include flex;
            justify-content: center;
            align-items: center;
        }
    }

    &--group {
        padding: 24rpx;
    }

    &--weiyvLike {
        box-shadow: 0rpx 2rpx 10rpx 2rpx rgba(228, 228, 228, 0.33);
        .gc-list-item-bd {
            padding: 0 $spacing-row-lg;
        }
    }
}
</style>

<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-package"
            :style="[outerLayer_]"
        >
            <view :style="[titleLayer_]">
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    :more="isMore_ ? 'packageList' : ''"
                />
            </view>
            <view
                class="home-package-bd"
                :style="[innerLayer_]"
            >
                <scroll-view
                    :scroll-x="true"
                    :scroll-with-animation="true"
                >
                    <view
                        class="home-package-list ptb24"
                        :class="{'home-package-list--full' : !hasMore_}"
                    >
                        <view class="pl24">
                            <view
                                v-for="(item, index) in cData.list"
                                :key="index"
                                class="home-package-item pr24"
                            >
                                <view
                                    class="home-package-item__box"
                                    @tap="$jumpDetail('packageDetails', item.id)"
                                >
                                    <!-- :style="`borderRadius: ${outerLayer_.borderRadius}`" -->
                                    <c-image
                                        width="100%"
                                        :height="400"
                                        :src="item.image"
                                        mode="aspectFill"
                                    />
                                    <view class="home-package-item__bottom">
                                        <view
                                            class="home-package-name"
                                            :class="[!item.name ? 'bright-card' : '']"
                                        >
                                            <text>{{ item.name }}</text>
                                        </view>
                                        <view
                                            class="home-package-price"
                                            :class="[!item.package_total_min_price ? 'bright-card' : '']"
                                        >
                                            <c-colors :theme="['s2']">
                                                <view class="price-com price-com-sub-text" :data-price_prefix="pricePrefix_">{{ item.package_total_min_price }}</view>
                                            </c-colors>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[outerLayer_, innerLayer_]"
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
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页新人专享组件
export default {
    name: 'HomePackage',
    mixins: [homeComponentMixins],
    computed: {
        hasMore_() {
            return this.cData && this.cData.list && this.cData.list.length > 1
        },
        imgHeight_() {
            return this.hasMore_ ? '400' : (this.config.isFull ? '750' : '654')
        }
    }
}
</script>

<style lang="scss" scoped>
.home-package {
    .mr12 {
        margin-right: -24rpx !important;
    }
    &-list {
        white-space: nowrap;

        &--full {
            .home-package-item,
            .home-package-item__box {
                width: 100%;
            }
        }
    }

    &-item {
        display: inline-block;
        // padding-right: 24rpx;

        &__box {
            border-radius: 16rpx;
            width: 400rpx;
            background: #fff;
            overflow: hidden;
            box-shadow: 0 0 6rpx $bg-color;
        }

        &__bottom {
            padding: 24rpx;
        }
    }

    &-name {
        line-height: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 32rpx;
        color: #333;
        white-space: nowrap;
        font-size: 32rpx;
        font-weight: bold;

        .hot {
            display: inline-block;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            color: #fff;
            background: #fa3f1e;
            border-radius: 4rpx;
            padding: 0 7rpx;
            margin-right: 6rpx;
        }
    }

    &-price {
        margin-top: 32rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40rpx;

        .price-com {
            &::before {
                font-size: 24rpx;
            }
        }

        .price-com-sub-text {
            &::after {
                content: '起';
                position: relative;
                right: -4rpx;
                z-index: 1;
                font-size: 65%;
                font-family: inherit;
                bottom: 4rpx;
                color: inherit;
            }
        }
    }
}
</style>

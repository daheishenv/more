<template>
    <view
        v-if="!noData_"
        class="home-market-shops"
        :style="[outerLayer_]"
    >
        <view
            :style="[titleLayer_]"
            style="padding: 0 12px"
        >
            <sub-home-module-title
                :title="config.title"
                :more="isMore_ ? 'shopList': ''"
            />
        </view>
        <view
            v-if="!noData_ && cFinish"
            class="home-market-shops-bd"
            :style="[ innerLayer_ ]"
        >
            <view class="shops-wrap">
                <view class="shops">
                    <view
                        v-for="(item, index) in cData"
                        :key="index"
                        class="shops-item"
                        @tap="$jumpDetail('shopDetail',item.id)"
                    >
                        <c-image
                            :src="item.store_logo"
                            width="136"
                            height="136"
                        ></c-image>
                        <view class="shops-item-text c-ellipsis">{{ item.store_name }}</view>
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
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HomeMarketShops',
    mixins: [homeComponentMixins]
}
</script>

<style lang="scss" scoped>
.home-market-shops {
    &-bd {
        background-color: #fff;
        overflow: hidden;
    }
    .shops-wrap {
        .shops {
            box-shadow: 0rpx 8rpx 50rpx -16rpx rgba(0, 0, 0, 0.1);
            @include flex(row);
            flex-wrap: wrap;
            &-item {
                width: 33.333333%;
                border-right: 1px solid #f4f4f4;
                border-bottom: 1px solid #f4f4f4;
                padding: 32rpx 0 40rpx;
                @include flex(column);
                align-items: center;
                justify-content: space-between;
                &-text {
                    padding-top: 24rpx;
                    line-height: 32rpx;
                    font-size: 24rpx;
                    color: #333;
                    max-width: 180rpx;
                }
                &:nth-child(3n) {
                    border-right: none;
                }
            }
        }
    }
}
</style>

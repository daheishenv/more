<template>
    <view
        class="home-tetragonal-grid"
        :style="[outerLayer_]"
    >
        <view
            v-if="!noData_ && cFinish && cData.length > 0"
            class="home-tetragonal-grid-bd c-row"
        >
            <view
                v-for="(item, i) in cData"
                :key="i"
                class="c-col-6"
            >
                <view
                    class="item"
                    :style="[ innerLayer_ ]"
                    @tap="$serverJump(item)"
                >
                    <view class="name">
                        <text>{{ item.title }}</text>
                    </view>
                    <view class="summary">
                        <view class="text">
                            <text :style="{color: item.color}">{{ item.subTitle }}</text>
                        </view>
                        <c-colors
                            :theme="['t']"
                            :pro="['c', 'bdc', 'bgc']"
                            radius="16"
                        >
                            <view class="go">GO</view>
                        </c-colors>
                    </view>
                    <view class="goods">
                        <view
                            v-for="(img, gi) in item.img"
                            :key="gi"
                            class="img"
                        >
                            <c-image
                                size="136"
                                :src="img"
                            />
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <c-no-data
            v-if="noData_ && cFinish && cData.length > 0"
            :text="noDataText_"
        />
    </view>
</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HomeTetragonalGrid',
    mixins: [homeComponentMixins]
}
</script>
<style lang="scss" scoped>
.home-tetragonal-grid {
    &-bd {
        margin: -24rpx;
    }

    .item {
        border-radius: 16rpx;
        background-color: #fff;
        padding: 24rpx;

        .name {
            font-size: 28rpx;
            color: #333;
            line-height: 40rpx;
            font-weight: bold;
        }

        .summary {
            line-height: 34rpx;
            color: #333;
            font-size: 24rpx;
            padding-top: 4rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .go {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70rpx;
                height: 28rpx;
                color: inherit;
                border-radius: 16rpx;
                background-color: #fff;
                font-size: 24rpx;
                border: 1px solid;

                &::after {
                    content: '';
                    border: solid 8rpx transparent;
                    border-left-color: inherit;
                    position: relative;
                    top: 1rpx;
                    left: 6rpx;
                }
            }
        }

        .goods {
            display: flex;
            justify-content: space-between;
            padding-top: 24rpx;
        }
    }
}
</style>

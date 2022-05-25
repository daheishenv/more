<template>
    <view class="home-construction-team-list ptb24">
        <view class="pl24">
            <view
                v-for="(item, index) in list"
                :key="index"
                class="home-construction-team-item"
            >
                <view
                    class="home-construction-team-item__bd"
                    :style="[itemStyle]"
                    @click="$jumpDetail('workerDetails', item.id)"
                >
                    <c-image
                        :width="imgWidth"
                        :height="imgHeight"
                        :radius="imgRadius"
                        :src="item.head_img_url_oss"
                        mode="aspectFill"
                    />
                    <view class="home-construction-team-item__text">
                        <view class="home-construction-team-item__name c-ellipsis">{{ item.username }}</view>
                        <view class="home-construction-team-item__year">从业{{ item.year }}年</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

export default {
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        imgWidth: {
            type: [String, Number],
            default: 96
        },
        imgHeight: {
            type: [String, Number],
            default: 96
        },
        imgRadius: {
            type: [String, Number],
            default: 48
        },
        itemStyle: {
            type: Object,
            default: () => { }
        },
        paddingRight: {
            type: [Object],
            default: () => { }
        }
    }
}
</script>

<style lang="scss">
.home-construction-team {
    &-list {
        white-space: nowrap;
    }

    &-item {
        display: inline-block;
        padding-right: 24rpx;

        &__bd {
            background-color: #fff;
            width: 188rpx;
            overflow: hidden;
            position: relative;
            @include flex;
            align-items: center;
        }

        &__text {
            padding: 2 * $spacing-col-base 2 * $spacing-row-base;
            width: 100%;
        }

        &__name {
            width: 100%;
            font-size: 28rpx;
            color: #333333;
            line-height: 28rpx;
            text-align: center;
        }

        &__year {
            margin-top: 10rpx;
            font-size: 22rpx;
            color: #999;
            margin-top: 10rpx;
            line-height: 28rpx;
            text-align: center;
        }
    }
}
</style>

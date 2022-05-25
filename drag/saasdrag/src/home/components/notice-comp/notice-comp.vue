<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-11-27 17:46:35
-->
<template>
    <view class="home-notice-comp">
        <c-icons
            type="icon-laba"
            size="32"
            color="#707793"
            class="mr12"
        ></c-icons>
        <view class="flex-1">
            <swiper
                class="scroll__view"
                autoplay
                interval="3000"
                vertical
                circular
                :disable-touch="true"
            >
                <swiper-item
                    v-for="(item, index) in list"
                    :key="index"
                    class="scroll__view-item flex-space-between"
                    @touchmove.stop.prevent
                >
                    <view class="scroll__view-left">{{ item.message }}</view>
                    <view class="scroll__view-right">{{ item.create_time }}</view>
                </swiper-item>
            </swiper>
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
        }
    },
}
</script>

<style lang="scss" scoped>
.home-notice-comp {
    height: 78rpx;
    @include flex(row);
    align-items: center;
    padding: 0 28rpx;

    .scroll__view {
        height: 78rpx;

        &-item {
            height: 100%;
            align-items: center;
            font-size: 24rpx;
            font-weight: 400;
            color: #707793;
            line-height: 33rpx;
            overflow: hidden;
        }
        &-left {
            width: 460rpx;
            @include ellipsis();
        }
    }
}
</style>

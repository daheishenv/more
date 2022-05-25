<template>
    <view class="notice">
        <view class="notice-ellipse"></view>
        <view class="notice-bg">
            <swiper
                class="swiper"
                :indicator-dots="indicatorDots"
                :autoplay="autoplay"
                :interval="interval"
                :circular="circular"
                :vertical="vertical"
                :duration="duration"
                :disable-touch="disableTouch"
            >
                <swiper-item
                    v-for="(item, i) in list"
                    :key="i"
                >
                    <view class="swiper-item">
                        <view class="text"> {{ item }} </view>
                    </view>
                </swiper-item>
            </swiper>
        </view>
        <view class="notice-ellipse notice-ellipse--right"></view>
    </view>
</template>

<script>
export default {
    name: 'LuckyNoticeList',
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            indicatorDots: false,
            autoplay: true,
            interval: 5000,
            vertical: true,
            duration: 500,
            circular: true,
            disableTouch: true
        }
    }

}
</script>

<style lang="scss" scoped>
.notice {
    height: 54rpx;
    // color: rgb(68, 127, 255);
    // background: linear-gradient(
    //     to right,
    //     rgba(68, 127, 255, 0) 0%,
    //     rgba(68, 127, 255, 0.3) 50%,
    //     rgba(68, 127, 255, 0) 100%
    // );
    font-size: 28rpx;
    font-weight: 600;
    color: #ffe4c1;
    display: flex;
    align-items: center;
    justify-content: center;
    &-bg {
        width: 380rpx;
        height: 100%;
        border-radius: 10rpx;
        background-color: #c42222;
    }
    &-ellipse {
        height: 38rpx;
        width: 30rpx;
        background-color: #c42222;
        border-radius: 40rpx;
        margin-right: -14rpx;
        &--right {
            margin-right: 0;
            margin-left: -14rpx;
        }
    }
    .swiper {
        border-radius: 10rpx;
        height: 100%;
        &-item {
            width: 100%;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .text {
                text-align: center;
                width: 100%;
                @include ellipsis(1);
            }
        }
    }
}
</style>

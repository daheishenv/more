<template>
    <view class="home-module-weiyv-title">
        <view class="home-module-weiyv-title__title">{{title}}</view>
        <view class="home-module-weiyv-title__more" v-if="more" @tap="$jump(more)">{{moreText}} ></view>
    </view>
</template>

<script>
export default {
    name: "home-module-weiyv-title",
    props: {
        title: {
            type: String,
            default: "",
        },
        more: {
            type: String,
            default: "",
        },
        moreText: {
            type: String,
            default: "查看更多",
        },
    },
};
</script>

<style lang="scss" scoped>
.home-module-weiyv-title {
    text-align: center;
    padding-top: 24rpx;
    &__title {
        font-size: 32rpx;
        line-height: 44rpx;
        padding-bottom: 18rpx;
        color: #455b6b;
        position: relative;
        font-weight: bold;
    }
    &__title::after {
        content: "";
        width: 26rpx;
        height: 4rpx;
        display: block;
        background: #455b6b;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
    }
    &__more {
        font-size: 24rpx;
        line-height: 32rpx;
        color: #666;
        padding-top: 14rpx;
    }
}
</style>
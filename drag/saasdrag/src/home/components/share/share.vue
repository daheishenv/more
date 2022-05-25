<template>
    <view class="">
        <view class="home-share">
            <view class="item flex-ajcenter">
                <c-image
                    size="104"
                    :src="`home/share/${config.module}_${mode_}.png`"
                    @click="handleShare"
                />
            </view>
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'Share',
    mixins: [homeComponentMixins]
}
</script>

<style lang="scss" scoped>
.home-share {
    position: fixed;
    right: 30rpx;
    @include iosSafeArea(bottom, 350rpx, bottom);
    z-index: 10;
    .item {
        // margin-top: 20rpx;
        width: 120rpx;
        height: 120rpx;
        background-color: transparent;
    }
}
</style>

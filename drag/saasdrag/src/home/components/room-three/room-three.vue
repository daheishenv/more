<template>
    <view
        class="home-room3d"
        :class="[mode_]"
        :style="[outerLayer_]"
    >
        <template v-if="!noData_ && cFinish">
            <view
                :style="[titleLayer_]"
                class="home-room3d__title"
            >
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    :more="isMore_ ? 'caseHall' : ''"
                />
            </view>
            <view
                class="home-room3d-bd ptb24"
                :class="{'home-room3d-bd__more': hasMore_}"
                :style="[ innerLayer_ ]"
            >
                <scroll-view
                    class="home-room3d__scroll"
                    :scroll-x="true"
                    :scroll-with-animation="true"
                    :class="{'home-room3d__scroll-full': !hasMore_}"
                >
                    <view class="home-room3d__list">
                        <view
                            class="pl24"
                            :class="{'pr24': !hasMore_}"
                        >
                            <view
                                v-for="(item,index) in cData.list"
                                :key="index"
                                class="home-room3d__item"
                            >
                                <view
                                    class="home-room3d__content"
                                    @tap="$jump('webView', { url: item.target_url})"
                                >
                                    <view class="home-room3d__img">
                                        <c-image
                                            :src="item.img_url"
                                            width="100%"
                                            height="336"
                                            mode="aspectFill"
                                            :radius="16"
                                        />
                                        <view class="home-room3d__icon">
                                            <c-image
                                                src="home/3d.png"
                                                width="38"
                                                height="45"
                                                mode="aspectFit"
                                            />
                                            <view class="home-room3d__icon-text">
                                                <text>3D预览</text>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="home-room3d__name c-ellipsis">{{ item.title }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </template>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[brightCardLayer_]"
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
    name: 'HomeRoom3d',
    mixins: [homeComponentMixins],
    computed: {
        hasMore_() {
            return (this.cData && this.cData.list) ? this.cData.list.length > 1 : false
        },
        imgRadius_() {
            const radius = this.innerLayer_.borderRadius
            return [radius, radius, 0, 0].join(' ')
        },
        // 这边需要吧margin转换成padding，不然会影响外层
        brightCardLayer_() {
            return {
                padding: this.outerLayer_.margin,
                paddingRight: '0rpx'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.home-room3d {
    &.style2 {
        background-color: #fff;
        padding: 0 24rpx;
    }
    &__item {
        padding-right: 24rpx;
    }
    &__scroll {
        white-space: nowrap;

        &-full {
            .home-room3d__item {
                width: 100%;
                padding-right: 0 !important;
            }
        }
    }

    &__item {
        width: 506rpx;
        display: inline-block;
    }

    &__name {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        line-height: 80rpx;
    }

    &__img {
        position: relative;
        @include flex;
        align-items: center;
        justify-content: center;
        // ifdef MP-WEIXIN
        & > c-image {
            width: 100%;
            height: 100%;
        }
        // endif
    }

    &__content {
        background-color: #fff;
        overflow: hidden;
        border-radius: 16rpx;
    }

    &__icon {
        @include siteCenter();
        width: 160rpx;
        height: 100rpx;
        border-radius: 50rpx;
        background-color: rgba($color: #000000, $alpha: 0.8);
        @include flex;
        align-items: center;
        justify-content: center;

        &-text {
            margin-top: 4rpx;
            font-size: 20rpx;
            color: #ffffff;
            line-height: 28rpx;
        }
    }
}
</style>

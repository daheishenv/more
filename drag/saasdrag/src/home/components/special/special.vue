<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-27 17:58:03
-->
<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-special"
            :style="[ outerLayer_ ]"
        >
            <view
                class="home-special-bd"
                :style="[ innerLayer_ ]"
            >
                <view class="c-row">
                    <view
                        v-for="(cell, i) in cData"
                        :key="i"
                        class="c-col-3"
                        @click="$serverJump(cell)"
                    >
                        <view
                            class="home-special__title c-ellipsis"
                            :class="[!cell.title ? 'bright-card' : '']"
                        >{{ cell.title }}</view>
                        <view
                            class="home-special__sub-title c-ellipsis"
                            :class="[!cell.subTitle ? 'bright-card' : '']"
                        >
                            <text :style="{color: cell.color}">{{ cell.subTitle }}</text>
                        </view>
                        <view class="home-special__img">
                            <c-image
                                :src="cell.img"
                                width="100%"
                                height="136"
                            />
                        </view>
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
    name: 'HomeSpecial',
    mixins: [homeComponentMixins]
}
</script>
<style lang="scss" scoped>
.home-special {
    overflow: hidden;

    &-bd {
        background-color: #fff;
    }

    .c-col-3 {
        padding: 12rpx;
    }

    &__img {
        margin-top: 16rpx;
    }

    &__title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        line-height: 46rpx;
        height: 46rpx;
    }

    &__sub-title {
        margin-top: 8rpx;
        font-size: 24rpx;
        color: #ff5d0c;
        line-height: 32rpx;
        height: 32rpx;
    }

    &__img {
        margin-top: 16rpx;
    }
}
</style>

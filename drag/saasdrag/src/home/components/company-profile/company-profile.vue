<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-05 18:05:13
-->
<template>
    <view>
        <view
            v-if="!noData_ && cFinish && cData.introduction"
            class="home-company-profile"
            :style="[outerLayer_]"
        >
            <view
                class="home-company-profile__title"
                :style="[titleLayer_]"
            >
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    more-text="详情"
                    :more="isMore_ ? 'company?type=0' : ''"
                />
            </view>
            <view
                class="home-company-profile-bd"
                :style="[ innerLayer_ ]"
            >
                <view class="home-company-profile__content">
                    <c-jyf-parser :html="cData.introduction" />
                </view>
                <view
                    class="home-company-profile__mask"
                    :style="{
                            backgroundImage: `linear-gradient(rgba(255,255,255, 0), ${outerLayer_.backgroundColor || innerLayer_.backgroundColor})`}"
                ></view>
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
    name: 'HomeCompanyProfile',
    mixins: [homeComponentMixins]
}
</script>

<style lang="scss">
.home-company-profile {
    position: relative;
    overflow: hidden;
    &__title {
        padding: 0 24rpx;
    }
    &-bd {
        padding: 24rpx;
        padding-top: 24rpx !important;
        padding-bottom: 24rpx !important;
        overflow: hidden;
        position: relative;
    }
    &__content {
        max-height: 664rpx;
        overflow: hidden;
    }
    &__mask {
        height: 150rpx;
        @include abs(540rpx, 0, null, 0);
    }
}
</style>

<template>
    <view class="home-banner">
        <view
            v-if="noImg_"
            class="home-banner__no-img"
            :style="{height: innerLayer_.height}"
        >
            <c-image
                mode="heightFix"
                height="120"
                src="drag/banner/style1.png"
            />
        </view>
        <template v-else>
            <c-colors
                v-if="outerLayer_.hasBg == 1"
                :pro="['bgc']"
            >
                <view class="home-banner__bg" />
            </c-colors>
            <view
                class="home-banner-bd"
                :style="[outerLayer_]"
            >
                <view
                    class="swiper-content"
                    :style="[{borderRadius: innerLayer_.borderRadius}]"
                >
                    <swiper
                        class="swiper-box over-hidden"
                        :style="[innerLayer_]"
                        :current="current"
                        :interval="interval_"
                        circular
                        :autoplay="autoplay_"
                        @animationfinish="handleSwiperChange"
                    >
                        <swiper-item
                            v-for="(item,index) in cData"
                            :key="index"
                            :style="[innerLayer_]"
                            class="over-hidden"
                        >
                            <view
                                :style="[innerLayer_]"
                                @click="$serverJump(item)"
                            >
                                <c-image
                                    v-if="item.img_url"
                                    type="upload"
                                    width="100%"
                                    :height="innerLayer_.height"
                                    :src="item.img_url"
                                    :radius="innerLayer_.borderRadius"
                                    :mode="item.img_url ? 'scaleToFill' : 'aspectFill'"
                                />
                                <view
                                    v-else
                                    class="home-banner__no-img"
                                    style="width: 100%; height: 100%"
                                >
                                    <c-image
                                        mode="heightFix"
                                        height="120"
                                        src="drag/banner/style1.png"
                                    />
                                </view>
                            </view>
                        </swiper-item>
                    </swiper>
                    <view class="ptb24 swiper-doted">
                        <sub-home-dotted
                            v-model="current"
                            :mode="indicatorMode_"
                            :align="indicatorMode_ === 'number' ? 'right' : 'center'"
                            :number="cData.length"
                        />
                    </view>
                </view>
            </view>
        </template>
    </view>

</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页banner图组件
export default {
    name: 'HomeHanner',
    mixins: [homeComponentMixins],
    data() {
        return {
            current: 0
        }
    },
    watch: {
        cData: {
            handler() {
                this.current = 0
            },
            deep: true
        }
    },
    computed: {
        noImg_() {
            // 一个有即有数据
            return !this.cData.some(o => o && o.img_url)
        },
        indicatorMode_() {
            return this.extra_.indicatorMode || 'dotted'
        },
        interval_() {
            const interval = parseInt(this.extra_.interval)
            return isNaN(interval) ? 3000 : interval
        },
        autoplay_() {
            return parseInt(this.extra_.autoplay) === 1 ? true : false
        }
    },
    methods: {
        handleSwiperChange(event) {
            this.current = event.detail.current
            this.$emit('change', event)
        }
    }
}
</script>

<style lang="scss" scoped>
.home-banner {
    position: relative;

    &__no-img {
        background-color: #f3f8ff;
        @include flex;
        justify-content: center;
        align-items: center;
    }

    &__bg {
        height: 184rpx;
        @include abs(0, 0, null, 0);
        background-color: inherit;

        &::after {
            content: '';
            position: absolute;
            bottom: -43rpx;
            height: 44rpx;
            border-radius: 0 0 50% 50%;
            display: block;
            left: 0;
            width: 100%;
            background-color: inherit;
        }
    }
    .swiper-content {
        position: relative;
        overflow: hidden;
        .swiper-box {
            width: 100%;
        }
        .swiper-doted {
            @include abs(null, 0, 0, 0);
            z-index: 2;
        }
    }
    .over-hidden {
        overflow: hidden;
    }
}
</style>

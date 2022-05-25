<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-market-news"
            :style="[outerLayer_]"
        >
            <view class="home-market-news-bd">
                <view class="news-wrap">
                    <view
                        class="news p24"
                        :style="[itemLayer_]"
                    >
                        <view
                            class="flex flex-shrink"
                            @tap="$jump('decoration')"
                        >
                            <text class="news-title1">{{ config.title && config.title.substring(0,2) }}</text>
                            <c-colors
                                :theme="['t']"
                                :pro="['c']"
                            >
                                <text class="news-title2">{{ config.title && config.title.substring(2) }}</text>
                            </c-colors>
                        </view>
                        <text>|</text>
                        <swiper
                            class="swiper"
                            :style="[{'width': width_,'height': height}]"
                            :autoplay="autoplay"
                            :interval="interval"
                            :duration="duration"
                            vertical
                            circular
                            :current="current"
                            @change="change"
                        >
                            <swiper-item
                                v-for="(item, index) in cData.list"
                                :key="index"
                            >
                                <view @tap="$jumpDetail('decorationDetails', item.id)">
                                    <view class="news-desc c-ellipsis" :style="[{width: width_}]">{{ item.title }}</view>
                                </view>
                            </swiper-item>
                        </swiper>
                        <view
                            class="news-icon"
                            @tap="$jump('decoration')"
                        >
                            <c-icons
                                size="36"
                                type="icon-tiaozhuan"
                            />
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card ptb24"
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
    name: 'HomeMarketNews',
    mixins: [homeComponentMixins],
    data() {
        return {
            autoplay: true,
            width: '480rpx',
            height: '36rpx',
            origin: false,
            interval: 3000,
            duration: 500,
            current: 0
        }
    },
    computed: {
        outerLayerMargin_() {
            return this.outerLayer_.margin || ''
        },
        width_() {
            return this.outerLayerMargin_ === '0 24rpx' ? '450rpx' : this.width
        }
    },
    watch: {
        'cData.list': {
            handler(val) {
                val.length === 1 && (this.current = 0)
            }
        }
    },
    methods: {
        change(event) {
            this.current = event.detail.current
            this.$emit('change', event)
        }
    }
}
</script>

<style lang="scss" scoped>
.home-market-news {
    overflow: hidden;
    padding: 0 24rpx;
    .news-wrap {
        padding: 24rpx 0;
    }
    .news {
        border-radius: 40rpx;
        box-shadow: 0rpx 4rpx 40rpx -6rpx rgba(0, 0, 0, 0.1);
        position: relative;
        @include flex(row);
        align-items: center;
        height: 80rpx;
        padding: 0 12rpx;
        .flex-shrink {
            flex-shrink: 0;
        }
        &-title1 {
            font-size: 28rpx;
            font-weight: bold;
            color: #333;
        }
        &-title2 {
            font-size: 28rpx;
            font-weight: bold;
            padding-right: 16rpx;
        }
        &-desc {
            width: 480rpx;
            font-size: 24rpx;
            color: #999;
            padding-left: 16rpx;
        }
        &-icon {
            position: absolute;
            right: 24rpx;
        }
    }
}
</style>

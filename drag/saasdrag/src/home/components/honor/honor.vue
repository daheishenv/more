<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-company-honor"
            :style="[outerLayer_]"
        >
            <view
                :style="[titleLayer_]"
                class="home-company-honor__title"
            >
                <view>
                    <sub-home-module-title
                        :full="config.isFull"
                        :title="config.title"
                        :sub-title="config.sub_title"
                        :title-layer="titleLayer_"
                        :more="isMore_ ? 'company?type=2' : ''"
                    />
                </view>
            </view>
            <swiper
                class="home-company-honor-swiper"
                :current="current"
                @change="handleSwiperChange"
            >
                <swiper-item
                    v-for="(item, index) in list_"
                    :key="index"
                    class="home-company-honor__item"
                >
                    <view
                        class="home-company-honor__content"
                        :style="[innerLayer_]"
                    >
                        <view class="c-row">
                            <view
                                v-for="(honor, ids) in item"
                                :key="ids"
                                class="c-col-6"
                                :style="[ innerLayer_ ]"
                            >
                                <view class="home-company-honor__item">
                                    <c-image
                                        :src="honor.img"
                                        width="100%"
                                        height="246"
                                    />
                                    <view class="home-company-honor__name c-ellipsis">{{ honor.state }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
            <view
                v-if="list_.length > 1"
                class="ptb24"
            >
                <sub-home-dotted
                    v-model="current"
                    :number="list_.length"
                />
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
    name: 'HomeCompanyHonor',
    mixins: [homeComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    data() {
        return {
            current: 0,
            cData: {
                list: []
            }
        }
    },
    computed: {
        list_() {
            return this.$c.setArrData(this.cData.list)
        }
    },
    methods: {
        prevImg(url) {
            uni.previewImage({
                urls: [url]
            })
        },
        handleSwiperChange(event) {
            this.current = event.detail.current
            this.$emit('change', event)
        }
    }
}
</script>
<style lang="scss" scoped>
.home-company-honor {
    overflow: hidden;

    &-swiper {
        height: 358rpx;
    }

    &__title {
        padding: 0 24rpx;
    }

    &__name {
        font-size: 28rpx;
        color: #333333;
        line-height: 40rpx;
        margin-top: 24rpx;
    }

    &__content {
        padding: 24rpx 0;
    }

    .c-row {
        padding: 0 $spacing-row-base;
    }
    .c-col-6 {
        padding: 0 $spacing-row-base;
    }
}
</style>

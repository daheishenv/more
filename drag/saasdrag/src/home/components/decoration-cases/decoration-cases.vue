<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-26 21:24:11
-->
<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="decoration-cases"
            :class="{'decoration-cases-row': mode_ === 'style2'}"
            :style="[outerLayer_]"
        >
            <view :style="[titleLayer_]">
                <sub-home-module-title
                    :full="innerLayer_.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    :more="isMore_ ? 'case' : ''"
                />
            </view>
            <template v-if="mode_ === 'style1'">
                <view
                    class="decoration-cases-bd"
                    :style="[ innerLayer_ ]"
                >
                    <gc-list
                        mode="row"
                        bg-color="transparent"
                        img-width="256"
                        img-height="192"
                        border
                        ellipsis="1"
                        type="case"
                        title-key="name"
                        title-size="32"
                        img-key="image"
                        img-radius="8"
                        :list="list_"
                    />
                </view>
            </template>
            <template v-if="mode_ === 'style2'">

                <swiper
                    class="decoration-cases-row-swiper"
                    :current="current"
                    @change="handleChange"
                >
                    <swiper-item
                        v-for="(item, index) in list_"
                        :key="index"
                        class="decoration-cases-row__item"
                        :style="[ innerLayer_, {padding: `0rpx ${innerLayer_.paddingRight}`} ]"
                    >
                        <view
                            v-if="item"
                            class="c-row"
                        >
                            <view
                                v-for="(it, idx) in item"
                                :key="idx"
                                class="c-col-6"
                                @click="$jumpDetail('caseDetails', it.id)"
                            >
                                <c-image
                                    :src="it.image"
                                    width="100%"
                                    height="246"
                                    radius="8rpx 8rpx 0 0"
                                />
                                <view class="decoration-cases-row__text">
                                    <view class="decoration-cases-row__name c-ellipsis">{{ it.name }}</view>
                                    <view class="decoration-cases-row__desc c-ellipsis"><text>{{ it.roomAndArea ? it.roomAndArea : '' }}{{ it.style ? (' | ' + it.style) : '' }}</text></view>
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
            </template>
            <template v-if="mode_ === 'style3'">
                <view
                    class=" ptb24"
                    :style="[ innerLayer_ ]"
                >
                    <scroll-view
                        class="style3-cases__scroll"
                        :scroll-x="true"
                        :scroll-with-animation="true"
                        :class="{'style3-cases__scroll-full': !hasMore_}"
                    >
                        <view class="style3-cases__list">
                            <view class="pl24">
                                <view
                                    v-for="(item,index) in list_"
                                    :key="index"
                                    class="style3-cases__item pr24"
                                    :class="{'pr24': hasMore_}"
                                >
                                    <view
                                        class="style3-cases__content"
                                        @click="$jumpDetail('caseDetails', item.id)"
                                    >
                                        <view class="style3-cases__img">
                                            <view class="style3-cases__mask flex-column flex-ajcenter">
                                                <view class="style3-cases__mask-title c-ellipsis">{{item.name}}</view>
                                                <view class="style3-cases__mask-sub-title c-ellipsis">{{casesSubTitle_(item)}}</view>
                                            </view>
                                            <c-image
                                                :src="item.image"
                                                width="100%"
                                                height="520"
                                                mode="aspectFill"
                                                radius="16"
                                            />
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </template>
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
// 首页案例组件
export default {
    name: 'DecorationCases',
    mixins: [homeComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    data() {
        return {
            current: 0,
            cData: {}
        }
    },
    computed: {
        list_() {
            if (!this.cData || !this.cData.list) return []
            if (this.mode_ === 'style1' || this.mode_ === 'style3') {
                return this.cData.list
            } else {
                return this.$c.setArrData(this.cData.list)
            }
        },
        hasMore_() {
            return this.list_ ? this.list_.length > 1 : false
        },
        imgRadius_() {
            return this.innerLayer_.borderRadius
        },
        casesSubTitle_() {
            return (item) => {
                return item.housing_type && item.housing_type.name
                    + (item.housing_type && item.housing_type.area ? ` | ${item.housing_type.area}㎡` : '')
                    + (item.style ? ` | ${item.style}` : '')
            }
        }

    },
    methods: {
        handleChange(event) {
            this.current = event.detail.current
        }
    }
}
</script>

<style lang="scss">
.decoration-cases {
    .c-row {
        padding: 0 $spacing-row-base;
    }
    &-bd {
        border-radius: 16rpx;
        overflow: hidden;
    }
    &-row {
        &-swiper {
            height: 406rpx;
        }
        &__item {
            padding: 24rpx 0 24rpx;
        }

        &__text {
            padding: 24rpx 24rpx 24rpx 0;
        }

        &__name {
            font-size: 28rpx;
            color: #333333;
            line-height: 40rpx;
        }

        &__desc {
            font-size: 24rpx;
            color: #999999;
            line-height: 32rpx;
            margin-top: 16rpx;
        }
        .c-col-6 {
            padding: 0 $spacing-row-base;
        }
    }
    /deep/ .gc-list-item--row {
        padding: 0rpx 0rpx 24rpx;
    }
    /deep/ .decoration-cases-bd .c-row {
        padding-bottom: 0;
        .c-col-12:last-child {
            padding-bottom: 0;
        }
    }
    /deep/ .gc-list-item {
        background: inherit;
    }
    .style3-cases {
        &__scroll {
            white-space: nowrap;

            &-full {
                .style3-cases__item {
                    width: 100%;
                }
            }
        }
        &__item {
            width: calc(100% - 48rpx);
            display: inline-block;
        }

        &__name {
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;
            line-height: 80rpx;
        }
        &__mask {
            width: 100%;
            height: 208rpx;
            @include abs(null, 0, 0, 0);
            z-index: 1;
            background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.58) 100%
            );
            &-title,
            &-sub-title {
                color: #fff;
                text-align: center;
                padding: 0 24rpx;
                margin: 4rpx 0;
                width: 100%;
            }
            &-title {
                font-size: 36rpx;
                line-height: 50rpx;
            }
            &-sub-title {
                font-size: 24rpx;
                line-height: 32rpx;
            }
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
    }
}
</style>

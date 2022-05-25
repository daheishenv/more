<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-construction-technology"
            :class="{'home-construction-technology-row': mode_ === 'style2'}"
            :style="[outerLayer_]"
        >
            <view :style="[titleLayer_]">
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    :more="isMore_ ? 'decoration' : ''"
                />
            </view>
            <view
                class="home-construction-technology-bd"
                :class="{'pl24': hasMargin && mode_ === 'style2', 'ptb24': mode_ === 'style2'}"
                :style="[ innerLayer_]"
            >
                <template v-if="mode_ === 'style1' || mode_ === 'style2'">
                    <scroll-view
                        :scroll-x="mode_ === 'style2'"
                        :scroll-with-animation="true"
                    >
                        <view :class="{'home-construction-technology__list': mode_ === 'style2'}">
                            <view
                                v-for="(item, i) in cData.list"
                                :key="i"
                                :class="{'c-underline': i !== cData.list.length - 1 && mode_ === 'style1'}"
                                class="home-construction-technology__item"
                            >
                                <view
                                    :class="{'home-construction-technology__box': mode_ === 'style2', 'flex' : mode_ === 'style1'}"
                                    @tap="$jumpDetail('decorationDetails', item.id)"
                                >
                                    <c-image
                                        v-if="mode_ === 'style2'"
                                        height="200"
                                        width="266"
                                        :src="item.cover_image"
                                        mode="aspectFill"
                                    />
                                    <view :class="{'flex-1': mode_ === 'style1', 'home-construction-technology__text' : mode_ === 'style2'}">
                                        <view
                                            :class="{'c-ellipsis-2': mode_ === 'style1', 'c-ellipsis': mode_ === 'style2'}"
                                            class="home-construction-technology__title"
                                        >{{ item.title }}</view>
                                        <view
                                            :class="{'home-construction-technology__summary': mode_ === 'style1', 'home-construction-technology__desc': mode_ === 'style2'}"
                                            class="c-ellipsis-2"
                                        >{{ item.desc }}</view>
                                    </view>
                                    <c-image
                                        v-if="mode_ === 'style1'"
                                        :src="item.cover_image"
                                        width="200"
                                        height="172"
                                        mode="aspectFill"
                                        radius="16"
                                    />
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </template>
                <template v-if="mode_ === 'style3'">
                    <view
                        class="home-room3d-bd ptb24"
                        :class="{'home-room3d-bd__more': hasMore_}"
                        :style="[ innerLayer_ ]"
                    >
                    <scroll-view
                            class="style3-cases__scroll"
                            :scroll-x="true"
                            :scroll-with-animation="true"
                            :class="{'style3-cases__scroll-full': !hasMore_}"
                        >
                            <view class="style3-cases__list">
                                <view
                                    class="pl24"
                                >
                                    <view
                                        v-for="(item,index) in list_"
                                        :key="index"
                                        class="style3-cases__item pr24"
                                        :class="{'pr24': hasMore_}"
                                    >
                                        <view
                                            class="style3-cases__content"
                                            @click="$jumpDetail('decorationDetails', item.id)"
                                        >
                                            <view class="style3-cases__img">
                                                <c-image
                                                    :src="item.cover_image"
                                                    width="100%"
                                                    height="520"
                                                    mode="aspectFill"
                                                    :radius="16"
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
    mixins: [homeComponentMixins],
    computed: {
        imgRadius_() {
            const radius = this.innerLayer_.borderRadius
            return [radius, radius, 0, 0].join(' ')
        },
        hasMargin() {
            if (this.outerMargin_) {
                return true
            } else {
                return false
            }
        },
        list_() {
            if (!this.cData || !this.cData.list) return []
            return this.cData.list 
        },
        hasMore_() {
            return this.list_ ? this.list_.length > 1 : false
        },
        imgRadius_() {
            return this.innerLayer_.borderRadius
        }
    }
}
</script>

<style lang="scss">
.home-construction-technology {
    &-bd {
        border-radius: 16rpx;
    }
    &__item {
        padding: 24rpx;
    }
    .flex-1 {
        padding-right: 16rpx;
        @include flex;
        justify-content: space-between;
    }
    &__title {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
        line-height: 40rpx;
    }
    &__summary {
        font-size: 22rpx;
        color: #666666;
        line-height: 30rpx;
    }

    &__list {
        white-space: nowrap;
        font-size: 0;
    }

    &__box {
        width: 266rpx;
        background: #fff;
        position: relative;
        border-radius: 16rpx;
    }

    &__text {
        padding: 24rpx 12rpx;
    }

    &__desc {
        margin-top: 10rpx;
        font-size: 24rpx;
        color: #999999;
    }

    &.home-construction-technology-row {
        .home-construction-technology-bd {
            background-color: transparent;
            border-radius: 0;
        }
        .home-construction-technology__item {
            padding: 0 24rpx 0 0 !important;
            display: inline-block;
            overflow: hidden;
        }
        .home-construction-technology__text {
            padding: 24rpx 0 0;
        }

        .home-construction-technology__title {
            font-weight: normal;
        }
    }
    /deep/ .c-underline::after,
    .c-underline__top::after {
        left: 24rpx;
        right: 24rpx;
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

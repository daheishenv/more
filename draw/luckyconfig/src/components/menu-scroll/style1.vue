<template>
    <view
        class="gc-menu-scroll-box gc-menu-scroll-box-style1"
        :class="[
            border_ ? 'c-underline' : '',
            'gc-menu-scroll-box--' + mode
        ]"
    >
        <slot name="before"></slot>
        <view class="gc-menu-scroll-hd">
            <scroll-view
                class="gc-menu-scroll"
                :class="[scrollX_ ? 'gc-menu-scroll-horizontal' : '', 'gc-menu-scroll-' + mode]"
                :scroll-x="scrollX_"
                :scroll-y="!scrollX_"
                scroll-with-animation
                :scroll-into-view="currentView_"
                :show-scrollbar="false"
                :style="[ style_ ]"
            >
                <view
                    class="gc-menu-scroll-list"
                    :style="[ listStyle_ ]"
                >
                    <view
                        v-for="(item, index) in list"
                        :id="'type' + index"
                        :key="index"
                        class="gc-menu-scroll-item"
                        :class="[menuIndex === index ? 'gc-menu-scroll-item__active' : '' ]"
                        @click="handleChangeType(index, $event)"
                    >
                        <block v-if="mode === 'home'">
                            <c-colors
                                :theme="[menuIndex === index ? selColor : color]"
                                :radius="itemStyle_.borderRadius ? itemStyle_.borderRadius : 30"
                            >
                                <text
                                    class="gc-menu-scroll-item__text"
                                    :style="[ itemStyle_ ]"
                                >{{ item[label] }}</text>
                                <c-icons
                                    class="gc-menu-scroll-item__icon"
                                    type="icon-xiaolianxuanzhong"
                                ></c-icons>
                            </c-colors>
                        </block>
                        <block v-else>
                            <c-colors
                                :theme="theme_(menuIndex === index)"
                                :pro="pro_(menuIndex === index)"
                                :radius="itemStyle_.borderRadius ? itemStyle_.borderRadius : 30"
                            >
                                <text
                                    class="gc-menu-scroll-item__text"
                                    :style="[ itemStyle_ ]"
                                >{{ item[label] }}</text>
                            </c-colors>
                            <c-colors
                                class="gc-menu-scroll-item__line-box"
                                :theme="[menuIndex === index ? selColor : 'transparent']"
                                :pro="['bgc']"
                                radius="4"
                            >
                                <view class="gc-menu-scroll-item__line"></view>
                            </c-colors>
                        </block>
                    </view>
                </view>
            </scroll-view>
        </view>
        <slot></slot>
    </view>
</template>

<script>
import menuScrollMixins from '@/components/menu-scroll/mixins/index'
export default {
    mixins: [menuScrollMixins]
}
</script>

<style lang="scss" scoped>
.gc-menu-scroll {
    &-box {
        width: 100%;
        height: 100%;
        position: relative;
        @include flex(row);
        align-items: center;
    }

    &-hd {
        flex: 1;
        // width: 100%;
        // height: 100%;
        overflow: hidden;
    }

    &-list {
        width: 100%;
    }

    &-item {
        text-align: center;
        position: relative;
        display: block;
        padding: 22rpx 15rpx;

        &__icon {
            @include abs(null, 50%, -4rpx);
            z-index: 3;
            transform: translateX(50%);
            @include tst();
            opacity: 0;
        }

        &__text {
            @include ellipsis();
            display: block;
            color: inherit;
            line-height: 60rpx;
            height: 60rpx;
            font-size: 28rpx;
            padding: 0 12rpx;
            position: relative;
        }

        &__active {
            .gc-menu-scroll-item__text {
                font-weight: bold;
            }

            .gc-menu-scroll-item__line,
            .gc-menu-scroll-item__icon {
                opacity: 1;
            }
        }
    }

    &-horizontal {
        .gc-menu-scroll-list {
            width: 100%;
            height: 100%;
            @include flex(row);
            align-items: center;
            flex-wrap: nowrap;
        }

        .gc-menu-scroll-item {
            display: inline-block;
            padding: 0 16rpx;
            font-weight: 400;

            &__text {
                line-height: 80rpx;
                height: 80rpx;
                padding: 0;
            }

            &__line-box {
                z-index: 3;
                @include abs(auto, 50%, 14rpx, auto);
                transform: translateX(50%);
                width: 48rpx;
                height: 4rpx;
            }

            &__line {
                border-radius: 2rpx;
                opacity: 0;
                height: 4rpx;
                width: 40rpx;
            }
        }
    }

    &-center {
        .gc-menu-scroll-list {
            display: flex;
            align-items: center;
        }

        .gc-menu-scroll-item {
            flex: 1;
        }
    }

    &-home {
        .gc-menu-scroll-item__active {
            .gc-menu-scroll-item__text {
                font-size: 32rpx;
            }
        }
    }
}
</style>

<template>
    <view
        class="gc-menu-scroll-box gc-menu-scroll-box-style3"
        :class="[
            border_ ? 'c-underline' : '',
            'gc-menu-scroll-box--' + mode
        ]"
    >
        <slot name="before"></slot>
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
                    :class="[
                        menuIndex === index ? 'gc-menu-scroll-item__active' : ''
                    ]"
                    @click="handleChangeType(index, $event)"
                >
                    <c-colors
                        :theme="menuIndex === index ? ['t|0.06', 't'] : ['#f5f5f5', '#333']"
                        :pro="pro_(menuIndex === index)"
                        radius="4"
                    >
                        <text
                            class="gc-menu-scroll-item__text flex-ajcenter"
                            :style="[ itemStyle_ ]"
                        >{{ item[label] }} </text>
                    </c-colors>
                </view>
            </view>
        </scroll-view>
        <slot></slot>
    </view>
</template>

<script>
import menuScrollMixins from '@/components/menu-scroll/mixins/index'
export default {
    mixins: [menuScrollMixins]
}
</script>

<style
    lang="scss"
    scoped
>
.gc-menu-scroll {
    flex: 1;
    width: 100%;
    height: 100%;

    &::-webkit-scrollbar {
        display: none;
    }

    &-box {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
    }

    &-list {
        width: 100%;
    }

    &-item {
        text-align: center;
        position: relative;
        display: block;

        &__icon {
            @include abs(null, 50%, 0);
            z-index: 3;
            transform: translateX(50%);
        }

        &__text {
            @include ellipsis();
            display: block;
            color: inherit;
            line-height: 120rpx;
            height: 120rpx;
            font-size: 28rpx;
            padding: 0 12rpx;
            position: relative;
        }
    }

    .gc-menu-scroll-item {
        &__active {
            .gc-menu-scroll-item__text {
                font-weight: bold;
            }

            .gc-menu-scroll-item__line {
                opacity: 1;
            }
        }
    }

    &-horizontal {
        .gc-menu-scroll-list {
            white-space: nowrap;
            width: 100%;
            height: 100%;
            display: block;
            font-size: 0;
        }

        .gc-menu-scroll-item {
            display: inline-block;
            padding: 0 12rpx;
            font-weight: 400;

            &__text {
                line-height: unset;
                height: auto;
                font-size: 24rpx;
                padding: 0 27rpx;
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
}
</style>

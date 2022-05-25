<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-05 15:56:16
-->
<template>
    <view class="home-header">
        <c-fixed-menu
            hasNav="false"
            :height="height_"
            :fixed-height="fixedHeight_"
            :bg-color="bgColor_"
        >
            <view style="background-color: rgb(255, 255, 255);">
                <view class="system-status-bar flex justify-between align-center">
                    <view class="system-status-bar__time">{{systemTime}}</view>
                    <view class="system-status-bar__icons">
                        <text class="drag drag-a-CellularConnection"></text>
                        <text class="drag drag-Wifi"></text>
                        <text class="drag drag-Battery"></text>
                    </view>
                </view>
                <view class="system-status-bar__clear"></view>
            </view>
            <view
                class="flex align-center justify-between"
                :style="{padding: `${paddingTop_}px 0`, height: menuButtonInfo.height + 'px'}"
            >
                <view
                    class="home-header-hd"
                    :style="{maxWidth: `${leftWidth_}px`, width: `${leftWidth_}px`,paddingLeft: paddingLeft_ + 'px'}"
                >
                    <text
                        class="home-header__title"
                        v-if="mode_ === 'style2' && titleMode_ === 'left'"
                        :style="{color: titleColor_}"
                    >{{config.title}}</text>
                    <view
                        v-if="mode_ === 'style2' && titleMode_ === 'center'"
                        class="home-header__search"
                        :color="titleColor_"
                    >
                        <c-icons
                            type="icon-sousuo"
                            size="20px"
                            :color="titleColor_"
                        ></c-icons>
                    </view>
                </view>
                <view
                    class="home-header-bd flex-1"
                    :style="{maxWidth: `calc(100% - ${(mode_ === 'style1' ? 0 : 1) * rightWidth_}px)`}"
                >
                    <text
                        class="home-header__title"
                        :style="{color: titleColor_, textAlign: titleMode_}"
                    >{{config.title}}</text>
                </view>
                <view
                    class="capsule-box"
                    :style="{width: rightWidth_ + 'px'}"
                >
                    <!-- #ifdef H5 -->
                    <c-image
                        src="drag/header/capsule.png"
                        :height="menuButtonInfo.height + 'px'"
                        mode="heightFix"
                    ></c-image>
                    <!-- #endif -->
                </view>
            </view>
        </c-fixed-menu>
    </view>
</template>

<script>
// import homeComponentMixins from '@/home/components/component/home-component-mixins';
// 首页头部（仅名称和搜索）组件
export default {
    name: 'home-header',
    // mixins: [homeComponentMixins],
    props: {
        config: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            menuButtonInfo: {
                top: 12,
                height: 64,
                width: 93,
                right: 368
            },
            systemTime: '',// 系统时间
            scrollTop: 0
        }
    },
    computed: {
        mode_() {
            return '"style1"'
        },
        paddingTop_() {
            return 6
        },
        titleMode_() {
            return 'center'
        },
        paddingLeft_() {
            return 0
        },
        leftWidth_() {
            return 100
        },
        rightWidth_() {
            return 100
        },
        height_() {
            return '65px'
        },
        fixedHeight_() {
            return 'inherit'
        },
        bgColor_() {
            return 'rgba(255, 255, 255, 1)'
        },
        titleColor_() {
            return "rgba(0,0,0,1)"
        },
    },
    mounted() {
        // 下面把单位都转换成px
        // #ifdef MP
        this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        // #endif
        // #ifdef APP-PLUS
        this.menuButtonInfo.top = uni.getSystemInfoSync().statusBarHeight
        // #endif
        // #ifdef H5
        this.menuButtonInfo.top = uni.upx2px(this.menuButtonInfo.top)
        // #endif
        // #ifndef MP
        this.menuButtonInfo.height = uni.upx2px(this.menuButtonInfo.height)
        // #endif
        this.getSystemTime()
    },
    created() {
        uni.$on('pageScroll', (e) => {
            const scrollTop = e.scrollTop - 10
            this.scrollTop = scrollTop > 0 ? scrollTop : 0
        })
    },
    beforeDestroy() {
        uni.$off('pageScroll')
    },
    methods: {
        getSystemTime() {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            this.systemTime = hour + ':' + this.zeroFill(minute)
            setTimeout(() => {
                this.getSystemTime()
            }, 5000)
        },
        zeroFill(val) {
            return val > 9 ? val : '0' + val
        }
    }
}
</script>

<style lang="scss">
.home-header {
    .system-status-bar {
        @include abs(0, 0, null, 0);
        height: 25px;
        padding: 0 24rpx;
        &__time {
            font-size: 24rpx;
        }
        &__icons {
            font-size: 32rpx;
            .drag {
                margin-left: 8rpx;
            }
        }
        &__clear {
            height: 25px;
            width: 100%;
        }
    }
    .capsule-box {
        padding-right: 7px;
    }
    .home-header__search {
        @include abs(50%, null, null, 8px);
    }
    &__title {
        display: block;
        @include ellipsis;
        text-align: center;
        font-size: 32rpx;
        padding: 0 24rpx;
    }

    &-hd {
        .home-header__title {
            padding-right: 0;
        }
    }
}
</style>
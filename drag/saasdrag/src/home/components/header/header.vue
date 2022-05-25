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
            <view :style="{color: titleLayer_.color}">
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
                    :style="{maxWidth: `${leftWidth_}px`, width: `${leftWidth_}px`,paddingLeft: paddingLeft_ + 'px',color: titleColor_}"
                >
                    <text
                        v-if="mode_ === 'style2' && titleMode_ === 'left'"
                        class="home-header__title"
                    >{{ config.title }}</text>
                    <view
                        v-if="!nowrap_"
                        class="flex align-center"
                        :style="{color: titleColor_}"
                    >
                        <view
                            v-if="parseInt(extra_.location) === 1"
                            class="home-header__icons current-city"
                            @click="$jump('chooseCity', {isHome: 1})"
                        >
                            <c-icons
                                type="icon-dizhi-empty"
                                size="38"
                                :color="titleColor_"
                            />
                            <text class="pl8 current-city__text">{{ cityName_ }}</text>
                        </view>
                        <c-icons
                            @click="$jump('search')"
                            v-if="mode_ === 'style2' && titleMode_ === 'center'"
                            class="home-header__icons"
                            type="icon-sousuo"
                            size="32"
                            :color="titleColor_"
                        ></c-icons>
                    </view>
                </view>
                <view
                    class="home-header-bd flex-1"
                    :style="{maxWidth: `calc(100% - ${(mode_ === 'style1' ? 0 : 1) * rightWidth_}px)`}"
                >
                    <template v-if="mode_ === 'style2' && titleMode_ === 'left'">
                        <sub-home-search
                            v-if="!nowrap_"
                            :nowrap="false"
                            :input-height="menuButtonInfo.height + 'px'"
                            :input-bg-color="innerLayer_.bgColor"
                            :input-raduis="inputRaduis_"
                            :input-color="innerLayer_.color"
                            @click="$jump('search')"
                        />
                    </template>
                    <template v-else>
                        <text
                            class="home-header__title"
                            :style="{color: titleColor_, textAlign: titleMode_}"
                        >{{config.title}}</text>
                    </template>
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
            <view
                v-if="nowrap_"
                class="mt24 flex-ajcenter home-header-ft"
            >
                <view
                    v-if="parseInt(extra_.location) === 1"
                    class="pl24 current-city"
                    :style="{color: titleColor_}"
                    @click="$jump('chooseCity')"
                >
                    <c-icons
                        type="icon-dizhi-empty"
                        size="38"
                        :color="titleColor_"
                    />
                    <text class="pl8 current-city__text">{{cityName_}}</text>
                </view>
                <view class="flex-1">
                    <sub-home-search
                        :input-height="menuButtonInfo.height + 'px'"
                        :input-bg-color="innerLayer_.bgColor"
                        :input-raduis="inputRaduis_"
                        :input-color="innerLayer_.color"
                        @click="$jump('search')"
                    />
                </view>
            </view>
        </c-fixed-menu>
    </view>
</template>

<script>
import localInfoMixin from '@/common/mixins/localInfo'
import homeComponentMixins from '@/home/components/component/home-component-mixins';
// 首页头部（仅名称和搜索）组件
export default {
    name: 'home-header',
    mixins: [homeComponentMixins, localInfoMixin],
    data() {
        return {
            menuButtonInfo: {
                top: 12,
                height: 64,
                width: 93,
                right: 368
            },
            systemTime: '',// 系统时间
            scrollTop: 0,
            cityInfo: ''
        }
    },
    computed: {
        paddingTop_() {
            let paddingTop = 0
            // #ifdef H5
            paddingTop = this.menuButtonInfo.top
            // #endif
            return paddingTop
        },
        titleMode_() {
            return this.titleLayer_.mode || 'center'
        },
        paddingLeft_() {
            let paddingLeft = 0
            return paddingLeft
        },
        leftWidth_() {
            if (this.mode_ === 'style1' && this.titleMode_ === 'left') {
                return 375 - this.menuButtonInfo.right
            }
            return 375 - this.menuButtonInfo.right + this.menuButtonInfo.width
        },
        rightWidth_() {
            return 375 - this.menuButtonInfo.right + this.menuButtonInfo.width
        },
        nowrap_() {
            return Number(this.extra_.nowrap) === 1
        },
        height_() {
            let navHeight = this.menuButtonInfo.height + 25 + uni.upx2px(16)
            if (this.nowrap_) {
                navHeight += uni.upx2px(32)
                navHeight += this.menuButtonInfo.height
            }
            return `${navHeight}px`
        },
        inputRaduis_() {
            return this.menuButtonInfo.height
        },
        fixedHeight_() {
            return this.extra_.fixedHeight || 'inherit'
        },
        // 如果maxHex_为0,类似开启了沉浸式，这边要做背景颜色渐变
        maxHex_() {
            const rgb = this.outerLayer_.backgroundColor.replace(/(?:\(|\)|rgba|RGBA)*/g, '').split(',')
            return Number(rgb.pop())
        },
        hex_() {
            const navHeight = parseInt(this.height_)
            const hex = ((this.scrollTop / (this.scrollTop + 2 * navHeight)) * 1.15).toFixed(2)
            const maxHex = this.maxHex_ === 0 ? 1 : this.maxHex_
            return hex >= maxHex ? maxHex : hex
        },
        bgColor_() {
            if (this.fixedHeight_ !== '0' && this.maxHex_ !== 0) return this.outerLayer_.backgroundColor
            const rgb = this.outerLayer_.backgroundColor.replace(/(?:\(|\)|rgba|RGBA)*/g, '').split(',').slice(0, 3)
            return `rgba(${rgb.join(',')}, ${this.hex_})`
        },
        titleColor_() {
            // 兼容旧数据
            if (String(this.titleLayer_.color).indexOf('rgb') !== -1) return this.titleLayer_.color
            // 非沉浸式
            if (Number(this.fixedHeight_) !== 0) return this.titleLayer_.color
            if (this.hex_ > 0.5) {
                const hex = this.hex_ >= this.maxHex_ ? 1 : this.hex_
                if (this.titleLayer_.color === '#fff') {
                    return this.$c.colorToRgba('#000', hex)
                } else {
                    return this.$c.colorToRgba('#fff', hex)
                }
            }
            return this.$c.colorToRgba(this.titleLayer_.color, 1 - this.hex_)
        },
        cityName_() {
            return this.curCity_.name || '定位中'
        }
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
    watch: {
        'extra_.location': {
            handler(val) {
                this.$c.throttle(async () => {
                    if (parseInt(val) === 1) {
                        this.getRegionList()
                    }
                }, 100)
            },
            immediate: true,
            deep: true
        },
        curCity_: {
            handler(val) {
                if (!Object.keys(val).length) {
                    this.getLocation()
                }
            },
            deep: true
        }
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
    .current-city {
        font-size: 28rpx;
        @include flex(row);
        align-items: center;
        white-space: nowrap;
        &__text {
            max-width: 150rpx;
            display: block;
            @include ellipsis;
        }
    }
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
    // 胶囊
    .capsule-box {
        padding-right: 7px;
    }

    &__icons {
        margin-left: 24rpx;
    }

    &__title {
        display: block;
        @include ellipsis;
        text-align: center;
        font-size: 32rpx;
        padding: 0 24rpx;
    }

    &-hd {
        position: relative;
        .home-header__title {
            padding-right: 0;
        }
    }
}
</style>
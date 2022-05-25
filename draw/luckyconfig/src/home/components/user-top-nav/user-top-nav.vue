<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-20 15:37:42
-->
<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-05 15:56:16
-->
<template>
    <view class="home-header">
        <c-fixed-menu
            v-model="showHeader"
            has-nav="false"
            :height="height_"
            :fixed-height="fixedHeight_"
            :bg-color="bgColor_"
        >
            <view
                class="flex align-center justify-between"
                :style="{padding: `${paddingTop_}px 0`, height: navHeight_}"
            >
                <view
                    class="home-header-bd"
                >
                    <view
                        class="home-header__title"
                        :style="[titleStyle_]"
                    >{{ extra_.title }}</view>
                </view>
            </view>
        </c-fixed-menu>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'
// 首页头部（仅名称和搜索）组件
import { mapState } from 'vuex'
export default {
    mixins: [userComponentMixins],
    data() {
        return {
            menuButtonInfo: {
                top: 12,
                height: 64,
                width: 112,
                right: 368
            },
            scrollTop: 0,
            showHeader: false,
            curRoute: {
                query: {}
            }
        }
    },
    computed: {
        ...mapState({
            componentsInfo_: state => state.user.componentsInfo,
            ShopTheme_: state => state.user.ShopTheme,
        }),
        followTheme_() {
            return this.extra_.followTheme || 0
        },
        themeBgColor_() {
            return this.followTheme_ ? this.$c.colorToRgba(this.colors_.theme, 1) : this.outerLayer_.backgroundColor
        },
        inputBgColor_() {
            return this.innerLayer_.bgColor || this.innerLayer_.borderColor
        },
        // 底部菜单
        list_() {
            return this.shopConfig_.menu || []
        },
        // 是否有底部菜单，没有则要显示返回按钮
        noTabbar_() {
            return this.list_.findIndex(o => {
                const routeObj = this.$c.getUrlQuery(o.app_page)
                const { query = {} } = this.curRoute
                const { query: tabQuery } = routeObj
                const isCurrent = (routeObj.path === this.curRoute.path || routeObj.path === this.curRoute.aliasPath || routeObj.path === this.curRoute.name)
                if (isCurrent) {
                    let isExit = true
                    for (const k in tabQuery) {
                        if (!this.$c.diffByObj(tabQuery[k], query[k])) {
                            isExit = false
                            break
                        }
                    }
                    return isExit
                }
                return false
            }) === -1
        },
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
            if (this.noTabbar_) {
                paddingLeft = 38 + uni.upx2px(12)
            }
            if ((this.mode_ === 'style2' && this.titleMode_ === 'center')) {
                if (!this.noTabbar_) {
                    paddingLeft += 12
                }
            }
            return paddingLeft
        },
        titleMaxWidth_() {
            let titleMaxWidth = uni.upx2px(160)
            // #ifndef H5
            if (this.titleMode_ === 'center') {
                titleMaxWidth = uni.getSystemInfoSync().windowWidth - this.menuButtonInfo.right + this.menuButtonInfo.width
            } else {
                if (this.mode_ === 'style1') {
                    titleMaxWidth = 0
                } else {
                    titleMaxWidth = uni.getSystemInfoSync().windowWidth - this.menuButtonInfo.right + this.menuButtonInfo.width
                }
            }
            // #endif
            return titleMaxWidth
        },
        height_() {
            let navHeight = this.menuButtonInfo.height + 2 * this.paddingTop_
            // #ifdef MP
            navHeight += uni.upx2px(16)
            // #endif
            return navHeight + 'px'
        },
        navHeight_() {
            let navHeight = this.height_
            // #ifdef MP
            navHeight = this.menuButtonInfo.height + 'px'
            // #endif
            return navHeight
        },
        fixedHeight_() {
            if (this.ShopTheme_ !== 'ShopTheme7') {
                return 'inherit'
            }
            const userHeader = this.componentsInfo_.find(o => o.cmptId === 'user-header')
            const mode = userHeader.content.find(o => o.pro === 'mode') || {}
            return mode.value === 'style2' ? '0' : 'inherit'
        },
        maxHex_() {
            const rgb = this.outerLayer_.backgroundColor.replace(/(?:\(|\)|rgba|RGBA)*/g, '').split(',')
            return Number(rgb.pop())
        },
        hex_() {
            const navHeight = parseInt(this.height_)
            const hex = ((this.scrollTop / (this.scrollTop + 2 * navHeight)) * 1.15).toFixed(2)
            return hex >= this.maxHex_ ? this.maxHex_ : hex
        },
        bgColor_() {
            if (this.fixedHeight_ !== '0') return this.themeBgColor_
            const rgb = this.themeBgColor_.replace(/(?:\(|\)|rgba|RGBA)*/g, '').split(',').slice(0, 3)
            return `RGBA(${rgb.join(',')}, ${this.hex_})`
        },
        titleColor_() {
            return this.outerLayer_.color
        },
        titleStyle_() {
            let titleSize = (this.titleLayer_.size || 32) / 2
            let fontWeight = 'bold'
            // #ifdef MP
            let maxSize = this.height_ / 2
            maxSize = maxSize > 28 ? maxSize : 28
            titleSize = titleSize > maxSize ? maxSize : titleSize
            fontWeight = 400
            // #endif
            return {
                color: this.titleColor_,
                maxWidth: `${this.mode_ !== 'style2' || this.titleMode_ !== 'left' ? '100%' : (this.titleMaxWidth_ + 'px')}`,
                fontSize: titleSize + 'px',
                fontWeight,
                textAlign: this.titleMode_
            }
        },
        backBgColor_() {
            const rgb = this.bgColor_.replace(/(?:\(|\)|rgba|RGBA)*/g, '').split(',').slice(0, 3)
            return `rgba(${rgb.join(',')}, 0.5)`
        }
    },
    // beforeDestroy() {
    //     uni.$off('pageScroll')
    // },
    created() {
        // #ifdef H5
        this.curRoute = this.$Route
        // #endif
        // #ifndef H5
        this.$nextTick(() => {
            this.curRoute = this.$Route
        })
        // #endif
        uni.$on('pageScroll', (e) => {
            if (this.curRoute.name === this.$Route.name) {
                const scrollTop = e.scrollTop - 10
                this.scrollTop = scrollTop > 0 ? scrollTop : 0
            }
        })
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
        this.showHeader = true
    },
    methods: {
    }
}
</script>

<style lang="scss">
.home-header {
    &__title {
        display: block;
        @include ellipsis;
        text-align: center;
        font-size: 30rpx;
        padding: 0 24rpx;
    }

    &__back {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        @include flex(row);
        align-items: center;
        justify-content: center;
        @include abs(50%, null, null, 8px);
        transform: translateY(-50%);
        & + .home-header__title {
            padding: 0;
        }
    }
    &__icon {
        transform: rotate(180deg);
    }

    &-hd {
        position: relative;
        .home-header__title {
            padding-right: 0;
        }
    }

    &-bd {
        flex: 1;
    }
    /deep/ .c-top-menu__fixed {
        width: 375px;
        margin: 0;
    }
}
</style>

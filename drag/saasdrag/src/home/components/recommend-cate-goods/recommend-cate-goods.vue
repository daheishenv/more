<template>
    <view class="home-recommend-cate-goods">
        <view
            class="classify"
            :class="{isTop: isTop}"
            :style="{backgroundColor: backgroundColor_, top: classifyTop + 'px'}"
        >
            <scroll-view
                :scroll-x="true"
                :scroll-into-view="scrollItem_"
                class="scrollView"
                :scroll-with-animation="true"
                :show-scrollbar="false"
                @scroll="scroll"
            >
                <view
                    v-for="(item, i) in cData"
                    :id="`classify${i}`"
                    :key="i"
                    class="item"
                    :class="{active: active === i }"
                    @click="handleChange(item, i)"
                >
                    <c-colors
                        radius="50"
                        type="button"
                        :theme="active == i ? ['t|0.1', 't'] : ['#f5f5f5', '#333']"
                        :pro="['bgc', 'c']"
                    >
                        <c-button
                            height="50"
                        >{{ item.cat_name }}</c-button>
                    </c-colors>
                    <!-- <c-colors :theme="[ active === i ? 't' : '#333']">
                        <view class="label">
                            <text>{{ item.cat_name }}</text>
                        </view>
                    </c-colors> -->
                </view>
            </scroll-view>
            <!-- <c-colors
                class="bar"
                radius="4"
                :theme="['t']"
                :pro="['bgc']"
                :style="{left: activeLeft}"
            >
                <view class="box"></view>
            </c-colors> -->
        </view>
        <view
            v-if="cFinish"
            :style="{minHeight: minHeight + 'px'}"
        >
            <gc-recommend-goods
                title="false"
                :ajax-params="ajaxParams"
                :ajax-name="ajaxName"
                showShoppingCart="false"
                :bg-color="outerLayer_.backgroundColor"
            />
        </view>
    </view>
</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页底部分类推荐组件
export default {
    name: 'HomeRecommendCateGoods',
    mixins: [homeComponentMixins],
    data() {
        return {
            itemArr: [],
            isScrollLeft: 0,
            active: -1,
            activeLeft: '24rpx',
            ajaxParams: {
                goods_category_id: '',
                limit: 10
            },
            ajaxName: 'recommendGoods',
            curRouteName: '',
            isTop: '',
            opacity: '',
            classifyTop: 0,
            classifyScrollTop: 0,
            minHeight: 0,
            scrollTop: 0
        }
    },
    computed: {
        backgroundColor_() {
            return this.classifyTop ? `rgba(255,255,255, 1)` : this.outerLayer_.backgroundColor 
        },
        scrollItem_() {
            return `classify${this.active - 1}`
        }
    },
    watch: {
        scrollItem_: {
            handler() {
                this.setActiveLeft()
            },
            immediate: true
        }
    },
    mounted() {
        this.curRouteName = this.$Route.name
        uni.$on('pageScroll', (e) => {
            this.curRouteName === this.$Route.name && this.calcEleLocal(e)
        })
    },
    methods: {
        setActiveLeft() {
            const item = this.itemArr[this.active]
            this.activeLeft = item ? (item.width / 2 + item.left - this.isScrollLeft) + 'px' : 0
        },
        async calcEleLocal(e) {
            this.scrollTop = e.scrollTop
            const data = await this.$c.getRect.call(this, '.home-recommend-cate-goods')
            // 获取子节点这边的this要传入最外层的this（也就是this.$root）  这样子才能在dom树中找到对应组件
            let headData = await this.$c.getRect.call(this.$root, '#home-0-header')
            headData = headData || {
                height: 0,
                top: 0
            }
            const tabData = await this.$c.getRect.call(this.$root, '#home-tabbar')
            this.classifyScrollTop = data.top - headData.top - headData.height
            this.minHeight = uni.getSystemInfoSync().screenHeight - (tabData?.height || 0) - headData.height - uni.upx2px(88)
            this.isTop = data.top <= headData.height + 5
            this.classifyTop = this.isTop ? headData.height : 0
        },
        handleChange(item, i) {
            if (this.active !== i) {
                uni.pageScrollTo({
                    scrollTop: this.classifyScrollTop,
                    duration: 0
                })
            }
            this.active = i
            this.ajaxParams.goods_category_id = item.cat_id
            if (this.ajaxParams.goods_category_id === -1) {
                this.ajaxName = 'recommendGoods'
            } else {
                this.ajaxName = 'goodsSearchGoodsList'
            }
        },
        scroll({
            detail
        }) {
            const {
                scrollLeft
            } = detail
            this.isScrollLeft = scrollLeft
            const item = this.itemArr[this.active]
            this.activeLeft = item ? (item.width / 2 + item.left - scrollLeft) + 'px' : 12 + 'px'
        },
        // 获取左移动位置
        async getTabItemWidth() {
            // 修复app bug
            const data = await this.$c.getRect.call(this, '.classify .item')
            if (!data) return
            const itemArr = data.map(o => {
                return {
                    width: o.width,
                    left: o.left
                }
            })
            this.itemArr = itemArr
            this.setActiveLeft()
        },
        finishData(val) {
            if (!val || val.length === 0) return
            this.handleChange(val[0], 0)
            this.$nextTick(() => {
                this.getTabItemWidth()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.classify {
    padding: 12rpx;
    @include tst;
    width: 100%;
    white-space: nowrap;
    font-size: 0;
    position: sticky;
    top: 0;
    z-index: 2;
    .item {
        padding: 8rpx 12rpx;
        text-align: center;
        display: inline-block;

        .label {
            font-size: 32rpx;
            line-height: 44rpx;
            font-weight: bold;
        }
    }

    .bar {
        opacity: 0;
        display: block;
        margin-left: -32rpx;
        border-radius: 4rpx;
        transform: translateY(500%);
        // transition: all 0.6s cubic-bezier(0.8, -0.07, 0.32, 1.61);
        // transition: all 0.6s cubic-bezier(0.8, -0.07, 0.32, 1.61);
        @include tst(all, 0.5s);
        @include abs(null, null, 4rpx, 24rpx);

        .box {
            width: 64rpx;
            height: 8rpx;
        }
    }

    &.isTop {
        .item {
            .sub {
                opacity: 0;
            }
        }

        .bar {
            transform: translateY(0);
            opacity: 1;
        }
    }
}
</style>

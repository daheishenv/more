<style lang="scss" scoped>
.category {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-header {
        position: relative;
        width: 100%;
        flex-shrink: 0;
        border-color: #ededed;
        &::after {
            content: '';
            position: absolute;
            right: -50%;
            bottom: 0;
            left: -50%;
            border-bottom: 1px solid;
            border-color: inherit;
            transform: scale(0.5);
            transform-origin: 50% 50% 0;
            box-sizing: border-box;
        }
    }
    &-content {
        flex: 1;
    }
    &-flex {
        display: flex;
        align-items: flex-start;
    }
    &__scroll {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24rpx 32rpx 0 32rpx;
        &-item {
            width: 100%;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            padding: 24rpx 0 16rpx 0;
            margin-bottom: 24rpx;
            min-height: 230rpx;
            opacity: 0;
            transform: translateY(-100rpx);
            animation: up 0.6s cubic-bezier(0.16, 0.82, 0.32, 1.06) forwards;
            .list {
                width: 100%;
                padding: 0 24rpx;
            }
        }
    }
    .button-fix {
        height: 50px;
        height: calc(50px + constant(safe-area-inset-botttom));
        height: calc(50px + env(safe-area-inset-botttom));
    }
}
@keyframes up {
    0% {
        opacity: 0;
        transform: translateY(100rpx);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
<template>
    <view class="category">
        <view class="category-header">
            <c-top-search
                id="searchRef"
                link-url="/goods/search/index"
            ></c-top-search>
        </view>
        <view
            id="content"
            class="category-content"
        >
            <template v-if="scrollHeight!=0">
                <view
                    :style="{height:scrollHeight}"
                    class="category-flex"
                >
                    <scroll-view
                        style="height:100%;"
                        scroll-y
                        @scrolltolower="getPage"
                    >
                        <view
                            id="category__scroll"
                            class="category__scroll"
                        >
                            <view
                                v-for="i in fistMenuList"
                                :key="i.cat_id"
                                class="category__scroll-item"
                            >
                                <sub-home-cate-list-title
                                    :type="1"
                                    :title="i.cat_name"
                                    :is-demo="isDemo"
                                    :car-id="i.cat_id"
                                />
                                <view class="list">
                                    <sub-home-cate-list
                                        :is-demo="isDemo"
                                        :type="2"
                                        :list="i.sub"
                                    />
                                    <c-no-data
                                        v-if="!i.sub.length"
                                        :show-img="true"
                                        :text="`${i.cat_name || ''}暂无数据`"
                                        icon="common/no-order.png"
                                    ></c-no-data>
                                </view>
                            </view>
                        </view>
                        <c-no-data
                            v-if="lodingText"
                            :show-img="noData_"
                            :text="lodingText"
                            icon="common/no-order.png"
                        ></c-no-data>
                    </scroll-view>
                </view>
            </template>
        </view>
        <view class="button-fix">
            <c-tabbar id="tabBarRef" />
        </view>
    </view>
</template>
<script>
import mixin from './mixins'
export default {
    mixins: [mixin],
    data() {
        return {
            init: 4,
            busy: false,
            lodingText: '数据加载中', // 请求中底部显示的文案
            noData: false,
            treeIndex: 0,
            categoryList: [],
            concatCategory: [],
            fistMenuList: []
        }
    },
    computed: {
        menuList_() {
            return this.menuList || []
        },
        child_category_() {
            return this.config.cateData?.child_category || []
        },
        reqIndex_() {
            return this.config.reqIndex
        },
        noData_() {
            return (this.menuList_.length === 0 || this.reqIndex_ <= 2) && this.lodingText === '暂无数据'
        }
    },
    watch: {
        reqIndex_: {
            immediate: true,
            async handler(navl) {
                this.busy = false
                const menu = this.menuList_[this.treeIndex - 1]
                if (menu && navl !== 0) {
                    menu.sub = this.child_category_ || []
                    this.fistMenuList.push(menu)
                }
                const needLoad = await this.checkScroll()
                if (needLoad) { // 首次未占满屏
                    setTimeout(() => {
                        this.getPage()
                    }, 300)
                } else {
                    if (this.init <= 3) { // 每次下拉加载三条
                        setTimeout(() => {
                            this.init++
                            this.getPage()
                        }, 300)
                    } else {
                        this.init = 1
                    }
                }
            }
        }
    },
    methods: {
        getPage(a) {
            if (this.treeIndex > this.menuList_.length - 1) {
                this.lodingText = this.menuList_.length > 0 ? '- 我是有底线的 -' : '暂无数据'
                return
            }
            if (this.busy) {
                console.log('--------busy---------------')
                return
            }
            this.busy = true
            const item = this.menuList_[this.treeIndex]
            this.notify('handleChange1', item.cat_id)
            this.treeIndex++
            this.lodingText = '数据加载中'
        },
        // async addData() {
        //     if (this.busy) return
        //     this.busy = true
        //     if (this.concatCategory.length > 0) {
        //         setTimeout(() => {
        //             const item = this.concatCategory.shift()
        //             this.categoryList.push(item)
        //             this.busy = false
        //             this.addData()
        //         }, 200)
        //     } else {
        //         this.busy = false
        //         const needLoad = await this.checkScroll()
        //         if (needLoad) {
        //             this.getPage()
        //         }
        //     }
        // },
        async checkScroll() {
            const res = await this.$c.getRect.call(this, '.category__scroll')
            if (res) {
                const scrollHeight = res.height
                return parseInt(this.scrollHeight) + 200 > scrollHeight
            }
            return true
        }
    }
}
</script>


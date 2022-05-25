<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: czq
 * @Date: 2021-11-29 17:06:09
 * @LastEditors: czq
 * @LastEditTime: 2021-12-01 14:53:35
-->
<template>
    <view class="category-style6">
        <c-fixed-menu height="178">
            <c-top-search
                id="searchRef"
                link-url="/goods/search/index"
            ></c-top-search>
            <view
                id="content"
                class="category-content bg-fff"
            >
                <scroll-view
                    scroll-x
                    class="menu-list"
                    :scroll-into-view="currentView_"
                    scroll-with-animation
                >
                    <view
                        v-for="(item, index) in childCategory_"
                        :id="'type' + index"
                        :key="index"
                        class="menu-item"
                        @click="selectItem(index)"
                    >
                        <c-colors
                            :theme="menuIndex === index ? ['#fff', 't'] : ['#333', '#f5f5f5']"
                            :pro="['c', 'bgc']"
                            radius="32"
                        >
                            <text class="menu-item-name">{{ item.cat_name }}</text>
                        </c-colors>
                    </view>
                </scroll-view>
                <view
                    class="menu-more flex pr24"
                    @click="handleMore"
                >
                    <c-icons
                        type="icon-gengduo"
                        size="28"
                    />
                    <view class="">分类</view>
                </view>
            </view>
        </c-fixed-menu>
        <!-- 头部筛选弹框内容 -->
        <view
            class="filter-content"
            :class="{'filter-content__active': typeFlag}"
        >
            <view class="brand-box">
                <scroll-view
                    class="choice"
                    scroll-y
                    :scroll-into-view="choiceView_"
                    scroll-with-animation
                >
                    <view
                        v-for="(item, index) in childCategory_"
                        :id="'choice' + index"
                        :key="index"
                        class="choice-item"
                        @click="handleSelect(index)"
                    >
                        <c-colors
                            :theme="choiceIndex === index ? ['t', 't|0.06', 't' ] : ['#333', '#f5f5f5', '#f5f5f5']"
                            :pro="['c', 'bgc', 'bdc']"
                            radius="8"
                        >
                            <view
                                class="brand-item"
                                :class="{'brand-item__active': choiceIndex === index}"
                            >
                                <c-colors
                                    :theme="choiceIndex === index ? ['t', 't' ] : ['#333', '#f5f5f5']"
                                    :pro="['c', 'bdc']"
                                >
                                    <view class="brand-item__icon">
                                        <c-icons
                                            size="24"
                                            class="brand-item__icon--active"
                                            type="icon-queding"
                                        />
                                    </view>
                                    <text>{{ item.cat_name }}</text>
                                </c-colors>
                            </view>
                        </c-colors>
                    </view>
                </scroll-view>
                <view class="pt12">
                    <c-colors
                        :theme="['t', '#fff']"
                        :pro="['bgc', 'c']"
                        radius="16"
                    >
                        <c-button @click="setQuery">确定</c-button>
                    </c-colors>
                </view>
            </view>
            <c-mask
                show
                position="fixed"
                z-index="1"
                @click="typeFlag = false"
            />
        </view>
        <!-- 产品列表 -->
        <gc-list
            mode="column"
            :no-data="noData_"
            :loding-text="lodingText_"
            :list="pageList_"
            show-shopping-cart="false"
            img-size="340,200"
            radius="16"
            img-radius="16,0"
            :load-more="true"
        />
        <!-- <c-no-data
            v-if="lodingText"
            :show-img="noData"
            size="400"
            :text="lodingText"
            icon="common/no-order.png"
        ></c-no-data> -->
        <c-tabbar id="tabBarRef" />
    </view>
</template>
<script>
import mixin from './mixins'
export default {
    mixins: [mixin],
    props: {
        pageConfig: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            menuIndex: -1,
            typeFlag: false,
            choiceIndex: 0
        }
    },
    computed: {
        menuList_() {
            return this.menuList || []
        },
        currentView_() {
            return 'type' + this.menuIndex
        },
        choiceView_() {
            return 'choice' + this.choiceIndex
        },
        pageList_() {
            return this.pageConfig.pageList || []
        },
        noData_() {
            return this.pageConfig.noData || false
        },
        lodingText_() {
            return this.pageConfig.lodingText || ''
        },
        cateData_() {
            return this.config.cateData || {}
        },
        childCategory_() {
            return this.cateData_.child_category || []
        }
    },
    watch: {
        menuIndex: {
            handler(val) {
                this.notify('handleChange2', this.childCategory_[val].cat_id)
            }
        },
        menuList_: {
            handler(val) {
                if (val.length) {
                    if (val[0].cat_id) {
                        this.notify('handleChange1', val[0].cat_id)
                    }
                }
            },
            immediate: true,
            deep: true
        },
        childCategory_: {
            handler(val) {
                if (val.length) {
                    this.menuIndex = 0
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        selectItem(index) {
            this.menuIndex = index
            this.choiceIndex = this.menuIndex
        },
        handleMore() {
            this.typeFlag = !this.typeFlag
        },
        handleSelect(index) {
            this.choiceIndex = index
        },
        setQuery() {
            this.menuIndex = this.choiceIndex
            this.typeFlag = false
        }

    }
}
</script>

<style lang="scss" scoped>
.category-style6 {
    height: 100%;
    display: flex;
    flex-direction: column;
    /deep/ .c-top-menu__fixed {
        top: calc(65px + env(safe-area-inset-top));
    }
    .category-content {
        position: relative;
    }
    .menu-list {
        padding: 8rpx 120rpx 8rpx 12rpx;
        white-space: nowrap;

        .menu-item {
            display: inline-block;
            padding: 8rpx 12rpx;

            &-name {
                padding: 0 24rpx;
                border-radius: 8rpx;
                display: block;
                font-size: 24rpx;
                font-weight: 400;
                line-height: 50rpx;
            }
        }
    }
    .menu-more {
        @include abs(0, 0);
        height: 100%;
        align-items: center;
        z-index: 99;
    }
    .filter-content {
        z-index: -1;
        padding-top: 300rpx;

        opacity: 0;
        @include tst();
        @include iosSafeArea(top, 44px, top);
        position: fixed;
        top: var(--window-top);
        left: 0;
        width: 100%;

        .choice {
            max-height: 400rpx;

            &-item {
                width: calc((100% - 48rpx) / 3);
                margin-left: 24rpx;
                margin-bottom: 24rpx;
                display: inline-block;

                &:nth-child(3n + 1) {
                    margin-left: 0;
                }
            }
        }

        .uni-mask {
            z-index: 1;
        }

        .brand-box {
            background-color: #fff;
            padding: 24rpx;
            position: relative;
            border-top: solid #ededed 0.5px;
            z-index: 2;
            transform: translateY(-100%);
            @include tst();

            .brand-item {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 72rpx;
                border-radius: 8rpx;
                position: relative;
                @include tst();
                overflow: hidden;
                border: 1px solid transparent;
                border-color: inherit;
                &__icon {
                    opacity: 0;
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-bottom: 36rpx solid;
                    border-bottom-color: inherit;
                    border-left: 40rpx solid transparent;
                    bottom: 0;
                    right: 0;

                    &--active {
                        position: absolute;
                        top: 6px;
                        left: -12px;
                    }
                }

                &.brand-item__active {
                    border: 1px solid;
                    border-color: inherit;

                    .brand-item__icon {
                        opacity: 1;
                        color: #fff;
                    }
                }
            }
        }

        &__active {
            opacity: 1;
            z-index: 2;
            pointer-events: auto;

            .brand-box {
                transform: translateY(0);
            }
        }
    }
    /deep/ .price-com__market::before {
        bottom: 0;
    }
}
</style>


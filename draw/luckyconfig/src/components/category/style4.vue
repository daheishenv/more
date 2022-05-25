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
        background-color: white;
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
        &-list {
            width: 100%;
            padding-top: 8rpx;
        }
        &-branch {
            padding-top: 8rpx;
        }
    }
    .button-fix {
        height: 50px;
        height: calc(50px + constant(safe-area-inset-botttom));
        height: calc(50px + env(safe-area-inset-botttom));
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
                    <sub-home-scroll-tree
                        v-model="treeActiveId"
                        is-border
                        :loading="config.topLoading"
                        :remote="menuList"
                        style="height:100%"
                        @change="handleTreeChange"
                    />
                    <scroll-view
                        style="height:100%;"
                        scroll-y
                    >
                        <view class="category__scroll">
                            <c-image
                                :src="config.cateData.touch_catads"
                                width="526"
                                height="180"
                                mode="aspectFill"
                                radius="16"
                            ></c-image>
                            <view class="category__scroll-list">
                                <sub-home-cate-list
                                    :is-demo="isDemo"
                                    :type="1"
                                    :list="config.cateData.child_category"
                                />
                                <view
                                    v-if="hasBranch_"
                                    class="category__scroll-branch"
                                >
                                    <sub-home-cate-list-title
                                        :type="2"
                                        :title="config.cateData.goods_branch.title"
                                        :is-demo="isDemo"
                                    />
                                    <!-- <view class="category-goods__title">
                                        <view class="title-middle">{{ config.cateData.goods_branch.title }}</view>
                                    </view> -->
                                    <sub-home-cate-list
                                        :is-demo="isDemo"
                                        :type="1"
                                        :is-branch="true"
                                        :pt="16"
                                        :list="config.cateData.goods_branch.data"
                                    />
                                </view>
                            </view>
                            <c-no-data
                                v-if="isNoData_"
                                :show-img="true"
                                text="暂无数据"
                                icon="common/no-order.png"
                            ></c-no-data>
                        </view>
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
    mixins: [mixin]
}
</script>


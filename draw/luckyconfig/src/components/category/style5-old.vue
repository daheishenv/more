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
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24rpx 32rpx 0 32rpx;
        &-list {
            width: 100%;
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
                        :remote="menuList"
                        :loading="config.topLoading"
                        style="height:100%"
                        @change="handleTreeChange"
                    />
                    <scroll-view
                        style="height:100%;"
                        scroll-y
                    >
                        <view class="category__scroll">
                            <view class="category__scroll-list">
                                <sub-home-cate-list
                                    :is-demo="isDemo"
                                    :type="3"
                                    :pt="0"
                                    :list="config.cateData.child_category"
                                />
                                <c-no-data
                                    v-if="isNoData_"
                                    :show-img="true"
                                    text="暂无数据"
                                    icon="common/no-order.png"
                                ></c-no-data>
                            </view>
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
    mixins: [mixin],
    computed: {
        isNoData_() {
            if (!this.config.childLoading) {
                const child_category = this.config.cateData.child_category
                return !child_category || child_category?.length === 0
            }
            return false
        }
    }
}
</script>


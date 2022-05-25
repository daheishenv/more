<style lang="scss" scoped>
.category {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    &-header {
        width: 100%;
        flex-shrink: 0;
        border-bottom: 1rpx solid #ededed;
    }
    &-content {
        flex: 1;
    }
    &-flex {
        display: flex;
        align-items: flex-start;
    }
    &-border {
        border-right: 1rpx solid #ededed;
    }
    &-goods {
        padding: 23rpx 31rpx;
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
                        :remote="menuList"
                        :config="config"
                        :loading="config.topLoading"
                        :child-id.sync="childTreeActiveId"
                        :width="190"
                        cmpt-style="style4"
                        style="height:100%"
                        @change="handleTreeChange"
                    >
                    </sub-home-scroll-tree>
                    <scroll-view
                        style="height:100%;"
                        scroll-y
                    >
                        <view class="category-goods">
                            <c-image
                                :height="180"
                                radius="16"
                                :src="getTypeImg_"
                                mode="aspectFill"
                            ></c-image>
                            <sub-home-cate-list
                                :is-demo="isDemo"
                                :pt="40"
                                :type="1"
                                :list="getTypeList"
                            />
                            <c-no-data
                                v-if="!getTypeList.length && !config.childLoading"
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


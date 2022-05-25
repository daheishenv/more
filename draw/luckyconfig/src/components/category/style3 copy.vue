<style lang="scss" scoped>
.category {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    &-header {
        width: 100%;
        flex-shrink: 0;
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
    &-scroll {
        height: 100%;
        background: rgba(245, 245, 245, 1);
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
        <sub-home-cate-header-type
            v-model="treeActiveId"
            :list="menuList"
            @change="handleTreeChange"
        />
        <view
            id="content"
            class="category-content"
        >
            <template v-if="scrollHeight!=0">
                <view
                    :style="{height:scrollHeight}"
                    class="category-flex"
                >
                    <view class="category-scroll">
                        <sub-home-scroll-tree
                            v-model="childTreeActiveId"
                            :loading="config.childLoading"
                            :remote="config.cateData.child_category"
                            cmpt-style="style2"
                            style="height:100%"
                            :width="190"
                        />
                    </view>

                    <scroll-view
                        style="height:100%;"
                        scroll-y
                    >
                        <view class="category-goods">
                            <c-image
                                :height="175"
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


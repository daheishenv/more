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
        &__title {
            display: flex;
            justify-content: center;
            // padding-top: 8rpx;
            .title-middle {
                position: relative;
                font-size: 28rpx;
                color: rgba(102, 102, 102, 1);
                &::after,
                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    width: 46rpx;
                    height: 1rpx;
                    background: #d8d8d8;
                }
                &::before {
                    left: -16rpx;
                    transform: translate(-100%, -50%) scaleY(0.5);
                }
                &::after {
                    right: -16rpx;
                    transform: translate(100%, -50%) scaleY(0.5);
                }
            }
        }
    }
    &-image {
        padding-bottom: 40rpx;
    }
    &-branch {
        padding-top: 8rpx;
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
                        :width="190"
                        style="height:100%"
                        @change="handleTreeChange"
                    />
                    <scroll-view
                        style="height:100%;"
                        scroll-y
                    >
                        <view class="category-goods">
                            <view class="category-image">
                                <c-image
                                    :height="180"
                                    radius="16"
                                    :src="config.cateData.touch_catads"
                                    mode="aspectFill"
                                ></c-image>
                            </view>

                            <block
                                v-for="i in config.cateData.child_category"
                                :key="i.cat_id"
                            >
                                <view
                                    v-if="i.sub.length"
                                    class="category-goods__title"
                                >
                                    <view class="title-middle">{{ i.cat_name }}</view>
                                </view>
                                <sub-home-cate-list
                                    :is-demo="isDemo"
                                    :type="1"
                                    :list="i.sub"
                                />
                                <sub-home-cate-list
                                    v-if="!i.sub.length"
                                    :is-demo="isDemo"
                                    :type="1"
                                    :list="[
                                       i
                                    ]"
                                />
                            </block>
                            <view
                                v-if="hasBranch_"
                                class="category-branch"
                            >
                                <view class="category-goods__title">
                                    <view class="title-middle">{{ config.cateData.goods_branch.title }}</view>
                                </view>
                                <sub-home-cate-list
                                    :is-demo="isDemo"
                                    :type="1"
                                    :is-branch="true"
                                    :pt="16"
                                    :list="config.cateData.goods_branch.data"
                                />
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


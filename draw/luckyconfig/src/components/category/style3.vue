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
        &__header {
            padding: 8rpx 24rpx 0 24rpx;
        }
        &__type {
            width: 512rpx;
        }
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
        <view style="height:128rpx">
            <sub-home-cate-header-type
                v-model="treeActiveId"
                :list="menuList"
                @change="handleTreeChange"
            />
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
                    <view class="category-scroll">
                        <sub-home-scroll-tree
                            v-model="childTreeActiveId"
                            :loading="config.childLoading"
                            :remote="config.cateData.child_category"
                            style="height:100%"
                            :width="190"
                            @clear="changeClear"
                        />
                    </view>

                    <scroll-view
                        style="height:100%;"
                        scroll-y
                        @scrolltolower="reachBottomFn"
                    >
                        <view class="category-goods">
                            <view class="category-goods__header">
                                <c-image
                                    :height="185"
                                    radius="16"
                                    :src="getTypeImg_"
                                    mode="aspectFill"
                                ></c-image>
                                <view class="category-goods__type">
                                    <sub-home-cate-header-type
                                        v-model="treeActiveId3"
                                        :list="getTypeList"
                                        cmpt-style="style2"
                                        :scroll-index="1"
                                    />
                                </view>
                            </view>
                            <gc-list
                                mode="row"
                                full="true"
                                :list="pageList_"
                                :no-padding="true"
                                spec-type="scroll"
                                radius="0"
                                bg-color="#fff"
                                @handleAddCar="!isDemo?handleAddCar($event):''"
                            ></gc-list>
                            <c-no-data
                                v-if="pageConfig.lodingText"
                                :show-img="noData_"
                                :text="lodingText_"
                            ></c-no-data>
                        </view>
                    </scroll-view>
                </view>
            </template>
        </view>
        <view class="button-fix">
            <c-tabbar id="tabBarRef" />
        </view>
        <!-- 选择规格 -->
        <gc-select-spec
            v-model="specFlag"
            :config="specData"
        />
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
            treeActiveId3: -1,
            specFlag: false, // 选择规格
            specData: {} // 规格数据
        }
    },
    computed: {
        hasTypeList() {
            return this.getTypeList && this.getTypeList.length > 0
        },
        pageList_() {
            return this.pageConfig.pageList || []
        },
        noData_() {
            if (this.config.childLoading) {
                return false
            } else {
                return this.hasTypeList && !this.config.childLoading ? this.pageConfig.noData : true
            }
        },
        lodingText_() {
            if (this.config.childLoading) {
                return '数据加载中'
            } else {
                return this.hasTypeList && !this.config.childLoading ? this.pageConfig.lodingText : '暂无数据'
            }
        }
    },
    watch: {
        treeActiveId3(nval) {
            this.notify('handleChange2', nval)
        }
    },
    methods: {
        reachBottomFn() {
            this.notify('reachBottomFn')
        },
        changeClear() {
            this.notify('changeClear')
        },

        handleAddCar(e) {
            console.log(e)
            const { detail: { specFlag = false, specData = {} } } = e
            this.specFlag = specFlag
            this.specData = specData
        }
    }
}
</script>


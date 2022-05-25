<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sky
 * @Date: 2021-09-14 11:14:15
-->
<template>
    <view class="">
        <view
            v-if="cFinish && cData_.length"
            class="home-category"
            :style="[outerLayer_]"
        >
            <scroll-view
                :scroll-x="true"
                :scroll-with-animation="true"
                :show-scrollbar="false"
            >

                <view class="home-category__list">
                    <view
                        v-for="(item, index) in cData_"
                        :id="'scrollItem' + index"
                        :key="index"
                        class="home-category__item"
                    >
                        <text
                            :style="[innerLayer_]"
                            class="home-category__text"
                            @tap="handleTap(item)"
                        >{{ item.cat_name || item.title }}</text>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[outerLayer_]"
        >
            <c-image
                :src="`skeleton-screen/${config.module}_${mode_}.png`"
                width="100%"
                mode="widthFix"
            />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'Category',
    mixins: [homeComponentMixins],
    data() {
        return {
            cData: [],

            categoryDefaultData: [
                {
                    title: '分类1',
                    name: ''
                },
                {
                    title: '分类2',
                    name: ''
                },
                {
                    title: '分类3',
                    name: ''
                },
                {
                    title: '分类4',
                    name: ''
                },
                {
                    title: '分类5',
                    name: ''
                }
            ]
        }
    },
    computed: {
        cData_() {
            return (this.config.api ? (this.cData.length ? this.cData : this.categoryDefaultData) : this.extra_.keyword) || []
        }
    },
    methods: {
        // 因为category 跟 keyword的item字段不一致，故需要根据this.config.api判断，设置调整方法
        handleTap(item) {
            // 如果没有cat_id,代表是示例数据，则不让跳转
            if (this.config.api && item.cat_id) {
                // return this.$serverJump(item)
                return this.$jump('searchList', { cat_id: item.cat_id })
            }
            this.$jump(item.type, { detailId: item.data })
        }
    }
}
</script>

<style lang='scss' scoped>
.home-category {
    height: 100%;
    &__list {
        height: 88rpx;
        @include flex(row);
        align-items: center;
        flex-wrap: nowrap;
    }
    &__item {
        padding: 0 16rpx;
    }
    &__text {
        white-space: nowrap;

        display: inline-block;
        text-align: center;
        padding: 0 16rpx;
        height: 56rpx;
        line-height: 56rpx;
        border-radius: 28rpx;
        font-size: 28rpx;
        color: rgb(255, 255, 255);
        background-color: rgba(255, 255, 255, 0.2);
    }
}
</style>

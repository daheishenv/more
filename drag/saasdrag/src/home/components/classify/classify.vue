<template>
    <view
        class="home-classify"
        :style="[outerLayer_]"
        v-if="newList_.length"
    >
        <view class="home-classify-bd">
            <view class="c-row">
                <view
                    v-for="(item, index) in newList_"
                    :key="index"
                    @tap="$jump('searchList', { cat_id: item.cat_id})"
                    class="home-classify-item"
                >
                    <view class="home-classify-img-box">
                        <c-image
                            size="100"
                            :src="item.touch_icon_img"
                        />
                    </view>
                    <view class="home-classify-item__name c-ellipsis">{{item.cat_name}}</view>
                </view>
                <view
                    class="home-classify-item"
                    v-if="hasMore_"
                    @tap="shoMore"
                >
                    <view class="home-classify-img-box">
                        <c-image
                            size="70"
                            src="home/more.png"
                            mode="aspectFit"
                        />
                    </view>
                    <view class="home-classify-item__name">更多</view>
                </view>
            </view>
            <!-- 弹出层插件 -->
        </view>
        <c-popup
            v-model="morePopups"
            mode="bottom"
            radius="24rpx 24rpx 0 0"
        >
            <view
                class="c-modal__title c-underline"
                v-if="config.cat_name"
            >{{config.cat_name}}</view>
            <view class="home-classify-modal">
                <scroll-view
                    class="home-classify__scroll"
                    scroll-y
                >
                    <view
                        class="home-classify-list"
                        v-for="(item, index) in config.data"
                        :key="index"
                    >
                        <view class="home-classify-item__title">
                            <text>{{item.cat_name}}</text>
                        </view>
                        <view class="c-row">
                            <view
                                class="home-classify-item"
                                v-for="(child, i) in item.sub"
                                :key="i"
                                @tap="$jump('searchList', { cat_id: child.cat_id})"
                            >
                                <view class="home-classify-img-box">
                                    <c-image
                                        size="110"
                                        :src="child.touch_icon_img"
                                    />
                                </view>
                                <view class="home-classify-item__name c-ellipsis">{{child.cat_name}}</view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </c-popup>
    </view>
</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins';
// 首页分类组件
export default {
    name: 'home-classify',
    mixins: [homeComponentMixins],
    computed: {
        allList_() {
            if (!this.config.data) return [];
            return [].concat(...this.config.data.map(o => o.sub));
        },
        hasMore_() {
            return this.allList_.length > 9;
        },
        newList_() {
            if (this.hasMore_) {
                return this.allList_.slice(0, 9);
            }
            return this.allList_.slice(0, 10);
        }
    },
    data() {
        return {
            morePopups: false
        }
    },
    methods: {
        shoMore() { // 显示更多
            this.morePopups = true
        },
        popupsClose() { // 弹出层关闭回调
            this.morePopups = false
        }
    }
}
</script>
<style lang="scss" scoped>
.home-classify {
    &-bd {
        background: #fff;
    }

    &-list:nth-child(n + 2) {
        border-top: 12rpx solid $bg-color;
    }

    &-item {
        width: 20%;
        padding: 12rpx;
        @include flex;
        align-items: center;
        justify-content: center;

        &__title {
            line-height: 40rpx;
            color: #333;
            font-size: 28rpx;
            font-weight: 500;
            padding: 24rpx;
        }

        &__name {
            text-align: center;
            line-height: 34rpx;
            font-size: 24rpx;
            color: #333;
            margin-top: 12rpx;
            height: 34rpx;
            width: 100%;
        }

        &-img-box {
            width: 100rpx;
            height: 100rpx;
            @include flex;
            align-items: center;
            justify-content: center;
        }
    }
    &__scroll {
        height: calc(100vh - 300rpx);
    }
}
</style>

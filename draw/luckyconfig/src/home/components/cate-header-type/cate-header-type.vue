<template>
    <div
        class="cate-type"
        :class="[cmptStyle]"
    >
        <scroll-view
            :scroll-x="true"
            scroll-with-animation
            class="cate-type__scroll"
            :scroll-into-view="currentView_"
        >
            <view class="cate-type__content">
                <view class="cate-type__guid">
                    <view
                        class="flex-guid"
                        :class="[{'is-center':list.length === 1}]"
                    >
                        <view
                            v-for="(item, index) in list"
                            :id="'type' + index"
                            :key="item.cat_id"
                            class="item"
                            :class="activeIndex_===index?'item--blur':''"
                            @click="handleType(item,index)"
                        >
                            <view class="item__view">
                                <view class="item__view-name">{{ item.cat_name }}</view>
                            </view>
                        </view>

                    </view>
                </view>
            </view>
        </scroll-view>
    </div>
</template>

<script>
export default {
    props: {
        cmptStyle: {
            type: String,
            default: 'style1'
        },
        value: {
            type: Number,
            default: 0
        },
        immediate: {
            type: Boolean,
            default: true
        },
        list: {
            type: Array,
            default() {
                return []
            }
        },
        // 从第几个开始回弹滚动
        scrollIndex: {
            type: [String, Number],
            default: 2
        }
    },
    data() {
        return {
            id: -1,
            activeIndex: -1,
            isDone: false
        }
    },
    computed: {
        activeIndex_() {
            if (this.activeIndex === -1) {
                const index = this.list.findIndex(o => o.cat_id === this.value)
                return index !== -1 ? index : 0
            }
            return this.activeIndex
        },
        currentView_() {
            let activeIndex = this.activeIndex_ - this.scrollIndex
            activeIndex = activeIndex < 0 ? 0 : activeIndex
            return 'type' + activeIndex
        }
    },
    watch: {
        list: {
            immediate: true,
            handler(val) {
                this.activeIndex = -1
                if (val.length) {
                    // this.isDone = true
                    this.handleType(val[0], 0)
                } else {
                    this.$emit('input', -1)
                }
            }
        },
        value(nval) {
            this.id = nval
        }
    },
    methods: {
        handleType(data, index) {
            if (this.activeIndex !== index) {
                this.activeIndex = index
                this.id = data.cat_id
                this.$emit('input', this.id)
                this.$emit('change', { data, index })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.flex-guid {
    display: flex;
    justify-content: space-around;
    flex: 1;
    &.is-center {
        justify-content: center;
    }
}

.cate-type {
    padding: 24rpx 24rpx;
    background-color: #ffffff;
    &.style2 {
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 8rpx !important;
        .item {
            border-radius: 4rpx;
            background-color: #f5f5f5;
            .item__view {
                height: 48rpx;
                min-width: 126rpx;
                max-width: 126rpx + 12rpx;
                .item__view-name {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                }
            }
        }
    }
    &__scroll {
        width: 100%;
    }
    &__content {
        white-space: nowrap;
        .item {
            position: relative;
            display: inline-block;
            background-color: #f5f5f5;
            margin-right: 24rpx;
            border-radius: 12rpx;
            &:last-child {
                margin-right: 0;
            }
            &__view {
                position: relative;
                height: 80rpx;
                width: 160rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                &-name {
                    font-size: 28rpx;
                    font-weight: bold;
                    color: #333333;
                    line-height: 33rpx;
                    max-width: 94%;
                    color: rgba(51, 51, 51, 1);
                    @include ellipsis;
                }
                z-index: 2;
            }

            &--blur {
                background: rgba(255, 93, 12, 0.1) !important;
                .item__view-name {
                    color: rgba(255, 93, 12, 1) !important;
                }
            }
        }
    }
    &__guid {
        display: flex;
    }
}
</style>

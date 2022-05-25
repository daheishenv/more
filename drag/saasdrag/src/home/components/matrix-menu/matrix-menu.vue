<template>
    <view
        class="home-matrix-menu"
        v-if="!noData_ && cFinish"
    >
        <view
            v-if="mode_ === 'style1'"
            class="home-matrix-menu-bd c-row"
            :style="[ outerLayer_ ]"
        >
            <!-- 固定模式 -->
            <template v-for="(item, index) in cData_">
                <view
                    :key="index"
                    class="home-matrix-menu__item p12"
                    :class="[extra_.colNum ? `col-${extra_.colNum * 2}`:'']"
                    @click="$serverJump(item)"
                >
                    <c-image
                        type="upload"
                        :src="item.img_url || '/saas/drag/matrix-menu/style1.png'"
                        :size="size"
                        :radius="innerLayer_.imgRadius"
                    />
                    <view
                        class="home-matrix-menu__name c-ellipsis"
                        :style="{color: innerLayer_.color}"
                        :class="[!item.title ? 'bright-card' : '' ]"
                    >{{ item.title }}</view>
                </view>
            </template>

        </view>
        <!-- 横向滑动 -->
        <view
            v-else
            :style="[ outerLayer_ ]"
        >
            <view class="scroll">
                <scroll-view
                    scroll-x
                    @scroll="scroll"
                >
                    <view class="c-row">
                        <view
                            v-for="(subData, index) in cData_"
                            :key="index"
                        >
                            <view class="scroll-menu">
                                <view
                                    v-for="(item, subIndex) in subData"
                                    :key="subIndex"
                                >
                                    <view
                                        class="scroll-menu__item p12"
                                        :style="[{ width: `${itemWidth_}px` }]"
                                        @click="$serverJump(item)"
                                    >
                                        <c-image
                                            type="upload"
                                            :src="item.img_url || '/saas/drag/matrix-menu/style1.png'"
                                            :size="size"
                                            :radius="innerLayer_.imgRadius"
                                        />
                                        <view
                                            class="home-matrix-menu__name c-ellipsis"
                                            :style="{color: innerLayer_.color}"
                                            :class="[!item.title ? 'bright-card' : '' ]"
                                        >{{ item.title }}</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
                <view class="dotted-box">
                    <view
                        class="dotted-list"
                        :style="[{width: `${listSize_}px`}]"
                    >
                        <view
                            class="dotted-item"
                            :style="[{left: listIndex}]"
                        ></view>
                    </view>
                </view>
            </view>
        </view>

    </view>
</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页导航栏菜单组件
export default {
    name: 'HomeMatrixMenu',
    mixins: [homeComponentMixins],
    props: {
        size: {
            type: [String, Number],
            default: 88
        }
    },
    data() {
        return {
            cData: [],
            listIndex: '0rpx'
        }
    },
    computed: {
        colNum_() {
            return this.extra_.colNum || 1
        },
        rowNum_() {
            return this.extra_.rowNum || 2
        },
        listCount_() {
            const count = Math.max(this.colNum_, Math.ceil(this.cData.length / this.rowNum_))
            return count
        },
        cData_() {
            if (this.mode_ === 'style1') {
                const count = (this.colNum_) * this.rowNum_
                return this.cData.slice(0, count)
            }
            const data = this.$c.setArrData(this.cData, this.listCount_)
            return data
        },
        pageMargin_() {
            const pageMargin = String(this.outerLayer_.margin).split(' ')[1]
            const margin = parseInt(pageMargin)
            return (isNaN(margin) ? 0 : margin) * 2
        },
        itemWidth_() {
            const unit = Math.floor((750 - this.pageMargin_ - 24) / (this.extra_.colNum))
            return uni.upx2px(unit)
        },
        listSize_() {
            const unit = (this.listCount_ - this.extra_.colNum) * 20
            console.log(uni.upx2px(unit), 'list')
            return uni.upx2px(unit)
        }

    },
    methods: {
        scroll(e) {
            const { scrollLeft } = e.detail
            const index = ((scrollLeft + 10) / this.itemWidth_) - 1
            const poor = index > 0 ? index : 0
            const unit = uni.upx2px(poor * 20)
            this.listIndex = unit + 'px'

            // const size = this.listCount_ - this.extra_.colNum
            // let index = 0
            // for (let n = 0; n < size; n++) {
            //     if (scrollLeft >= n * this.itemWidth_ && (n + 1) * this.itemWidth_ >= scrollLeft) {
            //         index = n
            //         break
            //     }
            // }
            // console.log(index, scrollLeft)
            // const unit = (index) * 10
            // this.listIndex = uni.upx2px(unit) + 'px'
        }
    }
}
</script>
<style lang="scss" scoped>
.home-matrix-menu {
    &-bd {
        @include flex(row);
        flex-wrap: wrap;
        color: #333;
    }

    &__item {
        text-align: center;
        width: 20%;
        @include flex(column);
        justify-content: center;
        align-items: center;
        @for $i from 6 through 10 {
            &.col-#{$i} {
                width: calc(100% / #{$i / 2});
            }
        }
    }

    &__name {
        margin-top: 10rpx;
        font-size: 24rpx;
        line-height: 32rpx;
        font-weight: bold;
        height: 32rpx;
        width: 100%;
    }
    // 横向滑动样式
    .scroll {
        &-menu {
            display: flex;
            &__item {
                flex-shrink: 0;
                text-align: center;
                width: 150rpx;
                @include flex(column);
                justify-content: center;
                align-items: center;
            }
        }
        .dotted {
            &-box {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 12rpx;
            }
            &-list {
                background-color: #eee;
                height: 8rpx;
                display: flex;
                align-items: center;
                position: relative;
                border-radius: 5rpx;
            }
            &-item {
                background-color: #666;
                width: 20rpx;
                height: 6rpx;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                border-radius: 3rpx;
            }
        }
    }
}
</style>

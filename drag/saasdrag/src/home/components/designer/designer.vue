<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-designer"
            :class="[
               mode_ === 'style2' ? 'home-designer-card' : '',
               mode_
            ]"
            :style="[outerLayer_]"
        >
            <view :style="[titleLayer_]">
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    :more="isMore_ ? 'designer' : ''"
                />
            </view>
            <view
                v-if="mode_ === 'style1'"
                class="home-designer-bd"
            >
                <scroll-view
                    scroll-x
                    :scroll-with-animation="true"
                >
                    <view
                        class="home-designer__list"
                        :style="[innerLayer_]"
                    >
                        <view class="home-designer-clear-pd">
                            <view
                                v-for="(item, index) in cData.list"
                                :key="index"
                                class="home-designer__item"
                                :style="[ innerLayer_ ]"
                            >
                                <view
                                    class="home-designer__box"
                                    @click="$jumpDetail('designerDetails', item.id)"
                                >
                                    <view class="img">
                                        <c-image
                                            height="180"
                                            width="240"
                                            :src="item.case_default_img"
                                            mode="aspectFill"
                                        />
                                    </view>
                                    <view class="man">
                                        <view class="header">
                                            <c-image
                                                size="96"
                                                radius="48"
                                                :src="item.user_picture_url"
                                                mode="aspectFill"
                                            />
                                        </view>
                                        <view class="text">
                                            <view class="name">
                                                <text>{{ item.username }}</text>
                                            </view>
                                            <view class="year">
                                                <text>从业{{ item.year }}年</text>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
            <template v-else-if="mode_ === 'style2'">
                <swiper
                    class="home-designer-card-swiper"
                    :current="current"
                    @change="handleSwiperChange"
                >
                    <swiper-item
                        v-for="(item, index) in cData.list"
                        :key="index"
                        class="home-designer-card__item"
                        :style="[ cardItemStyle_ ]"
                    >
                        <view
                            class="home-designer-card__content"
                            :style="[innerLayer_]"
                            @tap="$jumpDetail('designerDetails', item.id)"
                        >
                            <view class="label">
                                <view class="portrait">
                                    <c-image
                                        :src="item.user_picture_url"
                                        size="100"
                                        radius="50"
                                    />
                                </view>
                                <view class="text">
                                    <view class="name">
                                        <text>{{ item.username }}</text>
                                    </view>
                                    <view class="tags">
                                        <c-colors
                                            :pro="['bdc', 'c']"
                                            :theme="['t', 't']"
                                        >
                                            <view class="tag">{{ item.job_name }}</view>
                                        </c-colors>
                                        <c-colors
                                            :pro="['bdc', 'c']"
                                            :theme="['t', 't']"
                                        >
                                            <view class="tag">{{ `${item.year}年经验` }}</view>
                                        </c-colors>

                                    </view>
                                </view>
                                <!-- <view class="btn" :style="{backgroundColor: theme.theme}">
									<text>预约</text>
								</view> -->
                            </view>
                            <view
                                v-if="item.case && item.case.list"
                                class="imgs"
                            >
                                <block
                                    v-for="(img, im) in item.case.list"
                                    :key="im"
                                >
                                    <view
                                        v-if="im < 3"
                                        class="item"
                                    >
                                        <c-image
                                            :src="img.image"
                                            height="146"
                                            width="202"
                                            mode="aspectFill"
                                            radius="4"
                                        />
                                    </view>
                                </block>
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="ptb24">
                    <sub-home-dotted
                        v-model="current"
                        :number="cData.list.length"
                    />
                </view>
            </template>
            <view
                v-if="mode_ === 'style3'"
                class="home-designer-bd"
            >
                <view
                    class="home-designer-list"
                    :style="[innerLayer_]"
                >
                    <view
                        class="c-underline__top flex ptb36 plr24"
                        v-for="(item, index) in cData.list"
                    >
                        <c-image
                            size="168"
                            shape="circle"
                            :src="item.user_picture_url"
                            mode="aspectFill"
                        />
                        <view class="pl24 flex-1">
                            <view class="home-designer__name">
                                {{item.username}}
                                <text class="home-designer__years">{{ `从业${item.year}年` }}</text>
                            </view>
                            <view
                                v-if="item.introduction"
                                class="home-designer__summary c-ellipsis-2"
                            >
                                <view class="home-designer__decorate">
                                    <c-icons
                                        color="#333"
                                        size="18"
                                        type="icon-zhuangshifuhaozuo"
                                    ></c-icons>
                                </view>
                                {{formatText_(item.introduction)}}
                                <view class="home-designer__decorate">
                                    <c-icons
                                        color="#333"
                                        size="18"
                                        type="icon-zhuangshifuhaoyou"
                                    ></c-icons>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[brightCardLayer_]"
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
// 首页特色组件
export default {
    name: 'HomeDesigner',
    mixins: [homeComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    data() {
        return {
            current: 0
        }
    },
    computed: {
        formatText_() {
            return str => {
                const maxLen = 30
                str = str.replace(/<\/?.+?\/?>/g, '')
                return str.substr(0, maxLen) + (str.length > maxLen ? '...' : '')
            }
        },
        cardItemStyle_() {
            return this.titleLayer_.hasBg === 0 ? {
                paddingLeft: '4rpx',
                paddingRight: '4rpx'
            } : {}
        },
        // 这边需要吧margin转换成padding，不然会影响外层
        brightCardLayer_() {
            return {
                padding: this.outerLayer_.margin,
                paddingRight: '0rpx'
            }
        }
    },
    methods: {
        handleSwiperChange(event) {
            this.current = event.detail.current
            this.$emit('change', event)
        }
    }
}
</script>
<style lang="scss" scoped>
.home-designer {
    &__list {
        white-space: nowrap;
        padding: 24rpx 0;
    }
    &-clear-pd {
        padding-left: 24rpx;
    }

    &__item {
        display: inline-block;
        padding-right: 24rpx;
    }
    &__box {
        width: 240rpx;
        border-radius: 16rpx;
        overflow: hidden;
        background: #fff;
        position: relative;
        height: 336rpx;
        box-shadow: 0 0 6rpx $bg-color;
    }

    .man {
        position: absolute;
        top: 180rpx;
        left: 0;
        margin: -50rpx 0 0;
        width: 100%;
        text-align: center;

        .header {
            width: 96rpx;
            height: 96rpx;
            margin: 0 auto;
            border-radius: 50%;
            box-shadow: 0 0 0 0.5px #fff;
        }

        .text {
            margin-top: 24rpx;

            .name {
                line-height: 28rpx;
                font-size: 28rpx;
                color: #333;
                padding-bottom: 10rpx;
                overflow: hidden;
                white-space: nowrap;
            }

            .year {
                line-height: 22rpx;
                font-size: 22rpx;
                color: #999;
            }
        }
    }
    &.style3 {
        .home-designer {
            &__name {
                margin-top: 16rpx;
                font-size: 32rpx;
                font-weight: bold;
                color: #333333;
                line-height: 44rpx;
            }
            &__years {
                font-size: 24rpx;
                font-weight: 400;
                color: #333333;
                line-height: 32rpx;
                margin-left: 16rpx;
                vertical-align: baseline;
            }
            &__summary {
                font-size: 24rpx;
                color: #999999;
                line-height: 36rpx;
                margin-top: 20rpx;
            }
            &__decorate {
                display: inline-block;
                vertical-align: text-top;
                &:first-child {
                    margin-right: 20rpx;
                }
                &:last-child {
                    margin-left: 20rpx;
                }
            }
        }
    }
    &-card {
        overflow: hidden;
        /deep/ .home-module-title {
            padding-bottom: 0 !important;
        }
        &-swiper {
            height: 348rpx;
        }
        &__list {
            white-space: nowrap;
            padding: 12rpx;
        }

        &__item {
            padding: 24rpx 24rpx 6rpx;
        }

        &__content {
            position: relative;
            box-shadow: 0px 0px 6rpx 4rpx rgba(175, 175, 175, 0.18);
            padding: 24rpx;

            .label {
                display: flex;

                .portrait {
                    width: 100rpx;
                    margin-right: 24rpx;
                    flex-shrink: 0;
                }

                .text {
                    .name {
                        line-height: 44rpx;
                        font-size: 32rpx;
                        color: #333;
                        font-weight: bold;
                    }

                    .tags {
                        display: flex;
                        overflow: auto;
                        padding-top: 12rpx;
                        justify-content: flex-start;

                        .tag {
                            flex-shrink: 0;
                            padding: 0 18rpx;
                            font-size: 20rpx;
                            height: 34rpx;
                            border-radius: 17rpx;
                            display: flex;
                            align-items: center;
                            margin-right: 16rpx;
                            position: relative;

                            &::before {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                height: 200%;
                                width: 200%;
                                border-radius: 34rpx;
                                border: solid 1px;
                                display: block;
                                transform: scale(0.5);
                                transform-origin: top left;
                            }
                        }
                    }
                }

                .btn {
                    margin-left: auto;
                    flex-shrink: 0;
                    padding: 0 30rpx;
                    color: #fff;
                    font-size: 24rpx;
                    display: flex;
                    align-items: center;
                    border-radius: 22rpx;
                    height: 44rpx;
                }
            }

            .imgs {
                display: flex;
                margin-top: 24rpx;
                overflow: auto;
                height: 146rpx;

                .item {
                    margin-right: 24rpx;
                    flex: 1;
                    max-width: 33.33333333%;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
}
</style>

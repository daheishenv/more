<template>
    <view class="home-decoration-activities">
        <view
            v-if="!noData_ && cFinish"
            :class="[mode_, 'decoration-activities']"
            :style="[outerLayer_]"
        >
            <view
                :style="[titleLayer_]"
                class="decoration-activities__title"
            >
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :more="isMore_ ? 'activityIndex' : ''"
                    :title-layer="titleLayer_"
                />
            </view>
            <view>
                <template v-if="!noData_ && cFinish">
                    <view
                        v-if="mode_ === 'style1'"
                        class="decoration-activities-bd"
                        :style="[innerLayer_]"
                    >
                        <view
                            v-for="(item, i) in cData.list"
                            :key="i"
                            :class="{'c-underline': i !== cData.list.length - 1}"
                            class="decoration-activities__item flex p24"
                            @tap="$jumpDetail('activityDetails', item.id)"
                        >
                            <c-image
                                :src="item.head_img"
                                width="230"
                                height="172"
                                mode="aspecrFill"
                                radius="16"
                            />
                            <view class="flex-1 pl24">
                                <view class="decoration-activities__title c-ellipsis-2">{{ item.activity_title }}</view>
                                <view class="decoration-activities__time">
                                    <view class="pr12">
                                        <c-image
                                            src="home/date.png"
                                            width="22"
                                            height="22"
                                            mode="aspectFit"
                                        />
                                    </view>
                                    {{ item.start_time }} - {{ item.end_time }}
                                </view>
                            </view>
                        </view>
                    </view>
                    <view
                        v-else-if="mode_ === 'style2'"
                        class="decoration-activities__list"
                        :style="[innerLayer_]"
                    >
                        <view
                            v-for="item in cData.list"
                            :key="item.id"
                            class="decoration-activities__item"
                            :style="[itemLayer_]"
                        >
                            <view
                                class="decoration-activities__item-box"
                                :style="{padding: innerLayer_.padding}"
                                @click="$jumpDetail('activityDetails', item.id)"
                            >
                                <view class="decoration-activities__item-hd">
                                    <text
                                        class="decoration-activities__circular"
                                        :style="{backgroundColor: circularBg_, borderColor: circularBdc_}"
                                    ></text>
                                    <text
                                        class="decoration-activities__circular decoration-activities__circular-bottom"
                                        :style="{backgroundColor: circularBg_, borderColor: circularBdc_}"
                                    ></text>
                                    <c-colors
                                        :theme="['t']"
                                        :pro="['c']"
                                    >{{ item.activity_name }}</c-colors>
                                </view>
                                <view class="flex-1 decoration-activities__item-bd">
                                    <view class="decoration-activities__title c-ellipsis">{{ item.activity_title }}</view>
                                    <view class="decoration-activities__time c-ellipsis">
                                        {{ item.start_time }}{{ item.end_time ? ('~' + item.end_time) : '' }}
                                    </view>
                                </view>
                                <view class="decoration-activities__item-ft">
                                    <view @click.stop="appointment(item)">
                                        <c-colors
                                            :theme="['t', '#fff']"
                                            :pro="['bgc', 'c']"
                                            radius="26"
                                        >
                                            <c-button
                                                width="92"
                                                height="50"
                                                size="mini"
                                            >
                                                <text>报名</text>
                                            </c-button>
                                        </c-colors>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </template>
                <template v-if="mode_ === 'style2'">
                    <gc-subscribe
                        v-model="showAppointment"
                        :title="title"
                        :content="content"
                        :source="source_id"
                        :type="appointmentType"
                        @close="appointment"
                    />
                </template>
            </view>
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
    name: 'HomeLimitedTimeActivities',
    mixins: [homeComponentMixins],
    data() {
        return {
            showAppointment: false,
            appointmentType: 6,
            source_id: '',
            title: '',
            content: ''
        }
    },
    computed: {
        circularBg_() {
            return this.outerLayer_.backgroundColor || this.innerLayer_.backgroundColor
        },
        circularBdc_() {
            return this.titleLayer_.hasBg !== 0 ? this.outerLayer_.backgroundColor || this.innerLayer_.backgroundColor : '#feddc5'
        }
    },
    methods: {
        appointment(item) {
            if (this.mode_ !== 'style2') {
                return false
            }
            this.source_id = item.id
            this.title = item.label
            this.content = item.title
            this.showAppointment = !this.showAppointment
        }
    }
}
</script>

<style lang="scss" scoped>
.decoration-activities {
    overflow: hidden;
    &.style1 {
        .decoration-activities {
            &__time {
                font-size: 24rpx;
                color: #999;
                line-height: 32rpx;
                @include flex(row);
                align-items: center;
                @include abs(null, 0, 0, 24rpx);
            }
            &__summary {
                margin-top: 14rpx;
                font-size: 24rpx;
                color: #999;
                line-height: 32rpx;
            }
        }
    }
    &__title {
        font-size: 28rpx;
        color: #333;
        line-height: 40rpx;
    }
    &.style2 {
        .decoration-activities {
            &__list {
                padding: 24rpx;
            }
            &__item {
                margin-top: 24rpx;
                padding: 0 !important;

                &:first-child {
                    margin-top: 0;
                }

                &-box {
                    position: relative;
                    overflow: hidden;
                    height: 180rpx;
                    @include flex(row);
                    justify-content: stretch;
                    &::after {
                        border: solid 1px #feddc5;
                        border-radius: 16rpx;
                        content: '';
                        display: block;
                        width: 200%;
                        height: 200%;
                        transform: scale(0.5);
                        transform-origin: 0 0;
                        @include abs(0, null, null, 0);
                        z-index: 1;
                    }
                }

                &-ft {
                    width: 150rpx;
                    @include flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 2;
                }

                &-bd {
                    padding: 46rpx 24rpx;
                    @include flex;
                    justify-content: space-between;

                    &::after {
                        content: '';
                        @include abs(12rpx, null, 12rpx, 0);
                        transform: scaleX(0.5);
                        border-left: 1px #feddc5 dashed;
                    }
                }

                &-hd {
                    width: 166rpx;
                    font-size: 28rpx;
                    font-weight: bold;
                    position: relative;
                    @include flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            &__circular {
                @include abs(null, -36rpx);
                width: 48rpx;
                height: 48rpx;
                background-color: rgba(255, 255, 255, 0);
                content: '';
                display: block;
                border-radius: 50%;
                border-width: 1px;
                border-style: solid;
                // border-color: inherit;
                transform: scale(0.5);
                z-index: 2;
                top: -12rpx;
                transform-origin: top left;

                &-bottom {
                    top: auto;
                    bottom: -12rpx;
                    transform-origin: bottom left;
                }
            }
            &__time {
                font-size: 22rpx;
                color: #999999;
                line-height: 30rpx;
            }
        }
    }
}
</style>

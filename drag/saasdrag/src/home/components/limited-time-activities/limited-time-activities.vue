<template>
    <view
        class="home-limited-time-activities"
        :class="[ blockClass_ ]"
        v-if="!noData_"
    >
        <sub-home-module-title
            :full="config.isFull"
            :title="config.title"
            :subTitle="config.sub_title"
        />
        <view class="home-limited-time-activities-bd">
            <view class="home-limited-time-activities__list">
                <view
                    v-for="item in cData.list"
                    :key="item.id"
                    class="home-limited-time-activities__item"
                >
                    <view
                        class="home-limited-time-activities__item-box"
                        @click="$jumpDetail('activityDetails', item.id)"
                    >
                        <view class="home-limited-time-activities__item-hd">
                            <text
                                class="home-limited-time-activities__circular"
                                :style="{backgroundColor: config.isFull ? '#fff' : '#f5f5f5 '}"
                            ></text>
                            <text
                                class="home-limited-time-activities__circular home-limited-time-activities__circular-bottom"
                                :style="{backgroundColor: config.isFull ? '#fff' : '#f5f5f5 '}"
                            ></text>
                            <c-colors
                                :theme="['t']"
                                :pro="['c']"
                            >{{item.activity_name}}</c-colors>
                        </view>
                        <view class="flex-1 home-limited-time-activities__item-bd">
                            <view class="home-limited-time-activities__title c-ellipsis">{{item.activity_title}}</view>
                            <view class="home-limited-time-activities__time c-ellipsis">
                                {{item.start_time}}{{ item.end_time ? ('~' + item.end_time) : ''}}
                            </view>
                        </view>
                        <view class="home-limited-time-activities__item-ft">
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
        </view>
        <gc-subscribe
            v-model="showAppointment"
            :title="title"
            :content="content"
            :source="source_id"
            :type="appointmentType"
            @close="appointment"
        />
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins';
// 首页限时活动组件
export default {
    name: 'home-limited-time-activities',
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
    methods: {
        appointment(item) {
            this.source_id = item.id
            this.title = item.label
            this.content = item.title
            this.showAppointment = !this.showAppointment
        },
    }
}
</script>

<style lang="scss" scoped>
.home-limited-time-activities {
    &-bd {
        margin: -24rpx;
    }

    &[class*='area-mt-'] {
        .home-limited-time-activities-bd {
            margin: 0;
        }
    }

    &__list {
        padding: 12rpx;
    }

    &__item {
        padding: 12rpx;

        &-box {
            position: relative;
            background-color: #fff7f1;
            overflow: hidden;
            height: 180rpx;
            @include flex(row);
            justify-content: stretch;
            &::after {
                content: '';
                display: block;
                border: solid 1px #feddc5;
                width: 200%;
                height: 200%;
                transform: scale(0.5);
                transform-origin: 0 0;
                border-radius: 32rpx;
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
        background-color: $bg-color;
        content: '';
        display: block;
        border-radius: 50%;
        border: 1px #feddc5 solid;
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

    &__title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        line-height: 46rpx;
    }

    &__time {
        font-size: 22rpx;
        color: #999999;
        line-height: 30rpx;
    }
}
</style>

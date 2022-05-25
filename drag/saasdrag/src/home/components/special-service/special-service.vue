<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-special-service"
            :style="[outerLayer_]"
        >
            <view :style="[titleLayer_]">
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                />
            </view>
            <view
                class="c-row"
                :style="[innerLayer_]"
            >
                <view
                    v-for="(item, index) in cData"
                    :key="index"
                    class="c-col-4 flex align-center"
                    @tap="appointment(item.type)"
                >
                    <view class="home-special-service__img">
                        <c-image
                            size="72"
                            :src="item.img"
                            mode="aspectFit"
                        />
                    </view>
                    <view class="flex-1">
                        <view
                            class="home-special-service__name"
                            :class="[!item.title ? 'bright-card' : '']"
                        >{{ item.title }}</view>
                        <view
                            v-if="item.sub_title"
                            class="home-special-service__desc"
                        >
                            <text>{{ item.sub_title }}</text>
                            <c-icons
                                size="20"
                                color="#43548F"
                                type="icon-tiaozhuan"
                            />
                        </view>
                    </view>
                </view>
            </view>
            <gc-subscribe
                v-model="showAppointment"
                :type="appointmentType"
                @close="appointment"
            />
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
// 首页特色组件
export default {
    name: 'HomeSpecialService',
    mixins: [homeComponentMixins],
    data() {
        return {
            showAppointment: false, // 预约弹窗标识
            appointmentType: '' // 预约类型
        }
    },
    methods: {
        appointment(type) {
            this.appointmentType = type
            this.showAppointment = !this.showAppointment
        },
        finishData(data) {
            this.cData = data.nav || []
        }
    }
}
</script>

<style lang="scss">
.home-special-service {
    overflow: hidden;
    .c-row {
        // background: #fff;
        height: 120rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        .c-col-4 {
            @include flex(row);
            align-items: center;

            &:nth-child(-n + 2)::after {
                content: '';
                @include abs(12rpx, 0, 12rpx);
                width: 2rpx;
                background-color: #ededed;
            }
        }
    }

    &__img {
        padding-right: 8rpx;
    }

    &__name {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
        line-height: 28rpx;
        height: 28rpx;
    }

    &__desc {
        margin-top: 16rpx;
        font-size: 24rpx;
        color: #43548f;
        line-height: 20rpx;
        height: 20rpx;
        @include flex(row);
        align-items: center;
    }
}
</style>

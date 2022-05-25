<template>
    <view
        class="cate-title"
        @click="!isDemo?$jump('searchList', { cat_id: carId}):''"
    >
        <view
            class="cate-title-value "
            :class="type===2?'cate-title-value--center':''"
        >
            <view
                v-if="type===1"
                class="border"
            >
                <c-colors
                    :theme="['t']"
                    :pro="['bgc']"
                >
                    <view class="border-color"></view>
                </c-colors>
            </view>

            <view class="title">{{ title }}</view>
        </view>
        <c-icons
            v-if="type===1"
            color="#999999"
            :size="36"
            type="icon-tiaozhuan"
            class="cate-title-icons"
        ></c-icons>
    </view>
</template>

<script>
export default {
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        type: {
            type: Number,
            default: 1
        },
        carId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.cate-title {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding-right: 16rpx;

    &-value {
        display: flex;
        align-items: center;
        flex: 1;
        .border {
            width: 6rpx;
            height: 28rpx;
            margin-right: 24rpx;
            border-radius: 0 42rpx 42rpx 0;
            overflow: hidden;
            &-color {
                width: 6rpx;
                height: 28rpx;
                border-radius: 0 42rpx 42rpx 0;
            }
        }
        .title {
            max-width: 400rpx;
            font-size: 28rpx;
            font-weight: 500;
            color: #333333;
            line-height: 40rpx;
            @include ellipsis;
        }
        &--center {
            justify-content: center;
            .title {
                padding: 0 16rpx;
                color: #666666;
            }
            &::before,
            &::after {
                content: '';
                display: block;
                width: 46rpx;
                height: 1px;
                background: #d8d8d8;
                transform: scaleY(0.5);
            }
        }
    }
    &-icons {
        padding-left: 60rpx;
    }
}
</style>

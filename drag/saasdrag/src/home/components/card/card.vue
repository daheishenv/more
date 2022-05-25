<template>
    <view
        class="card"
        :class="[ radiusClass_ ]"
    >
        <view class="card-hd">
            <view class="card__title">
                <text
                    class="card__h1"
                    :class="[!title? 'bright-card': '']"
                >{{title}}</text>
                <text
                    class="card__small"
                    v-if="label"
                >{{label}}</text>
            </view>
            <view
                class="card-timeout"
                v-if="timeOut"
            >
                <view class="card-timeout__session plr12">{{session}}</view>
                <gc-count-down
                    :timestamp="timeOut"
                    fontSize="26"
                    separatorColor="t"
                />
            </view>
            <view
                class="card__more"
                v-if="more"
                @click="$jump(more)"
            >
                <text>更多</text>
                <c-icons
                    size="32"
                    color="#666"
                    type="icon-tiaozhuan"
                />
            </view>
        </view>
        <scroll-view
            scroll-x
            :scroll-with-animation="true"
        >
            <slot />
        </scroll-view>
    </view>
</template>

<script>
// 首页卡片类组件外框
export default {
    props: {
        title: {
            type: String,
            default: null
        },
        label: {
            type: String,
            default: null
        },
        timeOut: {
            type: Number,
            default: 0
        },
        path: {
            type: String,
            default: null
        },
        session: {
            type: String,
            default: null
        },
        more: { // 更多跳转url
            type: String,
            default: null
        },
        radius: { // 更多跳转url
            type: [String, Boolean],
            default: true
        }
    },
    computed: {
        radiusClass_() {
            return !this.radius || this.radius === 'null' ? '' : ('c-radius-' + this.radius);
        },
    }
};
</script>
<style lang="scss" scoped>
.card {
    background: #fff;

    &-timeout {
        @include flex(row);
    }

    &-hd {
        height: 90rpx;
        display: flex;
        align-items: center;
        padding: 0 24rpx;
    }

    &__title {
        line-height: 32rpx;
        height: 32rpx;
        @include flex;
    }

    &__h1 {
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
        min-width: 100rpx;
    }

    &__small {
        font-size: 20rpx;
        color: #333;
        padding-left: 16rpx;
    }

    &__more {
        font-size: 24rpx;
        color: #333;
        line-height: 24rpx;
        margin-left: auto;
        display: flex;
        align-items: center;
    }
}
</style>

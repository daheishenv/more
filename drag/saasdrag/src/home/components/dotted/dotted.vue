<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-06 11:27:00
-->
<template>
    <view
        class="swiper-doted-box"
        :class="[mode]"
        :style="[dottedStyle_]"
        v-if="number > 1"
    >
        <template v-if="mode !== 'number'">
            <c-colors
                v-for="(item,index) in number"
                :key="index"
                :class="'swiper-doted--' + mode"
                :pro="['bgc']"
                :radius="radius_"
                :theme="[value === index ? selBgColor : bgColor]"
            >
                <view :class="'swiper-doted-' + mode"></view>
            </c-colors>
        </template>
        <view
            v-else
            class="swiper-doted__number"
        >
            {{ current_ }} / {{ number }}
        </view>
    </view>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            default: 'dotted'
        },
        number: {
            type: Number,
            default: 0
        },
        bgColor: { // 原点背景
            type: String,
            default: 'rgba(240, 240, 240, 0.5)'
        },
        selBgColor: { // 当前原点
            type: String,
            default: 't'
        },
        // left,center,right
        align: { // 原点位置
            type: String,
            default: 'center'
        },
        // 选中的值
        value: {
            type: Number,
            default: 0
        }
    },
    computed: {
        dottedStyle_() {
            return {
                justifyContent: this.align === 'left' ? 'flex-start' : this.align === 'right' ? 'flex-end' : this.align
            }
        },
        current_() {
            return this.value + 1
        },
        radius_() {
            return this.mode === 'dotted' ? '10' : '0'
        }
    }
}
</script>

<style lang="scss">
.swiper-doted {
    &-box {
        @include flex(row);
        align-items: center;
    }

    &--dotted {
        margin: 0 6rpx;
        @include tst();
    }
    &-dotted {
        width: 10rpx;
        height: 10rpx;
    }
    &--line {
        background-color: #fff;
        @include tst();
    }
    &-line {
        width: 20rpx;
        height: 4rpx;
    }
    &__number {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        border-radius: 32rpx;
        padding: 0 10rpx;
        font-size: 24rpx;
        transform: scale(0.8, 0.8);
    }
}
</style>

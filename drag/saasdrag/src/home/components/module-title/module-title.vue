<template>
    <view
        v-if="!noTitle_"
        class="home-module-title"
        :class="[
            newTitleLayer_.hasBg === 0 || !isCmptMode_ ? 'ptb24' : 'pt24'
        ]"
        :style="[style_]"
        @click="handleClick"
    >
        <view
            class="home-module-title__left flex-1"
            :class="[textAlign_]"
        >
            <c-image
                v-if="titleImage_"
                :src="titleImage_"
                height="39"
                width="39"
                type="upload"
                class="home-module-title__icon"
            />
            <text class="home-module-title__big">{{ title_ }}</text>
            <text
                v-if="subTitle_"
                class="home-module-title__small"
            > | {{ subTitle_ }}</text>
        </view>
        <slot>
            <template v-if="more_">
                <view
                    v-if="moreMode_ === 'style1'"
                    class="home-module-title__right"
                    @click.stop="$jump(more_, apiParam_)"
                >
                    {{ moreText }}
                    <c-icons
                        type="icon-tiaozhuan"
                        size="24"
                    />
                </view>
                <view
                    v-else
                    class="home-module-title__right"
                    :class="[moreMode_]"
                    @click.stop="$jump(more_, apiParam_)"
                >MORE</view>
            </template>
        </slot>
    </view>
</template>
<script>
/**
 * 注意！注意！注意！
 * 这个文件跟saas不能同步
 * 这个文件跟saas不能同步
 * 这个文件跟saas不能同步
*/
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    mixins: [homeComponentMixins],
    name: 'HomeModuleTitle',
    props: {
        title: {
            type: String,
            default: ''
        },
        more: {
            type: String,
            default: ''
        },
        moreText: {
            type: String,
            default: '更多'
        },
        subTitle: {
            type: String,
            default: ''
        },
        apiParam: {
            type: [Object, Array],
            default: () => { }
        },
        titleLayer: {
            type: Object,
            default: () => {
                return {}
            }
        },
        titleImage: {
            type: String,
            default: ''
        }
    },
    computed: {
        // 被引用模式
        isCmptMode_() {
            return Object.keys(this.titleLayer).length > 0
        },
        newTitleLayer_() {
            return this.isCmptMode_ ? this.titleLayer : this.titleLayer_
        },
        title_() {
            return this.title || this.config.title
        },
        subTitle_() {
            return this.subTitle || this.config.sub_title
        },
        more_() {
            if (!this.isCmptMode_) {
                return true
            }
            return this.more
        },
        moreMode_() {
            return this.newTitleLayer_.moreMode || 'style1'
        },
        moreColor_() {
            return this.$c.colorToRgba(this.newTitleLayer_.color, 0.5)
        },
        // 隐藏title标签
        noTitle_() {
            return !this.title_ && !this.subTitle_ && !this.more
        },
        apiParam_() {
            return this.apiParam || {}
        },
        style_() {
            return {
                color: this.newTitleLayer_.color,
                backgroundColor: this.newTitleLayer_.bgColor,
                padding: this.outerLayer_.padding
            }
        },
        textAlign_() {
            return this.newTitleLayer_.textAlign || ''
        },
        titleImage_() {
            return this.newTitleLayer_.titleImage || ''
        }
    },
    methods: {
        handleClick(e) {
            this.$emit('click', e)
        }
    }
}
</script>
<style lang="scss" scoped>
.home-module-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__big {
        font-size: 32rpx;
        font-weight: 600;
        line-height: 40rpx;
    }

    &__small {
        font-size: 24rpx;
        padding: 0rpx 0rpx 0rpx 10rpx;
        opacity: 0.5;
    }

    &__icon {
        margin-right: 16rpx;
    }

    &__left {
        font-size: 24rpx;
        @include flex(row);
        align-items: flex-end;
    }

    &__right {
        @include flex(row);
        font-size: 24rpx;
        align-items: center;
        opacity: 0.5;
        height: 40rpx;
        flex-shrink: 0;
        &.style2 {
            padding: 0 12rpx;
            position: relative;
            &::after {
                content: '';
                @include abs(0, null, null, 0);
                transform-origin: 0 0;
                transform: scale(0.5);
                width: 200%;
                height: 200%;
                border: 1px solid currentColor;
                opacity: 0.5;
                border-radius: 8rpx;
            }
        }
    }
}
</style>

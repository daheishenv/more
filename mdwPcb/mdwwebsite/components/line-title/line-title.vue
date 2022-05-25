<template>
    <div class="line">
        <div class="line__title">
            <div
                class="line__title-label"
                :class="needLine_?'line__title-label--default':''"
            >
                <i
                    v-if="icon"
                    class="iconfont"
                    :class="icon"
                ></i>
                {{ title }}
            </div>
        </div>
        <div class="line__solt">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        needLine: { // 是否需要竖线
            type: Boolean,
            default: true
        }
    },
    data() {
        return {}
    },
    computed: {
        needLine_() {
            return !this.icon && this.needLine
        }
    }
}
</script>

<style lang="scss" scoped>
.line {
    display: flex;
    align-items: center;
    &__title {
        height: 28px;
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        line-height: 28px;
        flex-shrink: 0;
        &-label {
            position: relative;
            display: flex;
            align-items: center;
            .iconfont {
                font-size: 18px;
                color: $--color-primary;
                margin-right: 8px;
            }
            &--default {
                &::before {
                    content: "";
                    display: block;
                    width: 3px;
                    height: 20px;
                    background: $--color-primary;
                    border-radius: 2px;
                    margin-right: 8px;
                }
            }
        }
    }
    &__solt {
        width: 0;
        flex: 1;
    }
}
</style>

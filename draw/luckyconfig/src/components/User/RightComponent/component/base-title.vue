<template>
    <div class="base-title">
        <view>
            <el-checkbox
                v-model="checkBoxValue_"
                :disabled="disabled_"
                :true-label="1"
                :false-label="0"
            ></el-checkbox>
            <text class="base-title__title pl24">{{ title }}</text>
        </view>
        <c-icons
            v-if="draggable_"
            size="36"
            color="#aaa"
            type="icon-gengduo"
        />
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: 0
        },
        title: {
            type: String,
            default: ''
        },
        // 标题配置
        dragOpt: {
            type: [Object, String],
            default: () => {
                return {
                    disabled: false,  // 默认可以勾选
                    draggable: true   // 默认可拖拽
                }
            }
        }
    },
    computed: {
        disabled_() {
            return this.dragOpt.disabled || false
        },
        draggable_() {
            return String(this.dragOpt.draggable) !== 'false'
        },
        checkBoxValue_: {
            get() {
                return parseInt(this.value)
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.base-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 48rpx;
    &__title {
        font-weight: bold;
    }
}
</style>
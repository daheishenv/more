<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-21 18:00:40
-->
<template>
    <div class="flex-column">
        <span
            v-if="selOptionsText_ && showTitle"
            class="el-form-item__left-text"
        >{{selOptionsText_}}</span>
        <div class="el-form-item__content">
            <el-radio-group
                class="el-form-item__group"
                v-model="switchValue_"
            >
                <el-radio
                    class="el-form-item__radio"
                    :label="item.value"
                    :disabled="item.disabled"
                    v-for="(item, index) in options"
                    :key="index"
                >{{item.label}}</el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: ''
        },
        showTitle: {
            type: [String, Boolean],
            default: false
        },
        // 当前项是否可以被点击，如果禁止，name默认值是什么都在这个参数里面
        extraOpt: {
            type: Object,
            default: () => {
                return {
                    disabled: false
                }
            }
        }
    },
    computed: {
        switchValue_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        selOptionsText_() {
            return (this.options.find(o => o.value === this.switchValue_) || this.options[0]).label
        }
    },
    methods: {
        handleClick(value) {
            this.$emit('input', value)
        }
    },
    watch: {
        extraOpt: {
            handler(val) {
                if (val.disabled) {
                    this.$emit('input', val.value)
                }
            },
            deep: true
        },
        options: {
            handler(val) {
                const curIndex = val.findIndex(o => o.value === this.value && o.disabled)
                // 说明已选中的值已经被禁止
                if (curIndex !== -1) {
                    // 默认选中可选的第一个
                    this.$emit('input', val.filter(o => !o.disabled)[0].value)
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-radio {
    margin-right: 0;
}
.el-form-item {
    &__left-text {
        text-align: left;
    }
    &__content {
        width: 100%;
        height: 100%;
    }
    &__group {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 12px 16px;
        background-color: #fff;
        background: #f7f8fa;
        border-radius: 2px;
    }
    &__radio {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-height: 26px;
        width: 25%;
    }
}
</style>
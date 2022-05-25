<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-23 08:50:08
-->
<template>
    <div class="base-checkbox">
        <span
            v-if="selOptionsText_"
            class="el-form-item__left-text"
        >{{selOptionsText_}}</span>
        <el-checkbox
            :disabled="extraOpt.disabled"
            :true-label="options_[1].value"
            :false-label="options_[0].value"
            v-model="switchValue_"
        ></el-checkbox>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Boolean, Number],
            default: ''
        },
        options: {
            type: Array,
            default: () => []
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
        // switch按钮
        options_() {
            return this.options && this.options.length ? this.options : [
                { label: '不显示', value: 0 },
                { label: '显示', value: 1 }
            ]
        },
        selOptionsText_() {
            return (this.options_.find(o => o.value === this.switchValue_) || this.options_[0]).label
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
        }
    }
}
</script>
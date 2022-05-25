<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-06-11 18:26:09
-->
<template>
    <view class="c-form">
        <slot />
    </view>
</template>

<script>
export default {
    name: 'CForm',
    data() {
        return {
            formData: {}
        }
    },
    props: {
        check: {
            type: [Boolean, String],
            default: false
        }
    },
    computed: {
        check_() {
            return String(this.check) !== 'false'
        }
    },
    created() {
        this.children = []
    },
    methods: {
        // 实时校验
        validate() {
            if (!this.check_) return
            const validateData = {}
            this.children.forEach(o => {
                o.pattern && (validateData[o.inputName] = o.validate())
            })
            console.log(validateData)
            this.$emit('validate', {
                type: 'check',
                detail: validateData
            })
        },
        // 重置表单
        emitReset() {
            this.children.forEach(o => {
                o.clear && o.clear()
            })
        },
        // 提交表单
        emitSubmit(e) {
            const formData = {}
            this.children.forEach(o => {
                console.log();
                if (o.$options.name === 'CRadioGroup') {
                    formData[o.radioName] = o.radioValue
                } else if (o.$options.name === 'CInput') {
                    formData[o.inputName] = o.inputValue
                }
            })
            this.$emit('submit', {
                type: 'submit',
                detail: {
                    target: e.target,
                    value: formData
                }
            })
        }
    }
}
</script>

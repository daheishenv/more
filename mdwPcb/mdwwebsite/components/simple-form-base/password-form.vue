<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-24 10:15:55
-->
<template>
    <simple-form-base
        ref="form"
        v-model="model"
        class="mt20"
        :rules="rules"
        :fields="fields"
        type="3"
        button-text="确定"
        @submit="submit"
    >
        <template slot="tips">
            <div class="form-tips">
                密码需满足不少于8位数的数字和字母组合
            </div>
        </template>
    </simple-form-base>
</template>

<script>
import simpleFormBase from './simple-form-base'
export default {
    components: {
        simpleFormBase
    },
    data() {
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.model.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            rules: {
                password: [
                    { required: true, message: '请输入新密码', trigger: 'change' },
                    { min: 8, max: 11, message: '请输入8到11位密码', trigger: 'change' },
                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/, message: '密码必须为 8到11位数字和字母组合', trigger: 'change' }
                ],
                confirm_password: [
                    { validator: validatePass2, trigger: 'change' }
                ]
            },
            fields: {
                password: {
                    placeholder: '请输入新密码',
                    type: 'password'
                },
                confirm_password: {
                    placeholder: '请再次输入新密码',
                    type: 'password'
                }
            },
            model: {
                password: '',
                confirm_password: ''
            }
        }
    },
    methods: {
        async submit(e) {
            try {
                const { code, msg } = await this.$axios.$post('/users/changePwd', this.model)
                this.$message({
                    message: msg,
                    type: code === 0 ? 'success' : 'error'
                })
                if (code === 0) {
                    this.$refs.form.resetForm()
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.form-tips {
    text-align: center;
    color: #999999;
    font-size: 12px;
    position: relative;
    top: -12px;
}
</style>

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
        :rules="rules"
        :fields="fields"
        :button-text="buttonText || '绑定'"
        :terms-list="termsList"
        :policy-list="policyList"
        :type="type"
        :width="width"
        label-width="90px"
        @submit="submit"
    >
        <div
            slot="after"
            style="margin-bottom: 24px"
        >
            <el-form-item label="选择身份">
                <el-select v-model="app_type">
                    <el-option
                        label="我是装企"
                        value="b"
                    ></el-option>
                </el-select>
            </el-form-item>
        </div>
        <template #suffix="{itemKey}">
            <el-button
                v-if="itemKey === 'code'"
                :class="['form-buttom',type == 'codeLogin' ? 'form-buttom--loginSend': '']"
                type="primary"
                :disabled="!model.phone || sendStatus"
                @click="sendCode"
            >{{ showDownCode_ }}</el-button>
        </template>
    </simple-form-base>
</template>

<script>
import simpleFormBase from './simple-form-base'
export default {
    components: {
        simpleFormBase
    },
    props: {
        width: {
            type: Number,
            default: 600
        },
        buttonText: {
            type: String,
            default: '立即注册'
        },
        type: {
            type: String,
            default: 'register'
        },
        termsList: {
            type: Array,
            default: () => {
                return []
            }
        },
        policyList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.model.password) {
                callback(new Error('两次密码输入不一致，请重新填写。!'))
            } else {
                callback()
            }
        }
        // 检验是否同意协议
        const checkAgree = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请先阅读并同意"用户协议"'))
            } else {
                callback()
            }
        }
        return {
            app_type: 'b',
            timeId: null,
            downCount: 60,
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                checked: [
                    { required: true, validator: checkAgree, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 8, message: '密码需不少于8位，包含字母和数字', trigger: 'blur' },
                    { pattern: /^(?![0-9]+$)(?![a-z]+$)[0-9A-Za-z]{8,}$/, message: '密码需不少于8位，包含字母和数字', trigger: 'change' }
                ],
                confirm_password: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            },
            fields: {
                phone: {
                    placeholder: '请输入手机号',
                    label: '手机号码',
                    max: 11
                },
                code: {
                    placeholder: '请填写手机验证号码',
                    label: '验证号码'
                },
                password: {
                    placeholder: '请填写您的登录密码',
                    type: 'password',
                    label: '登录密码',
                    tip: '密码需不少于8位，包含字母和数字'
                },
                confirm_password: {
                    placeholder: '请再次填写您的登录密码',
                    type: 'password',
                    label: '重复密码'
                },
                checked: {}
            },
            model: {
                phone: '',
                code: '',
                password: '',
                confirm_password: '',
                checked: true
            },
            sendStatus: false
        }
    },
    computed: {
        showDownCode_() {
            return this.timeId ? this.downCount : '发送验证码'
        }
    },
    methods: {
        async sendCode() {
            const result = /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.model.phone)
            if (result) {
                const { code, msg } = await this.$axios.$post(
                    '/WxApp/h5mobileRegisterSendSmsCode', { type: 6, mobile: this.model.phone }
                )
                if (code === 0) {
                    this.sendStatus = true
                    this.runCode()
                }
                this.$message({
                    type: code === 0 ? 'success' : 'error',
                    message: msg
                })
            } else {
                return false
            }
        },
        runCode() {
            this.timeId = setTimeout(() => {
                if (this.downCount > 0) {
                    this.downCount--
                    this.runCode()
                } else {
                    clearTimeout(this.timeId)
                    this.timeId = null
                    this.sendStatus = false
                    this.downCount = 60
                }
            }, 1000)
        },
        // 通过短信验证码登录
        async register() {
            console.log(this.model, 'this.model')
            const { phone: mobile, code: sms_code, password: pwd, confirm_password: confirm_pwd } = this.model
            const params = {
                type: 6,
                mobile,
                sms_code,
                parent_id: 0,
                pwd,
                confirm_pwd
            }
            const { code, msg } = await this.$axios.$post(
                '/WxApp/smsLogin', params
            )
            if (code === 0) {
                this.$message.success('注册成功')
                this.$router.push('/login')
            } else {
                this.$cookies.set('applet_token', '')
                this.$message.error(msg)
            }
        },
        // 表单提交事件
        submit(e) {
            this.type === 'register' && this.register()
        }
    }
}
</script>
<style lang="scss" scoped>
.form-buttom {
    height: 34px;
    line-height: 34px;
    padding: 0;
    height: 34px;
    width: 100px;
    display: block;
    flex-shrink: 0;
    margin-left: 9px;
    &--loginSend {
        height: 56px;
        line-height: 56px;
        font-size: 16px;
    }
}
.codelogin-tips {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4185ec;
    line-height: 22px;
    text-align: center;
    position: relative;
    top: -10px;
}
// /deep/ .el-form-item__label {
//     line-height: 56px !important;
// }
</style>

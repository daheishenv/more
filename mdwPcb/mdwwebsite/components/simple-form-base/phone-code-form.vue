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
        @submit="submit"
    >
        <template #suffix="{itemKey}">
            <el-button
                v-if="itemKey === 'code'"
                :class="['form-buttom',type == 'codeLogin' ? 'form-buttom--loginSend': '']"
                type="primary"
                :disabled="!model.phone || sendStatus"
                @click="sendCode"
            >{{ showDownCode_ }}</el-button>
        </template>
        <!-- <template
            v-if="type == 'codeLogin'"
            slot="tips"
        >
            <div class="codelogin-tips">
                首次登录默认自动注册！
            </div>
        </template> -->
    </simple-form-base>
</template>

<script>
import { mapState } from 'vuex'
import simpleFormBase from './simple-form-base'
export default {
    components: {
        simpleFormBase
    },
    props: {
        width: {
            type: Number,
            default: 262
        },
        buttonText: {
            type: String,
            default: '立即登录'
        },
        type: {
            type: String,
            default: 'codeLogin'
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
        // 检验是否同意协议
        const checkAgree = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请先阅读并同意"用户协议"'))
            } else {
                callback()
            }
        }
        return {
            timeId: null,
            downCount: 60,
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'change' },
                    { pattern: /^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                checked: [
                    { required: true, validator: checkAgree, trigger: 'blur' }
                ]
            },
            fields: {
                phone: {
                    placeholder: '请输入手机号'
                },
                code: {
                    placeholder: '请输入验证码'
                },
                checked: {}
            },
            model: {
                phone: '',
                code: '',
                checked: true
            },
            sendStatus: false
        }
    },
    computed: {
        ...mapState(['userInfo']),
        showDownCode_() {
            return this.timeId ? this.downCount : '发送验证码'
        }
    },
    methods: {
        async sendCode() {
            const result = /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.model.phone)
            if (result) {
                const { code, msg } = await this.$axios.$post(
                    '/WxApp/h5mobileRegisterSendSmsCode', { type: 3, mobile: this.model.phone }
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
        // 换绑手机号码
        async changeMobile() {
            const { phone: mobile, code: sms_code } = this.model
            const params = {
                type: 3,
                mobile,
                sms_code
            }
            const { code, msg } = await this.$axios.$post(
                '/users/changeMobile', params
            )
            if (code === 0) {
                this.$refs.form.resetForm()
                clearTimeout(this.timeId)
                this.$store.dispatch('getUserInfo')
                this.timeId = null
                this.sendStatus = false
                this.downCount = 60
            }
            this.$message({
                message: msg,
                type: code === 0 ? 'success' : 'error'
            })
        },
        // 通过短信验证码登录
        async login() {
            const { phone: mobile, code: sms_code } = this.model
            const params = {
                type: 3,
                mobile,
                sms_code,
                parent_id: 0
            }
            const { code, msg, data } = await this.$axios.$post(
                '/WxApp/smsLogin', params
            )
            if (code === 0) {
                this.$cookies.set('applet_token', data.token)
                await this.$store.dispatch('getUserInfo')
                this.$message.success('登录成功')
                const { id = 0 } = this.userInfo
                if (id > 0) {
                    this.$router.push('/')
                } else {
                    this.$confirm('暂无企业信息,是否前往绑定企业信息?', '提示', {
                        confirmButtonText: '前往绑定',
                        cancelButtonText: '直接登录',
                        type: 'info',
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        showClose: false
                    }).then((res) => {
                        console.log(res)
                        this.$router.push('/wallet/firm')
                    }).catch(() => {
                        this.$router.push('/')
                    })
                }
            } else {
                this.$cookies.set('applet_token', '')
                this.$message.error(msg)
            }
        },
        // 表单提交事件
        submit(e) {
            this.type === 'codeLogin' && this.login()
            this.type === 'changeMobile' && this.changeMobile()
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
</style>

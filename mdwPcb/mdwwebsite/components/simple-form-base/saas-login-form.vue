<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-24 10:15:55
-->
<template>
    <simple-form-base
        v-model="model"
        :rules="rules"
        :fields="fields"
        :terms-list="termsList"
        :policy-list="policyList"
        :width="width"
        button-text="立即登录"
        @submit="submit"
    >
        <el-form-item>
            <gee-test
                v-if="isShowGeeTest"
                v-model="geetestObj"
            />
        </el-form-item>
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
        },
        width: {
            type: Number,
            default: 262
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
            rules: {
                mobile: [
                    { required: true, message: '请输入账户名', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
                checked: [
                    { required: true, validator: checkAgree, trigger: 'blur' }
                ]
            },
            fields: {
                mobile: {
                    placeholder: '请输入账户名'
                },
                password: {
                    placeholder: '请输入密码',
                    type: 'password'
                },
                checked: {}

            },
            model: {
                mobile: '',
                password: '',
                checked: true
            },
            isShowGeeTest: true,
            geetestObj: null
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        async submit(e) {
            if (!this.geetestObj) {
                this.$message.warning('请先完成验证～')
                return
            }
            this.logining = true
            const { data, code, msg } = await this.$axios.$post('wxapp/loginPwd', this.model)
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
                this.resetGeeTest()
            }
            this.logining = false
        },
        resetGeeTest() {
            this.geetestObj = null
            this.isShowGeeTest = false
            this.$nextTick(() => {
                this.isShowGeeTest = true
            })
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
    width: 93px;
    display: block;
    flex-shrink: 0;
    margin-left: 9px;
}
</style>

<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-25 09:51:45
-->
<template>
    <div class="border">
        <line-title
            class="mb30"
            title="绑定SaaS账户"
        ></line-title>
        <div
            v-if="userInfo && userInfo.shop_uid > 0"
            class="bindsaas-tip"
        >
            您已绑定SaaS商户<span>"{{ userInfo && (userInfo.name || '--') }}"</span>，绑定关系不可修改。
        </div>
        <saas
            ref="saas"
            v-model="model"
            :rules="rules"
            :fields="fields"
            :terms-list="termsList"
            :policy-list="policyList"
            button-text="立即绑定"
            type="saas"
            @submit="submit"
        />
        <el-dialog
            :visible.sync="dialogVisible"
            :show-close="false"
            :close-on-click-modal="false"
            width="380px"
            center
        >
            <div class="bind-tip">
                <div class="title">
                    绑定SaaS
                </div>
                <div class="msg mt20">
                    <p>您即将绑定“{{ model.username }}”下的商户</p>
                    <p>绑定关系不可修改!</p>
                </div>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="saveBind"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import saas from '@/components/simple-form-base/simple-form-base'
import { mapState } from 'vuex'
export default {
    components: {
        saas
    },
    data() {
        return {
            termsList: [],
            policyList: [],
            fields: {
                username: {
                    placeholder: '请输入账户名'
                },
                password: {
                    placeholder: '请输入密码',
                    type: 'password'
                }

            },
            model: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账户名', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ]
            },
            dialogVisible: false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        submit() {
            this.dialogVisible = true
        },
        async saveBind() {
            const { code, msg } = await this.$axios.$post('company/saasUserCheck', this.model)
            this.$message({
                type: code === 0 ? 'success' : 'warning',
                message: msg
            })
            if (code === 0) {
                this.dialogVisible = false
                this.$refs.saas.resetForm()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.border {
    padding: 30px;
    background: #fff;
}
.mb30 {
    margin-bottom: 16px;
}
.bindsaas-tip {
    span {
        color: #4185ec;
    }
}
.bind-tip {
    margin: 0 auto;
    .title {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 25px;
        text-align: center;
    }
    .msg {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        text-align: center;
    }
}
</style>

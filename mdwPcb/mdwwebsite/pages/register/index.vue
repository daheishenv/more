<template>
    <div class="register-wrap">
        <div class="register-header">
            <div class="title">
                <span></span>
                <span>欢迎注册X图网</span>
            </div>
            <div class="header-word">
                <span>已有账号？</span>
                <span @click="handleLogin">直接登录</span>
            </div>
        </div>
        <div class="form-cls">
            <register-form :policy-list="policyList" />
        </div>
    </div>
</template>

<script>
import registerForm from '../../components/simple-form-base/register-form.vue'
export default {
    components: { registerForm },
    data() {
        return {
            policyList: []
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            try {
                // 隐私政策
                const { data: policy } = await this.$axios.$post('agreement/agreementStatus', { type: 1 })
                this.policyList = policy.list || []
            } catch (err) {
                console.log(err)
            }
        },
        handleLogin() {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
.register-wrap {
    background: #fff;
    width: 1200px;
    margin: 40px auto 0;
    padding: 40px;
    .register-header {
        border-bottom: 1px solid #d8d8d8;
        padding-bottom: 16px;
        display: flex;
        justify-content: space-between;
        .title {
            display: flex;
            align-items: center;
            span:nth-child(1) {
                display: inline-block;
                width: 2px;
                height: 20px;
                background: #4185ec;
            }
            span:nth-child(2) {
                font-weight: 500;
                font-size: 20px;
                color: #333333;
                margin-left: 8px;
            }
        }
        .header-word {
            font-size: 14px;

            span:nth-child(2) {
                color: #4185ec;
                cursor: pointer;
            }
        }
    }
    .form-cls {
        margin-top: 24px;
        div {
            width: 470px !important;
        }
    }
}
</style>

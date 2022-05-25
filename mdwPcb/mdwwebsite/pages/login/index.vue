<template>
    <div class="bg">
        <div class="main-container flex container">
            <div class="panel flex">
                <div class="left"></div>
                <div class="right ml70">
                    <div class="title">登录</div>
                    <div class="subtitle">登录X团商家管理系统</div>
                    <div class="form">
                        <div class="tab">
                            <div class="flex">
                                <div
                                    class="tab-item"
                                    :class="[currentActive===0?'active':'']"
                                    @click="currentActive=0"
                                >账号登录</div>
                                <div
                                    class="tab-item"
                                    :class="[currentActive===1?'active':'']"
                                    @click="currentActive=1"
                                >手机登录</div>
                            </div>
                            <div :class="[currentActive===0?'leftactive':'rightactive','line']"></div>
                        </div>
                        <div class="form-wrap-cls">
                            <saasLoginForm
                                v-if="currentActive == 0"
                                :terms-list="termsList"
                                :policy-list="policyList"
                                class="mt20"
                                :width="360"
                            />
                            <phoneCodeForm
                                v-else
                                :width="360"
                                :terms-list="termsList"
                                :policy-list="policyList"
                                class="mt20"
                                button-text="立即登录"
                            />
                            <div class="register-btn">
                                还没有账号?
                                <span @click="jumpRegister">立即注册</span>
                            </div>
                        </div>
                        <!-- <el-form
                            ref="form"
                            class="simple-form mt20"
                            :model="modelIn"
                            :rules="rules"
                            label-width="0px"
                        >
                            <template v-if="currentActive===0">
                                <el-form-item prop="mobile">
                                    <div class="item-content">
                                        <el-input
                                            v-model="modelIn.mobile"
                                            autocomplete="off"
                                            type="text"
                                            placeholder="请输入用户账号"
                                            maxlength="20"
                                        ></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <div class="item-content">
                                        <el-input
                                            v-model="modelIn.password"
                                            autocomplete="off"
                                            type="text"
                                            placeholder="请输入用户密码"
                                            maxlength="20"
                                        ></el-input>
                                    </div>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item prop="phone">
                                    <div class="item-content">
                                        <el-input
                                            v-model="modelIn.phone"
                                            autocomplete="off"
                                            type="text"
                                            placeholder="请输入您的手机号码"
                                            maxlength="11"
                                        ></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <div class="item-content">
                                        <el-input
                                            v-model="modelIn.code"
                                            autocomplete="off"
                                            type="text"
                                            placeholder="请输入验证码"
                                            maxlength="6"
                                        ></el-input>
                                        <el-button
                                            class="code-buttom"
                                            type="primary"
                                            :disabled="!modelIn.phone || sendStatus"
                                            @click="sendCode"
                                        >{{ showDownCode_ }}</el-button>
                                    </div>
                                </el-form-item>
                            </template>
                            <div id="embed-captcha"></div>
                            <el-form-item class="mt20">
                                <el-button
                                    type="primary"
                                    class="form-buttom"
                                    @click="submit"
                                >{{ buttonText }}</el-button>
                            </el-form-item>
                        </el-form> -->
                        <!-- <div>首次登录默认自动注册</div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import phoneCodeForm from '@/components/simple-form-base/phone-code-form'
import saasLoginForm from '@/components/simple-form-base/saas-login-form'
export default {
    components: {
        phoneCodeForm,
        saasLoginForm
    },
    layout: 'none',
    async asyncData({ $axios }) {
        let policyList = []
        let termsList = []
        try {
            // 隐私政策
            const { data: policy } = await $axios.$post('agreement/agreementStatus', { type: 1 })
            policyList = policy.list || []
            // 服务条款
            const { data: terms } = await $axios.$post('agreement/agreementStatus', { type: 2 })
            termsList = terms.list || []
        } catch (err) {
            console.log(err)
        }
        return {
            policyList,
            termsList
        }
    },
    data() {
        return {
            currentActive: 0,
            policyList: [],
            termsList: []
        }
    },
    mounted() {
    },
    methods: {
        jumpRegister() {
            this.$router.push('/register')
        }
    }
}
</script>
<style lang="scss" scoped>
.bg {
    background-image: url("../../assets/image/login/login-bg.png");
    background-size: 100% 100%;
    height: 100%;
}
.panel {
    width: 1200px;
    height: 700px;
    background: #ffffff;
    border-radius: 20px;
    .left {
        width: 676px;
        height: 637px;
        background-image: url("../../assets/image/login/login-left.png");
    }
}
.container {
    padding-top: 126px;
    justify-content: center;
}

.left {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.right {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    padding-top: 100px;
    .title {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 42px;
    }
    .subtitle {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 25px;
        margin-top: 4px;
    }
    .form {
        margin-top: 40px;
    }
    .tab {
        position: relative;
        width: 360px;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 8px;

        &-item {
            font-weight: bold;
            color: #333;
            font-size: 18px;
            text-align: center;
            flex: 1;
            cursor: pointer;
        }
        .line {
            position: absolute;
            transition: all 0.2s linear;
            bottom: 0;
            width: 180px;
            height: 2px;
            background: $--color-primary;
        }
    }
}
.active {
    color: $--color-primary !important;
}
.leftactive {
    left: 0;
}
.rightactive {
    left: 180px;
}

.simple-form {
    /deep/.el-form-item {
        margin-bottom: 16px;
        width: 260px;
        &:last-child {
            margin-bottom: 0;
        }
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            border-radius: 0;
        }
    }
    .item-content {
        display: flex;
        align-items: center;
    }
    .form-buttom {
        height: 34px;
        line-height: 34px;
        padding: 0;
        width: 100%;
        display: block;
        flex-shrink: 0;
    }
}
.code-buttom {
    height: 34px;
    line-height: 34px;
    padding: 0;
    height: 34px;
    width: 93px;
    display: block;
    flex-shrink: 0;
    margin-left: 9px;
}
.mt35 {
    margin-top: 35px;
}
.ml70 {
    margin-left: 70px;
}
.register-btn {
    text-align: right;
    margin-top: 15px;
    span {
        cursor: pointer;
        color: #4185ec;
    }
}
.form-wrap-cls {
    width: 360px;
}
</style>

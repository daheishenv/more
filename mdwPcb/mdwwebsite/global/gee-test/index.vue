<!--
 * @Descripttion: 登录校验
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-31 17:21:22
-->
<template>
    <div
        id="geetest"
        class="gee-test-main"
    ></div>
</template>

<script>
export default {
    name: 'GeeTest',
    props: {
        value: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            geetestObj: null
        }
    },
    mounted() {
        this.getGeetest()
    },
    methods: {
        async getGeetest() {
            if (this.geetestObj && Object.keys(this.geetestObj).length) return
            const data = await this.$axios.$post('/WxApp/getLoginCaptcha')
            // 使用gt的initGeetest函数来初始化咱们的滑动验证
            window.initGeetest({
                // 以下配置参数来自服务端 SDK，这是第一次验证，也就是获取到了后端的这个三个数据
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: true
            }, (captchaObj) => {
                // 这里可以调用验证实例 captchaObj 的实例方法
                // 通过调用captchaObj对象的appendTo方法，给某个标签添加上滑动验证对象，就行了，看写法
                captchaObj.appendTo('#geetest') // 参数是一个标签选择器，那么这个标签就加上了滑动验证的页面效果
                captchaObj.onSuccess(() => {
                    const result = captchaObj.getValidate()
                    this.geetestObj = result // 保存这个数据
                    this.$emit('input', this.geetestObj)
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#geetest {
    width: 100%;
}
.gee-test-main {
    /deep/.geetest_holder.geetest_wind {
        width: 100% !important;
        height: 56px;
    }
    /deep/ .geetest_holder.geetest_wind .geetest_radar_tip,
    .geetest_holder.geetest_wind .geetest_success_radar_tip,
    /deep/.geetest_holder.geetest_wind .geetest_radar_tip,
    /deep/.geetest_holder.geetest_wind .geetest_success_radar_tip {
        height: 56px;
        line-height: 56px;
        font-size: 18px;
    }
    /deep/ .geetest_holder.geetest_wind .geetest_radar_tip,
    /deep/.geetest_holder.geetest_wind .geetest_success_radar_tip {
        font-size: 16px;
    }
    /deep/ .geetest_holder.geetest_wind .geetest_radar {
        width: 34px;
        height: 34px;
        top: 6px;
    }
    /deep/.geetest_holder.geetest_wind
        .geetest_success_btn
        .geetest_success_box {
        top: 14px;
    }
    /deep/.geetest_holder.geetest_wind
        .geetest_success_btn
        .geetest_success_box
        .geetest_success_correct,
    /deep/.geetest_holder.geetest_wind
        .geetest_success_btn
        .geetest_success_box,
    /deep/.geetest_holder.geetest_wind
        .geetest_success_btn
        .geetest_success_box
        .geetest_success_show {
        width: 28px;
        height: 28px;
    }
    // /deep/.geetest_holder.geetest_wind
    //     .geetest_success_btn
    //     .geetest_success_box
    //     .geetest_success_correct
    //     .geetest_success_icon {
    //     width: 0.9rem;
    //     height: 0.9rem;
    // }
    /deep/.geetest_logo,
    /deep/.geetest_success_logo {
        display: none;
    }
    /deep/ .geetest_holder.geetest_wind .geetest_radar_btn {
        background-image: none;
        background: #f5f5f5;
        border: 0;
    }
}
</style>

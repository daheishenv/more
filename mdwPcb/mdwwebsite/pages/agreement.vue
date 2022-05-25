<!--
 * @Descripttion: 隐私条款/服务协议
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-31 10:33:01
-->
<template>
    <div>
        <div
            v-if="info"
            class="white-bg mt20 agreement"
        >
            <div class="agreement-header">
                <div class="agreement-header__title">{{ info.title }}</div>
                <div class="agreement-header__time">
                    <span>时间:</span>
                    <span>{{ info.update_time || '--' }}</span>
                </div>
            </div>
            <div class="agreement-content">
                <div v-html="info.content"></div>
            </div>
        </div>
        <div
            v-else
            class="mt20 white-bg"
        >
            <no-data :show-img="true" />
        </div>
    </div>
</template>
<script>
export default {
    async asyncData({ $axios, query }) {
        let info
        try {
            const { data } = await $axios.$post('/agreement/agreementDetail', {
                id: query.id
            })
            info = data
        } catch (err) {
            console.log(err)
        }
        return {
            info
        }
    },
    data() {
        return {
            info: undefined
        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.agreement {
    box-sizing: border-box;
    padding: 0 60px;
    &-header {
        padding: 30px 0 16px;
        border-bottom: 1px solid #d6d6d6;
        &__title {
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 33px;
        }
        &__time {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 20px;
            margin-top: 16px;
        }
    }
    &-content {
        padding: 30px 0;
        line-height: 22px;
        letter-spacing: 1px;
    }
}
</style>

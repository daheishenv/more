<template>
    <view class="user-components">
        <!-- 顶部导航栏 -->
        <sub-home-user-top-nav
            v-if="cmptId_ === 'top-nav'"
            :config="cmptConfig_"
        />
        <!-- 用户头部 -->
        <sub-home-user-header
            v-if="cmptId_ === 'user-header'"
            :config="cmptConfig_"
        />
        <!-- 会员升级 -->
        <sub-home-user-vip
            v-if="cmptId_ === 'member-upgrade'"
            :config="cmptConfig_"
        />
        <!-- 导购 -->
        <sub-home-shop-guide
            v-if="cmptId_ === 'shop-guide'"
            :config="cmptConfig_"
        />
        <!-- 品牌馆 -->
        <!-- <sub-home-user-brand
            v-if="cmptId_ === 'user-brand'"
            :config="cmptConfig_"
        /> -->
        <!-- 销售顾问 -->
        <sub-home-user-advisory
            v-if="cmptId_ === 'sales-consultant'"
            :config="cmptConfig_"
        />
        <!-- 订单信息 -->
        <sub-home-user-order
            v-if="cmptId_ === 'order'"
            :config="cmptConfig_"
        />
        <!-- 图片广告 -->
        <sub-home-user-ad
            v-if="cmptId_ === 'banner'"
            :config="cmptConfig_"
        />
        <!-- 我的工具 -->
        <sub-home-user-interest
            v-if="cmptId_ === 'my-tools'"
            :config="cmptConfig_"
        />
        <!-- 我的团队 -->
        <sub-home-user-team
            v-if="cmptId_ === 'my-team'"
            :config="cmptConfig_"
        />
    </view>
</template>

<script>
export default {
    props: {
        config: {
            type: Object,
            default: () => {
                return {}
            }
        },
        cmptId: {
            type: String,
            default: ''
        },
    },
    computed: {
        cmptConfig_() {
            return this.config
        },
        cmptId_() {
            return this.cmptId;
        },
    }
}
</script>

<style lang="scss" scoped>
.user-components {
}
</style>
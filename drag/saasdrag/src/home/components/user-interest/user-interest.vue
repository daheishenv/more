<template>
    <view>
        <view v-if="cmptStyle_ === 'style1'">
            <sub-home-user-interest-style1 :cardList="cardList" />
        </view>
        <view v-if="cmptStyle_ === 'style2'">
            <sub-home-user-interest-style1 :cardList="cardList" />
        </view>
        <view v-if="cmptStyle_ === 'style3'">
            <sub-home-user-interest-style2 :cardList="cardList3" />
        </view>
    </view>
</template>

<script>
export default {
    props: {
        cardList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            cardList3: [
                {
                    label: '我的余额',
                    icon: 'user/index/balance.png',
                    path: 'myBalance',
                },
                {
                    label: '地址管理',
                    icon: 'user/index/addr.png',
                    path: 'address',
                },
                {
                    label: '联系客服',
                    icon: 'user/index/kefu.png',
                    isJump: true,
                    path: 'handleCustomerService',
                },
                {
                    label: '设置',
                    icon: 'user/index/setting.png',
                    path: 'informationSet',
                }
            ],
        }
    },
}
</script>

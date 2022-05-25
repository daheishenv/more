<template>
    <view class="my-panel">
        <c-cell title="常用功能" border :titleStyle="{ fontSize: '32rpx', fontWeight: 'bold' }"></c-cell>
        <c-cell v-for="(item, i) in cardList" :key="i" @click="handleClick(item)" :border="i !== cardList.length - 1" arrow :icon="item.icon" iconSize="42" :title="item.label"></c-cell>
    </view>
</template>

<script>
export default {
    name: 'user-interest',
    props: {
        cardList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {}
    },
    methods: {
        handleClick(item){
            if(item.isJump) {
                this[item.path]()
                return
            }
            this.$jump(item.path)
        },
        handleCustomerService() {
            console.log('1232131');
			let url = this.shopInfo_.customer_url;
			if (!url) return this.$toast('未配置地址');
			this.$serverJump({
				app_page: (/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g.test(url) ? url : this.$config.hostUrl + url)
			});
		},
    }
}
</script>

<style lang="scss" scoped>
.my-panel {
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    font-size: 24rpx;
}
</style>

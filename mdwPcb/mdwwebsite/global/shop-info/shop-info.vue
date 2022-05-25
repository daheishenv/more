<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-12-22 11:46:58
-->
<template>
    <div
        v-if="detail"
        class="shop-info flex align-center"
    >
        <div class="shop-info-hd flex align-center">
            <img
                class="shop-info__logo"
                :src="detail.logo"
            />
            <div class="flex-1">
                <p class="shop-info__name">{{ detail.name }}</p>
                <p class="shop-info__address">地址：{{ detail.address }}</p>
            </div>
        </div>
        <div class="shop-info-bd flex-1 text-center">
            <div class="flex justify-center shop-info__text">
                <img
                    class="shop-info__gold"
                    src="/images/gold.png"
                />
                账户余额 (元)
            </div>
            <p class="shop-info__balance">{{ detail.total_money }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BShopInfo',
    computed: {
        detail() {
            return this.$store.state.userInfo
        }
    }
}
</script>
<style lang="scss" scope>
.shop-info {
    background-color: #fff;
    padding: 42px 0;
    &-hd {
        width: 58.66666667%;
        padding-left: 40px;
        position: relative;
        &::after {
            content: "";
            width: 1px;
            height: 90px;
            background-color: #d6d6d6;
            @include site(null, 0);
        }
    }
    &__logo {
        width: 120px;
        height: 120px;
        border: 1px solid #d6d6d6;
        border-radius: 100%;
        margin-right: 20px;
    }
    &__gold {
        width: 20px;
        height: 20px;
        display: block;
        margin-right: 6px;
    }
    &__name {
        font-size: 28px;
        font-weight: bold;
        color: #333333;
        line-height: 40px;
    }
    &__address {
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        line-height: 25px;
        margin-top: 16px;
    }
    &__text {
        font-size: 16px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
    }
    &__balance {
        font-size: 40px;
        font-weight: bold;
        color: $--color-primary;
        line-height: 56px;
        margin-top: 12px;
    }
}
</style>

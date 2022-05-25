<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-06-25 19:18:08
-->
<template>
    <div>
        <b-header />
        <div class="main-container">
            <b-shop-info class="mt30" />
            <div class="mt20 flex">
                <div class="w200">
                    <b-manage-menu />
                </div>
                <div class="flex-1 ml20 white-bg">
                    <Nuxt />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

    data() {
        return {}
    }
}
</script>

<style lang="scss">
.w200 {
    width: 200px;
}
.white-bg {
    background-color: #fff;
}
</style>

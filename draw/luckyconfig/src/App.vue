<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:01:01
-->
<script>
export default {
    onLaunch: function () {
        console.log('App Launch')
        // 获取配置  颜色 以及 底部菜单
        this.$store.dispatch('config/setShopConfig')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    }
}
</script>

<style lang="scss">
/*每个页面公共css */
/* #ifndef APP-PLUS-NVUE */
@import '~@/common/index.scss';
/* #endif */
</style>

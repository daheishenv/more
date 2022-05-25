<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-10 09:32:25
-->
<script>
import { getQueryVariable } from '@/utils/utils'
export default {
    onLaunch: function () {
        // 属性修改默认值
        // this.$store.dispatch('initData')
        this.$store.state.page_id = getQueryVariable('page_id')
        this.$store.commit('SET_ROUNTE_PARAM', {
            login_uid: getQueryVariable('login_uid'),
            username: getQueryVariable('username')
        })
        // 获取配置  颜色 以及 底部菜单
        this.$store.dispatch('config/setShopConfig');
    },
    onShow: function () {
    },
    onHide: function () {
    },
    methods: {
    }
}
</script>

<style lang="scss">
/* 引入框架的样式 star */
@import '~zzsp-saas-ui/common/index.scss';
/* 引入框架的样式 end */

/* 自身项目样式 star */
@import '~@/common/styles/common.scss';
// 通用图标
@import '~@/common/styles/iconfont.css';
@import '~@/common/styles/drag-font.css';
@import '~@/assets/style/elReset.scss';

body,
html {
    font-size: 16px;
}
</style>


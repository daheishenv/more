/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:31:37
 */
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)

// console.log(ROUTES)


//初始化
const router = new Router({
    routes: ROUTES,
    h5: {
        loading: false, //是否显示加载动画
        paramsToQuery: true, //h5端通过params传参 刷新会丢失 开启此开关将变成?连接的方式
    },
    encodeURI: false
});

export default router
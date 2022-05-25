/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-16 21:06:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-27 10:55:14
 */
import Vue from 'vue'
import App from '@/App'


import store from '@/store'
// 路由插件
import { RouterMount } from 'uni-simple-router'
import '@/common/router'

Vue.config.productionTip = false
App.mpType = 'app'

// core-js版本跟element-ui有关联，详情看文章
// https://blog.csdn.net/qq_32855007/article/details/108726430
// 使用element作为交互的UI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)

// 全局变量
import global from '@/common/utils/global'
Vue.use(global)

import basicCmpts from '@/utils/importBasics'
Object.keys(basicCmpts).forEach(cmpt => {
    Vue.component(cmpt, basicCmpts[cmpt])
})

const app = new Vue({
    ...App,
    store
});

// v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app')
// #endif
// #ifndef H5
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif

/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-06-28 17:18:46
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'

import VueUeditorWrap from 'vue-ueditor-wrap'
// 或者在 main.js 里将它注册为全局组件
Vue.component('vue-ueditor-wrap', VueUeditorWrap)

Vue.config.productionTip = false

Vue.use(ElementUI)

//定义一个新的Message方法，多传入一个offset参数
const $message = options => {
    return ElementUI.Message({
        ...options,
        offset: 150
    });
};
//重写一遍success的方法,将offset写入options
['success', 'warning', 'info', 'error'].forEach(type => {
    $message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options,
                offset: 90
            };
        }
        options.type = type;
        return ElementUI.Message(options);
    };
});
Vue.prototype.$message = $message

App.mpType = 'app'
Vue.prototype.$store = store



// 加入托拉拽基础组件
import basicCmpts from '@/utils/importBasics'
Object.keys(basicCmpts).forEach(cmpt => {
    Vue.component(cmpt, basicCmpts[cmpt])
})

import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)


// 导入各种配置
import apiList from '@/common/service/modules/index'
import globalMixins from '@/common/mixins/globalMixins'
import config from '@/config'
import saasUI, {
    RouterMount
} from 'zzsp-saas-ui'
import {
    beforeEach,
    afterEach
} from '@/common/router/router-ctrl'
import { getQueryVariable } from '@/utils/utils'
const tokenData = {
    token: getQueryVariable('token')
}
uni.setStorageSync('jscode2session', tokenData)
Vue.use(saasUI, {
    // 共用配置 this.$config
    config,
    // 全局混入的mixins
    mixins: [globalMixins],
    // 路由相关的配置的拦截函数
    router: {
        beforeEach,
        afterEach
    },
    // 请求相关的配置
    http: {
        // 请求头字段配置（baseURL无效），设置请求地址请在下面的apiConfig里面进行配置
        header: {
            // 对应的值支持传入方法，动态拿值
            // 'uuid': () => uni.getStorageSync('xxxx'),
            'app-version': config.version, // 版本号
            'app-type': config.platformType, // 平台类型
            'shop-uid': () => getQueryVariable('shop_uid'), // 商家id
            // #ifdef MP-WEIXIN
            'applet-appid': config.appId, // 商家id
            'template-id': config.templateId, // 小程序模板id
            'user-version': config.userVersion || '', // 小程序模板id
            // #endif
            'app-from': () => encodeURIComponent(uni.getStorageSync(config.fullPageCatch) || ''),
            'Authorization': () => `bearer ${tokenData.token}`
        },
        apiConfig: {
            // 代理名称
            proxyName: '/ssApi',
            // 获取token的接口，跟缓存配置有关系，这边不会请求，只会取缓存
            tokenApi: '/WxApp/wxuserinfo',
            // 刷新token接口
            refreshApi: 'WxApp/shuaxin',
            // 域名切换的缓存时间
            apiCatchTime: 3660 * 24 * 1000,
            // 备用域名配置,至少配置一个,这边会自动设置baseUrl，至少传入一个域名，H5本地调试会自己代理到proxyName
            domainList: config.domainList
        },
        // 所有的api列表
        apiList
    }
})

const app = new Vue({
    ...App,
    store
})

// v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app')
// #endif
// #ifndef H5
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif
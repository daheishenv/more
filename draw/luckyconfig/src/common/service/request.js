/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-06-21 15:52:38
 */
import Vue from 'vue'
import commonConfig from '@/common/config'
import { resendRefreshRequest } from './index'
import { getQueryVariable } from '@/common/utils/utils'
import Refresh from './refreshToken'

import Request from 'luch-request' // 下载的插件

/**
 * 修改全局配置示例
 **/
const http = new Request({
    // #ifdef H5
    baseURL: process.env.NODE_ENV == 'production' ? commonConfig.hostUrl : '/ssApi',
    // #endif
    // #ifndef H5
    baseURL: commonConfig.hostUrl,
    // #endif
    header: {
        'Content-Type': 'application/json; charset=utf-8',
        'app-version': commonConfig.version, // 版本号
        // 'app-type': commonConfig.platformType, // 平台类型
        'app-type': 6, // 平台类型
        'shop-uid': getQueryVariable('shop_uid'), // 商家id
        // #ifdef MP-WEIXIN
        'applet-appid': commonConfig.appId, // 商家id
        'template-id': commonConfig.templateId, // 小程序模板id
        'user-version': commonConfig.userVersion || '' // 小程序模板id
        // #endif
    },
    validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
        return statusCode >= 200 && statusCode < 300
    }
})
const refreshToken = Refresh.initRefreshToken()
/* 请求之前拦截器。可以使用async await 做异步操作 */
http.interceptors.request.use(async (config) => {
    config.data = {
        ...config.data
    }
    const otherHeader = {
        'app-from': encodeURIComponent(uni.getStorageSync(commonConfig.fullPageCatch) || '')
    }
    // 无法避免多次请求
    // if (config.url !== '/WxApp/wxuserinfo' && config.method !== 'UPLOAD') {
    //     let { data: { token } } = await Vue.prototype.$http('wxuserinfo', null, {
    //         source: 'catch'
    //     })
    //     token || commonConfig.platformType !== 5 ? '' : commonConfig.shopUserTokenCatchName && (token = (uni.getStorageSync(commonConfig.shopUserTokenCatchName) || {}).token)
    //     token && (otherHeader['Authorization'] = `bearer ${token}`)
    // }
    // 根据iframe参数设置token
    let variable = getQueryVariable('token')
    variable && (otherHeader['Authorization'] = `bearer ${variable}`)
    config.header = {
        ...config.header,
        ...otherHeader
    }
    return config
}, (err) => {
    return err
})

/**
 * 1.正在刷新跳过
 * 20200 token无效
 */
http.interceptors.response.use((response) => {
    // 下载文件
    if (!response.data) {
        response.data = {}
        response.data.code = 0
    }
    // token过期
    if (((refreshToken.isRefresh && response.data.code !== 0) || response.data.code === 20202) && response.config.url !== 'WxApp/shuaxin') {
        // 刷新token状态中
        if (!refreshToken.isRefresh) {
            refreshToken.setRefreshType(true)
            // 刷新token
            return resendRefreshRequest().then((e) => {
                refreshToken.notifyTaskReload()
                refreshToken.setRefreshType(false)
                return http.request(response.config)
            })
                .catch((v) => {
                    refreshToken.clearTask()
                    refreshToken.setRefreshType(false)
                    return response.data
                })
        }
        return new Promise((r, s) => {
            // 将需要重新请求的接口添加到队列中
            refreshToken.addTask((isError) => {
                if (isError) {
                    return r(response)
                }
                http.request(response.config).then(r).catch(s)
            })
        })
    } else {
        if (response.data.code === 20200 && uni.getStorageSync('jscode2session')) {
            /**
            * 判断溜走的请求携带的token是否是等于老token并且不等于新token
            * 如果是则重新在发起请求
            */
            const requestToken = response.config.header.Authorization
            const prevToken = uni.getStorageSync('prveTokenSession')
            const newToken = uni.getStorageSync('jscode2session')
            const prevCondition = prevToken && newToken
            if (prevCondition && requestToken === `bearer ${prevToken}` && requestToken !== `bearer ${newToken.token}`) {
                return http.request(response.config)
            }
        }
        const {
            data = {},
            statusCode,
            tempFilePath
        } = response
        let message = data.msg
        if (statusCode !== 200) { // 服务端返回的状态码不等于200，则reject()
            data.code = 99
            if (statusCode === 404) {
                message = '资源不存在'
            }
        } else {
            data.code = data.result && data.code === 0 ? 0 : data.code
        }
        data.msg = message
        if (tempFilePath) {
            data.tempFilePath = tempFilePath
            data.code = 0
            data.msg = '下载文件成功'
        }
        return data
    }
}, response => response)

/* 请求之后拦截器。可以使用async await 做异步操作  */
// http.interceptors.response.use((response) => {

// }, (response) => {
//     return response
// })

export default http

import store from '@/store'
import Vue from 'vue'
const that_ = Vue.prototype

let isSetLocation = false
let shopInfo = {}
async function getShopInfo() {
    let { data } = await that_.$http('shopInfo')
    shopInfo = data
    store.commit('config/SET_SHOP_INFO', data)
    let {
        data: { token }
    } = await that_.$http('wxuserinfo', null, {
        source: 'catch'
    })
    console.log('商户是否开启了地址定位:', data.lbs_status === 1)
    if (token && !isSetLocation && data.lbs_status === 1) {
        uni.getLocation({
            type: 'gcj02',
            geocode: true,
            success: async ({ latitude, longitude, errMsg }) => {
                if (errMsg === 'getLocation:ok') {
                    const { data } = await that_.$http('saveUsersLbs', {
                        latitude,
                        longitude
                    })
                    isSetLocation = true
                }
            },
            fail: err => {
                console.log(err)
            }
        })
    }
}

//全局路由前置守卫uniapp微信网页授权成功之后，点击后退出现空白页
export function beforeEach(to, from, next) {
    if (to.path !== from.path) {
        getApp().globalData.errModalFlag = false
    }
    if (JSON.stringify(shopInfo) !== '{}' && to.name === from.name && JSON.stringify(to.query) === JSON.stringify(from.query)) return next(false)

    let { meta = {} } = to

    /**
     * 打烊之后页面不显示，就要请求店铺基本信息
     */
    // #ifdef MP-WEIXIN
    if (to.name !== 'home') {
        getShopInfo() //不要await，不然用户点击过快会导致打开多个页面
    }
    // #endif
    // #ifndef MP-WEIXIN
    getShopInfo() //不要await，不然用户点击过快会导致打开多个页面
    // #endif
    if (((meta.storeClose !== 'show' && shopInfo.status === 0) || shopInfo.is_expire === 1 || shopInfo.stopService === 1) && to.name !== 'storeClose') {
        return next({
            NAVTYPE: 'replaceAll',
            name: 'storeClose',
            params: {
                lastName: from.name,
                lastQuery: JSON.stringify({
                    ...from.query
                }),
                prevPath: from.path,
                ...to.query
            }
        })
    }

    if (to.name === 'login') {
        isSetLocation = false
        // #ifdef APP-PLUS
        return next({
            name: 'sms-login',
            query: to.query
        })
        // #endif
    }

    // #ifdef H5
    let aliasPath = to.aliasPath ? to.aliasPath : to.query.path
    // #endif
    // #ifndef H5
    let aliasPath = to.query.path
    // #endif

    let entryUrlVal = `${aliasPath ? aliasPath : to.path}${that_.$c.parse(to.query)}`.substr(1)
    uni.setStorageSync(that_.$config.fullPageCatch, entryUrlVal)

    // #ifdef H5
    /**
     * XXX: 修复iOS版微信HTML5 History兼容性问题,如果这样子写 页面跳转瞬间 样式会错乱
     * 参考链接：
     * https://www.jianshu.com/p/a1a31f9da272
     * https://github.com/vuejs/vue-router/issues/481
     * https://zhuanlan.zhihu.com/p/31887792
     * https://segmentfault.com/a/1190000014455713
     * */
    if (window.entryUrl == '' || window.entryUrl == undefined) {
        window.entryUrl = window.location.href // 将后面的参数去除
    }

    let openId = to.query.open_id ? to.query.open_id : that_.$session.get(that_.$config.gzhOpenIdCatchName)
    openId ? that_.$session.set(that_.$config.gzhOpenIdCatchName, openId) : ''
    if (that_.$isWechatBrowser && to.name !== 'storeClose' && !openId && that_.$config.platformType !== 5) {
        if (!openId && to.name !== 'redirect') {
            uni.removeStorageSync('iosEntryUrl')
            return next({
                name: 'redirect',
                query: {
                    lastName: to.name,
                    lastQuery: JSON.stringify({ ...to.query }),
                    prevPath: to.path,
                    aliasPath: to.aliasPath,
                    ...to.query
                }
            })
        }
    }
    if (openId && to.name === 'redirect' && getCurrentPages().length <= 1) {
        return next({
            name: 'home'
        })
    }
    // #endif
    // 修复不存在地址,以及重定向过来返回白屏问题 || 解决ios后退问题,这个返回是不被允许的
    if (!to.name) {
        return next({
            name: 'home'
        })
    }

    //之后可能加其他的，可以用来做登录返回上一页
    if (to.query.action === 'referrer') {
        delete to.query.action
        next({
            NAVTYPE: to.query.replace ? 'replace' : 'push',
            name: to.name,
            query: {
                lastName: from.name,
                lastQuery: JSON.stringify({
                    ...from.query
                }),
                prevPath: from.path,
                ...to.query
            }
        })
        return
    }

    next()
}

// 全局路由后置守卫
export async function afterEach(to, from) {
    /**
     * 调用埋点
     */
    let userInfoRes = await that_.$http(
        'userInfo',
        {},
        {
            source: 'catch'
        }
    )
    // 跳过埋点白名单
    if (that_.$config.trajectoryWhite.includes(to.name)) return
    Object.keys(userInfoRes.data).length && guestRecord(to)
}

/** *
 * 埋点
 */
export async function guestRecord(to) {
    let {
        data: { token }
    } = await that_.$http('wxuserinfo', null, {
        source: 'catch'
    })
    if (!token) return false
    let shareUserId = uni.getStorageSync(that_.$config.shareParentName)
    let uuid = that_.$session.get(that_.$config.uuidCatchName)
    //如果没有uuid就重新生成一个
    if (!uuid) {
        uuid = that_.$c.guid()
        that_.$session.set(that_.$config.uuidCatchName, uuid)
    }
    let relate_id = Number(to.query.detailId)
    relate_id = isNaN(relate_id) ? '' : relate_id
    // 获取第一次进入的页面
    const firstIntPageCatch = uni.getStorageSync(that_.$config.firstIntPageCatchName) || to
    let source_id = firstIntPageCatch.query?.source_id || firstIntPageCatch.query?.detailId || relate_id
    source_id = Number(source_id)
    source_id = isNaN(source_id) ? '' : source_id
    const query = that_.$deepClone(to.query)
    query.jumpName = to.name
    delete query.lastName
    delete query.lastQuery
    delete query.prevPath
    that_.$http('setGuestRecord', {
        relate_id,
        relate_type: to.meta?.relate_type || 99,
        source_type: Number(firstIntPageCatch.query?.source_type || firstIntPageCatch.query?.relate_type || firstIntPageCatch.meta?.relate_type),
        source_id,
        random_str: uuid,
        // 用于跳转
        param_url: '/home/redirect/index' + that_.$c.parse(query),
        share_user_id: shareUserId ? shareUserId : '',
        platform_type: that_.$config.platformType
    })
}

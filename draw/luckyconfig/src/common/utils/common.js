/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-06-16 09:04:32
 */
import Vue from 'vue'
import Router from '@/common/router'
import { getVariableType, isEmpty, deepClone } from '@/common/utils/tools'
import { getUrlQuery } from '@/common/utils'

/*
    消息提示框
    title String 是 提示的内容，长度与 icon 取值有关。
    icon String 否 图标，有效值 "success", "loading", "none"
    duration Number 否 提示的延迟时间，单位毫秒，默认：1500
    image String 否 自定义图标的本地路径
    mask Boolean 否 是否显示透明蒙层，防止触摸穿透，默认：false
*/
export function showToast(msg, icon = 0, duration = 1500, mask = true, image = false) {
    if (!msg) return;
    const icons = ['none', 'success', 'loading']
    const _icon = icons[icon];
    let params = {
        icon: _icon,
        title: msg,
        duration: duration,
        // #ifndef MP-TOUTIAO
        mask: mask
        // #endif
    }
    image && (params.image = image);
    uni.showToast(params);
}


// loading框
export function showLoading(msg = '加载中', mask = true) {
    let params = {
        // #ifndef MP-TOUTIAO
        mask: mask,
        // #endif
        title: msg
    }
    uni.showLoading(params);
}

// 隐藏loading框
export function hideLoading() {
    uni.hideLoading();
}

/*
    显示对话框
    title	String	是	提示的标题
    content	String	是	提示的内容
    showCancel	Boolean	否	是否显示取消按钮，默认为 true
    cancelText	String	否	取消按钮的文字，默认为"取消"，最多 4 个字符
    cancelColor	HexColor	否	取消按钮的文字颜色，默认为"#000000"	H5、微信小程序、百度小程序
    confirmText	String	否	确定按钮的文字，默认为"确定"，最多 4 个字符
    confirmColor	HexColor	否	确定按钮的文字颜色，H5平台默认为"#007aff"，微信小程序平台默认为"#3CC51F"，百度小程序平台默认为"#3c76ff"	H5、微信小程序、百度小程序
    success	Function	否	接口调用成功的回调函数
    fail	Function	否	接口调用失败的回调函数
    complete	Function	否	接口调用结束的回调函数（调用成功、失败都会执行）
*/
export function showModal({
    title = '',
    content = '这是一个模态框',
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#666',
    confirmText = '确定',
    confirmColor = '#0260fe',
    success,
    fail,
    complete
}) {
    uni.showModal({
        title: title,
        content: content,
        showCancel: showCancel,
        cancelText: cancelText,
        cancelColor: cancelColor,
        confirmText: confirmText,
        confirmColor: confirmColor,
        success: (res) => {
            success && success(res);
        },
        fail: (err) => {
            fail && fail(err);
        },
        complete: (res) => {
            complete && complete(res);
        }
    });
}


/**
 *@description 判断微信浏览器还是h5
 * @param {*} Boolean 任意数据类型 Boolean
 * @return {string} 返回数据类型有 Boolean
 */
export const isWechatBrowser = (() => {
    // #ifdef H5
    let ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false;
    // #endif
    return false
})();

export const sessionCatch = {
    // #ifdef H5
    set(key, val) {
        let sessionKey = key + 'Session';
        let type = typeof val;
        sessionStorage.setItem(sessionKey, JSON.stringify({
            type: type,
            data: val
        }));
    },
    get(key) {
        let sessionKey = key + 'Session';
        let data = JSON.parse(sessionStorage.getItem(sessionKey) || '{}');
        return data.data;
    },
    remove(key) {
        let sessionKey = key + 'Session';
        sessionStorage.removeItem(sessionKey)
    },
    clear() {
        sessionStorage.clear();
    },
    // #endif
    // #ifndef H5
    set(key, val) {
        let sessionKey = key + 'Session';
        uni.setStorageSync(sessionKey, val);
    },
    get(key) {
        let sessionKey = key + 'Session';
        return uni.getStorageSync(sessionKey);
    },
    remove(key) {
        let sessionKey = key + 'Session';
        uni.removeStorageSync(sessionKey);
    },
    clear() {
        let allSession = uni.getStorageInfoSync('uni-storage-keys').keys;
        allSession.forEach(key => {
            if (key.indexOf('Session') !== -1) {
                uni.removeStorageSync(key);
            }
        });
    }
    // #endif
}
/**
 * @description 跳转函数
 * @param {string} name 路由名称或者页面路径 用/开头
 * @param {object,null} params跳转参数
 * @param {string} method跳转方法
 * @param {function,null} 跳转地址错误回调
 */

export const jumpPage = (name, params = {}, method = 'push', errFn) => {
    if (!name) return;
    params = params ? params : {};
    if (name.indexOf('?')) {
        let routeObj = getUrlQuery(name);
        name = routeObj.path;
        params = Object.assign({}, params, routeObj.query);
    }
    let jumpRouteObj = ROUTES.find(o => o.name === name || o.path === name || o.aliasPath === name);
    if (!jumpRouteObj) {
        errFn && errFn();
        return console.error('[fatal error] 路由地址错误，『' + name + '』不存在路由表中');
    }
    params = formatParams(params) || {};
    Router[method]({
        name: jumpRouteObj.name,
        params: params
    })
}

export const jumpPageDetail = (name, id, params = {}, method = 'push') => {
    params = params ? params : {};
    params.detailId = id;
    params = formatParams(params) || {};
    if (!name) return;
    return jumpPage(name, params, method);
}

/**
 * @description 跳转函数
 * @param {Object, null} params 要修改或者向上一页传递的值
 * @param {Object, null} extraQuery 上一页的值，不参数参数传递
 * @param {replace} 是否强制替掉所有页面（主要用于解决强登录带来的bug）
 */
export const backRef = (params = {}, extraQuery = {}, replace = false) => {
    params = params ? params : {};
    extraQuery = extraQuery ? extraQuery : {};
    let that_ = Vue.prototype;
    //小程序端有问题，所以需要加$nextTick
    that_.$nextTick(() => {
        let query = Object.assign({}, that_.$Route.query, extraQuery);
        if (!query.lastName) { //没有上一页指定则正常返回
            return backPage();
        }
        let pages = getCurrentPages(); //全部页面
        let prevPage = pages[pages.length - 2]; //上一个页面
        let lastQuery = JSON.parse(query.lastQuery || '{}');
        // let isExitQuery = Object.keys(params).every(o => {//多次切换会导致返回同一个页面
        //     return Object.keys(lastQuery).findIndex(o1 => o1 === o) !== -1;
        // })
        let isExitQuery = false;
        if (replace || isExitQuery || pages.length === 1 || ('/' + prevPage.route) !== decodeURIComponent(query.prevPath)) {
            jumpPage(query.lastName, Object.assign({}, lastQuery, params), replace ? 'replaceAll' : 'replace');
        } else {
            Object.keys(params).forEach(key => {
                prevPage.$vm[key] = params[key];
            })
            backPage();
        }
    })
}

/**
 *@description 返回上一页
 */
export const backPage = () => {
    if (getCurrentPages().length === 1) {
        jumpPage('home', {}, 'replace');
    } else {
        Router.back();
    }
}
/**
 *@description 专题页跳转以及后端配置地址跳转
 */
export const serverJump = ({
    app_page,
    id,
    keyword,
    cat_id,
    hideTitle
}) => {
    if (!app_page) return;
    if (/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g.test(app_page)) {//远端地址
        jumpPage('webView', {
            url: app_page,
            hideTitle
        });
    } else if (cat_id || keyword) {
        jumpPage(app_page, {
            cat_id,
            keyword
        });
    } else if (id) {
        jumpPageDetail(app_page, id);
    } else {
        jumpPage(app_page);
    }
}


/**
 * 数据 按照 拼音首字母 排序 并分组
 *
 * @param {Json} data ; 需要 排序的 数据
 * @param {String} field ；必须；排序所依据的 字段 名
 *
 * @return {Json} ; 例如：{A:[{},{}],B:[{},{}],C:[{}],#:[]}
 */
const data_letter_sort = (data, field) => {
    let letter_reg = /^[A-Z]$/;
    let list = new Array();
    let letter = '';
    for (let i = 0; i < data.length; i++) {
        // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
        list['#'] = new Array();
        // 首字母 转 大写英文
        letter = (data[i][field]).substr(0, 1).toUpperCase();
        // 是否 大写 英文 字母
        if (!letter_reg.test(letter)) {
            letter = '#';
        }
        // 创建 字母 分组
        if (!(letter in list)) {
            list[letter] = new Array();
        }
        // 字母 分组 添加 数据
        list[letter].push(data[i]);
    }
    // 转换 格式 进行 排序；
    var resault = new Array();
    for (var key in list) {
        resault.push({
            letter: key,
            list: list[key]
        });
    }
    resault.sort(function (x, y) {
        return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
    });
    // # 号分组 放最后
    var last_arr = resault[0];
    resault.splice(0, 1);
    resault.push(last_arr);

    // 转换 数据 格式
    var json_sort = {}
    for (var i = 0; i < resault.length; i++) {
        json_sort[resault[i].letter] = resault[i].list;
    }

    return json_sort;
}

function formatParams(params = {}) {
    let newParams = {};
    Object.keys(params).forEach(o => {
        let item = String(params[o]);
        !['undefined', 'null'].includes(item) && (newParams[o] = params[o]);
    })
    return newParams;
}


export default {
    $back: function () { } || backPage,
    $backRef: function () { } || backRef,
    $jump: jumpPage,
    $deepClone: deepClone,
    $typeOf: getVariableType,
    $hideLoading: hideLoading,
    $isWechatBrowser: isWechatBrowser,
    $session: sessionCatch,
    $loading: showLoading,
    $modal: showModal,
    $toast: showToast,
    $serverJump: function () { } || serverJump,
    $jumpDetail: function () { } || jumpPageDetail,
    $data_letter_sort: data_letter_sort,
    $isEmpty: isEmpty
}

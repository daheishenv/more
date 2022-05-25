/**
 * 页面调用示例
 * H5 和 APP示例
 * import shareFn from '@/common/mixins/share'
 * shareFn.call(this, params);
 */

// #ifdef H5
import jweixin from 'jweixin-module'
// 验证分享
function wxH5Share() {
    return new Promise(async (resolve, reject) => {
        if (!this) {
            return reject({
                code: -1,
                msg: '请用『方法名』.call(this)来调用',
            })
        }

        // 获取分享参数
        let shareData = await this.assignShare()
        if (!shareData) return

        let shareConfig = {
            title: shareData.title, //分享的title
            desc: shareData.summary, //分享的文案
            link: shareData.path, //分享点击后的跳转地址
            imgUrl: shareData.imageUrl, //分享图片
            success: (e) => {
                console.log(e)
            },

        }

        console.log('---------微信分享数据---------')
        console.log(shareConfig)
        let shareUrl = uni.getSystemInfoSync().platform === 'ios' ? window.entryUrl : (window.location.origin + this.$router.options.base + uni.getStorageSync(this.$config.fullPageCatch))
        console.log('分享地址：', shareUrl)
        if (!shareUrl) return

        console.log('--------我初始化了分享--------')
        let {
            data
        } = await this.$http('wechatShare', {
            url: shareUrl
        })

        jweixin.config({
            debug: data.debug,
            appId: data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: shareData.jsApiList,
        })

        jweixin.ready(() => {
            // 分享设置
            shareData.jsApiList.forEach(o => {
                jweixin[o](shareConfig)
            })
        })
    })
}

export default wxH5Share
// #endif

// #ifdef APP-PLUS

function appShare(scene = 'WXSceneSession') {
    return new Promise(async (resolve, reject) => {
        if (!this) {
            return reject({
                code: -1,
                msg: '请用『方法名』.call(this, params)来调用',
            })
        }

        // 获取分享参数
        let shareData = await this.assignShare()
        if (!shareData) return

        uni.share({
            provider: 'weixin',
            scene: scene,
            type: 0, //0图文  5分享为小程序
            href: webUrl + shareData.path,
            title: shareData.title,
            summary: shareData.summary,
            imageUrl: shareData.imageUrl,
            //分享为小程序
            // miniProgram: {
            //     id: 'gh_abcdefg',
            //     path: path,
            //     type: 0,
            //     webUrl: webUrl
            // },
            success: (res) => {
                console.log(JSON.stringify(res))
                this.hasClickShare = true
                resolve({
                    code: 0,
                    data: res,
                })
            },
            fail: (err) => {
                console.log('fail:' + JSON.stringify(err))
                reject({
                    code: -1,
                    data: err,
                })
            },
        })
    })
}

export default appShare
// #endif

// 保存参数执行次数
let saveShareParamsNum = 0, maxSaveNum = 3
// 保存分享参数
export function saveShareParams() {
    saveShareParamsNum++
    if (!this) {
        return reject({
            code: -1,
            msg: '请用『方法名』.call(this, params)来调用',
        })
    }
    // hasParentNode防止H5执行多次
    // #ifdef H5
    let hasParentNode = this.$parent
    // #endif
    // #ifndef H5
    let hasParentNode = true
    // #endif
    // 隔一段时间清空一下函数调用次数，时间不得低于1000（1秒）
    this.$c.debounce(() => {
        saveShareParamsNum = 0
    }, 2500)
    if (getCurrentPages().length === 0) {
        setTimeout(() => {
            saveShareParamsNum <= maxSaveNum ? saveShareParams.apply(this) : ''
        }, 100)
        return
    }
    if (this.$root._uid === this._uid && hasParentNode) {
        console.log('-----保存分享参数 star-----')
        console.log('入参：', this.$Route.query)
        try {
            const {
                parent_id,
                detailId
            } = this.$Route.query
            if (parent_id) {
                uni.setStorageSync(this.$config.shareParentName, parent_id)
                // 针对购买商品
                uni.setStorageSync(this.$config.shareOriginName, {
                    parent_id: parent_id,
                    routeName: this.$Route.name,
                    detailId: detailId
                })
                console.log('我拿到了上级parent_id：' + parent_id)
            }

            console.log('设置缓存完毕')
            saveShareParamsNum = 0
        } catch (e) {
            //TODO handle the exception
            setTimeout(() => {
                saveShareParamsNum <= maxSaveNum ? saveShareParams.apply(this) : ''
            }, 100)
        }
        console.log('-----保存分享参数 end-----')
    }
}

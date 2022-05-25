// #ifndef MP-WEIXIN
import shareFn from '@/common/mixins/share'
// #endif
// eslint-disable-next-line no-duplicate-imports
import { saveShareParams } from '@/common/mixins/share'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            shareParams: {}, // 分享参数
            hasClickShare: false, // 是否点击了分享
            isOpenIntegralShare: false // 是否开启分享送积分
        }
    },
    computed: {
        ...mapState({
            shopInfo_: state => state.config.shopInfo ? state.config.shopInfo : {}
        })
    },
    onLoad() {
        this.hasClickShare = false
        this.isOpenIntegralShare = false
        let hasParentNode = ''
        // hasParentNode防止H5执行多次
        // #ifdef H5
        hasParentNode = this.$parent
        // #endif
        // #ifndef H5
        hasParentNode = true
        // #endif

        if (this.$root._uid === this._uid && hasParentNode) {
            this.shareParams = Object.assign({}, this.$config.shareDefault)
        }

        // 分享是否开启
        this.getCreditShareState(6)
    },
    onShow() {
        let hasParentNode = ''
        // #ifdef H5
        hasParentNode = this.$parent
        // #endif
        // #ifndef H5
        hasParentNode = true
        // #endif
        // 防止在当个页面多次执行
        if (hasParentNode && this.$root._uid === this._uid) {
            // 用于初始化分享，后退也需要重置分享
            this.watchShopInfo()
            // 说明用户点击了分享并返回到了小程序
            if (this.hasClickShare) {
                console.log('用户点击了分享并返回到了小程序')
                this.hasClickShare = false
                // this.isOpenIntegralShare && 
                this.portUsersShare()
            }
        }
        // 加在onShow是为了解决  微信好友分享出去  用户点击a又退出(应用是没有关闭的)又点击b进来的分享问题
        this.$c.debounce(() => {
            saveShareParams ? saveShareParams.call(this) : ''
        }, 100)
    },

    // #ifdef MP-WEIXIN
    // 微信小程序分享，其他端分享文件@/common/mixins/share
    async onShareAppMessage() {
        const shareData = await this.assignShare()
        this.hasClickShare = true

        console.log('---------微信分享数据---------')
        console.log({
            ...shareData,
            desc: shareData.summary
        })

        return {
            ...shareData,
            desc: shareData.summary
        }
    },
    // 分享朋友圈(这边不支持异步分享)
    onShareTimeline() {
        const shareData = this.assignShareTimeLine()
        this.hasClickShare = true

        console.log('---------微信分享数据---------')
        console.log({
            ...shareData,
            query: shareData.path.split('?')[1] || {},
            imageUrl: shareData.imageUrl ? (shareData.imageUrl + '?x-oss-process=image/resize,m_fill,h_350,w_350') : undefined
        })

        return {
            ...shareData,
            query: shareData.path.split('?')[1],
            imageUrl: shareData.imageUrl ? (shareData.imageUrl + '?x-oss-process=image/resize,m_fill,h_350,w_350') : undefined
        }
    },
    // #endif
    methods: {
        // 获取积分状态(是否开启)
        async getCreditShareState(rule_type) {
            rule_type = (rule_type || this.$Route.meta && this.$Route.meta.integral_type) || 0
            try {
                const {
                    data: {
                        state = false
                    }
                } = await this.$http('creditState', {
                    rule_type,
                    relate_type: this.$Route.meta && this.$Route.meta.relate_type || 99
                })
                this.isOpenIntegralShare = state
            } catch (e) {
                this.isOpenIntegralShare = false
                // TODO handle the exception
            }
            console.log('积分分享状态：' + (this.isOpenIntegralShare ? '开启' : '关闭'))
        },
        // 用户分享送积分
        async portUsersShare() {
            const relate_type = this.$Route.meta && this.$Route.meta.relate_type || 99
            const userInfoRes = await this.$http('userInfo', {}, {
                source: 'catch'
            })
            if (Object.keys(userInfoRes.data).length === 0) return
            if (relate_type) {
                const {
                    msg
                } = await this.$http('usersShare', {
                    relate_id: this.$Route.query.detailId || 0,
                    relate_type
                })
                this.$toast(msg)
            }
        },
        watchShopInfo() {
            if (this.shopInfo_ && Object.keys(this.shopInfo_).length > 0) {
                this.h5CommonShare()
            } else {
                setTimeout(() => {
                    this.watchShopInfo()
                }, 100)
            }
        },
        calcShareParams() {
            if (!this.shopInfo_ && !this.shareParams) return false

            const shareParams = Object.assign({},
                this.$config.shareDefault,
                this.shareParams
            )

            shareParams.allowShare = String(this.$Route.meta && this.$Route.meta.allowShare) === 'false' ? false : shareParams.allowShare

            // #ifdef H5
            // H5分享地址拼接，不能直接用location.href(ios获取不到本页面，只能拿到上一个页面)
            const baseUrl = window.location.origin + this.$router.options.base
            const dLineIndex = shareParams.path.indexOf('/') + 1
            shareParams.path = baseUrl + (shareParams.path ? shareParams.path.substr(dLineIndex === 0 ? 0 : 1) : uni.getStorageSync(this.$config.fullPageCatch))
            // #endif
            // 分享默认地址（用途，不支持分享的页面就直接跳转到首页）
            let defaultPath = this.$config.shareDefault.path
            // #ifdef H5
            defaultPath = location.origin + this.$router.options.base
            // #endif

            // 如果分享地址为默认标题和描述,就要替换成店铺名和分享描述
            if (!shareParams.title || this.$config.shareDefault.title === shareParams.title && this.shopInfo_.share_name) {
                shareParams.title = this.shopInfo_.share_name
            }
            if (!shareParams.summary || this.$config.shareDefault.summary === shareParams.summary && this.shopInfo_.share_desc) {
                shareParams.summary = this.shopInfo_.share_desc
            }

            // 替换分享图片
            if (!shareParams.imageUrl || this.$config.shareDefault.imageUrl === shareParams.imageUrl && (this.shopInfo_.share_img || this
                .shopInfo_.log_img)) {
                shareParams.imageUrl = this.shopInfo_.share_img ? this.shopInfo_.share_img : this.shopInfo_.log_img
            }
            // 这种模式下,采用小程序当前页面截图
            if (shareParams.imageUrl === 'current_page_img') {
                // #ifdef MP
                delete shareParams.imageUrl
                // #endif
                // #ifndef MP
                shareParams.imageUrl = this.shopInfo_.share_img
                // #endif
            }

            let aliasPath = ''
            // #ifdef H5
            aliasPath = baseUrl + (this.$Route.aliasPath ? this.$Route.aliasPath : this.$Route.path).substr(1)
            // #endif
            // #ifndef H5
            aliasPath = this.$Route.path
            // #endif

            // 分享地址,要判断页面是否支持分享
            const path = shareParams.allowShare ? (defaultPath !== shareParams.path ? shareParams.path : aliasPath) : defaultPath
            console.log(defaultPath, 22222, shareParams, path, 99999)
            shareParams.path = path || aliasPath
            return shareParams
        },
        // 分享参数解析
        async assignShare() {
            const shareParams = this.calcShareParams()
            shareParams.path = await this.getShareUrl(shareParams.path)
            console.log('计算后的分享参数：', shareParams)
            return shareParams
        },
        assignShareTimeLine() {
            const shareParams = this.calcShareParams()
            shareParams.path = this.getTimeLineShareUrl(shareParams.path)
            console.log('计算后的分享参数：', shareParams)
            return shareParams
        },
        getTimeLineShareUrl(path) {
            // 获取是否有登录
            const { token } = uni.getStorageSync('jscode2session')
            let query = this.$Route.query
            if (token) {
                const userData = uni.getStorageSync('userInfo')
                if (userData && userData.uid) {
                    query.parent_id = userData.uid
                }
            }
            const relate_type = this.$Route.meta ? this.$Route.meta.relate_type : false
            if (relate_type) {
                query.relate_type = relate_type
            }

            const curPathObj = this.$c.getUrlQuery(path)
            query = Object.assign({}, query, curPathObj.query)
            delete query.open_id
            delete query.login_type

            return curPathObj.path + this.$c.parse(query)
        },
        // 获取分享地址
        async getShareUrl(path) {
            const {
                data: {
                    token
                }
            } = await this.$http('wxuserinfo', null, {
                source: 'catch'
            })
            let query = this.$Route.query
            if (token) {
                const {
                    data: userData
                } = await this.$http('userInfo')
                if (userData && userData.uid) {
                    query.parent_id = userData.uid
                }
            }

            const relate_type = this.$Route.meta ? this.$Route.meta.relate_type : false
            if (relate_type) {
                query.relate_type = relate_type
            }

            const curPathObj = this.$c.getUrlQuery(path)
            query = Object.assign({}, query, curPathObj.query)
            delete query.open_id
            delete query.login_type

            return curPathObj.path + this.$c.parse(query)
        },
        // 页面上实例化分享函数
        initShare(shareParams) {
            if (!shareParams || Object.keys(shareParams).length === 0) return
            this.$root.shareParams = shareParams
            this.h5Share()
        },
        // H5分享
        h5Share() {
            // #ifdef H5
            if (this.$isWechatBrowser) {
                shareFn.call(this)
            }
            // #endif
        },
        // app分享
        appShare() {
            // #ifdef APP-PLUS
            shareFn.call(this)
            // #endif
        },
        // H5通用分享
        async h5CommonShare() {
            // #ifdef H5
            if (this.$isWechatBrowser && (!this.$Route.query.detailId || String(this.$Route.meta && this.$Route.meta.allowShare) === 'false')) { // 不是文章类分享内容都是一致的
                if (uni.getSystemInfoSync().platform === 'ios') { // IOS
                    shareFn.call(this)
                } else {
                    // 安卓
                    setTimeout(() => {
                        shareFn.call(this)
                    }, 100)
                }
            }
            // #endif
        }
    }
}

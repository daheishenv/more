/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2021-05-29 10:19:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-22 18:44:34
 */
// import { mapState } from 'vuex'
export default {
    // #ifdef MP-WEIXIN
    options: {
        styleIsolation: 'shared'
    },
    // #endif
    props: {
        userInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // assetsList: {
        //     type: Array,
        //     default: () => []
        // }
    },
    computed: {
        // ...mapState('config', ['shopConfig', 'shopInfo']),
        colors_() {
            return this.shopConfig ? this.shopConfig.color : {}
        },
        isAuth_() {
            return true
            // 是否授权
            /**
             * @Number wx_app_auth 公众号授权 0 未授权 1 已授权
             * @String unionid 小程序unionid
             */
            const { wx_app_auth = 3 } = this.userInfo || {}
            let isAuth = !!wx_app_auth
            // #ifdef H5
            isAuth = !this.$isWechatBrowser ? true : wx_app_auth
            // #endif
            return isAuth
        }
    },
    methods: {
        async userInfoJump(path) {
            const { data: { token } } = await Vue.prototype.$http('wxuserinfo', null, {
                source: 'catch'
            })
            if (token) {
                this.$jump('informationUser')
            } else {
                this.$jump('login')
            }
        },
        // #ifdef MP-WEIXIN
        // 6800手机号绑定
        async wxUsersBindMobile({ detail }) {
            // 获取微信用户信息回调
            if (!detail.encryptedData) return
            const { code } = await this.getCode('weixin')
            const postData = { ...detail, code }
            const { bizCode, msg } = await this.$http('usersBindMobile', postData, { abort: false, loading: true })
            switch (bizCode) {
                case -41003: // 未授权
                    this.$toast('授权超时，请重新操作')
                    break
                case 1026:// 6800版本，绑定手机号成功
                    this.$emit('getuserinfo', {
                        type: 'getUserInfo',
                        detail: {}
                    })
                    break
                case 1025:// 6800版本，手机号已被使用（手机号被其他微信号占用）
                case 1027:// 6800版本，绑定手机号失败
                    this.$toast(msg)
                    break
                default:
                    this.$toast(msg)
                    break
            }
        },
        // #endif
    }
}

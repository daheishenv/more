import { mapState } from 'vuex'
export default {
    data() {
        return {
            zzspIconStyle: 'style1',
            allStyle: {
                ShopTheme1: {
                    searchList: 'style1',
                    user: 'style1',
                    shoppingCart: 'style1',
                    category: 'style1',
                    goodsDetails: 'style1',
                    orderList: 'style1',
                    refuseList: 'style1',
                    orderConfirm: 'style1',
                    businessCardProduct: 'style1'
                },
                ShopTheme2: {
                    searchList: 'style1',
                    user: 'style1',
                    shoppingCart: 'style1',
                    category: 'style1',
                    goodsDetails: 'style1',
                    orderList: 'style1',
                    refuseList: 'style1',
                    orderConfirm: 'style1',
                    businessCardProduct: 'style1'
                },
                ShopTheme3: {
                    searchList: 'style2',
                    user: 'style2',
                    shoppingCart: 'style2',
                    category: 'style2',
                    goodsDetails: 'style2',
                    orderList: 'style2',
                    refuseList: 'style2',
                    orderConfirm: 'style2',
                    businessCardProduct: 'style2'
                },
                ShopTheme4: {
                    searchList: 'style2',
                    user: 'style2',
                    shoppingCart: 'style2',
                    category: 'style2',
                    goodsDetails: 'style2',
                    orderList: 'style2',
                    refuseList: 'style2',
                    orderConfirm: 'style2',
                    businessCardProduct: 'style2'
                },
                ShopTheme5: {
                    searchList: 'style2',
                    user: 'style2',
                    shoppingCart: 'style2',
                    category: 'style2',
                    goodsDetails: 'style2',
                    orderList: 'style2',
                    refuseList: 'style2',
                    orderConfirm: 'style2',
                    businessCardProduct: 'style2'
                },
                ShopTheme6: {
                    searchList: 'style2',
                    user: 'style2',
                    shoppingCart: 'style2',
                    category: 'style3',
                    goodsDetails: 'style2',
                    orderList: 'style2',
                    refuseList: 'style2',
                    orderConfirm: 'style2',
                    businessCardProduct: 'style1'
                },
                ShopTheme7: {
                    searchList: 'style2',
                    user: 'style3',
                    shoppingCart: 'style2',
                    category: 'style2',
                    goodsDetails: 'style2',
                    orderList: 'style2',
                    refuseList: 'style2',
                    orderConfirm: 'style2',
                    businessCardProduct: 'style2'
                }
            }
        }
    },
    props: {
        pageName: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            shopConfig_: state => (state.config.shopConfig ? state.config.shopConfig : {}),
            shopInfo_: state => state.config.shopInfo || {},
            pricePrefix_: state => state.config.pricePrefix
        }),
        frontOssImgUrl_() {
            return this.$config.ossImgUrl ? `${this.$config.ossImgUrl}/${this.$config?.ossFileName}/` : ''
        },
        proxyImgUrl_() {
            return this.curDomain_ + '/Tools/reGetImg?img='
        },
        // 是否是城市合伙人
        isCityPartner_() {
            return this.shopInfo_.version_id === 9 || this.shopInfo_.version_id === 10
        },
        // 当前页面主题
        shopTheme_() {
            let shopTheme = this.shopConfig_ && this.shopConfig_.theme ? this.shopConfig_.theme : 'ShopTheme1'
            shopTheme = this.allStyle.hasOwnProperty(shopTheme) ? shopTheme : 'ShopTheme1'
            return shopTheme
        },
        // 所有页面风格
        pagesStyle_() {
            return this.allStyle[this.shopTheme_] || {}
        },
        // 组件风格
        cmptStyle_() {
            return this.pageName ? this.pagesStyle_[this.pageName] || 'style1' : 'style1'
        }
    }
}

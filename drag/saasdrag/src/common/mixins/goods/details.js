import {
    mapActions,
    mapState
} from 'vuex'
export default {
    data() {
        return {
            selectAddress: false,
            goodsInfo: {
                goods_name: '',
                main_goods_stock: '',
                sales_volume: ''
            }, // 所有数据
            selectSpecFlag: false,
            action: 0,
            isCollect: false,
            tempAddr: {},
            productImg: '',
            timer: null,
            outState: false,
            goodsId: '', // 商品id
            activity_id: '',
            activity_type: '',
            curSkuInfo: null,
            defaultSku: null,
            modalFlag: false, // 分享弹窗
            cartCount: 0, // 购物车数量
            detailFinish: false, // 详情接口是否请求完毕
            routeName: '',
            integralFlag: false,
            integralInfo: {},
            cityFlag: false,
            specsFlag: false,
            depositInfo: {}, // 定金信息
            is_behavior: false,
            is_user_pic: false,
            freightFlag: false,
            callFlag: false,
            selectRegionFlag: false, // 地区默认弹层,
            canSale: true,
            scrollTop: 0
        }
    },
    onLoad() {
        const {
            detailId,
            activity_id,
            activity_type
        } = this.$Route.query
        this.routeName = this.$Route.name
        !isNaN(detailId) ? (this.goodsId = detailId * 1) : ''
        !isNaN(activity_id) ? (this.activity_id = activity_id * 1) : ''
        !isNaN(activity_type) ? (this.activity_type = activity_type * 1) : ''
        if (!this.goodsId) {
            return this.$back()
        }
        // 获取购物车商品数量
        this.handleAddCart()
        // 
        this.getCreditGoods()
        // 获取定金信息
        this.getDepositDetail()
        // 获取商品设置
        this.goodsConfig()

        this.handleGetAddressListAction()
        this.addressId_ && this.initTempAddr()
    },
    async onShow() {
        this.handleGoodsDetails()
    },
    computed: {
        ...mapState({
            shopInfo_: state => state.config.shopInfo ? state.config.shopInfo : {},
            completeAddr_: state => state.goods.completeAddr,
            addressList_: state => state.goods.addressList,
            addressId_: state => state.goods.addressId,
            cityId_: state => state.goods.cityId,
            regionDefaultValue_: state => state.goods.regionDefaultValue
        }),
        activityInfo_() {
            return this.goodsInfo.activity_info ? this.goodsInfo.activity_info : {
                joint_quantity: this.$c.numFormat(null),
                sales: this.$c.numFormat(null),
                stint_num: this.$c.numFormat(null),
                quantity_limit: this.$c.numFormat(null),
                msg: ''
            }
        },
        isCommission_() {
            return this.goodsInfo.is_commission === 1 && this.goodsInfo.commission_rate * 1 > 0 && this.goodsInfo.is_buy !== 0
        },
        // 商品主图
        goodsImgs() {
            return this.goodsInfo.goods_imgs ? this.goodsInfo.goods_imgs : []
        },
        shareImg_() {
            return this.goodsImgs[0] ? this.goodsImgs[0] : ''
        },
        defaultSku_() {
            return this.defaultSku ? this.defaultSku : this.goodsInfo.default_sku
        },
        // 已选 sku
        defaultSkuText_() {
            // 初始化进入页面报错map问题
            if (!this.defaultSku_ || !this.defaultSku_.length) return false
            const arr = this.defaultSku_.map(v => {
                return v.attr_value
            })
            return arr.join('-')
        },
        saleSet_() {
            return this.goodsInfo.sale_set === 1
        },
        priceShowUnit_() {
            return this.saleSet_ && this.goodsInfo.goods_piece_ratio ? this.goodsInfo.goods_piece_ratio.price_show_unit : ''
        },
        curSkuInfo_() {
            return this.curSkuInfo ? this.curSkuInfo : {
                price_show: this.$c.numFormat(this.goodsInfo.price_show),
                price_market: this.$c.numFormat(this.goodsInfo.price_market),
                price_joint_origin: this.$c.numFormat(this.goodsInfo.price_market),
                credit: this.$c.numFormat(this.goodsInfo.credit),
                price_show_unit: this.priceShowUnit_
            }
        },
        curSkuShareInfo_() {
            const curSkuInfo = {
                ...this.curSkuInfo_,
                group_sales: `已拼${this.activityInfo_.sales}单`,
                joint_quantity: this.activityInfo_.joint_quantity ? `${this.activityInfo_.joint_quantity}人团` : ''
            }
            // if (this.goodsInfo.is_buy === 0) {
            //     curSkuInfo.price_show = ''
            //     curSkuInfo.price_market = ''
            //     curSkuInfo.price_show_unit = ''
            // }
            return curSkuInfo
        },
        priceSaleUnit_() {
            return this.saleSet_ && this.goodsInfo.goods_piece_ratio ? (this.goodsInfo.goods_piece_ratio.price_sale_unit ? this.goodsInfo
                .goods_piece_ratio.price_sale_unit.substr(1) : '') : ''
        },
        // 运费
        shippingFee_() {
            return this.goodsInfo.shipping_fee_text || ''
            // if (Number(this.goodsInfo.shipping_fee)) return `¥${this.goodsInfo.shipping_fee}`
            // return '包邮商品'
        },
        hasShoppingNote_() {
            return Boolean(this.goodsInfo.shipping_note)
        },
        commission_() {
            const {
                is_commission,
                commission_rate
            } = this.goodsInfo
            return is_commission && Number(commission_rate)
        },
        showFeedback_() {
            return this.goodsInfo && this.goodsInfo.show_feedback ? this.goodsInfo.show_feedback : {}
        },
        parameters_() {
            let str = ''
            const arr = this.goodsInfo.goods_attr
            if (arr && arr.length) {
                arr.map((v, i) => {
                    str += `${i ? '、' : ''}${v.attr_name}`
                })
            }
            return str
        },
        service_() {
            let str = ''
            const arr = this.goodsInfo.goods_service
            if (arr && arr.length) {
                arr.map((v, i) => {
                    str += `${i ? '、' : ''}${v}`
                })
            }
            return str
        },
        explain_() {
            let str = ''
            const arr = this.goodsInfo.goods_cause
            if (arr && arr.length) {
                arr.map((v, i) => {
                    str += `${i ? '、' : ''}${v}`
                })
            }
            return str
        },
        // 商品sku关联的定金信息
        depositSkuInfo_() {
            const { skuinfo } = this.depositInfo
            if (this.curSkuInfo_.id && skuinfo) {
                return skuinfo.find(sku => sku.id === this.curSkuInfo_.id)
            } else {
                return null
            }
        },
        // 定金弹框框内容
        depositPopInfo_() {
            return this.depositSkuInfo_ ? this.depositSkuInfo_.pop : null
        },
        // 不可售提示条左侧文案
        noticeBarText_() {
            return parseInt(this.cityId_) ? '此商品不支持在当前地区销售' : '请先选择送至地址'
        },
        // 不可售提示条右侧按钮文案
        noticeBarBtnText_() {
            return parseInt(this.cityId_) ? '更换地址' : '选择地址'
        },
        // 可售区域文字处理
        goodsSaleRegion_() {
            const allCityArr = []
            this.goodsInfo.goods_sale_region?.map(o => o.city)?.map(i => {
                i.map(j => {
                    allCityArr.push(j)
                })
            })
            console.log('allCityArr', allCityArr)
            return allCityArr.map(o => o.name).join('、')
        }
    },
    watch: {
        async goodsInfo(val) {
            const {
                data: {
                    token = false
                }
            } = await this.$http('wxuserinfo', null, {
                source: 'catch'
            })
            if (token) this.getCollectState()
        },
        productImg(val) {
            this.resetAni()
            this.outState = true
            val && this.handleAddCart()
            this.timer = setTimeout(() => {
                this.resetAni()
                this.productImg = ''
            }, 1500)
        },
        // 监听cityId_, 更新时候可售
        cityId_: {
            handler(val, oldVal) {
                // console.log('cityId_-val', val)
                // console.log('cityId_-oldVal', oldVal)
                // console.log('监听cityId_, 更新可售区域', this.goodsId, this.cityId_)
                if (val !== oldVal) {
                    this.handleCanSaleAction({
                        goodsId: this.goodsId,
                        cityId: this.cityId_
                    })
                }
            }
        },
        cityFlag(val) {
            if (val) {
                // 这里添加scroll-top是为了解决popup里嵌套scroll-view无法滚动问题，故默认触发scrollTop=1px
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.scrollTop = 2
                    }, 100)
                })
            }
        }
    },
    methods: {
        ...mapActions('common', ['favoritesSave', 'hasFavorite', 'favoritesCancel']),
        ...mapActions('goods', ['getAddressListAction', 'canSaleAction']),
        handleLimitCity() {
            this.cityFlag = true
        },
        handleFreight() {
            if (!this.goodsInfo.shipping_note) return
            this.freightFlag = true
        },
        /**
         * @name: 获取商品浏览头像列表
         * @return {*}
         */
        async goodsConfig() {
            const { data: { is_behavior, is_user_pic } } = await this.$http('goodsConfig', {})
            this.is_behavior = is_behavior === 1
            this.is_user_pic = is_user_pic === 1
        },
        handleCustomerService() {
            const url = this.shopInfo_.customer_url
            if (!url) return this.$toast('未配置地址')
            this.$serverJump({
                app_page: (/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g.test(url) ? url : this.curDomain_ + url)
            })
        },
        showShareModal() {
            this.modalFlag = true
        },
        // 重置购物车动画
        resetAni() {
            clearTimeout(this.timer)
            this.timer = null
            this.outState = false
        },
        // 获取商品详情
        async handleGoodsDetails() {
            try {
                const {
                    data
                } = await this.$http('goodsDetails', {
                    goods_id: this.goodsId,
                    activity_type: this.activity_type,
                    activity_id: this.activity_id
                })
                const {
                    goods_name,
                    goods_img
                } = data
                this.detailFinish = true
                this.goodsInfo = data
                this.group_info = data.group_info
                this.initShare({
                    path: this.$Route.path,
                    imageUrl: goods_img,
                    title: goods_name,
                    summary: `[来自优质会员分享]我在${this.shopInfo_.shop_name}发现一个不错的商品，赶快来看看...`
                })
            } catch (e) {
                setTimeout(() => {
                    this.$back()
                }, 500)
                // TODO handle the exception
            }
        },
        changeSpec(e) {
            this.defaultSku = e.detail.sku
            e.detail.product_img && (this.productImg = e.detail.product_img)
            this.curSkuInfo = e.detail.skuInfo
        },
        // 瞄点功能
        async handleTab(val) {
            const data = await this.$c.getRect.call(this, '.top0,.top1,.top2,.top3')
            const nodeInfo = []
            const height = data[1].height
            const top = data[0].top
            val = val.detail.value
            data.forEach(o => {
                nodeInfo.push(o.top - top - height)
            })
            const scrollTop = nodeInfo[val + 1] > 0 ? nodeInfo[val + 1] : 0
            uni.pageScrollTo({
                scrollTop: scrollTop,
                duration: 0
            })
        },
        handleSpecs() {
            if (this.goodsInfo.goods_attr && !this.goodsInfo.goods_attr) return
            this.specsFlag = true
        },

        async getCollectState() {
            const res = await this.hasFavorite({
                id: this.goodsId
            })
            this.isCollect = res.data
        },
        handleToCart() {
            this.$jump('shoppingCart')
        },
        handleSelectSpec(val, errMsg = '秒杀已经结束') {
            // if(!this.goodsInfo.default_sku || !this.goodsInfo.default_sku.length) return
            if (val === 2 && this.goodsInfo.activity_info) {
                if (this.goodsInfo.activity_info.status === 0) {
                    return this.$toast(errMsg)
                }
            }
            this.action = val
            this.selectSpecFlag = true
        },
        async handleCollect() {
            if (this.isCollect) {
                await this.favoritesCancel({
                    id: this.goodsId
                })
            } else {
                await this.favoritesSave({
                    id: this.goodsId
                })
            }
            this.getCollectState()
        },
        async handleAddCart() {
            const {
                data
            } = await this.$http('userInfo', {}, {
                source: 'catch'
            })
            if (Object.keys(data).length) {
                const {
                    data
                } = await this.$http('orderCart')
                this.cartCount = data.count
            }
        },
        async getCreditGoods() {
            const { data } = await this.$http('creditGoods', { id: this.goodsId })
            this.integralInfo = data
        },
        handleIntegral() {
            this.integralFlag = true
        },
        jumpFeedback(showFeedback_) {
            !showFeedback_.is_allow_submit && this.$toast(showFeedback_.allow_submit_text)
            showFeedback_.is_allow_submit && this.$jump('feedback', { type: 10, goodsId: this.goodsId })
        },
        /**
         * 请求获取定金相关的信息
         */
        async getDepositDetail() {
            try {
                const { data } = await this.$http('depositGoods', {
                    goods_id: this.goodsId
                })
                this.depositInfo = data
            } catch (error) {
                console.log(error)
            }
        },
        handleCallPhone() { // 呼叫
            const phoneNumber = this.shopInfo_.mobile
            uni.makePhoneCall({
                phoneNumber
            })
        },

        async handleGetAddressListAction() {
            console.log('请求地址库，handleGetAddressListAction')
            this.canSale = await this.getAddressListAction({
                goodsId: this.goodsId,
                cityId: this.cityId_
            })
        },

        async handleCanSaleAction(payload) {
            console.log('handleCanSaleAction-goods', payload.goodsId, payload.cityId)
            this.canSale = await this.canSaleAction({
                goodsId: payload.goodsId,
                cityId: payload.cityId
            })
        },

        // 获取地址列表
        /* async getAddressList() {
            const { data: { list = [] } } = await this.$http('userShippingAddressList')
            if (list.length) {
                const addressList = list || []
                this.$store.commit('goods/SET_ADDRESS_LIST', addressList)

                const defaultRegion = list.filter(o => o.is_default) || []
                console.log('defaultRegion[0]', defaultRegion[0])
                //  是否有默认地址
                if (defaultRegion.length) {
                    this.$store.commit('goods/SET_CITY_ID', defaultRegion[0].city_id)
                    this.$store.commit('goods/SET_ADDRESS_ID', defaultRegion[0].id)
                    this.$store.commit('goods/SET_COMPLETE_ADDR', `${defaultRegion[0].province} ${defaultRegion[0].city} ${defaultRegion[0].district}`)
                    this.tempAddr = {
                        city: {
                            label: defaultRegion[0].city,
                            value: defaultRegion[0].city_id
                        },
                        district: {
                            label: defaultRegion[0].district,
                            value: defaultRegion[0].district_id
                        },
                        province: {
                            label: defaultRegion[0].province,
                            value: defaultRegion[0].province_id
                        },
                        town: {
                            label: '',
                            value: ''
                        }
                    }
                } else {
                    // this.addressId = this.addressList[0].id   
                    this.$store.commit('goods/SET_CITY_ID', addressList[0].city_id)
                    this.$store.commit('goods/SET_ADDRESS_ID', addressList[0].id)
                    this.$store.commit('goods/SET_COMPLETE_ADDR', `${addressList[0].province} ${addressList[0].city} ${addressList[0].district}`)
                    this.tempAddr = {
                        city: {
                            label: addressList[0].city,
                            value: addressList[0].city_id
                        },
                        district: {
                            label: addressList[0].district,
                            value: addressList[0].district_id
                        },
                        province: {
                            label: addressList[0].province,
                            value: addressList[0].province_id
                        },
                        town: {
                            label: '',
                            value: ''
                        }
                    }
                }
            } else {
                this.$store.commit('goods/SET_COMPLETE_ADDR', '请选择送至地址')
            }

            this.$store.dispatch('goods/canSale', {
                goodsId: this.goodsId,
                cityId: this.cityId_
            })
        }, */

        // 初始化tempAddr
        initTempAddr() {
            const curAddress = this.addressList_.find(o => o.id === this.addressId_) || {}
            this.tempAddr = {
                city: {
                    label: curAddress.city,
                    value: curAddress.city_id
                },
                district: {
                    label: curAddress.district,
                    value: curAddress.district_id
                },
                province: {
                    label: curAddress.province,
                    value: curAddress.province_id
                },
                town: {
                    label: '',
                    value: ''
                }
            }
        },

        // 新版点击配送区域
        handleToDelivery() {
            if (!this.addressList_.length) {
                this.selectRegionFlag = true
                return
            }
            this.$jump('goodsDelivery', {
                goodsId: this.goodsId,
                action: 'referrer'
            })
        },

        // 配送区域确定
        handleSelectRegion(e) {
            const obj = e.detail
            if (obj) this.tempAddr = obj

            const regionDefaultValue = [
                {
                    ...obj.province
                },
                {
                    ...obj.city
                },
                {
                    ...obj.district
                }
            ]
            console.error('handleSelectRegion', obj.city.value)
            this.$store.commit('goods/SET_CITY_ID', obj.city.value)
            this.$store.commit('goods/SET_COMPLETE_ADDR', `${obj.province.label} ${obj.city.label} ${obj.district.label}`)
            this.$store.commit('goods/SET_REGION_DEFAULT_VALUE', regionDefaultValue)
        }
    }
}

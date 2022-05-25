import { mapState } from 'vuex'
import pushMessage from '@/common/mixins/pushMessage'

export default {
    data() {
        return {
            cancelFlag: false, // 取消订单弹窗
            deleteFlag: false, // 删除订单弹窗
            addressFlag: false, // 修改地址弹窗
            tempOrder: {}, // 临时列表订单
            tempIndex: null, // 临时列表下标
            orderInfo: {}, // 订单详情
            order_status_list: [], // 订单状态
            sale_status_list: [], // 售后状态
            pay_list: [], // 支付类型
            order_tab: [], // 订单tab标签
            cancel_reason_list: [], // 取消列表
            pageType: 'details', // 默认详情页details index
            logist: {}, // 单条物流
            loaded: false,
            address_id: '',
            sourceType: 0, // 区域订单详情所用 区域订单进入的会传入 1
            depositAxisList: [
                {
                    step: 1,
                    label: '阶段1：定金：¥00.00',
                    mianTip: '已完成'
                },
                {
                    step: 2,
                    label: '阶段2：尾款：¥00.00',
                    mianTip: '待付款'
                }
            ], // 定金时间轴
            depositAxisStep: 99,
            uploadArrivalFlag: false, // 中辅上传到货图片
            btn_group2: [],
            showBtnGroupMore: false,
            toTheCode: '', // 上门自提提货码
            toTheCodeFlag: false,
            isToTheCode: false, // 是否已经核销
            hasToTheCodeMsg: '', // 已经核销msg
            selectInvoiceFlag: false // 选择发票弹窗
        }
    },
    onLoad() {
        const { sourceType = 0, toTheCode = '' } = this.$Route.query
        this.toTheCode = toTheCode
        this.sourceType = sourceType
        this.handleGetOrderStatus()
    },
    computed: {
        ...mapState({
            shopInfo_: state => (state.config.shopInfo ? state.config.shopInfo : {}),
            shopConfigColor_: state => (state.config.shopConfig ? state.config.shopConfig.color : {})
        }),
        colors_() {
            return this.shopConfigColor_.color ? this.shopConfigColor_.color : {}
        },
        completeMoblie_() {
            if (!this.orderInfo.user_name) return ''
            return `${this.orderInfo.user_name} ${this.orderInfo.mobile}`
        },
        completeAddr_() {
            if (!this.orderInfo.province) return ''
            return `${this.orderInfo.province} ${this.orderInfo.city} ${this.orderInfo.district} ${this.orderInfo.address}`
        },
        // 查找订单
        findOrder_() {
            return (arr, value, label) => {
                if (!arr || !arr.length) return ''
                const result = arr.find(val => Number(val.value) === value)
                if (label) return result ? result.label : ''
                return result
            }
        },
        orderStatus_() {
            return () => {
                if (!this.orderInfo.order_status) return ''
                return String(this.orderInfo.order_status).charAt(0)
            }
        },
        // 发货单
        order_delivery_() {
            return this.orderInfo.order_delivery && this.orderInfo.order_delivery.length
        },
        // 发票
        invoice_() {
            return this.orderInfo.invoice ? this.orderInfo.invoice.invoice_type || {} : {}
        },
        // 按钮样式
        orderBtnClass_() {
            return type => {
                if (type === 'modify_address' || (type === 'part_receipt' && !this.order_delivery_) || type === 'again_order' || type === 'go_pay') {
                    return ['t', 't']
                }
                return ['#E0E0E0', '#666666']
            }
        },
        discount_() {
            return num => {
                if (Number(num) !== 0) return num
                return ''
            }
        },
        // 是否显示上门自提
        isTakeTheir_() {
            return this.orderInfo.shipping_id === 5
        },
        // 是否显示自提信息
        // isPickUp_() {
        //     return this.orderInfo.order_expand.warehouse_addr && this.orderInfo.order_expand.estimate_self_xtraction_time
        // },
        orderExpand_() {
            return this.orderInfo && this.orderInfo.order_expand
        },
        btn_group1_() {
            if (!this.orderInfo.btn_group || this.orderInfo.btn_group.length < 4) return this.orderInfo.btn_group || []
            // let arr = this.orderInfo.btn_group.reverse()
            const arr1 = this.orderInfo.btn_group.slice(0, 3)
            return arr1
        },
        btn_group2_() {
            if (!this.orderInfo.btn_group || this.orderInfo.btn_group.length < 4) return []
            // let arr = this.orderInfo.btn_group.reverse()
            const arr2 = this.orderInfo.btn_group.slice(3)
            return arr2
        },
        // 改价
        gap_price_() {
            return this.orderInfo.gap_price ? Math.abs(this.orderInfo.gap_price) : 0
        }
    },
    methods: {
        // 订单状态
        async handleGetOrderStatus() {
            const res = await this.$http('orderStatus')
            this.cancel_reason_list = res.data.cancel_reason_list
            this.order_status_list = res.data.order_status_list
            this.sale_status_list = res.data.sale_status_list
            this.pay_list = res.data.pay_list
            this.order_tab = res.data.tab
        },
        // 提货码查询订单
        async getOrderInfoByDeliveryCode() {
            try {
                const { data } = await this.$http('getOrderInfoByDeliveryCode', { delivery_code: this.toTheCode })
                this.orderInfo = data
            } catch (e) {
                this.hasToTheCodeMsg = e.msg
                this.isToTheCode = true
            }
        },
        // 提货码确认订单
        async handleSureCode() {
            this.$http('orderDeliveryCodeCheck', { delivery_code: this.toTheCode })
            this.timer = setTimeout(() => {
                this.$back()
            }, 2000)
        },
        // 订单详情
        async handleGetOrderInfo(loading = true) {
            // 自提
            if (this.toTheCode) {
                this.getOrderInfoByDeliveryCode()
            } else {
                // 区域订单进入的请求接口替换
                const res = await this.$http(
                    this.sourceType ? 'OrderAreaOrderInfo' : 'orderInfo',
                    {
                        order_id: this.$Route.query.detailId
                    },
                    { loading }
                )
                this.orderInfo = res.data
            }
            // 定金逻辑开始
            const { activity_type, money_first, money_end, money_first_status_text, money_end_status_text, money_paid_stage, singleMsg } = this.orderInfo
            if (Number(activity_type) === 5) {
                this.depositAxisList[0].label = `阶段1：定金：${this.pricePrefix_}${money_first}`
                this.depositAxisList[1].label = `阶段2：尾款：${this.pricePrefix_}${money_end}`
                this.depositAxisList[0].mianTip = money_first_status_text
                this.depositAxisList[1].mianTip = money_end_status_text
                if (singleMsg) {
                    this.depositAxisList[0].subTip = singleMsg
                    this.depositAxisList[1].subTip = 'hidden'
                }
                this.depositAxisStep = Number(money_paid_stage) - 1
            }
            // 定金逻辑结束
            this.loaded = true
            if (loading) return
            const pages = getCurrentPages()
            const prevPage = pages[pages.length - 2]
            prevPage && prevPage.$vm.initPage && prevPage.$vm.initPage()
            // 请求物流
            // if ((this.orderStatus_() == 2 || this.orderStatus_() == 3) && this.orderInfo.order_delivery.length === 1) {
            // 	const params = {
            // 		is_all: 0,
            // 		express_number: this.orderInfo.order_delivery[0].fast_mail_sn || '0',
            // 		source_id: this.orderInfo.order_delivery[0].id || '0',
            // 		source_type: 1
            // 	}
            // 	let res = await this.$http('getLogistInfo', params);
            // 	this.logist = res.data || {}
            // }
        },
        // 订单列表
        handleOperate(value, order, index) {
            this.tempOrder = order
            switch (value) {
                case 'go_pay': // 立即支付
                    if (order.money_end_status == 0) return this.$toast(order.deposit_pay_intval_text)
                    this.handlePay(order)
                    break
                case 'modify_address': // 修改地址
                    this.handleEditAddr(order, index)
                    break
                case 'part_receipt': // 确认收货
                    if (this.isCityPartner_) {
                        this.uploadArrivalFlag = true
                        break
                    }
                    this.handleSureOrder(order)
                    break
                case 'again_order': // 再次购买
                    this.handleAgainBuy(order)
                    break
                case 'logistics_order': // 查看物流
                    this.handleViewLogistics(order)
                    break
                case 'remove_order': // 取消订单
                    this.handleCancel('cancel')
                    break
                case 'delete_order': // 删除订单
                    this.handleCancel('delete')
                    break
                case 'appraisal_order': // 订单评价
                    this.$jump('commentPublish', {
                        type: 'appraisal_order',
                        main_order_id: order.id,
                        appraisal_status: order.appraisal_status
                    })
                    break
                case 'review_appraisal_order': // 订单追加评价
                    this.$jump('commentPublish', {
                        type: 'review_appraisal_order',
                        main_order_id: order.id,
                        appraisal_status: order.appraisal_status
                    })
                    break
                case 'sale_voucher': // 销售凭证'
                    this.handleSaleVoucher(order)
                    break
                case 'download_sale_voucher': // 下载凭证
                    this.handleSaleVoucher(order, 'download')
                    break
                // 申请售后工单
                case 'apply_work_order': {
                    this.$jump('zhongfuAfterSale', { order_id: order.id, mode: 'afterSale' })
                    break
                }
                // 查看发票
                case 'look_invoice': {
                    this.$jump('recordDetails', { order_id: order.id })
                    break
                }
                // 申请开票
                case 'apply_invoice': {
                    this.selectInvoiceFlag = true
                    this.change_order_id = order.id
                    break
                }
                default:
                    break
            }
        },
        // 申请开票
        async handleApplyInvoice(e) {
            const { value } = e.detail
            await this.$http('applyOrderInvoice', {
                order_id: this.orderInfo.id || this.change_order_id,
                user_invoice_id: value
            })
            if (this.pageType === 'details') this.handleGetOrderInfo(false)
            if (this.pageType === 'index') this.initPage()
        },
        async handleSaleVoucher(order, type) {
            // #ifdef H5
            // this.$toast('目前只支持小程序使用')
            const {
                data: { url }
            } = await this.$http('orderPrintHtml', { order_id: order.id })
            // let http = JSON.parse(JSON.stringify(this.curDomain_))
            // if (http.indexOf('http://') > -1) http = http.replace("http://", "https://")
            // const url = `${http}/public/web/viewer.html?file=${:{url}.url}`
            // const pdf = await this.$http('orderPrintPdf', { order_id: order.id })
            if (!url) {
                uni.showToast({
                    title: '没有所属 pdf 地址!'
                })
                return
            }
            if (type === 'download') {
                this.toPdf(url)
            } else {
                location.href = url
            }
            // this.$jump('webView', { url: data.url })
            // #endif
            // #ifndef H5
            const pdf = await this.$http('orderPrintPdf', { order_id: order.id })
            if (type === 'download') {
                const that = this
                uni.saveFile({
                    tempFilePath: pdf.tempFilePath,
                    success: function (res) {
                        that.$toast('该文件保存在' + res.savedFilePath)
                        console.log(res.savedFilePath)
                    }
                })
                return
            }
            uni.openDocument({
                filePath: pdf.tempFilePath,
                success: function (res) {
                    console.log(res)
                }
            })
            // #endif
        },
        /**
         * @name: h5 下载 pdf
         * @param {*} url
         * @return {*}
         */
        toPdf(url) {
            const u = url.split('file=')[1]
            const dload = document.createElement('a')
            dload.download = 'pdf' // 设置下载的文件名，默认是'下载'
            dload.href = u
            document.body.appendChild(dload)
            dload.click()
            dload.remove() // 下载之后把创建的元素删除
        },
        // 支付
        handlePay(order) {
            this.$jump('orderPayment', {
                order_id: order.id
            })
        },
        // 修改地址
        handleEditAddr(order, index) {
            this.address_id = order.address_id
            this.tempIndex = index
            this.addressFlag = true
        },
        // 选择地址
        async handleSelectAddres(e) {
            let params = {
                order_id: this.orderInfo.id,
                address_id: e.detail.id
            }
            if (this.pageType === 'index') {
                params = {
                    order_id: this.tempOrder.id,
                    address_id: e.detail.id
                }
            }
            await this.$http('orderEditOrderAddress', params)
            this.addressFlag = false
            if (this.pageType === 'index') {
                this.pageList[this.tempIndex].address_id = e.detail.id
            }
            if (this.pageType === 'details') this.handleGetOrderInfo(true)
        },

        // 确认收货
        async handleSureOrder(order) {
            console.log(order)
            const params = {
                order_id: order.id
            }
            // if(order.order_delivery.length === 1){
            //     params.order_delivery_id = order.order_delivery[0].id
            //     await this.$http('orderConfirmShip', params)
            // }
            await this.$http('orderEnd', params)
            if (this.pageType === 'details') this.handleGetOrderInfo(false)
            if (this.pageType === 'index') this.initPage()
        },
        // 再次购买
        async handleAgainBuy(order) {
            // 套餐包再次购买
            if (order.activity_type === 6) {
                this.$jumpDetail('packageDetails', order.activity_id)
                return
            }
            const promiseAll = []
            this.$loading('加入购物车…')
            order.order_goods.forEach(o => {
                promiseAll.push(
                    this.$http(
                        'addCart',
                        {
                            num: o.buy_num,
                            goods_id: o.goods_id,
                            goods_sku_id: o.goods_sku_id,
                            is_change: 0
                        },
                        {
                            loading: false
                        }
                    )
                )
            })
            await Promise.all(promiseAll)
            this.$hideLoading()
            this.$jump('shoppingCart')
        },
        // 取消订单

        handleCancel(type) {
            if (type === 'cancel') this.cancelFlag = true
            if (type === 'delete') this.deleteFlag = true
        },
        // 确认取消订单
        async handleConfirmCancel(e) {
            await this.$http('orderCloseOrder', {
                order_id: this.orderInfo.id,
                close_id: e.detail.value
            })
            this.handleGetOrderInfo(false)
            // #ifdef MP-WEIXIN
            pushMessage.call(this, 'cancelOrder')
            // #endif
        },
        // 查看物流
        handleViewLogistics(order) {
            // this.$toast('查看物流')
            // if (order.order_delivery.length === 1) {
            // 	this.$jump('logisticsDetails', {
            // 		deliveryId: order.order_delivery[0].id,
            // 		express_number: order.order_delivery[0].fast_mail_sn
            // 	})
            // 	return
            // }
            // if (order.order_delivery.length > 1) {
            // this.sourceType === 0 代表不是从 区域订单进来的.可以进入物流
            this.sourceType === 0 && this.$jumpDetail('logistics', order.id)
            // }
        },
        // 删除订单
        async handleDelete() {
            await this.$http('orderDeleteOrder', {
                order_id: this.orderInfo.id
            })
            this.$jump('orderList')
        },
        handleZhongfuAfterSale() {
            this.$jump('zhongfuAfterSale', { order_id: this.tempOrder.id, mode: 'uploadPic' })
        }
    }
}

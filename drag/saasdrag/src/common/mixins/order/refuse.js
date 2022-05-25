import { mapState } from 'vuex'
export default {
    data() {
        return {
            cancelFlag: false, // 撤销订单
            deleteFlag: false, // 删除弹窗
            goods: [], // 商品
            return_price_total: '', // 退款金额
            return_pattern: [], // 退货选项
            goods_status: [], // 货物状态
            return_reason: [], // 退款原因
            stateFlag: false, // 货物状态弹窗
            refundFlag: false, // 退款状态弹窗
            afterFlag: false, // 退款状态弹窗
            stateValue: '请选择', // 货物状态
            refundValue: '请选择', // 退款原因
            afterValue: '请选择', // 退款原因
            orderInfo: {},
            noDataText: '暂无订单',
            order_id: '',
            logist: {}, // 物流信息
            loaded: false,
            returnFinish: false
        }
    },
    computed: {
        ...mapState({
            shopConfigColor_: state => state.config.shopConfig ? state.config.shopConfig : {}
        }),
        colors_() {
            return this.shopConfigColor_.color ? this.shopConfigColor_.color : {}
        },
        findStatus_() {
            return (obj, label) => {
                if (!obj || !obj.status_list) return ''
                const result = obj.status_list.find(val => val.value === obj.status)
                if (label) return result ? result[label] : ''
                return result
            }
        },
        timeAxis_() {
            const status = this.findStatus_(this.orderInfo, 'value')
            if (status === 20 || status === 70) return false
            return true
        },
        step_() {
            if (!this.orderInfo.progress_list) return 0
            const result = this.orderInfo.progress_list.findIndex(val => val.value === this.orderInfo.status)
            return result !== -1 ? result : 0
        }
    },
    methods: {
        // 申请退款列表
        async handleOrderReturnIndex() {
            const params = {}
            const { order_goods_id, id, delivery_sn, delivery_id } = this.$Route.query
            if (order_goods_id) {
                params.order_goods_id = order_goods_id
                params.id = id // 重新申请
            }
            if (delivery_id) {
                params.delivery_sn = delivery_sn
                params.delivery_id = delivery_id
            }
            try {
                const { data: { return_pattern = {}, goods_status = {}, return_reason = {}, goods = {}, return_price_total = 0, order_id = '' } } = await this.$http('orderReturnIndex', params)
                this.return_pattern = return_pattern
                this.goods_status = goods_status
                this.return_reason = return_reason
                this.return_price_total = return_price_total
                this.goods = goods
                this.order_id = order_id
                this.returnFinish = true
            } catch (e) {
                // TODO handle the exception
                setTimeout(() => {
                    this.$back()
                }, 500)
            }
        },

        // 售后选择弹窗
        handleSelect(val) {
            this.pro = val
            if (val === 'goods_status') this.stateFlag = true
            if (val === 'return_reason') this.refundFlag = true
            if (val === 'return_pattern') this.afterFlag = true
        },
        // 售后详情
        async handleOrderReturnDetails() {
            const res = await this.$http('OrderReturnDetails', { id: this.$Route.query.detailId })
            const orderInfo = res.data
            if (orderInfo.goods && orderInfo.goods.length) {
                orderInfo.goods.forEach(o => {
                    o.buy_num = o.return_number || o.buy_num
                })
            }
            this.orderInfo = orderInfo
            this.loaded = true
            const back_invoice_no = res.data.back_invoice_no
            // 请求快递信息
            if (back_invoice_no) {
                const params = {
                    is_all: 0,
                    express_number: back_invoice_no,
                    source_type: 2
                }
                const res = await this.$http('getLogistInfo', params)
                this.logist = res.data || {}
            }
        },
        // 填写退货快递信息
        handleToCourier() {
            this.$jumpDetail('logisticsCourier', this.$Route.query.detailId)
        },
        // 订单列表
        handleOperate(type) {
            switch (type) {
                case 'cancel':
                    this.cancelFlag = true
                    // this.handleCancel()
                    break
                case 'reapply':
                    this.handleReapply()
                    break
                case 'delete':
                    this.handleDelete()
                    break
                default:
                    return ''
            }
        },
        // 撤销申请
        async handleCancel() {
            const res = await this.$http('OrderRevertApply', { id: this.$Route.query.detailId })
            this.$jumpDetail('orderDetails', res.data.order_id, {}, 'replace')
        },
        // 重新申请
        handleReapply() {
            this.$jump('refuseAfterSale', { order_goods_id: this.orderInfo.goods[0].order_goods_id, id: this.$Route.query.detailId })
        },
        // 删除售后单
        async handleDelete() {
            const res = await this.$http('orderDel', { id: this.orderInfo.id })
            console.log(res)
        },
        copyText(e) {
            this.$c.copyText({ content: e })
        }

    }
}

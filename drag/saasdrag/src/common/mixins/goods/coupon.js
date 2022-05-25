/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-03 10:44:50
 */
/**
 * 商品详情中的优惠券逻辑
 */
export default {
    data() {
        return {
            couponAmount: null,
            couponsList: [],
            promotionsList: [],
            selectCouponFlag: false // 优惠券popup弹框flag
        }
    },
    methods: {
        async handleSelect(val) {
            this.selTabIndex = val
            const data = await this.$c.getRect.call(this, '.aim')
            const nodeInfo = []
            const top = data[0].top
            data.forEach(o => {
                nodeInfo.push(o.top - top)
            })
            const scrollTop = nodeInfo[val] > 0 ? nodeInfo[val] - 40 : 0
            uni.pageScrollTo({
                scrollTop: scrollTop,
                duration: 150
            })
        },
        couponsLoaded(e) {
            const { amount, no_threshold = {}, threshold = {} } = e.detail
            this.couponAmount = amount
            this.couponsList = no_threshold.list || []
            this.promotionsList = threshold.list || []
        },
        // 选择优惠券
        handleSelectCoupon() {
            this.selectCouponFlag = true
        }
    },
    computed: {
        /**
         * 优惠券请求的参数
         */
        reqParams() {
            return {
                page: 1,
                limit: 50,
                good_id: this.goodsId
            }
        },
        // 商品详情优惠信息中的促销展示
        promotionStr_() {
            if (this.promotionsList.length) {
                return this.promotionsList.reduce((prev, current) => {
                    return prev + `${current.describe} `
                }, '')
            } else {
                return ''
            }
        },
        // 优惠券是否显示
        couponVisible_() {
            if ((this.couponsList.length || this.promotionsList.length) && !this.activity_type && this.goodsInfo.is_buy !== 0) {
                return true
            }
            return false
        }
    }
}

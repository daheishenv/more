export default {
	/**
	 * 获取询价单列表
	 */
	getInquiryList: {
		url: '/Inquiry/getInquiryList',
	    loading: true
	},
	/**
	 * 获取条件列表
	 */
	getInquiryStatusList: {
		url: '/Inquiry/getStatusList',
	    loading: true
	},
	/**
	 * 获取询价单初始化信息
	 */
	getInquiryMsg: {
		url: '/Inquiry/getInquiryMsg'
	},
	/**
	 * 获取询价单
	 */
	getInquiryInfo: {
		url: 'Inquiry/getInquiryInfo',
	    loading: true
	},
	/**
	 * 创建询价单
	 */
	createInquiry: {
		url: '/Inquiry/createInquiry',
	    loading: true
	},
	/**
	 * 更新询价单
	 */
	updateInquiry: {
		url: '/Inquiry/updateInquiry',
	    loading: true
	},
	/**
	 * 删除询价单
	 */
	delInquiry: {
		url: '/Inquiry/delInquiry',
	    loading: true
	},
	/**
	 * 取消询价单
	 */
	cancelInquiry: {
		url: '/Inquiry/cancelInquiry',
	    loading: true
	},
	/**
     * 报价订单列表
     */
	inquiryOrdersList: {
		url: '/InquiryOrders/index',
        loading: true
	},
	/**
     * 报价订单详情
     */
	inquiryOrderInfo: {
		url: '/InquiryOrders/info',
        loading: true
	},
	/**
	 * 确认收货
	 */
	inquiryOrderReceipt: {
		url: '/InquiryOrders/orderReceipt',
	    loading: true
	},
	/**
	 * 确认支付
	 */
	inquiryOrderPay: {
		url: '/InquiryOrders/pay',
	    loading: true
	},
	/**
	 * 获取询价订单id
	 */
	getInquiryOrders: {
		url: '/InquiryOrders/getInquiryOrders',
	    loading: true
	}	
}

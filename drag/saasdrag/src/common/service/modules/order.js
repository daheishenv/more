export default {
  /**
   * 加入购物车
   */
  addCart: {
    url: '/OrderCart/addCart',
    loading: true,
    toast: '加入购物车成功',
  },
  /**
   * 购物车列表
   */
  orderCart: {
    url: '/OrderCart/index',
  },
  /**
   * 购物车列表
   */
  removeCart: {
    url: '/OrderCart/removeCart',
    loading: true,
  },
  /**
   * 确认订单
   */
  confirmOrder: {
    url: '/Order/confirmOrder',
    loading: true,
  },
  /**
   * 确认订单
   */
  orderStatus: {
    url: '/Order/getOrderStatus',
  },
  /**
   * 确认订单
   */
  createOrder: {
    url: '/Order/createOrder',
  },
  /**
   * 提交支付
   */
  orderPay: {
    url: '/Order/orderPay',
    loading: '正在提交',
  },
  /**
   * 确认支付
   */
  orderConfirmPay: {
    url: '/Order/confirmPay',
    loading: true,
  },
  orderExpressList: {
    url: '/Shop/expressList',
  },
  // 我的订单
  orderMyOrder: {
    url: 'Order/myOrder',
  },
  // 删除订单
  orderDeleteOrder: {
    url: 'Order/deleteOrder',
    loading: true,
  },
  // 取消订单
  orderCloseOrder: {
    url: 'Order/closeOrder',
    toast: '操作成功',
  },
  // 订单详情
  orderInfo: {
    url: 'Order/orderInfo',
    loading: true,
  },
  // 支付方式列表
  shopPayList: {
    url: '/Shop/getPayList',
  },
  // 订单推荐商品列表
  orderRecommend: {
    url: '/Goods/orderRecommend',
  },
  // 编辑地址
  orderEditOrderAddress: {
    url: 'Order/editOrderAddress',
    toast: '修改地址成功',
    loading: true,
  },
  // 主订单确认收货
  orderEnd: {
    url: 'Order/orderEnd',
    loading: true,
    toast: '操作成功'
  },

  // 查看退款退货列表
  orderReturnList: {
    url: '/OrderReturn/getList',
  },
  // 申请退款列表
  orderReturnIndex: {
    url: '/OrderReturn/index',
    loading: true,
  },
  // 提交退款申请
  orderReturnApply: {
    url: '/OrderReturn/apply',
    toast: true,
  },
  // 查看退款退货详情
  OrderReturnDetails: {
    url: '/OrderReturn/details',
  },
  // 撤销退款申请
  OrderRevertApply: {
    url: '/OrderReturn/revertApply',
    loading: true,
  },
  // 删除退款单
  orderDel: {
    url: '/OrderReturn/del',
  },
  // 计算售后商品总金额
  ajaxReturnPrice: {
    url: '/OrderReturn/ajaxReturnPrice',
  },

  // 确认收货
  orderConfirmShip: {
    url: '/Order/confirmShip',
    loading: true,
    toast: '操作成功'
  },
  // 物流详情
  getLogistInfo: {
    url: '/OrderExpress/info',
    loading: true,
  },
  // 获取快递信息
  expressList: {
    url: '/Express/dataList',
  },
  // 提交退货快递信息
  orderDeliver: {
    url: '/OrderReturn/deliver',
    loading: true,
  },
  // 修改订单
  editOrder: {
    url: '/Order/editOrder',
  },
	/**
	 * 通过商品 获取优惠券
	 */
	couponsByProduct: {
		url: '/Coupon/giveCouponListByGoodInfo'
	},
  /**
   * 确认订单获取优惠券
   */
  orderSelectCoupon: {
    url: 'Coupon/orderSelectCoupon',
	showErr: false
  },
  /**
   * 根据优惠券ID获取抵用价格
   */
  orderGetDeductionPrice: {
    url: 'Coupon/orderGetDeductionPrice'
  }
};

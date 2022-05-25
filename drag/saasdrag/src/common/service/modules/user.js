export default {
	/**
     * 新增、编辑收货地址
     */
	userShippingAddressSave: {
		url: '/UserShippingAddress/save',
        loading: true
	},
	/**
     * 收货地址列表
     */
	userShippingAddressList: {
		url: '/UserShippingAddress/ajaxList',
        loading: true
	},
	/**
     * 删除收货地址
     */
	userShippingAddressDel: {
		url: '/UserShippingAddress/del'
	},
	/**
	 * 获取用户信息
	 * */
    userInfo: {
		url: '/users/userinfo',
		catchName: 'userInfo'
	},
	/**
	 * 保存用户信息
	 * */
    editUserInfo: {
		url: '/users/editUserInfo'
	},
	/**
	 * 获取用户实名认证接口
	*/
	getUserAuth: {
		url: '/users/getUserAuth'
	},
	/**
	 * 保存用户实名认证接口
	*/
	saveUserAuth: {
		url: '/users/saveUserAuth'
	},
	/**
	 * 实名认证获取手机验证码
	 * */
	sendSmsCode: {
		url: '/users/sendSmsCode'
	},
	/**
	* 我的团队
     */
	team: {
		url: '/users/team'
	},
	/**
	* 我的团队数量接口
     */
	teamCount: {
		url: '/users/teamCount'
	},
	/**
	* 获取用户所有发票及指定类型发票
     */
	getUserInvoice: {
		url: '/UsersInvoice/getUserInvoice',
        loading: true
	},
	/**
	 * 保存编辑发票
	*/
	saveInvoice: {
		url: '/UsersInvoice/save',
        loading: true
	},
	/**
	 * 等级变更通知
	*/
	getLevelSendMsg: {
		url: '/UsersLevel/sendMsg'
	},
	/**
	 * 会员等级列表
	*/
	getLevelRuleList: {
		url: '/UsersLevel/getLevelRuleList'
	},
	/**
	 * 购买等级
	*/
	levelOrderPay: { // -d
		url: '/UsersLevel/levelOrderPay',
        loading: true
	},
	newLevelOrderPay: {
		url: '/UsersLevel/newLevelOrderPay',
        loading: true
	},
	/**
	 * 根据等级获取补充资料
	*/
	getAppendMaterialByLevelId: { // -d
		url: 'UsersLevel/getAppendMaterialByLevelId'
	},
	getNewAppendMaterialByLevelId: {
		url: 'UsersLevel/getNewAppendMaterialByLevelId'
	},
	/**
	 * 等级明细
	*/
	getLevelDesc: {
		url: '/UsersLevel/getLevelDesc'
	},
	/**
	 * 我的权益
	*/
	getLevelEquity: {
		url: '/UsersLevel/getLevelEquity'
	},
	/**
	 * 店小二审核通知
	*/
	getMaterialMsg: {
		url: '/UsersLevelMaterial/getMaterialMsg'
	},
	/**
	 * 审核通知已阅
	*/
	readMsgMaterial: {
		url: 'UsersLevelMaterial/readMsgMaterial'
	},
	/**
	 * 店小二查看资料
	*/
	showMaterialInfo: { // -d
		url: 'UsersLevelMaterial/showMaterialInfo'
	},
	newShowMaterialInfo: {
		url: 'UsersLevelMaterial/newShowMaterialInfo'
	},
	/**
	 * 重新提交资料
	*/
	againAddMaterial: { // -d
		url: 'UsersLevelMaterial/againAddMaterial'
	},
	newAgainAddMaterial: {
		url: 'UsersLevelMaterial/newAgainAddMaterial'
	},
	/**
	 * 店小二退款
	*/
	addRefund: {
		url: 'UsersLevelMaterialRefund/addRefund'
	},
	/**
	 * 我的等级资料
	*/
	getMyMaterial: {
		url: 'UsersLevel/getMyMaterial'
	},
	getNewMyMaterial: {
		url: 'UsersLevel/getNewMyMaterial'
	},
	/**
	 * 我的订单
	*/
	myOrderCount: {
		url: '/Order/myOrderCount'
	},
	/**
	 * 我的余额
	 */
	getUserFund: {
		url: '/UserFund/getUserFund'
	},
	/**
	 * 资金明细类型列表
	 */
	getFundTypeList: {
		url: '/UserFund/getFundTypeList',
		loading: true
	},
	/**
	 * 资金明细渠道列表
	 */
	getFundChannelList: {
		url: '/UserFund/getFundChannelList'
	},
	/**
	 * 资金明细
	 */
	getFunDetailList: {
		url: '/UserFund/getFunDetailList'
	},
	/**
	 * 获取二维码
	*/
	getUserQrcode: {
		url: '/users/getUserQrcode'
	},
	/**
	 * 累计佣金列表
	*/
	allFundList: {
		url: '/UserFund/allFundList'
	},
	/**
	 * 今日收入
	*/
	todayFundList: {
		url: '/UserFund/todayFundList'
	},
	/**
	 * 总销售额
	*/
	orderAmountList: {
		url: '/UserFund/orderAmountList'
	},
	/**
	 * 是否通联认证
	 * */
	isRealVerify: {
		url: '/FinVerifyReal/isRealVerify',
		loading: true
	},
	/**
	 * 是否实名认证
	*/
	isPersonVerify: {
		url: '/FinVerifyReal/isPersonVerify'
	},
	/**
	 * 创建用户 通联
	*/
	createMember: {
		url: '/FinVerifyReal/createMember'
	},
	/**
	 * 个人认证
	*/
	personVerify: {
		url: '/FinVerifyReal/personVerify',
		loading: true,
		toast: true
	},
	/**
	 * 身份证类型
	*/
	getIdentityType: {
		url: '/FinVerifyReal/getIdentityType'
	},
	/**
	 * 银行卡猎豹
	*/
	getCardList: {
		url: '/FinVerify/getCardList'

	},
	/**
	 * 分账银行卡猎豹
	*/
	getCardListReal: {
		url: '/FinVerifyReal/getCardList'

	},
	/**
	 * 银行卡类型
	*/
	getCardCategory: {
		url: '/FinVerifyReal/getCardCategory'
	},
	/**
	 * 查询银行卡
	*/
	searchBindCard: {
		url: '/FinVerifyReal/searchBindCard',
		loading: true
	},
	/**
	 * 请求绑定银行卡
	*/
	requestBindCard: {
		url: '/FinVerifyReal/requestBindCard'
	},
	/**
	 * 确认绑定银行卡
	*/
	confirmBankCard: {
		url: '/FinVerifyReal/confirmBankCard'
	},
	/**
	 * 银行卡详情
	*/
	getCardInfo: {
		url: '/FinVerifyReal/getCardInfo'
	},
	/**
	 * 解绑银行卡
	*/
	unBindCard: {
		url: '/FinVerifyReal/unBindCard'
	},
	/**
	 * 身份证类型
	*/
	getIdentityType: {
		url: '/FinVerifyReal/getIdentityType'
	},
	/**
	 * 发送短信验证【绑定/解绑】
	*/
	sendPhone: {
		url: '/FinVerifyReal/sendPhone',
		loading: '加载中',
		toast: '验证码已发送'
	},
	/**
	 * H5端用户邀请二维码
	*/
	h5Qrcode: {
		url: '/users/h5Qrcode'
	},
	/**
	 * 手机短信验证【绑定/解绑】
	*/
	doBindPhone: {
		url: '/FinVerifyReal/doBindPhone',
		loading: true,
		toast: true
	},
	/**
	 * 获取绑定手机
	*/
	getBindPhone: {
		url: '/FinVerifyReal/getBindPhone'
	},
	/**
	 * 提现列表
	*/
	withdrawDatalist: {
		url: '/Order/withdraw/datalist'
	},
	/**
	 * 提现申请
	*/
	withdrawOrder: {
		url: '/Order/withdraw',
        loading: true
	},
	/**
	 * 余额充值
	*/
	rechargeOrder: {
		url: '/Order/recharge',
        loading: true
	},
	/**
	 * 分享二维码
	*/
    getShareQrcode: {
    	url: '/users/getShareQrcode',
        loading: true
    },
	/**
	 * 分享二维码
	*/
    getH5ShareQrcode: {
    	url: '/users/getH5ShareQrcode',
        loading: true
    },
	/**
	 * 电子签约
	*/
	signContract: {
		url: '/FinVerifyReal/signContract'
	},
	/**
	 * 分佣配置
	*/
	getConfigInfo: {
		url: '/UserFund/getConfigInfo'
	},
    /**
     * 我的资产智能分析
     */
    getAnalytics: {
        url: '/UserFund/getAnalytics'
    },
    /**
     * 我的团队智能分析
    */
    intelligentAnalysis: {
        url: '/users/intelligentAnalysis'
    },
	/**
	 * 查询商家协议是否开启
	*/
	agreementStatus: {
		url: '/agreement/agreementStatus'
	},
	/**
	 * 商家协议详情
	 */
	agreementDetail: {
		url: '/agreement/agreementDetail'
	},
	/**
	 * 等级购买记录
	 */
	levelOrderList: {
		url: '/UsersLevel/levelOrderList'
	},
	/**
	 * 规则说明
	 */
	CreditExplain: {
		url: '/Credit/explain'
	},
	/**
	 * 绑定公众号
	*/
	h5BindWechat: {
		url: '/Users/h5BindWechat'
	},
	/*
	 * Fin 确认支付
	 */
	payByBackSMS: {
		url: '/UserFund/payByBackSMS',
		loading: true
	},
	/*
	 * 积分明细
	 */
	creditCreditDetail: {
		url: '/Credit/creditDetail'
	},
	/**
	 * 获取用户动态菜单
	 * */
    usersMenu: {
		url: '/users/usersMenu',
		loading: true
	},
	/**
	 * 获取发票识别码
	 * */
    getInvoiceCode: {
		url: '/UsersInvoice/getInvoiceCode',
		loading: true
	},
		/*
	 * 所购商品
	 */
	userFundGetOrderInfo: {
		url: 'UserFund/getOrderInfo'
	},
	/**
	 * 反馈建议
	 * */
	feedback: {
		url: '/UsersFeedback/save',
		loading: true,
		toast: true
	}
}

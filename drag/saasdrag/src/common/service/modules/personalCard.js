export default {
	// 获取名片个人信息
	personalCardInfo: {
		url: '/PersonalCard/personalCardInfo',
	},
	// 名片获取推荐商品
	personalRecommendGoods: {
		url: '/PersonalCard/personalRecommendGoods',
	},
	// 名片首页
	personalIndex: {
		url: '/PersonalCard/index',
	},
	// 保存名片商品
	editPersonalCardGoods: {
		url: '/PersonalCard/editPersonalCardGoods',
		toast: true
	},
	/**
	 * 保存个人名片信息
	 */
	editPersonalCard: {
		url: '/PersonalCard/editPersonalCard',
		toast: true
	},
	/**
	 * 保存个人名片信息
	 */
	personalGoodsList: {
		url: '/PersonalCard/goodsList',
		loading: true
	},
	// 获取名片模版
	personCardTemplate: {
		url: '/PersonalCard/personCardTemplate',
	},
	// 点赞名片
	thumbsUp: {
		url: '/PersonalCard/thumbsUp',
	},
	/**
	 * 名片夹列表
	 */
	personalCardFolderList: {
		url: 'PersonalCard/personalCardFolderList'
	},
	/**
	 * 名片置顶或取消置顶
	 */
	savePersonalCardFolderTop: {
		url: 'PersonalCard/savePersonalCardFolderTop',
		loading: true
	},
	/**
	 * 名片中心-谁看过我
	 * @param {String} type 1今天, 7近7天, 30近30天
	 */
	statistics: {
		url: 'PersonalCard/statistics',
		loading: true
	},
	/**
	 * 保存我看过的名片
	 */
	 savePersonalCardFolder: {
		url: 'PersonalCard/savePersonalCardFolder',
		showErr: false
	},
	/**
	 * 名片中心-谁看过我,用户列表
	 */
	personalCardSeeMeList: {
		url: 'PersonalCard/personalCardSeeMeList'
	},
	/**
	 * 看我名片的总访问次数
	 */
	totalCountViewPersonalCard: {
		url: 'PersonalCard/totalCountViewPersonalCard'
	},
	/**
	 * 获取谁看过我用户详情
	 */
	personalCardSeeMeDetail: {
		url: 'PersonalCard/personalCardSeeMeDetail',
		loading: true
	}
};

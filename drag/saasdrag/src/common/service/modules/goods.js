export default {
	goodsBrand: {
		url: '/Goods/goodsBrand'
	},
    goodsSearchKeyWord: {
    	url: '/Goods/searchKeyWord',
    },
    goodsSearchGoodsList: {
    	url: '/Goods/searchGoodsList',
	},
    goodsShopHotGoods: {
    	url: '/Goods/hotGoods',
	},
    goodsDetails: {
    	url: '/Goods/details',
        loading: true
	},
    goodsSkuInfo: {
    	url: '/Goods/skuInfo',
	},
	// 提交退货快递信息
	goodsLink: {
		url: '/Goods/goodsLink'
    },
	/**
	 * 新人礼包详情
	 */
	getNewUserGiftBag: {
		url: '/Shop/getNewUserGiftBag'
    },
	/**
	 * 专题栏目1
	 * */ 
	getSectionOne: {
		url: '/ShopSubject/getSectionOne'
	},
	/**
	 * 专题栏目2
	 * */ 
	getSectionTwo: {
		url: '/ShopSubject/getSectionTwo'
	},
	/**
	 * 根据用户轨迹获取推荐列表
	 * */
	findByGuestRecord: {
		url: '/GoodsRecommend/findByGuestRecord'
	}
}

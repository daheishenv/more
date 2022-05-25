/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-23 10:20:06
 */
export default {
    // 获取设计师风格
    getJobStyle: {
        url: '/JobUser/getJobStyle'
    },
    // 获取设计师职称
    getSourceTypeList: {
        url: '/Tools/getSourceTypeList'
    },
    // 页面设置
    customPageSet: {
        url: '/ShopCustomPageSet/modify'
    },
    /**
     * 获取自定义页面的页面设置
     */
    getCustomPageSet: {
        url: '/ShopCustomPageSet/index'
    },
    // 获取自定义页面的页面设置
    getGoodsCategoryListByIds: {
        url: '/GoodsCategory/getListByIds'
    },
    getOrderByGoodsList: {
        url: '/Tools/getOrderByGoodsList'
    },
    // 生成自定义预览二维码
    customPreviewQRcode: {
        url: '/ShopCustomPage/customPreviewQRcode'
    },
    // 生成自定义预览二维码
    getGoodsTags: {
        url: '/Goods/getTags'
    },

    //根据名称获取对象级联数据
    getSearchCategory: {
        url: '/Goods/getSearchCategory'
    },
    // 优惠券列表
    couponSelectList: {
        url: '/Coupon/couponSelectList'
    },
    // 保存预览图
    saveCoverImg: {
        url: '/ShopCustomPage/saveCoverImg'
    }
}
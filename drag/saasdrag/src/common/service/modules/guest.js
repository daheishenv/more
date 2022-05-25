import {
    localCityCatchName
} from '@/config/index'
export default {
    articleArticleCategory: {
        url: '/Article/articleCategory'
    },
    articleList: {
        url: '/Article/article'
    },
    articleDetail: {
        url: '/Article/detail'
    },
    detailActivity: {
        url: '/Activity/detail'
    },
    videoList: {
        url: '/Video/index',
        loading: '加载中'
    },
    videoPraise: {
        url: '/Video/praise'
    },
    getVideoGoods: {
        url: '/Video/getVideoGoods'
    },
    videoRead: {
        url: '/Video/read'
    },
    caseSearchTab: {
        url: '/PatternCase/ajaxSearchTab'
    },
    caseDetail: {
        url: '/PatternCase/read'
    },
    localCity: {
        catchName: localCityCatchName
    },
    cityList: {
        url: '/Region/ajaxGetCity'
    },
    packageStyle: {
        url: '/Package/packageStyle'
    },
    // 套餐包
    packageDataList: {
        url: '/Package/dataList'
    },
    /**
     * 获取当前城市的信息
     */
    getLocalInfo: {
        url: 'Region/getLocalInfo'
    },
    packageInfo: {
        url: '/Package/info'
    },
    /**
     * 查看更多工长
     */
    shopForeman: {
        url: '/ShopForeman/ajaxMoreList'
    },
    /**
     * 工長展示
     */
    shopForemanInfo: {
        url: '/ShopForeman/ajaxInfo'
    },
    // 获取分类列表
    getTypeByCenter: {
        url: '/Coupon/getTypeByCenter'
    },

    // 领券中心 - 获取精品优惠券
    couponCenterList: {
        url: '/Coupon/couponCenterList'
    },
    // 我的优惠券
    getMyCouponList: {
        url: '/Coupon/getMyCouponList'
    },
    // 领券
    giveCoupon: {
        url: '/Coupon/giveCoupon',
        toast: true
    },
    // 新人专享福利优惠券列表
    giveCouponListByNewUser: {
        url: '/Coupon/giveCouponListByNewUser'
    },
    // 新人专享福利优惠券一键领取
    oneClickGetByNewUser: {
        url: '/Coupon/oneClickGetByNewUser',
        toast: true
    },
    // 注册赠送优惠券 - 弹窗
    giveCouponByRegister: {
        url: 'Coupon/giveCouponByRegister'
    },
    // 案例推荐商品
    casePatternGoods: {
        url: '/PatternCase/patternGoods'
    },
    // 品牌故事列表
    brandStory: {
        url: '/BrandStory/dataList'
    },
    // 发现首页
    shopFind: {
        url: '/Shop/find'
    },
    // 商场信息
    mallInfo: {
        url: '/MallInfo/info'
    },
    // 标题修改
    modifyData: {
        url: 'Shop/title'
    },
}

export default {
    getTopCategory: {
        url: '/GoodsCategory/getTopCategory'
        // catchName: 'allCategory'
    },
    getChildCategory: {
        url: '/GoodsCategory/getChildCategory'
        // catchName: {
        // 	value: 'category',
        // 	position: 'after',
        //           key: 'cat_id'
        // }
    },
    designerList: {
        url: '/JobUser/index'
    },
    designerInfo: {
        url: '/JobUser/info'
    },
    recommendGoods: { // 推荐商品
        url: '/Goods/recommendGoods'
    },
    hotGoods: { // 热销爆款
        url: '/Goods/hotGoods'
    },
    specialService: { // 特色服务
        url: '/Shop/specialService'
    },
    JobUser: { // 设计师
        url: '/JobUser/jobUserHome'
    },
    Package: { // 整装套餐
        url: '/Package/dataList'
    },
    PatternCase: { // 案例列表
        url: 'PatternCase/ajaxList'
    },
    home: { // 首页配置
        url: '/Shop/home',
        loading: '加载中'
    },
    homeDecorateMall: { // 装企商城首页配置
        url: '/Shop/homeDecorateMall'
    },
    getPageByScene: { // 根据scene获取小程序跳转接口
        url: '/users/getPageByScene',
        loading: true
    },
    jointGoods: { // 拼团
        url: '/Goods/jointGoods'
    },
    spikeGoods: { // 秒杀
        url: '/Goods/spikeGoods'
    },
    getNewUserList: { // 新人专享
        url: '/Shop/getNewUserList'
    },
    /**
     * 获取四宫格
     */
    fourTopics: {
        url: '/Shop/fourTopics'
    },
    /**
     * 推荐专题
     */
    recommendTopics: {
        url: '/Shop/recommendTopics'
    },
    /**
     * 直播列表
    */
    LivePlayerList: {
        url: '/LivePlayer/datalist'
    },
    /**
     * 直播详情
    */
    LivePlayerDetail: {
        url: '/LivePlayer/detail'
    },
    // 攻略列表 - 装企
    recommendArticle: {
        url: 'Article/recommendArticle'
    },
    // 案例列表 - 装企
    homeCaseList: {
        url: 'PatternCase/recommend'
    },
    // 装修活动 - 装企
    decorateActivity: {
        url: 'Activity/decorate'
    },
    // 施工团队
    ShopForeman: {
        url: 'ShopForeman/ajaxList'
    },
    // 整装套餐
    goodsPackage: {
        url: 'Goods/goodsPackage'
    },
    // 3d展厅
    d3room: {
        url: '/Shop/d3room'
    },
    // 热门分类
    sixCategory: {
        url: '/Shop/sixCategory'
    },
    // 明星定制
    starMade: {
        url: '/Shop/starMade'
    },
    // 保存用户lbs
    saveUsersLbs: {
        url: '/users/saveUsersLbs',
        showErr: false
    },
    // 自定义页面预览
    previewPage: {
        url: '/ShopCustomPage/previewPage',
        showErr: false
    },
    // 保存表单
    saveForm: {
        url: '/ShopCustomPage/saveForm'
    }
}

/** *
 * shop_uid 商家id
 * h5，web目前是服务端根据host自己判断
 * app目前需每次打包写死，然后修改baseUrl环境地址
 * 微信小程序中 shop_uid 从微信公众平台的ext.json的文件中获取
*/
let shopUid = 1, templateId = '', appId = '', ossImgUrl = '',
    // 请求路径
    // #ifdef H5
    baseUrl = window.appDomain ? window.appDomain : "https://betaapp-saas3.zzsupei.com",
    baseOssImgUrl = (window.ossDomain ? window.ossDomain : 'https://betasaas.oss-cn-hangzhou.aliyuncs.com')
//#endif
// #ifndef H5
baseUrl = "https://betaapp-saas3.zzsupei.com",
    baseOssImgUrl = 'https://betasaas.oss-cn-hangzhou.aliyuncs.com';
//#endif
// #ifdef MP
let extConfig = wx.getExtConfigSync();
shopUid = extConfig.shop_uid !== undefined ? extConfig.shop_uid : 1;
baseUrl = extConfig.api_host;
// #ifdef MP-TOUTIAO
baseUrl = 'http://betaapp-saas6.zzsupei.com'
// #endif
templateId = extConfig.template_id;
appId = extConfig.applet_appid;
baseOssImgUrl = process.env.NODE_ENV == 'production' ? extConfig.img_host : 'https://betasaas.oss-cn-hangzhou.aliyuncs.com'
//#endif
ossImgUrl = baseOssImgUrl + '/saas/';

// 请求服务器接口配置地址
const hostUrl =
    // #ifdef MP-WEIXIN
    baseUrl;
// #endif
// #ifndef MP-WEIXIN
process.env.NODE_ENV == 'production' ? baseUrl : "https://betaapp-saas3.zzsupei.com";
// #endif

const proxyImgUrl = hostUrl + '/Tools/reGetImg?img='

// #ifdef MP
let homePath = (ROUTES.find(o => o.name === 'home') || ROUTES[0] || {}).path;
// #endif
// #ifdef H5
let homeObj = (ROUTES.find(o => o.name === 'home') || ROUTES[0] || {});
let homePath = homeObj.aliasPath ? homeObj.aliasPath : homeObj.path;
// #endif
// #ifdef APP-PLUS
let homePath = '';
// #endif
// 微信审核版本号，审核时需与后端api config接口的 *_wxapp_version 字段统一，审核完成后由后端修改
// 当前版本号 1
const version = 1

let shareDefault = {
    allowShare: true, //是否允许，默认允许，不允许分享会分享为首页
    title: '中电速配、集速配', //分享标题
    summary: '我发现一家严选好店，品质保证，快来挑选，低价抢购......', //分享文案
    imageUrl: ossImgUrl + 'common/shop-map-error.png', //分享图片
    path: homePath, //点击链接进入的页面
    webUrl: 'https://aaa.test.zzsupei.com', //兼容低版本的网页链接
    jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'] //分享的JSSDK列表
}

// 错误图片地址
const errorImg = ossImgUrl + 'common/pic-error.png';

// 无价格显示（非0，针对undefined）
const priceNullText = '';
// 无库存显示（非0，针对undefined）
const stockNullText = '';

// 个人中心自定义来源
const projectSource = true

export default { hostUrl, ossImgUrl, baseOssImgUrl, version, shopUid, shareDefault, proxyImgUrl, errorImg, priceNullText, stockNullText, projectSource }
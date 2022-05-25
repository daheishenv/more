export default {
    /**
     * 获取用户信息
     * */
    userInfo: {
        url: '/users/userinfo',
        catchName: 'userInfo'
    },
    /**
     * 我的订单
    */
    myOrderCount: {
        url: '/Order/myOrderCount'
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
   * 我的团队数量接口
    */
    teamCount: {
        url: '/users/teamCount'
    },
    /**
     * 用户扩展接口
     */
    userExtendInfo: {
        url: '/users/userExtendInfo'
    },
    /**
     * 保存个人中心页配置
     */
    personalCenterSave: {
        url: '/PersonalCenterModule/save',
    },
    /**
     * 获取个人中心配置页信息
     */
    personalCenterGetList: {
        url: '/PersonalCenterModule/getList'
    },
    getMenuList: {
        url: '/PersonalCenterModule/getMenuList'
    },
    /**
     * 获取用户等级列表
     */
    getUserLevelList: {
        url: '/PersonalCenterModule/getUserLevelList'
    },
    brandPavilionInfo: {
        url: '/BrandPavilion/getDetail',
        showErr: false
    }
}
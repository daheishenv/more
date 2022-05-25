export default {
    /**
     * 用户签到界面数据
     */
    usersSignDetail: {
        url: '/usersActivity/usersSignDetail',
        loading: true
    },
    /**
     * 更多玩法
     */
    scoreTasks: {
        url: '/Credit/scoreTasks',
        loading: true
    },
    /**
     * 积分签到
     */
    usersSign: {
        url: 'usersActivity/usersSign',
        loading: true
    },
    /**
     * 积分规则
     */
    explain: {
        url: 'Credit/explain',
        loading: true
    },
    /**
     * 获取各种规则
     */
    explainByType: {
        url: 'Credit/config',
        loading: true
    },
    /**
     * Credit/creditDetail
     * 积分明细
     */
    creditDetail: {
        url: 'Credit/creditDetail'
    },
    /**
     * Credit/myCredit
     * 我的积分
     */
    myCredit: {
        url: 'Credit/myCredit',
        loading: true
    },
    /**
     * 用户邀请
     */
    usersInvitation: {
        url: '/usersActivity/usersInvitation',
        loading: true
    },
    /**
     * 用户邀请记录
     */
    usersInvitationList: {
        url: '/usersActivity/usersInvitationList',
        loading: true
    },
    	//积分配置
      creditConfig:{
        url: '/Credit/config'
      },
      // 获取积分状态
      creditState:{
        url: '/Credit/state'
      },
      // 用户阅读文章
      readArticle:{
        url: '/usersActivity/readarticle'
      },
      // 获取商品赠送积分
      creditGoods:{
        url: '/Credit/goods'
      },
          /**
     * 积分商品全部类别
     */
     creditGoodsCategory: {
      url: 'CreditGoods/category'
  },
  /**
   * 积分商品列表
   */
  creditGoodsList: {
      url: 'CreditGoods/findByPage'
  },
  /**
   * 获取消耗积分配置
   */
   getConsumeSetting: {
      url: 'CreditGoods/getConsumeSetting'
  },
}
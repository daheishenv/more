/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-11-22 17:41:09
 */
function getSetting(tmplIds, callback) {
    wx.requestSubscribeMessage({
        // 调起消息订阅界面
        tmplIds: tmplIds,
        success(res) {
            console.log('订阅消息成功')
            console.log(res)
        },
        fail(err) {
            console.log('订阅消息失败 ')
            console.log(err)
        },
        complete(e) {
            console.log(e)
            callback && callback()
        }
    })
}

function showModal(list, callback) {
    this.$modal({
        title: '提示',
        content: '请授权开通服务通知',
        showCancel: true,
        success: function (res) {
            if (res.confirm) {
                getSetting(list, callback, () => {
                    callback && callback()
                })
            } else {
                callback && callback()
            }
        },
        fail: function () { },
        complete: function () { }
    })
}

function pushMessage(type, callback, isModal) {
    return new Promise(async (resolve, reject) => {
        const enums = { order: '10,12', cancelOrder: '11', refuse: '13', placeOrder: '14', balance: '20,22', vip: '30,40', logisticsServices: '70', coupon: '50,60' }
        const params = { type: enums[type] }
        const { list } = await this.$http('pushMessageType', params)
        console.log('pushMessageType', list)
        if (list && list.length) {
            const that = this
            wx.getSetting({
                withSubscriptions: true, // 这里设置为true,下面才会返回mainSwitch
                success: function (res) {
                    // 调起授权界面弹窗
                    console.log('调起授权界面弹窗')
                    console.log(res.subscriptionsSetting.mainSwitch, 'mainSwitch')
                    if (res.subscriptionsSetting.mainSwitch) {
                        // 用户打开了订阅消息总开关
                        if (isModal) {
                            showModal.call(that, list, callback, () => {
                                callback && callback()
                            })
                            return
                        }
                        getSetting(list, callback, () => {
                            callback && callback()
                        })
                    } else {
                        console.log('关闭订阅消息总开关')
                        callback && callback()
                    }
                },
                fail: function (error) {
                    console.log(error)
                    console.log('调起授权界面弹失败')
                }
            })
            return
        }
        callback && callback()
    })
}

export default pushMessage

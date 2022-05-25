import Vue from 'vue'
import { formatItemData, fillItemData } from '@/utils/drag'

const user = {
    state: {
        pageList: [],           // 页面托拉拽列表
        currentCheckAttr: {},   // 当前的组件信息
        pageScrollTop: 0, // 页面滚动高度    
        responseData: {}, // 模拟保存后返回的数据
        ShopTheme: 'ShopTheme1',  // 当前主题
        /*
         * @param {String} titleDisabledRule 标题禁用规则
         */
        componentsInfo: [       // 所有组件的信息
            {
                title: '顶部导航栏',
                cmptId: 'top-nav',
                moduleName: 'top-nav',
                api: "",
                apiParam: {},
                moduleNo: 1,
                isShow: 1,
                dragOpt: {
                    disabled: true,
                    draggable: false
                },
                content: [
                    {
                        label: '导航标题',
                        type: 'text',
                        pro: 'title',
                        maxlength: 8,
                        value: '个人中心'
                    },
                    {
                        label: '颜色设置（跟随主题色）',
                        pro: 'followTheme',
                        type: 'switch',
                        value: 1
                    },
                    {
                        pro: 'outerLayer',
                        key: 'backgroundColor',
                        label: '背景颜色',
                        type: 'color',
                        value: 'rgba(255, 120, 0, 1)',
                        show: {
                            pro: 'followTheme',
                            value: 0
                        }
                    },
                    {
                        label: '文字颜色',
                        pro: 'outerLayer',
                        key: 'color',
                        type: 'radio-color',
                        value: '#fff',
                        options: [{
                            label: '白色',
                            value: '#fff',
                            color: 'rgba(255, 255, 255, 1)'
                        }, {
                            label: '黑色',
                            value: '#000',
                            color: 'rgba(0, 0, 0, 1)'
                        }]
                    },
                ]
            },
            {
                title: '用户头部',
                cmptId: 'user-header',
                moduleName: 'user-header',
                api: "",
                apiParam: {},
                moduleNo: 2,
                isShow: 1,
                dragOpt: {
                    disabled: true,
                    draggable: false,
                },
                content: [
                    {
                        label: '风格',
                        pro: 'mode',
                        type: 'radio',
                        value: 'style1',
                        options: [
                            { label: '风格1', value: 'style1' },
                            // { label: '风格2', value: 'style2' },
                            {
                                label: '风格2', value: 'style2',
                                // 当value不相同时, 删除该项
                                show: {
                                    value: 'style2'
                                }
                            },
                        ],
                        titleDisabledRule: [{
                            pro: 'mode',
                            contains: ['style2'],
                            cmptId: 'member-upgrade',
                            isShow: 0,
                            dragOpt: {
                                disabled: true,
                            },
                        }],
                    },
                    {
                        label: '颜色设置（跟随主色）',
                        pro: 'followTheme',
                        type: 'switch',
                        value: 1,
                    },
                    {

                        type: 'upload',
                        pro: 'outerLayer',
                        key: 'backgroundImage',
                        value: '/saas/user/index/userbg.png',
                        bgImgTips: '建议上传750*576尺寸的图片',
                        show: {
                            pro: 'followTheme',
                            value: 0
                        }
                    },
                    {
                        type: 'checkbox',
                        label: '累计佣金',
                        pro: 'style1',
                        key: 'totalSplit',
                        value: 1,
                        options: [
                            { label: '不显示', value: 0 },
                            { label: '显示', value: 1 }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style1'
                        }
                    },
                    {
                        type: 'checkbox',
                        pro: 'style1',
                        key: 'todaySplit',
                        label: '今日收入',
                        value: 1,
                        options: [
                            { label: '不显示', value: 0 },
                            { label: '显示', value: 1 }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style1'
                        }
                    },
                    {
                        type: 'checkbox',
                        pro: 'style1',
                        key: 'totalSale',
                        label: '总销售额',
                        value: 1,
                        options: [
                            { label: '不显示', value: 0 },
                            { label: '显示', value: 1 }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style1'
                        }
                    },
                    {
                        type: 'checkbox',
                        pro: 'style1',
                        key: 'credit',
                        label: '我的积分',
                        value: 1,
                        options: [
                            { label: '不显示', value: 0 },
                            { label: '显示', value: 1 }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style1'
                        }
                    },
                    {
                        type: 'checkbox',
                        label: '我的收藏',
                        pro: 'style2',
                        key: 'collect_count',
                        value: 1,
                        options: [
                            { label: '不显示', value: 0 },
                            { label: '显示', value: 1 }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style2'
                        }
                    },
                    {
                        type: 'checkbox',
                        pro: 'style2',
                        key: 'coupon_count',
                        label: '优惠券',
                        value: 1,
                        options: [
                            { label: '不显示', value: 0 },
                            { label: '显示', value: 1 }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style2'
                        }
                    },
                    {
                        type: 'checkbox',
                        pro: 'style2',
                        key: 'activities_count',
                        label: '我的活动',
                        value: 1,
                        options: [
                            { label: '不显示', value: 0 },
                            { label: '显示', value: 1 }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style2'
                        }
                    },
                    {
                        type: 'checkbox',
                        pro: 'style2',
                        key: 'credit',
                        label: '我的积分',
                        value: 0,
                        options: [
                            { label: '不显示', value: 0 },
                            { label: '显示', value: 1 }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style2'
                        }
                    }
                ]
            },
            {
                title: '会员升级',
                cmptId: 'member-upgrade',
                moduleName: 'member-upgrade',
                api: "",
                apiParam: {},
                moduleNo: 4,
                isShow: 1,
                dragOpt: {
                    draggable: false,
                },
                content: [
                    {
                        label: '选择类型',
                        type: 'switch',
                        pro: 'mode',
                        value: 'style1',
                        options: [
                            { label: '默认', value: 'style1' },
                            { label: '自定义', value: 'style2' }
                        ]
                    },
                    {
                        label: '自定义类型',
                        pro: 'type',
                        type: 'radio',
                        value: 'type1',
                        comStyle: 'sub-bgc',
                        options: [
                            { label: '风格1', value: 'type1' },
                            { label: '风格2', value: 'type2' },
                            { label: '风格3', value: 'type3' }
                        ],
                        show: {
                            pro: 'mode',
                            value: 'style1'
                        }
                    },
                    {
                        label: '标题',
                        pro: 'title',
                        type: 'text',
                        maxlength: 8,
                        value: '会员升级',
                        comStyle: 'sub-bgc',
                        show: {
                            pro: 'mode',
                            value: 'style1'
                        }
                    },
                    {
                        label: '文案',
                        pro: 'sub_title',
                        type: 'text',
                        maxlength: 20,
                        value: '严选好物 专属福利 限时折扣 分享抽佣',
                        comStyle: 'sub-bgc',
                        show: {
                            pro: 'mode',
                            value: 'style1'
                        }
                    },
                    {
                        label: '按钮文案',
                        pro: 'btn_text',
                        type: 'text',
                        maxlength: 8,
                        value: '立即领取',
                        comStyle: 'sub-bgc',
                        show: {
                            pro: 'mode',
                            value: 'style1'
                        }
                    },
                    {
                        type: 'upload',
                        pro: 'backgroundImage',
                        value: '',
                        bgImgTips: '建议上传710*120尺寸的图片',
                        show: {
                            pro: 'mode',
                            value: 'style2'
                        }
                    },
                    {
                        label: '跳转链接',
                        type: 'links',
                        pro: 'jump',
                        value: [
                            { app_page: "memberVip", name: "会员" }
                        ]
                    }
                ]
            },
            {
                title: '服务导购',
                cmptId: 'shop-guide',
                moduleName: 'shop-guide',
                api: "storeGuideGetInfo",
                apiParam: {},
                moduleNo: 9,
                isShow: 1,
            },
            // {
            //     title: '品牌馆',
            //     cmptId: 'user-brand',
            //     moduleName: 'user-brand',
            //     api: "brandPavilionInfo",
            //     apiParam: {},
            //     moduleNo: 10,
            //     isShow: 1,
            // },
            {
                title: '销售顾问',
                cmptId: 'sales-consultant',
                moduleName: 'sales-consultant',
                api: "userExtendInfo",
                apiParam: {},
                moduleNo: 5,
                isShow: 1,
                dragOpt: {
                },
                content: [
                    {
                        label: '组件边距',
                        pro: 'outerLayer',
                        key: 'margin',
                        type: 'switch',
                        unit: 'rpx',
                        multip: 24,
                        value: 1
                    },
                    {
                        label: '组件圆角',
                        pro: 'outerLayer',
                        key: 'borderRadius',
                        type: 'slider',
                        unit: 'rpx',
                        step: 4,
                        max: 48,
                        value: 16
                    },
                ]
            },
            {
                title: '订单信息',
                cmptId: 'order',
                moduleName: 'order',
                api: "myOrderCount",
                apiParam: {},
                moduleNo: 6,
                isShow: 1,
                dragOpt: {
                },
                content: [
                    {
                        label: '组件边距',
                        pro: 'outerLayer',
                        key: 'margin',
                        type: 'switch',
                        unit: 'rpx',
                        multip: 24,
                        value: 1
                    },
                    {
                        label: '背景颜色',
                        pro: 'outerLayer',
                        key: 'backgroundColor',
                        type: 'color',
                        value: 'rgba(255, 255, 255, 1)'
                    },
                    {
                        label: '组件圆角',
                        pro: 'outerLayer',
                        key: 'borderRadius',
                        type: 'slider',
                        unit: 'rpx',
                        step: 4,
                        max: 48,
                        value: 16
                    },
                ]
            },
            {
                title: '我的工具',
                cmptId: 'my-tools',
                moduleName: 'my-tools',
                api: "usersMenu",
                apiParam: {},
                moduleNo: 9,
                isShow: 1,
                dragOpt: {
                },
                content: [
                    {
                        label: '自定义类型',
                        type: 'switch',
                        pro: 'mode',
                        value: 'style2',
                        options: [
                            { label: '排列式', value: 'style1', icon: 'icon-bianji1' },
                            { label: '宫格式', value: 'style2', icon: 'icon-liebiao' },
                        ]
                    },
                    {
                        label: '组件边距',
                        pro: 'outerLayer',
                        key: 'margin',
                        type: 'switch',
                        unit: 'rpx',
                        multip: 24,
                        value: 1
                    },
                    {
                        label: '框体圆角',
                        pro: 'outerLayer',
                        key: 'borderRadius',
                        type: 'slider',
                        unit: 'rpx',
                        step: 4,
                        max: 48,
                        value: 16
                    },
                    {
                        label: '菜单内容',
                        type: 'tools',
                        pro: 'toolsData',
                        value: [],
                        comStyle: 'menu-tools'
                    }
                ]
            },
            {
                title: '广告图',
                cmptId: 'banner',
                moduleName: 'banner',
                api: "",
                apiParam: {},
                moduleNo: 7,
                isShow: 1,
                dragOpt: {
                },
                content: [
                    {
                        pro: 'outerLayer',
                        key: 'backgroundImage',
                        type: 'upload',
                        value: '',
                        bgImgTips: '建议上传750*576尺寸的图片'
                    },
                    {
                        label: '跳转链接',
                        type: 'links',
                        pro: 'jump',
                        value: [
                            { name: '' }
                        ]
                    },
                    {
                        label: '可加客户',
                        pro: 'customer_visible',
                        type: 'radio',
                        value: 'style1',
                        options: [
                            { label: '不限', value: 'style1' },
                            { label: '部分客户可见', value: 'style2' },
                        ],
                    },
                    {
                        label: '',
                        pro: 'visible_vip',
                        type: 'checkbox-group',
                        options: [],
                        value: [],
                        show: {
                            pro: 'customer_visible',
                            value: 'style2'
                        }
                    },
                    {
                        label: '组件边距',
                        pro: 'outerLayer',
                        key: 'margin',
                        type: 'switch',
                        unit: 'rpx',
                        multip: 24,
                        value: 1
                    },
                    {
                        label: '组件圆角',
                        pro: 'outerLayer',
                        key: 'borderRadius',
                        type: 'slider',
                        unit: 'rpx',
                        step: 4,
                        max: 48,
                        value: 16
                    },
                ]
            },
            {
                title: '我的团队',
                cmptId: 'my-team',
                moduleName: 'my-team',
                api: "teamCount",
                apiParam: {},
                moduleNo: 8,
                isShow: 1,
                dragOpt: {
                },
                content: [
                    {
                        label: '颜色设置（跟随主色）',
                        pro: 'followTheme',
                        type: 'switch',
                        value: 1
                    },
                    {
                        label: '背景颜色',
                        pro: 'innerLayer',
                        key: 'backgroundColor',
                        type: 'color',
                        value: 'rgba(255, 120, 0, 1)',
                        show: {
                            pro: 'followTheme',
                            value: 0
                        }
                    },
                    {
                        label: '文字颜色',
                        pro: 'outerLayer',
                        key: 'color',
                        type: 'color',
                        value: 'rgba(255, 120, 0, 1)'
                    },
                    {
                        label: '组件背景',
                        pro: 'outerLayer',
                        key: 'backgroundColor',
                        type: 'color',
                        value: 'rgba(255,255,255,1)'
                    },
                    {
                        label: '组件边距',
                        pro: 'outerLayer',
                        key: 'margin',
                        type: 'switch',
                        unit: 'rpx',
                        multip: 24,
                        value: 1
                    },
                    {
                        label: '组件圆角',
                        pro: 'outerLayer',
                        key: 'borderRadius',
                        type: 'slider',
                        unit: 'rpx',
                        step: 4,
                        max: 48,
                        value: 16
                    },
                ]
            },

        ]
    },
    mutations: {
        // 设置组件选中时scroll- view是scrollTop值
        SET_SCROLL_TOP(state, top) {
            state.pageScrollTop = top
        },
        //  替换某一项
        REPLACE_COMPONENTS_INFO(state, { index, data }) {
            state.componentsInfo.splice(parseInt(index), 1, data)
        },
        // 更新整个列表
        SET_PAGE_LIST(state, data) {
            state.pageList = data
            console.log('--设置页面pageList--', state.pageList);
        },
        // 替换某一项
        REPLACE_PAGE_ITEM(state, { index, data }) {
            state.pageList.splice(parseInt(index), 1, formatItemData(data))
            console.log('----替换操作----', state.pageList);
        },
        // 选中节点
        SET_CURRENT_CHECK_ATTR(state, { cmptId }) {
            state.currentCheckAttr = state.componentsInfo.find(o => o.cmptId === cmptId)
        }
    },
    actions: {
        setScrollTop({ commit }, { top = 0 }) {
            commit('SET_SCROLL_TOP', top)
        },
        // 选中节点
        setCurrentCheckAttr({ commit, rootState, state }, { cmptId }) {
            commit('SET_CURRENT_CHECK_ATTR', { cmptId })
        },
        // 替换某一项
        replaceItemComInfo({ commit }, { index, data }) {
            commit('REPLACE_COMPONENTS_INFO', {
                index,
                data
            })
        },
        // 替换某一项
        replaceItemList({ commit }, { index, data }) {
            commit('REPLACE_PAGE_ITEM', {
                index,
                data
            })
        },
        // 页面数据
        setPageList({ commit }, data) {
            Vue.prototype.$c.throttle(() => {
                commit('SET_PAGE_LIST', data)
            }, 1000 / 60)
        },
        // 保存按钮
        async personalCenterSave({ dispatch, state, rootState }) {
            // 修改itemList的数据格式
            const list = Vue.prototype.$deepClone(state.componentsInfo.map(o => formatItemData(o)))
            let params = {
                list: list.map(o => {
                    return {
                        api: o.api,
                        apiParam: o.apiParam,
                        cmptId: o.cmptId,
                        dragOpt: o.dragOpt,
                        extra: o.extra,
                        isShow: o.isShow,
                        moduleName: o.moduleName,
                        moduleNo: o.moduleNo,
                        title: o.title
                    }
                })
            }
            await Vue.prototype.$http('personalCenterSave', params)
            Vue.prototype.$message({
                type: 'success',
                message: '发布成功'
            })
            setTimeout(() => {
                location.reload();
            }, 1000)
        },
        // 获取所有组件信息
        async personalCenterGetList({ dispatch, state, rootState }) {
            const { data: { list = [], theme } } = await Vue.prototype.$http('personalCenterGetList')
            state.ShopTheme = theme
            const first = !list.length
            // 当主题是7时[用户头部]的特殊处理
            if (theme === 'ShopTheme7') {
                // 第一次进来赋值为风格2
                if (first) {
                    state.componentsInfo.forEach(o => {
                        if (o.cmptId === 'user-header') {
                            const tempObj = o.content.find(item => item.pro === 'mode')
                            tempObj.value = 'style2'
                        }
                    })
                }
            }
            state.componentsInfo = (list.length ? list : state.componentsInfo).map(o => {
                return fillItemData(o)
            })
        }
    }
}

export default user
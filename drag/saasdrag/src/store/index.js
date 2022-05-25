import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import { getCachesComponentsInfo } from '@/utils/localStore'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        showComponentPreview: false, // 组件预览
        componentPreviewName: '', // 组件预览的名字
        componentPreviewConfig: {}, // 二开 预览传入组件的所有数据
        myComponentPreviewData: {}, // 自定义组件的数据
        pattern: 'page', // 编辑的模式，页面模式和组件模式 [page,component]
        list: [], //好像没用
        showFlexDraggalbeHandle: true, // 控制布局锁定
        preview: false, // 预览开关
        phoneSize: 100, // 页面大小缩放
        rightAideTabActiveName: 'four', // 右侧 tab 项变量
        shopHomeData: [],   // 首页模块数据
        newHomeData: {},// 组件中的远程数据
        max_module_no: '',   // 拖拉后每个组件的id, 自增
        timeDiff: undefined,     // 当前系统时间差
        page_id: '',         // 页面的id
        login_uid: '',       // 页面登录id
        username: '',        // 页面登录用户名
        componentsInfo: { // 组件的基本信息
            /*  组件格式规范
            * @param {String} name 组件名
            * @param {Boolean} fixed 是否可以拖拽 ture 固定 false 可拖拽
            * @param {Boolean} nodel 是否不能删除 1 不能删除 不为1 可删除
            * @param {Number} id 组件id 唯一值
            * @param {String} module_name 组件类型名称（不同组件风格可能存在组件是多个文件，所以需要一个标识他们是同一个组件类型）
            * @param {String} cmptId 前端渲染组件的标识
            * @param {String} componentName 组件统一名称 不可修改
            * @param {String} rightComponents 右侧配置组件（目前都是统一的right-common-set）

            * @param {String} api 组件接口请求地址
            * @param {Object} apiParam 组件参数
            * @param {String} apiParam>limit 默认展示条数

            * @param {Object} rightConfig 样式以及内容配置
            * @param {Array} attribute 样式配置,不区分展示attribute和source,可混用或者只写其中一个
            * @param {Array} source 内容配置 同attribute
            * @param {String} source > label 设置的title
            * @param {String} source > key 只设置key则是修改最外层数据
            * @param {String} source > pro 设置这个值会自动注入到extra属性里面去（apiParam除外，详情看utils/dray.js里面的白名单）
            * @param {String} source > type 设置的展示类型，
                   可选值有：number（纯数字）
                            slider（滑动数值）
                            text（文本）
                            rich-text（富文本）
                            switch（按钮式切换）
                            upload（上传图片）
                            magic-square（魔方上传图片）
                            req-select（下拉组件，带请求）
                            date-time-range（时间范围选择）
                            setting（去配置，弹窗设置）
                            color（颜色选择器）
                            video（视频上传）
                            category(分类选择)
            * @param {String} source > multip 被乘数
            * @param {String} source > unit 设置之后的转换单位
            * @param {String} source > min 最小值，仅在type为number时生效
            * @param {String} source > max 最大值，仅在type为number时生效
            * @param {String} source > maxlength 最大字符数，仅在type为text时生效
            * @param {String} source > value  最终值 = multip * value + unit
            * @param {String} source > valueConfig 仅在type为upload、category时生效，一般配置上传的额外展示内容
            * @param {String} source > options 仅在type为switch时生效，默认为[{ label: '否', value: 0 },{ label: '是', value: 1 }]
            * @param {String} source > settingValue 仅在type为setting时生效，右侧的显示文字
            * @param {Object} source > show 显示条件，没改该选项或者满足该选项显示
            * @param {String} source > show > pro 同source > pro含义
            * @param {String} source > show > key 同source > key含义
            * @param {Array} source > show > value pro和key组合起来的结构值跟这个值比较，是否存在这个值范围内则展示
            * @param {Boolean} shortcutOperation 是否有删除黏贴上下移动操作菜单
            * @param {Boolean} source > notLabelWidth 表单 label 换行, 换行后一行充满
            *
            * // 上传保存草稿箱参数
            * extra
            * outerLayer 外层样式
            * innerLayer 内层样式
            * titleLayer 标题样式
            * mode 组件风格
            */
            //头部组件
            headerList: [
                {
                    name: '顶部导航栏',
                    module_name: 'header',
                    fixed: 'top',
                    nodel: 1,
                    id: 1000,
                    cmptId: 'sub-home-header-cate',
                    componentName: 'saasComponent',
                    icon: 'drag-lunbotu',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        attribute: [
                            {
                                type: 'divider',
                                label: '风格设置'
                            },
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '文字导航', value: 'style1', icon: 'drag-wenzidaohang' },
                                    { label: '搜索导航', value: 'style2', icon: 'drag-sousuodaohang' }
                                ],
                                value: 'sub-home-header-cate',
                            },
                            {
                                label: '搜索换行',
                                type: 'switch',
                                pro: 'nowrap',
                                value: 0,
                                show: {
                                    pro: 'mode',
                                    contains: ['style2']
                                }
                            },
                            {
                                label: '地址定位',
                                type: 'switch',
                                pro: 'location',
                                value: 1
                            },
                            {
                                label: '开启沉浸式',
                                pro: 'fixedHeight',
                                type: 'switch',
                                value: 'inherit',
                                options: [
                                    { label: '否', value: 'inherit' },
                                    { label: '是', value: '0' }
                                ],
                            },
                            {
                                type: 'divider',
                                label: '标题设置'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '页面标题',
                                maxlength: 15
                            },
                            {
                                label: '标题位置',
                                pro: 'titleLayer',
                                key: 'mode',
                                type: 'switch',
                                value: 'center',
                                options: [{
                                    label: '居左',
                                    value: 'left'
                                }, {
                                    label: '居中',
                                    value: 'center'
                                }],
                                disabledRule: [{
                                    pro: 'location',
                                    contains: [1],
                                    value: 'center'
                                }],
                            },
                            {
                                type: 'divider',
                                label: '颜色设置'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
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
                            {
                                label: '搜索框颜色',
                                key: 'color',
                                pro: 'innerLayer',
                                type: 'color',
                                value: 'rgba(153, 153, 153, 1)',
                                show: {
                                    pro: 'mode',
                                    contains: ['style2']
                                }
                            },
                            {
                                label: '搜索框背景',
                                key: 'bgColor',
                                pro: 'innerLayer',
                                type: 'color',
                                value: 'rgba(255,255,255,1)',
                                show: {
                                    pro: 'mode',
                                    contains: ['style2']
                                }
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)'
                            }
                        ]
                    }
                },
            ],
            // id 0- 999  （约定）会根据id来判断是哪个list
            // 首页组件
            indexList: [
                {
                    name: '轮播图',
                    module_name: 'banner',
                    id: 1,
                    cmptId: "sub-home-banner",
                    componentName: 'saasComponent',
                    icon: 'drag-lunbotu',
                    limitNum: 20,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        attribute: [
                            {
                                label: '图片高度',
                                key: 'height',
                                type: 'slider',
                                pro: 'innerLayer',
                                unit: 'rpx',
                                min: 150,
                                max: 1334,
                                value: 310
                            },
                            {
                                label: '图片边角',
                                key: 'borderRadius',
                                pro: 'innerLayer',
                                unit: 'rpx',
                                type: 'switch',
                                value: 0,
                                options: [
                                    {
                                        label: '方角',
                                        value: 0,
                                    },
                                    {
                                        label: '圆角',
                                        value: 16,
                                    }
                                ]
                            },
                            {
                                label: '图侧边距',
                                key: 'padding',
                                type: 'switch',
                                pro: 'outerLayer',
                                unit: 'rpx',
                                multip: 24,
                                value: 0,
                                options: [
                                    {
                                        label: '无',
                                        value: 0,
                                    },
                                    {
                                        label: '有',
                                        value: 1,
                                    }
                                ]
                            },
                            {
                                label: '录播方式',
                                type: 'switch',
                                pro: 'autoplay',
                                value: 1,
                                options: [
                                    {
                                        label: '滚动播放',
                                        value: 1,
                                    },
                                    {
                                        label: '滑动播放',
                                        value: 0,
                                    }
                                ]
                            },
                            {
                                label: '轮播间隔',
                                type: 'switch',
                                pro: 'interval',
                                value: 3000,
                                options: [
                                    {
                                        label: '3秒',
                                        value: 3000,
                                    },
                                    {
                                        label: '5秒',
                                        value: 5000,
                                    }
                                ],
                                show: {
                                    pro: 'autoplay',
                                    contains: [1]
                                }
                            },
                            {
                                label: '指示样式',
                                type: 'switch',
                                pro: 'indicatorMode',
                                value: 'dotted',
                                options: [
                                    {
                                        label: '无',
                                        value: 'none',
                                    },
                                    {
                                        label: '圆点',
                                        value: 'dotted',
                                    },
                                    {
                                        label: '线段',
                                        value: 'line',
                                    },
                                    {
                                        label: '数字',
                                        value: 'number',
                                    }
                                ]
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                key: 'backgroundColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(245, 245, 245, 1)'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ],
                        source: [
                            {
                                title: '添加图片',
                                summary: '最多添加 10 个轮播图，拖动选中的导航可对其排序',
                                key: 'data',
                                type: 'upload',
                                max: 10,
                                min: 4,
                                pushBtnText: '添加图片',
                                value: [{
                                    img_url: ''
                                }],
                                valueConfig: {
                                    title: '图片'
                                }
                            }
                        ]
                    }
                },
                {
                    name: '搜索栏',
                    module_name: 'search',
                    id: 125,
                    cmptId: "sub-home-search-wrap",
                    componentName: 'saasComponent',
                    icon: 'drag-sousuolan',
                    limitNum: 20,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    rightConfig: {
                        attribute: [
                            // {
                            //     label: '搜索热词和更多相关配置项请前往配置',
                            //     type: 'links',
                            //     pro: 'jump',
                            //     value: [
                            //         {
                            //             name: ''
                            //         }
                            //     ]
                            // },
                            {
                                label: '内容设置',
                                type: 'divider'
                            },
                            {
                                label: '内容设置',
                                key: 'title',
                                type: 'text',
                                value: '搜索你想要的商品',
                                maxlength: 10,
                            },
                            {
                                label: '框体样式',
                                key: 'borderRadius',
                                pro: 'innerLayer',
                                value: 50,
                                unit: 'rpx',
                                type: 'switch',
                                options: [
                                    {
                                        label: '圆角',
                                        value: 50,
                                    },
                                    {
                                        label: '方角',
                                        value: 0,
                                    }
                                ]
                            },
                            {
                                label: '文本位置',
                                pro: 'mode',
                                value: 'normal',
                                type: 'switch',
                                options: [
                                    {
                                        label: '居左',
                                        value: 'normal',
                                    },
                                    {
                                        label: '居中',
                                        value: 'center',
                                    }
                                ]
                            },
                            {
                                label: '框体高度',
                                key: 'height',
                                type: 'slider',
                                pro: 'innerLayer',
                                unit: 'rpx',
                                min: 56,
                                max: 120,
                                value: 76
                            },
                            {
                                label: '文本颜色',
                                key: 'color',
                                pro: 'innerLayer',
                                type: 'color',
                                value: 'rgba(153, 153, 153, 1)'
                            },
                            {
                                label: '框体颜色',
                                key: 'backgroundColor',
                                pro: 'innerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)'
                            },
                            {
                                label: '组件背景',
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)'
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ],
                    }
                },
                {
                    name: '商品',
                    module_name: 'goods',
                    id: 125,
                    cmptId: "sub-home-goods",
                    componentName: 'saasComponent',
                    icon: 'drag-shangpin',
                    limitNum: 20,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    api: 'Goods/getGoodsModuleList',
                    apiParam: {},
                    rightConfig: {
                        source: [
                            {
                                label: '接口查询的id类型',
                                pro: 'apiParam',
                                key: 'idType',
                                value: 'goodsId',
                                show: false
                            },
                            {
                                type: 'goods',
                                text: '选择商品',
                                selectText: '添加商品',
                                pro: 'apiParam',
                                key: 'ids',
                                dialogFlag: 'goodsDialogFlag',
                                min: 1,
                                max: 18,
                                value: '',
                                show: {
                                    pro: 'apiParam',
                                    key: 'idType',
                                    contains: ['goodsId']
                                }
                            },
                            {
                                label: '接口地址',
                                key: 'api',
                                value: 'Goods/getGoodsModuleList',
                                show: false
                            },
                            {
                                label: '已选分组',
                                key: 'ids',
                                pro: 'apiParam',
                                type: 'req-classify',
                                reqName: 'getGoodsCategoryListByIds',
                                dialogFlag: 'goodsDialogFlag',
                                min: 1,
                                max: 18,
                                value: '',
                                show: {
                                    pro: 'apiParam',
                                    key: 'idType',
                                    contains: ['all', 'cateId']
                                }
                            },
                            {
                                label: '商品排序',
                                key: 'order',
                                pro: 'apiParam',
                                type: 'req-select',
                                reqName: 'getOrderByGoodsList',
                                show: {
                                    pro: 'apiParam',
                                    key: 'idType',
                                    contains: ['cateId', 'all']
                                }
                            },
                            {
                                label: '商品数量',
                                type: 'number',
                                value: 4,
                                pro: 'apiParam',
                                key: 'limit',
                                min: 1,
                                max: 18,
                                show: {
                                    pro: 'apiParam',
                                    key: 'idType',
                                    contains: ['all', 'cateId']
                                }
                            },
                            {
                                type: 'divider',
                                label: '商品列表'
                            },
                            {
                                label: '列表样式',
                                pro: 'mode',
                                value: 'style2',
                                type: 'switch',
                                notLabelWidth: true,
                                options: [
                                    { label: '大图模式', value: 'style1', icon: 'drag-yihangyige1' },
                                    { label: '一行两个', value: 'style2', icon: 'drag-yihangerge' },
                                    { label: '一行三个', value: 'style3', icon: 'drag-yihangsange' },
                                    { label: '横向滑动', value: 'style4', icon: 'drag-hengxianghuadong' },
                                    { label: '详细列表', value: 'style5', icon: 'drag-xiangxiliebiao' },
                                    { label: '一大N小', value: 'style6', icon: 'drag-yishangerxia' }
                                ]
                            },
                            {
                                type: 'divider',
                                label: '商品内容'
                            },
                            {
                                label: '商品名称',
                                type: 'checkbox',
                                pro: 'titileShow',
                                value: 1,
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            // {
                            //     label: '商品描述',
                            //     type: 'checkbox',
                            //     pro: 'briefShow',
                            //     value: 0,
                            //     options: [
                            //         { label: '不显示', value: 0 },
                            //         { label: '显示', value: 1 }
                            //     ]
                            // },
                            {
                                label: '商品价格',
                                type: 'checkbox',
                                pro: 'priceShow',
                                value: 1,
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            {
                                label: '划线价格',
                                type: 'checkbox',
                                pro: 'marketPriceShow',
                                value: 1,
                                disabledRule: [{
                                    pro: 'mode',
                                    contains: ['style3', 'style4'],
                                    value: 0
                                }],
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            {
                                label: '购物车',
                                type: 'checkbox',
                                pro: 'purchaseShow',
                                value: 1,
                                disabledRule: [{
                                    pro: 'mode',
                                    contains: ['style3', 'style4', 'style6'],
                                    value: 0
                                }, {
                                    pro: 'itemLayer',
                                    key: 'textAlign',
                                    contains: ['center'],
                                    value: 0
                                }],
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            {
                                label: '',
                                pro: 'shopcard',
                                value: 'icon-gouwuche1',
                                type: 'radio-text',
                                notLabelWidth: true,
                                options: [
                                    { label: '样式1', value: 'icon-gouwuche1' },
                                    { label: '样式2', value: 'icon-gouwuche2' },
                                    { label: '样式3', value: 'icon-gouwuche3' },
                                    { label: '样式4', value: 'icon-gouwuche4' },
                                    {
                                        label: '样式5', value: 'btn1', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style2', 'style5']
                                        }]
                                    },
                                    {
                                        label: '样式6', value: 'btn2', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style2', 'style5']
                                        }]
                                    },
                                    {
                                        label: '样式7', value: 'btn3', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style2', 'style5']
                                        }]
                                    },
                                    {
                                        label: '样式8', value: 'btn4', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style2', 'style5']
                                        }]
                                    },
                                ],
                                show: {
                                    pro: 'purchaseShow',
                                    contains: [1]
                                }
                            },
                            {
                                label: '按钮文字',
                                pro: 'shopcardText',
                                type: 'text',
                                value: '购买',
                                maxlength: 5,
                                show: {
                                    pro: 'shopcard',
                                    contains: ['btn1', 'btn2', 'btn3', 'btn4']
                                },
                            },
                            {
                                label: '文本位置',
                                pro: 'itemLayer',
                                key: 'textAlign',
                                value: 'left',
                                type: 'switch',
                                options: [
                                    { label: '居左', value: 'left', icon: 'drag-juzuo' },
                                    { label: '居中', value: 'center', icon: 'drag-juzhong' }
                                ],
                                disabledRule: [{
                                    pro: 'mode',
                                    contains: ['style5'],
                                    value: 'left'
                                }],
                            },
                            {
                                label: '文本样式',
                                key: 'fontWeight',
                                pro: 'itemLayer',
                                value: 'bold',
                                type: 'switch',
                                options: [
                                    { label: '常规', value: 'normal', icon: 'drag-changgui' },
                                    { label: '加粗', value: 'bold', icon: 'drag-jiacu' }
                                ]
                            }
                        ],
                        attribute: [
                            {
                                label: '商品设置',
                                type: 'divider'
                            },
                            {
                                label: '商品圆角',
                                key: 'borderRadius',
                                pro: 'itemLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 48,
                                value: 16
                            },
                            {
                                label: '图片比例',
                                pro: 'scale',
                                value: 'scale1',
                                type: 'switch',
                                options: [
                                    { label: '1:1', value: 'scale1', icon: 'drag-yibiyi' },
                                    {
                                        label: '16:9', value: 'scale2', icon: 'drag-shiliubijiu', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style5'],
                                            value: 'scale1'
                                        }]
                                    },
                                    {
                                        label: '3:4', value: 'scale3', icon: 'drag-sanbisi', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style5'],
                                            value: 'scale1'
                                        }]
                                    },
                                    { label: '4:3', value: 'scale4', icon: 'drag-sanbier' },
                                ]
                            },
                            {
                                label: '商品样式',
                                pro: 'goodsStyle',
                                value: 'goodStyle1',
                                type: 'switch',
                                notLabelWidth: true,
                                options: [
                                    { label: '无边白底', value: 'goodStyle1' },
                                    { label: '卡片投影', value: 'goodStyle2' },
                                    { label: '描边白底', value: 'goodStyle3' },
                                    { label: '无边透明底', value: 'goodStyle4' }
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 48,
                                value: 16
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '模块标题',
                    module_name: 'moduleTitle',
                    id: 124,
                    cmptId: "sub-home-module-title",
                    componentName: 'saasComponent',
                    icon: 'drag-mokuaibiaoti',
                    limitNum: 20,
                    shortcutOperation: true,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        attribute: [
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '标题',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)',
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '跳转链接',
                                pro: 'titleLayer',
                                key: 'more',
                                type: 'links',
                                value: [
                                    {
                                        name: ''
                                    }
                                ]
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件边距',
                                key: 'padding',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '标题配图',
                                type: 'upload-bg-img',
                                pro: 'titleLayer',
                                key: 'titleImage',
                                summary: '建议尺寸1:1'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '文本内容',
                    module_name: 'titleEditor',
                    id: 124,
                    cmptId: "sub-home-rick",
                    componentName: 'saasComponent',
                    icon: 'drag-biaotiwenben',
                    limitNum: 20,
                    shortcutOperation: true,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        attribute: [
                            {
                                label: '设置跳转链接',
                                type: 'links',
                                pro: 'jump',
                                value: [
                                    {
                                        name: ''
                                    }
                                ],
                            },
                            {
                                label: '全屏展示',
                                key: 'margin',
                                type: 'switch',
                                pro: 'outerLayer',
                                unit: 'rpx',
                                multip: 24,
                                value: 1,
                                options: [
                                    { label: '否', value: 1 },
                                    { label: '是', value: 0 },
                                ]
                            },
                            {
                                label: '内容边距',
                                key: 'padding',
                                type: 'switch',
                                pro: 'innerLayer',
                                unit: 'rpx',
                                multip: 24,
                                value: 1,
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)'
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 16
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 48,
                                value: 16
                            },
                            {
                                type: 'rich-text',
                                key: 'data',
                                value: [{
                                    desc: ''
                                }]
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ],
                    }
                },
                {
                    name: '图文导航',
                    module_name: 'nav',
                    id: 2,
                    cmptId: 'sub-home-matrix-menu',
                    componentName: 'saasComponent',
                    icon: 'drag-tuwendaohang',
                    limitNum: 50,
                    shortcutOperation: true,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        attribute: [
                            {
                                label: '展示样式',
                                pro: 'mode',
                                type: 'switch',
                                value: 'style1',
                                options: [
                                    {
                                        label: '固定',
                                        value: 'style1',
                                    },
                                    {
                                        label: '横向滑动',
                                        value: 'style2',
                                    },
                                ]
                            },
                            {
                                label: '显示行数',
                                pro: 'rowNum',
                                type: 'switch',
                                value: 2,
                                options: [
                                    {
                                        label: '一行',
                                        value: 1,
                                    },
                                    {
                                        label: '两行',
                                        value: 2,
                                    },
                                ]

                            },
                            {
                                label: '一行个数',
                                pro: 'colNum',
                                type: 'slider',
                                type: 'switch',
                                value: 5,
                                options: [
                                    {
                                        label: '4',
                                        value: 4,
                                    },
                                    {
                                        label: '5',
                                        value: 5,
                                    },
                                ]
                            },
                            {
                                label: '图片圆角',
                                key: 'imgRadius',
                                pro: 'innerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },

                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '字体颜色',
                                key: 'color',
                                pro: 'innerLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)'
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255,255,255,1)'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ],
                        source: [
                            {
                                summary: '最多添加 20 个导航，拖动选中的导航可对其排序',
                                key: 'data',
                                type: 'upload',
                                max: 20,
                                min: 4,
                                pushBtnText: '添加导航',
                                value: [{
                                    img_url: '',
                                    title: '导航1'
                                }, {
                                    img_url: '',
                                    title: '导航2'
                                }, {
                                    img_url: '',
                                    title: '导航3'
                                }, {
                                    img_url: '',
                                    title: '导航4'
                                }, {
                                    img_url: '',
                                    title: '导航5'
                                }],
                                valueConfig: {
                                    title: '图片',
                                    hsaTitle: true,
                                    maxlength: 5
                                }
                            }
                        ]
                    }
                },
                {
                    name: '视频',
                    module_name: 'video',
                    id: 101,
                    cmptId: 'sub-home-video',
                    componentName: 'saasComponent',
                    icon: 'drag-shipin',
                    limitNum: 50,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        attribute: [
                            // 支持上传16:9/9:16/3:4尺寸视频，
                            {
                                type: 'alert',
                                text: '视频大小不超过100MB，支持的视频文件类型包括：mp4、webm 和 ogg。',
                                notLabelWidth: 1
                            },
                            {
                                label: '展示样式',
                                pro: 'mode',
                                type: 'switch',
                                value: 'style8',
                                options: [
                                    {
                                        label: '单列视频',
                                        value: 'style8',
                                        icon: 'drag-danlieshipin'
                                    },
                                    {
                                        label: '双列视频',
                                        value: 'style1',
                                        icon: 'drag-shuanglieshipin'
                                    },
                                ]

                            },
                            {
                                label: '视频高度',
                                key: 'height',
                                type: 'slider',
                                pro: 'innerLayer',
                                unit: 'rpx',
                                min: 200,
                                max: 1334,
                                value: 420
                            },
                            {
                                label: '视频间距',
                                key: 'marginRight',
                                pro: 'innerLayer',
                                type: 'switch',
                                unit: 'rpx',
                                max: 32,
                                multip: 24,
                                value: 0
                            },
                            {
                                label: '视频圆角',
                                pro: 'innerLayer',
                                key: 'imageRadius',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 0
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 0
                            },
                            {
                                label: '组件边距',
                                key: 'padding',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255,255,255,1)'
                            },
                            {
                                title: '视频布局',
                                summary: '选定布局区域，在下方添加视频，建议添加比例一致的视频',
                                key: 'data',
                                type: 'video',
                                pushBtnText: '添加视频',
                                value: [{ data: '' }],
                                valueConfig: { title: '添加视频', max: 100 * 1024 * 1024 }
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },

                },
                {
                    name: '图片魔方',
                    module_name: 'magic_cube',
                    id: 104,
                    cmptId: "sub-home-magic-square",
                    componentName: 'saasComponent',
                    icon: 'drag-tupianmofang',
                    rightComponents: 'right-common-set',
                    limitNum: 20,
                    rightConfig: {
                        source: [
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style8',
                                type: 'switch',
                                options: [
                                    { label: '一行一个', value: 'style8', icon: 'drag-yihangyige' },
                                    { label: '一行两个', value: 'style1', icon: 'drag-yihangerge' },
                                    { label: '一行三个', value: 'style2', icon: 'drag-yihangsange' },
                                    { label: '一行四个', value: 'style3', icon: 'drag-yihangsige' },
                                    { label: '两行两个', value: 'style4', icon: 'drag-erzuoeryou' },
                                    { label: '一左两右', value: 'style5', icon: 'drag-yizuoeryou' },
                                    { label: '一上两下', value: 'style6', icon: 'drag-yishangerxia' },
                                    { label: '一左三右', value: 'style7', icon: 'drag-yizuosanyou' }
                                ]
                            },
                            {
                                label: '图片圆角',
                                key: 'borderRadius',
                                pro: 'innerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 0
                            },
                            {
                                label: '图片间隙',
                                key: 'margin',
                                pro: 'innerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                max: 32,
                                value: 0
                            },
                            {
                                label: '组件高度',
                                key: 'height',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                max: 1334,
                                min: 40,
                                value: 375
                            },
                            // {
                            //     label: '组件背景',
                            //     key: 'bgColor',
                            //     pro: 'outerLayer',
                            //     type: 'color',
                            //     value: 'rgba(255, 255, 255, 1)',
                            // },
                            {
                                label: '组件边距',
                                key: 'padding',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255,255,255,0)'
                            },
                            {
                                title: '魔方布局',
                                summary: '选择布局区域，在下方添加图片，建议添加比例一致的图片',
                                key: 'data',
                                type: 'magic-square',
                                value: [{
                                    img_url: ''
                                }]
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '倒计时',
                    module_name: 'countDown',
                    id: 105,
                    cmptId: "sub-home-count-down",
                    componentName: 'saasComponent',
                    icon: 'drag-daojishi',
                    limitNum: 20,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    rightConfig: {
                        attribute: [
                            {
                                label: '文案颜色',
                                key: 'color',
                                type: 'color',
                                pro: 'innerLayer',
                                value: 'rgba(51, 51, 51, 1)'
                            },
                            {
                                label: '辅助文案颜色',
                                key: 'subColor',
                                type: 'color',
                                pro: 'innerLayer',
                                value: 'rgba(51, 51, 51, 1)'
                            },
                            {
                                label: '居中展示',
                                key: 'justifyContent',
                                type: 'switch',
                                pro: 'innerLayer',
                                value: 'flex-start',
                                options: [
                                    {
                                        label: '居左',
                                        value: 'flex-start',
                                    },
                                    {
                                        label: '居中',
                                        value: 'center',
                                    },
                                    {
                                        label: '居右',
                                        value: 'flex-end',
                                    }
                                ]
                            },
                            {
                                label: '内容边距',
                                key: 'padding',
                                type: 'switch',
                                pro: 'innerLayer',
                                unit: 'rpx',
                                multip: 24,
                                value: 1
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 48,
                                value: 16
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ],
                        source: [
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    {
                                        label: '风格1',
                                        value: 'style1',
                                    },
                                    {
                                        label: '风格2',
                                        value: 'style2',
                                    }
                                ]
                            },
                            {
                                label: '时间设置',
                                key: 'data',
                                type: 'date-time-range',
                                data: [
                                    {
                                        start_time: '',
                                        end_time: ''
                                    }
                                ],
                            },
                            {
                                pro: 'titleLayer',
                                label: '进行中辅助文案',
                                key: 'doText',
                                type: 'text',
                                maxlength: 8,
                                value: '距活动结束'
                            },
                            {
                                pro: 'titleLayer',
                                label: '结束辅助文案',
                                key: 'endText',
                                type: 'text',
                                maxlength: 8,
                                value: '活动已结束'
                            },
                            {
                                pro: 'titleLayer',
                                label: '未开始辅助文案',
                                key: 'startText',
                                type: 'text',
                                maxlength: 8,
                                value: '距活动开始'
                            }
                        ]
                    }

                },
                {
                    name: '分割线',
                    title: '分割线',
                    module_name: 'line',
                    id: 13,
                    cmptId: 'sub-home-separation',
                    componentName: 'saasComponent',
                    icon: 'drag-fengexian',
                    limitNum: 100,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        attribute: [
                            {
                                label: '空白分割',
                                type: 'switch',
                                pro: 'mode',
                                value: 'blank',
                                options: [
                                    {
                                        label: '空白分割',
                                        value: 'blank',
                                        icon: 'drag-kongbaifenge'
                                    },
                                    {
                                        label: '分割线分割',
                                        value: 'split',
                                        icon: 'drag-fengexianfenge'
                                    },
                                ]
                            },
                            {
                                label: '选择样式',
                                type: 'switch',
                                pro: 'genre',
                                value: 'solid',
                                show: {
                                    pro: 'mode',
                                    contains: ['split']
                                },
                                options: [
                                    {
                                        label: '实线',
                                        value: 'solid',
                                    },
                                    {
                                        label: '虚线',
                                        value: 'dashed',
                                    },
                                    {
                                        label: '点线',
                                        value: 'dotted',
                                    },
                                ]
                            },
                            {
                                label: '左右边距',
                                key: 'padding',
                                type: 'switch',
                                pro: 'outerLayer',
                                unit: 'rpx',
                                multip: 24,
                                value: 1,
                                show: {
                                    pro: 'mode',
                                    contains: ['split']
                                },
                                options: [
                                    {
                                        label: '无边距',
                                        value: 0,
                                    },
                                    {
                                        label: '有边距',
                                        value: 1,
                                    }
                                ]
                            },
                            {
                                label: '高度',
                                key: 'height',
                                type: 'slider',
                                pro: 'outerLayer',
                                unit: 'rpx',
                                max: 100,
                                step: 2,
                                value: 24
                            },
                            {
                                label: '分割背景',
                                key: 'bgColor',
                                pro: 'innerLayer',
                                type: 'color',
                                show: {
                                    pro: 'mode',
                                    contains: ['split']
                                },
                                value: 'rgba(27, 122, 255, 1)'
                            },
                            {
                                label: '背景颜色',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(245, 245, 245, 0)'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '推荐商品',
                    module_name: 'recommend_goods',
                    id: 14,
                    cmptId: 'c-recommend-goods',
                    componentName: 'saasComponent',
                    icon: 'drag-tuijianshangpin2',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    title: '推荐商品',
                    api: 'shop/recommendCate',
                    shortcutOperation: true,
                    rightConfig: {
                        attribute: [
                            {
                                label: '还没有推荐商品',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                label: '选择风格',
                                key: 'cmptId',
                                value: 'c-recommend-goods',
                                type: 'switch',
                                options: [
                                    {
                                        label: '风格1',
                                        value: 'c-recommend-goods',
                                    },
                                    {
                                        label: '风格2',
                                        value: 'sub-home-recommend-cate-goods',
                                    }
                                ]
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '推荐商品',
                                maxlength: 8,
                                show: {
                                    key: 'cmptId',
                                    contains: ['c-recommend-goods']
                                }
                            },
                            {
                                label: '组件背景',
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '公告/快报',
                    module_name: 'stores_news',
                    id: 17,
                    cmptId: 'sub-home-market-news',
                    componentName: 'saasComponent',
                    icon: 'drag-kuaibao',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    api: 'Article/topArticle',
                    title: '公告',
                    apiParam: {
                        limit: 4,
                    },
                    rightConfig: {
                        attribute: [
                            {
                                label: '还没有公告/快报内容',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '公告',
                                maxlength: 4,
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '内容背景',
                                pro: 'itemLayer',
                                key: 'backgroundColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)'
                            },
                            {
                                label: '内容边距',
                                key: 'padding',
                                type: 'switch',
                                pro: 'outerLayer',
                                unit: 'rpx',
                                multip: 24,
                                value: 1
                            },
                            {
                                label: '组件背景',
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '滚动显示数量',
                                key: 'limit',
                                type: 'number',
                                value: 4,
                                pro: 'apiParam',
                                min: 1,
                                max: 10,
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '客服',
                    module_name: 'slide_menu',
                    fixed: 'float',
                    id: 2000002,
                    cmptId: 'sub-home-slide-menu',
                    componentName: 'saasComponent',
                    icon: 'drag-kefu',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    // rightConfig: {
                    //     source: [
                    //         {
                    //             label: '还没有客服',
                    //             type: 'setting',
                    //             settingText: '去配置 >',
                    //         }
                    //     ]
                    // }
                },
                {
                    name: '店铺信息',
                    module_name: 'info',
                    id: 15,
                    cmptId: 'sub-home-shop-info',
                    componentName: 'saasComponent',
                    icon: 'drag-dianpuxinxi',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    api: 'Shop/info',
                    title: '店铺信息',
                    rightConfig: {
                        attribute: [
                            {
                                label: '还没有店铺信息',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '风格1', value: 'style1' },
                                    { label: '风格2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)'
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '自定义表单',
                    module_name: 'form',
                    componentName: 'saasComponent',
                    cmptId: 'sub-home-define-form',
                    icon: 'drag-biaodan',
                    title: '自定义表单',
                    id: 2000095,
                    shortcutOperation: true,
                    rightComponents: 'right-common-set',
                    limitNum: 1,
                    rightConfig: {
                        attribute: [
                            {
                                label: '表单设置',
                                type: 'divider'
                            },
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '风格1', value: 'style1' },
                                    { label: '风格2', value: 'style2' },
                                    // { label: '风格3', value: 'style3' },
                                ]
                            },
                            {
                                label: '表单宽度',
                                key: 'width',
                                type: 'slider',
                                pro: 'innerLayer',
                                unit: '%',
                                max: 100,
                                min: 60,
                                value: 100
                            },
                            // {
                            //     label: '圆角',
                            //     key: 'borderRadius',
                            //     pro: 'innerLayer',
                            //     type: 'slider',
                            //     unit: 'rpx',
                            //     step: 4,
                            //     max: 32,
                            //     value: 16
                            // },
                            {
                                label: '标题宽度',
                                key: 'width',
                                pro: 'itemLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 2,
                                max: 200,
                                min: 100,
                                value: 175
                            },
                            // {
                            //     label: '背景',
                            //     key: 'backgroundColor',
                            //     pro: 'innerLayer',
                            //     type: 'color',
                            //     value: 'rgba(255,255,255,1)'
                            // },
                            {
                                label: '标题颜色',
                                pro: 'itemLayer',
                                key: 'color',
                                type: 'color',
                                value: 'rgba(0, 0, 0, 1)'
                            },
                            {
                                label: '填充颜色',
                                pro: 'itemLayer',
                                key: 'backgroundColor',
                                type: 'color',
                                value: 'rgba(246, 245, 248, 1)'
                                // value: 'rgba(255, 255, 255, 1)'
                            },
                            {
                                label: '线框颜色',
                                pro: 'itemLayer',
                                key: 'borderColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)'
                            },
                            // {
                            //     label: '选择框设置',
                            //     type: 'divider'
                            // },
                            // {
                            //     label: '选择框风格',
                            //     pro: 'itemLayer',
                            //     key: 'mode',
                            //     type: 'switch',
                            //     value: 'style1',
                            //     options: [
                            //         { label: '风格1', value: 'style1' },
                            //         { label: '风格2', value: 'style2' },
                            //         { label: '风格3', value: 'style3' },
                            //         { label: '风格4', value: 'style4' },
                            //     ],
                            // },
                            // {
                            //     label: '选中颜色 / 提交按钮',
                            //     pro: 'itemLayer',
                            //     key: 'selColor',
                            //     type: 'color',
                            //     value: 'rgba(27, 122, 255, 1)',
                            // },
                            // {
                            //     label: '选中边框',
                            //     pro: 'itemLayer',
                            //     key: 'showBorder',
                            //     type: 'switch',
                            //     value: 1,
                            //     options: [{
                            //         label: '隐藏',
                            //         value: 0
                            //     }, {
                            //         label: '显示',
                            //         value: 1
                            //     }],
                            //     show: {
                            //         pro: 'itemLayer',
                            //         key: "mode",
                            //         contains: ['style3', 'style4']
                            //     }
                            // },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '组件背景',
                                type: 'switch',
                                pro: 'outerLayer',
                                key: 'isBGC',
                                value: 1,
                                options: [
                                    {
                                        label: '背景图片',
                                        value: 0
                                    },
                                    {
                                        label: '颜色背景',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                // key: 'data',
                                type: 'upload-bg-img',
                                pro: 'outerLayer',
                                key: 'backgroundImage',
                                notLabelWidth: true,
                                // value: [{
                                //     img_url: ''
                                // }],
                                value: '',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [0]
                                }
                            },
                            {
                                notLabelWidth: true,
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [1]
                                }
                            },
                            {
                                label: '提交按钮',
                                type: 'divider'
                            },
                            {
                                label: '选中颜色 / 提交按钮',
                                pro: 'itemLayer',
                                key: 'selColor',
                                type: 'color',
                                value: 'rgba(27, 122, 255, 1)',

                            },
                            {
                                label: '按钮圆角',
                                key: 'buttonBorderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 2,
                                max: 88,
                                value: 16
                            },
                            {
                                label: '按钮宽度',
                                key: 'buttonWidth',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: '%',
                                step: 5,
                                max: 100,
                                value: 100
                            },
                            // {
                            //     label: '按钮间距',
                            //     key: 'buttonGap',
                            //     pro: 'outerLayer',
                            //     type: 'slider',
                            //     unit: 'rpx',
                            //     step: 1,
                            //     max: 80,
                            //     min: 0,
                            //     value: 32
                            // },
                            {
                                pro: 'outerLayer',
                                label: '按钮文本',
                                key: 'buttonText',
                                type: 'text',
                                maxlength: 8,
                                value: '保存'
                            },
                        ],
                        source: [
                            {
                                notLabelWidth: true,
                                type: 'form',
                                text: '添加表单',
                                pro: 'formList',
                                min: 1,
                                max: 20,
                                dialogFlag: 'fromDialogFlag',
                                value: [
                                    {
                                        border: true,
                                        comName: "c-input",
                                        createTime: Date.now(),
                                        default: true,
                                        typeName: "文本框",
                                        compoentDefine: {
                                            value: "",
                                            type: "text",
                                            placeholder: "请输入文本",
                                            beforeText: "表单标题1",
                                            pattern: "notnull"
                                        },
                                    },
                                    {
                                        border: true,
                                        comName: "c-input",
                                        createTime: Date.now(),
                                        default: true,
                                        typeName: "文本框",
                                        compoentDefine: {
                                            value: "",
                                            type: "text",
                                            placeholder: "请输入文本",
                                            beforeText: "表单标题2",
                                            pattern: "notnull"
                                        },
                                    },
                                ]
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '分类/关键词',
                    module_name: 'category',
                    id: 16,
                    cmptId: 'sub-home-category',
                    componentName: 'saasComponent',
                    icon: 'drag-fenlei_guanjianci',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        source: [
                            {
                                label: '选择类型',
                                type: 'switch',
                                //pro: 'mode',
                                key: 'api',
                                value: 'GoodsCategory/getTopCategoryByIds',
                                options: [
                                    {
                                        label: '选择分类',
                                        value: 'GoodsCategory/getTopCategoryByIds'
                                    },
                                    {
                                        label: '自定义关键词',
                                        value: ''
                                    },
                                ]
                            },
                            {
                                summary: '最少选择1个分类，最多选择10个分类，拖动可对其排序',
                                type: 'category',
                                notLabelWidth: 1,
                                text: '选择分类',
                                selectText: '选择分类',
                                //pro: 'category',
                                pro: 'apiParam',
                                key: 'ids',
                                dialogFlag: 'categoryDialogFlag',
                                value: [],
                                show: {
                                    key: 'api',
                                    contains: ['GoodsCategory/getTopCategoryByIds']
                                },
                            },
                            {
                                summary: '最少添加1个关键词，最多添加10个关键词，拖动可对其排序',
                                type: 'keyword',
                                notLabelWidth: 1,
                                pro: 'keyword',
                                min: 1,
                                max: 10,
                                pushBtnText: '添加关键词',
                                value: [
                                    {
                                        title: '关键词1',
                                        name: ''
                                    },
                                    {
                                        title: '关键词2',
                                        name: ''
                                    },
                                    {
                                        title: '关键词3',
                                        name: ''
                                    },
                                    {
                                        title: '关键词4',
                                        name: ''
                                    },
                                    {
                                        title: '关键词5',
                                        name: ''
                                    }
                                ],
                                valueConfig: {
                                    title: '关键词',
                                    hsaTitle: true
                                },
                                show: {
                                    key: 'api',
                                    contains: ['']
                                },
                            },
                        ],
                        attribute: [
                            {
                                label: '内容样式',
                                type: 'divider'
                            },
                            {
                                label: '文本颜色',
                                key: 'color',
                                pro: 'innerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)'
                            },
                            {
                                label: '框体圆角',
                                key: 'borderRadius',
                                pro: 'innerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 28,
                                value: 28
                            },
                            {
                                label: '框体背景',
                                key: 'backgroundColor',
                                pro: 'innerLayer',
                                type: 'color',
                                value: 'rgba(255, 69, 0, 0.68)'
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 44,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)',
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '分享',
                    module_name: 'share',
                    fixed: 'float',
                    id: 2000007,
                    cmptId: 'sub-home-share',
                    componentName: 'saasComponent',
                    icon: 'drag-fenxiang',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    rightConfig: {
                        source: [
                            {
                                type: 'alert',
                                text: '注：分享的宣传语及海报同左边按钮的「页面设置」中的分享设置',
                                notLabelWidth: 1
                            },
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    {
                                        label: '风格1',
                                        value: 'style1',
                                    },
                                    {
                                        label: '风格2',
                                        value: 'style2',
                                    },
                                    {
                                        label: '风格3',
                                        value: 'style3',
                                    },
                                    {
                                        label: '风格4',
                                        value: 'style4',
                                    },
                                    {
                                        label: '风格5',
                                        value: 'style5',
                                    },
                                    {
                                        label: '风格6',
                                        value: 'style6',
                                    }
                                ]
                            },
                        ]
                    }
                },
            ],
            // 内容组件
            contentList: [
                {
                    name: '申请表单',
                    module_name: 'formLayout',
                    api: "ZzskLoanOrder/scrollApply",
                    apiParam: {},
                    componentName: 'saasComponent',
                    cmptId: 'sub-home-define-form-layout',
                    icon: 'drag-shenqingbiaodan',
                    id: 2000096,
                    shortcutOperation: true,
                    rightComponents: 'right-common-set',
                    limitNum: 1,
                    rightConfig: {
                        attribute: [
                            {
                                notLabelWidth: true,
                                type: 'form',
                                text: '添加表单',
                                pro: 'formList',
                                min: 1,
                                max: 20,
                                dialogFlag: 'fromDialogFlag',
                                show: false,
                                value: [
                                    {
                                        border: true,
                                        comName: "c-input",
                                        createTime: Date.now(),
                                        default: true,
                                        typeName: "文本框",
                                        compoentDefine: {
                                            value: "",
                                            type: "text",
                                            placeholder: "请填写姓名",
                                            beforeText: "姓名",
                                            pattern: "notnull",
                                            prop: 'apply_name'
                                        },
                                    },
                                    {
                                        border: true,
                                        comName: "c-input",
                                        createTime: Date.now(),
                                        default: true,
                                        typeName: "文本框",
                                        compoentDefine: {
                                            value: "",
                                            type: "text",
                                            placeholder: "请填写手机号",
                                            beforeText: "手机号",
                                            pattern: "notnull",
                                            prop: 'apply_mobile'
                                        },
                                    },
                                    {
                                        border: true,
                                        comName: "c-select-city",
                                        default: false,
                                        typeName: "地区选择框",
                                        compoentDefine: {
                                            beforeText: "所在城市",
                                            defaultList: [],
                                            label: "",
                                            live: "1",
                                            placeholder: "请填写所在城市",
                                            popup: true,
                                            pattern: "notnull",
                                            type: "citySelect",
                                            value: {},
                                            default: false,
                                            typeName: "地区选择框",
                                            prop: 'city'
                                        }
                                    },
                                ]
                            },
                            {
                                label: '表单设置',
                                type: 'divider'
                            },
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '风格1', value: 'style1' },
                                    { label: '风格2', value: 'style2' },
                                ]
                            },
                            {
                                label: '表单宽度',
                                key: 'width',
                                type: 'slider',
                                pro: 'innerLayer',
                                unit: '%',
                                max: 100,
                                min: 60,
                                value: 100
                            },
                            {
                                label: '标题宽度',
                                key: 'width',
                                pro: 'itemLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 2,
                                max: 200,
                                min: 100,
                                value: 175
                            },
                            {
                                label: '标题颜色',
                                pro: 'itemLayer',
                                key: 'color',
                                type: 'color',
                                value: 'rgba(0, 0, 0, 1)'
                            },
                            {
                                label: '线框颜色',
                                pro: 'itemLayer',
                                key: 'borderColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)'
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 32
                            },
                            {
                                label: '组件背景',
                                type: 'switch',
                                pro: 'outerLayer',
                                key: 'isBGC',
                                value: 1,
                                options: [
                                    {
                                        label: '背景图片',
                                        value: 0
                                    },
                                    {
                                        label: '颜色背景',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                type: 'upload-bg-img',
                                pro: 'outerLayer',
                                key: 'backgroundImage',
                                notLabelWidth: true,
                                value: '',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [0]
                                }
                            },
                            {
                                notLabelWidth: true,
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [1]
                                }
                            },
                            {
                                label: '提交按钮',
                                type: 'divider'
                            },
                            {
                                label: '选中颜色 / 提交按钮',
                                pro: 'itemLayer',
                                key: 'selColor',
                                type: 'color',
                                value: 'rgba(27, 122, 255, 1)',
                                show: false
                            },
                            // {
                            //     label: '按钮圆角',
                            //     key: 'buttonBorderRadius',
                            //     pro: 'outerLayer',
                            //     type: 'slider',
                            //     unit: 'rpx',
                            //     step: 2,
                            //     max: 88,
                            //     value: 16
                            // },
                            {
                                label: '按钮宽度',
                                key: 'buttonWidth',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: '%',
                                step: 5,
                                max: 100,
                                value: 100
                            },
                            {
                                pro: 'outerLayer',
                                label: '按钮文本',
                                key: 'buttonText',
                                type: 'text',
                                maxlength: 8,
                                value: '快速申请'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ],
                    }
                },
                {
                    name: '爆品',
                    module_name: 'hot_goods_goods',
                    id: 2000009,
                    api: 'Goods/hotGoods',
                    apiParam: { limit: 6 },
                    cmptId: 'sub-home-hot-sale-goods',
                    componentName: 'saasComponent',
                    icon: 'drag-baopin',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    rightConfig: {
                        source: [
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '爆品',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 1,
                                type: 'switch',
                                disabledRule: [{
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [0],
                                    value: 1
                                }],
                            },
                            {
                                label: '标题配图',
                                type: 'upload-bg-img',
                                pro: 'titleLayer',
                                key: 'titleImage',
                                summary: '建议尺寸1:1'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 0
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                type: 'switch',
                                pro: 'outerLayer',
                                key: 'isBGC',
                                value: 1,
                                options: [
                                    {
                                        label: '背景图片',
                                        value: 0
                                    },
                                    {
                                        label: '颜色背景',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                type: 'upload-bg-img',
                                pro: 'outerLayer',
                                key: 'backgroundImage',
                                notLabelWidth: true,
                                value: '',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [0]
                                }
                            },
                            {
                                notLabelWidth: true,
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [1]
                                }
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ],

                    }
                },
                {
                    id: 25,
                    name: '定制服务',
                    module_name: 'custom_service',
                    api: 'Goods/getGoodsModuleList',
                    apiParam: { limit: 6 },
                    cmptId: "sub-home-custom-service",
                    componentName: 'saasComponent',
                    icon: 'drag-dingzhi',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    rightConfig: {
                        source: [
                            {
                                label: '接口查询的id类型',
                                pro: 'apiParam',
                                key: 'idType',
                                value: 'goodsId',
                                show: false
                            },
                            {
                                type: 'goods',
                                text: '选择商品',
                                selectText: '添加商品',
                                pro: 'apiParam',
                                key: 'ids',
                                dialogFlag: 'goodsDialogFlag',
                                min: 1,
                                max: 6,
                                value: '',
                                show: {
                                    pro: 'apiParam',
                                    key: 'idType',
                                    contains: ['goodsId']
                                }
                            },
                            {
                                label: '接口地址',
                                key: 'api',
                                value: 'Goods/getGoodsModuleList',
                                show: false
                            },
                            {
                                label: '已选分组',
                                key: 'ids',
                                pro: 'apiParam',
                                type: 'req-classify',
                                reqName: 'getGoodsCategoryListByIds',
                                dialogFlag: 'goodsDialogFlag',
                                min: 1,
                                max: 18,
                                value: '',
                                show: {
                                    pro: 'apiParam',
                                    key: 'idType',
                                    contains: ['all', 'cateId']
                                }
                            },
                        ],
                        attribute: [
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '定制服务',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 0,
                                type: 'switch',
                                show: false
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 1,
                                type: 'switch',
                                disabledRule: [{
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [0],
                                    value: 1
                                }],
                            },
                            {
                                label: '标题配图',
                                type: 'upload-bg-img',
                                pro: 'titleLayer',
                                key: 'titleImage',
                                summary: '建议尺寸1:1'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 0
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                type: 'switch',
                                pro: 'outerLayer',
                                key: 'isBGC',
                                value: 1,
                                options: [
                                    {
                                        label: '背景图片',
                                        value: 0
                                    },
                                    {
                                        label: '颜色背景',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                type: 'upload-bg-img',
                                pro: 'outerLayer',
                                key: 'backgroundImage',
                                notLabelWidth: true,
                                value: '',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [0]
                                }
                            },
                            {
                                notLabelWidth: true,
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [1]
                                }
                            },
                            {
                                label: '内容边距',
                                key: 'margin',
                                pro: 'innerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '内容圆角',
                                key: 'compRadius',
                                pro: 'innerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 8
                            },
                            {
                                label: '内容背景',
                                notLabelWidth: true,
                                pro: 'innerLayer',
                                key: 'compBgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',

                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ],
                    },
                },
                {
                    name: '装修服务',
                    module_name: 'special_service',
                    id: 4,
                    cmptId: "sub-home-special-service",
                    componentName: 'saasComponent',
                    icon: 'drag-zhuangxiufuwu',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    api: 'Shop/specialService',
                    rightConfig: {
                        attribute: [
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '特色服务',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '一站式省钱更省心',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '案例',
                    module_name: 'cases',
                    id: 5,
                    cmptId: "sub-home-decoration-cases",
                    componentName: 'saasComponent',
                    icon: 'drag-anli',
                    limitNum: 10,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    api: "PatternCase/getListByIds",
                    apiParam: {},
                    rightConfig: {
                        source: [
                            {
                                label: '还没有案例',
                                type: 'dialog',
                                settingText: '去选择 >',
                                pro: 'apiParam',
                                key: 'ids',
                                min: 1,
                                max: 20,
                                dialogFlag: 'caseDialogFlag',
                                value: ''
                            },
                            {
                                label: '请求接口',
                                key: 'api',
                                value: 'PatternCase/getListByIds',
                                show: false
                            },
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '风格1', value: 'style1' },
                                    { label: '风格2', value: 'style2' },
                                    { label: '风格3', value: 'style3' },
                                ]
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '案例',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '一站式省钱更省心',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '标题颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                // disabledRule: [{
                                //     pro: 'mode',
                                //     contains: ['style2', 'style3'],
                                //     value: 0
                                // }],
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                                // options: [
                                //     {
                                //         label: '样式1', value: 'style1',
                                //         disabledRule: [{
                                //             pro: 'mode',
                                //             contains: ['style2', 'style3']
                                //         }]
                                //     },
                                //     {
                                //         label: '样式2', value: 'style2',
                                //         disabledRule: [{
                                //             pro: 'mode',
                                //             contains: ['style3']
                                //         }]
                                //     },
                                // ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            // {
                            //     label: '显示个数',
                            //     key: 'limit',
                            //     pro: 'apiParam',
                            //     type: 'number',
                            //     value: 5,
                            //     min: 1,
                            //     max: 10,
                            // },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '设计师',
                    module_name: 'designer',
                    id: 6,
                    cmptId: "sub-home-designer",
                    componentName: 'saasComponent',
                    icon: 'drag-shejishi',
                    limitNum: 10,
                    rightComponents: 'right-common-set',
                    shortcutOperation: true,
                    api: "JobUser/getListByIds",
                    shortcutOperation: true,
                    // limit: 5,
                    apiParam: {
                    },
                    rightConfig: {
                        source: [
                            // {
                            //     label: '还没有设计师',
                            //     type: 'setting',
                            //     settingText: '去配置 >',
                            // },
                            {
                                label: '还没有设计师',
                                type: 'dialog',
                                settingText: '去选择 >',
                                pro: 'apiParam',
                                key: 'ids',
                                min: 1,
                                max: 20,
                                dialogFlag: 'designDialogFlag',
                                value: ''
                            },
                            {
                                label: '请求接口',
                                key: 'api',
                                value: 'JobUser/getListByIds',
                                show: false
                            },
                            {
                                label: '展示风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '风格1', value: 'style1' },
                                    { label: '风格2', value: 'style2' },
                                    { label: '风格3', value: 'style3' }
                                ]
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '设计师',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            // {
                            //     label: '显示个数',
                            //     key: 'limit',
                            //     pro: 'apiParam',
                            //     type: 'number',
                            //     value: 5,
                            //     min: 1,
                            //     max: 10,
                            // },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '施工团队',
                    module_name: 'work',
                    id: 7,
                    cmptId: 'sub-home-construction-team',
                    componentName: 'saasComponent',
                    icon: 'drag-shigongtuandui',
                    limitNum: 10,
                    rightComponents: 'right-common-set',
                    api: 'ShopForeman/ajaxList',
                    shortcutOperation: true,
                    apiParam: {},
                    rightConfig: {
                        source: [
                            // {
                            //     label: '还没有施工团队',
                            //     type: 'setting',
                            //     settingText: '去配置 >',
                            // },
                            {
                                label: '还没有施工团队',
                                type: 'dialog',
                                settingText: '去选择 >',
                                pro: 'apiParam',
                                key: 'ids',
                                min: 1,
                                max: 20,
                                dialogFlag: 'teamDialogFlag',
                                value: ''
                            },
                            {
                                label: '请求接口',
                                key: 'api',
                                value: 'ShopForeman/ajaxList',
                                show: false
                            },
                            {
                                label: '展示风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '风格1', value: 'style1' },
                                    { label: '风格2', value: 'style2' },
                                ]
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '施工团队',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            // {
                            //     label: '显示个数',
                            //     key: 'limit',
                            //     pro: 'apiParam',
                            //     type: 'number',
                            //     value: 5,
                            //     min: 1,
                            //     max: 10,
                            // },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '施工工艺',
                    module_name: 'decoration',
                    id: 8,
                    cmptId: 'sub-home-construction-technology',
                    componentName: 'saasComponent',
                    icon: 'drag-shigonggongyi',
                    limitNum: 10,
                    rightComponents: 'right-common-set',
                    api: 'Article/recommendArticle',
                    shortcutOperation: true,
                    apiParam: {},
                    rightConfig: {
                        source: [
                            // {
                            //     label: '还没有施工工艺',
                            //     type: 'setting',
                            //     settingText: '去配置 >',
                            // },
                            {
                                label: '还没有施工工艺',
                                type: 'dialog',
                                settingText: '去选择 >',
                                pro: 'apiParam',
                                key: 'ids',
                                min: 1,
                                max: 20,
                                dialogFlag: 'craftDialogFlag',
                                value: ''
                            },
                            {
                                label: '请求接口',
                                key: 'api',
                                value: 'Article/recommendArticle',
                                show: false
                            },
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    {
                                        label: '风格1',
                                        value: 'style1',
                                        summary: '横向滑动',
                                        icon: 'drag-xiangxiliebiao'
                                    },
                                    {
                                        label: '风格2',
                                        value: 'style2',
                                        summary: '详细列表',
                                        icon: 'drag-hengxianghuadong'
                                    },
                                    {
                                        label: '风格3',
                                        value: 'style3',
                                        summary: '大图',
                                        icon: 'drag-hengxianghuadong'
                                    }
                                ]
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '施工工艺',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            // {
                            //     label: '显示个数',
                            //     key: 'limit',
                            //     pro: 'apiParam',
                            //     type: 'number',
                            //     value: 3,
                            //     min: 1,
                            //     max: 10,
                            // },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '3D展厅',
                    module_name: '3droom',
                    id: 10,
                    cmptId: 'sub-home-room-three',
                    componentName: 'saasComponent',
                    icon: 'drag-a-3Dzhanting',
                    limitNum: 10,
                    rightComponents: 'right-common-set',
                    api: 'Shop/d3room',
                    shortcutOperation: true,
                    apiParam: {},
                    rightConfig: {
                        source: [
                            // {
                            //     label: '还没有3D展厅',
                            //     type: 'setting',
                            //     settingText: '去配置 >',
                            // },
                            {
                                label: '还没有3D展厅',
                                type: 'dialog',
                                settingText: '去选择 >',
                                pro: 'apiParam',
                                key: 'ids',
                                min: 1,
                                max: 20,
                                dialogFlag: 'd3roomDialogFlag',
                                value: ''
                            },
                            {
                                label: '请求接口',
                                key: 'api',
                                value: 'Shop/d3room',
                                show: false
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '全方位展厅',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '显示个数',
                                key: 'limit',
                                pro: 'apiParam',
                                type: 'number',
                                value: 2,
                                min: 1,
                                max: 10,
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '企业荣誉',
                    module_name: 'honner',
                    id: 18,
                    cmptId: 'sub-home-honor',
                    componentName: 'saasComponent',
                    icon: 'drag-qiyerongyu',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    api: 'CompanyInfo/getHonorList',
                    title: '企业荣誉',
                    shortcutOperation: true,
                    apiParam: {
                        limit: 3,
                    },
                    extParam: {
                        is_show_top: 1,
                    },
                    rightConfig: {
                        source: [
                            {
                                label: '还没有企业荣誉',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '企业荣誉',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '显示个数',
                                key: 'limit',
                                pro: 'apiParam',
                                type: 'number',
                                value: 2,
                                min: 1,
                                max: 10,
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '企业简介',
                    module_name: 'abstract',
                    id: 19,
                    cmptId: 'sub-home-company-profile',
                    componentName: 'saasComponent',
                    icon: 'drag-qiyejianjie',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    api: 'CompanyInfo/info',
                    shortcutOperation: true,
                    title: '企业简介',
                    rightConfig: {
                        source: [
                            {
                                label: '还没有企业简介',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '企业简介',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '企业动态',
                    module_name: 'news',
                    id: 20,
                    cmptId: 'sub-home-news',
                    componentName: 'saasComponent',
                    icon: 'drag-qiyedongtai',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    api: 'CompanyInfo/getDynamicList',
                    title: '企业动态',
                    shortcutOperation: true,
                    apiParam: {
                        limit: 2
                    },
                    extParam: {
                        is_show_top: 1
                    },
                    rightConfig: {
                        source: [
                            {
                                label: '还没有企业动态',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                label: '选择风格',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '风格1', value: 'style1' },
                                    { label: '风格2', value: 'style2' }
                                ]
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '企业动态',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '显示个数',
                                key: 'limit',
                                pro: 'apiParam',
                                type: 'number',
                                value: 2,
                                min: 1,
                                max: 10,
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
                {
                    name: '整装套餐',
                    module_name: 'decorate_package',
                    id: 21,
                    cmptId: 'sub-home-package',
                    componentName: 'saasComponent',
                    icon: 'drag-zhengzhuangtaozhuang',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    api: 'Package/getCustomPackageList',
                    shortcutOperation: true,
                    apiParam: {
                        limit: 5
                    },
                    rightConfig: {
                        source: [
                            {
                                label: '还没有整装套餐',
                                type: 'dialog',
                                settingText: '去配置 >',
                                pro: 'apiParam',
                                key: 'ids',
                                min: 1,
                                max: 20,
                                dialogFlag: 'packageDialogFlag',
                                value: ''
                            },
                            {
                                label: '请求接口',
                                key: 'api',
                                value: 'Package/getCustomPackageList',
                                show: false
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '整装套餐',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '文字颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            // 暂时取消，因为前端没弄？？
                            /* {
                                label: '显示个数',
                                key: 'limit',
                                pro: 'apiParam',
                                type: 'number',
                                value: 3,
                                min: 1,
                                max: 10,
                            }, */
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    },
                },
            ],
            // 营销组件
            exList: [
                {
                    name: '优惠券',
                    module_name: 'coupon',
                    id: 2000000,
                    cmptId: 'sub-home-market-coupons',
                    componentName: 'saasComponent',
                    icon: 'drag-youhuiquan',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    api: 'Shop/coupons',
                    shortcutOperation: true,
                    apiParam: {
                    },
                    rightConfig: {
                        attribute: [
                            {
                                label: '样式设置',
                                type: 'divider'
                            },
                            {
                                label: '排列样式',
                                pro: 'arrange',
                                value: 'arr2',
                                type: 'switch',
                                options: [
                                    { label: '一行一个', value: 'arr1', icon: 'drag-yihangyige1' },
                                    { label: '一行两个', value: 'arr2', icon: 'drag-yihangerge' },
                                    { label: '一行三个', value: 'arr3', icon: 'drag-yihangsange' },
                                    { label: '横向滑动', value: 'arr4', icon: 'drag-hengxianghuadong' },
                                ]
                            },
                            {
                                label: '卡片样式',
                                pro: 'mode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1', icon: 'drag-youhuiquanyi' },
                                    { label: '样式2', value: 'style2', icon: 'drag-youhuiquaner' },
                                    { label: '样式3', value: 'style3', icon: 'drag-youhuiquansan' },
                                ]
                            },
                            {
                                label: '优惠券颜色',
                                pro: 'couponsColor',
                                type: 'radio-color',
                                value: 'yellow-rgba(248, 156, 17, 1)',
                                options: [{
                                    label: '红色',
                                    value: 'red-rgba(250, 63, 30, 1)',
                                    color: 'rgba(250, 63, 30, 1)'
                                }, {
                                    label: '黄色',
                                    value: 'yellow-rgba(248, 156, 17, 1)',
                                    color: 'rgba(255, 234, 209, 1)'
                                }, {
                                    label: '蓝色',
                                    value: 'blue-rgba(52, 160, 255, 1)',
                                    color: 'rgba(52, 160, 255, 1)'
                                }, {
                                    label: '绿色',
                                    value: 'green-rgba(65, 176, 81, 1)',
                                    color: 'rgba(221, 251, 219, 1)'
                                }, {
                                    label: '黑色',
                                    value: 'black-rgba(51, 51, 51, 1)',
                                    color: 'rgba(51, 51, 51, 1)'
                                }]
                            },
                            {
                                label: '隐藏已抢完及失效的券',
                                type: 'switch',
                                key: 'is_hide_coupon',
                                pro: 'apiParam',
                                value: 0,
                                options: [
                                    { label: '隐藏', value: 1 },
                                    { label: '显示', value: 0 }
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)'
                            },
                        ],
                        source: [
                            {
                                type: 'alert',
                                text: '该组件已经升级, 如遇排版错乱，需要重新删除在拖进来配置！',
                                notLabelWidth: 1
                            },
                            {
                                label: '最多添加10张优惠券, 拖动可排序'
                            },
                            {
                                type: 'coupons',
                                pro: 'apiParam',
                                key: 'ids',
                                min: 1,
                                max: 10,
                                dialogFlag: 'couponsDialogFlag',
                                value: '',
                                notLabelWidth: true
                            },
                            // {
                            //     type: 'coupons',
                            //     pro: 'apiParam',
                            //     notLabelWidth: true,
                            //     key: 'ids',
                            //     min: 1,
                            //     max: 10,
                            //     value: '',
                            // },
                            // {
                            //     label: '',
                            //     type: 'setting',
                            //     settingText: '添加优惠券'
                            // },

                            {
                                pro: 'apiParam',
                                key: 'limit',
                                type: 'number',
                                min: 1,
                                max: 10,
                                value: 10,
                                show: false
                            },
                            // {
                            //     // title: '添加图片',
                            //     summary: '最多添加 10 张优惠券，拖动选中优惠券可对其排序',
                            //     pro: 'apiParam',
                            //     key: 'ids',
                            //     type: 'drag-list',
                            //     max: 10,
                            //     notLabelWidth: true,
                            //     pushBtnText: '添加图片'
                            // },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                {
                    name: '限时秒杀',
                    module_name: 'sales',
                    id: 2000001,
                    cmptId: 'sub-home-seckill',
                    componentName: 'saasComponent',
                    icon: 'drag-xianshimiaosha',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    api: 'GoodsSpike/list',
                    apiParam: {
                        limit: 6
                    },
                    shortcutOperation: true,
                    rightConfig: {
                        source: [
                            {
                                label: '还没有限时秒杀',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                label: '选择对应的活动',
                                key: 'cat_id',
                                pro: 'apiParam',
                                type: 'req-select',
                                reqName: 'goodsSpikeCategory'
                            },
                            {
                                label: '商品列表',
                                type: 'divider'
                            },
                            {
                                label: '排列样式',
                                pro: 'mode',
                                value: 'style3',
                                type: 'switch',
                                notLabelWidth: true,
                                options: [
                                    { label: '大图模式', value: 'style1', icon: 'drag-yihangyige1' },
                                    { label: '一行两个', value: 'style2', icon: 'drag-yihangerge' },
                                    { label: '一行三个', value: 'style3', icon: 'drag-yihangsange' },
                                    { label: '横向滑动', value: 'style4', icon: 'drag-hengxianghuadong' },
                                    { label: '详细列表', value: 'style5', icon: 'drag-xiangxiliebiao' },
                                    { label: '一大N小', value: 'style6', icon: 'drag-yishangerxia' }
                                ]
                            },
                            {
                                label: '商品内容',
                                type: 'divider'
                            },
                            {
                                label: '商品名称',
                                type: 'checkbox',
                                pro: 'titileShow',
                                value: 1,
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            {
                                label: '秒杀价格',
                                type: 'checkbox',
                                pro: 'priceShow',
                                value: 1,
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            {
                                label: '划线价格',
                                type: 'checkbox',
                                pro: 'marketPriceShow',
                                value: 0,
                                disabledRule: [{
                                    pro: 'mode',
                                    contains: ['style3', 'style4'],
                                    value: 0
                                }],
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            }, {
                                label: '秒杀按钮',
                                type: 'checkbox',
                                pro: 'purchaseShow',
                                value: 1,
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            }, {
                                label: '',
                                pro: 'shopcard',
                                value: 'btn3',
                                type: 'radio-text',
                                show: false
                            }, {
                                label: '按钮文字',
                                pro: 'shopcardText',
                                type: 'text',
                                value: '立即抢购',
                                maxlength: 5
                            },
                            {
                                label: '文本位置',
                                key: 'textAlign',
                                pro: 'itemLayer',
                                value: 'center',
                                type: 'switch',
                                options: [
                                    { label: '居左', value: 'left', icon: 'drag-juzuo' },
                                    { label: '居中', value: 'center', icon: 'drag-juzhong' }
                                ],
                                disabledRule: [{
                                    pro: 'mode',
                                    contains: ['style5'],
                                    value: 'left'
                                }]
                            },
                            {
                                label: '文本样式',
                                key: 'fontWeight',
                                pro: 'itemLayer',
                                value: 'normal',
                                type: 'switch',
                                options: [
                                    { label: '常规', value: 'normal', icon: 'drag-changgui' },
                                    { label: '加粗体', value: 'bold', icon: 'drag-jiacu' }
                                ]
                            }
                        ],
                        attribute: [
                            {
                                label: '商品设置',
                                type: 'divider'
                            },
                            {
                                label: '商品圆角',
                                key: 'borderRadius',
                                pro: 'itemLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 8
                            },
                            {
                                label: '图片比例',
                                pro: 'scale',
                                value: 'scale1',
                                type: 'switch',
                                options: [
                                    { label: '1:1', value: 'scale1', icon: 'drag-yibiyi' },
                                    {
                                        label: '16:9', value: 'scale2', icon: 'drag-shiliubijiu', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style5'],
                                            value: 'scale1'
                                        }]
                                    },
                                    {
                                        label: '3:4', value: 'scale3', icon: 'drag-sanbisi', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style5'],
                                            value: 'scale1'
                                        }]
                                    },
                                    { label: '4:3', value: 'scale4', icon: 'drag-sanbier' },
                                ]
                            },
                            {
                                label: '商品样式',
                                pro: 'goodsStyle',
                                value: 'goodStyle1',
                                type: 'switch',
                                notLabelWidth: true,
                                options: [
                                    { label: '无边白底', value: 'goodStyle1' },
                                    { label: '卡片投影', value: 'goodStyle2' },
                                    { label: '描边白底', value: 'goodStyle3' },
                                    { label: '无边透明底', value: 'goodStyle4' }
                                ]
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '限时秒杀',
                                maxlength: 8
                            },
                            {
                                label: '副标题',
                                key: 'sub_title',
                                type: 'text',
                                value: '',
                                maxlength: 15
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 1,
                                type: 'switch',
                                disabledRule: [{
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [0],
                                    value: 1
                                }],
                            },
                            {
                                label: '标题颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '标题配图',
                                type: 'upload-bg-img',
                                pro: 'titleLayer',
                                key: 'titleImage',
                                summary: '建议尺寸1:1'
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 0,
                                type: 'switch',
                                show: false
                            },
                            {
                                label: '显示倒计时',
                                pro: 'countdown',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '进度状态',
                                pro: 'statusTxt',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 0
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                type: 'switch',
                                pro: 'outerLayer',
                                key: 'isBGC',
                                value: 1,
                                options: [
                                    {
                                        label: '背景图片',
                                        value: 0
                                    },
                                    {
                                        label: '颜色背景',
                                        value: 1
                                    }
                                ]
                            },
                            {
                                type: 'upload-bg-img',
                                pro: 'outerLayer',
                                key: 'backgroundImage',
                                notLabelWidth: true,
                                value: '',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [0]
                                }
                            },
                            {
                                notLabelWidth: true,
                                pro: 'outerLayer',
                                key: 'bgColor',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)',
                                show: {
                                    pro: 'outerLayer',
                                    key: 'isBGC',
                                    contains: [1]
                                }
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }

                        ]
                    }
                },
                {
                    name: '钜惠拼团',
                    module_name: 'sales_group',
                    id: 2000002,
                    cmptId: 'sub-home-group-buying-new',
                    componentName: 'saasComponent',
                    icon: 'drag-juhuipintuan',
                    shortcutOperation: true,
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    api: 'GoodsTeam/list',
                    shortcutOperation: true,
                    apiParam: {
                        cat_id: 0
                    },
                    rightConfig: {
                        source: [
                            {
                                label: '还没有钜惠拼团',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                type: 'divider',
                                label: '商品列表'
                            },
                            {
                                label: '排列样式',
                                pro: 'mode',
                                value: 'style4',
                                type: 'switch',
                                notLabelWidth: true,
                                options: [
                                    { label: '大图模式', value: 'style1', icon: 'drag-yihangyige1' },
                                    { label: '一行两个', value: 'style2', icon: 'drag-yihangerge' },
                                    { label: '一行三个', value: 'style3', icon: 'drag-yihangsange' },
                                    { label: '横向滑动', value: 'style4', icon: 'drag-hengxianghuadong' },
                                    { label: '详细列表', value: 'style5', icon: 'drag-xiangxiliebiao' },
                                    { label: '一大N小', value: 'style6', icon: 'drag-yishangerxia            ' }
                                ]
                            },
                            {
                                label: '主标题',
                                key: 'title',
                                type: 'text',
                                value: '钜惠拼团',
                                unit: '',
                                maxlength: 8,
                            },
                            {
                                label: '选择对应活动',
                                key: 'cat_id',
                                pro: 'apiParam',
                                type: 'req-select',
                                reqName: 'goodsTeamCategory'
                            },
                            {
                                label: '商品内容',
                                type: 'divider'
                            },
                            {
                                label: '商品名称',
                                type: 'checkbox',
                                pro: 'titileShow',
                                value: 1,
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            // {
                            //     label: '商品描述',
                            //     type: 'checkbox',
                            //     pro: 'briefShow',
                            //     value: 0,
                            //     options: [
                            //         { label: '不显示', value: 0 },
                            //         { label: '显示', value: 1 }
                            //     ]
                            // },
                            {
                                label: '拼团价格',
                                type: 'checkbox',
                                pro: 'priceShow',
                                value: 1,
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            {
                                label: '划线价格',
                                type: 'checkbox',
                                pro: 'marketPriceShow',
                                value: 1,
                                disabledRule: [{
                                    pro: 'mode',
                                    contains: ['style3', 'style4'],
                                    value: 0
                                }],
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            // {
                            //     label: '购买按钮',
                            //     type: 'checkbox',
                            //     pro: 'purchaseShow',
                            //     value: 1,
                            //     options: [
                            //         { label: '不显示', value: 0 },
                            //         { label: '显示', value: 1 }
                            //     ]
                            // },
                            // {
                            //     label: '',
                            //     pro: 'shopcard',
                            //     value: 'style1',
                            //     type: 'radio-text',
                            //     notLabelWidth: true,
                            //     options: [
                            //         { label: '样式1', value: 'shopcard1' },
                            //         { label: '样式2', value: 'shopcard2' },
                            //         { label: '样式3', value: 'shopcard3' },
                            //         { label: '样式4', value: 'shopcard4' },
                            //         { label: '样式5', value: 'shopcard5' },
                            //         { label: '样式6', value: 'shopcard6' },
                            //         { label: '样式7', value: 'shopcard7' },
                            //         { label: '样式8', value: 'shopcard8' },
                            //     ]
                            // },
                            {
                                label: '已团人数',
                                type: 'checkbox',
                                pro: 'groupNumShow',
                                value: 1,
                                options: [
                                    { label: '不显示', value: 0 },
                                    { label: '显示', value: 1 }
                                ]
                            },
                            // {
                            //     label: '隐藏售罄',
                            //     type: 'checkbox',
                            //     pro: 'sellOutShow',
                            //     value: 1,
                            //     options: [
                            //         { label: '不显示', value: 0 },
                            //         { label: '显示', value: 1 }
                            //     ]
                            // },
                        ],
                        attribute: [
                            // {
                            //     label: '模块标题设置',
                            //     type: 'divider'
                            // },
                            // {
                            //     label: '标题位置',
                            //     pro: 'titleLayer',
                            //     key: 'textAlign',
                            //     value: 'align-start',
                            //     type: 'switch',
                            //     options: [
                            //         { label: '居左', value: 'align-start' },
                            //         { label: '居中', value: 'flex-ajcenter' },
                            //     ]
                            // },
                            // {
                            //     label: '显示更多',
                            //     pro: 'isMore',
                            //     value: 1,
                            //     type: 'switch',
                            //     options: [
                            //         { label: '否', value: 0 },
                            //         { label: '是', value: 1 },
                            //     ]
                            // },
                            // {
                            //     label: '标题背景',
                            //     pro: 'titleLayer',
                            //     key: 'hasBg',
                            //     value: 0,
                            //     type: 'switch'
                            // },
                            // {
                            //     label: '文本颜色',
                            //     key: 'color',
                            //     pro: 'titleLayer',
                            //     type: 'color',
                            //     value: 'rgba(51, 51, 51, 1)',
                            // },
                            {
                                label: '商品设置',
                                type: 'divider'
                            },
                            {
                                label: '商品圆角',
                                key: 'borderRadius',
                                pro: 'itemLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '图片比例',
                                pro: 'scale',
                                value: 'scale1',
                                type: 'switch',
                                options: [
                                    { label: '1:1', value: 'scale1', icon: 'drag-yibiyi' },
                                    {
                                        label: '16:9', value: 'scale2', icon: 'drag-shiliubijiu', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style5'],
                                            value: 'scale1'
                                        }]
                                    },
                                    {
                                        label: '3:4', value: 'scale3', icon: 'drag-sanbisi', disabledRule: [{
                                            pro: 'mode',
                                            contains: ['style5'],
                                            value: 'scale1'
                                        }]
                                    },
                                    { label: '4:3', value: 'scale4', icon: 'drag-sanbier' },
                                ]
                            },
                            {
                                label: '商品样式',
                                pro: 'goodsStyle',
                                value: 'goodStyle1',
                                type: 'switch',
                                notLabelWidth: true,
                                options: [
                                    { label: '无边白底', value: 'goodStyle1' },
                                    { label: '卡片投影', value: 'goodStyle2' },
                                    { label: '描边白底', value: 'goodStyle3' },
                                    { label: '无边透明底', value: 'goodStyle4' }
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 0
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 0)'
                            },
                            {
                                label: '商品文本设置',
                                type: 'divider'
                            },
                            {
                                label: '文本位置',
                                key: 'textAlign',
                                pro: 'itemLayer',
                                value: 'left',
                                type: 'switch',
                                options: [
                                    { label: '居左', value: 'left', icon: 'drag-juzuo' },
                                    { label: '居中', value: 'center', icon: 'drag-juzhong' }
                                ]
                            },
                            {
                                label: '文本样式',
                                key: 'fontWeight',
                                pro: 'itemLayer',
                                value: 'normal',
                                type: 'switch',
                                options: [
                                    { label: '常规', value: 'normal', icon: 'drag-changgui' },
                                    { label: '加粗体', value: 'bold', icon: 'drag-jiacu' }
                                ]
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }

                        ]
                    }
                },
                {
                    name: '热销爆品',
                    module_name: 'hot_goods',
                    id: 2000006,
                    cmptId: 'sub-home-hot-sale',
                    componentName: 'saasComponent',
                    icon: 'drag-rexiaobaopin',
                    limitNum: 1,
                    rightComponents: 'right-common-set',
                    api: 'Goods/hotGoods',
                    shortcutOperation: true,
                    apiParam: {
                        limit: 6
                    },
                    rightConfig: {
                        source: [
                            {
                                label: '还没有热销爆品',
                                type: 'setting',
                                settingText: '去配置 >',
                            },
                            {
                                label: '标题设置',
                                type: 'divider'
                            },
                            {
                                label: '标题',
                                key: 'title',
                                type: 'text',
                                value: '热销爆品',
                                unit: '',
                                maxlength: 8,
                            },
                            {
                                label: '标题背景',
                                pro: 'titleLayer',
                                key: 'hasBg',
                                value: 0,
                                type: 'switch'
                            },
                            {
                                label: '标题颜色',
                                key: 'color',
                                pro: 'titleLayer',
                                type: 'color',
                                value: 'rgba(51, 51, 51, 1)',
                            },
                            {
                                label: '显示更多',
                                pro: 'isMore',
                                value: 1,
                                type: 'switch'
                            },
                            {
                                label: '更多样式',
                                pro: 'titleLayer',
                                key: 'moreMode',
                                value: 'style1',
                                type: 'switch',
                                options: [
                                    { label: '样式1', value: 'style1' },
                                    { label: '样式2', value: 'style2' },
                                ]
                            },
                            {
                                label: '组件设置',
                                type: 'divider'
                            },
                            {
                                label: '组件圆角',
                                key: 'borderRadius',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                step: 4,
                                max: 32,
                                value: 16
                            },
                            {
                                label: '组件边距',
                                key: 'margin',
                                pro: 'outerLayer',
                                type: 'slider',
                                unit: 'rpx',
                                min: 0,
                                max: 100,
                                step: 4,
                                value: 24
                            },
                            {
                                label: '组件背景',
                                key: 'bgColor',
                                pro: 'outerLayer',
                                type: 'color',
                                value: 'rgba(255, 255, 255, 1)'
                            },
                            {
                                label: '组件备注',
                                pro: 'componentRemarks',
                                show: false,
                                value: ''
                            }
                        ]
                    }
                },
                // {
                //     name: '新人专享',
                //     module_name: 'new_user',
                //     id: 2000004,
                //     cmptId: 'sub-home-new-gift-pack',
                //     componentName: 'saasComponent',
                //     icon: 'drag-xinrenzhuanxiang',
                //     limitNum: 1,
                //     rightComponents: 'right-common-set',
                //     api: 'Shop/getNewUserList',
                //     shortcutOperation: true,
                //     rightConfig: {
                //         source: [
                //             {
                //                 label: '还没有新人专享',
                //                 type: 'setting',
                //                 settingText: '去配置 >',
                //             },
                //             {
                //                 label: '组件设置',
                //                 type: 'divider'
                //             },
                //             {
                //                 label: '内容圆角',
                //                 key: 'borderRadius',
                //                 pro: 'innerLayer',
                //                 type: 'slider',
                //                 unit: 'rpx',
                //                 step: 4,
                //                 max: 32,
                //                 value: 16
                //             },
                //             {
                //                 label: '内容间距',
                //                 key: 'marginLeft',
                //                 pro: 'innerLayer',
                //                 type: 'switch',
                //                 unit: 'rpx',
                //                 multip: 24,
                //                 value: 1
                //             },
                //             {
                //                 label: '内容背景',
                //                 key: 'backgroundColor',
                //                 pro: 'innerLayer',
                //                 type: 'color',
                //                 value: 'rgba(255, 227, 211, 1)'
                //             },
                //             {
                //                 label: '组件边距',
                //                 key: 'margin',
                //                 pro: 'outerLayer',
                //                 type: 'slider',
                //                 unit: 'rpx',
                //                 min: 0,
                //                 max: 100,
                //                 step: 4,
                //                 value: 24
                //             },
                //             {
                //                 label: '组件背景',
                //                 key: 'bgColor',
                //                 pro: 'outerLayer',
                //                 type: 'color',
                //                 value: 'rgba(245, 245, 245, 1)'
                //             },
                //             {
                //                 label: '组件备注',
                //                 pro: 'componentRemarks',
                //                 show: false,
                //                 value: ''
                //             }
                //         ]
                //     }
                // },
                // {
                //     name: '预约活动',
                //     module_name: 'activity',
                //     id: 2000005,
                //     cmptId: 'sub-home-decoration-activities',
                //     componentName: 'saasComponent',
                //     icon: 'drag-yuyuehuodong',
                //     limitNum: 1,
                //     rightComponents: 'right-common-set',
                //     api: 'Activity/decorate',
                //     shortcutOperation: true,
                //     apiParam: {
                //         limit: 2
                //     },
                //     rightConfig: {
                //         source: [
                //             {
                //                 label: '还没有预约活动',
                //                 type: 'setting',
                //                 settingText: '去配置 >',
                //             },
                //             {
                //                 label: '选择风格',
                //                 pro: 'mode',
                //                 value: 'style1',
                //                 type: 'switch',
                //                 options: [
                //                     { label: '风格1', value: 'style1' },
                //                     { label: '风格2', value: 'style2' }
                //                 ]
                //             },
                //             {
                //                 label: '标题设置',
                //                 type: 'divider'
                //             },
                //             {
                //                 label: '标题',
                //                 key: 'title',
                //                 type: 'text',
                //                 value: '预约活动',
                //                 maxlength: 8
                //             },
                //             {
                //                 label: '标题背景',
                //                 pro: 'titleLayer',
                //                 key: 'hasBg',
                //                 value: 0,
                //                 type: 'switch'
                //             },
                //             {
                //                 label: '标题颜色',
                //                 key: 'color',
                //                 pro: 'titleLayer',
                //                 type: 'color',
                //                 value: 'rgba(51, 51, 51, 1)'
                //             },
                //             {
                //                 label: '显示更多',
                //                 pro: 'isMore',
                //                 value: 1,
                //                 type: 'switch'
                //             },
                //             {
                //                 label: '更多样式',
                //                 pro: 'titleLayer',
                //                 key: 'moreMode',
                //                 value: 'style1',
                //                 type: 'switch',
                //                 options: [
                //                     { label: '样式1', value: 'style1' },
                //                     { label: '样式2', value: 'style2' },
                //                 ]
                //             },
                //             {
                //                 label: '组件设置',
                //                 type: 'divider'
                //             },
                //             {
                //                 label: '组件圆角',
                //                 key: 'borderRadius',
                //                 pro: 'outerLayer',
                //                 type: 'slider',
                //                 unit: 'rpx',
                //                 step: 4,
                //                 max: 32,
                //                 value: 16
                //             },
                //             {
                //                 label: '活动背景',
                //                 key: 'backgroundColor',
                //                 pro: 'itemLayer',
                //                 type: 'color',
                //                 value: 'rgba(255, 247, 241, 1)',
                //                 show: {
                //                     pro: 'mode',
                //                     contains: ['style2']
                //                 }
                //             },
                //             {
                //                 label: '组件边距',
                //                 key: 'margin',
                //                 pro: 'outerLayer',
                //                 type: 'slider',
                //                 unit: 'rpx',
                //                 min: 0,
                //                 max: 100,
                //                 step: 4,
                //                 value: 24
                //             },
                //             {
                //                 label: '组件背景',
                //                 key: 'bgColor',
                //                 pro: 'outerLayer',
                //                 type: 'color',
                //                 value: 'rgba(255, 255, 255, 1)'
                //             },
                //             {
                //                 label: '展示数量',
                //                 key: 'limit',
                //                 pro: 'apiParam',
                //                 type: 'number',
                //                 min: 1,
                //                 max: 5,
                //                 value: 2
                //             },
                //             {
                //                 label: '组件备注',
                //                 pro: 'componentRemarks',
                //                 show: false,
                //                 value: ''
                //             }
                //         ]
                //     },
                // }
            ]
        }
    },
    mutations: {
        // 设置页面参数
        SET_ROUNTE_PARAM(state, { login_uid, username }) {
            state.login_uid = login_uid
            state.username = username
        },
        initComponentsInfo(state, data) {
            state.componentsInfo = data
        },
        setRightAideTabActiveName(state, data) {
            state.rightAideTabActiveName = data.rightAideTabActiveName
        },
        setPattern(state, data) {
            state.pattern = data.pattern
        },
        setPhoneSize(state, data) {
            state.phoneSize = data.phoneSize
        },
        setPreview(state, data) {
            state.preview = data.preview
        },
        setShowFlexDraggalbeHandle(state, data) {
            state.showFlexDraggalbeHandle = data.showFlexDraggalbeHandle
        },
        setShowComponentPreview(state, { showComponentPreview }) {
            state.showComponentPreview = showComponentPreview
        },
        setComponentPreviewName(state, { componentPreviewName }) {
            state.componentPreviewName = componentPreviewName
        },
        setComponentPreviewConfig(state, componentPreviewConfig) {
            state.componentPreviewConfig = componentPreviewConfig
        },
        setMyComponentPreviewData(state, { myComponentPreviewData }) {
            state.myComponentPreviewData = myComponentPreviewData
        },
        setShopHomeData(state, shopHomeData) {
            state.shopHomeData = shopHomeData
        },
        SET_MAX_MODULE_NO(state, max_module_no) {
            state.max_module_no = max_module_no || 100
        },
        SET_SYSTEM_TIME_DIff(state, time) {
            state.timeDiff = time
        }
    },

    getters: {
    },

    actions: {
        // 初始化組件基本信息，從本地提取
        initComponentsInfo({ commit }) {
            let data = getCachesComponentsInfo()
            if (data) {
                commit('initComponentsInfo', data)
            }
        },
        setNewHomeData({ commit }, setObj) {
            commit('SET_NEW_HOME_DATA', setObj)
        },
        /**
         * 初始化缓存数据
         * * @param dispatch
         */
        initData({ dispatch }) {
            dispatch('initProject')
            dispatch('initComponentsInfo')
        },
        async getCustomPreviewQRcode({ state }) {
            const { data: { src = '' } } = await Vue.prototype.$http('customPreviewQRcode', {
                page_id: state.page_id
            })
            return src
        },
    },
    modules: modules
})

export default store
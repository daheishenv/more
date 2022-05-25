/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-27 17:58:03
 */
import { mapState } from 'vuex'
export default {
    data() {
        return {
            cData: null, // 存接口返回的数据
            cFinish: false, // 接口请求成功
            shopInfo_: {
                member_upgrade_show: true
            }, // 会员升级页面需要使用
            // shopConfig_: {},
            isOpenIntegralShare: false,
            showAdvisory: true
        }
    },
    props: {
        config: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        ...mapState({
            shopConfig_: (state) => (state.config.shopConfig ? state.config.shopConfig : null),
        }),
        colors_() {
            return this.shopConfig_ ? this.shopConfig_.color : this.defaultColors
        },
        // 时间戳，用户中途更新部分组件接口
        timeStamp_() {
            return this.config.timeStamp
        },
        // 请求参数
        apiParam_() {
            return this.config.apiParam
        },
        // 额外配置参数
        extra_() {
            return this.config.extra || {}
        },
        // 组件模式
        mode_() {
            return this.extra_.mode || 'style1'
        },
        type_() {
            return this.extra_.type || 'type1'
        },
        // 外层样式
        outerLayer_() {
            // 兼容旧数据
            return this.extra_.outerLayer || {}
        },
        // 内层样式
        innerLayer_() {
            return this.extra_.innerLayer || {}
        },
        // 列表样式
        itemLayer_() {
            return this.extra_.itemLayer || {}
        },
        // 标题样式
        titleLayer_() {
            const titleLayer = { ...(this.extra_.titleLayer || {}) }
            // 透明值为0的处理方法
            if (this.innerLayer_.backgroundColor) {
                const bgAlpha = Number(
                    this.innerLayer_.backgroundColor
                        .replace(/(?:\(|\)|rgb|RGB)*/g, '')
                        .split(',')
                        .pop()
                )
                titleLayer.hasBg = bgAlpha === 0 ? 1 : parseInt(titleLayer.hasBg)
            } else {
                titleLayer.hasBg = 1
            }
            return titleLayer
        },
        // 标题是否有背景
        hasTitleBg_() {
            return this.titleLayer_.backgroundColor === '#ffffff'
        },
        // 左右间距
        outerMargin_() {
            return this.formatMargin(this.outerLayer_.margin)
        },
        // 外层圆角
        outerRadius_() {
            return this.outerLayer_.borderRadius
        },
        // 内层圆角
        innerRadius_() {
            return this.innerLayer_.borderRadius
        },
        // 内容图片的圆角
        imgRadius_() {
            return this.innerLayer_.imgRadius || this.innerRadius_
        },
        // 内容间距
        innerMargin_() {
            return this.formatMargin(this.innerLayer_.margin)
        },
        // 是否显示更多
        isMore_() {
            const isMore = parseInt(this.extra_.isMore)
            return isNaN(isMore) ? 1 : isMore
        },
        noDataText_() {
            return this.cFinish ? (this.config.title ? `暂无${this.config.title}` : '暂无内容') : '数据加载中'
        },
        noData_() {
            if (!this.cFinish) return true
            return this.cFinish && (Array.isArray(this.cData) ? this.cData : this.cData && this.cData.list ? this.cData.list : Object.keys(this.cData || {})).length === 0
        },
        content_() {
            return this.config.content || []
        },
        colors_() {
            return this.shopConfig_.color || {}
        }
    },
    watch: {
        timeStamp_(val) {
            // if (val) this.getData()
        }
    },
    created() {
        // this.getData()
    },
    // 之后这边会写通用的请求方法
    methods: {
        formatMargin(margin) {
            if (!margin) return 0
            // 所有边框（含单位）
            const marginArr = String(margin).split(' ')
            // 所有边框转数字（不含单位）
            const marginNumberArr = marginArr.map(o => parseInt(o))
            // 所有边框的单位
            const marginUnit = marginArr.map((o, i) => o.replace(marginNumberArr[i], ''))
            return marginNumberArr[marginNumberArr.length - 1] + marginUnit[marginUnit.length - 1]
        },
        async getData() {
            this.cFinish = false
            if (this.config.api) {
                try {
                    const { data } = await this.$http(this.config.api, this.config.apiParam)
                    if (data) {
                        this.cData = data
                        this.finishData(data)
                    }
                    this.cFinish = true
                } catch (e) {
                    this.cFinish = true
                    // TODO handle the exception
                }
            } else {
                if (this.config.data) {
                    this.cData = this.config.data
                    this.finishData(this.config.data)
                }
                this.cFinish = true
            }
        },
        // 接口放回成功后执行的操作，会返回数据里面的data，自己页面上可重写该方法
        finishData(data) { }
    }
}

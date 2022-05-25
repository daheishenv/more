import { mapState } from 'vuex'
export default {
    data() {
        return {
            cData: undefined,//存接口返回的数据
            cFinish: false,//接口请求成功
            isFirst: true,
            margin: 0,
            extraData: {}
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
    watch: {
        newHomeData_: {
            handler(val) {
                let data = val[this.config.module_no]
                if (!data) return
                this.cData = this.$deepClone(data)
                this.finishData(data)
            },
        },
        config: {
            handler(val, oldVal) {
                if (val.api && oldVal) {
                    if (val.api !== oldVal.api || !this.$c.diffByObj(val.apiParam, oldVal.apiParam)) {
                        this.$c.debounce(() => {
                            this.getData(false)
                        }, 300)
                    }
                } else {
                    this.getData()
                }
            },
            deep: true
        },
        timeStamp_(val) {
            if (val) this.getData()
        }
    },
    created() {
        this.getData(false)
    },
    computed: {
        ...mapState({
            cmptAPIData: state => {
                return state.project.cmptAPIData || {}
            }
        }),
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
        // 外层样式
        outerLayer_() {
            const outerLayer = this.extra_.outerLayer || {}
            const isBGC = parseInt(outerLayer.isBGC)
            if (!isNaN(isBGC) && isBGC === 0) {
                outerLayer.backgroundImage && (outerLayer.background = `url(${this.$config.ossImgUrl + outerLayer.backgroundImage})`)
            }
            return outerLayer
        },
        // 内层样式
        innerLayer_() {
            const innerLayer = this.extra_.innerLayer || {}
            const isBGC = parseInt(this.outerLayer_.isBGC)
            if (!isNaN(isBGC) && isBGC === 0) {
                innerLayer.backgroundImage && (innerLayer.background = `url(${this.$config.ossImgUrl + innerLayer.backgroundImage})`)
            }
            if (this.extra_.innerLayer.compRadius) {
                innerLayer.borderRadius = this.extra_.innerLayer.compRadius
            }
            if (this.extra_.innerLayer.compBgColor) {
                innerLayer.backgroundColor = this.extra_.innerLayer.compBgColor
            }
            return innerLayer
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
                const bgAlpha = Number(this.innerLayer_.backgroundColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',').pop())
                titleLayer.hasBg = bgAlpha === 0 ? 1 : parseInt(titleLayer.hasBg)
            } else {
                titleLayer.hasBg = 1
            }
            return titleLayer
        },
        // 标题是否有背景
        hasTitleBg_() {
            return !this.titleLayer_.backgroundColor || this.titleLayer_.backgroundColor === 'rgba(245, 245, 245, 1)' || this.titleLayer_.backgroundColor === null
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
            return this.cFinish && (Array.isArray(this.cData) ? this.cData : ((this.cData && this.cData.list) ? this.cData.list : Object.keys(this.cData || {}))).length === 0
        }
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
        async getData(load = true) {
            if (this.config.api) {
                const { api, apiParam = {}, module_no } = this.config
                const newApiParam = {
                    ...apiParam,
                    request_example: 1
                }
                const oldItem = this.cmptAPIData[module_no]
                if (!load && oldItem && oldItem.api === api && this.$c.diffByObj(oldItem.apiParam, newApiParam)) {
                    this.cData = oldItem.data || []
                } else {
                    try {
                        const { data } = await this.$http(api, newApiParam)
                        this.cData = data || []
                        // 缓存起来方便使用
                        this.$store.dispatch('setAPIData', {
                            module_no: module_no,
                            data,
                            api,
                            apiParam: newApiParam
                        })
                    } catch (e) {
                        console.log(e);
                        //TODO handle the exception
                    }
                }
            } else {
                this.cData = this.config.data || []
            }
            this.cFinish = true
            this.finishData(this.cData)
        },

        // 接口放回成功后执行的操作，会返回数据里面的data，自己页面上可重写该方法
        finishData(data) {

        }
    }
}
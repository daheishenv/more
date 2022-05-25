export default {
    name: 'menu-scroll',
    data() {
        return {
            menuIndex: -1
        }
    },
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        color: {
            type: String,
            default: '#666'
        },
        selColor: {
            type: String,
            default: 't'
        },
        border: {
            type: [String, Boolean],
            default: true
        },
        value: {
            type: Number,
            default: -1
        },
        scrollX: {
            type: [String, Boolean],
            default: true
        },
        height: {
            type: [String, Number],
            default: 88
        },
        label: {
            type: String,
            default: 'label'
        },
        mode: {
            type: String,
            default: 'normal'
        },
        bgColor: {
            type: String,
            default: '#fff'
        },
        textStyle: {
            type: Object,
            default() {
                return {}
            }
        },
        // 从第几个开始回弹滚动
        scrollIndex: {
            type: [String, Number],
            default: 2
        },

        // 选中主题自定义
        selTheme: {
            type: Array,
            default: () => []
        },

        // 选中主题自定义
        selPro: {
            type: Array,
            default: () => []
        }

    },
    watch: {
        value: {
            handler(val) {
                if (val !== this.menuIndex) {
                    this.$nextTick(() => {
                        this.handleChangeType(val)
                    })
                }
            },
            immediate: true
        }
    },
    computed: {
        scrollX_() {
            return String(this.scrollX) !== 'false'
        },
        listStyle_() {
            const listStyle = {}
            // this.scrollX_ ? (listStyle.height = this.$c.addUnit(this.height)) : '';
            listStyle.height = this.$c.addUnit(this.height)
            return listStyle
        },
        style_() {
            return {
                ...this.listStyle_,
                backgroundColor: this.bgColor
            }
        },
        itemStyle_() {
            return this.scrollX_ ? {
                lineHeight: this.listStyle_.height,
                height: this.listStyle_.height,
                ...this.textStyle
            } : this.textStyle
        },
        border_() {
            return String(this.border) !== 'false'
        },
        currentView_() {
            let typeIndex = this.menuIndex - this.scrollIndex
            typeIndex = typeIndex < 0 ? 0 : typeIndex
            return 'type' + typeIndex
        },

        theme_() {
            return (val) => {
                return val ? (this.scrollX_ ? ((this.selTheme && this.selPro) ? this.selTheme : ['transparent', this.selColor]) : [this.selColor, '#fff']) : [
                    'transparent', '#333'
                ]
            }
        },

        pro_() {
            return (val) => {
                return val ? this.selPro ? this.selPro : ['bgc', 'c'] : ['bgc', 'c']
            }
        }
    },
    methods: {
        handleChangeType(index, e = {}) {
            const emitObj = {
                type: e.type || 'click',
                detail: {
                    value: index
                }
            }
            this.emitClick(emitObj)
            if (this.menuIndex === index) return
            this.menuIndex = index
            this.emitChange(emitObj)
        },
        emitClick(e) {
            this.$emit('click', e)
        },
        emitChange(e) {
            this.$emit('input', e.detail.value)
            this.$emit('change', e)
        }
    }
}

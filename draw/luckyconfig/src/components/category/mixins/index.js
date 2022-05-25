export default {
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        config: {
            type: Object,
            default: () => { }
        },
        menuList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            treeActiveId: -1, // 一级选择id
            childTreeActiveId: -1, // 二级选择id
            scrollHeight: 0
        }
    },
    computed: {
        hasBranch_() {
            return this.config.cateData.goods_branch?.title && this.config.cateData.goods_branch?.data.length
        },
        isNoData_() {
            if (!this.config.childLoading) {
                const child_category = this.config.cateData.child_category
                return (!child_category || child_category?.length === 0) && !this.hasBranch_
            }
            return false
        },
        getActiveType_() {
            if (this.childTreeActiveId !== -1) {
                const childTypeList = this.config.cateData.child_category.find(v => v.cat_id === this.childTreeActiveId)
                if (childTypeList) {
                    return childTypeList
                }
            }
            return false
        },
        // 获取第三级的数据
        getTypeList() {
            const active = this.getActiveType_
            if (active) {
                return active.sub
            }
            return []
        },
        getTypeImg_() {
            const active = this.getActiveType_
            if (active) {
                return active.touch_catads_img
            }
            return ''
        }
    },
    created() {
        this.$nextTick(() => {
            this.calcELHeight()
        })
    },
    methods: {
        async calcELHeight() {
            const res = await this.$c.getRect.call(this, '.category-content')// '.category-content')
            // if (!Array.isArray(res)) {
            //     res = [res]
            // }
            console.log(res, 'resres[--------------------------')
            this.scrollHeight = res.height + 'px'
        },
        notify(actionName, ...arg) {
            this.$emit('notify', actionName, arg)
        },
        handleTreeChange() {
            this.childTreeActiveId = -1
            this.notify('handleChange1', this.treeActiveId)
        }
    }
}

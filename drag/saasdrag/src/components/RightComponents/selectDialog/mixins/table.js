/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-26 15:41:46
 */
export default {
    data() {
        return {
            tableData: [],
            multipleSelection: [],// 已选择数组
            oldLen: [], // 上一次选中，仅仅用于长度比较
            isLoading: false,
            count: 0,
            page: 1,
            limit: 10,
            listReqName: 'designerList',
            reqParams: {},
            pageSizes: [10, 20, 50, 100],
            tabValue: '',
            operationReqName: ''
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        },
        defaultValue: {
            type: [String, Object, Array],
            default: ''
        },
        panelValue: {
            type: String,
            default: 'table'
        },
        condition: {
            type: Object,
            default: () => {
                return {
                    min: 0,
                    max: 0
                }
            }
        }
    },
    computed: {
        showDialog_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
                this.$emit('change', {
                    type: 'change',
                    detail: {
                        value: val
                    }
                })
            }
        },
        operationReqParam_() {
            return {
                ids: this.multipleSelection.join(',')
            }
        }
    },
    watch: {
        showDialog_: {
            handler(val) {
                if (val) {
                    this.init()
                }
            }
        }
    },
    methods: {
        init() {
            this.initData()
            this.getList()
            this.initDialog()
        },
        // 刷新
        handleRefrsh() {
            if (this.tabValue === 'operation') {
                this.$refs.chooseOperation && this.$refs.chooseOperation.initPage()
            } else {
                this.getList()
            }
        },
        initDialog() {

        },
        initData() {
            this.tabValue = this.panelValue || 'table'
            this.oldLen = 0

            // 增加defaultValue可能是array的情况
            const multipleSelection = Array.isArray(this.defaultValue) ? this.defaultValue : (this.defaultValue.length ? this.defaultValue.split(',').map(o => Number(o)) : [])

            if (this.tabValue === 'cateId') {
                this.tempCateMultipleSelection = multipleSelection
                // this.cateMultipleSelection = multipleSelection
                this.cateMultipleSelection = this.fillArray(multipleSelection, 3)
                this.multipleSelection = []
            } else {
                this.tempCateMultipleSelection = []
                this.cateMultipleSelection = []
                this.multipleSelection = multipleSelection
            }
        },
        fillArray(arr, len, val = 0) {
            while (arr.length < len) {
                arr.push(val)
            }
            return arr
        },
        async getList() {
            if (this.isLoading) return
            this.isLoading = true
            try {
                const { data } = await this.$http(this.listReqName, {
                    page: this.page,
                    limit: this.limit,
                    ...this.reqParams
                })
                this.isLoading = false
                this.count = data.count
                this.tableData = data.list || []
                this.toggleRowSelection()
            } catch (error) {
                this.isLoading = false
            }
        },
        // 获取操作列表
        async handleTabClick() {
            if (this.tabValue === 'operation' || this.goodsTabValue === 'operation') {
                this.$refs.chooseOperation && this.$refs.chooseOperation.initPage()
            }
        },
        handleDragChange(selections) {
            this.multipleSelection = selections.map(o => o.id)
            this.toggleRowSelection()
        },
        toggleRowSelection() {
            this.$nextTick(() => {
                const selectRows = this.tableData.filter(o => this.multipleSelection.includes(o.id))
                this.oldLen = selectRows.length
                this.$refs.multipleTable && this.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, this.multipleSelection.includes(row.id));
                });
            })
        },
        // 确认提交
        handleSubmit(e) {
            const multipleSelection = this.tabValue === 'cateId' ? this.tempCateMultipleSelection : this.multipleSelection
            if (multipleSelection.length < this.condition.min && this.tabValue !== 'all') {
                return this.$message.warning(`最少选择${this.condition.min}项`)
            }
            this.$emit('input', false)
            this.$emit('submit', {
                ...e,
                detail: {
                    value: multipleSelection.join(','),
                    extraObj: [{
                        pro: 'apiParam',
                        key: 'idType',
                        value: this.tabValue
                    }, {
                        key: 'api',
                        value: this.operationReqName
                    }]
                }
            })
        },
        // 列表全选
        handleSelectAll(selections) {
            if (this.tableData.length > 0) {
                if (selections.length) {
                    const lastSelection = Array.from(new Set(this.multipleSelection.concat(selections.map(o => o.id))))
                    if (this.condition.max > 0) {
                        const cancelSection = lastSelection.splice(this.condition.max, lastSelection.length - this.condition.max)
                        // 要取消的队列id
                        if (cancelSection.length) {
                            selections.filter(o => cancelSection.includes(o.id)).forEach(row => {
                                this.$refs.multipleTable.toggleRowSelection(row, false);
                            });
                            this.$message.warning(`最多只能选择${this.condition.max}项`)
                        }
                    }
                    this.multipleSelection = lastSelection

                } else {
                    const allId = this.tableData.map(o => o.id)
                    this.multipleSelection = this.multipleSelection.filter(o => !allId.includes(o))
                    this.toggleRowSelection()
                }
                this.oldLen = selections.length
            }
        },
        // 列表项选中
        handleSelectionChange(selections, row) {
            // 比较这次操作是勾选还是取消，true是新增
            const selectId = row.id
            if (this.oldLen < selections.length) {
                if (this.condition.max > 0 && this.condition.max <= this.multipleSelection.length) {
                    this.$refs.multipleTable.toggleRowSelection(row, false);
                    return this.$message.warning(`最多只能选择${this.condition.max}项`)
                }
                this.multipleSelection.push(selectId)
            } else {
                this.multipleSelection.splice(this.multipleSelection.findIndex(o => o === selectId), 1)
            }
            this.oldLen = selections.length
        },
        handleCurrentChange(e) {
            this.page = e
            this.oldLen = 0
            this.getList()
        },
        handleSizeChange(e) {
            this.limit = e
            this.getList()
        }
    }
}
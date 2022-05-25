<template>
    <select-dialog
        v-model="showDialog_"
        :title="title"
        @submit="handleSubmit"
    >
        <el-scrollbar
            class="scrollbar-wrapper"
            ref="fromScrollbar"
        >
            <div class="dialog-form-inline form-dialog">
                <el-form
                    :inline="false"
                    size="mini"
                    label-width="90px"
                    :model="temp"
                    :rules="rules"
                    ref="ruleForm"
                    @submit.native.prevent
                >
                    <el-form-item
                        label="输入框名称"
                        prop="beforeText"
                    >
                        <el-input
                            v-model="temp.beforeText"
                            :maxlength="5"
                            show-word-limit
                            placeholder="输入框名称"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        label="表单类型"
                        prop="type"
                    >
                        <el-select
                            v-model="temp.type"
                            placeholder="请选择表单类型"
                        >
                            <el-option
                                v-for="item in formTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="输入框后缀"
                        v-if="showAfterText_"
                    >
                        <el-input
                            :maxlength="2"
                            show-word-limit
                            v-model="temp.afterText"
                            placeholder="请输入输入框后缀"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="提示文字">
                        <el-input
                            v-model="isShowText_"
                            :maxlength="20"
                            show-word-limit
                            placeholder="请输入提示文字"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="城市精确到"
                        prop="cityExact"
                        v-if="temp.type==='citySelect'"
                    >
                        <el-select
                            v-model="temp.cityExact"
                            placeholder="请选择城市精确值"
                        >
                            <el-option
                                v-for="item in cityExactList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="是否必填"
                        prop="pattern"
                    >
                        <el-radio-group v-model="temp.pattern">
                            <el-radio label="">否</el-radio>
                            <el-radio label="notnull">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="showCheck_">
                        <!-- <el-form-item
                            label="选项形状"
                            prop="circle"
                        >
                            <el-radio-group v-model="temp.shape">
                                <el-radio label="circle">圆形</el-radio>
                                <el-radio label="square">正方形</el-radio>
                            </el-radio-group>
                        </el-form-item> -->

                        <el-form-item
                            label="选择方式"
                            prop="multiple"
                        >
                            <el-radio-group v-model="temp.popup">
                                <el-radio label="">行</el-radio>
                                <el-radio label="1">弹窗</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            label="是否多选"
                            prop="multiple"
                        >
                            <el-radio-group v-model="temp.isMultiple">
                                <el-radio label="">否</el-radio>
                                <el-radio label="1">是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            label="选项"
                            prop="valueList"
                        >
                            <div class="option-diy">
                                <el-checkbox-group
                                    v-if="isCheckMoreView_"
                                    v-model="temp.checkedValue"
                                >
                                    <div
                                        class="option-diy-item"
                                        v-for="(item, index) in temp.optionList"
                                    >
                                        <el-checkbox
                                            class="option-diy-item-checkbox"
                                            :label="item.id"
                                        ></el-checkbox>
                                        <el-form-item
                                            :prop="'optionList.' + index + '.label'"
                                            :rules="rules.itemName"
                                            class="option-diy-item-input"
                                        >
                                            <el-input
                                                v-model="item.label"
                                                placeholder="选项名称"
                                                :maxlength="8"
                                                show-word-limit
                                            ></el-input>
                                        </el-form-item>
                                        <!-- <el-form-item
                                            :prop="'optionList.' + index + '.value'"
                                            :rules="rules.itemValue"
                                            class="option-diy-item-input"
                                        >
                                            <el-input
                                                v-model="item.value"
                                                placeholder="选项值"
                                            ></el-input>
                                        </el-form-item> -->
                                        <div class="option-diy-item-icon">
                                            <i
                                                v-if="showOptionDel_"
                                                @click="handleDelOption(index, item.id)"
                                                class="el-icon-delete"
                                            ></i>
                                        </div>
                                    </div>
                                </el-checkbox-group>
                                <el-radio-group
                                    v-else
                                    v-model="temp.radioValue"
                                    style="width: 100%"
                                >
                                    <div
                                        class="option-diy-item"
                                        v-for="(item, index) in temp.optionList"
                                    >
                                        <el-radio
                                            class="option-diy-item-radio"
                                            :label="item.id"
                                        ></el-radio>
                                        <el-form-item
                                            :prop="'optionList.' + index + '.label'"
                                            :rules="rules.itemName"
                                            class="option-diy-item-input"
                                        >
                                            <el-input
                                                v-model="item.label"
                                                placeholder="选项名称"
                                                :maxlength="8"
                                                show-word-limit
                                            ></el-input>
                                        </el-form-item>
                                        <!-- <el-form-item
                                            :prop="'optionList.' + index + '.value'"
                                            :rules="rules.itemValue"
                                            class="option-diy-item-input"
                                        >
                                            <el-input
                                                v-model="item.value"
                                                placeholder="选项值"
                                            ></el-input>
                                        </el-form-item> -->
                                        <div class="option-diy-item-icon">
                                            <i
                                                v-if="showOptionDel_"
                                                @click="handleDelOption(index, item.id)"
                                                class="el-icon-delete"
                                            ></i>
                                        </div>
                                    </div>
                                </el-radio-group>
                                <el-checkbox-group v-model="temp.valueList">

                                </el-checkbox-group>
                                <div class="option-diy-add">
                                    <el-button
                                        type="primary"
                                        @click="handleAddOption"
                                    >添加选项</el-button>
                                </div>
                            </div>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
        </el-scrollbar>
    </select-dialog>
</template>

<script>
import tableMixins from "./mixins/table";

export default {
    mixins: [tableMixins],
    data() {
        return {
            temp: {
                beforeText: "", // 名称
                afterText: '',
                type: "text", // 类型
                cityExact: "2", // 城市精确到
                pattern: '', // 是否非空
                isMultiple: '', // 是否多选 否 '' 是 '1'
                checkedValue: [], // 多选框选中值 选中值为[id1, id2]
                radioValue: null, // 单选框选中值 id
                popup: '',  // 是否弹窗 否 '' 是 '1'
                shape: 'circle', // 形状 circle/square
                placeholder: '', // 提示文字
                optionList: [ // 选项内容
                    { id: 1, value: '1', label: '选项1' },
                    { id: 2, value: '2', label: '选项2' }
                ],
            },
            formTypeList: [
                { comName: "c-input", value: "text", label: "文本框" },
                { comName: "c-radio", value: "radio", label: "选择框" },
                { comName: "c-select-city", value: "citySelect", label: "地区选择框" },
                { comName: "c-input", value: "textarea", label: "多行文本框" },
                // { comName: "c-input", value: "number", label: "数值框" },
                // { comName: "c-input", value: "price", label: "价格框" },
                // { comName: "c-input", value: "password", label: "密码框" },
            ],
            cityExactList: [
                { value: "0", label: "省" },
                { value: "1", label: "市" },
                { value: "2", label: "区" },
            ],
            rules: {
                beforeText: [{ required: true, message: '输入框名称不能为空', trigger: 'blur' }],
                itemName: [{ required: true, message: '选项名称不能为空', trigger: 'blur' }],
                itemValue: [{ required: true, message: '选项值不能为空', trigger: 'blur' }, { message: '选项值不能相同', trigger: 'blur', validator: this.validateOption }]
            },
            currentValue: {} // 当前表单项
        };
    },
    created() {
        this.initData()
    },
    computed: {
        isShowText_: {
            get() {
                if (this.showDialog_) {
                    if (this.currentValue?.default) {
                        return "";
                    }
                    return this.temp.placeholder
                }
                return ""
            },
            set(value) {
                this.temp.placeholder = value;
                try {
                    this.currentValue.default = false;
                } catch (e) {
                    console.log("-");
                }
            }
        },
        showCheck_() {
            return ['radio', 'checkbox'].indexOf(this.temp.type) !== -1
        },
        isCheckMoreView_() {
            return this.temp.isMultiple

        },
        showAfterText_() {
            return ['number', 'price'].indexOf(this.temp.type) !== -1
        },
        showOptionDel_() {
            return this.temp.optionList && this.temp.optionList.length > 1
        },
        // showPlaceholder_() {
        //     return !(this.temp.type === 'radio' && this.temp.popup === '')
        // }
    },
    watch: {
        defaultValue(nval, oval) {
            this.initData()
        }
    },
    methods: {
        initData() {
            const defaultValue = this.defaultValue ? this.$deepClone(this.defaultValue) : {}
            this.multipleSelection = defaultValue.defaultValue
            this.currentValue = defaultValue.currentValue
            this.retrunTemp()
            if (this.currentValue) {
                this.decodeData(this.currentValue)
            }
        },
        handleSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    const { comName, label: typeName } = this.formTypeList.find(o => o.value === this.temp.type) || {}
                    const data = { comName, default: false, typeName, compoentDefine: {}, createTime: Date.now() }
                    //数据格式化
                    if (comName === 'c-input') {
                        data.compoentDefine = this.creatCInput()
                    } else if (comName === 'c-radio') {
                        data.comName = this.temp.isMultiple ? 'c-checkbox' : 'c-radio'
                        data.compoentDefine = this.creatCRadio()
                    } else if (comName === 'c-select-city') {
                        data.compoentDefine = this.creatCSelectCity()
                    }

                    // 判断是否存在
                    const currentIndex = this.multipleSelection.findIndex(item => item.createTime && item.createTime === this.currentValue.createTime)
                    if (currentIndex !== -1) { // 修改
                        this.multipleSelection.splice(currentIndex, 1, data)
                    } else { // 新增
                        this.multipleSelection.push(data)
                    }
                    console.log('结果---------------------------', this.multipleSelection)
                    this.$emit('input', false)
                    this.$emit('submit', {
                        type: 'submit',
                        detail: {
                            value: this.multipleSelection
                        }
                    })
                }
            });
        },
        creatCInput() { // 生成c-input所需数据
            const temp = this.temp
            let other = {}
            if (this.showAfterText_) {
                other = {
                    afterText: temp.afterText
                }
            }
            return {
                value: "",
                type: temp.type,
                placeholder: temp.placeholder,
                beforeText: temp.beforeText,
                pattern: temp.pattern,
                ...other
            }
        },
        creatCRadio() { // 生成c-radio或c-checkbox所需数据
            const temp = this.temp
            const type = temp.isMultiple ? 'checkbox' : 'radio'
            let checkValue = null
            let optionList = null
            let other = {}
            let label = ''
            if (temp.isMultiple) {
                // 排序
                const checkItemLit = temp.checkedValue.sort((a, b) => a - b).map(item => {
                    return this.temp.optionList.find(o => o.id === item)
                }).filter(item => item)
                checkValue = checkItemLit.map(item => item.value)
                label = checkItemLit.map(item => item.label).join(',')
                optionList = this.temp.optionList.map(item => {
                    const result = Object.assign({}, item)
                    if (temp.checkedValue.indexOf(item.id) !== -1) {
                        result.checked = 'checked'
                    }
                    return result
                })

            } else {
                const checkItem = this.temp.optionList.find(o => o.id === temp.radioValue) || {}
                checkValue = checkItem.value || ''
                label = checkItem.label || ''
                optionList = this.temp.optionList.map(item => {
                    const result = Object.assign({}, item)
                    if (temp.radioValue === item.id) {
                        result.checked = 'checked'
                    }
                    return result
                })
            }
            return {
                value: checkValue,
                beforeText: temp.beforeText,
                type,
                popup: temp.popup,
                pattern: temp.pattern,
                isMultiple: temp.isMultiple,
                shape: temp.shape,
                placeholder: temp.placeholder,
                list: optionList,
                label,
                ...other
            }
        },
        creatCSelectCity() {  // 生成c-select-city所需数据
            const temp = this.temp
            return {
                value: {},
                beforeText: temp.beforeText,
                type: temp.type,
                placeholder: temp.placeholder,
                defaultList: [],
                popup: true,
                label: "",
                pattern: temp.pattern,
                live: temp.cityExact
            }
        },
        decodeData(defaultValue) {
            const { comName } = defaultValue
            if (comName === 'c-input') {
                this.decodeCInput(defaultValue)
            } else if (comName === 'c-checkbox' || comName === 'c-radio') {
                this.decodeCRadio(defaultValue)
            } else if (comName === 'c-select-city') {
                this.decodeCSelectCity(defaultValue)
            }
        },
        decodeCRadio(defaultValue) {
            const { comName, compoentDefine } = defaultValue
            let checkedValue = []
            let radioValue = null
            this.temp.optionList = compoentDefine.list.map(item => {
                return {
                    id: Number(item.id),
                    label: item.label,
                    value: item.value
                }
            })
            if (comName === 'c-checkbox') {
                checkedValue = compoentDefine.value.map(item => {
                    return this.temp.optionList.find(o => o.value === item)?.id
                })
            } else {
                radioValue = this.temp.optionList.find(o => o.value === compoentDefine.value)?.id
            }

            this.temp = Object.assign(this.temp, {
                beforeText: compoentDefine.beforeText,
                type: 'radio',
                pattern: compoentDefine.pattern,
                isMultiple: comName === 'c-checkbox' ? '1' : '',
                checkedValue,
                radioValue,
                popup: compoentDefine.popup,
                shape: compoentDefine.shape,
                placeholder: compoentDefine.placeholder

            })

        },
        decodeCInput(defaultValue) {
            const { compoentDefine } = defaultValue
            this.temp = Object.assign(this.temp, {
                beforeText: compoentDefine.beforeText,
                type: compoentDefine.type,
                afterText: compoentDefine.afterText,
                pattern: compoentDefine.pattern,
                placeholder: compoentDefine.placeholder

            })
        },
        decodeCSelectCity(defaultValue) {
            const { compoentDefine } = defaultValue
            this.temp = Object.assign(this.temp, {
                beforeText: compoentDefine.beforeText,
                type: compoentDefine.type,
                pattern: compoentDefine.pattern,
                placeholder: compoentDefine.placeholder,
                cityExact: compoentDefine.live
            })
        },
        handleAddOption() {
            let id = this.temp.optionList[this.temp.optionList.length - 1]?.id + 1 || 0
            this.temp.optionList.push({ id, value: String(id), label: '' })
            this.$nextTick(() => {
                this.$refs['fromScrollbar'].wrap.scrollTop = this.$refs['fromScrollbar'].wrap.scrollHeight
            })
        },
        handleDelOption(index, id) { // 删除选项
            if (id) {
                if (id === this.temp.radioValue) {
                    this.temp.radioValue = null
                }
                const index = this.temp.checkedValue.findIndex(o => o == id)
                this.temp.checkedValue.splice(index, 1)
            }
            this.temp.optionList.splice(index, 1)
        },
        validateOption(rule, value, callback) { // 验证选项值不能相同
            const obj = this.temp.optionList.filter(o => {
                return o.value === value
            })
            if (obj && obj.length > 1) {
                callback(new Error('选项值不能相同'))
            } else {
                callback()
            }
        },
        retrunTemp() {
            this.temp = {
                beforeText: "", // 名称
                afterText: '',
                type: "text", // 类型
                cityExact: "2", // 城市精确到
                pattern: '', // 是否非空
                isMultiple: '', //
                checkedValue: [],
                radioValue: null,
                popup: '',
                shape: 'circle',
                placeholder: '',
                optionList: [
                    { id: 1, value: '1', label: '选项1' },
                    { id: 2, value: '2', label: '选项2' }
                ],
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.form-dialog {
    padding: 0 20px;
    ::v-deep .el-form-item__content {
        width: auto;
    }
    ::v-deep .el-select {
        width: 100%;
    }
}

.scrollbar-wrapper {
    height: 420px;
    &-content {
        padding: 8px 25px 16px 25px;
        &--padd {
            padding-top: 24px;
        }
    }
    ::v-deep .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}

.option-diy {
    ::v-deep .el-radio-group {
        display: flex;
        flex-wrap: wrap;
    }
    ::v-deep .el-checkbox-group {
        display: flex;
        flex-wrap: wrap;
    }

    &-item {
        display: flex;
        width: 46%;
        margin-bottom: 15px;
        &:nth-child(2n + 1) {
            margin-right: 8%;
        }
        // &:not(:last-of-type) {
        //     margin-bottom: 15px;
        // }
        &-checkbox {
            padding-right: 15px;
        }
        &-radio {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0;
            padding-right: 15px;
        }
        &-input {
            width: 100%;
            margin-right: 15px;
            margin-bottom: 0;
        }
        &-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            min-width: 20px;
        }
        ::v-deep .el-checkbox__label {
            display: none;
        }

        ::v-deep .el-radio__label {
            display: none;
        }
    }
    &-add {
        display: flex;
        justify-content: flex-end;
        margin-top: 15px;
        padding-right: 35px;
    }
}
// ::v-deep .el-dialog__wrapper {
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }
// ::v-deep .el-dialog {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
// }
// ::v-deep .el-dialog__body {
//     padding-left: 0;
//     padding-right: 0;
// }
</style>

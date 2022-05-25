<template>
    <div>
        <div
            style="display: flex;flex-wrap: wrap"
            class="form-line"
        >
            <template v-for="(item,index) in formList">
                <el-form-item
                    v-show="haveMustCheck(item)"
                    :label="item.label"
                    class="i-form-item"
                    :key="index"
                >
                    <el-input
                        v-if="item.type !== 'color' && item.type !== 'select' && item.type !== 'border'"
                        :value="computeValue(value,item.key,'/'+ item.unit +'/g')"
                        @input="inputChange($event,item)"
                        :type="item.type"
                        size="mini"
                        @focus="item.haveDirection === true ? paddingMarginDirectionFun(true,index) : null"
                    >
                        <div
                            slot="prefix"
                            v-if="item.unit !== undefined"
                        >
                            <el-popover
                                popper-class="my-none-el-popover"
                                placement="left"
                                @show="showElSliderFun(true)"
                                @hide="showElSliderFun(false)"
                                trigger="click"
                            >
                                <el-slider
                                    :show-tooltip="false"
                                    vertical
                                    :value="showElSlider? computeValueNumber(value,item.key,'/'+ item.unit +'/g') : null"
                                    @input="showElSlider ? changeInputSizeBySlider($event,item) : null"
                                    :min="item.key==='limit' ? 1 : -1"
                                    :step="1"
                                    :max="750"
                                    input-size="mini"
                                    height="450px"
                                >
                                </el-slider>
                                <i
                                    style="cursor: pointer"
                                    @tap="clearValue(item)"
                                    class="el-icon-circle-close el-input__icon adjust-size"
                                ></i>
                                <i
                                    slot="reference"
                                    style="cursor: pointer"
                                    class="el-icon-d-caret el-input__icon "
                                ></i>
                            </el-popover>
                        </div>
                        <div
                            slot="suffix"
                            v-if="item.unit !== undefined"
                        >
                            <el-popover
                                placement="bottom"
                                width="100"
                                trigger="click"
                            >
                                <div style="display: flex;align-items: center;justify-content: space-around">
                                    <div>单位：</div>
                                    <el-input
                                        type="text"
                                        size="mini"
                                        @input="inputChangeUnit($event,item,index)"
                                        :value="item.unit"
                                        style="width: 75px"
                                    >
                                    </el-input>
                                </div>
                                <div
                                    slot="reference"
                                    style="cursor: pointer"
                                >{{item.unit}}</div>
                            </el-popover>
                        </div>
                    </el-input>
                    <div
                        v-if="item.type === 'color'"
                        style="display: inline-block;width: 120px;text-align: left;"
                    >
                        <el-color-picker
                            v-model="value[item.key]"
                            @change="changeColor($event,item.key)"
                            :show-alpha="true"
                        ></el-color-picker>
                    </div>

                    <template v-if="item.type === 'border'">
                        <border
                            :ikey="item.key"
                            v-model="item.data"
                            :unit="item.unit"
                            @choose="borderListShow = true"
                        ></border>
                    </template>

                    <el-select
                        v-if="item.type === 'select'"
                        v-model="value[item.key]"
                        placeholder="请选择"
                        clearable
                        @change="changePicker(item.key,value[item.key])"
                    >
                        <el-option
                            size="mini"
                            v-for="item2 in item.select"
                            :key="item2.value"
                            :label="item2.label"
                            :value="item2.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <template v-if="item.type === 'border'">
                    <div
                        style="display: flex; flex-wrap: wrap"
                        class="form-line"
                        v-show="borderListShow"
                    >
                        <el-form-item
                            :label="item2.label"
                            class="i-form-item"
                            v-for="(item2, index2) in borderList"
                            :key="index2"
                        >
                            <border
                                :ikey="item2.key"
                                v-model="item2.data"
                                :unit="item.unit"
                            ></border>
                        </el-form-item>
                    </div>
                    <el-divider v-if="borderListShow">
                        <div
                            style="cursor: pointer;"
                            @click="borderListShow=false"
                        ><span style="font-size: 14px;color: #ccc">收起</span><i
                                class="el-icon-arrow-up"
                                style="color: #ccc"
                            ></i></div>
                    </el-divider>
                </template>

                <template v-if="item.haveDirection === true">
                    <div
                        style="display: flex; flex-wrap: wrap"
                        class="form-line"
                        v-show="item.showDirection"
                    >
                        <el-form-item
                            :label="item.key + item2.label"
                            class="i-form-item"
                            v-for="(item2,index2) in arrIndex"
                            :key="index2"
                        >
                            <el-input
                                :value="computeValue(item.padingOrMargin,item2.name,'/[('+ item.unit +') ]/g','1')"
                                @input="directionFun(item,item2.name,$event,index)"
                                size="mini"
                            >
                                <!---->
                                <div slot="prefix">
                                    <el-popover
                                        popper-class="my-none-el-popover"
                                        placement="left"
                                        @show="showElSlider2Fun(true)"
                                        @hide="showElSlider2Fun(false)"
                                        trigger="click"
                                    >
                                        <el-slider
                                            :show-tooltip="false"
                                            vertical
                                            :value="showElSlider2 ? computeValueNumber(item.padingOrMargin,item2.name,'/[('+ item.unit +') ]/g') : null"
                                            @input="showElSlider2 ? directionFun(item,item2.name,$event,index) : null"
                                            :min="-1"
                                            :step="1"
                                            :max="750"
                                            input-size="mini"
                                            height="450px"
                                        >
                                        </el-slider>
                                        <i
                                            style="cursor: pointer"
                                            @tap="clearValue(item)"
                                            class="el-icon-circle-close el-input__icon adjust-size"
                                        ></i>
                                        <i
                                            slot="reference"
                                            style="cursor: pointer"
                                            class="el-icon-d-caret el-input__icon "
                                        ></i>
                                    </el-popover>
                                </div>
                                <!---->
                                <div
                                    slot="suffix"
                                    v-if="item.unit !== undefined"
                                >{{item.unit}}</div>
                            </el-input>
                        </el-form-item>
                    </div>
                    <el-divider v-if="item.showDirection">
                        <div
                            style="cursor: pointer;"
                            @click="paddingMarginDirectionFun(false,index)"
                        ><span style="font-size: 14px;color: #ccc">收起</span><i
                                class="el-icon-arrow-up"
                                style="color: #ccc"
                            ></i></div>
                    </el-divider>
                </template>
            </template>
        </div>
        <!-- <el-form-item label="样式配置" style="margin: 15px 0">
            <el-input class="style-json" type="textarea" v-model="iStyleJson" :autosize="{ minRows:6 }"></el-input>
        </el-form-item> -->
    </div>
</template>

<script>
import border from './border'
import { dIndex, arrIndex, borderList } from '@/common/js/styleExternalData'

export default {
    name: 'stylePanel',
    props: {
        value: {
            type: Object,
            default: () => { }
        },
        mode: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            showElSlider: false,
            showElSlider2: false,
            paddingMarginDirection: false,
            checkMOrP: '',
            arrIndex: arrIndex,
            borderList: borderList,
            borderListShow: false
        }
    },
    methods: {
        changePicker(key, val) {
            //选择风格的时候，更改组件id
            if (key !== 'cmptId') return
            this.$set(this.$store.state.currentCheckAttr.item, 'cmptId', val)
        },
        changeColor(val, key) {
            if (val === null) {
                delete this.value[key]
            }
        },
        showElSlider2Fun(showElSlider2) {
            this.showElSlider2 = showElSlider2
        },
        showElSliderFun(showElSlider) {
            this.showElSlider = showElSlider
        },
        clearValue({ key }) {
            this.value[key] = ''
            this.$emit('input', { ...this.value })
        },
        computeValue(item, key, unit, tt = '0') {
            //二开 忽略上下边距,截取左右边距数值
            if (key === 'margin') {
                let val = item[key] && item[key].split(' ')[1]
                return val ? val.replace(eval(unit), '') : ''
            }
            //修改如果配置unit为空时候，不执行单位替换
            if (unit === '//g') return item[key]
            return item[key] ? item[key].replace(eval(unit), '') : ''
        },
        computeValueNumber(item, key, unit) {
            if (item[key]) {
                return parseFloat(item[key].replace(eval(unit), ''))
            }
        },
        /**
         * 校验样式依赖关系
         * 控制是否显示
         */
        haveMustCheck(item) {
            let { must } = item
            if (must) {
                let { key, value } = must
                let parent = this.value[key]
                if (parent && parent === value) {
                    return true
                }
                return false
            } else {
                return true
            }
        },
        arr2four(index, arr) {
            let newArr = arr
            if (index === 2) {
                newArr = [arr[0], arr[1], arr[0], arr[1]]
            }
            if (index === 1) {
                newArr = [arr[0], arr[0], arr[0], arr[0]]
            }
            if (index === 0) {
                newArr = [0, 0, 0, 0]
            }
            return newArr
        },
        directionFun(item, d, val, index) {
            val = val.toString()
            this.$set(item.padingOrMargin, d, val)

            let mp = this.formList[index].key
            let style = this.value
            let arrStyle = []
            if (style[mp]) {
                arrStyle = this.computeValue(style, mp, '/' + item.unit + '/g').split(" ")
            }
            arrStyle = this.arr2four(arrStyle.length, arrStyle)
            if (typeof val === 'string') {
                arrStyle[dIndex[d]] = val.replace(/ /g, '')
            }
            let styleMp = arrStyle.join(item.unit + ' ')
            style[mp] = styleMp + item.unit
            this.$emit('input', { ...style })
        },
        paddingMarginDirectionFun(flag, index) {
            this.checkMOrP = this.formList[index].key
            this.formList[index].showDirection = flag
            this.computedMarginOrPadding(this.value[this.formList[index].key], index)
        },
        paddingChange(val, index) {
            this.computedMarginOrPadding(val, index)
        },
        inputChangeUnit(e, { key, unit }, index) {
            this.formList[index].unit = e
            this.$store.commit('editFromStyleList', { index, value: this.formList[index] })
            if (this.value[key] !== undefined) {
                this.value[key] = this.value[key].replace(unit, e)
            }
            this.$emit('input', { ...this.value })
        },
        changeInputSizeBySlider(e, { key, unit }) {
            if (e === '') {
                return
            }
            if (e !== 0) {
                this.value[key] = e + unit
            }
            this.$emit('input', { ...this.value })
        },
        inputChange(e, { key, haveDirection, unit }) {
            if (e !== '') {
                this.value[key] = e
                if (haveDirection === true) {
                    let arrE = e.split(' ')
                    this.value[key] = arrE.join(unit + ' ')
                }
                //二开 增设上下margin为0
                if (key === 'margin') {
                    this.value[key] = `0 ${this.value[key]}`
                }
                this.value[key] += unit
            } else {
                delete this.value[key]
            }
            this.$emit('input', { ...this.value })
        },
        computedMarginOrPadding(val, index) {
            if (!val || val === '') {
                this.formList[index].padingOrMargin.top = ''
                this.formList[index].padingOrMargin.buttom = ''
                this.formList[index].padingOrMargin.left = ''
                this.formList[index].padingOrMargin.right = ''
                return
            }
            val = val.toString().trim()
            let arrVal = val.split(" ")
            if (arrVal.length === 1) {
                this.formList[index].padingOrMargin.top = arrVal[0]
                this.formList[index].padingOrMargin.buttom = arrVal[0]
                this.formList[index].padingOrMargin.left = arrVal[0]
                this.formList[index].padingOrMargin.right = arrVal[0]
            } else if (arrVal.length === 2) {
                this.formList[index].padingOrMargin.top = arrVal[0]
                this.formList[index].padingOrMargin.buttom = arrVal[0]
                this.formList[index].padingOrMargin.left = arrVal[1]
                this.formList[index].padingOrMargin.right = arrVal[1]
            } else if (arrVal.length === 4) {
                this.formList[index].padingOrMargin.top = arrVal[0]
                this.formList[index].padingOrMargin.buttom = arrVal[2]
                this.formList[index].padingOrMargin.left = arrVal[3]
                this.formList[index].padingOrMargin.right = arrVal[1]
            } else {
                this.formList[index].padingOrMargin.top = ''
                this.formList[index].padingOrMargin.buttom = ''
                this.formList[index].padingOrMargin.left = ''
                this.formList[index].padingOrMargin.right = ''
            }
        },
        deepFindItem(cmptId) {
            //遍历所有组件配置并取消分组放入到同一个数组中
            const allComponentsInfo = [].concat(...Object.values(this.$store.state.componentsInfo).map(o => o))
            // 直接遍历最外层看是否存在这个组件,不存在这个组件的话可能是风格配置选择出来的
            let curCmpt = allComponentsInfo.find(cmpt => cmpt.cmptId === cmptId)
            if (!curCmpt) {
                // 这边是找风格配置里面是否有这个组件名称
                curCmpt = allComponentsInfo.find(cmpt => cmpt.propsParam && cmpt.propsParam.find(pro => pro.key === 'cmptId' && pro.select.find(o => o.value === cmptId)))
            }
            // 如果这个值还是为空的话，说明配置已经被移除，该组件应该被删除
            return curCmpt || {}
        }
    },
    computed: {
        formList() {
            return this.mode ? this.propsParam : this.$store.state.currentCheckAttr.formList
        },
        propsParam() {
            const { cmptId } = this.$store.state.currentCheckAttr.item || {}
            const { propsParam, stylePropsParam = {} } = this.deepFindItem(cmptId)
            return propsParam ? [...propsParam, ...(stylePropsParam[cmptId] ? stylePropsParam[cmptId] : [])] : []
        },
        list() {
            return this.$store.state.list
        },
        iStyleJson: {
            get() {
                this.$store.dispatch('cachesFolder')
                return JSON.stringify(this.value, null, '    ')
            },
            set(val) {
                this.$emit('input', JSON.parse(val))
            }
        },
    },
    components: {
        border
    }
}
</script>

<style scoped>
.i-form-item {
    width: 50%;
}

.form-line {
}

.style-json {
}

.adjust-size {
    line-height: normal;
    margin-top: 10px;
    width: 38px;
    font-size: 1.3em;
}
</style>

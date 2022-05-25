<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-21 15:33:59
-->
<template>
    <div class="right-common-set-item">
        <el-form
            ref="form"
            label-width="auto"
            size="mini"
            @submit.native.prevent
        >
            <template v-for="(item, index) in value">
                <el-form-item
                    v-if="showItem_(item)"
                    :key="index"
                    :label-width="item.labelWidth || '72px'"
                    :label="item.label"
                    align="right"
                    :class="['el-form-item__' + item.type,
                item.type === 'switch' && options_(item).length > 4 ? 'el-slider__switch--column': '',
                hasImg_(item) ? 'el-slider__switch--img' : '',
                item.notLabelWidth ? 'el-slider__switch--notlabelwidth' : ''
                ]"
                >
                    <!-- 输入框组件 -->
                    <el-input
                        class="el-input__text"
                        v-if="item.type == 'text'"
                        v-bind="item"
                        v-model="item.value"
                        :show-word-limit="!!item.maxlength"
                        :maxlength="item.maxlength"
                        size="mini"
                    ></el-input>
                    <el-input-number
                        class="el-input-number__number"
                        v-else-if="item.type == 'number'"
                        v-bind="item"
                        v-model="item.value"
                        controls-position="right"
                        size="mini"
                    ></el-input-number>
                    <!-- 拖动设置组件 -->
                    <el-slider
                        class="el-slider__slider"
                        v-else-if="item.type === 'slider'"
                        v-bind="item"
                        v-model="item.value"
                        :show-input-controls="false"
                        :format-tooltip="() => {
                            return sliderFormat(item)
                        }"
                        show-input
                        input-size="mini"
                    ></el-slider>
                    <!-- 固定颜色切换 -->
                    <div v-else-if="item.type === 'radio-color'">
                        <base-radio-color
                            v-bind="item"
                            v-model="item.value"
                        ></base-radio-color>
                    </div>
                    <div v-else-if="item.type === 'radio-text'">
                        <base-radio-text
                            v-bind="item"
                            :extraOpt="extraOpt_(item)"
                            :options="options_(item)"
                            v-model="item.value"
                        ></base-radio-text>
                    </div>
                    <!-- 按钮式切换组件 -->
                    <base-checkbox
                        v-else-if="item.type === 'checkbox'"
                        v-bind="item"
                        :extraOpt="extraOpt_(item)"
                        :options="options_(item)"
                        v-model="item.value"
                    />
                    <!-- 按钮式切换组件 -->
                    <base-switch
                        v-else-if="item.type === 'switch'"
                        :extraOpt="extraOpt_(item)"
                        v-bind="item"
                        :options="options_(item)"
                        v-model="item.value"
                    />
                    <!-- 上传图片组件 -->
                    <base-upload
                        v-else-if="item.type === 'upload'"
                        v-bind="item"
                        v-model="item.value"
                    ></base-upload>
                    <!-- 魔方组件 -->
                    <base-magic-square
                        v-else-if="item.type === 'magic-square'"
                        v-bind="item"
                        v-model="item.value"
                    ></base-magic-square>
                    <base-req-classify
                        v-else-if="item.type === 'req-classify'"
                        v-bind="item"
                        v-model="item.value"
                        @select="goDialog(item, index)"
                    ></base-req-classify>
                    <base-req-select
                        :ref="`reqSelect${index}`"
                        v-else-if="item.type === 'req-select'"
                        v-bind="item"
                        v-model="item.value"
                        @setting="goSetting(item)"
                        @change="changeTimeStamp"
                    ></base-req-select>
                    <!-- 时间选择器 -->
                    <base-time-picker
                        v-else-if="item.type === 'date-time-range'"
                        v-model="item.value"
                    />
                    <!-- 颜色选择器 -->
                    <base-color-picker
                        v-else-if="item.type === 'color'"
                        v-model="item.value"
                    ></base-color-picker>
                    <!-- 富文本 -->
                    <base-rich-text-new
                        v-else-if="item.type === 'rich-text'"
                        v-model="item.value"
                    />
                    <!-- 上传视频组件 -->
                    <base-upload-video
                        v-else-if="item.type === 'video'"
                        v-bind="item"
                        v-model="item.value"
                    ></base-upload-video>
                    <!-- 去配置 -->
                    <base-setting
                        v-else-if="item.type === 'setting'"
                        @click="goSetting"
                        v-bind="item"
                    />
                    <!-- 优惠券列表 -->
                    <base-drag-list
                        v-else-if="item.type === 'drag-list'"
                        v-model="item.value"
                        v-bind="item"
                    />
                    <!-- 去配置 -->
                    <base-select-goods
                        v-else-if="item.type === 'goods'"
                        v-bind="item"
                        v-model="item.value"
                        @select="goDialog(item, index)"
                        @input="handleChange($event, index)"
                    />
                    <!-- 优惠券 -->
                    <base-coupons
                        v-else-if="item.type === 'coupons'"
                        v-bind="item"
                        v-model="item.value"
                        @select="goDialog(item, index)"
                    />
                    <!-- 模态框去选择 -->
                    <div
                        v-else-if="item.type === 'dialog'"
                        @click="goDialog(item, index)"
                    >
                        <el-button
                            size="mini"
                            type="text"
                        >{{item.settingText}}</el-button>
                    </div>
                    <!-- 模块设置分割 -->
                    <el-divider v-else-if="item.type === 'divider'">{{item.dividerText}}</el-divider>
                    <!-- 选择链接 -->

                    <base-links
                        v-else-if="item.type === 'links'"
                        v-bind="item"
                        v-model="item.value"
                    />

                    <base-form
                        v-else-if="item.type === 'form'"
                        v-bind="item"
                        v-model="item.value"
                        @select="goDialog($event, index)"
                    />

                    <base-upload-bg-img
                        v-else-if="item.type === 'upload-bg-img'"
                        v-bind="item"
                        v-model="item.value"
                    />

                    <!-- alert提示 -->
                    <div v-else-if="item.type === 'alert'">
                        <el-alert
                            :title="item.text"
                            type="error"
                            :style="[item.style]"
                        >
                        </el-alert>
                    </div>

                    <!-- 分类组件 -->
                    <base-select-category
                        v-else-if="item.type === 'category'"
                        v-bind="item"
                        v-model="item.value"
                        :min="item.min"
                        :max="item.max"
                        @select="goDialog(item, index)"
                        @input="handleChange($event, index)"
                    />

                    <!-- 关键词组件 -->
                    <base-select-keyword
                        v-else-if="item.type === 'keyword'"
                        v-bind="item"
                        v-model="item.value"
                        :min="item.min"
                        :max="item.max"
                        @input="handleChange($event, index)"
                    />
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script>
import { formatItemData, getSimpleValue } from '@/utils/drag'
export default {
    data() {
        return {
            formList: {},
            reqList: [],
            componentInfo: {},
            roomThreeFlag: true,
            modifyIndex: -1
        }
    },
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        // 整个组件不能点击
        extraOpt_() {
            return item => {
                let disabled = false
                let value = item.value
                if (item.disabledRule && item.disabledRule.length) {
                    for (let rule of item.disabledRule) {
                        if (rule.contains && rule.contains.length && rule.contains.includes(getSimpleValue(rule, this.componentInfo))) {
                            value = rule.value
                            disabled = true
                            break
                        }
                    }
                }
                return {
                    disabled,
                    value
                }
            }
        },
        // 部分配置不能点击
        options_() {
            return ({ options, type }) => {
                if (!['checkbox', 'switch', 'radio-text'].includes(type)) return []
                const newOptions = options && options.length ? options : [
                    { label: '否', value: 0 },
                    { label: '是', value: 1 }
                ]
                return newOptions.map(item => {
                    if (item.disabledRule && item.disabledRule.length) {
                        for (let rule of item.disabledRule) {
                            if (rule.contains && rule.contains.length && rule.contains.includes(getSimpleValue(rule, this.componentInfo))) {
                                item.disabled = true
                            } else {
                                item.disabled = false
                            }
                        }
                    }
                    return item
                })
            }
        },
        showItem_() {
            return item => {
                if (String(item.show) === 'false') return false
                // 如果所有项都不能点击则隐藏该选项
                const options = this.options_(item)
                if (options.length > 0 && options.length === options.filter(o => o.disabled).length) return false
                if (!item.show) return true
                // 这边要判断上级是否显示
                let parentShow_ = true
                if (item.show) {
                    const parent_ = this.value.find(o => o.pro === item.show.pro && o.key === item.show.key)
                    parentShow_ = String(parent_.show) === 'false' ? true : this.showItem_(parent_)
                }
                return parentShow_ && item.show.contains.includes(getSimpleValue(item.show, this.componentInfo))
            }
        },
        // 是否含有图片
        hasImg_() {
            return item => {
                return this.options_(item)[0] && !!this.options_(item)[0].img
            }
        },
        selOptionsText_() {
            return item => {
                if (!['switch', 'radio-color', 'radio-text'].includes(item.type)) return ''
                return (this.options_(item).find(o => o.value === item.value) || this.options_(item)[0]).label
            }
        },
        moduleName_() {
            return this.componentInfo.module_name
        }
    },
    watch: {
        '$store.state.currentCheckAttr.componentInfo': {
            handler(val) {
                this.componentInfo = formatItemData(val)
            },
            deep: true,
            immediate: true
        },
    },
    created() {
        console.log(this, "value");
    },
    destroyed() {
        uni.$off('submitDialog')
    },
    methods: {
        sliderFormat({ value, unit }) {
            return value + unit
        },
        // 商品的value改变，可能会影响其他因数
        // 商品、分类排序变动
        handleChange(e, index) {
            this.modifyIndex = index
            this.handleSubmitDialog({
                detail: {
                    value: e
                }
            })
        },
        /**
         * 弹窗确定
         * value [String]要保存的值
         * extraObj [Array]额外修改的键值
        */
        handleSubmitDialog({ detail: { value = '', extraObj = [] } }) {
            // console.log('你点击了确定');
            const newValue = this.$deepClone(this.value)
            extraObj = extraObj.concat({
                ...newValue[this.modifyIndex],
                value
            })
            newValue.forEach(o => {
                const extraIndex = extraObj.findIndex(o1 => o.pro === o1.pro && o.key === o1.key)
                if (extraIndex !== -1) {
                    o.value = extraObj[extraIndex].value
                }
            })
            this.$emit('input', newValue)
        },
        goSetting(item) {
            let param = {
                module_name: this.moduleName_
            }
            parent.operation && parent.operation(param, (data) => {
                if (data == 0) {
                    let timeStamp = + new Date()
                    this.$store.dispatch('setComponentInfoKey', { key: 'timeStamp', value: timeStamp })
                    // 当type类型为req-select, 重新请求远端接口
                    this.value.forEach((o, i) => {
                        if (o.type === 'req-select') {
                            if (this.$refs[`reqSelect${i}`] && this.$refs[`reqSelect${i}`][0]) {
                                console.log(this.$refs[`reqSelect${i}`]);
                                this.$refs[`reqSelect${i}`][0].remoteMethod()
                            }
                        }
                    })
                }
            })
        },
        /**
         * 参数说明
         * dialogFlag 模态框弹窗变量
         * value 默认值
         * panelValue  弹窗对应的panel的name值（反显用的）
         * condition 弹窗的一些条件限制
        */
        goDialog({ dialogFlag, value, min = 0, max = 0 }, modifyIndex) {

            console.log(dialogFlag, value, min, max, "-----xxx");
            this.modifyIndex = modifyIndex
            const panelValue = (this.value.find(o => o.pro === 'apiParam' && o.key === 'idType') || {}).value
            uni.$off('submitDialog')
            uni.$emit('showDialog', {
                pro: dialogFlag,
                defaultValue: value,
                panelValue,
                condition: {
                    min, max
                }
            })
            uni.$once('submitDialog', this.handleSubmitDialog)
        },
        changeTimeStamp() {
            this.$store.dispatch('setTempTimeStamp', + new Date())
        }
    }
}
</script>
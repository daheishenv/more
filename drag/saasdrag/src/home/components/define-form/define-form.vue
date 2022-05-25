<style scoped lang="scss">
.define-form {
    background-size: 100% 100% !important;
    display: flex;
    justify-content: center;
    .form_warp {
        padding: 18upx;
    }
    .flex {
        display: flex;
        &.fix-mragin {
            margin: -10upx 0;
        }
        .items-title__mode {
            align-self: flex-start;
            flex-shrink: 0;
            font-size: 28upx;
            line-height: 80upx;
            color: #333333;
        }
        .flex-1 {
            flex: 1;
            width: auto;
            min-height: 80upx;
            display: flex;
            // align-items: center;
            .fix-style {
                flex: 1;
                width: 100%;
                display: flex;
                align-items: center;
            }
        }
        &__style1 {
            flex-direction: row;
        }
        &__style2 {
            flex-direction: column;
            .items-title__mode {
                line-height: 2;
            }
            .flex-1 {
                flex: 0 1 auto;
            }
        }
        &__style3 {
            border-radius: 8upx;
            .items-title__mode {
                padding: 0 24upx 0 18upx;
                box-sizing: border-box;
                position: relative;
                .style3-boder__line {
                    position: absolute;
                    height: 36upx;
                    top: 50%;
                    right: 0;
                    width: 2upx;
                    transform: translateY(-50%);
                }
            }
            .border {
                border: 0;
            }
        }
    }
    .submit-warp {
        margin: 0 auto;
    }
    .items-center {
        align-self: center;
        &--text {
            margin: 0 10upx;
        }
    }
}
</style>
<template>
    <view class="">
        <view
            v-if="cFinish && formList_.length"
            class="define-form"
            :style="[outerLayer_]"
        >
            <c-form
                ref="form"
                class="form_warp"
                :style="[innerLayer_]"
                @validate="validate"
            >
                <c-cell
                    v-for="(v,i) in formList_"
                    :key="i"
                    :border="false"
                    :cell-style="cellStyle_"
                >
                    <!--文本框 -->
                    <view
                        v-if="v.comName === 'c-input'"
                        class="flex"
                        :class="model_"
                        :style="[isStyle3Border_]"
                    >
                        <view
                            v-if="v.compoentDefine.type !== 'textarea' || !isStyle3_"
                            class="items-title__mode"
                            :style="[titleStyle_]"
                        >{{ v.compoentDefine.beforeText }}
                            <view
                                v-if="isStyle3_"
                                class="style3-boder__line"
                                :style="[borderLineColor_]"
                            ></view>
                        </view>
                        <view
                            class="flex-1"
                            :style="[inputWarp_]"
                        >
                            <view class="fix-style">
                                <!--
                                    :placeholder-style="placeholderStyle_"
                                -->
                                <c-input
                                    v-model="v.compoentDefine.value"
                                    :type="v.compoentDefine.type"
                                    style="width:100%"
                                    :text-area-style="textAreaPadding_"
                                    :placeholder="v.compoentDefine.placeholder"
                                    :before-width="extra_.itemLayer.width"
                                    :pattern="v.compoentDefine.pattern"
                                    :msg-name="v.compoentDefine.beforeText"
                                >
                                </c-input>
                            </view>
                            <view
                                v-if="v.compoentDefine.afterText"
                                :style="[suffixTextColor_]"
                                class="items-center items-center--text"
                            >{{ v.compoentDefine.afterText }}</view>
                        </view>
                    </view>
                    <!-- 下拉弹框 -->
                    <view
                        v-if="v.compoentDefine.popup"
                        class="flex"
                        :class="model_"
                        :style="[isStyle3Border_]"
                    >
                        <view
                            v-if="v.compoentDefine.type !== 'textarea'"
                            class="items-title__mode"
                            :style="[titleStyle_]"
                        >{{ v.compoentDefine.beforeText }}
                            <view
                                v-if="isStyle3_"
                                class="style3-boder__line"
                                :style="[borderLineColor_]"
                            ></view>
                        </view>
                        <view
                            class="flex-1"
                            :style="[inputWarp_]"
                        >

                            <view class="fix-style">
                                <!--
                                    :placeholder-style="placeholderStyle_"
                                -->
                                <c-input
                                    :value="v.compoentDefine.label"
                                    type="select"
                                    arrows
                                    style="width:100%"
                                    :placeholder="v.compoentDefine.placeholder"
                                    :before-width="extra_.itemLayer.width"
                                    :pattern="v.compoentDefine.pattern"
                                    :msg-name="v.compoentDefine.beforeText"
                                    @select="selectOpenPop(v,i)"
                                >
                                </c-input>
                            </view>
                        </view>
                    </view>
                    <!-- 单选 -->
                    <view
                        v-if="v.comName === 'c-radio' && !v.compoentDefine.popup"
                        class="flex"
                        :class="checkTapModel_"
                    >
                        <view
                            class="items-title__mode"
                            :style="[titleStyle_]"
                        >{{ v.compoentDefine.beforeText }}</view>
                        <view class="flex-1 fix-mragin">
                            <c-radio-group
                                v-model="v.compoentDefine.value"
                                :pattern="v.compoentDefine.pattern"
                                :msg-name="v.compoentDefine.beforeText"
                                :is-multiple="true"
                                @change="radioLineUpData(v,$event)"
                            >
                                <custom-radio
                                    v-for="(row, idx) in v.compoentDefine.list"
                                    :key="idx"
                                    :show-border="itemLayer_.showBorder"
                                    :active-color="itemLayer_.selColor"
                                    :name="row.value"
                                    :checked="row.checked"
                                >{{ row.label }}</custom-radio>
                            </c-radio-group>
                        </view>
                    </view>
                    <!-- 多选 -->
                    <view
                        v-if="v.comName === 'c-checkbox' && !v.compoentDefine.popup"
                        class="flex"
                        :class="checkTapModel_"
                    >
                        <view
                            class="items-title__mode"
                            :style="[titleStyle_]"
                        >{{ v.compoentDefine.beforeText }}</view>
                        <view class="flex-1 fix-mragin">
                            <c-checkbox-group
                                v-model="v.compoentDefine.value"
                                :max="v.compoentDefine.max"
                                :pattern="v.compoentDefine.pattern"
                                :msg-name="v.compoentDefine.beforeText"
                                @change="checkLineUpData(v,$event)"
                            >
                                <!--
                                :custom-style="itemLayer_.mode"
                            -->
                                <custom-checkbox
                                    v-for="(row,idx) in v.compoentDefine.list"
                                    :key="idx"
                                    :show-border="itemLayer_.showBorder"
                                    :active-color="itemLayer_.selColor"
                                    custom-style="style2"
                                    :name="row.value"
                                    :checked="row.checked"
                                >{{ row.label }}</custom-checkbox>
                            </c-checkbox-group>
                        </view>
                    </view>
                </c-cell>
                <!-- 提交按钮 -->
                <c-cell
                    :border="false"
                    :cell-style="cellStyle_"
                >
                    <view
                        class="submit-warp"
                        :style="[submitButtonStyle_]"
                    >
                        <c-colors
                            :theme="[itemLayer_.selColor,'#fff']"
                            :pro="['bgc','c']"
                            type="button"
                            :radius="outerLayer_.buttonBorderRadius"
                        >
                            <c-button
                                size="large"
                                @click="getSubmitData"
                            >{{ outerLayer_.buttonText }}</c-button>
                        </c-colors>
                    </view>
                </c-cell>

            </c-form>
            <!-- 城市弹框 -->
            <c-select-city
                v-model="cityPopFlag"
                :default-value="activePopData_.defaultList"
                :level="activePopData_.live"
                api-url="getRegionList"
                @confirm="handleCity"
            ></c-select-city>
            <!--自定义数据弹出层选择框-->
            <form-norm-popup
                v-model="selectFlag"
                :list="curPopupList_"
                :check-value="checkValue_"
                :options="activePopData_"
                :item-layer="itemLayer_"
                @submit="normPopupSubmit"
            />
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[outerLayer_]"
        >
            <c-image
                :src="`skeleton-screen/${config.module}_${mode_}.png`"
                width="100%"
                mode="widthFix"
            />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'

import formNormPopup from './form-norm-popup'
import customRadio from './custom-radio'
import customCheckbox from './custom-checkbox'

const normalizationFormData = (formData) => {
    return formData.map(v => {
        const { pattern, beforeText, label, value, prop } = v.compoentDefine
        return {
            tag: v.comName.replace('c-', ''),
            prop,
            value: prop === 'city' ? value : (label || value),
            label: beforeText,
            require: pattern === 'notnull'
        }
    })
}
const where = (is, condition1, condition2 = () => { return {} }) => {
    return is ? condition1() : condition2()
}

export default {
    name: 'DefineForm',
    components: { formNormPopup, customRadio, customCheckbox },
    mixins: [homeComponentMixins],
    props: {
        apiUrl: {
            type: String,
            default: 'getRegion'
        },
        formApi: {
            type: String,
            default: 'saveForm'
        }
    },
    data() {
        return {
            cData: [],
            loading: false,
            selectIndex: -1,
            selectFlag: false,
            formListRef: [],
            cityPopFlag: false// 城市弹框开关
        }
    },
    computed: {
        textAreaPadding_() {
            // #ifdef MP-WEIXIN
            if (uni.getSystemInfoSync().platform === 'ios') {
                return { 'padding-top': '6rpx', 'padding-left': '3rpx' }
            }
            // #endif
            return {
                'padding-top': '20rpx'
            }
        },
        newOuterLayer_() {
            return {
                ...this.outerLayer_,
                [parseInt(this.outerLayer_.isBGC) === 0 ? 'backgroundImage' : 'backgroundColor']:
                    parseInt(this.outerLayer_.isBGC) === 0 ? `url(${this.frontOssImgUrl_ + this.outerLayer_.backgroundImage})` : this.outerLayer_.backgroundColor
            }
        },
        activePopData_() {
            const activePop = this.formListRef[this.selectIndex]
            return activePop ? activePop.compoentDefine : {}
        },
        curPopupList_() {
            return this.activePopData_.list || []
        },
        checkValue_() {
            const value = this.activePopData_.value
            if (Array.isArray(value)) {
                return value
            } else {
                return value ? [value] : []
            }
        },
        titleStyle_() {
            return { ...this.itemLayer_, backgroundColor: 'transparent' }
        },
        formList_() {
            return this.extra_.formList
        },
        model_() {
            return `flex__${this.extra_.mode}`
        },
        isStyle3_() {
            return this.model_.includes('style3')
        },
        checkTapModel_() {
            return this.isStyle3_ ? 'flex__style1' : this.model_
        },
        cellStyle_() {
            return {
                padding: '12rpx',
                ...this.itemLayer_,
                width: '100%',
                backgroundColor: 'transparent'
            }
        },
        submitButtonStyle_() {
            return {
                'margin-top': '48rpx', // this.outerLayer_.buttonGap,
                'width': this.outerLayer_.buttonWidth
            }
        },
        /**
         * 设置input的外部盒子背景和线条
         */
        inputWarp_() {
            return {
                borderRadius: `8rpx`,
                backgroundColor: this.itemLayer_.backgroundColor,
                ...where(!this.isStyle3_, () => {
                    return {
                        border: `2rpx solid ${this.itemLayer_.borderColor}`
                    }
                })
            }
        },
        /**
         * 样式3设置外部的线条颜色
         */
        isStyle3Border_() {
            return where(this.isStyle3_, () => {
                return {
                    border: `2rpx solid ${this.itemLayer_.borderColor}`,
                    backgroundColor: this.itemLayer_.backgroundColor,
                    borderRadius: `8rpx`
                }
            })
        },
        lightColor_() {
            const rgb = this.itemLayer_.color.replace(/(?:\(|\)|rgba|RGBA)*/g, '').split(',')
            rgb.pop()
            return `rgba(${rgb.join(',')},${0.5})`
        },
        /**
         * 设置样式3分割线的颜色跟随标题的减少60%的颜色
         */
        borderLineColor_() {
            return {
                'background': this.lightColor_
            }
        },
        // placeholderStyle_() {
        //     return `color:${this.lightColor_} !important`
        // },
        suffixTextColor_() {
            return {
                color: this.itemLayer_.color
            }
        }
    },
    watch: {
        formList_: {
            deep: true,
            immediate: true,
            handler(val, ordValue) {
                this.formListRef = val
            }
        }
    },
    created() {
        console.log(this.extra_, '-----')
    },
    methods: {
        finishData(data) {
            this.$emit('backNotice', data)
        },
        radioLineUpData(item, event) {
            item.compoentDefine.label = item.compoentDefine.list.find(v => {
                return v.value === event.detail.value
            }).label

            item.compoentDefine.value = event.detail.value
        },
        checkLineUpData(item, event) {
            item.compoentDefine.label = item.compoentDefine.list.filter(v => {
                return event.detail.value.some(k => k === v.value)
            }).map(v => v.label).join(',')

            item.compoentDefine.value = event.detail.value
        },
        async validate(e) {
            if (Object.values(e.detail).every(v => v.validate) && !this.loading) {
                this.loading = true
                try {
                    const { msg } = await this.$http(this.formApi, {
                        form_data: normalizationFormData(this.formList_),
                        module_name: 'form',
                        tag: 10,
                        page_id: this.$Route.query.detailId || ''
                    })
                    this.$toast(msg)
                } catch (e) {
                    console.log(e)
                }
                this.loading = false
            }
        },
        getSubmitData(e) {
            this.$refs.form.validateOnce()
        },
        selectOpenPop(item, i) {
            if (item.compoentDefine.popup) {
                if (item.comName !== 'c-select-city') {
                    // 普通弹框的
                    this.selectFlag = true
                } else {
                    // 城市弹框的
                    this.cityPopFlag = true
                }
                this.selectIndex = i
            }
        },
        normPopupSubmit(e) {
            this.activePopData_.value = e.detail.value
            this.activePopData_.label = e.detail.label
            this.activePopData_.list.forEach(v => {
                if (e.detail.value.includes(v.value)) {
                    v.checked = true
                } else {
                    v.checked = false
                }
            })
            this.selectIndex = -1
        },
        handleCity(e) {
            const key = ['province', 'city', 'district', 'town']
            this.activePopData_.value = e.detail
            this.activePopData_.label = key.map(v => e.detail[v] ? e.detail[v].label : void 0).filter(v => v).join(',')
            this.selectIndex = -1
        }
    }
}
</script>

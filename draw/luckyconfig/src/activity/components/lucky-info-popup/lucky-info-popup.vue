<template>
    <view>
        <c-popup
            v-model="showPopup"
            mode="bottom"
            radius="24rpx 24rpx 0 0"
        >
            <view class="c-modal__title">填写资料</view>
            <view class="info">
                <c-form
                    ref="form"
                    @submit="!isDemo?handleSubmit():''"
                    @validate="validate"
                >
                    <c-cell-group>
                        <template v-for="(item, index) in inputGroup">
                            <c-cell
                                v-if="item.type === 'select'"
                                :key="index"
                                :border="item.border"
                            >
                                <c-input
                                    :value="selectObj_[item.selectProp]"
                                    :name="item.prop"
                                    :before-width="item.beforeWidth"
                                    :before-style="beforeStyle"
                                    :type="item.type"
                                    :pattern="item.pattern"
                                    :msg-name="item.msgName"
                                    :disabled="item.disabled"
                                    :placeholder="item.placeholder"
                                    @select="!isDemo?handleSelect($event, item.handler):''"
                                >
                                    <view slot="before">{{ item.label }}</view>
                                </c-input>
                            </c-cell>
                            <c-cell
                                v-else
                                :key="index"
                                :border="true"
                            >
                                <c-input
                                    v-model="temp[item.prop]"
                                    :name="item.prop"
                                    :type="item.type"
                                    :decimal="item.decimal"
                                    :before-width="item.beforeWidth"
                                    :before-style="beforeStyle"
                                    :maxlength="item.maxlength"
                                    :pattern="item.pattern"
                                    :msg-name="item.msgName"
                                    :disabled="item.disabled"
                                    :placeholder="item.placeholder"
                                >
                                    <view slot="before">{{ item.label }}</view>
                                    <c-send-sms-code
                                        v-if="item.needSend"
                                        ajax-name="bigWheelSendSmsCode"
                                        :ajax-params="ajaxParams_"
                                        phone-key="mobile"
                                    />
                                </c-input>
                            </c-cell>
                        </template>
                    </c-cell-group>
                    <c-fixed-menu
                        position="bottom"
                        height="136"
                    >
                        <view class="flex p24">
                            <view class="flex-1">
                                <c-colors
                                    :theme="['t', '#fff']"
                                    :pro="['bgc', 'c']"
                                    type="button"
                                >
                                    <c-button
                                        size="large"
                                        radius="16"
                                        form-type="submit"
                                    >确定</c-button>
                                </c-colors>
                            </view>
                        </view>
                    </c-fixed-menu>
                </c-form>
            </view>
        </c-popup>
        <c-select-city
            v-if="!isDemo"
            v-model="selectCityFlag"
            :default-value="defaultValue_"
            @confirm="sureLocal"
        />
    </view>
</template>

<script>
import validateReg from '@/common/utils/validate.js'
export default {
    props: {
        demoTemp: { // 在后台使用的时候的示例值
            type: Object,
            default() {
                return {}
            }
        },
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        },
        prize: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        const beforeWidth = 160
        return {
            detailId: null,
            selectCityFlag: false,
            beforeStyle: {
                fontSize: '28rpx',
                lineHeight: '40rpx',
                color: '#333'
            },
            showPopup: this.value,
            temp: {
                user_name: '',
                mobile: '',
                verify_code: '',
                local: '',
                address: ''
            },
            inputGroup: [
                {
                    beforeWidth,
                    label: '姓名',
                    maxlength: '20',
                    pattern: 'name',
                    type: 'text',
                    msgName: '姓名',
                    value: '',
                    prop: 'user_name',
                    disabled: this.isDemo,
                    placeholder: '请输入姓名'
                }, {
                    beforeWidth,
                    label: '手机号',
                    maxlength: '11',
                    pattern: 'mobile',
                    msgName: '手机号',
                    value: '',
                    type: 'number',
                    disabled: this.isDemo,
                    prop: 'mobile',
                    placeholder: '请输入手机号'
                },
                // {
                //     needSend: true,
                //     beforeWidth,
                //     label: '验证码',
                //     maxlength: '6',
                //     pattern: 'notnull',
                //     type: 'text',
                //     msgName: '验证码',
                //     value: '',
                //     prop: 'verify_code',
                //     disabled: this.isDemo,
                //     placeholder: '请输入验证码'
                // },
                {
                    beforeWidth,
                    label: '所在地区',
                    pattern: 'notnull',
                    msgName: '所在地区',
                    type: 'select',
                    selectProp: 'local',
                    placeholder: '请选择省/市/区/街道',
                    disabled: true,
                    value: '',
                    handler: 'handleSelectLocal'
                }, {
                    beforeWidth,
                    label: '详情地址',
                    pattern: 'notnull',
                    type: 'text',
                    msgName: '详情地址',
                    disabled: this.isDemo,
                    value: '',
                    prop: 'address',
                    placeholder: '请输入街道详情地址'
                }, {
                    beforeWidth,
                    label: '邮箱',
                    pattern: '',
                    type: 'text',
                    msgName: '邮箱',
                    disabled: this.isDemo,
                    value: '',
                    prop: 'email',
                    placeholder: '请输入邮箱地址'
                }]
        }
    },
    computed: {
        selectObj_() {
            console.log(this.temp.province)
            return {
                local: this.temp.province ? `${this.temp.province} ${this.temp.city} ${this.temp.district}` : ''
            }
        },
        defaultValue_() {
            if (this.temp.province) {
                return [{
                    value: this.temp.province_id,
                    label: this.temp.province
                }, {
                    value: this.temp.city_id,
                    label: this.temp.city
                }, {
                    value: this.temp.district_id,
                    label: this.temp.district
                }]
            } else {
                return []
            }
        },
        ajaxParams_() {
            return {
                mobile: this.temp.mobile,
                type: 3,
                member_type: 9
            }
        }
    },
    watch: {
        value(nValue) {
            this.showPopup = nValue
        },
        showPopup(nValue) {
            this.$emit('input', nValue)
        }
    },
    created() {
        if (this.isDemo) {
            this.temp = this.demoTemp
        } else {
            this.getAllAddress()
        }
        const { detailId } = this.$Route.query
        this.detailId = detailId
    },
    methods: {
        // 获取用户的所有地址
        async getAllAddress() {
            const { data } = await this.$http('getUserShippingAddress', { big_wheel_user_prize_id: this.prize.id })
            // const temp = data.list.find(o => {
            //     return o.is_default === 1
            // }) || data.list[0] || null

            if (data) {
                this.temp = Object.assign({}, this.temp, {
                    user_name: data.user_name,
                    mobile: data.mobile,
                    local: data.local,
                    address: data.address,
                    province: data.province,
                    province_id: data.province_id,
                    city: data.city,
                    city_id: data.city_id,
                    district: data.district,
                    district_id: data.district_id
                })
            }
        },
        async validate(e) { // 表单验证通过
            if (Object.values(e.detail).every(v => v.validate)) {
                const temp = Object.assign({}, this.temp, {
                    big_wheel_user_prize_id: this.prize.id
                })
                if (temp.email && !validateReg('email', temp.email)) {
                    this.$toast('邮箱地址有误')
                    return
                }
                delete temp.province
                delete temp.district
                delete temp.local
                delete temp.city
                const { data } = await this.$http('editUserActivityAddress', { ...temp })
                this.$emit('success', {
                    ...data,
                    index: this.prize.index
                })
                this.showPopup = false
                this.$toast('领取成功')
            }
        },
        handleSubmit(e) { // 提交验证
            this.$refs.form.validateOnce()
        },
        sureLocal(e) { // 选择完城市回调
            const { detail } = e
            const local = {
                province: detail.province.label,
                province_id: detail.province.value,
                city: detail.city.label,
                city_id: detail.city.value,
                district: detail.district.label,
                district_id: detail.district.value
            }
            this.temp = Object.assign({}, this.temp, local)
            console.log(this.temp)
        },
        handleSelect(e, handler) { // 事件转发
            this[handler](e)
        },
        handleSelectLocal() { // 打开选择城市弹窗
            this.selectCityFlag = true
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:01:01
-->
<template>
    <view class="second-step">
        <div style="margin-bottom: 20px">
            <el-button
                size="small"
                @click="addTab(editableTabsValue)"
            >
                新增奖品
            </el-button>
        </div>
        <el-tabs
            v-model="editableTabsValue"
            type="card"
            @tab-remove="removeTab"
            :closable="true"
        >
            <el-tab-pane
                v-for="(item) in secondData"
                :key="item.name"
                :label="item.tipName"
                :name="item.name"
            >
                <el-form
                    ref="secondForm"
                    :model="item"
                    label-width="100px"
                    :rules="rules"
                    size="small"
                    :disabled="noIsEdit_"
                >
                    <div class="c-el-module__title">基本选项</div>
                    <el-divider class="c-el-module__divider-h"></el-divider>
                    <el-form-item label="奖品类型">
                        <el-select
                            v-model="item.prize_type"
                            placeholder="请选择"
                            size="small"
                            @change="handleSelectChange(item)"
                        >
                            <el-option
                                v-for="val in prizeTypeList"
                                :key="val.value"
                                :label="val.label"
                                :value="val.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-if="item.prize_type === 2"
                        label="优惠卷"
                        prop="discountsCheckData"
                        key="discountsCheckData"
                    >
                        <div style="margin-bottom: 10px">
                            <el-button @click="handleAddcoupon(item)">添加优惠券</el-button>
                            <span class="ext-text">最多可以添加1种</span>
                        </div>
                        <check-discounts-table
                            v-if="item.discountsCheckData && item.discountsCheckData.length"
                            v-model="item.discountsCheckData"
                        />
                    </el-form-item>
                    <!-- 中奖限制 -->
                    <el-form-item
                        v-if="item.prize_type === 3"
                        label="赠送"
                        prop="points"
                        key="points"
                    >
                        <el-input-number
                            v-model="item.points"
                            controls-position="right"
                            :min="1"
                        ></el-input-number>
                        <span class="ext-text">积分</span>
                    </el-form-item>
                    <el-form-item
                        label="奖品名称"
                        prop="prize_name"
                        key="prize_name"
                    >
                        <el-input
                            v-model="item.prize_name"
                            type="text"
                            placeholder="不能超过25个字"
                            maxlength="25"
                            show-word-limit
                            size="small"
                            class="maxWidth"
                        ></el-input>
                    </el-form-item>
                    <!-- 中奖限制 -->
                    <el-form-item
                        label="中奖限制"
                        prop="prize_limit"
                        key="prize_limit"
                    >
                        <el-input-number
                            v-model="item.prize_limit"
                            controls-position="right"
                            :min="1"
                        ></el-input-number>
                        <span class="ext-text">次/人</span>
                    </el-form-item>
                    <!-- 奖品数量 -->
                    <el-form-item
                        v-if="item.prize_type === 1 || item.prize_type === 3"
                        label="奖品数量"
                        prop="prize_num"
                        key="prize_num"
                    >
                        <el-input-number
                            v-model="item.prize_num"
                            controls-position="right"
                            :min="1"
                        ></el-input-number>
                        <span class="ext-text">个</span>
                    </el-form-item>
                    <el-form-item label="奖品图片">
                        <ImgUpload
                            v-model="item.prize_img"
                            type="rewardImg"
                            width="130px"
                            height="130px"
                            :disabled="noIsEdit_"
                            :defaultImg="item.defaultImg"
                        />
                    </el-form-item>
                    <el-form-item
                        label="奖品说明"
                        prop="prize_desc"
                        key="prize_desc"
                    >
                        <el-input
                            type="textarea"
                            placeholder="可输入奖品数量、发放规则、注意事项等"
                            v-model="item.prize_desc"
                            size="small"
                            class="maxWidth"
                        ></el-input>
                    </el-form-item>
                    <template>
                        <div class="c-el-module__title">兑换选项（设置奖品兑换方式）</div>
                        <el-divider class="c-el-module__divider-h"></el-divider>
                        <el-form-item label="兑奖方式">
                            <div>
                                <el-radio
                                    v-model="item.receive_prize_way"
                                    :label="1"
                                    disabled
                                >邮寄兑奖</el-radio>
                                <el-radio
                                    v-model="item.receive_prize_way"
                                    :label="2"
                                    disabled
                                >直接发放</el-radio>
                            </div>
                        </el-form-item>
                        <div v-if="item.prize_type === 1">
                            <el-form-item label="兑换期限">
                                <el-date-picker
                                    v-model="item.dateTime"
                                    type="datetimerange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptions"
                                    size="small"
                                    autocomplete="off"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </template>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <!-- 优惠卷弹框 -->
        <add-discounts
            v-model="discountsFlag"
            @submit="handleDiscountsSubmit"
        />
    </view>
</template>

<script>
import ImgUpload from "./components/ImgUpload";
import AddDiscounts from "./components/AddDiscounts";
import CheckDiscountsTable from "./components/CheckDiscountsTable";
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import { getQueryVariable, formatDate } from '@/common/utils/utils'
export default {
    name: "second-step", // 步骤二
    data() {
        return {
            discountsFlag: false,//优惠卷弹框开关
            // discountsCheckData: [],//优惠卷提交数据
            formValid: [], // 多个表单验证
            addable: true, // 是否可增加tab标签
            editableTabsValue: "1",
            secondData: [], // 步骤二 奖品设置数据
            tabIndex: 1,
            pickerOptions: {
                disabledDate: (time) => {
                    // 设置禁用状态，参数为当前日期，要求返回 Boolean 返回为true禁用
                    // 只能选择大于今天的日期
                    const curTime = dayjs(dayjs().format('YYYY-MM-DD')).valueOf()
                    return curTime > dayjs(time).valueOf()
                }
            },
            prizeTypeList: [ // 奖品类型
                {
                    value: 1,
                    label: '实物奖品'
                },
                {
                    value: 2,
                    label: '优惠券'
                },
                {
                    value: 3,
                    label: '会员奖品-积分'
                }
                // {
                //     value: 4,
                //     label: '谢谢参与'
                // }
            ],
            rules: {
                prize_name: [
                    { required: true, message: "请输入奖品名称", trigger: "blur" },
                ],
                prize_num: [
                    { required: true, message: "请输入奖品数量", trigger: "blur" },
                ],
                prize_desc: [
                    { required: true, message: "请输入奖品说明", trigger: "blur" },
                ],
                prize_limit: [
                    { required: true, message: '中奖限制不能为空', trigger: 'blur' },
                ],
                points: [
                    { required: true, message: '积分不能为空', trigger: 'blur' },
                ],
                discountsCheckData: [
                    { required: true, message: '优惠券不能为空', trigger: 'blur' },
                ]
            },
        };
    },
    components: {
        ImgUpload,
        AddDiscounts,
        CheckDiscountsTable
    },
    watch: {
        secondData: {
            handler(val) {
                this.$c.throttle(() => {
                    this.$store.dispatch('setSecondStepData', val)
                }, 500)
            },
            deep: true
        },
        '$store.state.project.stepStatusInfo.step': {
            handler(val) {
                if (val === 'second') {
                    this.handleGetData()
                }
            },
            deep: true
        },
        firstStepData: {
            handler(val) {
                this.secondData.forEach((v) => {
                    if (!v.receive_prize_start_time) v.receive_prize_start_time = val.start_time //兑奖开始时间
                    if (!v.receive_prize_end_time) v.receive_prize_end_time = val.end_time //兑奖结束时间
                    v.dateTime = [v.receive_prize_start_time || val.start_time, v.receive_prize_end_time || val.end_time] // 活动开始结束时间
                })
            }
        }
    },
    computed: {
        ...mapState({
            firstStepData: state => state.project.firstStepData,
            secondStepData: state => state.project.secondStepData
        }),
        noIsEdit_() {
            return !this.firstStepData.is_edit
        }
    },
    created() {
        this.handleGetData()
    },
    methods: {
        async handleGetData() {
            const { data } = await this.$http('prizeSetInfo', {
                big_wheel_activity_id: getQueryVariable('big_wheel_activity_id'),
                is_thank_prize: 0
            })
            // 后端没返回没数据默认用vuex数据
            if (data.length >= 1) {
                await this.$store.dispatch('setSecondStepData', data);
            } else { // 没设置过奖品--必须先设置奖品 在vuex stepStatusInfo里面添加first字段
                const firstEntry = {
                    setSecondStep: true
                }
                await this.$store.dispatch('setFirstEntry', firstEntry)
            }
            let secondStepData = this.secondStepData
            let secondData = []
            secondData = secondStepData.map(({ id, prize_type, coupon_info, prize_name, coupon_id, points, prize_limit, prize_num, prize_img, prize_desc, receive_prize_way, receive_prize_start_time, receive_prize_end_time, weight_ratio }, i) => {
                return {
                    tipName: `奖品${i + 1}`,
                    name: `${i + 1}`,
                    index: i,
                    id,
                    prize_type, // 奖品类型 1实物奖品 2优惠券 3积分 4谢谢参与
                    prize_name, //奖品名称
                    coupon_id, //优惠券id
                    points, //积分
                    prize_limit, //奖品限制
                    prize_num, //奖品数量
                    prize_img, //奖品图片
                    prize_desc, //奖品说明
                    receive_prize_way, //兑奖方式 1邮寄方式 2直接发放
                    receive_prize_start_time: receive_prize_start_time || this.firstStepData.start_time || '', //兑奖开始时间
                    receive_prize_end_time: receive_prize_end_time || this.firstStepData.end_time || '', //兑奖结束时间
                    weight_ratio: Number(weight_ratio), // 权重
                    dateTime: [receive_prize_start_time || this.firstStepData.start_time || '', receive_prize_end_time || this.firstStepData.end_time || ''], // 活动开始结束时间
                    discountsCheckData: coupon_info ? [coupon_info] : [],
                    defaultImg: prize_img
                }
            })
            // 判断有没进行规则设置 根据总占比有没大于0
            // const setThirdStep = secondData.reduce((acc, cur) => {
            //     return acc + cur.weight_ratio
            // }, 0);
            // if (!setThirdStep) {
            //     const setTridStep = {
            //         setThirdStep: true
            //     }
            //     await this.$store.dispatch('setFirstEntry', setTridStep)
            // }
            // 存储第二步骤数据
            this.$store.dispatch('setSecondStepData', secondData)
            this.secondData = secondData
            this.tabIndex = this.secondData.length
        },
        handleValidateForm() {
            const formNum = this.$refs['secondForm'] && this.$refs['secondForm'].length
            this.formValid = []
            for (let i = 0; i < formNum; i++) {
                this.$refs['secondForm'][i].validate((valid) => {
                    if (!valid) {
                        this.formValid.push(false)
                        return false
                    } else {
                        this.formValid.push(true)
                    }
                })
            }
        },
        // type 步骤切换传值
        submitForm(type = 'submit') {
            // 如果活动已结束，则不进行保存操作
            if (this.noIsEdit_) {
                // 设置loading
                this.$emit('listenFormData', {
                    step: 'second'
                })
                return
            }
            return new Promise(async (resolve) => {
                // if (this.secondData.length > 8) {
                //     this.addable = false
                //     this.$toast('奖品数不能大于8')
                //     return
                // }
                await this.handleValidateForm()
                // 表单验证通过才添加奖品标签
                const result = this.formValid.every(v => v === true)
                if (!result) {
                    this.$toast('当前奖品有未填写的项')
                    // 设置loading
                    this.$emit('listenFormData', {
                        step: 'second'
                    })
                    return
                }
                this.secondData.forEach(v => {
                    // 优惠券
                    if (v.prize_type === 2) {
                        v.prize_num = -1
                        return
                    }
                    // 积分
                    if (v.prize_type !== 3) {
                        v.points = -1
                    }
                    // 谢谢参与
                    if (v.prize_type === 4) {
                        v.prize_limit = -1
                        v.prize_num = -1
                    }
                    // 时间格式修改
                    v.receive_prize_start_time = v.dateTime[0]
                    v.receive_prize_end_time = v.dateTime[1]
                });
                // const thanksType = this.secondData.some(v => v.prize_type === 4)
                // if (type === 'stepTab' && !thanksType) {
                //     this.$toast('至少要有一个奖品为谢谢惠顾')
                //     // 设置loading
                //     this.$emit('listenFormData', {
                //         step: 'second'
                //     })
                //     return false
                // }
                const secondData = {
                    big_wheel_activity_id: getQueryVariable('big_wheel_activity_id'),
                    prize_info: this.secondData
                }
                // 存储第二步骤数据
                this.$store.dispatch('setSecondStepData', this.secondData)
                // 奖品设置完成 可以进行规则设置
                const firstEntry = {
                    setSecondStep: false
                }
                await this.$store.dispatch('setFirstEntry', firstEntry)
                if (type !== 'noSubmit') {
                    // 保存奖品设置
                    try {
                        await this.$http('prizeSet', secondData)
                    } catch (error) {
                        this.$toast(error.msg)
                        // 设置loading
                        this.$emit('listenFormData', {
                            step: 'second'
                        })
                        return
                    }
                }
                setTimeout(() => {
                    // 设置loading
                    this.$emit('listenFormData', {
                        step: 'second'
                    })
                    resolve(true)
                }, 500)
            })
        },
        async addTab(targetName) {
            if (this.noIsEdit_) return this.$toast('不可修改配置')
            await this.submitForm('noSubmit')
            const newTabName = ++this.tabIndex + ""
            const tipName = `奖品${this.secondData.length + 1}`
            this.secondData.push({
                name: newTabName,
                id: 0,
                tipName,
                points: 0,
                prize_desc: "",
                prize_img: `/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png`,
                prize_limit: 1,
                prize_name: "",
                prize_num: 1,
                prize_type: 1,
                receive_prize_end_time: '',
                receive_prize_start_time: '',
                receive_prize_way: 2,
                dateTime: [this.firstStepData.start_time, this.firstStepData.end_time],
                discountsCheckData: [],
                weight_ratio: 0,
                defaultImg: `/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png`
            });
            this.editableTabsValue = newTabName
        },
        async removeTab(targetName) {
            if (this.noIsEdit_) return this.$toast('不可修改配置')
            let tabs = this.secondData
            let activeName = this.editableTabsValue
            if (tabs.length <= 1) {
                this.addable = false
                this.$toast('奖品数不能少于一项')
                return
            }
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                        }
                    }
                });
            }
            this.editableTabsValue = activeName
            this.secondData = tabs.filter((tab) => tab.name !== targetName)
            this.secondData.forEach((v, i) => {
                v.tipName = `奖品${i + 1}`
            })
            // this.secondData = [this.secondData.slice()]
            // 存储第二步骤数据
            this.$store.dispatch('setSecondStepData', this.secondData)
            // const secondData = {
            //     big_wheel_activity_id: getQueryVariable('big_wheel_activity_id'),
            //     prize_info: this.secondData
            // }
            // await this.$http('prizeSet', secondData)
        },
        /**
         * @example 接收优惠卷弹框确定数据
         * @param {{
         * detail:{
         * value:object
         * }}} e
         */
        handleDiscountsSubmit(e) {
            this.secondData.forEach(v => {
                // 时间格式修改
                if (v.name === this.editableTabsValue) {
                    if (v.discountsCheckData.length < 1) {
                        v.discountsCheckData.push(e.detail.value)
                        v.coupon_id = e.detail.value.id
                        this.$refs.secondForm.find(v => v.model.name === this.editableTabsValue).validateField('discountsCheckData')
                    } else {
                        this.$message.warning('最多可以添加1个')
                    }
                }
            })
            // if (this.discountsCheckData.every(v => v.id !== e.detail.value.id)) {
            //     if (this.discountsCheckData.length < 1) {
            //         this.discountsCheckData.push(e.detail.value);
            //     } else {
            //         this.$message.warning('最多可以添加1个')
            //     }
            // } else {
            //     this.$message.warning(`${e.detail.value.coupon_name}重复添加`)
            // }
        },
        handleAddcoupon(item) {
            if (item.discountsCheckData && item.discountsCheckData.length > 0) {
                this.$message.warning('最多可以添加1个')
            } else {
                this.discountsFlag = true
            }
        },
        // 奖品类型选择
        handleSelectChange(val) {
            const list = val
            if (list.prize_type === 1) {
                list.receive_prize_way = 1
            } else {
                list.receive_prize_way = 2
            }
            this.secondData = this.secondData.map(item => item.name === list.name ? list : item)
        }
    },
};
</script>

<style lang="scss" scope>
.second-step {
    &-rewardNum {
        width: 150px;
    }
    .ext-text {
        margin-left: 10px;
        margin-right: 5px;
    }
    .maxWidth {
        width: 550px;
    }
}
</style>

<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:01:01
-->
<template>
    <view class="third-step">
        <view class="c-el-module__container">
            <el-form
                ref="ThirdStep"
                :model="formData"
                :rules="rules"
                label-width="120px"
                size="small"
                :disabled="noIsEdit_"
            >

                <!-- 限制规则 -->
                <view class="c-el-module__item">
                    <div class="c-el-module__title">限制规则</div>
                    <el-divider class="c-el-module__divider-h"></el-divider>

                    <!-- 最多中奖次数 -->
                    <el-form-item
                        label="最多中奖次数"
                        prop="everyone_awards_times"
                    >
                        <el-input-number
                            v-model="formData.everyone_awards_times"
                            controls-position="right"
                            @change="handleChange($event, 'everyone_awards_times')"
                            :min="1"
                            :max="999999"
                        ></el-input-number>
                        <span class="ext-text">次/人</span>
                    </el-form-item>

                    <!-- 最多参与次数 -->
                    <el-form-item
                        label="最多参与次数"
                        prop="everyone_join_times"
                    >
                        <el-input-number
                            v-model="formData.everyone_join_times"
                            controls-position="right"
                            @change="handleChange($event, 'everyone_join_times')"
                            :min="formData.everyone_everyday_join_times"
                            :max="999999"
                        ></el-input-number>
                        <span class="ext-text">次/人</span>
                    </el-form-item>

                    <!-- 最多参与次数 -->
                    <el-form-item
                        label="每天参与次数"
                        prop="everyone_everyday_join_times"
                    >
                        <el-input-number
                            v-model="formData.everyone_everyday_join_times"
                            controls-position="right"
                            @change="handleChange($event, 'everyone_everyday_join_times')"
                            :min="1"
                            :max="formData.everyone_join_times"
                        ></el-input-number>
                        <span class="ext-text">次/人</span>
                    </el-form-item>

                </view>

                <!-- 兑换规则 -->
                <view class="c-el-module__item">
                    <div class="c-el-module__title">兑换规则</div>
                    <el-divider class="c-el-module__divider-h"></el-divider>

                    <!-- 积分兑换次数 -->
                    <el-form-item
                        label="积分兑换次数"
                        prop="point_exchange_times"
                    >
                        <el-input-number
                            v-model="formData.point_exchange_times"
                            controls-position="right"
                            @change="handleChange($event, 'point_exchange_times')"
                            :min="1"
                            :max="999999"
                        ></el-input-number>
                        <span class="ext-text">积分兑换1次</span>
                    </el-form-item>

                    <!-- 拉新获取次数 -->

                    <el-form-item
                        label="拉新"
                        required
                    >
                        <el-col
                            :span="8"
                            style="width:220px"
                        >
                            <el-form-item prop="pull_new_times">
                                <el-input-number
                                    v-model="formData.pull_new_times"
                                    controls-position="right"
                                    @change="handleChange($event, 'pull_new_times')"
                                    :min="1"
                                    :max="999999"
                                ></el-input-number>
                                <span class="ext-text">人，可获得</span>
                            </el-form-item>
                        </el-col>
                        <el-col
                            :span="8"
                            style="width:220px"
                        >
                            <el-form-item prop="pull_new_exchange_time">
                                <el-input-number
                                    v-model="formData.pull_new_exchange_time"
                                    controls-position="right"
                                    @change="handleChange($event, 'pull_new_exchange_time')"
                                    :min="0"
                                    :max="999999"
                                ></el-input-number>
                                <span class="ext-text">次抽奖</span>
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="拉新N个可获得M次抽奖次数"
                                    placement="right"
                                >
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                </view>

                <!-- 中奖权重 -->
                <view class="c-el-module__item">
                    <div class="c-el-module__title">中奖权重</div>
                    <el-divider class="c-el-module__divider-h"></el-divider>
                    <el-table
                        :data="formData.prize_info"
                        stripe
                        highlight-current-row
                        border
                        empty-text="暂无数据"
                        header-row-class-name="table-header"
                        :row-class-name="rowCls_"
                        size="small"
                        row-key="name"
                    >
                        <el-table-column
                            label="序号"
                            align="center"
                            type="index"
                            width="80"
                        >
                        </el-table-column>
                        <!-- <el-table-column
                            label="奖品名称"
                            prop="prize_name"
                        >
                        </el-table-column> -->

                        <el-table-column align="center">
                            <template
                                slot="header"
                                slot-scope="scope"
                            >
                                <span>奖品</span>
                            </template>

                            <template slot-scope="scope">
                                <el-form-item
                                    class="m0"
                                    label-width="0"
                                    :prop="`prize_info[${scope.$index}].id`"
                                    :rules="[{ required: true, message: '奖项不能为空', trigger: ['change', 'blur'] }]"
                                >
                                    <el-select
                                        :value="formData.prize_info[scope.$index].big_wheel_prize_id"
                                        @change="selectChange($event, scope.$index)"
                                        placeholder="请选择选择奖品"
                                    >
                                        <el-option
                                            v-for="(item, index) in all_prize_info"
                                            :key="index"
                                            :label="item.prize_name"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column align="center">
                            <template
                                slot="header"
                                slot-scope="scope"
                            >
                                <span>中奖权重</span>
                            </template>

                            <template slot-scope="scope">
                                <el-form-item
                                    class="m0"
                                    label-width="0"
                                    :prop="`prize_info[${scope.$index}].weight_ratio`"
                                    :rules="[{ required: true, message: '中奖权重不能为空', trigger: ['change', 'blur'] },]"
                                >
                                    <el-input-number
                                        size="small"
                                        v-model="formData.prize_info[scope.$index].weight_ratio"
                                        controls-position="right"
                                        :min="0"
                                        :max="100"
                                    ></el-input-number>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                    <view class="tip-container">
                        <el-alert
                            title="拖拉移动表格行可调整排序"
                            type="warning"
                            show-icon
                            :closable="false"
                        />
                        <view class="title">中奖权重配置说明：</view>
                        <view>例如：商户设置小程序所有奖品的总权重为100，A奖品中奖权重为50，客户从小程序进入活动页面，获得A奖品的概率为：50%</view>
                        <view>若客户参与次数已用完，可通过消耗“积分”兑换抽奖机会</view>
                    </view>
                </view>
            </el-form>
        </view>
    </view>
</template>

<script>
import Sortable from 'sortablejs'
import { mapState } from 'vuex'
import { getQueryVariable } from '@/common/utils/utils'
export default {
    name: 'third-step', // 步骤三
    data() {
        return {
            isFirst: false,
            all_prize_info: [],
            formData: {
                big_wheel_activity_id: 0,
                everyone_awards_times: 1,  // 最多中奖次数
                everyone_join_times: 1,  // 最多参与次数
                everyone_everyday_join_times: 1,  // 每天参与次数
                point_exchange_times: 1,  // 消耗多少积分
                pull_new_times: 1,  // 拉新多少次兑换抽奖
                pull_new_exchange_time: 1,  // 拉新兑换多少次抽奖
                prize_info: []
            },
            rules: {
                everyone_awards_times: [
                    { required: true, message: '最多中奖次数不能为空', trigger: 'blur' },
                ],
                everyone_join_times: [
                    { required: true, message: '最多参与次数不能为空', trigger: 'blur' },
                ],
                everyone_everyday_join_times: [
                    { required: true, message: '每天参与次数不能为空', trigger: 'blur' },
                ],
                point_exchange_times: [
                    { required: true, message: '兑换积分不能为空', trigger: 'blur' },
                ],
                pull_new_times: [
                    { required: true, message: '拉新次数不能为空', trigger: 'blur' },
                ],
                pull_new_exchange_time: [
                    { required: true, message: '抽奖次数不能为空', trigger: 'blur' },
                ]
            }
        }
    },
    computed: {
        ...mapState({
            //第一步
            firstStepData: state => state.project.firstStepData,
            //第三步
            thirdStepData: state => state.project.thirdStepData
        }),
        // 是否可以编辑
        noIsEdit_() {
            return this.firstStepData.is_edit === 0
        },
        rowCls_() {
            return !this.noIsEdit_ ? 'drag-move' : 'drag-move filter'
        }
    },
    async created() {
        this.formData.big_wheel_activity_id = getQueryVariable('big_wheel_activity_id') * 1
        this.getRuleInfo()
        this.getBigWheelPrizeConfig()
        this.getPrizeSetInfo()
    },
    watch: {
        formData: {
            handler(val) {
                console.log(val)
                this.$c.debounce(() => {
                    this.$store.dispatch('setThirdStepData', val)
                }, 500)
            },
            deep: true
        },
        '$store.state.project.stepStatusInfo.step': {
            handler(val) {
                if (val === 'third') {
                    this.getPrizeSetInfo()
                    this.getRuleInfo()
                    this.getBigWheelPrizeConfig()
                }
            },
            deep: true
        }
    },
    methods: {
        async getPrizeSetInfo() { // 获取奖项信息，在奖品信息为空时，奖品创建默认值
            const { data } = await this.$http('prizeSetInfo', {
                big_wheel_activity_id: getQueryVariable('big_wheel_activity_id'),
                is_thank_prize: 1
            })
            this.all_prize_info = data // 全部奖项
            const prize = data.find(o => o.prize_type === 4) || { id: 0, prize_name: '谢谢参与' } // 获取未中奖项
            if (prize && this.formData.prize_info.length <= 0) { // 当前奖项信息为空就赋值默认值
                const prize_info = [
                    { name: 0, id: 0, big_wheel_prize_id: prize.id, prize_name: prize.prize_name, prize_config_img: '/saas/activity/lucky-draw/admin/prize_icon_1.png', weight_ratio: 10 },
                    { name: 1, id: 0, big_wheel_prize_id: prize.id, prize_name: prize.prize_name, prize_config_img: '/saas/activity/lucky-draw/admin/prize_icon_2.png', weight_ratio: 10 },
                    { name: 2, id: 0, big_wheel_prize_id: prize.id, prize_name: prize.prize_name, prize_config_img: '/saas/activity/lucky-draw/admin/prize_icon_3.png', weight_ratio: 10 },
                    { name: 3, id: 0, big_wheel_prize_id: prize.id, prize_name: prize.prize_name, prize_config_img: '/saas/activity/lucky-draw/admin/prize_icon_4.png', weight_ratio: 10 },
                    { name: 4, id: 0, big_wheel_prize_id: prize.id, prize_name: prize.prize_name, prize_config_img: '/saas/activity/lucky-draw/admin/prize_icon_5.png', weight_ratio: 10 },
                    { name: 5, id: 0, big_wheel_prize_id: prize.id, prize_name: prize.prize_name, prize_config_img: '/saas/activity/lucky-draw/admin/prize_icon_6.png', weight_ratio: 10 },
                    { name: 6, id: 0, big_wheel_prize_id: prize.id, prize_name: prize.prize_name, prize_config_img: '/saas/activity/lucky-draw/admin/prize_icon_7.png', weight_ratio: 10 },
                    { name: 7, id: 0, big_wheel_prize_id: prize.id, prize_name: prize.prize_name, prize_config_img: '/saas/activity/lucky-draw/admin/prize_icon_8.png', weight_ratio: 10 }
                ]
                this.formData = Object.assign({}, this.formData, { prize_info })
            }
        },
        async getRuleInfo() { // 获取规则信息
            const { data } = await this.$http('ruleInfo', {
                big_wheel_activity_id: getQueryVariable('big_wheel_activity_id')
            })
            if (!Array.isArray(data)) {
                const ruleInfo = {
                    everyone_awards_times: data.everyone_awards_times,
                    everyone_join_times: data.everyone_join_times,
                    everyone_everyday_join_times: data.everyone_everyday_join_times,
                    point_exchange_times: data.point_exchange_times,
                    pull_new_times: data.pull_new_times,
                    pull_new_exchange_time: data.pull_new_exchange_time
                }
                this.formData = Object.assign({}, this.formData, ruleInfo)
            }
        },
        async getBigWheelPrizeConfig() { // 获取奖品信息，默认值在奖项信息中获取
            const { data = [] } = await this.$http('getBigWheelPrizeConfig', {
                big_wheel_activity_id: getQueryVariable('big_wheel_activity_id')
            })
            if (data.length > 0) {
                this.isFirst = false
                const prize_info = data.map((o, index) => {
                    return {
                        ...o,
                        name: index
                    }
                })
                this.formData = Object.assign({}, this.formData, { prize_info })
            } else {
                this.isFirst = true
            }
        },
        handleChange(val, type) { // 限制规则
            this[type] = val
        },
        initTableDrag() { // 初始化表格拖拉排序
            this.$nextTick(() => {
                const tbody = document.querySelector('.el-table__body-wrapper tbody');
                const _this = this;
                Sortable.create(tbody, {
                    //  指定父元素下可被拖拽的子元素
                    draggable: ".drag-move",
                    ghostClass: 'table-ghost',
                    filter: ".filter",
                    animation: 150,
                    onEnd({ newIndex, oldIndex }) {
                        console.log('new_index, old_index', newIndex, oldIndex)
                        // 旧位置删除当前元素，并保存当前元素
                        const currRow = _this.formData.prize_info.splice(oldIndex, 1)[0]
                        // 新位置插入当前元素
                        _this.formData.prize_info.splice(newIndex, 0, currRow)
                    }
                });
            })
        },
        submitForm() { // 提交验证表单
            // 如果活动已结束，则不进行保存操作
            if (this.noIsEdit_) {
                // 设置loading
                this.$emit('listenFormData', {
                    step: 'third'
                })
                return
            }
            return new Promise((resolve) => {
                this.$refs['ThirdStep'].validate(async (valid) => {
                    if (valid) {
                        const { big_wheel_activity_id,
                            prize_info,
                            everyone_awards_times,
                            everyone_join_times,
                            everyone_everyday_join_times,
                            point_exchange_times,
                            pull_new_times,
                            pull_new_exchange_time } = this.formData
                        const prize_info_arr = prize_info.map(({ id, big_wheel_prize_id, prize_config_img, weight_ratio }, index) => {
                            return {
                                id,
                                big_wheel_prize_id,
                                prize_config_img,
                                weight_ratio,
                                sort: index
                            }
                        })
                        const o = {
                            big_wheel_activity_id,
                            prize_info: prize_info_arr,
                            everyone_awards_times,
                            everyone_join_times,
                            everyone_everyday_join_times,
                            point_exchange_times,
                            pull_new_times,
                            pull_new_exchange_time
                        }
                        // 判断有没进行规则设置 根据总占比有没大于0
                        const setThirdStep = prize_info_arr.reduce((acc, cur) => {
                            return acc + cur.weight_ratio
                        }, 0);
                        if (!setThirdStep) {
                            // 设置loading
                            this.$emit('listenFormData', {
                                step: 'third'
                            })
                            this.$toast('总占比必须大于0')
                            return
                        }
                        // await this.$store.dispatch('setThirdStepData', o);
                        // 存储第三步骤数据
                        try {
                            await this.$http('ruleSet', o)
                            if (this.isFirst) {
                                this.getBigWheelPrizeConfig()
                            }
                        } catch (error) {
                            this.$toast(error.msg)
                            // 设置loading
                            this.$emit('listenFormData', {
                                step: 'third'
                            })
                            return
                        }
                        const setTridStep = {
                            setThirdStep: false
                        }
                        await this.$store.dispatch('setFirstEntry', setTridStep)
                        setTimeout(() => {
                            // 设置loading
                            this.$emit('listenFormData', {
                                step: 'third'
                            })
                            resolve(true)
                        }, 500)
                    } else {
                        // 设置loading
                        this.$emit('listenFormData', {
                            step: 'third'
                        })
                        this.$toast('还有必选项未填写')
                    }
                })
            })
        },
        selectChange(id, index) {
            const prize = this.all_prize_info.find(o => o.id === id)
            // this.formData.prize_info[index].prize_name = prize.prize_name
            // this.formData.prize_info[index].prize_type = prize.prize_type
            // this.formData.prize_info[index].big_wheel_prize_id = prize.id
            this.$set(this.formData.prize_info, index, {
                ...this.formData.prize_info[index],
                prize_name: prize.prize_name,
                prize_type: prize.prize_type,
                prize_desc: prize.prize_desc,
                prize_num: prize.prize_num,
                prize_img: prize.prize_img,
                big_wheel_prize_id: prize.id
            })
        }
    },
    mounted() {
        this.initTableDrag()
    }
}
</script>

<style lang="scss" scoped>
.third-step {
    .ext-text {
        margin-left: 10px;
        margin-right: 5px;
    }
    /deep/ .table-header {
        th {
            background: #f3f3f3;
        }
    }
    /deep/ .drag-move {
        cursor: move;
    }
    /deep/ .m0 {
        margin: 0;
    }
    /deep/ .table-ghost {
        //box-shadow: 0 0 1px 2px rgba(123, 104, 255, 1) inset;
        background: rgba(64, 158, 255, 0.1);
    }
    /deep/ table {
        .el-form-item__error {
            position: inherit;
        }
    }
    .tip-container {
        padding: 15px 0;
        font-size: 12px;
        color: #777;
        line-height: 1.4;
        .title {
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
    .w100 {
        /deep/ .el-input-number {
            width: 100px;
        }
    }
}
</style>

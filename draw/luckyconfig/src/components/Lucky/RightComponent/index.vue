<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:01:01
-->
<template>
    <div class="right-component">
        <el-tabs
            v-show="!changeImgStatus_"
            v-model="activeName"
            :before-leave="handleTabClick"
        >
            <el-tab-pane
                label="基础设置"
                name="first"
            >
                <span
                    slot="label"
                    v-loading="loading1"
                    class="loadingCls"
                >基础设置</span>
                <FirstStep
                    @listenFormData="handleFormData"
                    ref="firstStep"
                />
            </el-tab-pane>
            <el-tab-pane
                label="奖品设置"
                name="second"
            >
                <span
                    slot="label"
                    v-loading="loading2"
                    class="loadingCls"
                >奖品设置</span>
                <SecondStep
                    @listenFormData="handleFormData"
                    ref="secondStep"
                />
            </el-tab-pane>
            <el-tab-pane
                label="规则设置"
                name="third"
            >
                <span
                    slot="label"
                    v-loading="loading3"
                    class="loadingCls"
                >规则设置</span>
                <ThirdStep
                    @listenFormData="handleFormData"
                    ref="thirdStep"
                />
            </el-tab-pane>
        </el-tabs>
        <div v-show="changeImgStatus_">
            <ChangeRewardItem />
        </div>
    </div>
</template>

<script>
import FirstStep from './FirstStep.vue'
import SecondStep from './SecondStep.vue'
import ThirdStep from './ThirdStep.vue'
import ChangeRewardItem from './components/ChangeRewardItem.vue'
import { mapState } from 'vuex'
import { getQueryVariable } from '@/common/utils/utils'

export default {
    data() {
        return {
            activeName: 'first',
            formData: {},
            loading1: false,
            loading2: false,
            loading3: false
        }
    },
    watch: {
        activeName: {
            handler(val) {
                this.$store.dispatch('setStepStatusInfo', {
                    step: val
                })
            },
        },
        'stepStatusInfo.timer': {
            async handler() {
                if (this.activeName === 'first') {
                    await this.$refs.firstStep.submitForm()
                }
                if (this.activeName === 'second') {
                    await this.$refs.secondStep.submitForm()
                }
                if (this.activeName === 'third') {
                    await this.$refs.thirdStep.submitForm()
                }
                const type = this.stepStatusInfo.type
                if (type === 'submit') {
                    // if (!this.is_edit) return $toast('已发布')
                    this.$confirm('是否确认发布？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        // 确认投放
                        await this.$http('putIn', {
                            big_wheel_activity_id: getQueryVariable('big_wheel_activity_id')
                        })
                        // 后台关闭layer所有弹窗
                        parent.closeLayerAll && parent.closeLayerAll()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '发布失败'
                        });
                    });
                }
            },
        }
    },
    components: {
        FirstStep,
        SecondStep,
        ThirdStep,
        ChangeRewardItem
    },
    computed: {
        ...mapState({
            changeImgStatus_: state => state.project.changeImgStatus,
            firstStepData: state => state.project.firstStepData,
            stepStatusInfo: state => state.project.stepStatusInfo,
        }),
        is_edit() {
            return this.firstStepData.is_edit
        }
    },
    methods: {
        handleTabClick(newVal, oldVal) {
            if (oldVal === 'first') {
                if (this.$store.state.project.firstEntry.setSecondStep && newVal === 'third') {
                    this.$toast('请先设置奖品')
                    return false
                }
                if (newVal === 'second') this.loading2 = true
                if (newVal === 'third') this.loading3 = true
                return this.$refs.firstStep.submitForm()
            }
            if (oldVal === 'second') {
                if (newVal === 'first') this.loading1 = true
                if (newVal === 'third') this.loading3 = true
                return this.$refs.secondStep.submitForm('stepTab')
            }
            if (oldVal === 'third') {
                if (newVal === 'first') this.loading1 = true
                if (newVal === 'second') this.loading2 = true
                return this.$refs.thirdStep.submitForm()
            }
        },
        // 合并数据 提交
        handleFormData() {
            this.loading1 = false
            this.loading2 = false
            this.loading3 = false
        }
    }
}
</script>

<style lang="scss" scope>
.right-component {
    padding: 10px 20px;
    background: #fff;
    flex: 1;
    min-width: 500px;
    // height: 100%;
    .loadingCls {
        /deep/ .el-loading-spinner {
            transform: scale(0.6);
        }
    }
}
</style>

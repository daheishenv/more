<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: J
 * @Date: 2021-09-29 15:53:20
-->
<template>
    <el-row>
        <el-col :span="6">
            <view style="display: flex;justify-content: flex-start;align-items: center;color: #675e6f">
                <h2>大转盘</h2>
            </view>
        </el-col>

        <el-col
            :span="18"
            style="text-align: right;"
        >
            <el-button
                type="primary"
                size="mini"
                @click="handleSubmit('submit')"
            >发布</el-button>
            <el-button
                type="primary"
                size="mini"
                @click="handleSubmit('save')"
            >保存</el-button>
            <el-button
                type="danger"
                size="mini"
                @click="closeProject"
            >取消</el-button>
        </el-col>

    </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'EuHeader',
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            stepStatusInfo: state => state.project.stepStatusInfo,
            firstEntry: state => state.project.firstEntry
        })
    },
    methods: {
        // 取消
        closeProject() {
            parent.closeDrayLayer && parent.closeDrayLayer()
        },
        // 后台关闭layer所有弹窗
        closeDrayLayer() {
            parent.closeLayerAll && parent.closeLayerAll()
        },
        async handleSubmit(type) {
            if (type === 'submit' && this.firstEntry.setSecondStep && this.stepStatusInfo.step !== 'second') {
                this.$toast('请先设置奖品')
                return false
            }
            // 重新验证步骤表单
            await this.$store.dispatch('setStepStatusInfo', {
                timer: new Date().getTime(),
                type
            })
        }
    },
}
</script>

<style scoped>
</style>
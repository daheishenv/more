<template>
    <Layout
        title="大转盘"
        @submit="handleSubmit('submit')"
        @save="handleSubmit('save')"
        @close="closeProject"
    >
        <template v-slot:left>
            <LeftComponent />
        </template>
        <template v-slot:center>
            <CenterComponent />
        </template>
        <template v-slot:right>
            <RightComponent />
        </template>
    </Layout>
</template>

<script>
import Layout from "@/appComponents/Layout";
import LeftComponent from '@/components/Lucky/LeftComponent'
import RightComponent from '@/components/Lucky/RightComponent'
import CenterComponent from '@/components/Lucky/CenterComponent'
import Header from '@/components/Lucky/Header'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            stepStatusInfo: state => state.project.stepStatusInfo,
            firstEntry: state => state.project.firstEntry
        })
    },
    components: {
        Layout,
        LeftComponent,
        RightComponent,
        CenterComponent,
        Header,
    },
    mounted() {
        console.log(this);
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
    }
}
</script>


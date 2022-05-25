<template>
    <view class="home-user-index">
        <Layout
            title="个人中心"
            @submit="handleSubmit('submit')"
        >
            <template v-slot:center>
                <CenterComponent />
            </template>
            <template v-slot:right>
                <RightComponent v-if="cfinish" />
            </template>
        </Layout>
    </view>
</template>

<script>
import Layout from "@/components/User/PhoneFrame/Layout";
import RightComponent from '@/components/User/RightComponent'
import CenterComponent from '@/components/User/CenterComponent'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            cfinish: false
        }
    },
    components: {
        Layout,
        RightComponent,
        CenterComponent
    },
    async created() {
        await this.personalCenterGetList()
        this.cfinish = true
    },
    methods: {
        ...mapActions(['personalCenterSave', 'personalCenterGetList']),
        handleSubmit() {
            this.personalCenterSave()
        }
    }
}
</script>
<style lang="scss" scoped>
.home-user-index {
    /deep/ .aside__left {
        padding: 20px 40px 20px 80px;
    }
}
</style>
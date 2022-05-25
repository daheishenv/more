<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2022-01-06 11:18:45
-->
<template>
    <div class="p30">
        <honor
            :upload-list="uploadList"
            @upload="upload"
            @remove="remove"
        />
    </div>
</template>
<script>
import honor from '@/components/upload/comp-honor.vue'
export default {
    components: {
        honor
    },
    data() {
        return {
            uploadList: []
        }
    },
    // async asyncData({ $axios }) {
    //     return {
    //         uploadList: data
    //     }
    // },
    created() {
        this.getInfo()
    },
    methods: {
        async getInfo() {
            const { data } = await this.$axios.$post('/company/getHonor')
            this.uploadList = data
        },
        async upload({ detail: { value } }) {
            const { result, code, msg } = await this.$axios.$post('/company/editHonor', value)
            this.$message({
                message: msg,
                type: code === 0 ? 'success' : 'error'
            })
            result && this.getInfo()
        },
        async remove({ detail: { value } }) {
            const { result } = await this.$axios.$post('/company/delHonor', value)
            result && this.getInfo()
        }
    }
}
</script>
<style lang="scss">
.p30 {
    padding: 30px;
}
</style>

<template>
    <div class="p30">
        <banner
            :upload-list="uploadList"
            @upload="upload"
            @remove="remove"
        />
    </div>
</template>
<script>
import banner from '@/components/upload/comp-swiper.vue'
export default {
    components: {
        banner
    },
    async asyncData({ $axios }) {
        const { data } = await $axios.$post('/company/getBanner')
        return {
            uploadList: data
        }
    },
    methods: {
        async upload(res) {
            const img = {
                img_url: res.file_path
            }
            const { result } = await this.$axios.$post('/company/editBanner', { imgs: [...this.uploadList, img] })
            result && this.updateImg()
        },
        async updateImg() {
            const { data } = await this.$axios.$post('/company/getBanner')
            this.uploadList = data
        },
        async remove(res) {
            this.uploadList.splice(res.detail.value, 1)
            const { result } = await this.$axios.$post('/company/editBanner', { imgs: [...this.uploadList] })
            result && this.updateImg()
        }
    }
}
</script>
<style lang="scss">
.p30 {
    padding: 30px;
}
</style>

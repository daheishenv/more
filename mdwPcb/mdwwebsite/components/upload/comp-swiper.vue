<template>
    <div>
        <div class="company-carousel-title">轮播图 <span>（将会在您的公司主页顶部显示，最多同时上传6张）</span></div>
        <upload-swiper
            :upload-list="uploadList"
            @upload="upload"
            @remove="remove"
        />
    </div>
</template>

<script>
import UploadSwiper from './upload-swiper.vue'
export default {
    components: {
        UploadSwiper
    },
    props: {
        uploadList: {
            type: Array,
            default: () => { return [] }
        }
    },
    methods: {
        upload(res) {
            this.$emit('upload', res)
        },
        remove(res) {
            this.$emit('remove', res)
        }
    }
}
</script>

<style lang="scss" scoped>
.company-carousel {
    margin-top: 20px;
    &-title {
        font-size: 18px;
        font-weight: 500;
        color: #333333;
        position: relative;
        padding-left: 8px;
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 19px;
            background: $--color-primary;
            border-radius: 2px;
        }
        span {
            font-size: 12px;
            font-weight: 400;
            color: $--color-primary;
        }
    }
}
</style>

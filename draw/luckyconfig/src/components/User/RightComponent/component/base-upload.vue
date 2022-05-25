<template>
    <div class="base-upload">
        <div class="base-upload-item">
            <div class="base-upload-item-bd">
                <div
                    class="base-upload-item-bd__left"
                    v-if="value"
                >
                    <c-image
                        class="base-upload-item-bd__left-img"
                        size="70px"
                        type="upload"
                        :src="value"
                        mode="aspectFill"
                    />
                    <div
                        v-if="progress > 0 && progress < 100"
                        class="base-upload-item-bd__progress"
                    >
                        <animate-number
                            from="1"
                            :to="progress"
                        ></animate-number>%
                    </div>
                    <div
                        class="base-upload-item-bd__left-btn"
                        @click="handleUpload"
                    >
                        更换图片
                    </div>
                </div>
                <div
                    v-else
                    class="base-upload-item-bd__left"
                    @click="handleUpload"
                >
                    <div
                        v-if="progress > 0 && progress<100"
                        class="base-upload-item-bd__progress"
                    >
                        <animate-number
                            from="1"
                            :to="progress"
                        ></animate-number>%
                    </div>
                    <span class="el-icon-plus"></span>
                    <div class="base-upload-item-bd__left-text">添加背景图</div>
                </div>
                <div class="base-upload-item-bd__right c-999">
                    {{bgImgTips}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        bgImgTips: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            progress: [],// 上传进度
        }
    },
    created() {
        setTimeout(() => {
            this.destroyEl = false
        }, 100)
    },
    beforeDestroy() {
        this.destroyEl = true
    },
    methods: {
        /**
         * @name: 更换背景
         * @param {String} index 索引值
         */
        async handleUpload() {
            let files = await uni.chooseImage({ count: 1 })
            const file = files[0] ? files[0] : files[1]
            if (!file) return this.$toast('上传出错')
            try {
                const filePath = file.tempFilePaths[0]
                this.progress = 0
                const { data } = await this.$http('uploadImg', {
                    filePath,
                    name: 'file',
                    getTask: (e) => {
                        let progress = e.progress >= 99 ? 99 : progress
                        this.progress = progress
                    }
                })
                this.$emit('input', data.src)
                this.$nextTick(() => {
                    this.progress = 100
                })
            } catch (err) {
                this.progress = 0
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.base-upload-item-bd__right {
    @include abs(null, null, 38rpx, 204rpx);
}
</style>
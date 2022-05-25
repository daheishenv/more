<template>
    <div class="img-upload">
        <div class="flex">
            <div class="img-upload-img">
                <c-image
                    :width="width"
                    :height="height"
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
            </div>
            <div>
                <div
                    class="img-upload-btn"
                    @click="handleUpload"
                >
                    <span class="el-icon-plus"></span>
                    替换图片
                </div>
                <div class="img-upload-disable" v-if="imgDif" @click="handleReduction">
                    恢复默认   
                </div>
            </div>
        </div>
        <div
            class="img-upload-tip"
            v-if="type==='backgroundImg'"
        >建议尺寸：宽750像素,高1449像素或等比图片</div>
        <div
            class="img-upload-tip"
            v-else-if="type==='banner'"
        >建议尺寸：宽498像素,高106像素或等比图片</div>
        <div
            class="img-upload-tip"
            v-else-if="type==='rewardImg'"
        >建议尺寸：宽380像素,高380像素或等比图片</div>
        <div
            class="img-upload-tip"
            v-else-if="type==='shareImg'"
        >建议尺寸：宽750像素,高1228像素或等比图片</div>
    </div>
</template>

<script>
export default {
    name: 'img-upload', // 图片上传
    data() {
        return {
            progress: [],// 上传进度
        }
    },
    props: {
        width: {
            type: String,
            default: '130px'
        },
        height: {
            type: String,
            default: '50px'
        },
        type: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        defaultImg: {
            type: String,
            default: ''
        }
    },
    component: {
    },
    computed: {
        imgDif() {
            return this.value !== this.defaultImg
        }
    },
    methods: {
        // 恢复默认图片
        handleReduction() {
            this.$emit('input', this.defaultImg)
        },
        /**
         * @name: 更换图片
         */
        async handleUpload() {
            if (this.disabled) return this.$toast('不可修改图片')
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
                this.$emit('input', data.file_path)
                this.$nextTick(() => {
                    this.progress = 100
                })
            } catch (err) {
                this.$emit('input', 'sadhjaskhdjk')
                this.progress = 0
            }
        }
    }
}
</script>

<style lang="scss" scope>
.img-upload {
    &-img {
        position: relative;
    }
    &-btn {
        width: 85px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #e3e2e5;
        text-align: center;
        cursor: pointer;
        margin-left: 10px;
        color: rgb(89, 89, 89);
        font-size: 12px;
        &:hover {
            border-color: #3aaeff;
            color: #3aaeff;

            span {
                color: #3aaeff;
            }
        }

        span {
            margin-right: 4px;
        }
    }
    &-tip {
        color: #9797a1;
        font-size: 12px;
    }
    &-disable {
        color: #2589FF;
        font-size: 12px;
        margin-left: 10px;
        cursor: pointer;
    }
    .base-upload-item-bd__progress {
        transition: traslate(0);
        @include abs(0, 0, 0, 0);
        background: rgba(0, 0, 0, 0.25);
        z-index: 2;
        color: #fff;
        font-size: 12px;
        @include flex(row);
        align-items: center;
        justify-content: center;
        &.bg-hight {
            background: rgba(0, 0, 0, 0.6);
        }
        &-bg {
            @include abs(null, 0, 0, 0);
            height: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        &-text {
            position: relative;
            z-index: 2;
        }
    }
}
</style>

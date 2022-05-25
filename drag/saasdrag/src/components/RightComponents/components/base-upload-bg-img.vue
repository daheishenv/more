<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-07-01 19:11:19
-->
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
                    <div class="base-upload-item-bd__left-text">添加图片</div>
                </div>
                <div class="base-upload-item-bd__right">
                    <view class="flex align-center pl24">{{bgImgTips}}</view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        summary: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        pushBtnText: {
            type: String,
            default: ''
        },
        max: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            progress: [],// 上传进度
            bgImgTips: ''
        }
    },
    watch: {
        // 这边是要实时计算背景高度
        '$store.state.currentCheckAttr.componentInfo': {
            handler(val) {
                if (this.summary) {
                    this.bgImgTips = this.summary
                } else {
                    const curCmpt = document.getElementById('cmpt-' + val.module_no)
                    this.bgImgTips = `建议尺寸：${parseInt(2 * curCmpt.offsetWidth)} * ${parseInt(2 * curCmpt.offsetHeight)}px`
                }

            },
            deep: true,
            immediate: true
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
    computed: {
        moduleName_() {
            return this.$store.state.currentCheckAttr.componentInfo.module_name
        }
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
                this.$emit('input', data.file_path)
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
<template>
    <div class="base-upload">
        <div class="base-upload-hd">
            <div
                class="base-upload__title"
                v-if="title"
            >{{title}}</div>
            <div
                class="base-upload__summary"
                v-if="summary"
            >{{summary}}</div>
        </div>
        <base-magic-square
            v-model="dataList"
            :showUpload="false"
            class="mt16"
            @changeIndex="handleMagic"
        ></base-magic-square>
        <div
            class="base-upload-item-title"
            v-if="valueConfig.title"
        >
            {{valueConfig.title}}{{selectIndex + 1}}
        </div>
        <div class="base-upload-item">
            <div class="base-upload-item-bd">
                <div
                    class="base-upload-item-bd__left"
                    v-if="dataList[selectIndex] && dataList[selectIndex].data"
                >
                    <c-image
                        class="base-upload-item-bd__left-img"
                        size="70px"
                        type="upload"
                        :src="dataList[selectIndex].data + '?x-oss-process=video/snapshot,t_0,f_jpg'"
                        mode="aspectFill"
                    />
                    <div
                        v-if="videoProgressList[selectIndex] > 0 && videoProgressList[selectIndex]<100"
                        class="base-upload-item-bd__progress"
                        @click.stop="stopTip"
                    >
                        <text
                            class="base-upload-item-bd__progress-bg"
                            :style="{height: videoProgressList[selectIndex] + '%'}"
                        ></text>
                        <text class="base-upload-item-bd__progress-text">{{videoProgressList[selectIndex]}}%</text>
                    </div>
                    <div
                        class="base-upload-item-bd__left-btn"
                        @click="handleUpload(selectIndex)"
                    >
                        更换视频
                    </div>
                </div>
                <div
                    v-else
                    class="base-upload-item-bd__left"
                    @click="handleUpload(selectIndex)"
                >
                    <div
                        v-if="videoProgressList[selectIndex] > 0 && videoProgressList[selectIndex]<100"
                        class="base-upload-item-bd__progress"
                        @click.stop="stopTip"
                    >
                        <text
                            class="base-upload-item-bd__progress-bg"
                            :style="{height: videoProgressList[selectIndex] + '%'}"
                        ></text>
                        <text class="base-upload-item-bd__progress-text">{{videoProgressList[selectIndex]}}%</text>
                    </div>
                    <span class="el-icon-plus"></span>
                    <div class="base-upload-item-bd__left-text">添加视频</div>
                </div>
            </div>
        </div>
        <template v-if="dataList[selectIndex].data">
            <div class="base-upload-item-cover c-999">
                视频封面图
            </div>
            <div class="base-upload-item">
                <div class="base-upload-item-bd">
                    <div
                        class="base-upload-item-bd__left"
                        v-if="dataList[selectIndex] && dataList[selectIndex].img_url"
                    >
                        <c-image
                            class="base-upload-item-bd__left-img"
                            size="70px"
                            type="upload"
                            :src="dataList[selectIndex].img_url"
                            mode="aspectFill"
                        />
                        <div
                            v-if="progressList[selectIndex] > 0 && progressList[selectIndex]<100"
                            class="base-upload-item-bd__progress bg-hight"
                        >
                            <animate-number
                                from="1"
                                :to="progressList[selectIndex]"
                            ></animate-number>%
                        </div>
                        <div
                            class="base-upload-item-bd__left-btn"
                            @click="handleUpload(selectIndex, 'cover')"
                        >
                            更换封面
                        </div>
                    </div>
                    <div
                        v-else
                        class="base-upload-item-bd__left"
                        @click="handleUpload(selectIndex, 'cover')"
                    >
                        <div
                            v-if="progressList[selectIndex] > 0 && progressList[selectIndex]<100"
                            class="base-upload-item-bd__progress bg-hight"
                        >
                            <animate-number
                                from="1"
                                :to="progressList[selectIndex]"
                            ></animate-number>%
                        </div>
                        <span class="el-icon-plus"></span>
                        <div class="base-upload-item-bd__left-text">添加封面</div>
                    </div>
                    <div v-if="dataList[selectIndex] && dataList[selectIndex].img_url">
                        <el-popconfirm
                            title="您已经设置过内容了，是否还要删除？"
                            icon="el-icon-warning-outline"
                            icon-color="#f00"
                            @confirm="delItem(selectIndex, 'cover')"
                        >
                            <span
                                slot="reference"
                                class="el-icon-delete base-upload-item-bd__del"
                            ></span>
                        </el-popconfirm>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
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
            type: Array,
            default: () => []
        },
        pushBtnText: {
            type: String,
            default: ''
        },
        valueConfig: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    data() {
        return {
            dataList: [],
            defaultList: [],
            selectIndex: 0,
            progressList: [],
            videoProgressList: []
        }
    },
    watch: {
        value: {
            handler(val) {
                this.dataList = this.$deepClone(val)
                this.defaultList = this.$deepClone(val)
            },
            deep: true,
            immediate: true
        },
        dataList: {
            handler(val) {
                if (this.$c.diffByObj(val, this.defaultList)) {
                    return
                }
                this.$emit('input', val)
                this.$emit('change', {
                    type: 'upload',
                    detail: val
                })
            },
            deep: true
        },
    },
    methods: {
        /**
         * @name: addNav 添加导航
         * @param {Number}  num 当前添加导航的下表
         * @return {*}
         */
        /*  */
        handleAdd() {
            this.dataList.push({
                title: '导航' + (this.dataList.length + 1),
                data: ''
            })
        },
        /**
         * @name: 更换图片
         * @param {String} index 索引值
         */
        async handleUpload(index, type) {
            let files = null
            let pathKey = type === 'cover' ? 'img_url' : 'data'
            if (type === 'cover') {
                files = await uni.chooseImage({ count: 1 })
            } else {
                files = await uni.chooseVideo({ count: 1 })
            }
            const file = files[0] ? files[0] : files[1]
            if (file.size > this.valueConfig.max) {
                return this.$message.error(`请上传小于${(this.valueConfig.max / (1024 * 1024)).toFixed(2) * 1}M视频`)
            }
            if (!file) return this.$message.error('上传出错')
            const progressKey = type === 'cover' ? 'progressList' : 'videoProgressList'
            try {
                const filePath = type === 'cover' ? file.tempFilePaths[0] : file.tempFilePath
                this.$set(this[progressKey], index, 0)
                const { data } = await this.$http('uploadImg', {
                    filePath,
                    name: 'file',
                    getTask: (e) => {
                        let progress = e.progress >= 99 ? 99 : e.progress
                        this.$set(this[progressKey], index, progress)
                    }
                })
                this.$set(this.dataList[index], pathKey, data.file_path)
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$set(this[progressKey], index, 100)
                    }, 100)
                })
            } catch (error) {
                this.$set(this[progressKey], index, 0)
            }
        },
        stopTip() {
            this.$message.warning('视频正在上传')
        },
        delItem(i, type) {
            type === 'cover' ? this.dataList[i].img_url = '' : this.dataList.splice(i, 1)
            this.upData()
        },
        upData(refresh = true) {
            this.$emit('input', this.dataList)
            if (this.listType == 'store') {
                this.$store.dispatch('setNewHomeData', {
                    data: this.dataList,
                    module_no: this.module_no,
                    refresh: refresh
                })
            } else {
                this.$store.dispatch('setHomeData', {
                    data: this.dataList,
                    refresh: refresh
                })
            }
        },
        handleMagic(e) {
            this.selectIndex = e.detail;
        },
    }
}
</script>
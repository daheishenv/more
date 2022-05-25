<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-07-01 19:11:19
-->
<template>
    <div
        class="base-upload"
        v-if="!destroyEl"
    >
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
        <draggable
            v-model="dataList"
            :forceFallback="true"
            animation="500"
        >
            <div
                class="base-upload-item"
                v-for="(item,index) in dataList"
                :key="index"
                :id="'upload' + index"
            >
                <div
                    class="base-upload-item-hd"
                    v-if="valueConfig.title"
                >
                    <span class="base-upload-item__title">{{valueConfig.title + (index + 1)}}</span>
                    <el-popconfirm
                        title="您已经设置过内容了，是否还要删除？"
                        v-if="item.img_url || item.name"
                        icon="el-icon-warning-outline"
                        icon-color="#f00"
                        @confirm="handleDelete(index)"
                    >
                        <span
                            slot="reference"
                            class="el-icon-delete item-head__del"
                        ></span>
                    </el-popconfirm>
                    <span
                        v-else
                        class="el-icon-delete item-head__del"
                        @click="handleDelete(index)"
                    ></span>
                </div>
                <div class="base-upload-item-bd">
                    <div
                        class="base-upload-item-bd__left"
                        v-if="item.img_url"
                    >
                        <c-image
                            class="base-upload-item-bd__left-img"
                            size="70px"
                            type="upload"
                            :src="item.img_url"
                            mode="aspectFill"
                        />
                        <div
                            v-if="progressList[index] > 0 && progressList[index]<100"
                            class="base-upload-item-bd__progress"
                        >
                            <animate-number
                                from="1"
                                :to="progressList[index]"
                            ></animate-number>%
                        </div>
                        <div
                            class="base-upload-item-bd__left-btn"
                            @click="handleUpload(index)"
                        >
                            更换图片
                        </div>
                    </div>
                    <div
                        v-else
                        class="base-upload-item-bd__left"
                        @click="handleUpload(index)"
                    >
                        <div
                            v-if="progressList[index] > 0 && progressList[index]<100"
                            class="base-upload-item-bd__progress"
                        >
                            <animate-number
                                from="1"
                                :to="progressList[index]"
                            ></animate-number>%
                        </div>
                        <span class="el-icon-plus"></span>
                        <div class="base-upload-item-bd__left-text">添加图片</div>
                    </div>
                    <div class="base-upload-item-bd__right">
                        <view
                            class="flex align-center mb12"
                            v-if="valueConfig && valueConfig.hsaTitle"
                        >
                            <view class="pl32 pr12 base-upload-item-bd__right-title">标题</view>
                            <el-input
                                type="text"
                                placeholder="请输入内容"
                                v-model="item.title"
                                :maxlength="valueConfig.maxlength || 4"
                                show-word-limit
                                size="mini"
                                style="width: 150px;"
                            >
                            </el-input>
                        </view>
                        <!-- <c-input
                            v-if="valueConfig && valueConfig.hsaTitle"
                            type="text"
                            class="base-upload-item-bd__right-input"
                            maxlength="4"
                            v-model="item.title"
                        >
                            <template slot="before">
                                <span>标题</span>
                            </template>
                        </c-input> -->
                        <c-input
                            type="select"
                            clearable
                            class="base-upload-item-bd__right-input base-upload-item-bd__right-input-small"
                            :class="{'base-upload-item-bd__right-text': !item.name}"
                            v-model="item.name"
                            placeholder="请选择跳转链接 >"
                            placeholderStyle="font-size: 12px; color: #1b7aff !important;"
                            @clear="handleClearLink(index)"
                            @select="chooseLink(index)"
                        >
                            <template slot="before">
                                <span>链接</span>
                            </template>
                            <template v-if="item.name">
                                <span>修改 ></span>
                            </template>
                        </c-input>
                    </div>
                </div>
            </div>
        </draggable>
        <el-button
            v-if="pushBtnText"
            class="base-upload-item-ft"
            plain
            icon="el-icon-plus"
            :disabled="dataList.length >= max"
            @click="handleAdd"
        >
            {{pushBtnText}}
        </el-button>
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
        max: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            dataList: [],// 修改的数据源
            defaultList: [],// 默认列表，用来对比change用的
            progressList: [],// 上传进度
            destroyEl: true
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
                this.defaultList = this.$deepClone(val)
                this.$emit('input', val)
                this.$emit('change', {
                    type: 'upload',
                    detail: val
                })
            },
            deep: true
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
         * @name: addNav 添加导航
         * @param {Number}  num 当前添加导航的下表
         * @return {*}
         */
        /*  */
        handleAdd() {
            this.dataList.push({
                title: '导航' + (this.dataList.length + 1),
                img_url: ''
            })
        },
        handleDelete(index) {
            this.dataList.splice(index, 1)
        },
        /**
         * @name: 更换图片
         * @param {String} index 索引值
         */
        async handleUpload(index) {
            let files = await uni.chooseImage({ count: 1 })
            const file = files[0] ? files[0] : files[1]
            if (!file) return this.$toast('上传出错')
            try {
                const filePath = file.tempFilePaths[0]
                this.$set(this.progressList, index, 0)
                const { data } = await this.$http('uploadImg', {
                    filePath,
                    name: 'file',
                    getTask: (e) => {
                        let progress = e.progress >= 99 ? 99 : progress
                        this.$set(this.progressList, index, progress)
                    }
                })
                this.$set(this.dataList[index], 'img_url', data.file_path)
                this.$nextTick(() => {
                    this.$set(this.progressList, index, 100)
                })
            } catch (err) {
                this.$set(this.progressList, index, 0)
            }
        },
        handleClearLink(index) {
            const addItem = {
                type: '',
                name: '',
                title: this.dataList[index].title,
                img_url: this.dataList[index].img_url
            }
            this.dataList.splice(index, 1, addItem)
        },
        chooseLink(index) {
            parent.operation && parent.operation({
                module_name: this.moduleName_,
                value: this.dataList[index],
                page_id: this.$store.state.page_id
            }, (data) => {
                const addItem = {
                    type: data.typeVal,
                    name: data.typeTitle,
                    title: this.dataList[index].title,
                    img_url: this.dataList[index].img_url
                }
                data.detailId && (addItem.data = data.detailId)
                this.dataList.splice(index, 1, addItem)
            })
        }
    }
}
</script>
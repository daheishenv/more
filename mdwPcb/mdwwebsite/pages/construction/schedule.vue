<template>
    <div class="schedule pt25">
        <el-form
            ref="form"
            :model="form"
            label-width="82px"
            size="medium"
        >
            <div class="c-bg-fff p40">
                <div class="schedule-title">
                    <!-- title="我是工地名称" -->
                    <line-title :need-line="false">
                        <div class="sub-title pl16">(如果您将某个阶段设置为完工，或跳过某个阶段，业主会收到阶段完工的提示，并将施工进度显示为下一阶段，下次更新内容时，您无法再次选择改该阶段)</div>
                    </line-title>
                </div>
                <div class="schedule-form pt25">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="施工阶段：">
                                <el-select
                                    v-model="form.stage_id"
                                    placeholder="请选择施工阶段"
                                    :disabled="disabled_"
                                >
                                    <el-option
                                        v-for="(item,index) in stageList"
                                        :key="index"
                                        :value="item.id"
                                        :label="item.name"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="阶段完工：">
                                <el-radio-group
                                    v-model="form.status"
                                    size="medium"
                                    :disabled="disabled_"
                                >
                                    <el-radio-button label="1">是</el-radio-button>
                                    <el-radio-button label="0">否</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="阶段描述：">
                        <el-input
                            v-model="form.content"
                            type="textarea"
                            minlength="200"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="添加图片："
                        class="schedule-upload"
                    >
                        <upload-swiper
                            :upload-list="uploadList"
                            width="200px"
                            height="200px"
                            limit="20"
                            auto-crop-width="400"
                            auto-crop-height="400"
                            :fixed-number="[1,1]"
                            @upload="upload"
                            @remove="remove"
                        />
                    </el-form-item>
                </div>
            </div>
            <div class="schedule-btn p40">
                <el-button
                    type="primary"
                    size="medium"
                    @click="handleSave"
                >提交</el-button>
                <el-button
                    type="primary"
                    plain
                    size="medium"
                    @click="handleCancel"
                >取消</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import lineTitle from '@/components/line-title/line-title'
import UploadSwiper from '@/components/upload/upload-swiper.vue'
export default {
    components: {
        lineTitle,
        UploadSwiper
    },
    data() {
        return {
            id: '',
            form: {
                site_id: '',
                stage_id: '',
                content: '',
                process_images: '',
                status: 0
            },
            stageList: [
                {
                    value: '水电阶段',
                    label: '水电阶段'
                }, {
                    value: '泥水阶段',
                    label: '泥水阶段'
                }
            ],
            uploadList: [],
            type: 'add', // add/edit
            stage_id: '',
            status: 0
        }
    },
    computed: {
        disabled_() {
            return this.type === 'edit'
        }
    },
    mounted() {
        const { id, type, stage_id, status, process_images = [], content } = this.$route.query
        this.id = Number(id)
        this.type = type || 'add'
        this.stage_id = stage_id || ''
        this.status = status || 0
        console.log(process_images, 'process_imagesprocess_imagesprocess_images')
        let uploadList = []
        if (process_images.length > 0) {
            uploadList = JSON.parse(process_images)
            this.uploadList = uploadList.map((v) => {
                return {
                    img: v,
                    url: v,
                    src: v
                }
            })
        } else {
            this.uploadList = []
        }
        console.log(this.uploadList, 'this.uploadList')
        this.form.content = content || ''
        this.handleEdit()
    },
    methods: {
        // 获取信息
        async handleEdit() {
            const {
                data: {
                    stageList
                }
            } = await this.$axios.$post('/Decoration/editNotes', { id: this.id })
            if (this.stage_id) {
                this.form.stage_id = Number(this.stage_id)
                this.form.status = this.status
            }
            this.stageList = stageList
        },
        // 提交
        async handleSave() {
            const params = this.$deepClone(this.form)
            params.process_images = this.uploadList.map(v => v.src)
            params.site_id = this.id
            if (params.process_images.length <= 0) {
                this.$message({
                    type: 'error',
                    message: '至少需要上传一张图片'
                })
                return
            }
            if (this.type === 'add') {
                params.id = 0
            } else {
                params.id = this.stage_id
            }
            const { code, msg } = await this.$axios.$post('/Decoration/saveNotes', params)
            this.$message({
                type: code === 0 ? 'success' : 'error',
                message: msg
            })
            code === 0 && this.handleCancel()
        },
        upload(res) {
            const img = {
                img: res.src,
                url: res.src,
                src: res.src
            }
            this.uploadList = [...this.uploadList, img]
            console.log('upload 最终数组', this.uploadList)
        },
        remove(res) {
            this.uploadList.splice(res.detail.value, 1)
            console.log('remove 最终数组', this.uploadList)
        },
        // 取消修改，新增
        handleCancel() {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
.schedule {
    &-title {
        .sub-title {
            font-size: 12px;
            color: #f60d0d;
            line-height: 16px;
            // margin-left: 16px;
        }
    }
    /deep/ .el-form {
        .el-upload--picture-card {
            background-color: #f9f9f9;
            border: none;
            border-radius: 0;
            width: 200px;
            height: 200px;
            line-height: 200px;
        }
        .el-upload-list__item {
            width: 200px;
            height: 200px;
            border-radius: 0;
            border: none;
            margin: 0 16px 8px 0;
        }
        .el-textarea__inner {
            min-height: 200px !important;
        }
        .company-uploader-item {
            padding: 0 16px 16px 0;
        }
    }
    &-upload {
        /deep/ .el-form-item__content {
            width: 1300px;
        }
    }
    &-btn {
        display: flex;
        justify-content: center;
    }
}
</style>

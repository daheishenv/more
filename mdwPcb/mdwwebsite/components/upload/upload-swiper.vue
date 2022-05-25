<template>
    <div class="company-uploader">
        <div
            v-if="uploadList.length <= limit"
            class="company-uploader-item"
        >
            <div class="uploader-box">
                <el-upload
                    class="uploader"
                    action="#"
                    :show-file-list="false"
                    :on-change="changeUpload"
                    :on-success="uploadSuccess"
                    :style="[{height, width }]"
                    :before-upload="beforeAvatarUpload"
                >
                    <i
                        ref="upload"
                        :style="[{height, width }]"
                        class="el-icon-plus avatar-uploader-icon"
                    ></i>
                </el-upload>
                <div
                    class="upload-btn"
                    @click="beforeUpload"
                >

                </div>
            </div>
            <el-input
                v-if="showInput"
                v-model="input"
                :style="[{ width, marginTop: '12px' }]"
                placeholder="请输入荣誉资质的名称"
                @blur="handleInput"
            ></el-input>

        </div>
        <!-- 展示内容 -->
        <template v-if="uploadList.length">
            <div
                v-for="(item, index) in uploadList"
                :key="index"
                class="company-uploader-item"
            >
                <div class="uploader-box">
                    <!-- <el-upload
                    class="uploader"
                    action="#"
                    :show-file-list="false"
                    :on-success="handleUpload"
                    :style="[{height, width }]"
                    :before-upload="beforeAvatarUpload"
                > -->

                    <div
                        v-if="item.img_url ||item.img"
                        class="avatar"
                        :style="[{height, width }]"
                    >
                        <div
                            v-if="mode === 'construction'"
                            @click="handleSetMain(item.is_main, index)"
                        >
                            <div
                                v-if="item.is_main"
                                class="status-cls status-cls__blue"
                            >封面</div>
                            <div
                                v-else
                                class="status-cls__set"
                            >
                                设为封面
                            </div>
                        </div>
                        <el-image
                            class="avatar-img"
                            fit="fill"
                            :src="item.img_url ||item.img"
                        />
                        <div
                            v-if="userInfo && userInfo.id > 0"
                            class="avatar-remove"
                            @click.stop="handleRemove(index)"
                        >
                            <i class="el-icon-delete"></i>
                        </div>
                    </div>
                    <!-- <i
                        ref="upload"
                        :style="[{height, width }]"
                        class="el-icon-plus avatar-uploader-icon"
                    ></i>
                </el-upload> -->

                </div>
                <el-input
                    v-if="showInput"
                    v-model="item.state"
                    :style="[{ width, marginTop: '12px' }]"
                    placeholder="请输入荣誉资质的名称"
                    @blur="handleInput(item.text)"
                ></el-input>
            </div>
        </template>
        <el-dialog
            title="图片剪裁"
            :visible.sync="dialogVisible"
            append-to-body
        >
            <div class="cropper-content">
                <div
                    class="cropper"
                    style="text-align:center"
                >
                    <vueCropper
                        ref="cropper"
                        :img="option.img"
                        :output-size="option.size"
                        :output-type="option.outputType"
                        :info="true"
                        :full="option.full"
                        :can-move="option.canMove"
                        :can-move-box="option.canMoveBox"
                        :original="option.original"
                        :auto-crop="option.autoCrop"
                        :fixed="option.fixed"
                        :fixed-number="fixedNumber"
                        :center-box="option.centerBox"
                        :info-true="option.infoTrue"
                        :fixed-box="option.fixedBox"
                        :auto-crop-width="autoCropWidth"
                        :auto-crop-height="autoCropHeight"
                    ></vueCropper>
                </div>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    :loading="loading"
                    :disabled="disabled"
                    @click="finish"
                >确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        uploadList: {
            type: Array,
            default: () => {
                return []
            }
        },
        width: {
            type: [Number, String],
            default: '280px'
        },
        height: {
            type: [Number, String],
            default: '180px'
        },
        showInput: {
            type: [Boolean, String],
            default: false
        },
        // 限制数量
        limit: {
            type: [Number, String],
            default: 5
        },
        // 类型
        mode: {
            type: String,
            default: ''
        },
        // 默认生成截图框宽度
        autoCropWidth: {
            type: [Number, String],
            default: 720
        },
        // 默认生成截图框高度
        autoCropHeight: {
            type: [Number, String],
            default: 460
        },
        // 截图框的宽高比例
        fixedNumber: {
            type: Array,
            default: () => {
                return [72, 46]
            }
        }
    },
    data() {
        return {
            disabled: false,
            fileList: [],
            input: '',
            dialogVisible: false,
            // 裁剪组件的基础配置option
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                fixedBox: false, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [4, 3], // 截图框的宽高比例
                full: false, // 是否输出原图比例的截图
                canMoveBox: true, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: true, // 截图框是否被限制在图片里面
                infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                canMove: false // 图片是否能拖动
            },
            // 防止重复提交
            loading: false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        handleUpload(response, event) {
            const ev = event || window.event
            const f = ev.raw || ev.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(f)
            reader.onload = async (e) => {

            }
        },
        beforeUpload() {
            const { id = 0 } = this.userInfo
            if (id > 0 || this.mode === 'construction') {
                this.$refs.upload.click()
            } else {
                this.$confirm('请先绑定企业信息?', '提示', {
                    confirmButtonText: '前往绑定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/wallet/firm')
                }).catch(() => {

                })
            }
        },
        handleInput(text) {
            const emitChange = { detail: { value: text } }
            this.$emit('upload', emitChange)
        },
        handleRemove(index) {
            const emitChange = { detail: { value: index } }
            this.$emit('remove', emitChange)
        },
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
            if (!isJPG) {
                this.$message.error('请上传 JPG/PNG 格式的图片!')
            }
            return isJPG
        },
        // 上传按钮   限制图片大小
        changeUpload(file, fileList) {
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('上传文件大小不能超过 5MB!')
                return false
            }
            this.fileInfo = file
        },
        uploadSuccess() {
            const reader = new FileReader()
            // 图片文档流 转化为base64
            reader.readAsDataURL(this.fileInfo.raw)
            // 转化成果以后执行
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                this.option.img = data
            }

            // 上传成功后将图片地址赋值给裁剪框显示图片
            this.$nextTick(() => {
                this.dialogVisible = true
            })
        },
        finish() {
            this.disabled = true
            this.$refs.cropper.getCropBlob(async (file) => {
                try {
                    const formData = new FormData()
                    formData.set('file', file)
                    formData.set('name', 'file')
                    const { data, code, msg } = await this.$axios.$post('/Tools/upload', formData)
                    this.disabled = false
                    this.$message({
                        message: msg,
                        type: code === 0 ? 'success' : 'error'
                    })
                    this.$emit('upload', data)
                    code === 0 && (this.dialogVisible = false)
                    this.disabled = false
                } catch (err) {
                    this.disabled = false
                }
            })
        },
        handleSetMain(item, index) {
            const params = {
                is_main: item,
                index
            }
            this.$emit('setMain', params)
        }
    }
}
</script>

<style lang="scss" scoped>
.company-uploader {
    display: flex;
    flex-wrap: wrap;
    &-item {
        box-sizing: border-box;
        padding: 20px 20px 0 0;
    }
    .uploader-box {
        position: relative;
        display: flex;
        .upload-btn {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            position: absolute;
            top: 0;
            cursor: pointer;
        }
    }
    .uploader {
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-icon-plus {
        font-size: 28px;
        color: #8c939d;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f9f9f9;
    }
    .avatar {
        // width: 420px;
        // height: 140px;
        display: block;
        position: relative;
        &-img {
            width: 100%;
            height: 100%;
            // border-radius: 6px;
        }
        .avatar-remove {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            right: 8px;
            top: 8px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #000000;
            color: #fff;
            cursor: pointer;
        }
        .status-cls {
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 0px 0px 13px 0px;
            width: 70px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            z-index: 100;
            &__blue {
                background: #4185ec;
                cursor: pointer;
            }
            &__set {
                position: absolute;
                top: 50%;
                left: 50%;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 15px;
                color: #fff;
                transform: translate(-50%, -50%);
                font-size: 12px;
                padding: 8px 20px;
                cursor: pointer;
                z-index: 100;
            }
        }
    }
}
.cropper-content {
    .cropper {
        width: auto;
        height: 400px;
    }
}
</style>

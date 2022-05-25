
<template>
    <div class="company">
        <el-tabs v-model="activeName">
            <el-tab-pane
                label="基本信息"
                name="0"
            >
                <el-form
                    ref="form"
                    label-width="150px"
                    :model="model"
                    :rules="rules"
                >
                    <line-title
                        title="工商信息（必填）"
                        class="line-title"
                    />
                    <el-form-item
                        label="公司名称："
                        prop="name"
                    >
                        <el-input
                            v-model="model.name"
                            placeholder="请填写营业执照上的公司名称"
                            :disabled="binSaas"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="统一社会信用代码："
                        prop="society_code"
                    >
                        <el-input
                            v-model="model.society_code"
                            placeholder="请填写营业执照上的信用代码"
                            :disabled="binSaas"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="公司营业执照："
                        prop="license_url"
                    >
                        <el-upload
                            class="license-upload"
                            action="#"
                            list-type="picture-card"
                            :show-file-list="false"
                            :on-success="handleUploadLicence"
                            :before-upload="beforeAvatarUpload"
                            :disabled="binSaas"
                        >
                            <z-image
                                v-if="model.license_url"
                                :src="model.license_url"
                            ></z-image>
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </el-form-item>
                    <div class="split-line"></div>
                    <line-title
                        title="基本信息（必填）"
                        class="line-title"
                    />
                    <el-form-item label="品牌 logo：">
                        <el-upload
                            class="logo-uplooad"
                            action="#"
                            list-type="picture-card"
                            :show-file-list="false"
                            :on-change="handleUploadLogo"
                            :before-upload="beforeAvatarUpload"
                            :disabled="binSaas"
                        >
                            <el-image
                                v-if="model.logo"
                                style="border-radius:50%"
                                class="logo"
                                :src="model.logo"
                            ></el-image>
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item
                        label="公司简称："
                        prop="short_name"
                    >
                        <el-input
                            v-model="model.short_name"
                            placeholder="最多不超过8个字"
                            maxlength="8"
                            :disabled="binSaas"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="接单城市："
                        prop="province_id"
                    >
                        <z-address
                            v-model="model.addressId"
                            :disabled="binSaas"
                            type="city"
                        />
                        <el-input
                            v-model="model.province_id"
                            style="display:none"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="联系人称呼："
                        prop="contact"
                    >
                        <el-input
                            v-model="model.contact"
                            :disabled="binSaas"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="接单手机号："
                        prop="mobile"
                    >
                        <el-input
                            v-model="model.mobile"
                            :disabled="binSaas"
                        ></el-input>
                    </el-form-item>
                    <div class="split-line"></div>
                    <line-title
                        title="其他信息"
                        class="line-title"
                    />
                    <el-form-item
                        label="公司详细地址："
                        prop="address"
                    >
                        <el-input
                            v-model="model.address"
                            :disabled="binSaas"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="公司电话："
                        prop="company_phone"
                    >
                        <el-input
                            v-model="model.company_phone"
                            :disabled="binSaas"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="公司宣传语："
                        prop="publicity_desc"
                    >
                        <el-input
                            v-model="model.publicity_desc"
                            :disabled="binSaas"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button
                            type="primary"
                            class="submit"
                            :disabled="binSaas"
                            @click="submit"
                        >提交</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane
                label="企业简介"
                name="1"
            >
                <line-title
                    title="企业简介（必填）"
                    class="line-title"
                />
                <el-form
                    label-width="131px"
                    :model="model"
                >
                    <el-form-item
                        label="公司简介："
                        prop="introduction"
                    >
                        <!-- <el-input
                            v-model="model.introduction"
                            type="textarea"
                            resize="none"
                            :disabled="binSaas"
                        >
                        </el-input> -->
                        <section class="">
                            <input
                                id="file"
                                ref="input"
                                class="file"
                                type="file"
                                style="display:none"
                                @change="doUpload"
                            >
                            <div
                                v-quill:myQuillEditor="editorOption"
                                class="ql-container ql-snow quill-editor"
                                :content="model.introduction"
                                @change="onEditorChange($event)"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @ready="onEditorReady($event)"
                            >
                            </div>
                        </section>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button
                            type="primary"
                            class="submit"
                            :disabled="binSaas"
                            @click="submit"
                        >提交</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
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
import lineTitle from '@/components/line-title/line-title'
export default {
    components: {
        lineTitle
    },
    async asyncData({ $axios }) {
        let info
        const binSaas = false
        try {
            const { data: model } = await $axios.$post('/company/getInfo')
            model.addressId = [model.province_id.toString(), model.city_id.toString()]
            info = model
            // binSaas = model.shop_uid > 0
        } catch (error) {
            console.log(error)
        }
        return {
            model: info,
            binSaas
        }
    },
    data() {
        const self = this
        const addressValidate = (rule, value, callback) => {
            console.log(this.model)
            if (!this.model.addressId[0]) {
                callback(new Error('请选择接单城市'))
            } else {
                callback()
            }
        }
        return {
            dialogVisible: false,
            loading: false,
            disabled: false,
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                fixedBox: false, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [3, 3], // 截图框的宽高比例
                full: false, // 是否输出原图比例的截图
                canMoveBox: true, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                canMove: false // 图片是否能拖动
            },
            autoCropWidth: 120,
            autoCropHeight: 120,
            fixedNumber: [2, 2],
            model: {
                logo: '',
                province_id: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
                ],
                society_code: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
                license_url: [{
                    required: true, message: '请上传公司营业执照', trigger: 'blur'
                }],
                province_id: [
                    { required: true, validator: addressValidate, message: '请选择接单城市', trigger: 'blur' }
                ],
                contact: [
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入接单手机号', trigger: 'blur' }
                ],
                short_name: [
                    { required: true, message: '请输入公司简称', trigger: 'blur' }
                ],
                publicity_desc: [
                    { max: 20, message: '最长 20 个字符!', trigger: 'blur' }
                ]
            },
            activeName: 0,
            binSaas: false,
            editorOption: {
                // some quill options
                placeholder: '请输入企业简介',
                modules: {
                    imageDrop: true,
                    imageResize: {
                        displayStyles: { // 放大缩小
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                    },
                    // clipboard: {
                    //     matchers: [[Node.ELEMENT_NODE, this.handleCustomMatcher]] // 粘贴版，处理粘贴时候带图片
                    // },
                    toolbar: {
                        container: [
                            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
                            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
                            [{ indent: '-1' }, { indent: '+1' }],
                            [{ size: ['small', false, 'large', 'huge'] }], // 配置字号
                            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
                            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
                            [{ align: [] }], // 对齐方式-----
                            ['clean'], // 清除文本格式-----
                            ['image'] // 链接、图片、视频-----
                        ],
                        handlers: {
                            image() {
                                this.quill.format('image', false)// 禁用quill内部上传图片方法
                                self.imgHandler(this)
                            }
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            const e = document.querySelector('.ql-editor')
            e.style = 'min-height:200px'
        })
    },
    methods: {
        finish() {
            this.disabled = true
            this.$refs.cropper.getCropBlob(async (file) => {
                try {
                    const formData = new FormData()
                    formData.set('file', file)
                    formData.set('name', 'file')
                    const { data, code, msg } = await this.$axios.$post('/Tools/upload', formData)
                    this.$message({
                        message: msg,
                        type: code === 0 ? 'success' : 'error'
                    })
                    this.model.logo = data.src
                    // this.$emit('upload', { detail: { value: { state: this.input, img: data.src } } })
                    code === 0 && (this.dialogVisible = false)
                    this.disabled = false
                } catch (err) {
                    this.disabled = false
                }
            })
        },
        imgHandler(handle) {
            this.quill = handle.quill
            const inputfile = document.getElementById('file')
            inputfile.click()
        },
        async doUpload() {
            const file = document.getElementById('file').files[0]
            const formdata = new FormData()// 创建form对象
            formdata.append('file', file, file.name)
            const res = await await this.$axios.$post('/Tools/upload', formdata)
            const length = this.quill.getSelection().index
            this.quill.insertEmbed(length, 'image', res.data.src)
        },
        async commonUpload(event, property) {
            const { data, result, msg } = await this.$upload(event)
            this.$message({
                type: result ? 'success' : 'warning',
                message: msg
            })
            if (result) {
                this.model[property] = data.src
            }
        },
        handleUploadLicence(res, event) {
            this.commonUpload(event, 'license_url', res)
        },
        handleUploadLogo(res, event) {
            console.log(res, event)
            const reader = new FileReader()
            // 图片文档流 转化为base64
            reader.readAsDataURL(res.raw)
            // 转化成果以后执行
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                console.log(data)
                this.option.img = data
            }
            this.$nextTick(() => {
                this.dialogVisible = true
            })
            // this.commonUpload(event, 'logo', res)
        },
        submit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    this.model.province_id = this.model.addressId[0]
                    this.model.city_id = this.model.addressId[1]
                    this.model.district_id = this.model.addressId[2]
                    if (this.activeName === '1') {
                        const { msg, result } = await this.$axios.$post('/company/editInfo', { type: 'info', introduction: this.model.introduction })
                        this.$message({
                            type: result ? 'success' : 'warning',
                            message: msg
                        })
                        result && this.updateForm()
                    } else {
                        const { msg, result } = await this.$axios.$post('/company/editInfo', this.model)
                        this.$message({
                            type: result ? 'success' : 'warning',
                            message: msg
                        })
                        result && this.updateForm()
                    }
                }
            })
        },
        async updateForm() {
            const { data: model, code, msg } = await this.$axios.$post('/company/getInfo')
            !code === 0 && this.$message.warning(msg)
            if (code === 0) {
                model.addressId = [model.province_id.toString(), model.city_id.toString()]
                this.model = model
            }
            this.$store.dispatch('getUserInfo')
            const d = document.querySelector('.b-header')
            d.scrollIntoView({ behavior: 'smooth' })
        },
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
            if (!isJPG) {
                this.$message.error('请上传 JPG/PNG 格式的图片!')
            }
            return isJPG
        },
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            console.log('editor change!', editor, html, text)
            this.model.introduction = html
        }
    }
}
</script>
<style lang="scss" scoped>
.company {
    background: #fff;
    padding: 40px 40px 48px;
    /deep/ .el-tabs__nav-scroll {
        .el-tabs__item {
            font-size: 16px;
        }
    }
    /deep/.el-form {
        .el-form-item {
            margin-bottom: 16px;

            .el-form-item__content {
                line-height: 34px;
            }

            .el-form-item__label {
                padding-right: 5px;
                line-height: 34px;
                color: #333;
            }
        }

        .el-input__inner {
            height: 34px;
            line-height: 34px;
            width: 400px;
            border-radius: 0;
            border: 1px solid #d6d6d6;
        }

        .el-textarea {
            width: 400px;

            textarea {
                height: 182px;
                border: 1px solid #d6d6d6;
                border-radius: 0;
            }
        }
    }

    .license-upload {
        /deep/.el-upload-list__item {
            width: 120px;
            height: 80px;
            border: 0;
        }

        /deep/.el-upload {
            width: 120px;
            height: 80px;
            line-height: 80px;
            border: 1px solid #d6d6d6;
            background: #f9f9f9;
            border-radius: 0;

            .el-icon-plus {
                font-size: 20px;
            }
        }
    }

    .logo-uplooad {
        /deep/.el-upload-list__item {
            width: 80px;
            height: 80px;
            border: 0;
        }
        /deep/.el-upload--picture-card {
            border: none !important;
        }
        /deep/.el-upload {
            width: 80px;
            height: 80px;
            line-height: 80px;
            // border: 1px solid #d6d6d6;
            // background: #f9f9f9;
            border-radius: 0;

            .el-icon-plus {
                font-size: 20px;
            }
        }
    }

    .line-title {
        padding: 30px 0;
        font-size: 14px;
        font-weight: normal;
    }

    .split-line {
        margin: 40px 0 0px 0;
        height: 1px;
        background: #d6d6d6;
        width: 100%;
    }

    .logo {
        width: 80px;
        height: 80px;
        border: 1px solid #d6d6d6;
    }

    .submit {
        width: 400px;
        padding: 9px 12px;
    }
}

.quill-editor {
    min-height: 200px;
    overflow-y: auto;
    .ql-editor {
        min-height: 200px !important;
    }
}
.cropper-content {
    .cropper {
        width: auto;
        height: 400px;
    }
}
</style>

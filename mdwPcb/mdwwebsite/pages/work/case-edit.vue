<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2022-04-27 17:22:21
-->
<template>
    <div class="detail">
        <div class="case-search">
            <el-form
                ref="form"
                :inline="true"
                :model="dataBox"
                label-width="120px"
                :rules="rules"
            >
                <el-row>
                    <el-col
                        :span="12"
                        style="margin-right: 20px"
                    >
                        <el-form-item
                            label="工艺名称："
                            prop="title"
                        >
                            <el-input
                                v-model="dataBox.title"
                                placeholder="请输入工艺名称，不超过20个字"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="工艺类别："
                            prop="cat_id"
                        >
                            <el-select
                                v-model="dataBox.cat_id"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="(item,i) in cat_name_list"
                                    :key="i"
                                    :label="item.cat_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="工艺简介："
                            prop="title"
                        >
                            <el-input
                                v-model="dataBox.desc"
                                type="textarea"
                                placeholder="请输入简介内容"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="封面图："
                            prop="img"
                        >
                            <el-upload
                                class="license-upload"
                                action="#"
                                list-type="picture-card"
                                :show-file-list="false"
                                :on-success="handleUploadLicence"
                                :before-upload="beforeAvatarUpload"
                            >
                                <z-image
                                    v-if="dataBox.cover_image"
                                    :src="dataBox.cover_image"
                                ></z-image>
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="case-cont">
            <div
                v-quill:myQuillEditor="editorOption"
                class="quill-editor"
                :content="dataBox.content"
                @change="onEditorChange($event)"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
            >
            </div>
        </div>
        <div class="case-btn">
            <el-button
                type="primary"
                @click="submit"
            >提交</el-button>
            <el-button
                type="primary"
                plain
                @click="$router.go(-1)"
            >取消</el-button>
            <el-button
                v-if="id"
                type="danger"
                plain
                @click="delCase"
            >删除</el-button>
        </div>
    </div>
</template>
<script>
export default {
    async asyncData({ $axios }) {
    },
    data() {
        const validator1 = (rule, value, callback) => {
            if (this.dataBox.cover_image === '') {
                callback(new Error('请选择图片'))
            } else {
                callback()
            }
        }
        return {
            query: {
                id: null
            },
            dataBox: {
                title: '',
                cat_id: '',
                desc: '',
                content: '',
                cover_image: ''
            },
            cat_name_list: [],
            rules: {
                title: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                cat_id: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                img: [
                    { required: true, validator: validator1, trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ]
            },
            editorOption: {
                // some quill options
                placeholder: '请输入内容',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
                        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ size: ['small', false, 'large', 'huge'] }], // 配置字号
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
                        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
                        [{ font: [] }], // 显示字体选择
                        [{ align: [] }], // 对齐方式-----
                        ['clean'], // 清除文本格式-----
                        ['image'] // 链接、图片、视频-----
                    ]
                }
            }
        }
    },
    created() {
        const { id } = this.$route.query
        this.id = Number(id)
        if (this.id) {
            this.getData()
        }
        this.initData()
    },
    methods: {
        async getData() {
            const { data } = await this.$axios.$post('/Articles/getInfo', { id: this.id })
            this.dataBox = data
        },
        async initData() {
            const { data } = await this.$axios.$post('/Articles/getCategory')
            this.cat_name_list = data
        },
        submit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    await this.$axios.$post('/Articles/save', { ...this.dataBox, id: this.id })
                    this.$message({
                        showClose: true,
                        message: '恭喜您,操作成功!',
                        type: 'success'
                    })
                    this.$router.push({
                        path: '/work'
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        delCase() {
            this.$confirm('删除工艺将会导致该工艺的所有信息丢失,确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$axios.$post('/Articles/delete', {
                    id: this.id
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.$router.push('/work')
            }).catch(() => {

            })
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
            this.dataBox.content = html
        },
        handleUploadLicence(res, event) {
            this.commonUpload(event, 'cover_image', res)
        },
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
            if (!isJPG) {
                this.$message.error('请上传 JPG/PNG 格式的图片!')
            }
            return isJPG
        },
        async commonUpload(event, property) {
            const { data, result, msg } = await this.$upload(event)
            this.$message({
                type: result ? 'success' : 'warning',
                message: msg
            })
            if (result) {
                this.dataBox[property] = data.src
            }
        }
    }
}
</script>
<style lang="scss">
.detail {
    margin: 24px 0 80px;
    .case-search {
        padding: 40px;
        background: #fff;
        .el-form-item {
            width: 100%;
            display: flex;
            .el-form-item__content {
                flex: 1;
            }
        }
    }
    .case-btn {
        margin-top: 60px;
        display: flex;
        justify-content: center;
    }
    .case-cont {
        padding: 24px;
        background: #fff;
    }
    .ql-editor {
        height: 500px;
    }
}
</style>

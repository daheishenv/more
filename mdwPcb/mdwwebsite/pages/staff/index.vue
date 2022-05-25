<template>
    <div
        v-infinite-scroll="reachBottomFn"
        :infinite-scroll-distance="20"
        :infinite-scroll-disabled="busy"
        class="wrapper"
    >
        <!-- <div class="tab">
            <div
                class="tab-item"
                :class="[!active?'active':'']"
                @click="changTab(0)"
            >设计师</div>
            <div
                class="tab-item "
                :class="[active?'active':'']"
                @click="changTab(1)"
            >工长</div>
        </div> -->
        <el-tabs
            v-model="active"
            @tab-click="changTab"
        >
            <el-tab-pane
                label="设计师"
                name="0"
            >
            </el-tab-pane>
            <el-tab-pane
                label="工长"
                name="1"
            >
            </el-tab-pane>

        </el-tabs>
        <div class="list">
            <div
                class="item uploader"
                @click="add"
            ></div>
            <div
                v-for="(item,index) in pageList"
                :key="item.id"
                class="item"
                @click="edit(item)"
            >
                <div class="item-avatar">
                    <img
                        class="avatar-img"
                        :src="item.user_picture"
                        alt=""
                    >
                    <div class="status">
                        <img
                            :src="getStatusImg_(item)"
                            alt=""
                        >
                    </div>
                </div>
                <div class="item-info ml16 fs12">
                    <div class="item-info__name fs16 bold">{{ item.username }}</div>
                    <div class="item-info__tag mt8">
                        <span
                            v-if="item.job_title"
                            class="red"
                        >{{ item.job_title }}</span>
                        <span class="blue">从业{{ item.year }}年</span>
                    </div>
                    <div class="item-info__tel mt8 c-999">Tel：{{ item.mobile_phone }}</div>
                    <div class="item-info__case mt8 c-999">
                        <span class="bluecolor"> {{ item.relate_num }}</span>个{{ active=='1'?'工地':'案例' }}
                    </div>
                </div>
                <img
                    class="item-del"
                    :src="require('@/assets/image/personal/del.png')"
                    @click.stop="delItem(item,index)"
                />
            </div>
        </div>
        <el-dialog
            :title="`新建/编辑${keyName_}`"
            :visible.sync="showForm"
            center
            width="600px"
            :close-on-click-modal="false"
            :show-close="false"
            style="margin-top: -8vh;"
        >
            <div class="form">
                <div class="top-wrap">
                    <div class="top-wrap__left">
                        <el-form
                            ref="form"
                            :model="form"
                            :rules="rules"
                            label-width="100px"
                        >
                            <el-form-item
                                label="姓名："
                                prop="username"
                            >
                                <el-input
                                    v-model="form.username"
                                    style="width:200px"
                                    :placeholder="`请输入${keyName_}姓名`"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="电话号码："
                                prop="mobile_phone"
                            >
                                <el-input
                                    v-model="form.mobile_phone"
                                    style="width:200px"
                                    placeholder="请输入电话号码"
                                    maxlength="11"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="职称："
                                prop="job_id"
                            >
                                <el-select
                                    v-model="form.job_id"
                                    style="width:200px"
                                    placeholder="请选择职称"
                                >
                                    <el-option
                                        v-for="(item,index) in jobTitleList"
                                        :key="index"
                                        :value="item.id"
                                        :label="item.name"
                                    >{{ item.name }}</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="城市："
                                prop="province_id"
                            >
                                <z-address
                                    v-model="addressIdObj"
                                    style="width:200px"
                                    type="all"
                                />
                                <el-input
                                    v-model="form.province_id"
                                    style="display:none"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="从业年限："
                                prop="year"
                            >
                                <el-input
                                    v-model="form.year"
                                    placeholder="只能输入数字"
                                    max="99"
                                    min="0"
                                    style="width:200px"
                                >
                                    <template slot="append">年</template>
                                </el-input>
                            </el-form-item>
                        </el-form>

                    </div>
                    <div class="top-wrap__right">
                        <div class="avatar">
                            <el-upload
                                action=""
                                accept="image/jpg,image/jpeg,image/png"
                                :show-file-list="false"
                                :on-change="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img :src="getFomrAvatar_" />
                            </el-upload>
                        </div>
                        <div class="link">点击上传头像</div>
                    </div>
                </div>

                <div
                    v-if="active=='0'"
                    class="item"
                >
                    <div class="item-label align-self">擅长风格：</div>
                    <div class="tag">
                        <div
                            v-for="(item,index) in jobStyleList"
                            :key="index"
                            :class="['tag-item cursor',checkActive_(item,index)]"
                            @click="clickTag(item,index)"
                        >{{ item.name }}</div>
                    </div>
                </div>
                <div class="txtarea mg-8">
                    <div class="txtarea-label item-label">个人简介：</div>
                    <div style="width:100%;padding-left:12px">
                        <el-input
                            v-model="form.introduction"
                            type="textarea"
                            style="width:100%"
                            :rows="5"
                            :placeholder="`请输入${keyName_}简介`"
                        ></el-input>
                    </div>
                </div>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="showForm = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submit"
                >确 定</el-button>
            </span>
        </el-dialog>
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
                    @click="handldcopper"
                >确认</el-button>
            </div>
        </el-dialog>
        <no-data
            :show-img="noData"
            :description="lodingText"
        />
    </div>
</template>
<script>
import listMixins from '@/mixins/list.js'
export default {
    mixins: [listMixins],
    async asyncData({ $axios }) {
        const { data } = await $axios.post('jobUser/getList', { page: 1, limit: 10, user_type: 'jobUser' })
        return {
            pageList: data.data.list,
            page: 2
        }
    },
    data() {
        const addressValidate = (rule, value, callback) => {
            console.log(this.form.province_id)
            if (!this.form.province_id) {
                callback(new Error('请选择城市'))
            } else {
                callback()
            }
        }
        return {
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobile_phone: [{ pattern: /^(?:(?:\+|00)86)?1\d{10}$/, required: true, message: '请输入正确格式的电话号码', trigger: 'blur' }],
                province_id: [
                    { required: true, validator: addressValidate, message: '请选择城市', trigger: 'blur' }
                ]
            },
            showForm: false,
            active: '0',
            job_style_ids: [],
            form: {
                name: '',
                user_picture: '',
                mobile_phone: '',
                year: '',
                job_id: '',
                introduction: '',
                province_id: ''

            },
            addressIdObj: [],
            autoReq: false,
            jobTitleList: [],
            jobStyleList: [],
            reqName: 'jobUser/getList',
            reqParams: {
                user_type: 'jobUser'
            },
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
            autoCropWidth: 100,
            autoCropHeight: 100,
            fixedNumber: [2, 2]
        }
    },
    computed: {
        checkActive_() {
            return (item, index) => {
                return item.active ? 'tag-active' : ''
            }
        },
        keyName_() {
            return this.active === '1' ? '工长' : '设计师'
        },
        getActiveParamsKey_() {
            return this.active === '1' ? 'foreman' : 'jobUser'
        },
        getFomrAvatar_() {
            return this.form.user_picture ? this.form.user_picture : require('@/assets/image/personal/default-avatar.png')
        },
        getStatusImg_() {
            return ({ audit_status }) => {
                switch (audit_status) {
                    case -1:
                        return require('@/assets/image/personal/audit.png')
                    case 1:
                        return require('@/assets/image/personal/pass.png')
                    case 2:
                        return require('@/assets/image/personal/reject.png')
                    default:
                        return ''
                }
            }
        }

    },
    created() {
        this.getOtherList()
    },
    methods: {
        changTab({ index }) {
            this.active = index
            this.reqParams.user_type = this.getActiveParamsKey_
            this.getOtherList()
            this.page = 1
            this.initPage(true, true)
        },
        async delItem(item, index) {
            const { data: { code, msg, result } } = await this.$axios.post('jobUser/delJobUser', { id: item.id, user_type: this.getActiveParamsKey_ })
            this.$message({
                message: code === 0 ? '操作成功' : msg,
                type: code === 0 ? 'success' : 'error'
            })
            if (result && code === 0) {
                this.pageList.splice(index, 1)
            }
        },

        submit() {
            const [province_id, city_id, district_id = ''] = this.addressIdObj
            this.form.province_id = province_id
            this.form.city_id = city_id
            this.form.district_id = district_id
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    let job_style_ids = ''
                    if (this.active === '0') {
                        job_style_ids = this.jobStyleList.filter(item => item.active).map(item => item.id).join(',')
                    }

                    try {
                        const { code, msg, result } = await this.$axios.$post('/jobUser/save', { ...this.form, job_style_ids, user_type: this.getActiveParamsKey_ })
                        if (code === 0) {
                            if (result) {
                                this.initPage(true, false)
                            }
                            this.showForm = !result
                        }
                        this.$message({
                            message: msg,
                            type: code === 0 ? 'success' : 'error'
                        })
                    } catch (error) {
                        console.log(error, 'errorerrorerrorerror')
                    }
                }
            })
        },
        add() {
            this.resetForm()
            this.showForm = true
        },
        async edit(item) {
            this.resetForm()
            const { data } = await this.$axios.$post('jobUser/getInfo', { id: item.id, user_type: this.getActiveParamsKey_ })
            if (data.job_style_ids) {
                const job_style_ids = data.job_style_ids.split(',')
                this.jobStyleList.forEach((item) => {
                    if (job_style_ids.includes(item.id + '')) { this.$set(item, 'active', true) }
                })
            }
            if (data.job_id === 0) {
                data.job_id = ''
            }
            this.addressIdObj = [data.province_id.toString(), data.city_id.toString(), data.district_id.toString()]
            this.form = data
            this.showForm = true
        },
        clickTag(tagItem) {
            this.$set(tagItem, 'active', !tagItem.active)
        },
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
            if (!isJPG) {
                this.$message.error('请上传 JPG/PNG 格式的图片!')
            }
            return isJPG
        },
        handleAvatarSuccess(res, event) {
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
        },
        handldcopper() {
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
                    this.form.user_picture = data.src
                    code === 0 && (this.dialogVisible = false)
                    this.disabled = false
                } catch (err) {
                    this.disabled = false
                }
            })
        },
        async getOtherList() {
            const { data: { job_title = [], job_style = [] } } = await this.$axios.$post('jobUser/getOtherList', { user_type: this.getActiveParamsKey_ })
            this.jobTitleList = job_title
            this.jobStyleList = job_style
        },
        resetForm() {
            for (const i of Object.keys(this.form)) {
                this.form[i] = ''
            }
            this.addressIdObj = []
            if (this.active === '1') {
                this.jobStyleList.forEach((item) => {
                    this.$set(item, 'active', false)
                })
            }
        }
    }
}
</script>
<style lang="scss">
.container {
    width: 100%;
    .quill-editor {
        min-height: 150px;
        overflow-y: auto;
    }
}

.wrapper {
    background: #fff;
    margin-top: 24px;
    min-height: calc(100vh - 124px);
    overflow: auto;
    /deep/ .el-tabs__nav {
        justify-content: center;
    }
    .el-tabs__nav-wrap {
        line-height: 78px;
        .el-tabs__nav-scroll {
            display: flex;
            justify-content: center;
            .el-tabs__item {
                font-size: 20px;
                padding-right: 40px;
            }
            .el-tabs__active-bar {
                width: 80px;
            }
        }
    }
    .tab {
        width: 100%;
        padding: 26px 0 00;
        display: flex;
        justify-content: center;
        border-bottom: 2px solid #d8d8d8;
        &-item {
            padding-bottom: 26px;
            margin: 0 40px;
            transition: all 0.2s linear;
            border-bottom: 2px solid #fff;
        }
        .active {
            border-color: #4185ec;
        }
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        padding: 24px;
        .item {
            min-width: 328px;
            height: 164px;
            border: 1px solid #d8d8d8;
            margin: 8px;
            display: flex;
            align-items: center;
            padding: 32px 24px;
            padding-right: 0;
            position: relative;
            &-avatar {
                position: relative;
                .avatar-img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
                .status {
                    position: absolute;
                    bottom: 3px;
                    width: 88px;
                    height: 23px;
                    left: 7px;
                }
            }
            &-info {
                display: flex;
                flex-direction: column;
                &__tag {
                    span {
                        min-width: 63px;
                        height: 20px;
                        border-radius: 2px;
                        padding: 2px 8px;
                        line-height: 20px;
                    }
                    .red {
                        border: 1px solid #f60d0d;
                        color: #f60d0d;
                    }
                    .blue {
                        border: 1px solid #4185ec;
                        color: #4185ec;
                    }
                }
            }
            &-del {
                position: absolute;
                right: 16px;
                top: 16px;
                cursor: pointer;
            }
        }

        .uploader {
            background: #f9f9f9;
            transition: color 0.25s;
            position: relative;
            cursor: pointer;
        }
        .uploader::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 30px;
            margin-left: -20px;
            margin-top: -6px;
            border-top: 2px solid;
            color: #999999;
        }
        .uploader::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            height: 30px;
            margin-left: -6px;
            margin-top: -20px;
            border-left: 2px solid;
            color: #999999;
        }
    }
}
.form {
    min-width: 431px;
    .top-wrap {
        display: flex;
        &__left {
            flex-shrink: 0;
        }
        &__right {
            flex: 1;
            flex-shrink: 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            .avatar {
                width: 100px;
                height: 100px;
                border: 1px solid #d8d8d8;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                img {
                    width: 100px;
                    height: 100px;
                }
            }
            .link {
                color: #4185ec;

                margin-top: 16px;
            }
        }
    }
    .item {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        &-label {
            min-width: 88px;
            text-align: right;
            color: #333333;
        }
        .tag {
            display: flex;
            flex-wrap: wrap;
            padding-left: 12px;
            &-item {
                min-width: 70px;
                height: 24px;
                border-radius: 2px;
                border: 1px solid #d8d8d8;
                text-align: center;
                line-height: 24px;
                color: #999999;
                margin: 0 8px 8px 0;
                padding: 0 8px;
            }
            .tag-active {
                color: #4185ec;
                border: 1px solid #4185ec;
            }
        }
    }
    .txtarea {
        display: flex;
        width: 100%;
        &-label {
            padding-top: 8px;
        }
    }
}
.align-self {
    align-self: flex-start;
}
.mg-8 {
    margin-top: -8px;
}
.bluecolor {
    color: #4185ec;
}
.mt8 {
    margin-top: 8px;
}
.ml16 {
    margin-left: 16px;
}
.c-999 {
    color: #999;
}
.fs16 {
    font-size: 16px;
}
.fs12 {
    font-size: 12px;
}
.bold {
    font-weight: 600;
}
.cursor {
    cursor: pointer;
}
.cropper-content {
    .cropper {
        width: auto;
        height: 400px;
    }
}
</style>


<template>
    <div class="account">
        <el-form
            label-position="left"
            label-width="73px"
            :model="model"
        >
            <line-title
                title="账户信息"
                class="line-title"
            />
            <el-form-item
                label="账户ID："
                prop="companyName"
            >
                {{ model.shop_uid }}
            </el-form-item>
            <el-form-item label="更换头像：">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    accept="image/jpg,image/jpeg,image/png"
                    :show-file-list="false"
                    :on-change="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <z-image
                        width="100px"
                        height="100px"
                        :src="model.user_picture"
                    />
                </el-upload>
            </el-form-item>
            <el-form-item
                prop="companyName"
                class="just-flex"
            >
                <template #label>
                    <div class="just-content">
                        <div class="just-title">昵称</div>
                        <div>：</div>
                    </div>
                </template>
                <div class="input-box">
                    <el-input
                        v-model="model.nick_name"
                        placeholder="请输入昵称"
                    ></el-input>
                </div>
            </el-form-item>

            <el-form-item
                prop="city"
                class="just-flex"
            >
                <template #label>
                    <div class="just-content">
                        <div class="just-title">城市</div>
                        <div>：</div>
                    </div>
                </template>
                <div class="input-box">
                    <z-address v-model="model.address_id" />
                </div>
            </el-form-item>
            <el-form-item
                prop="companyName"
                class="just-flex"
            >
                <template #label>
                    <div class="just-content">
                        <div class="just-title">绑定微信</div>
                        <div>：</div>
                    </div>
                </template>
                <div class="row-cell">
                    <span>{{ model.unionid || '--' }}</span>
                    <!-- <el-button
                        v-if="model.unionid"
                        type="text"
                        @click="remove('wechat')"
                    >点击解绑</el-button>
                    <el-button
                        v-else
                        type="text"
                        @click="changeWx"
                    >点击绑定微信</el-button> -->
                </div>
            </el-form-item>
            <el-form-item
                prop="companyName"
                class="just-flex"
            >
                <template #label>
                    <div class="just-content">
                        <div class="just-title">绑定手机</div>
                        <div>：</div>
                    </div>
                </template>
                <div class="row-cell">
                    <span>{{ encryptMobile(model.bind_mobile) }}</span>
                    <!-- <el-button
                        type="text"
                        @click="remove('mobile')"
                    >点击解除</el-button> -->
                    <el-button
                        type="text"
                        @click="changePhone(model.bind_mobile)"
                    >{{ model.bind_mobile ? '更换绑定手机' : '绑定手机号' }}</el-button>
                </div>
            </el-form-item>
            <el-button
                type="primary"
                class="submit"
                @click="save"
            >保存</el-button>
        </el-form>
        <el-dialog
            class="dialog-form"
            :visible.sync="dialogVisible"
            width="510px"
        >
            <div v-if="showCode">
                <z-image
                    class="qrcode"
                    width="200px"
                    height="200px"
                    src=""
                />
                <div class="tip">请使用微信扫码进行绑定！</div>
            </div>
            <div
                v-else
                class="form-box"
            >
                <line-title
                    class="title"
                    :title="dialogTitle"
                />
                <phone-code-form
                    type="changeMobile"
                    button-text="立即绑定"
                />
            </div>

        </el-dialog>
        <el-dialog
            title="图片剪裁"
            :visible.sync="cutdialogVisible"
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
                <el-button @click="cutdialogVisible = false">取 消</el-button>
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
import zAddress from '@/components/z-address'
import phoneCodeForm from '@/components/simple-form-base/phone-code-form'
export default {
    components: {
        lineTitle,
        zAddress,
        phoneCodeForm
    },
    async asyncData({ $axios }) {
        try {
            const { data } = await $axios.$post('/users/userinfo', {})
            const { shop_uid = '', user_picture = '', nick_name = '', sex = '', birthday = '', province_id = '', city_id = '', unionid = '', bind_mobile = '' } = data
            let address_id = []
            if (province_id && city_id) {
                address_id = [province_id.toString(), city_id.toString()]
            }
            return {
                model: {
                    shop_uid,
                    user_picture,
                    nick_name,
                    sex,
                    birthday,
                    address_id,
                    unionid,
                    bind_mobile
                }
            }
        } catch (err) {
            console.log(err)
        }
    },
    data() {
        return {
            dialogVisible: false,
            model: {},
            userInfo: {},
            dialogTitle: '',
            showCode: false,
            cutdialogVisible: false,
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
                    this.model.user_picture = data.src
                    // this.$emit('upload', { detail: { value: { state: this.input, img: data.src } } })
                    code === 0 && (this.cutdialogVisible = false)
                    this.disabled = false
                } catch (err) {
                    this.disabled = false
                }
            })
        },
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
            if (!isJPG) {
                this.$message.error('请上传 JPG/PNG 格式的图片!')
            }
            return isJPG
        },
        changePhone(phone) {
            this.showCode = false
            this.dialogTitle = phone ? '更换绑定手机' : '绑定手机号'
            this.dialogVisible = true
        },
        changeWx() {
            this.showCode = true
            this.dialogVisible = true
        },
        /**
         * @name: 简单的手机号加密处理
         * @param {*} mobile
         * @return {*}
         */
        encryptMobile(mobile) {
            if (!mobile) {
                return ''
            }
            const str1 = mobile.slice(0, 3)
            const str2 = mobile.slice(7, 11)
            return str1 + '****' + str2
        },
        /**
         * @name: 上传头像
         * @param {*} response
         * @param {*} file
         * @return {*}
         */
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
                this.option.img = data
                console.log(this.option.img)
            }
            this.$nextTick(() => {
                this.cutdialogVisible = true
            })
        },
        /**
         * @name: 解除绑定
         * @param {*} type
         * @return {*}
         */
        remove(type) {
            const msg = type === 'mobile' ? '确定解除绑定的手机号吗？' : '确定解除绑定的微信吗？'
            this.$confirm(msg, '解除绑定', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => { }).catch(() => {

            })
        },
        /**
         * @name: 保存个人信息修改
         * @param {*}
         * @return {*}
         */
        async save() {
            let province_id = ''
            let city_id = ''
            const { address_id } = this.model
            if (this.model.address_id.length) {
                province_id = address_id[0]
                city_id = address_id[1]
            }
            const params = {
                ...this.model,
                province_id,
                city_id
            }
            const { code, msg } = await this.$axios.$post('/users/edituserinfo', params)
            this.$message({
                message: code === 0 ? '保存成功' : msg,
                type: code === 0 ? 'success' : 'error'
            })
            this.$store.dispatch('getUserInfo')
        }
    }
}
</script>
<style lang="scss" scoped>
.account {
    min-width: 980px;
    min-height: 588px;
    background: #fff;
    padding: 0 30px 48px;
    .just-flex {
        /deep/.el-form-item__label {
            display: flex;
            line-height: 1 !important;
            height: 34px;
            align-items: center;
            .just-content {
                display: flex;
                flex: 1;
                height: 14px;
                .just-title {
                    flex: 1;
                    text-align: justify;
                    &::after {
                        content: "";
                        width: 100%;
                        display: inline-block;
                        overflow: hidden;
                        height: 0;
                    }
                }
            }
        }
    }

    /deep/.el-form {
        .el-form-item {
            margin-bottom: 20px;
            .el-form-item__content {
                line-height: 34px;
            }
            .el-form-item__label {
                line-height: 34px;
                color: #333;
                padding: 0;
            }
        }
        .input-box {
            .el-input__inner {
                height: 34px;
                line-height: 34px;
                width: 262px;
                border-radius: 0;
                border: 1px solid #d6d6d6;
            }
        }
        .input-birthday {
            .el-input__inner {
                height: 34px;
                line-height: 34px;
                width: 262px;
                border-radius: 0;
                border: 1px solid #d6d6d6;
            }
            .el-input__icon {
                line-height: 34px;
            }
            .el-input__suffix {
                right: -35px;
            }
        }
    }
    .line-title {
        padding: 30px 0;
    }
    .user-image {
        width: 80px;
        height: 80px;
        border: 1px solid #d6d6d6;
    }
    .submit {
        width: 120px;
        padding: 9px 12px;
    }
    .row-cell {
        display: flex;
        align-items: center;
        line-height: 1;
        height: 34px;
        color: #333333;
        span {
            margin-right: 30px;
        }
        /deep/.el-button {
            padding: 9px 0px;
            margin-right: 30px;
            margin-left: 0;
        }
    }
}
.dialog-form {
    /deep/.el-dialog__body {
        padding: 10px 20px 30px;
    }
}
.qrcode {
    margin: 0 auto;
}
.tip {
    text-align: center;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    margin-top: 16px;
}
.form-box {
    padding: 0 102px;
    .title {
        padding-bottom: 16px;
    }
}
.cropper-content {
    .cropper {
        width: auto;
        height: 400px;
    }
}
</style>

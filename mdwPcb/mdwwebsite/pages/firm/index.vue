
<template>
    <div class="company">
        <el-form
            label-width="131px"
            :model="model"
        >
            <line-title
                title="工商信息（必填）"
                class="line-title"
            />
            <el-form-item
                label="公司名称："
                prop="companyName"
            >
                <el-input
                    v-model="model.name"
                    placeholder="请填写营业执照上的公司名称"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="统一社会信用代码："
                prop="companyName"
            >
                <el-input
                    v-model="model.society_code"
                    placeholder="请填写营业执照上的信用代码"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="公司营业执照："
                prop="companyName"
            >
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                >
                    <z-image :src="model.license_url"></z-image>
                    <!-- <i class="el-icon-plus"></i> -->
                </el-upload>
            </el-form-item>
            <div class="split-line"></div>
            <line-title
                title="基本信息（必填）"
                class="line-title"
            />
            <el-form-item label="品牌 logo：">
                <el-image
                    class="logo"
                    src="http://placeimg.com/640/480/animals"
                ></el-image>
            </el-form-item>
            <el-form-item
                label="公司简称："
                prop="companyName"
            >
                <el-input
                    v-model="model.short_name"
                    placeholder="最多不超过8个字"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="接单城市："
                prop="companyName"
            >
                <el-cascader
                    :props="props"
                    placeholder="请选择城市"
                ></el-cascader>
            </el-form-item>
            <el-form-item
                label="联系人称呼："
                prop="companyName"
            >
                <el-input v-model="model.contact"></el-input>
            </el-form-item>
            <el-form-item
                label="接单手机号："
                prop="companyName"
            >
                <el-input v-model="model.mobile"></el-input>
            </el-form-item>
            <div class="split-line"></div>
            <line-title
                title="其他信息"
                class="line-title"
            />
            <el-form-item
                label="公司详细地址："
                prop="companyName"
            >
                <el-input v-model="model.address"></el-input>
            </el-form-item>
            <el-form-item
                label="公司电话："
                prop="companyName"
            >
                <el-input v-model="model.company_phone"></el-input>
            </el-form-item>
            <el-form-item
                label="公司简介："
                prop="companyName"
            >
                <el-input
                    v-model="model.introduction"
                    type="textarea"
                    resize="none"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button
                    type="primary"
                    class="submit"
                >提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import lineTitle from '@/components/line-title/line-title'
export default {
    components: {
        lineTitle
    },
    // async asyncData({ $axios }) {
    //     const { data: model } = await $axios.$post('/company/getInfo')
    //     return {
    //         model
    //     }
    // },
    data() {
        return {
            model: {
            }
        }
    },
    async created() {
        const { data } = await this.$axios.$post('/company/getInfo')
        this.model = data
    },
    methods: {
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
            if (!isJPG) {
                this.$message.error('请上传 JPG/PNG 格式的图片!')
            }
            return isJPG
        }
    }
}
</script>
<style lang="scss" scoped>
.company {
    background: #fff;
    padding: 0 40px 48px;
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
    .line-title {
        padding: 30px 0;
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
</style>

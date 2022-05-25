
<template>
    <div class="company">
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
                155854487
            </el-form-item>
            <el-form-item label="更换头像：">
                <el-image
                    class="user-image"
                    src="http://placeimg.com/640/480/animals"
                ></el-image>
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
                <el-input v-model="model.unifyCode"></el-input>
            </el-form-item>
            <el-form-item
                prop="companyName"
                class="just-flex"
            >
                <template #label>
                    <div class="just-content">
                        <div class="just-title">性别</div>
                        <div>：</div>
                    </div>
                </template>
                <el-radio-group v-model="model.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                prop="companyName"
                class="just-flex"
            >
                <template #label>
                    <div class="just-content">
                        <div class="just-title">联系人</div>
                        <div>：</div>
                    </div>
                </template>
                <el-input v-model="model.unifyCode"></el-input>
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
                    <span>open6523948</span>
                    <el-button type="text">点击解除</el-button>
                    <el-button type="text">点击更换</el-button>
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
                    <span>159****1750</span>
                    <el-button type="text">点击解除</el-button>
                    <el-button type="text">点击更换</el-button>
                </div>
            </el-form-item>
            <el-button
                type="primary"
                class="submit"
            >保存</el-button>
        </el-form>
    </div>
</template>

<script>
import lineTitle from '@/components/line-title/line-title'
export default {
    components: {
        lineTitle
    },
    data() {
        return {
            model: {
                companyName: '', // 公司名称
                unifyCode: '', // 社会信用代码
                csex: ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.company {
    background: #fff;
    padding: 0 40px 48px;
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

        .el-input__inner {
            height: 34px;
            line-height: 34px;
            width: 262px;
            border-radius: 0;
            border: 1px solid #d6d6d6;
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
</style>

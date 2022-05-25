<template>
    <div :style="{width:`${width}px`}">
        <div>
            <el-form
                ref="form"
                :class="['simple-form', (type == '1' || type == 'codeLogin') ? 'simple-form--login': '']"
                :model="modelIn"
                :rules="rules"
                :label-width="labelWidth"
            >
                <slot name="after"></slot>
                <template v-for="(val,key) in modelIn">
                    <el-form-item
                        v-if="key != 'checked'"
                        :key="key"
                        :prop="key"
                        :label="fields[key].label"
                    >
                        <div class="item-content">
                            <div class="flex-1">
                                <el-input
                                    v-model="modelIn[key]"
                                    autocomplete="off"
                                    :type="fields[key].type || 'text'"
                                    :placeholder="fields[key].placeholder"
                                    :maxlength="fields[key].max"
                                ></el-input>
                                <div
                                    v-if="fields[key].tip"
                                    class="c-999"
                                >{{ fields[key].tip }}</div>
                            </div>
                            <slot
                                :itemKey="key"
                                name="suffix"
                            ></slot>
                        </div>

                    </el-form-item>
                </template>

                <slot></slot>
                <el-form-item
                    v-show="type == '1' || type == 'codeLogin' || type == 'register'"
                    prop="checked"
                >
                    <div class="form-agreement">
                        <el-checkbox v-model="modelIn.checked"></el-checkbox>
                        <span class="desc">我已阅读并接受</span>
                        <span
                            v-for="(policy, index) in policyList"
                            :key="'policy_' + index"
                            class="agreement"
                            @click="agreementDeatil(policy.id)"
                        >《{{ policy.title }}》</span>
                        <span
                            v-for="(terms, index) in termsList"
                            :key="'terms_' + index"
                            class="agreement"
                            @click="agreementDeatil(terms.id)"
                        >《{{ terms.title }}》</span>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :class="['form-buttom',(type == '1' || type == 'codeLogin') ? 'form-buttom--login': '']"
                        @click="submit"
                    >{{ buttonText }}</el-button>
                </el-form-item>
                <slot name="tips"></slot>
            </el-form>

        </div>
    </div>
</template>

<script>
import { openAgreement } from '@/utils'
const diffByObj = (obj1, obj2) => {
    const o1 = obj1 instanceof Object
    const o2 = obj2 instanceof Object
    // 判断是不是对象
    if (!o1 || !o2) {
        return obj1 === obj2
    }

    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    // 例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    }
    let isDif = true
    for (const o in obj1) {
        const t1 = obj1[o] instanceof Object
        const t2 = obj2[o] instanceof Object
        if (t1 && t2) {
            isDif = diffByObj(obj1[o], obj2[o])
        } else if (obj1[o] !== obj2[o]) {
            isDif = false
        }
        if (!isDif) break
    }
    return isDif
}
export default {
    props: {
        width: {
            type: Number,
            default: 262
        },
        buttonText: {
            type: String,
            default: ''
        },
        value: {
            type: Object,
            default: () => ({})
        },
        fields: {
            type: Object,
            default: () => ({})
        },
        rules: {
            type: Object,
            default: () => ({})
        },
        termsList: {
            type: Array,
            default: () => {
                return []
            }
        },
        policyList: {
            type: Array,
            default: () => {
                return []
            }
        },
        // 类型 1 表示 账号密码登录 codeLogin 验证码登录 3 修改密码 changeMobile 更换绑定手机 saas 绑定saas
        type: {
            type: String,
            default: '1'
        },
        labelWidth: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            modelIn: null
        }
    },
    computed: {
        formData_() {
            return this.$deepClone(this.modelIn)
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                this.modelIn = this.$deepClone(val)
            }
        },
        formData_(newVal, oldVal) {
            // 判断两个对象相同，说明没有变化，要 return 否则 进入死循环
            if (diffByObj(newVal, oldVal)) return
            this.$emit('input', newVal)
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$emit('submit')
                }
            })
        },
        resetForm() {
            this.$refs.form.resetFields()
        },
        agreementDeatil(id) {
            openAgreement(id)
        }

    }
}
</script>
<style lang="scss" scoped>
.simple-form {
    /deep/.el-form-item {
        margin-bottom: 24px;
        .el-form-item__content {
            line-height: 1;
        }
        &:last-child {
            margin-bottom: 0;
        }
        .el-input__inner {
            height: 34px;
            line-height: 34px;
            border-radius: 0;
        }
    }
    &--login {
        /deep/.el-form-item {
            .el-input__inner {
                height: 56px;
                line-height: 56px;
                border-radius: 4px;
                border: 0;
                background-color: #f5f5f5;
                font-size: 18px;
            }
        }
    }
    .item-content {
        display: flex;
        align-items: center;
    }
    .form-agreement {
        font-size: 14px;
        .agreement {
            cursor: pointer;
            color: $--color-primary;
        }
    }
    .form-buttom {
        height: 34px;
        line-height: 34px;
        padding: 0;
        width: 100%;
        display: block;
        flex-shrink: 0;
        &--login {
            height: 56px;
            line-height: 56px;
            font-size: 24px;
        }
    }
}
.c-999 {
    color: #999;
    font-size: 12px;
    margin-top: 6px;
}
</style>

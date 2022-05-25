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
                label-width="100px"
                :rules="rules"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="案例名称："
                            prop="name"
                        >
                            <el-input
                                v-model="dataBox.name"
                                placeholder="请输入案例名称，不超过20个字"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="面积："
                            prop="area"
                        >
                            <el-input
                                v-model="dataBox.area"
                                type="number"
                                placeholder="请输入面积"
                                :disabled="areasDisabled"
                            >
                                <template slot="append">m²</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="造价："
                            prop="price"
                        >
                            <el-input
                                v-model="dataBox.price"
                                type="number"
                                placeholder="请输入造价"
                            >
                                <template slot="append">万</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item
                            label="设计师："
                            prop="job_user_id"
                        >
                            <el-select
                                v-model="dataBox.job_user_id"
                                placeholder="请选择"
                                filterable
                            >
                                <el-option
                                    v-for="(item,i) in job_user_list"
                                    :key="i"
                                    :label="item.username"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="关联小区："
                            prop="housing_estate_id"
                        >
                            <el-select
                                v-model="dataBox.housing_estate_id"
                                placeholder="请选择"
                                filterable
                                @change="selectHosing($event, 'all')"
                            >
                                <el-option
                                    v-for="(item,i) in house_estate"
                                    :key="i"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="户型："
                            prop="housing_type_id"
                        >
                            <el-select
                                v-model="dataBox.housing_type_id"
                                placeholder="请选择"
                                filterable
                            >
                                <el-option
                                    v-for="(item,i) in house_type_list"
                                    :key="i"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="装修风格："
                            prop="job_style_id"
                        >
                            <el-select
                                v-model="dataBox.job_style_id"
                                placeholder="请选择"
                                filterable
                            >
                                <el-option
                                    v-for="(item,i) in job_type_list"
                                    :key="i"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="3D链接： "
                            prop="td_url"
                        >
                            <el-input
                                v-model="dataBox.td_url"
                                placeholder="支持小红屋和酷家乐链接"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            label="关联工地:"
                            prop="decoration_site_id"
                        >
                            <!-- decoration_site_id -->
                            <el-button
                                type="primary"
                                @click="dialogFormVisible=true"
                            >{{ selectSite }}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item
                            label="设计理念："
                            prop="design_concept"
                        >
                            <el-input
                                v-model="dataBox.design_concept"
                                type="textarea"
                                placeholder="请描述您在设计这套方案时的理念和想法"
                                maxlength="1000"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="case-cont">
            <EditList
                :data="dataBox.effect_img_list"
                @change="listOut"
            />
        </div>
        <div class="case-btn">
            <el-button
                type="primary"
                @click="submit"
            >提交</el-button>
            <el-button
                type="primary"
                plain
                @click="$router.push('/case')"
            >取消</el-button>
            <el-button
                v-if="hideDelBtn"
                type="danger"
                plain
                @click="delCase"
            >删除</el-button>
        </div>

        <choiceCase
            v-model="dialogFormVisible"
            @change="change"
        />
    </div>
</template>
<script>
import EditList from './components/edit-list.vue'
import choiceCase from './components/choice-case.vue'
export default {
    components: {
        EditList,
        choiceCase
    },
    async asyncData({ $axios }) {
    },
    data() {
        return {
            query: {
                id: null
            },
            dialogFormVisible: false,
            selectSite: '请选择工地',
            dataBox: {
                name: '',
                area: '',
                price: '',
                job_user_id: '',
                housing_type_id: '',
                housing_estate_id: '',
                job_style_id: '',
                td_url: '',
                decoration_site_id: null,
                design_concept: '',
                effect_img_list: []
            },
            house_estate: [],
            house_type_list: [],
            job_type_list: [],
            job_user_list: [],
            rules: {
                name: [
                    { required: true, message: '不能为空!', trigger: 'change' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                area: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                price: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                job_user_id: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                housing_type_id: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                housing_estate_id: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                job_style_id: [
                    { required: true, message: '不能为空!', trigger: 'change' }
                ],
                td_url: [
                    { required: false, message: '不能为空!', trigger: 'change' }
                ],
                design_concept: [
                    { required: false, message: '不能为空!', trigger: 'change' }
                ],
                decoration_site_id: [
                    { required: false, message: '不能为空!', trigger: 'change' }
                ]
                // effect_img_list: []
            },
            hideDelBtn: false,
            areasDisabled: false
        }
    },
    watch: {
        'dataBox.housing_type_id': {
            handler(val) {
                if (val && this.house_type_list.length > 0) {
                    const area = this.house_type_list.find(v => v.id === val).area
                    this.dataBox.area = area
                    this.areasDisabled = true
                }
            },
            deep: true
        }
    },
    created() {
        const { id } = this.$route.query
        this.id = Number(id)
        if (this.id) {
            this.getData()
            this.hideDelBtn = true
        }
        this.initData()
    },
    methods: {
        async getData() {
            const { data, code } = await this.$axios.$post('/patternCase/getInfo', { id: this.id })
            if (code === 20000) {
                this.$router.push('/case')
            }
            this.dataBox = data
            this.selectSite = data.decoration_site_name || '请选择工地'
            this.selectHosing(data.housing_estate_id)
            if (this.dataBox.area) {
                this.areasDisabled = true
            }
        },
        async initData() {
            const { data } = await this.$axios.$post('/patternCase/getOtherList')
            this.house_estate = data.house_estate
            this.job_type_list = data.job_type_list
            this.job_user_list = data.job_user_list
        },
        // 导出的
        listOut(e) {
            this.dataBox.effect_img_list = e
        },
        async selectHosing(e, type) {
            const { data } = await this.$axios.$post('/patternCase/getHouseTypeList', {
                housing_estate_id: e
            })
            if (type === 'all') {
                this.dataBox.area = ''
                this.dataBox.housing_type_id = null
                this.areasDisabled = false
            }
            this.house_type_list = data
        },
        change(e) {
            this.dataBox.decoration_site_id = e.id
            this.selectSite = e.site_name
        },
        submit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    if (!this.dataBox.effect_img_list.length) {
                        return this.$message({
                            showClose: true,
                            message: '请选择案例图片',
                            type: 'error'
                        })
                    }
                    if (this.dataBox.effect_img_list.length < 5) {
                        return this.$message({
                            showClose: true,
                            message: '案例图片不少于5张',
                            type: 'error'
                        })
                    }
                    this.dataBox.effect_img_list.forEach((item, index) => {
                        item.b_sort_order = index
                    })
                    const data = await this.$axios.$post('/patternCase/save', { ...this.dataBox, id: this.id })
                    if (data && data.code === 0) {
                        this.$message({
                            showClose: true,
                            message: '恭喜您,操作成功!',
                            type: 'success'
                        })
                        this.$router.push('/case')
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        delCase() {
            this.$confirm('删除案例将会导致该案例所有的信息丢失, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$axios.$post('/patternCase/del', {
                    id: this.id
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.$router.push('/case')
            }).catch(() => {

            })
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
}
</style>

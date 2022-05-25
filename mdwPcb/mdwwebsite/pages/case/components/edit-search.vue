<template>
    <div class="case-form">
        <el-form
            :inline="true"
            :model="dataBox"
            label-width="100px"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="案例名称：">
                        <el-input
                            v-model="dataBox.name"
                            placeholder="请输入案例名称，不超过20个字"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="面积：">
                        <el-input
                            v-model="dataBox.area"
                            placeholder="请输入面积"
                        >
                            <template slot="append">m²</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="造价：">
                        <el-input
                            v-model="dataBox.price"
                            placeholder="请输入造价"
                        >
                            <template slot="append">万</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="设计师：">
                        <el-select
                            v-model="dataBox.job_user_id"
                            placeholder="请选择"
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
                    <el-form-item label="户型：">
                        <el-select
                            v-model="dataBox.region"
                            placeholder="请选择"
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
                    <el-form-item label="关联小区：">
                        <el-select
                            v-model="dataBox.housing_estate_id"
                            placeholder="请选择"
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
                    <el-form-item label="装修风格：">
                        <el-select
                            v-model="dataBox.job_style_id"
                            placeholder="请选择"
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
                    <el-form-item label="3D链接：">
                        <el-input
                            v-model="dataBox.td_url"
                            placeholder="支持小红屋和酷家乐链接"
                        >
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="关联工地:">
                        <div
                            v-if="false"
                            class="change-cls"
                        >请点击选择案例</div>
                        <!-- decoration_site_ids -->
                        <div
                            v-else
                            class="change-cls checked-cls"
                        >案例</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="设计理念：">
                        <el-input
                            v-model="dataBox.design_concept"
                            type="textarea"
                            placeholder="请描述您在设计这套方案时的理念和想法"
                        >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            dataBox: {},
            house_estate: [],
            house_type_list: [],
            job_type_list: [],
            job_user_list: []
        }
    },
    created() {
        this.initData()
    },
    methods: {
        async initData() {
            const { data } = await this.$axios.$post('/patternCase/getOtherList')
            this.house_estate = data.house_estate
            this.house_type_list = data.house_type_list
            this.job_type_list = data.job_type_list
            this.job_user_list = data.job_user_list
        }
    }
}
</script>
<style lang="scss">
.case-form {
    padding: 40px;
    .el-form-item {
        width: 100%;
        display: flex;
        .el-form-item__content {
            flex: 1;
        }
    }
    .change-cls {
        border: 1px solid #4185ec;
        width: 200px;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        text-align: center;
        color: #4185ec;
        cursor: pointer;
        &.checked-cls {
            border-color: #e6e6e6;
            color: #e6e6e6;
            text-align: left;
        }
    }
}
</style>

<template>
    <div class="form">
        <div class="case-search__word">
            <div>(您可以只使用以下搜索条件中的一个或几个，无需填写所有内容)</div>
        </div>
        <div class="case-search__cont">
            <div>
                <el-input
                    v-model="searchData.name"
                    width="240"
                    placeholder="请输入案例名称或编号"
                ></el-input>
            </div>
            <div>
                <el-select
                    v-model="searchData.housing_estate_id"
                    placeholder="请选择小区"
                    width="200"
                    :disabled="selecdDisabled"
                >
                    <el-option
                        v-for="item in housingEstateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select
                    v-model="searchData.job_style_id"
                    placeholder="请选择负责人"
                >
                    <el-option
                        v-for="item in jobUserList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </div>
            <el-button
                type="primary"
                @click="handleSearch"
            >搜索</el-button>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        type: {
            type: String,
            default: ''
        },
        housingEstateId: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            searchData: {
                keyword: '',
                housing_estate_id: '', // 小区id
                job_user_id: '' // 设计师id
            },
            // 负责人
            jobUserList: [],
            // 小区
            housingEstateList: [],
            selecdDisabled: false
        }
    },
    mounted() {
        this.handleSearchData()
    },
    methods: {
        async handleSearchData() {
            const {
                data: {
                    housingEstateList,
                    jobUserList
                }
            } = await this.$axios.$post('/Decoration/caseSearch')
            const housArr = []
            for (const key in housingEstateList) {
                housArr.push({
                    id: Number(key),
                    name: housingEstateList[key]
                })
            }
            const jobArr = []
            for (const key in jobUserList) {
                jobArr.push({
                    id: Number(key),
                    name: jobUserList[key]
                })
            }
            this.housingEstateList = housArr
            this.jobUserList = jobArr
            // 设计师大赛要传id 且不可选择
            if (this.housingEstateId) {
                this.searchData.housing_estate_id = this.housingEstateId
                this.selecdDisabled = true
            }
        },
        handleSearch(type) {
            if (type === 'clear') {
                this.searchData = {
                    keyword: '',
                    director_uid: '',
                    forward_stage_id: '',
                    housing_estate_id: ''
                }
            }
            this.$emit('handleSearch', this.searchData)
        }
    }
}
</script>
<style lang="scss">
.form {
    .case-search__cont {
        display: flex;
        & > div {
            margin-right: 16px;
        }
        .el-input {
            width: 240px !important;
        }
        .el-select {
            width: 200px !important;
            .el-input {
                width: 200px !important;
            }
        }
    }
    .case-search__word {
        color: #f60d0d;
        font-size: 12px;
        margin-bottom: 16px;
    }
}
</style>

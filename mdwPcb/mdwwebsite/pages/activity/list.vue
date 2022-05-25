<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2022-04-27 17:22:21
-->
<template>
    <div class="case">
        <div class="case-caption">
            <div class="case-caption__title">
                设计师大赛
                <span v-if="housing_estate_name">({{ housing_estate_name }})</span>
            </div>
            <div>
                <el-button
                    type="primary"
                    plain
                    @click="dialogFormVisible=true"
                >选择现有案例</el-button>
                <el-button
                    type="primary"
                    @click="toDetail(0)"
                >新增案例</el-button>
            </div>
        </div>
        <div class="case-cont">
            <SearchList :list="list" />
        </div>
        <choiceCase
            v-model="dialogFormVisible"
            :housing-estate-name="housing_estate_name"
            :job-contest-id="job_contest_id"
            :housing-estate-id="housingEstateId"
            @change="change"
        />
    </div>
</template>
<script>
import SearchList from './components/list.vue'
import choiceCase from './components/choice-case.vue'
export default {
    components: {
        SearchList,
        choiceCase
    },
    data() {
        return {
            list: [],
            job_contest_id: 0,
            housing_estate_name: '',
            dialogFormVisible: false, // 新增案例
            params: {
                name: '',
                job_style_id: '',
                estate_id: '',
                housing_type_id: ''
            },
            housingEstateId: 0 // 小区ID
        }
    },
    created() {
        const { job_contest_id, housing_estate_name } = this.$route.query
        this.job_contest_id = job_contest_id
        this.housing_estate_name = housing_estate_name
        this.initData()
    },
    methods: {
        async initData() {
            this.params.job_contest_id = this.job_contest_id
            const { data: { list, housing_estate_id } } = await this.$axios.$post('/patternCase/getList', { ...this.params, page: 1, limit: 1000 })
            this.list = list
            this.housingEstateId = housing_estate_id
        },
        async change(e) {
            const { code, msg } = await this.$axios.$post('/JobContest/saveContestCase', { case_id: e.id, job_contest_id: this.job_contest_id })
            this.$message({
                type: code === 0 ? 'success' : 'error',
                message: msg
            })
            code === 0 && this.initData()
        },
        toDetail(id) {
            this.$router.push(
                {
                    path: '/activity/case-edit',
                    query: {
                        id,
                        job_contest_id: this.job_contest_id,
                        housing_estate_name: this.housing_estate_name,
                        housing_estate_id: this.housingEstateId
                    }
                })
        }
    }
}
</script>
<style lang="scss">
.case {
    padding: 40px;
    background: #fff;
    margin-top: 24px;
    &-caption {
        display: flex;
        justify-content: space-between;
        &__title {
            font-size: 20px;
            font-weight: bold;
            span {
                // font-weight: normal;
                // font-size: 16px;
            }
        }
    }
    &-search {
        &__cont {
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
        &__word {
            color: #f60d0d;
            font-size: 12px;
            margin-bottom: 16px;
        }
    }
}
</style>

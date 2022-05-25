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
                    placeholder="请输入案例名称或ID"
                ></el-input>
            </div>
            <div>
                <el-select
                    v-model="searchData.estate_id"
                    placeholder="请选择小区"
                    width="200"
                    @change="selectHosing"
                >
                    <el-option
                        v-for="item in house_estate"
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
                    placeholder="请选择风格"
                >
                    <el-option
                        v-for="item in job_type_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select
                    v-model="searchData.housing_type_id"
                    placeholder="请选择户型"
                >
                    <el-option
                        v-for="item in house_type_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </div>
            <el-button
                type="primary"
                @click="handleSearch()"
            >搜索</el-button>
            <el-button
                type="primary"
                plain
                @click="handleSearch('clear')"
            >清空</el-button>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {

    },
    data() {
        return {
            searchData: {
                name: '',
                job_style_id: '',
                estate_id: '',
                housing_type_id: ''
            },
            house_estate: [],
            house_type_list: [],
            job_type_list: []
        }
    },
    created() {
        this.handleSearchData()
    },
    methods: {
        async handleSearchData() {
            const { data } = await this.$axios.$post('/patternCase/getOtherList')
            this.house_estate = data.house_estate
            this.job_type_list = data.job_type_list
        },
        async selectHosing(e) {
            const { data } = await this.$axios.$post('/patternCase/getHouseTypeList', {
                housing_estate_id: e
            })
            this.searchData.housing_type_id = null
            this.house_type_list = data
        },
        handleSearch(type) {
            if (type === 'clear') {
                this.searchData = {
                    name: '',
                    job_style_id: '',
                    estate_id: '',
                    housing_type_id: ''
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

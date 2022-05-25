<template>
    <div class="form">
        <div class="case-search__word">
            <div>(您可以只使用以下搜索条件中的一个或几个，无需填写所有内容)</div>
        </div>
        <div class="case-search__cont">
            <div>
                <el-input
                    v-model="searchData.keyword"
                    width="240"
                    placeholder="请输入工地名称或业主手机号"
                ></el-input>
            </div>
            <div>
                <el-select
                    v-model="searchData.housing_estate_id"
                    placeholder="请选择小区"
                    width="200"
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
                    v-model="searchData.director_uid"
                    placeholder="请选择负责人"
                >
                    <el-option
                        v-for="item in directorList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </div>
            <div v-if="type !== 'choice'">
                <el-select
                    v-model="searchData.forward_stage_id"
                    placeholder="请选择施工阶段"
                >
                    <el-option
                        v-for="item in stageList"
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
        type: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            searchData: {
                keyword: '',
                director_uid: '',
                forward_stage_id: '',
                housing_estate_id: ''
            },
            // 负责人
            directorList: [],
            // 小区
            housingEstateList: [],
            // 施工阶段
            stageList: []
        }
    },
    mounted() {
        this.handleSearchData()
    },
    methods: {
        async handleSearchData() {
            const {
                data: {
                    directorList,
                    housingEstateList,
                    stageList
                }
            } = await this.$axios.$post('/Decoration/decorationSearch')
            this.directorList = directorList.map((v) => {
                return {
                    id: v._id,
                    ...v
                }
            })
            this.housingEstateList = housingEstateList
            this.stageList = stageList
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

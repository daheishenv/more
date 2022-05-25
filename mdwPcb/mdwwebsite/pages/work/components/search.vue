<template>
    <div class="form">
        <div class="case-search__word">
            <div>(您可以只使用以下搜索条件中的一个或几个，无需填写所有内容)</div>
        </div>
        <div class="flex justify-between">
            <div class="case-search__cont">
                <div>
                    <el-input
                        v-model="searchData.title"
                        width="240"
                        placeholder="请输入文章标题"
                    ></el-input>
                </div>
                <div>
                    <el-select
                        v-model="searchData.cat_id"
                        placeholder="请选择分类"
                        width="200"
                    >
                        <el-option
                            v-for="item in cat_name_list"
                            :key="item.id"
                            :label="item.cat_name"
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
            <el-button
                type="primary"
                @click="handleAdd"
            >新建</el-button>
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
                title: '',
                cat_id: ''
            },
            cat_name_list: []
        }
    },
    created() {
        this.handleSearchData()
    },
    methods: {
        async handleSearchData() {
            const { data } = await this.$axios.$post('/Articles/getCategory')
            this.cat_name_list = data
        },
        handleSearch(type) {
            if (type === 'clear') {
                this.searchData = {
                    title: '',
                    cat_id: ''
                }
            }
            this.$emit('handleSearch', this.searchData)
        },
        handleAdd() {
            this.$router.push({
                path: '/work/case-edit'
            })
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

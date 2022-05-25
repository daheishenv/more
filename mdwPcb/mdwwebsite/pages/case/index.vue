<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2022-04-27 17:22:21
-->
<template>
    <div class="case">
        <div class="case-search">
            <Search @handleSearch="handleSearch" />
        </div>
        <div class="case-cont">
            <SearchList :list="list" />
        </div>
    </div>
</template>
<script>
import SearchList from './components/list.vue'
import Search from './components/search.vue'
export default {
    components: {
        SearchList,
        Search
    },
    async asyncData({ $axios }) { },
    data() {
        return {
            searchData: {
                name: '',
                job_style_id: '',
                estate_id: '',
                housing_type_id: ''
            },
            list: []
        }
    },
    created() {
        this.initData()
    },
    methods: {
        handleSearch(e) {
            console.log(e)
            this.searchData = e
            this.initData()
        },
        async initData() {
            const { data: { list } } = await this.$axios.$post('/patternCase/getList', { ...this.searchData, page: 1, limit: 1000 })
            this.list = list
        }
    }
}
</script>
<style lang="scss">
.case {
    padding: 40px;
    background: #fff;
    margin-top: 24px;
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

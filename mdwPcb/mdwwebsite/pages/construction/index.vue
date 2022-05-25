<template>
    <!-- v-infinite-scroll="reachBottomFn"
        :infinite-scroll-distance="20"
        :infinite-scroll-disabled="busy" -->
    <div class="case">
        <div class="case-search">
            <Search @handleSearch="handleSearch" />
        </div>
        <div class="case-cont">
            <SearchList :list-data="pageList" />
        </div>
    </div>
</template>
<script>
// import listMixins from '@/mixins/list.js'
import Search from './components/search.vue'
import SearchList from './components/list.vue'
export default {
    components: {
        SearchList,
        Search
    },
    // mixins: [listMixins],
    // layout: 'default',
    data() {
        return {
            defaultParams: {
                keyword: '',
                director_uid: '',
                forward_stage_id: '',
                housing_estate_id: ''
            },
            reqName: '/Decoration/decorationList',
            pageList: []
        }
    },
    mounted() {
        this.handleData()
    },
    methods: {
        handleSearch(item) {
            this.handleData(item)
        },
        async handleData(item = {}) {
            let params = {
                page: 1,
                limit: 100
            }
            params = { ...params, ...item }
            const { data } = await this.$axios.$post('/Decoration/decorationList', params)
            this.pageList = data
        }
    }
}
</script>
<style lang="scss">
.case {
    padding: 40px;
    background: #fff;
    margin: 24px 0;
    height: calc(100vh - 80px);
    overflow: auto;
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

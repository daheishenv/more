<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2022-04-29 14:17:37
-->
<template>
    <el-dialog
        title=""
        :fullscreen="true"
        :visible.sync="modalFlag"
    >
        <div class="case">
            <div class="top-line">
                <i class="icon-sheji1 iconfont"></i>
                <span>设计师大赛({{ housingEstateName }})</span>
            </div>
            <Search
                type="choice"
                :housing-estate-id="housingEstateId"
                @handleSearch="handleSearch"
            />
            <div class="case-cont">
                <ConstructionList
                    :list="list"
                    @change="change"
                />
            </div>
        </div>
    </el-dialog>
</template>

<script>
import Search from '../../construction/components/detail-case-search'
import ConstructionList from '../../construction/components/detail-case-list'
export default {
    components: {
        Search,
        ConstructionList
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        housingEstateName: {
            type: String,
            default: ''
        },
        jobContestId: {
            type: [String, Number],
            default: 0
        },
        housingEstateId: {
            type: [String, Number],
            default: 0
        }
        // selecded: {
        //     type: [String, Number],
        //     default: null
        // }
    },
    data() {
        return {
            list: [],
            query: {}
        }
    },
    computed: {
        modalFlag: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    watch: {
        value: {
            handler(val) {
                if (val) this.initData()
            }
        }
    },
    created() {
        // this.initData()
    },
    methods: {
        async initData() {
            const { data: { data } } = await this.$axios.$post('/Decoration/caseList', { job_contest_id: this.jobContestId, housing_estate_id: this.housingEstateId, ...this.query })
            this.list = data
        },
        handleSearch(e) {
            this.query = e
            this.initData()
        },
        change(e) {
            this.$emit('change', e)
            this.$emit('input', false)
        }
    }
}
</script>

<style lang="scss" scoped>
.case {
    padding-top: 0;
    .top-line {
        padding-bottom: 24px;
        border-bottom: 1px solid #d6d6d6;
        margin-bottom: 24px;
        i {
            font-size: 18px;
            color: #4185ec;
            margin-right: 9px;
        }
        span {
            font-size: 20px;
            color: #333;
            font-weight: bold;
        }
    }
}
</style>

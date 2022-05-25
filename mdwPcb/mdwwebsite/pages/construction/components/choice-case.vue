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
            <Search @handleSearch="handleSearch" />
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
import Search from './detail-case-search'
import ConstructionList from './detail-case-list'
export default {
    components: {
        Search,
        ConstructionList
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
        // selecded: {
        //     type: [String, Number],
        //     default: null
        // }
    },
    data() {
        return {
            list: [],
            query: {
                keyword: '',
                housing_estate_id: '', // 小区id
                job_user_id: '' // 设计师id
            }
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
    created() {
        this.initData()
    },
    methods: {
        async initData() {
            const {
                data: {
                    data
                }
            } = await this.$axios.$post('/Decoration/caseList', this.query)
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
</style>

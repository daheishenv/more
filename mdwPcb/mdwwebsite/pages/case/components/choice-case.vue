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
            <Search
                type="choice"
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
import Search from '../../construction/components/search'
import ConstructionList from '../../construction/components/construction-list'
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
    created() {
        this.initData()
    },
    methods: {
        async initData() {
            const { data } = await this.$axios.$post('/Decoration/decorationList', this.query)
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

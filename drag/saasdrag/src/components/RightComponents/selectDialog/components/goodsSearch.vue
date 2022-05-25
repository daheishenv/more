
<style lang="scss" scoped>
.goods-search {
    height: 100%;
    .goods-search_header {
        height: 50px;
        display: flex;
        align-items: center;
        background: #fff;
        padding-left: 10px;
        /deep/.el-autocomplete {
            width: 50%;
            height: 37px;
            .el-input__inner {
                height: 37px;
            }
            .el-icon-search {
                line-height: 37px;
            }
        }
    }
    section {
        height: calc(100% - 50px);
    }
}
</style>
<template>
    <div class="goods-search">
        <div class="goods-search_header">
            <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="搜索类目"
                clearable
                @select="handleSelect"
                suffix-icon="el-icon-search"
            >
                <template v-slot:default="{ item }">
                    <goods-text-color
                        :item="item"
                        :serch-text="state_"
                    />
                </template>
            </el-autocomplete>
        </div>
        <section>
            <slot :refreshKey="refreshKey"></slot>
        </section>
    </div>
</template>

<script>
import goodsTextColor from "./goodsTextColor";

export default {
    components: {
        goodsTextColor
    },
    data() {
        return {
            state: "",
            refreshKey: 0
        }
    },
    computed: {
        state_() {
            return this.state.split(" / ").pop();
        }
    },
    methods: {
        computePresentText() { },
        handleSelect(v) {
            this.refreshKey++;
            this.$emit("change", {
                type: 'click',
                detail: {
                    value: v.key
                }
            });
        },
        async querySearch(queryString, cb) {

            let result = [];
            if (queryString) {
                const { data } = await this.$http('getSearchCategory', {
                    cat_name: this.state_
                })
                result = data;
            }

            cb(result.map((v) => {
                const value = v.map(k => k.cat_name).join(" / ");
                const key = v.map(k => k.cat_id);
                return {
                    value,
                    key
                }
            }))
        }
    }
}
</script>

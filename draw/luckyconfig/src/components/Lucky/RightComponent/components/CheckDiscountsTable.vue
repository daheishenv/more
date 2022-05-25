<template>
    <el-table
        v-if="isDiscountsCheckShow_"
        :data="value"
        border
    >
        <el-table-column
            label="优惠券名称"
            prop="coupon_name"
        />
        <el-table-column
            label="剩余库存"
            prop="surplus"
        />
        <el-table-column>
            <template v-slot:default="{row}">
                <el-button @click="handleRemove(row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        value: {
            type: Array,
            default: () => { }
        }
    },
    computed: {
        isDiscountsCheckShow_() {
            return Object.keys(this.value).length
        }
    },
    methods: {
        handleRemove(id) {
            this.$emit("input", this.value.filter(v => v.id != id))
            this.$emit("remove")
        }
    }
}
</script>


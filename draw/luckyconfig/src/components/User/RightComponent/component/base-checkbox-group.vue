<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-23 08:50:08
-->
<template>
    <div class="base-checkbox-group">
        <el-checkbox-group
            v-model="checkboxValue_"
        >
            <el-checkbox
                v-for="(item, index) in options"
                :label="item.value"
                :key="index"
            >{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
    },
    data() {
        return {
            options: []
        }
    },
    computed: {
        checkboxValue_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
    },
    created() {
        this.getUserLevelList()
    },
    methods: {
        async getUserLevelList() {
            const { data } = await this.$http('getUserLevelList')
            console.log(data)
            this.options = data.map(o => {
                return {
                    value: o.level_name,
                    label: o.level_name,
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .base-checkbox-group {
        text-align: left;
    }
</style>
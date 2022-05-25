<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-29 09:44:40
-->
<template>
    <div>
        <el-cascader
            v-model="bindVal"
            placeholder="请选择地区"
            :props="props"
            :options="options"
            :disabled="disabled"
            @change="handleChange"
        >

        </el-cascader>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: [String, Number, Array],
            default: () => {
                return ''
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'city'
        }
    },
    data() {
        return {
            options: [],
            props: {
                lazy: true,
                lazyLoad: (node, resolve) => {
                    this.getData(node, resolve)
                }
            }
        }
    },
    computed: {
        bindVal: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    created() {
        // this.getRegion()
    },
    methods: {
        async getRegion() {
            const { result, data } = await this.$axios.$post('Region/ajaxGetRegion')
            result && (this.options = this.setOptions(data))
        },
        async getData(node, resolve) {
            const { level, value } = node
            const { result, data } = await this.$axios.$post('Region/ajaxGetRegion', { id: value })
            result && (resolve(this.setOptions(data, level)))
        },
        setOptions(data, level) {
            const keyArr = Object.keys(data)
            const arr = []
            keyArr.forEach((item) => {
                if (this.type === 'city') {
                    arr.push({
                        leaf: level >= 1,
                        value: item,
                        label: data[item]
                    })
                } else {
                    arr.push({
                        leaf: level >= 2,
                        value: item,
                        label: data[item]
                    })
                }
            })
            return arr
        },
        handleChange(val) {
            this.$emit('change', val)
        }
    }
}
</script>

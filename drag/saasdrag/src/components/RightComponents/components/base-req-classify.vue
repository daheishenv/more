<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-26 19:55:30
-->
<template>
    <div
        class="base-req-classify"
        @click="$emit('select')"
    >
        <div :style="{
            color: !categoryName_ ? '#666' : '#409EFF'
        }">{{ categoryName_ }}</div>
    </div>
</template>

<script>
import { formatItemData } from '@/utils/drag'

export default {
    data() {
        return {
            categoryName: '',
            componentInfo: {}
        }
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        reqName: {
            type: String,
            default: ''
        }
    },
    computed: {
        categoryName_() {
            return this.componentInfo.apiParam.idType === "all" ? "全部商品" : (this.categoryName || '')
        }
    },
    watch: {
        value: {
            handler(value) {
                value && this.getCategory(value)
            },
            immediate: true
        },
        '$store.state.currentCheckAttr.componentInfo': {
            handler(val) {
                this.componentInfo = formatItemData(val)
            },
            deep: true,
            immediate: true
        },
    },
    methods: {
        async getCategory(ids) {
            const { data } = await this.$http(this.reqName, { ids })
            if (data && data.length) {
                let name = data.map(o => o.cat_name)
                this.categoryName = name.join('/')
            }
        },
    }
}
</script>

<style lang="scss">
.base-req-classify {
    width: 100%;
    height: 30px;
    cursor: pointer;
}
</style>
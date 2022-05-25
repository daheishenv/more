<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-26 19:55:30
-->
<template>
    <div class="base-req-select">
        <el-select
            :loading="reqData.loading"
            v-model="reqData.value"
            @change="handleReqSelect"
            clearable
            size="mini"
            :loading-text="reqData.loadingText"
            :placeholder="placeholder"
        >
            <el-option
                v-for="el in reqData.list"
                :key="el.value"
                :label="el.name"
                :value="el.id"
            >
            </el-option>
            <p
                class="base-req-select__empty"
                slot="empty"
            >暂无数据，<span
                    class="base-req-select__empty-text"
                    @click="handleSetting"
                >去配置 ></span></p>
        </el-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reqData: {
                list: [],
                loadingText: '数据加载中',
                loading: true,
                value: ''
            }
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
        },
        placeholder: {
            type: String,
            default: '请选择'
        }
    },
    watch: {
        reqName: {
            handler() {
                this.remoteMethod()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        handleReqSelect(e) {
            // this.$emit('input', [{
            //     data: e
            // }])
            this.$emit('input', e)
            this.$emit('change', e)
        },
        async remoteMethod() {
            try {
                const { data: { list = [] } } = await this.$http(this.reqName)
                const oldId = this.value ? parseInt(this.value) : ''
                this.reqData.value = (list.find(o => o.id === oldId) || {}).name || ''
                this.reqData.loading = false
                this.reqData.list = list
            } catch (err) {
                this.reqData.loading = false
                this.reqData.loadingText = '数据出错拉'
            }
        },
        handleSetting(e) {
            this.$emit('setting', e)
        }
    }
}
</script>

<style lang="scss">
.base-req-select {
    &__empty {
        color: #333333;
        font-size: 12px;
        padding: 0 20px;
        line-height: 3;
        &-text {
            color: #007aff;
        }
    }
}
</style>
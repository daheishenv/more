<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-17 17:59:54
-->
<template>
    <div
        class="base-link"
    >
        <div
            v-for="(item,index) in dataList"
            :key="index"
        >
            <c-input
                type="select"
                v-model="item.name"
                :placeholder="placeholder"
                placeholderStyle="font-size: 12px; color: #1b7aff !important;"
                @select="chooseLink(index)"
                @clear="handleClearLink(index)"
            >
                <template>
                    <span style="color: #007aff;">></span>
                </template>
            </c-input>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: [],// 修改的数据源
            defaultList: [],// 默认列表，用来对比change用的
        }
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: '去设置'
        },
    },
    watch: {
        value: {
            handler(val) {
                this.dataList = this.$deepClone(val)
            },
            deep: true,
            immediate: true
        },
        dataList: {
            handler(val) {
                if (this.$c.diffByObj(val, this.defaultList)) {
                    return
                }
                this.defaultList = this.$deepClone(val)
                this.$emit('input', val)
                this.$emit('change', {
                    type: 'upload',
                    detail: val
                })
            },
            deep: true
        }
    },
    methods: {
        handleClearLink(index) {
            const addItem = {
                type: '',
                name: '',
                app_page: '',
                title: this.dataList[index].title,
                img_url: this.dataList[index].img_url
            }
            this.dataList.splice(index, 1, addItem)
        },
        chooseLink(index) {
            parent.operation && parent.operation({
                module_name: 'common',
                value: this.dataList[index]
            }, (data) => {
                const addItem = {
                    app_page: data.typeVal,
                    name: data.typeTitle,
                }
                data.detailId && (addItem.id = data.detailId)
                this.dataList.splice(index, 1, addItem)
            })
        },
    }
}
</script>

<style scoped lang="scss">
.base-link {
    &.two-row {
        padding-top: 24px;
    }
    // height: 50px;
    // display: flex;
    // align-items: flex-end;
    // justify-content: flex-end;
    /deep/ .c-input {
        color: #1b7aff;
    }
}
</style>
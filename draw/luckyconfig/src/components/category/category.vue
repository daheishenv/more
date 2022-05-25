<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: czq
 * @Date: 2021-11-29 16:15:37
 * @LastEditors: czq
 * @LastEditTime: 2021-11-30 16:33:09
-->
<style lang="scss" scoped>
.category {
    height: 100%;
}
</style>
<template>
    <view class="category">
        <template v-if="cmptStyle === 'style1'">
            <gc-category-style1
                :config="context"
                :menu-list="menuList"
                :is-demo="isDemo"
                @notify="notify"
            />
        </template>
        <template v-else-if="cmptStyle === 'style2'">
            <gc-category-style2
                :config="context"
                :menu-list="menuList"
                :is-demo="isDemo"
                @notify="notify"
            />
        </template>
        <template v-else-if="cmptStyle === 'style3'">
            <gc-category-style3
                :config="context"
                :menu-list="menuList"
                :is-demo="isDemo"
                :page-config="pageConfig"
                @notify="notify"
            />
        </template>
        <template v-else-if="cmptStyle === 'style4'">
            <gc-category-style4
                :config="context"
                :menu-list="menuList"
                :is-demo="isDemo"
                @notify="notify"
            />
        </template>
        <template v-else-if="cmptStyle === 'style5'">
            <gc-category-style5
                :config="context"
                :menu-list="menuList"
                :is-demo="isDemo"
                @notify="notify"
            />
        </template>
        <template v-else-if="cmptStyle === 'style6'">
            <gc-category-style6
                :config="context"
                :menu-list="menuList"
                :is-demo="isDemo"
                :page-config="pageConfig"
                @notify="notify"
            />
        </template>
    </view>
</template>
<script>
export default {
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        context: {
            type: Object,
            default: () => { }
        },
        menuList: {
            type: Array,
            default: () => []
        },
        cmptStyle: {
            type: String,
            default: 'style1'
        },
        pageConfig: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    methods: {
        notify(actionName, arg) {
            this.$emit('notify', actionName, arg)
        }
    }
}
</script>


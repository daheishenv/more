<!--
 * @Descripttion: 全局容器
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-18 14:23:36
-->
<template>
    <div
        class="z-contaioner"
        :style="{backgroundColor: bg}"
    >
        <slot />
    </div>
</template>
<script>
export default {
    name: 'ZContainer',
    props: {
        bg: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.z-contaioner {
    box-sizing: border-box;
    padding-top: 116px;
    min-height: 100vh;
}
</style>


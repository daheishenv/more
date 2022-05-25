<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-21 16:33:02
-->
<template>
    <div @click.stop.prevent="handleClick">
        <slot />
    </div>
</template>

<script>
export default {
    methods: {
        handleClick(e) {
            this.$emit('selected', e)
        }
    }
}
</script>
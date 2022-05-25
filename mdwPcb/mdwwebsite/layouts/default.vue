<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-06-25 19:18:08
-->
<template>
    <div>
        <b-header />
        <div class="main-container">
            <Nuxt
                keep-alive
                :keep-alive-props="{ include: componentNames}"
            />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            componentNames: ['Detail']
        }
    },
    watch: {
        $route(val, oldVal) {
            if (this.$route.name === 'construction-detail' || this.$route.name === 'construction-schedule') {
                this.componentNames = ['Detail']
            } else {
                this.componentNames = []
            }
        }
    }
}
</script>

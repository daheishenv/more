<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-25 09:51:45
-->
<template>
    <div class="border">
        <line-title title="重置密码"></line-title>
        <password-form />
    </div>
</template>
<script>
import passwordForm from '../../components/simple-form-base/password-form'
export default {
    components: {
        passwordForm
    }
}
</script>

<style lang="scss" scoped>
.border {
    padding: 30px;
    background: #fff;
}
</style>

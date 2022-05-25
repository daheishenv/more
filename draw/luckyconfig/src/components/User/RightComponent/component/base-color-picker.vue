<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-27 21:03:23
-->
<template>
    <div class="base-color-picker">
        <!-- <text class="reset pr24" @click="handleReset">重置</text> -->
        <el-color-picker
            v-model="defaultValue"
            size="small"
            :show-alpha="true"
            @active-change="handleChangeColor"
            :predefine="predefineColors"
        ></el-color-picker>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            defaultValue: '',
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577',
                'rgba(255, 255, 255, 0)',
                'rgba(255, 255, 255, 1)',
                'rgba(245, 245, 245, 1)',
                'rgba(246, 245, 248, 1)'
            ]
        }
    },
    watch: {
        value: {
            handler(val) {
                this.defaultValue = val
            },
            immediate: true
        },
        defaultValue: {
            handler(val) {
                this.$emit('input', val)
            },
            immediate: true
        }
    },
    methods: {
        handleChangeColor(val) {
            this.defaultValue = val
        }
    }
}
</script>

<style lang="scss" scoped>
.base-color-picker {
    height: 32px;
    /deep/ .el-color-picker--small .el-color-picker__trigger {
        width: 60px;
    }
    .reset {
        color: $uni-color-primary;
        font-size: 24rpx;
    }
}
</style>
<!--
 * @Descripttion: 图片组件
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-27 17:20:03
-->
<template>
    <div
        class="z-image"
        :style="{width:width, height:height}"
    >
        <el-image
            :style="{borderRadius: radius}"
            class="avatar"
            :shape="square"
            :fit="fit"
            :src="url"
            @error="errorHandler"
        ></el-image>
    </div>
</template>
<script>
export default {
    name: 'ZImage',
    props: {
        square: {
            type: String,
            default: 'square'
        },
        fit: { // 填充模式
            type: String,
            default: 'cover'
        },
        width: { // 宽度
            type: String,
            default: '100%'
        },
        height: { // 高度
            type: String,
            default: '100%'
        },
        radius: {
            type: String,
            default: ''
        },
        src: { // 图片地址
            type: String,
            default: ''
        },
        type: { // 图片类型
            type: String,
            default: ''
        }

    },
    data() {
        return {

        }
    },
    computed: {
        url() {
            let defaultImg = ''
            switch (this.type) {
                case 'designer':
                    defaultImg = require('../../assets/image/default/design.png')
                    break
                case 'construction':
                    defaultImg = require('../../assets/image/default/construction.png')
                    break
                default:
                    defaultImg = ''
            }
            return this.src ? this.src : defaultImg
        }
    },
    methods: {
        errorHandler() {
            return true
        }
    }
}
</script>
<style lang="scss" scoped>
.z-image {
    .avatar {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f6;
    }
}
</style>

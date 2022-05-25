<template>
    <view class="base-setting" @click="handleClick">
        <el-button
            v-if="label"
            size="mini"
            type="text"
        >{{settingText}}</el-button>
        <el-button
            v-else
            class="base-setting-item-ft"
            plain
            icon="el-icon-plus"
        >
            {{settingText}}
        </el-button>
    </view>
</template>

<script>
export default {
    props: {
        settingText: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleClick() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss" scoped>
    .base-setting {
        &-item-ft {
            width: 100%;
            height: 40px;
            display: block;
            background: #ffffff;
            border-radius: 2px;
            border: 1px solid #1b7aff;
            font-size: 14px;
            font-weight: 400;
            color: #1b7aff;
        }
    }
</style>
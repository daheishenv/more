<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-29 10:39:23
-->
<template>
    <view class="manage-tool-right">
        <view
            class="manage-tool__item"
            v-for="(item, index) in manegeList"
            :key="index"
            @click="handleManage(index)"
        >
            <text :class="['drag', item.icon]"></text>
            <text class="manage-tool__text">{{item.name}}</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            manegeList: [{
                icon: 'drag-yemianshezhi',
                name: '页面设置',
                rightComponents: 'pageSetup',
                isManage: true // 判断用的
            }, {
                icon: 'drag-zujianguanli',
                name: '组件管理',
                rightComponents: 'compententManage',
                isManage: true
            }]
        }
    },
    created() {
        this.handleManage(0)
    },
    methods: {
        handleManage(index) {
            this.$store.dispatch('setManageInfo', this.manegeList[index])
        }
    }
}
</script>

<style lang="scss">
.manage-tool {
    &-right {
        @include abs(56px, 20px);
    }
    &__item {
        cursor: pointer;
        @include flex(row);
        align-items: center;
        background: #ffffff;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
        font-size: 14px;
        border-radius: 2px;
        font-weight: 400;
        color: #666666;
        line-height: 36px;
        padding: 0 12px;
        margin-bottom: 15px;
        .el-icon-delete {
            margin-left: 10px;
        }
    }
    &__text {
        margin-left: 5px;
        white-space: nowrap;
    }
}
</style>
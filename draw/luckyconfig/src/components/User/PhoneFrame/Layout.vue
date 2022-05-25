<template>
    <view class="draw-container">
        <el-header>
            <PageHeader
                v-on="$listeners"
                v-bind="$attrs"
            ></PageHeader>
        </el-header>
        <el-container>
            <view class="aside__left">
                <el-aside
                    class="aside__menu"
                    width="100"
                    v-if="$slots.left"
                >
                    <slot name="left"></slot>
                </el-aside>
                <view class="aside__phone">
                    <slot name="center"></slot>
                </view>
            </view>
            <view class="aside__right">
                <slot name="right"></slot>
            </view>
        </el-container>
    </view>
</template>
<script>
import PageHeader from "./PageHeader";
export default {
    inheritAttrs: false,
    components: {
        PageHeader
    }
}
</script>
<style lang="scss">
.draw-container {
    min-width: 1200px;
    height: 100vh;
}
.el-header {
    background-color: white;
    text-align: center;
    line-height: 60px;
}
.el-container {
    height: calc(100vh - 60px);
}
.aside {
    &__left {
        display: flex;
        flex-shrink: 0;
        padding: 20px 80px;
        overflow: auto;
    }
    &__right {
        flex: 1;
        overflow: auto;
        padding-top: 20px;
    }
    &__menu {
        width: 100px;
        margin-right: 0px;
    }
    &__phone {
        height: 100%;
        // overflow: auto;
    }
}
// .el-main {
//     position: relative;
//     flex-shrink: 0;
//     display: flex;
// }
// .right-aside {
//     flex: 1;
// }
.change-img {
    background: #fff;
    cursor: pointer;
    @include abs(56px, 10px);
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
}
</style>

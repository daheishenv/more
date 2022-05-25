<template>
    <view
        class="draw-container"
        :class="{'is-reverse':isReverse} "
    >
        <el-header>
            <PageHeader
                v-on="$listeners"
                v-bind="$attrs"
            ></PageHeader>
        </el-header>
        <el-container>
            <view class="aside__warp is-left">
                <view
                    class="aside__title"
                    v-if="$slots.title"
                >
                    <slot name="title"></slot>
                </view>
                <view
                    class="aside__left"
                    :class="{'is-title':$slots.title}"
                >
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
            </view>
            <view class="aside__warp">
                <view
                    class="aside__title"
                    v-if="$slots.rightTitle"
                >
                    <slot name="rightTitle"></slot>
                </view>
                <view class="aside__right">
                    <slot name="right"></slot>
                </view>
            </view>
        </el-container>
    </view>
</template>
<script>
import PageHeader from "./PageHeader";
export default {
    inheritAttrs: false,
    computed: {
        isReverse() {
            return this.$attrs['is-reverse']
        }
    },
    components: {
        PageHeader
    }
}
</script>
<style lang="scss">
.draw-container {
    min-width: 1200px;
    height: 100vh;
    &.is-reverse {
        display: flex;
        flex-direction: column-reverse;
    }
}
.el-header {
    background-color: white;
    text-align: center;
    line-height: 60px;
}
.el-container {
    height: calc(100vh - 60px);
}
.aside__warp {
    display: flex;
    flex-direction: column;
    flex: 1;
    &.is-left {
        flex-grow: 0;
        .aside__left {
            padding-bottom: 0;
            flex: 1;
        }
        .aside__title {
            padding-left: 80px;
        }
    }
}
.aside {
    &__left {
        display: flex;
        flex-shrink: 0;
        padding: 20px 80px;
        overflow: auto;
        &.is-title {
            padding-top: 0;
            background: #fff;
        }
    }
    &__title {
        height: 73px;
        line-height: 73px;
        font-size: 18px;
        font-weight: bold;
        background: #fff;
    }
    &__right {
        flex: 1;
        overflow: auto;
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

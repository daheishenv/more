<template>
    <view class="center">
        <scroll-view
            scroll-y
            class="center__phone"
        >
            <view class="center__phone-view">
                <view class="header">
                    <sub-activity-header :config="titleConfig" />
                </view>
                <view class="container">
                    <slot name="container"></slot>
                </view>
                <slot name="other"></slot>
            </view>
        </scroll-view>
    </view>
</template>
<script>
export default {
    props: {
        titleConfig: Object
    }
}
</script>

<style lang="scss" scoped>
.center {
    // height: 100%;
    box-shadow: 5px 5px 10px #bbb;
    height: 789px;
    &__phone {
        width: 375px;
        height: 100%;
        background-color: #f5f5f5;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        overflow: scroll;
        transform: translate(0);
        &-view {
            height: 100%;
            display: flex;
            flex-direction: column;
            .container {
                flex: 1;
            }
            .header {
                flex-shrink: 0;
            }
        }
    }
}
</style>

<template>
    <view class="center">
        <scroll-view
            scroll-y
            class="center__phone"
            @scroll="pageScroll"
            :scroll-top="pageScrollTop_"
            :scroll-with-animation="true"
        >
            <view class="center__phone-view">
                <view class="container">
                    <slot name="container"></slot>
                </view>
                <slot name="other"></slot>
            </view>
        </scroll-view>
        <view class="center__shadow"></view>
    </view>
</template>
<script>
export default {
    props: {
        titleConfig: Object
    },
    computed: {
        pageScrollTop_() {
            return this.$store.state.user.pageScrollTop
        }
    },
    methods: {
        pageScroll({ detail: { scrollTop } }) {
            uni.$emit('pageScroll', {
                scrollTop
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.center {
    height: 789px;
    position: relative;
    &__phone {
        position: relative;
        z-index: 2;
        width: 475px;
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
        }
        &::after {
            content: '';
            position: absolute;
            top: 0;
            height: 100%;
            width: calc(100% - 100px);
            box-shadow: 5px 5px 10px #bbb;
        }
    }
    &__shadow {
        content: '';
        position: absolute;
        top: 0;
        height: 100%;
        width: calc(100% - 100px);
        box-shadow: 5px 5px 10px #bbb;
    }
}
</style>

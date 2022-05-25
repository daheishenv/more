<style lang="scss" scoped>
.scroll-item {
    &__warp {
        text-decoration: none;
        font-size: 24rpx;
        .is-active {
            color: rgba(255, 93, 12, 1);
            font-weight: bold;
        }
    }
    &__el {
        padding: 16rpx 16rpx 16rpx 48rpx;
    }
}
</style>

<template>
    <view class="scroll-item__warp">
        <template v-if="remote.length">
            <view
                v-for="i in remote"
                :key="i.cat_id"
                class="scroll-item__el"
                :class="{'is-active':i.cat_id === value}"
                @click="changeActive(i.cat_id)"
            >{{ i.cat_name }}</view>
        </template>
        <template v-if="!loading && remote.length === 0">
            <view class="scroll-item__el">暂无分类</view>
        </template>
    </view>
</template>
<script>
export default {
    props: {
        parentChecked: {
            type: Number,
            default: -1
        },
        value: {
            type: Number,
            default: -1
        },
        loading: {
            type: Boolean,
            default: false
        },
        remote: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isDone: false
        }
    },
    watch: {
        remote(val) {
            if (val.length && !this.isDone) {
                this.isDone = true
                this.changeActive(val[0].cat_id)
            }
        }
    },
    methods: {
        changeActive(id) {
            this.$emit('input', id)
            this.$emit('change', {
                detail: {
                    value: id
                }
            })
        }
    }
}
</script>

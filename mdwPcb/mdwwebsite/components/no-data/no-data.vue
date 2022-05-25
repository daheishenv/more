<template>
    <div class="empty">
        <el-empty
            v-if="showImg"
            :image-size="imageSize"
            :image="image"
            :description="description"
        ></el-empty>
        <div
            v-else
            class="empty__text"
        >{{ description }}</div>
    </div>
</template>

<script>
export default {
    props: {
        imageSize: {
            type: Number,
            default: null
        },
        description: {
            type: String,
            default: '暂无数据'
        },
        image: {
            type: String,
            default: ''
        },
        showImg: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    &__text {
        margin: 0;
        font-size: 14px;
        color: #909399;
    }
}
</style>

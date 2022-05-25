<style lang="scss">
/deep/.el-button {
    width: 120px;
    height: 36px;
}
</style>
<template>
    <el-row>
        <el-col
            :span="6"
            v-if="!isReverse"
        >
            <view style="display: flex;justify-content: flex-start;align-items: center;color: #675e6f">
                <h2>{{$attrs.title}}</h2>
            </view>
        </el-col>
        <el-col
            :span="isReverse ?  24 : 18"
            :style="isReverse ? 'text-align:center':'text-align:right'"
        >
            <el-button
                type="primary"
                size="mini"
                @click="$emit('submit')"
                v-if="!isSubmit"
            >发布</el-button>
            <el-button
                type="primary"
                size="mini"
                @click="$emit('save')"
                v-if="!isSave"
            >保存</el-button>
            <el-button
                type="danger"
                size="mini"
                @click="$emit('close')"
                v-if="!isClose"
            >取消</el-button>
        </el-col>
    </el-row>
</template>
<script>
export default {
    props: {
        isSubmit: Boolean,
        isSave: Boolean,
        isClose: Boolean,
        isReverse: Boolean
    },
    created() {
        console.log(this.isReverse);
    }
}
</script>

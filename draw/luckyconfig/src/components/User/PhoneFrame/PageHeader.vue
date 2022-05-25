<template>
    <el-row>
        <el-col :span="6">
            <view style="display: flex;justify-content: flex-start;align-items: center;color: #675e6f">
                <h2>{{$attrs.title}}</h2>
            </view>
        </el-col>
        <el-col
            :span="18"
            style="text-align: right;"
        >
            <el-button
                type="primary"
                size="mini"
                @click="$emit('submit')"
            >发布</el-button>
        </el-col>
    </el-row>
</template>


<style lang="scss" scoped>
.choice {
    width: 240px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin-right: 32px;

    .el-radio {
        margin: 14px 0 12px 0;
        /deep/.is-checked {
            .el-radio__inner {
                background: rgba(3, 149, 136, 1);
            }
            & + .el-radio__label {
                color: rgba(3, 149, 136, 1);
            }
        }
        /deep/.el-radio__inner {
            border-color: rgba(3, 149, 136, 1);
        }
    }
    &-img {
        cursor: pointer;
        width: 100%;
        border: 1px solid transparent;
        box-sizing: border-box;
        height: 424px;
    }
    .is-active {
        border: 1px solid rgba(3, 149, 136, 1);
    }
    &-text {
        display: flex;
        font-size: 12px;
        color: #333333;
        line-height: 17px;
        :nth-child(1) {
            flex-shrink: 0;
        }
        :nth-child(2) {
            color: rgba(153, 153, 153, 1);
            flex: 1;
        }
    }
}
</style>
<template>
    <view
        class="choice"
        @click="changeModel"
    >
        <view
            class="choice-img"
            :class="{'is-active':isActive_}"
        >
            <c-image
                width="100%"
                :src="img"
                height="100%"
            ></c-image>
        </view>
        <el-radio :label="label">{{labelText}}</el-radio>
        <view class="choice-text">
            <view>{{title}}</view>
            <view>{{msg}}</view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        value: Number,
        img: String,
        labelText: String,
        label: Number,
        title: String,
        msg: String
    },
    computed: {
        isActive_() {
            return this.value === this.label;
        }
    },
    methods: {
        changeModel() {
            this.$emit("input", this.label);
        }
    }
}
</script>
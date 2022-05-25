<style lang="scss" scope>
.base-form {
    @include flex(row);
    justify-content: space-between;
    align-items: center;
    &__title {
        color: #333;
        font-weight: bold;
        font-size: 14px;
    }
    &__button {
        margin-right: 10px;
    }
    &__icon {
        cursor: pointer;
        padding: 12px;
        text-indent: 0;
        text-align: center;
    }
    &__item {
        text-align: left;
        width: 100%;
        height: 50px;
        margin-top: 15px;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        text-indent: 20px;
        cursor: move;
        background: #fff;
    }
    &__type {
        margin-left: 10px;
        color: rgba(153, 153, 153, 1);
        font-size: 12px;
    }
}
</style>
<template>
    <view>
        <view class="base-form">
            <view class="base-form__title">{{text}}</view>
            <el-button
                type="primary"
                @click="emitSelect('')"
            >添加</el-button>
        </view>
        <draggable
            v-model="sortList"
            animation="200"
            :options="{
                    forceFallback: true,
                }"
            :fallback-tolerance='5'
            ghostClass="compentent-manage__ghost"
            dragClass="compentent-manage__drag"
            @change="handleChange"
        >
            <view
                class="base-form__item"
                v-for="(v,i) in sortList"
                :key="i"
            >
                <text class="el-icon-s-operation"></text>
                <view class="flex-1 align-center">
                    {{v.compoentDefine.beforeText}}
                    <text class="base-form__type">({{v.typeName}})</text>
                </view>
                <text
                    class="base-form__icon el-icon-edit"
                    @click="handleClick(i)"
                ></text>
                <el-popconfirm
                    class="base-form__icon"
                    title="是否删除该表单项"
                    icon="el-icon-warning-outline"
                    placement="top"
                    icon-color="#f00"
                    width="200"
                    @confirm="removeItem(i)"
                >
                    <text
                        class="el-icon-delete"
                        slot="reference"
                    ></text>
                </el-popconfirm>
            </view>
        </draggable>
    </view>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    props: {
        value: {
            type: Array,
            default: () => []
        },
        text: {
            type: String,
            default: ""
        },
        dialogFlag: {
            type: String,
            default: ""
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        },
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(val) {
                this.sortList = this.$deepClone(val);
            }
        }
    },
    components: {
        draggable
    },
    data() {
        return {
            sortList: []
        }
    },
    methods: {
        removeItem(i) {
            this.sortList.splice(i, 1);
            this.$emit("input", this.sortList);
        },
        emitSelect(value) {
            this.$emit('select', {
                dialogFlag: this.dialogFlag,
                value: {
                    defaultValue: this.value,
                    currentValue: value
                },
                min: this.min,
                max: this.max
            })
        },
        handleClick(i) {
            this.emitSelect(this.sortList[i]);
        },
        handleChange(e) {
            console.log(e, '22222');
            console.log(e, "this.sortList", this.sortList);
            this.$emit("input", this.sortList)
        }
    }
}
</script>

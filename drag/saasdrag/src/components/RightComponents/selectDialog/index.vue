<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-20 11:48:28
-->
<template>
    <el-dialog
        class="select-dialog"
        :visible.sync="dialogTableVisible_"
        :append-to-body="true"
        :close-on-click-modal="false"
        width="960px"
    >
        <div
            slot="title"
            class="select-dialog-hd"
        >
            <div class="select-dialog__title">{{title}}</div>
            <template v-if="subTitle">
                <div class="select-dialog__divider"></div>
                <div class="select-dialog__breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>{{subTitle}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </template>
        </div>
        <div
            class="select-dialog-bd"
            v-if="$slots.default"
        >
            <slot></slot>
        </div>
        <div
            slot="footer"
            class="select-dialog-ft"
            :class="{'justify-between': $slots.footer}"
        >
            <slot name="footer"></slot>
            <div class="select-dialog__btn-group">
                <el-button
                    type="primary"
                    @click="handleSubmit"
                >确定</el-button>
                <el-button @click="handleClick">取消</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        },
        asyncClose: {
            type: [String, Boolean],
            default: true
        },
    },
    data() {
        return {
            loading: false, //确认按钮loading状态
        }
    },
    computed: {
        dialogTableVisible_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        asyncClose_() {
            return String(this.asyncClose) !== 'false'
        }
    },
    methods: {
        handleClick() {
            this.$emit('input', false)
        },
        handleSubmit(e) {
            if (this.asyncClose_) {
                this.loading = true;
            } else {
                this.$emit('input', false);
            }
            this.$emit('submit', e)
        }
    }
}
</script>


<style lang="scss" scope>
.select-dialog {
    &-hd {
        @include flex(row);
        align-items: center;
        /deep/ .el-breadcrumb__inner {
            color: #2589ff;
        }
        /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__separator {
            display: inline-block;
            color: #2589ff;
        }
    }
    &__title {
        font-size: 15px;
        font-weight: bold;
    }
    &__divider {
        margin: 0 10px;
        height: 14px;
        width: 1px;
        background-color: #e8e8e8;
    }
    &-ft {
        @include flex(row);
        justify-content: flex-end;
    }
}
</style>
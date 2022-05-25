<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-27 10:46:40
-->
<template>
    <view class="base-select-goods">
        <view class="base-select-goods-hd">
            <view class="base-select-goods__title">{{ text }}</view>
            <view class="base-select-goods__operation">
                <template v-if="value.length">
                    <el-popconfirm
                        title="确定要清空已选择内容？"
                        icon="el-icon-warning-outline"
                        placement="left"
                        icon-color="#f00"
                        @confirm="handleClear"
                    >
                        <el-button
                            size="mini"
                            class="compentent-manage__clear"
                            slot="reference"
                        >清空</el-button>
                    </el-popconfirm>
                    <text class="pl12"></text>
                    <el-button
                        type="primary"
                        @click="$emit('select')"
                    >编辑</el-button>
                </template>
                <template v-else>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="$emit('select')"
                    >{{ selectText }}</el-button>
                </template>
            </view>
        </view>
        <view class="base-select-goods-bd">
            <chooseOperation
                ref="chooseOperation"
                autoReq="true"
                showTitle="false"
                imgKey="goods_img"
                :showAdd="showAdd_"
                row="5"
                size="110"
                :operationReqName="api_"
                :operationReqParam="apiParam_"
                @change="handleChange"
                @add="$emit('select')"
            />
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            componentInfo: {},
            changeFlag: false // 拖拽换顺序不重新请求
        }
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        selectText: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
    },
    computed: {
        api_() {
            return this.$store.state.currentCheckAttr.componentInfo.api
        },
        apiParam_() {
            return {
                ids: this.value,
                idType: 'goodsId'
            }
        },
        showAdd_() {
            return String(this.apiParam_.ids).length > 0
        }
    },
    watch: {
        'apiParam_': {
            handler(val) {
                if (this.changeFlag) {
                    this.changeFlag = false
                    return
                }
                this.$c.debounce(() => {
                    this.$refs.chooseOperation && this.$refs.chooseOperation.initPage()
                }, 50)
            },
            deep: true
        }
    },
    methods: {
        handleChange(selections) {
            this.changeFlag = true
            this.$emit('input', selections.map(o => o.id).join(','))
        },
        handleClear() {
            this.$emit('input', '')
            this.$refs.chooseOperation && (this.$refs.chooseOperation.dataList = [])
        }
    }
}
</script>

<style lang="scss" scope>
.base-select-goods {
    &-hd {
        @include flex(row);
        justify-content: space-between;
        align-items: center;
    }
    &__title {
        color: #333;
        font-weight: bold;
        font-size: 14px;
    }
    &-bd {
        background: #f7f8fa;
        border-radius: 2px;
        margin-top: 16px;
        /deep/ .c-row {
            padding: 10px 2px;
        }
    }
}
</style>
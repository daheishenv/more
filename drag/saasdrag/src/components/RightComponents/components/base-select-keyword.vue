<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sky
 * @Date: 2021-09-16 11:07:08
-->
<template>
    <div
        class="base-select-keyword"
        v-if="!destroyEl"
    >
        <div class="base-select-keyword-hd">
            <div
                class="base-select-keyword__title"
                v-if="title"
            >{{title}}</div>
            <div
                class="base-select-keyword__summary"
                v-if="summary"
            >{{summary}}</div>
        </div>
        <draggable
            v-model="dataList"
            :forceFallback="true"
            animation="500"
        >
            <div
                class="base-select-keyword-item"
                v-for="(item,index) in dataList"
                :key="index"
                :id="'keyword' + index"
            >
                <div
                    class="base-select-keyword-item-hd"
                    v-if="valueConfig.title"
                >
                    <span class="base-select-keyword-item__title">{{valueConfig.title + (index + 1)}}</span>
                    <el-popconfirm
                        title="您已经设置过内容了，是否还要删除？"
                        v-if="item.name"
                        icon="el-icon-warning-outline"
                        icon-color="#f00"
                        @confirm="handleDelete(index)"
                    >
                        <span
                            slot="reference"
                            class="el-icon-delete base-select-keyword__del"
                        ></span>
                    </el-popconfirm>
                    <span
                        v-else
                        class="el-icon-delete base-select-keyword__del"
                        @click.stop="handleDelete(index)"
                        title="删除"
                    ></span>
                </div>
                <div class="base-select-keyword-item-bd">
                    <div class="base-select-keyword-item-bd__right">
                        <view
                            class="flex align-center mb12"
                            v-if="valueConfig && valueConfig.hsaTitle"
                        >
                            <view class="pr12 base-select-keyword-item-bd__right-title">标题</view>
                            <el-input
                                type="text"
                                placeholder="请输入内容"
                                v-model="item.title"
                                maxlength="5"
                                show-word-limit
                                size="mini"
                                style="width: 180px;"
                            >
                            </el-input>
                        </view>
                        <c-input
                            type="select"
                            clearable
                            class="base-select-keyword-item-bd__right-input base-select-keyword-item-bd__right-input-small"
                            :class="{'base-select-keyword-item-bd__right-text': !item.name}"
                            v-model="item.name"
                            placeholder="请选择跳转链接 >"
                            placeholderStyle="font-size: 12px; color: #1b7aff !important;"
                            @clear="handleClearLink(index)"
                            @select="chooseLink(index)"
                        >
                            <template slot="before">
                                <span>链接</span>
                            </template>
                            <template v-if="item.name">
                                <span>修改 ></span>
                            </template>
                        </c-input>
                    </div>
                </div>
            </div>
        </draggable>
        <el-button
            v-if="pushBtnText"
            class="base-select-keyword-item-ft"
            plain
            icon="el-icon-plus"
            :disabled="dataList.length >= max"
            @click="handleAdd"
        >
            {{pushBtnText}}
        </el-button>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        summary: {
            type: String,
            default: ''
        },
        value: {
            type: Array,
            default: () => []
        },
        pushBtnText: {
            type: String,
            default: ''
        },
        valueConfig: {
            type: Object,
            default: () => {
                return {}
            }
        },
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            dataList: [],// 修改的数据源
            defaultList: [],// 默认列表，用来对比change用的
            destroyEl: true,
            defaultData: [
                {
                    title: '关键词1',
                    name: ''
                },
                {
                    title: '关键词2',
                    name: ''
                },
                {
                    title: '关键词3',
                    name: ''
                },
                {
                    title: '关键词4',
                    name: ''
                },
                {
                    title: '关键词5',
                    name: ''
                }
            ]
        }
    },
    watch: {
        /*  value: {
             handler(val) {
                 this.dataList = this.$deepClone(val)
                 this.defaultList = this.$deepClone(val)
             },
             deep: true,
             immediate: true
         }, */
        value: {
            handler(val) {
                console.log('keyword', val)
                // 有值给值，没有则给默认
                if (val.length) {
                    this.dataList = this.$deepClone(val)
                    this.defaultList = this.$deepClone(val)
                } else {
                    this.dataList = this.$deepClone(this.defaultData)
                    this.defaultList = this.$deepClone(this.defaultData)
                }

                //console.log('1defaultList', this.defaultList);
            },
            deep: true,
            immediate: true
        },
        dataList: {
            handler(val) {
                if (this.$c.diffByObj(val, this.defaultList)) {
                    return
                }
                this.defaultList = this.$deepClone(val)
                this.$emit('input', val)
                this.$emit('change', {
                    type: 'keyword',
                    detail: val
                })
            },
            deep: true
        }
    },
    created() {
        setTimeout(() => {
            this.destroyEl = false
        }, 100)

    },
    beforeDestroy() {
        this.destroyEl = true
    },
    computed: {
        moduleName_() {
            return this.$store.state.currentCheckAttr.componentInfo.module_name
        }
    },
    methods: {
        handleAdd() {
            this.dataList.push({
                title: '关键词' + (this.dataList.length + 1),
                name: ''
            })
        },
        handleDelete(index) {
            if (this.dataList.length === this.min) return this.$message.error(`最少添加${this.min}个关键词`)
            this.dataList.splice(index, 1)
        },
        handleClearLink(index) {
            const addItem = {
                type: '',
                name: '',
                title: this.dataList[index].title,
            }
            this.dataList.splice(index, 1, addItem)
        },
        chooseLink(index) {
            parent.operation && parent.operation({
                module_name: this.moduleName_,
                value: this.dataList[index],
                page_id: this.$store.state.page_id
            }, (data) => {
                const addItem = {
                    type: data.typeVal,
                    name: data.typeTitle,
                    title: this.dataList[index].title,
                }
                data.detailId && (addItem.data = data.detailId)
                this.dataList.splice(index, 1, addItem)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.base-select-keyword {
    text-align: left;
    &__title {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        line-height: 20px;
        margin-bottom: 8px;
    }
    &__summary {
        font-size: 12px;
        color: #999999;
        line-height: 17px;
    }
    &__del {
        cursor: pointer;
        padding: 0 10px;
    }
    &-item {
        background: #f7f8fa;
        border-radius: 2px;
        margin-top: 10px;
        line-height: 1;
        &-hd {
            padding: 16px 16px 0;
            @include flex(row);
            justify-content: space-between;
        }
        &-title {
            padding-top: 16px;
            font-size: 14px;
            font-weight: 500;
            color: #333333;
            line-height: 20px;
        }
        &-bd {
            padding: 16px;
            @include flex(row);
            align-items: center;
            justify-content: space-between;
            &__right {
                flex: 1;
                &-input {
                    line-height: 32px;
                    width: 258px;

                    & + .base-select-keyword-item-bd__right-input {
                        margin-top: 14px;
                    }
                    /deep/.c-input-hd {
                        justify-content: flex-end;
                        padding-right: 6px;
                    }
                    /deep/.c-input-bd {
                        height: 32px;
                        background-color: #ffffff;
                        border-radius: 2px;
                        border: 1px solid #dcdee0;
                        /deep/.uni-input-input {
                            font-size: 14px;
                            color: #333;
                            margin-right: 5px;
                        }
                    }
                    /deep/.c-input-ft {
                        font-size: 12px;
                        font-weight: 400;
                        color: #1b7aff;
                        padding-left: 8px;
                    }
                    &-small {
                        line-height: 24px;
                        /deep/.c-input-bd {
                            font-size: 12px;
                            font-weight: 400;
                            height: 24px;
                            background-color: transparent;
                            .uni-input-input {
                                font-size: 12px;
                                color: #1b7aff;
                            }
                        }
                        /deep/.c-input-icon__clear {
                            position: absolute !important;
                            right: 45px;
                        }
                    }
                }
                &-text {
                    /deep/.c-input-bd {
                        border: none;
                    }
                }
            }
        }
        &-ft {
            margin-top: 24px;
            width: 100%;
            height: 40px;
            display: block;
            background: #ffffff;
            border-radius: 2px;
            border: 1px solid #1b7aff;
            font-size: 14px;
            font-weight: 400;
            color: #1b7aff;
        }
    }
}
</style>
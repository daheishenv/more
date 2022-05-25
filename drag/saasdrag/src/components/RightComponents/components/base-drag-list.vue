<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-07-01 19:11:19
-->
<template>
    <div
        class="base-upload"
        v-if="!destroyEl"
    >
        <div class="base-upload-hd">
            <div
                class="base-upload__title"
                v-if="title"
            >{{title}}</div>
            <div
                class="base-upload__summary"
                v-if="summary"
            >{{summary}}</div>
        </div>
        <draggable
            v-model="dragList"
            :forceFallback="true"
            animation="500"
        >
            <view
                class="compentent-manage__item"
                v-for="(item, index) in dragList"
                :key="index"
                :class="isUnDraggable(item) ? 'undraggable' : 'draggable'"
                @click="handleClick(index)"
                :data-module-name="item.module_name"
            >
                <text class="el-icon-s-operation"></text>
                <view class="flex-1">
                    <view
                        class="compentent-manage__remark"
                        v-if="item.extra.componentRemarks"
                    >{{`${index + 1}. `}}{{item.extra.componentRemarks}}</view>
                    <view class="compentent-manage__name">{{!item.extra.componentRemarks ? `${index + 1}. ` : ''}}{{item.name}}</view>
                </view>
                <!-- 删除 -->

                <el-popconfirm
                    class="compentent-manage__icon"
                    placement="left"
                    width="260"
                    trigger="click"
                    title="確定要刪除？"
                    icon="el-icon-warning-outline"
                    @confirm="handleDelete(index)"
                >
                    <span
                        slot="reference"
                        class="el-icon-delete"
                    ></span>
                </el-popconfirm>
            </view>
        </draggable>
        <!-- @click="handleAdd" -->
        <el-button
            v-if="pushBtnText"
            class="base-upload-item-ft"
            plain
            icon="el-icon-plus"
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
    data() {
        return {
            componentInfo: {},
            dragList: [],
            destroyEl: true
        }
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
        pushBtnText: {
            type: String,
            default: ''
        }
    },
    computed: {
        api_() {
            return this.$store.state.currentCheckAttr.componentInfo.api
        },
        apiParam_() {
            return this.$store.state.currentCheckAttr.componentInfo.apiParam
        },
    },
    created() {
        setTimeout(() => {
            this.destroyEl = false
        }, 100)
    },
    beforeDestroy() {
        this.destroyEl = true
    },
    methods: {
        async initPage() {
            const { data } = await this.$http(this.api_, this.apiParam_)
            console.log(data);
            this.dragList = data
        }
    },
    watch: {
        'apiParam_': {
            handler() {
                this.$c.debounce(() => {
                    this.initPage()
                }, 50)
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
.compentent-manage {
    position: relative;
    &__tooltip {
        margin-bottom: 10px;
        position: sticky;
        top: 0;
        background-color: #fff;
        z-index: 2;
        padding: 12px 15px;
    }
    &__list {
        padding: 0 15px 12px 15px;
    }
    &__clear {
        font-size: 14px;
        cursor: pointer;
        padding: 7px 10px;
        .el-icon-delete {
            margin-right: 5px;
        }
    }

    &__remark {
        & + .compentent-manage__name {
            font-size: 12px;
            opacity: 0.65;
        }
    }

    &__item {
        @include flex(row);
        align-items: center;
        height: 60px;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
        font-size: 14px;
        border-radius: 2px;
        font-weight: 400;
        color: #666666;
        padding: 8px 12px;
        margin-bottom: 15px;
        cursor: pointer;
        .flex-1 {
            padding: 0 10px;
        }
        &.draggable {
            cursor: move;
        }
        &:hover,
        &.compentent-manage__drag {
            background-color: #ecf5ff;
            box-shadow: 0px 2px 8px 0px rgba(64, 158, 255, 0.25);
            color: #409eff;
        }
    }
    &__icon {
        cursor: pointer;
        padding: 5px;
    }
    &__ghost {
        visibility: hidden;
    }
}
</style>
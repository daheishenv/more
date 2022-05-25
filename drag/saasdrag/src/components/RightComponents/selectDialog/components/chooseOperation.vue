<template>
    <div>
        <div v-loading="operationLoading">
            <draggable
                filter=".forbid"
                v-model="dataList"
                animation="500"
                class="flex"
                :class="[dataList.length ? 'c-row' : '']"
                @change="draggableChange"
            >
                <div
                    v-for="(item, index) in dataList"
                    :key="index"
                    :class="[`c-col-${rowNum_}`]"
                    class="flex-ajcenter p12"
                >
                    <div class="choose-item">
                        <div class="choose-item__delete">
                            <c-image
                                :size="iconSize_"
                                class="choose-item__delete-icon"
                                :style="[{top: `-${iconSize_ / 2}rpx`, right: `-${iconSize_ / 2}rpx`}]"
                                src="drag/goods/close.png"
                                @click="handleDelete(index)"
                            />
                            <!-- <i
                                class="choose-item__delete-icon el-icon-close"
                            ></i> -->
                        </div>
                        <div>
                            <div
                                class="choose-item-title c-ellipsis"
                                v-if="showTitle_"
                            >
                                {{item[titleKey]}}
                            </div>
                            <c-image
                                :width="imgWidth_"
                                :height="imgHeight_"
                                :src="item[imgKey]"
                            ></c-image>
                        </div>
                    </div>
                </div>

                <!-- 添加商品 -->
                <div
                    v-if="showAdd"
                    class="flex-ajcenter forbid"
                    :class="[`c-col-${rowNum_}`]"
                >
                    <div
                        @click="handleAdd"
                        class="choose-item__add flex-ajcenter flex-column"
                        :style="[{width: imgWidth_, height: imgHeight_}]"
                    >
                        <i
                            class="el-icon-plus"
                            :style="[{fontSize: `${iconSize_ / 0.8}rpx`, color: '#1b7aff'}]"
                        ></i>
                        <span :style="[{fontSize: `${iconSize_ / 1.3}rpx`, color: '#1b7aff'}]">添加商品</span>
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable
    },
    props: {
        row: {
            type: [String, Number],
            default: 4
        },
        titleKey: {
            type: [String],
            default: 'username'
        },
        imgKey: {
            type: [String],
            default: 'img_url'
        },
        size: {
            type: [String, Number],
            default: 300
        },
        imgWidth: {
            type: [String, Number],
            default: ''
        },
        imgHeight: {
            type: [String, Number],
            default: ''
        },
        showTitle: {
            type: [String, Boolean],
            default: true
        },
        operationReqName: {
            type: [String],
            default: ''
        },
        autoReq: {
            type: [String, Boolean],
            default: false
        },
        operationReqParam: {
            type: Object,
            default() { return {} }
        },
        showAdd: {
            type: [String, Boolean],
            default: false
        }
    },
    watch: {

    },
    computed: {
        rowNum_() {
            return 12 / this.row
        },
        size_() {
            return this.$c.formatUnit(this.size, 'rpx')
        },
        imgWidth_() {
            return this.$c.formatUnit(this.imgWidth, 'rpx', this.size_)
        },
        imgHeight_() {
            return this.$c.formatUnit(this.imgHeight, 'rpx', this.size_)
        },
        showTitle_() {
            return String(this.showTitle) !== 'false'
        },
        autoReq_() {
            return String(this.autoReq) !== 'false'
        },
        iconSize_() {
            let size = Math.floor(parseInt(this.imgWidth_) / 4)
            return size > 34 ? size : 34
        }
    },
    data() {
        return {
            dataList: [],
            operationLoading: false,
        }
    },
    created() {
        this.autoReq_ && this.initPage()
    },
    // watch: {
    //     operationReqParam: {
    //         handler(val) {
    //             this.initPage()
    //         },
    //         deep: true
    //     }
    // },
    methods: {
        async initPage() {
            if (this.operationLoading) return
            this.operationLoading = true
            try {
                const { data: { list = [] } } = await this.$http(this.operationReqName, this.operationReqParam)
                this.dataList = list
                this.operationLoading = false
            } catch (error) {
                this.operationLoading = false
            }
        },
        handleDelete(index) {
            this.dataList.splice(index, 1)
            this.$emit('change', this.dataList)
        },
        draggableChange() {
            this.$emit('change', this.dataList)
        },
        handleAdd() {
            this.$emit('add')
        }
    }
}
</script>

<style lang="scss" scoped>
.choose {
    &-item {
        position: relative;
        display: flex;
        justify-content: center;
        &__add {
            box-shadow: 0 0 0 1px #dcdee0;
        }
        &__delete-icon {
            @include abs(0, 0, null, null);
            z-index: 12;
            color: #fff;
            cursor: pointer;
            // display: none;
            display: block;
            background-color: #000;

        }
        &:hover {
            box-shadow: 0 0 0 2px #1b7aff;
        }
        &:hover &__delete {
            background: rgba(0, 0, 0, 0.6);
            @include abs(null, null, 0, 0);
            width: 100%;
            height: 100%;
            z-index: 10;
            &-icon {
                display: block;
            }
        }
        &-title {
            width: 100%;
            height: 28px;
            line-height: 28px;
            background-color: rgba(0, 0, 0, 0.6);
            @include abs(null, 0, 0, 0);
            z-index: 10;
            color: #fff;
            padding-left: 12px;
            box-sizing: border-box;
        }
    }
}
</style>
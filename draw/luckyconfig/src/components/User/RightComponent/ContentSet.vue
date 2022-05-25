<template>
    <view class="content-set">
        <el-form
            ref="form"
            label-width="170px"
            label-position="left"
            size="mini"
        >
            <template v-for="(item, index) in value">
                <el-form-item
                    v-if="showItem_(item)"
                    :key="index"
                    :label="item.label"
                    :label-width="item.label ? '' : '0px'"
                    align="right"
                    :class="[item.type, item.comStyle ? item.comStyle : '']"
                >
                    <!-- 输入框组件 -->
                    <el-input
                        v-if="item.type == 'text'"
                        v-bind="item"
                        v-model="item.value"
                        :show-word-limit="!!item.maxlength"
                        :maxlength="item.maxlength"
                        size="mini"
                    ></el-input>
                    <!-- 按钮式切换组件 -->
                    <base-switch
                        v-else-if="item.type === 'switch'"
                        v-bind="item"
                        :options="options_(item)"
                        v-model="item.value"
                    />
                    <!-- 固定颜色切换 -->
                    <div v-else-if="item.type === 'radio-color'">
                        <base-radio-color
                            v-bind="item"
                            v-model="item.value"
                        ></base-radio-color>
                    </div>
                    <!-- 颜色选择器 -->
                    <base-color-picker
                        v-else-if="item.type === 'color'"
                        v-model="item.value"
                    ></base-color-picker>
                    <!-- 上传图片组件 -->
                    <base-upload
                        v-else-if="item.type === 'upload'"
                        v-bind="item"
                        v-model="item.value"
                    ></base-upload>
                    <!-- 多选框 -->
                    <base-checkbox
                        v-else-if="item.type === 'checkbox'"
                        v-bind="item"
                        v-model="item.value"
                    >
                    </base-checkbox>
                    <!-- 单选框 -->
                    <base-radio
                        v-else-if="item.type === 'radio'"
                        v-bind="item"
                        v-model="item.value"
                        @change="radioChange"
                    >
                    </base-radio>
                    <!-- 选择链接 -->
                    <base-links
                        v-else-if="item.type === 'links'"
                        v-bind="item"
                        v-model="item.value"
                        @click="goSetting"
                    />
                    <!-- 拖动设置组件 -->
                    <el-slider
                        class="el-slider__slider"
                        v-else-if="item.type === 'slider'"
                        v-bind="item"
                        v-model="item.value"
                        :show-input-controls="false"
                        :format-tooltip="() => {
                            return sliderFormat(item)
                        }"
                        show-input
                        input-size="mini"
                    ></el-slider>
                    <base-checkbox-group
                        v-else-if="item.type === 'checkbox-group'"
                        v-bind="item"
                        v-model="item.value"
                    ></base-checkbox-group>
                </el-form-item>
                <my-tools
                    v-else-if="item.type === 'tools'"
                    :key="index"
                    v-bind="item"
                    v-model="item.value"
                />
            </template>
        </el-form>
    </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: {
        value: {
            type: Array,
            default: () => []
        },
        cmptId: {
            type: String,
            default: ''
        },
        checked: {
            type: [Boolean, String],
            default: false
        }
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            componentsInfo_: state => state.user.componentsInfo || [],
            pageList_: state => state.user.pageList || []
        }),
        showItem_() {
            return item => {
                if(item.type === 'tools') return false
                if (String(item.show) === 'false') return false

                // 根据上级的字段对应显示
                let itemShow = true
                if (item.show) {
                    const parent = this.value.find(o => o.pro === item.show.pro)
                    return parent.value === item.show.value
                }
                return itemShow
            }
        },
        // 部分配置不能点击
        options_() {
            return ({ options = [] }) => {
                let newOptions = []
                newOptions = options.length ? options : [
                    { label: '否', value: 0 },
                    { label: '是', value: 1 }
                ]
                return newOptions
            }
        }
    },
    // watch: {
    //     value: {
    //         handler(val) {
    //             if(String(this.checked) === 'true') {
    //                 const index = this.pageList_.findIndex(o => o.cmptId === this.cmptId)
    //                 const item = this.pageList_[index]
    //                 item.content = val
    //                 this.replaceItemList({ data: item, index })
    //             }
    //         },
    //         deep: true,
    //     }
    // },
    methods: {
        ...mapActions(['replaceItemList']),
        sliderFormat({ value, unit }) {
            return value + unit
        },
        // 标题禁用规则
        radioChange({ rule, value }) {
            if (rule && rule.length) {
                rule.forEach(o => {
                    const replaceItem = this.componentsInfo_.find(info => info.cmptId === o.cmptId)
                    if (o.contains.includes(value)) {
                        replaceItem.isShow = 0
                        replaceItem.dragOpt = Object.assign({}, replaceItem.dragOpt, o.dragOpt)
                    } else {
                        for (const key in o.dragOpt) {
                            replaceItem.dragOpt[key] = !o.dragOpt[key]
                        }
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content-set {
    padding: 0 60px;
    width: 650px;

    /deep/ .el-form-item {
        margin-bottom: 0 !important;
        margin-top: 22px;
        &__label {
            color: #999;
        }
    }

    /deep/ .el-form-item__label-wrap {
        margin-left: 0 !important;
    }

    /deep/ .text {
        .el-input {
            width: 300px;
        }
    }

    /deep/ .slider {
        .el-slider {
            width: 300px;
        }
        .el-slider__runway.show-input {
            margin-right: 80px;
        }
        .el-slider__button {
            width: 10px;
            height: 10px;
        }
        .el-slider__input {
            width: 50px;
        }
    }

    /deep/ .sub-bgc {
        padding: 10px;
        background: #f4f4f4;
        & + .sub-bgc {
            margin-top: 0 !important;
        }
    }
    /deep/ .menu-tools {
        // padding: 10px;
        background: #f4f4f4;
    }
}
</style>
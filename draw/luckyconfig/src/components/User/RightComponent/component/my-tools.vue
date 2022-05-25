<template>
    <view class="my-tools">
        <view class="label-title">{{ label }}</view>
        <el-collapse
            v-model="activeName"
            accordion
        >
            <draggable
                animation="200"
                filter=".undraggable"
                handle=".base-title"
                :options="{
          forceFallback: true,
        }"
                :list="switchValue_"
            >
                <el-collapse-item
                    v-for="(item, index) in switchValue_"
                    :key="item.id"
                    :name="item.id"
                    class="draggable"
                >
                    <template slot="title">
                        <view class="base-title">
                            <view>
                                <el-checkbox
                                    v-model="item.checked"
                                    @change="handleUpdate"
                                ></el-checkbox>
                                <text class="base-title__bold pl24">{{ item.label }}</text>
                            </view>
                            <view class="flex">
                                <c-icons
                                    size="36"
                                    color="#aaa"
                                    type="icon-bianji1"
                                    class="mr12"
                                />
                                <c-icons
                                    size="36"
                                    color="#aaa"
                                    type="icon-gengduo"
                                />
                                <c-image
                                    v-if="item.menuType === 'custom'"
                                    class="custom-delete"
                                    size="36"
                                    src="drag/goods/close.png"
                                    @click.stop="handleDelete(item.id)"
                                />
                            </view>
                        </view>
                    </template>
                    <el-form
                        label-width="152px"
                        label-position="left"
                        size="mini"
                    >
                        <el-form-item
                            label="菜单名称"
                            align="right"
                        >
                            <el-input
                                v-model="item.label"
                                :show-word-limit="true"
                                :maxlength="6"
                                size="mini"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="菜单图标"
                            align="left"
                        >
                            <base-radio
                                v-if="item.menuType !== 'custom'"
                                v-model="item.iconType"
                                :options="radioOptions"
                                @change="handleRadio($event, index)"
                            />
                            <base-upload
                                bgImgTips="建议上传88*88尺寸的图片"
                                v-if="item.iconType === 'custom' || item.menuType === 'custom'"
                                v-model="item.icon"
                                @input="handleUploadIcon($event, index)"
                            ></base-upload>
                        </el-form-item>
                        <el-form-item
                            label="跳转链接"
                            align="right"
                            v-if="item.menuType === 'custom'"
                        >
                            <base-links
                                v-model="item.value"
                                v-bind="item"
                                placeholder="前往设置链接"
                            ></base-links>
                        </el-form-item>
                        <el-form-item
                            label="跳转链接"
                            align="left"
                            v-if="item.path === 'customer'"
                        >
                            <div
                                class="urlCls"
                                @click="handleToCustomer(item.path)"
                            >跳转到客服设置</div>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </draggable>
        </el-collapse>
        <el-button
            size="medium"
            icon="el-icon-plus"
            plain
            style="width: 100%; margin-top: 12px"
            @click="handleAddMenu"
        >添加菜单</el-button>
    </view>
</template>
<script>
import draggable from '@/utils/vuedraggable'

export default {
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        label: {
            type: String,
            default: '我的工具',
        },
    },
    components: {
        draggable,
    },
    data() {
        return {
            activeName: '',
            radioValue: 1,
            radioOptions: [
                { label: '默认图标', value: 'default' },
                { label: '自定义图标', value: 'custom' },
            ],
            uploadUrl: '',
        }
    },
    computed: {
        switchValue_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            },
        },
    },
    mounted() {
        this.value && !this.value.length && this.getUsersMenu()
    },
    methods: {
        // ...mapActions(['setPageList']),
        async getUsersMenu() {
            const { data } = await this.$http('getMenuList')
            this.$emit('input', data)
        },
        // 重置icon
        handleRadio(e, i) {
            console.log(e);
            if (e.value === 'custom') {
                this.value[i].iconType = 'custom'
                return
            }
            this.value[i].iconType = 'default'
        },
        // 替换icon
        handleUploadIcon(e, i) {
            this.value[i].customIcon = e
        },
        handleAddMenu() {
            // menuType 控制菜单 iconType 控制展示
            let demo = {
                id: this.RandomId(10),
                customIcon: '',
                label: '菜单名称',
                icon: '',
                path: '',
                iconType: 'custom',
                menuType: 'custom',
                value: [{ name: '' }],
            }
            this.value.push(demo)
        },
        handleDelete(id) {
            const index = this.value.findIndex(o => o.id === id)
            this.value.splice(index, 1)
        },
        handleUpdate() {
            this.$emit('input', this.value)
        },
        RandomId(len) {
            return Math.random().toString(36).substr(3, len)
        },
        handleToCustomer(item) {
            // item - customer
            parent.operation && parent.operation({
                module_name: item,
            }, () => {
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.my-tools {
    .label-title {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        padding: 8px 0;
    }

    .base-title {
        position: relative;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        background: #f7f8fa;
        border-radius: 2px;
        &__bold {
            font-weight: bold;
        }
        .custom-delete {
            @include site(null, -15rpx);
            top: 0;
        }
    }
    .urlCls {
        color: #409eff;
        cursor: pointer;
        font-weight: 500;
    }
    /deep/ .el-collapse-item {
        background: #f7f8fa;
    }
    /deep/ .el-collapse-item__header {
        height: 56px;
        border-bottom: none;
    }
    /deep/ .el-collapse-item__wrap {
        border-bottom: none;
        padding: 0 16px;
        background-color: transparent;
        overflow: hidden;
        // margin-top: -16px;
    }
    /deep/ .base-upload-item-bd {
        padding: 0;
    }
    // /deep/ .el-button.is-plain {
    //     background: #FFF;
    //     border-color: #409EFF;
    //     color: #409EFF;
    // }
}
</style>
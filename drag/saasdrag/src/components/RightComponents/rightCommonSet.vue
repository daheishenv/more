<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-21 15:33:59
-->
<template>
    <div class="right-common-set">
        <el-tabs
            v-model="activeName"
            :class="{'has-tabs' :hasTab_}"
        >
            <el-tab-pane
                label="内容设置"
                name="source"
            >
                <template v-if="formList.source && formList.source.length">
                    <rightCommonSetItem v-model="formList.source" />
                </template>
            </el-tab-pane>
            <el-tab-pane
                label="样式设置"
                name="attribute"
            >
                <template v-if="formList.attribute && formList.attribute.length">
                    <rightCommonSetItem v-model="formList.attribute" />
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import rightCommonSetItem from './rightCommonSetItem'
export default {
    components: { rightCommonSetItem },
    data() {
        return {
            activeName: 'source',
            formList: {}
        }
    },
    props: {
        value: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        hasTab_() {
            return this.value.source && this.value.source.length && this.value.attribute && this.value.attribute.length
        }
    },
    watch: {
        value: {
            handler(val) {
                if (val.source && val.source.length) {
                    this.activeName = 'source'
                } else {
                    this.activeName = 'attribute'
                }
                this.formList = this.$deepClone(val)
            },
            deep: true,
            immediate: true
        },
        formList: {
            handler(val) {
                this.$emit('input', val)
            },
            deep: true
        },

    }
}
</script>

<style lang="scss" scope>
.right-common-set {
    /deep/ .el-tabs {
        &.has-tabs {
            .el-tabs__header {
                display: block;
                z-index: 1050;
                position: sticky;
                top: 0;
                background-color: #fff;
            }
        }
        &__header {
            display: none;
            margin-bottom: 0;
            .el-tabs__nav {
                width: 100%;
                @include flex(row);
                justify-content: space-around;
                &-wrap {
                    &::after {
                        height: 1px;
                        background-color: #ebedf0;
                    }
                }
            }
            .el-tabs__item {
                padding: 0 4px;
                border-bottom: 2px solid transparent;
                @include tst;
                &.is-active {
                    border-color: #1b7aff;
                }
            }
            .el-tabs__active-bar {
                display: none;
            }
        }
        &__content {
            padding: 12px 15px;
        }
    }
}
</style>
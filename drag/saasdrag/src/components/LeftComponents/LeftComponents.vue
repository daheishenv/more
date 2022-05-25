<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-06-28 19:54:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-21 16:44:39
-->
<template>
    <el-row class="collapse-box">
        <el-col :span="24">
            <el-collapse v-model="activeName_">
                <el-collapse-item
                    :name="index"
                    v-for="(item, index) in componentsList_"
                    :key="index"
                >
                    <template slot="title">
                        <view class="collapse-title">
                            {{ item.title }}
                        </view>
                    </template>
                    <!-- 
                        :group="{ name: 'components', pull: 'clone', put: false}"
                        name 标识拖拽分组
                        pull clone表示允许克隆被拖动的元素
                        put  可以写入条件
                     -->
                    <draggable
                        class="collapse-list"
                        :list="item.list"
                        :options="{
                            sort: false,
                            forceFallback: true
                        }"
                        dragClass="item-chosen"
                        filter=".item--disabled"
                        :group="{ name: 'components', pull: 'clone', put: false}"
                    >
                        <component-container
                            class="collapse-item"
                            v-for="(val, idx) in item.list"
                            :key="idx"
                            :data-index="`${index}-${idx}`"
                            v-bind="val"
                            @selected="handleClick(val)"
                        ></component-container>
                    </draggable>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </el-row>
</template>

<script>
import ComponentContainer from '@/components/LeftComponents/ComponentContainer/ComponentContainer'
import draggable from '@/utils/vuedraggable'
export default {
    name: 'LeftComponents',
    data() {
        return {
            dragging: false,
            noDrayList: []
        }
    },
    computed: {
        componentsList_() {
            let pageList = (this.$store.state.project.pageList || [])
            let arr = [
                {
                    title: '基础组件',
                    list: this.noDrayList.length ? this.$store.state.componentsInfo.indexList.filter(o => this.noDrayList.findIndex(o1 => o1.module_name === o.module_name) === -1) : this.$store.state.componentsInfo.indexList
                },
                {
                    title: '内容组件',
                    list: this.noDrayList.length ? this.$store.state.componentsInfo.contentList.filter(o => this.noDrayList.findIndex(o1 => o1.module_name === o.module_name) === -1) : this.$store.state.componentsInfo.contentList
                },
                {
                    title: '营销组件',
                    list: this.noDrayList.length ? this.$store.state.componentsInfo.exList.filter(o => this.noDrayList.findIndex(o1 => o1.module_name === o.module_name) === -1) : this.$store.state.componentsInfo.exList
                },
            ]
            return arr.map(item => {
                item.list.forEach(o => {
                    o.useNum = pageList.filter(o1 => o.module_name === o1.module_name).length
                })
                return item
            })
        },
        activeName_: {
            get() {
                return [...new Array(this.componentsList_.length).keys()];
            },
            set(val) {
                // console.log(val);
            }
        }
    },
    components: {
        ComponentContainer,
        draggable,
    },
    created() {
        this.moduleEnableList()
    },
    methods: {
        handleClick(item) {
            const { useNum, limitNum } = item
            if (useNum >= limitNum) {
                this.$message.warning('该组件已达最大数量无法添加');
                return false
            }
            this.$c.debounce(async () => {
                // 将组件信息写入数据
                await this.$store.dispatch('addComponents', { data: item })
            }, 200)
        },
        async moduleEnableList() {
            const { data: { list } } = await this.$http('moduleEnableList')
            this.noDrayList = list && list.filter(o => o.is_show === 0)
        }
    }
}
</script>
<style lang="scss" scoped>
.collapse {
    &-title {
        padding-left: 26px;
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        & + ::v-deep .el-collapse-item__arrow {
            @include abs(null, null, null, 10px);
            &::before {
                content: '\e791';
            }
        }
    }
    &-list {
        position: relative;
        display: flex;
        flex-wrap: wrap;
    }
}
</style>


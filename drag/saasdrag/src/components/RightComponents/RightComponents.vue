<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-20 20:42:27
-->
<template>
    <div
        class="right-components"
        :class="{'right-components__shortcut': currentItem.shortcutOperation}"
    >
        <div
            class="right-components-hd"
            v-if="currentItem.name"
        >
            <div class="right-components__title">{{ currentItem.name }}</div>
        </div>
        <div class="right-components-bd">
            <template v-if="currentItem.isManage">
                <component
                    :is="currentItem.rightComponents"
                    v-bind="currentItem"
                />
            </template>
            <template v-else>
                <component
                    :is="currentItem.rightComponents"
                    v-bind="currentItem"
                    v-model="rightConfig_"
                />
            </template>
        </div>
        <div
            v-if="currentItem.shortcutOperation"
            class="right-components-ft"
        >
            <div class="right-components-ft__content">
                <div class="flex">
                    <div class="flex-1">
                        <el-button
                            type="primary"
                            @click="handleGlobalFollow"
                        >全局同步</el-button>
                    </div>
                    <div class="flex-1">
                        <el-button
                            type="primary"
                            plain
                            @click="setCacheComponentInfo"
                        >复制样式</el-button>
                    </div>
                    <div class="flex-1">
                        <el-button
                            :type="cacheComponentInfo_ ? 'primary' : 'info'"
                            :disabled="cacheComponentInfo_ ? false : true"
                            plain
                            @click="handleStickStyle"
                        >粘贴样式</el-button>
                    </div>
                </div>
            </div>
            <div class="right-components-ft__clear"></div>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import { formatItemData } from '@/utils/drag'
// 页面设置
import pageSetup from './pageSetup'
// 组件管理
import compententManage from './compententManage'
// 组件设置
import rightCommonSet from './rightCommonSet'
export default {
    name: 'RightComponents',
    components: {
        rightCommonSet,
        pageSetup,
        compententManage
    },
    data() {
        return {
            currentItem: {},
            oldData: [],
            oldExtra: {},
            debounceProcessState: [], // 节流执行过程中可能做了2个不同步骤操作
        }
    },
    computed: {
        // 粘贴板
        cacheComponentInfo_() {
            return this.$store.state.currentCheckAttr.cacheComponentInfo
        },
        rightConfig_: {
            get() {
                return this.currentItem.rightConfig || {}
            },
            set(val) {
                if (this.currentItem.module_no) {
                    this.setCmptInfo(val)
                }
            }
        }
    },
    methods: {
        ...mapActions(['setCurrentRightConfig', 'saveItemList', 'setCacheComponentInfo', 'setPageList']),
        setCmptInfo(rightConfig) {
            this.$c.debounce(() => {
                this.setCurrentRightConfig(rightConfig)
            }, 50)
            const saveItem = formatItemData(Object.assign({}, this.currentItem, { rightConfig }))
            // 如果data相同 => 1  走extra => 2 保存
            this.debounceProcessState.push(this.$c.diffByObj(this.oldData, saveItem.data) ? 2 : 1)
            this.$c.debounce(() => {
                const debounceProcessState = Array.from(new Set(this.debounceProcessState))
                debounceProcessState.forEach(num => {
                    this.saveItemList({ flag: num })
                })
                this.debounceProcessState = []
                this.oldData = this.$deepClone(saveItem.data)
            }, 300)
        },
        // 全局同步
        async handleGlobalFollow() {
            // 复制的样式
            await this.setCacheComponentInfo(false)
            const cacheRightConfig = this.cacheComponentInfo_.rightConfig
            const allCacheConfig = [...(cacheRightConfig.attribute || []), ...(cacheRightConfig.source || [])]
            // 获取全部组件
            const pageList = this.$deepClone(this.$store.state.project.pageList)
            const newPageList = pageList.map(item => {
                if (item.shortcutOperation && item.rightConfig) {
                    Object.keys(item.rightConfig).forEach(k => {
                        item.rightConfig[k].forEach(o => {
                            const cacheItem = ['innerLayer', 'outerLayer', 'titleLayer'].includes(o.pro) && allCacheConfig.find(o1 => o1.pro === o.pro && o1.key === o.key)
                            if (cacheItem) {
                                o.value = cacheItem.value
                            }
                        })
                    })
                    item = formatItemData(item)
                }
                return item
            })
            this.setPageList(newPageList)
            this.$message({
                message: '全局样式同步完成',
                type: 'success'
            })
        },
        // 黏贴样式
        async handleStickStyle() {
            if (!this.cacheComponentInfo_) {
                this.$message({
                    message: '请先复制样式',
                    type: 'error'
                })
                return
            }
            // 复制的样式
            const cacheRightConfig = this.cacheComponentInfo_.rightConfig
            const allCacheConfig = [...(cacheRightConfig.attribute || []), ...(cacheRightConfig.source || [])]
            // 现在已有的样式
            let newRightConfig = {}
            Object.keys(this.rightConfig_).forEach(k => {
                newRightConfig[k] = this.rightConfig_[k].map(o => {
                    const cacheItem = ['innerLayer', 'outerLayer', 'titleLayer'].includes(o.pro) && allCacheConfig.find(o1 => o1.pro === o.pro && o1.key === o.key)
                    if (cacheItem) {
                        o.value = cacheItem.value
                    }
                    return o
                })
            })
            this.setCmptInfo(newRightConfig)
            // 重置当前选中的右侧操作
            this.$c.debounce(() => {
                this.initCmptInfo()
            }, 100)
            this.$message({
                message: '样式粘贴成功',
                type: 'success'
            })
        },
        // 初始化组件信息
        initCmptInfo() {
            let currentItem = this.$deepClone(this.$store.state.currentCheckAttr.componentInfo)
            this.currentItem = currentItem
            this.oldData = this.$deepClone(currentItem.data)
            this.oldExtra = this.$deepClone(currentItem.extra)
            // 如果存在这个值说明有默认数据或者有线上数据，建议保存一下
            if (this.currentItem.data && this.currentItem.data.length) {
                this.$c.debounce(() => {
                    this.saveItemList({ flag: 1 })
                }, 1000)
            }
        }
    },
    watch: {
        // 这边只能监听他的变化， 不能监听componentInfo，会死循环
        '$store.state.currentCheckAttr.componentInfo.module_no': {
            handler(val) {
                this.debounceProcessState = []
                if (val) {
                    this.initCmptInfo()
                } else {
                    this.currentItem = {}
                }
            },
            deep: true,
            immediate: true
        },
        '$store.state.currentCheckAttr.manegeInfo': {
            handler(val) {
                if (val) {
                    this.currentItem = this.$deepClone(val)
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style lang="scss" scope>
.right-components {
    height: 100%;
    position: relative;
    &-ft {
        &__clear {
            height: 64px;
        }
        &__content {
            box-shadow: 0px -1px 0px 0px #ebedf0;
            @include abs(null, 0, 0, 0);
            background-color: #fff;
            .flex {
                padding: 8px;
                .flex-1 {
                    padding: 8px;
                    max-width: calc(100% / 3);
                }
                /deep/ .el-button {
                    width: 100%;
                    padding: 8px;
                }
            }
        }
    }
    &-bd {
        height: calc(100% - 56px);
        overflow: auto;
    }
    &__shortcut {
        .right-components-bd {
            height: calc(100% - 120px);
        }
    }
    &__title {
        height: 56px;
        @include flex(row);
        align-items: center;
        background: #f4f4f4;
        font-size: 18px;
        padding: 0 16px;
        font-weight: 600;
        color: #333333;
    }
}
</style>
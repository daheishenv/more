<template>
    <view class="user-right-component bg-fff">

        <el-collapse
            v-model="activeNames"
            accordion
            @change="collapseChange"
        >
            <draggable
                animation="200"
                filter=".undraggable"
                ghostClass="compentent-manage__ghost"
                dragClass="compentent-manage__drag"
                handle=".header"
                :options="{
                    forceFallback: true
                }"
                :list="componentsInfo_"
            >
                <el-collapse-item
                    class="compentent-manage__item"
                    :class="[isDraggable_(item) ? 'draggable' : 'undraggable', {'shop-guide_cls': item.cmptId === 'shop-guide' || item.cmptId === 'user-brand'}]"
                    v-for="(item, index) in componentsInfo_"
                    :key="index"
                    :name="item.cmptId"
                    :disabled="item.cmptId === 'shop-guide' || item.cmptId === 'user-brand'"
                >
                    <template slot="title">
                        <base-title
                            class="header"
                            v-bind="item"
                            v-model="item.isShow"
                        ></base-title>
                    </template>
                    <div class="p24">
                        <content-set
                            v-bind="item"
                            v-model="item.content"
                            :checked="item.value"
                        />
                    </div>
                </el-collapse-item>
            </draggable>
        </el-collapse>
    </view>
</template>

<script>
const addEvent = (nodeId, eventType, callback) => {
    if (nodeId.addEventListener) {
        nodeId.addEventListener(eventType, callback, true);
    } else {
        nodeId.attachEvent('on' + eventType, callback);
    }
}
// 判断 event 事件对象 不存在
const prevent = (event) => {
    let e = event || window.event;
    // if (e.preventDefault) {
    //     e.preventDefault();
    // }
    return e;
}
import draggable from '@/utils/vuedraggable'
import ContentSet from '@/components/User/RightComponent/ContentSet'
import { formatItemData } from '@/utils/drag'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        draggable,
        ContentSet
    },
    data() {
        return {
            pageList: [],
            activeNames: ''
        }
    },
    computed: {
        ...mapState({
            componentsInfo_: state => state.user.componentsInfo || [],
            pageList_: state => state.user.pageList
        }),
        isDraggable_() {
            return (item) => {
                return String((item.dragOpt || {}).draggable) !== 'false'
            }
        },
    },
    watch: {
        componentsInfo_: {
            handler(val) {
                const pageList = val.filter(o => parseInt(o.isShow) === 1)
                this.pageList = this.$deepClone(pageList)
            },
            deep: true,
        },
        pageList: {
            handler(val, oldVal) {
                const data = val.map(o => {
                    return formatItemData(o)
                })
                if (oldVal && val.length === oldVal.length) {
                    // 页面数据长度不改变时, 展开没有勾选，不改变pageList
                    if (this.activeNames) {
                        const index = val.findIndex(o => o.cmptId === this.activeNames)
                        if (index === -1) return
                    }
                }
                this.setPageList(data)
            },
            deep: true,
        },
        '$store.state.user.currentCheckAttr': {
            handler(val) {
                val.cmptId && (this.activeNames = val.cmptId)
            },
            deep: true
        }
    },
    mounted() {
        Array.from(document.querySelectorAll('.el-form')).forEach(node => {
            addEvent(node, 'click', function (ev) {
                var oEvent = prevent(ev);
                if (oEvent.target.nodeName.toLowerCase() === 'input') { //若是目标元素是input则跳出滑动事件
                    oEvent.target.focus()
                    return;
                }
            })
        })
    },
    methods: {
        ...mapActions(['setPageList', 'setCurrentCheckAttr']),
        handleChange() {
        },
        collapseChange() {
            if (this.activeNames) {
                this.setCurrentCheckAttr({ cmptId: this.activeNames })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.user-right-component {
    .el-collapse-item__header {
        background: #f2f2f2;
    }
}
.bg-f4 {
    background: #eee;
}
/deep/ .el-collapse-item__arrow {
    display: none;
}
.shop-guide_cls {
    /deep/ .el-collapse-item__content {
        display: none;
    }
}
</style>
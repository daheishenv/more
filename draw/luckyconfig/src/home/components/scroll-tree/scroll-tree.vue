<style lang="scss" scoped>
.scroll-tree {
    height: 100%;
    flex-shrink: 0;
    &.is-border {
        border-right: 1rpx solid #ededed;
    }
    &--scroll {
        height: inherit;
    }
    &--item {
        &.is-active {
            .dot {
                position: absolute;
                width: 8rpx;
                height: 28rpx;
                border-radius: 4rpx;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
            }
            .scroll-tree--head {
                font-weight: bold;
            }
        }
    }
    &--head {
        position: relative;
        height: 104rpx;
        display: flex;
        align-items: center;
        text-align: center;
        padding: 0 12rpx;
    }
    &--title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>
<template>
    <view
        class="scroll-tree"
        :class="{'is-border':isBorder}"
        :style="{width:width+'rpx'}"
    >
        <scroll-view
            :scroll-y="true"
            scroll-with-animation
            :scroll-into-view="currentId_"
            class="scroll-tree--scroll"
        >
            <view
                v-for="(i,y) in remote"
                :id="'tree-item'+y"
                :key="y"
                class="scroll-tree--item"
                :class="{'is-active':i.cat_id === value}"
                :style="mergeConfig_.style"
                @click.stop="changeActive(i.cat_id,y)"
            >
                <view
                    class="scroll-tree--head"
                    :style="[i.cat_id === value ? mergeConfig_.active : mergeConfig_.default]"
                >
                    <view class="scroll-tree--title">{{ i.cat_name }}</view>
                    <view
                        class="dot"
                        :style="[i.cat_id === value ? dotStyle_: '' ]"
                    ></view>
                </view>
                <template v-if="cmptStyle === 'style4' && i.cat_id === value">
                    <sub-home-scroll-tree-item
                        v-model="childTreeActiveId_"
                        :loading="config.childLoading"
                        :remote="config.cateData.child_category"
                        :parent-checked="value"
                    />
                </template>
            </view>
            <c-no-data
                v-if="!loading && !remote.length"
                :show-img="false"
                text="暂无数据"
            ></c-no-data>
        </scroll-view>
    </view>
</template>
<script>
const defaultConfig = () => {
    return {
        style: {
        },
        dot: {
            background: 'rgba(255, 93, 12, 1)'
        },
        active: {
            background: '#fff', // 激活的item颜色
            color: 'rgba(255, 93, 12, 1)', // 激活的字体颜色
            fontSize: '32rpx',
            justifyContent: 'center'
        },
        default: {
            fontSize: '28rpx',
            background: '#fff', // 没有激活的item颜色
            color: 'rgba(102, 102, 102, 1)',
            justifyContent: 'center'
        }
    }
}
const assignObj = (o1, o2) => {
    Object.keys(o2).forEach(element => {
        Object.assign(o1[element], o2[element])
    })
    return o1
}
const getTypeStyle = (type) => {
    switch (type) {
        case 'style2':
            return {
                default: {
                    background: 'rgba(245, 245, 245, 1)',
                    color: '#666666'
                }
            }
        case 'style3':
            return {
                active: {
                    background: 'rgba(245, 245, 245, 1)',
                    color: 'rgba(51, 51, 51, 1)'
                },
                default: {
                    background: '#fff',
                    color: 'rgba(102, 102, 102, 1)'
                }
            }
        case 'style4':
            return {
                style: {
                    justifyCenter: 'flex-start',
                    background: '#fff'
                },
                dot: {
                    background: '#fff'
                },
                active: {
                    textDecoration: 'underline',
                    color: 'rgba(51, 51, 51, 1)',
                    paddingLeft: '24rpx',
                    justifyContent: 'flex-start'
                },
                default: {
                    paddingLeft: '24rpx',
                    justifyContent: 'flex-start'
                }
            }
    }
    return {}
}
const mergeConfig = (type) => {
    const config = defaultConfig()
    assignObj(config, getTypeStyle(type))
    return config
}
export default {
    props: {
        width: {
            type: Number,
            default: 160
        },
        loading: Boolean,
        config: {
            type: Object,
            default: () => { }
        },
        childId: {
            type: Number,
            default: -1
        },
        immediate: {
            type: Boolean,
            default: true
        },
        isBorder: Boolean,
        value: Number,
        remote: {
            type: Array,
            default: () => []
        },
        cmptStyle: {
            type: String,
            default: 'style1'
        }
    },
    data() {
        return {
            // isDone: false,
            currentIndex: null
        }
    },
    computed: {
        childTreeActiveId_: {
            get() {
                return this.childId
            },
            set(val) {
                this.$emit('update:childId', val)
            }
        },
        currentId_() {
            const typeIndex = this.currentIndex - 2
            return 'tree-item' + typeIndex
        },
        mergeConfig_() {
            return mergeConfig(this.cmptStyle)
        },
        dotStyle_() {
            return this.mergeConfig_.dot
        }
    },
    watch: {
        // 每次数据改变了触发一次change事件
        // 主要复位0
        remote: {
            immediate: true,
            handler: function (newValue, oldValue) {
                if (newValue.length !== 0 && this.immediate) {
                    // this.isDone = true;
                    this.changeActive(this.remote[0].cat_id, 0)
                }
                if (newValue.length === 0) {
                    this.$emit('clear')
                }
            }
        }
    },
    methods: {
        changeActive(id, index) {
            if (this.value !== id) {
                this.currentIndex = index
                this.$emit('input', id)
                this.$emit('change', {
                    detail: {
                        value: id
                    }
                })
            }
        }
    }
}
</script>

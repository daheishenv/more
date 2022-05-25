<template>
    <view>
        <c-popup
            v-model="selectFlag"
            mode="bottom"
            close
            radius="24rpx 24rpx 0 0"
        >
            <view class="select-address-modal">
                <view class="ss-modal__title pt24">{{ options.beforeText }}</view>
                <scroll-view
                    scroll-y
                    class="p24 c-underline select-address__scroll"
                >
                    <c-checkbox-list
                        v-model="selectItem"
                        :list="list"
                        :is-multiple="!!options.isMultiple"
                        :max="options.max || 1"
                        :label-key="labelKey"
                        :id-key="idKey"
                        :item-layer="itemLayer"
                        :loding-text="lodingText"
                        :pattern="options.pattern"
                        :msg-name="options.msgName"
                    />
                    <!-- <global-ss-radio-group :labelKey='labelKey' :idKey='idKey' :list='list' @change="handleSureSubmit"></global-ss-radio-group> -->
                </scroll-view>
                <c-fixed-menu
                    position="bottom"
                    height="136"
                >
                    <view class="fixed-menu p24">
                        <c-colors
                            :theme="['t', '#fff']"
                            :pro="['bgc', 'c']"
                            radius="16"
                        >
                            <c-button
                                height="88"
                                type="inherit"
                                @click="handleSureSubmit($event, 'confirm')"
                            >确认</c-button>
                        </c-colors>
                    </view>
                </c-fixed-menu>
            </view>
        </c-popup>
    </view>
</template>

<script>
export default {
    props: {
        itemLayer: {
            type: Object,
            default: () => { }
        },
        options: {
            type: Object,
            default: () => { }
        },
        value: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: () => []
        },
        labelKey: {
            type: String,
            default: 'label'
        },
        idKey: {
            type: String,
            default: 'value'
        },
        checkValue: {
            type: Array,
            default: () => []
        },
        lodingText: {
            type: String,
            default: '暂无数据'
        }
    },
    data() {
        return {
            selectFlag: false,
            selectItem: []
        }
    },
    watch: {
        value: {
            handler(val) {
                this.selectFlag = val
                console.log(this.options.isMultiple, 'this.options')
            },
            immediate: true
        },
        selectFlag(val) {
            this.$emit('input', val)
        },
        checkValue: {
            deep: true,
            immediate: true,
            handler(val) {
                this.selectItem = val
            }
        }
    },
    methods: {
        handleSureSubmit(e, type = 'change') {
            if (type === 'confirm') {
                this.$emit('submit', {
                    type: type,
                    detail: {
                        value: this.options.isMultiple ? this.selectItem : this.selectItem[0],
                        label: this.selectItem.map((v) => this.list.find(k => k[this.idKey] === v).label).join(',')
                    }
                })
                this.selectFlag = false
            } else {
                // this.selectItem = e.detail.value
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.select-address-modal {
    background-color: #fff;
    // border-radius: 24rpx 24rpx 0px 0px;
    .ss-modal__title {
        font-size: 32rpx;
        text-align: center;
    }
    .select-address {
        &:last-child::after {
            display: none;
        }
        &__scroll {
            max-height: 67vh;
            min-height: 30vh;
        }
    }
}
</style>

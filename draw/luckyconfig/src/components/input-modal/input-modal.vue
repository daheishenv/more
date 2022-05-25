<template>
    <view class="gc-input-modal">
        <c-modal
            ref="cModal"
            v-model="modalFlag"
            :title="title"
            :hd-style="hdStyle_"
            :show-cancel="showCancel"
            :show-close="showClose"
            :async-close="asyncClose"
            @confirm="handleConfirm"
        >
            <view class="c-input-box p12">
                <!-- :focus="modalFlag" -->
                <view class="c-underline">
                    <c-input
                        v-model="buyNum"
                        :type="inputType"
                        min="1"
                        :max="max"
                        @confirm="handleInputConfirm"
                        @focus="handleFocus"
                        @blur="handleBlur"
                    ></c-input>
                </view>
            </view>
        </c-modal>
    </view>
</template>

<script>
export default {
    name: 'GcInputModal',
    props: {
        title: {
            type: String,
            default: '请输入数量'
        },
        showCancel: {
            type: [Boolean, String],
            default: true
        },
        showClose: {
            type: [Boolean, String],
            default: true
        },
        // 是否开启异步关闭
        asyncClose: {
            type: [Boolean, String],
            default: false
        },
        // 输入框类型
        inputType: {
            type: String,
            default: 'price'
        },
        value: {
            type: Boolean,
            default: false
        },
        num: {
            type: [String, Number],
            default: 1
        },
        max: {
            type: [String, Number],
            default: 1
        }
    },
    data() {
        return {
            modalFlag: false,
            buyNum: 1,
            inputFocus: false
        }
    },
    computed: {
        hdStyle_() {
            return {
                top: this.inputFocus ? '-200rpx' : '0rpx'
            }
        },
        asyncClose_() {
            return String(this.asyncClose) !== 'false'
        }
    },
    watch: {
        value: {
            handler(val) {
                this.modalFlag = val
                this.buyNum = this.num
            },
            immediate: true
        },
        modalFlag(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        handleInputConfirm() {
            uni.hideKeyboard()
        },
        handleFocus() {
            this.inputFocus = true
        },
        handleBlur() {
            this.inputFocus = false
        },
        clearLoading() {
            this.$refs.cModal && this.$refs.cModal.clearLoading()
        },
        handleConfirm() {
            if (!this.asyncClose_) {
                this.modalFlag = false
            }
            this.$emit('confirm', {
                type: 'confirm',
                detail: {
                    value: this.inputType === 'price' ? (this.buyNum || 1) : this.buyNum
                }
            })
        }
    }
}
</script>

<style lang="scss">
.gc-input-modal {
    text-align: left;
}
</style>

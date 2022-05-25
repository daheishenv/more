<template>
    <view class="mt24">
        <view
            class="my-panel"
            :style="[outerLayer_]"
        >
            <c-cell
                title="我的工具"
                :title-style="{ fontSize: '32rpx', fontWeight: 'bold' }"
                border
            ></c-cell>
            <view v-if="cData_ && cData_.length > 0">
                <view
                    v-if="mode_ === 'style2'"
                    class="my-tools ptb16"
                >
                    <view
                        v-for="(item, i) in cData_"
                        v-show="wxInterest_(item)"
                        :key="i"
                        class="my-tools-item ptb16"
                        @tap="handleClick(item)"
                    >
                        <c-image
                            size="56"
                            :src="icon_(item)"
                        ></c-image>
                        <text class="pt12">{{ item.label }}</text>
                    </view>
                </view>
                <view v-if="mode_ === 'style1'">
                    <c-cell
                        v-for="(item, i) in cData_"
                        v-show="wxInterest_(item)"
                        :key="i"
                        :border="i !== cData_.length - 1"
                        :icon="icon_(item)"
                        :title="item.label"
                        arrow
                        icon-size="44"
                        @tap="handleClick(item)"
                    >
                        <template v-slot:value>
                            <view
                                v-if="item.prop !== 'invite_code'"
                                class="value"
                            >
                                <text class="value-num">{{
                                    userInfo && userInfo[item.prop]
                                }}</text>
                            </view>
                        </template>
                    </c-cell>
                </view>
            </view>
            <view
                v-if="cData_ && cData_.length === 0"
                class="ptb36"
            >
                <c-no-data
                    show-img
                    :text="noDataText_"
                ></c-no-data>
            </view>
        </view>

        <c-modal
            v-model="invieteFlag"
            title="业务员邀请码"
            confirm-text="复制"
            show-cancel="false"
            show-close="true"
            close-pos="top-right"
            :content-style="{ fontSize: '32rpx', color: '#666666' }"
            maskabled
            @confirm="handleConfirm"
        >
            {{ invieteCode }}
        </c-modal>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'
import allConfig from '@/config'
export default {
    name: 'UserInterest',
    mixins: [userComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    props: {
        userInfo: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            invieteCode: '',
            invieteFlag: false,
            delivery_code: '',
            codeFlag: false
        }
    },
    computed: {
        cData_() {
            return (this.extra_.toolsData &&
                    this.extra_.toolsData.filter((v) => v.checked)) ||
                []
        },
        icon_() {
            return (item) => {
                // const isUrl = (/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g.test(item.icon))
                // const isWhiteList = item.icon.indexOf('/tools/') >= 0
                // if (item.iconType === 'custom' && !isWhiteList && !isUrl) {
                //     return allConfig.baseOssImgUrl + item.icon
                // }
                // return item.icon
                return item.iconType === 'custom' ? item.customIcon : item.defaultIcon
            }
        },
        // 用户是否为合伙人权益
        isShared_() {
            return this.userInfo.is_partner_equity
        },
        colors_() {
            return this.shopConfig_ ? this.shopConfig_.color : {}
        },
        iconStyle_() {
            return {
                color: !this.isShared_ ? this.colors_.theme : '#FFBA53'
            }
        },
        isImg_() {
            return (icon) => {
                console.log(icon)
                return this.$c.isImg(icon)
            }
        },
        wxInterest_() {
            return (val) => {
                let isShow = true
                // #ifndef MP-WEIXIN
                isShow = false
                // #endif
                return (
                    allConfig.projectSource || isShow || (val.prop !== 'to_the_code' && val.prop !== 'scan_results')
                )
            }
        }
    },
    methods: {
        handleClick(item) {
            if (item.iconType === 'custom') {
                this.$serverJump(item.value[0])
                return
            }
            if (item.path === 'customer') {
                this.handleCustomerService()
                return
            }
            if (item.prop === 'invite_code') {
                this.invieteCode = this.userInfo[item.prop]
                this.invieteFlag = true
                return
            }
            if (item.prop === 'to_the_code') {
                this.scanCode()
                return
            }
            if (item.prop === 'to_the_code') {
                this.scanCode()
                return
            }
            if (item.prop === 'scan_results') {
                this.scan_results()
                return
            }
            this.$jump(item.path)
        },
        scan_results() {
            uni.scanCode({
                success: (res) => {
                    const code = res.result
                    this.$jump('scanResults', { code })
                }
            })
        },
        scanCode() {
            // const that = this
            uni.scanCode({
                success: (res) => {
                    // that.delivery_code = res.result
                    // that.codeFlag = true
                    this.$jump('orderDetails', {
                        toTheCode: res.result
                    })
                }
            })
        },
        handleConfirm() {
            this.$c.copyText({ content: this.invieteCode })
            this.$toast('复制成功～')
        },
        handleCustomerService() {
            const url = this.shopInfo_.customer_url
            if (!url) return this.$toast('未配置地址')
            this.$serverJump({
                app_page: /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g.test(url)
                    ? url
                    : this.curDomain_ + url
            })
        }
    }
}
</script>

<style lang="scss">
.my-panel {
    margin-top: 24rpx;
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    font-size: 24rpx;
}
.my-tools {
    @include flex(row);
    flex-wrap: wrap;
    &-item {
        @include flex();
        align-items: center;
        color: #000000;
        width: 25%;
    }
}
</style>

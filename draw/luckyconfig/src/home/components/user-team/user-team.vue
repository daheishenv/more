<template>
    <view class="my-team mt24">
        <view
            class="my-team__box"
            :style="[ outerLayer_ ]"
        >
            <c-cell
                :cell-style="{ padding: '0 24rpx', height: '90rpx', backgroundColor: outerLayer_.backgroundColor }"
                :title="title_"
                border
                arrow
                arrow-size="30"
                @tap="$jump('teamAnalysis')"
            >
                <view
                    slot="value"
                    class="my-team__title"
                >
                    <c-colors
                        :theme="[colorBack_]"
                        :pro="['c']"
                        class="my-team__icon"
                    >
                        <c-icons
                            size="30"
                            type="icon-baobiao"
                        />
                    </c-colors>
                    <c-colors
                        :theme="[colorBack_]"
                        :pro="['c']"
                        class="my-team__text"
                    >
                        <text style="padding-left: 8rpx">智能报表</text>
                    </c-colors>
                </view>
            </c-cell>
            <view class="c-row">
                <view class="c-col-12">
                    <c-colors
                        :pro="['bgc']"
                        :theme="[blockBack_]"
                        radius="8"
                    >
                        <view class="invitation">
                            <view class="label">
                                <text>邀请好友</text>
                            </view>
                            <view class="sub">
                                <text>开启线上共享营销</text>
                            </view>
                            <c-colors
                                :pro="['bgc', 'c', 'bdc']"
                                :theme="[btnBack_, btnColorBack_, btnColorBack_]"
                                radius="40"
                            >
                                <view class="invitation__btn">
                                    <c-button
                                        shape="circle"
                                        width="180"
                                        size="mini"
                                        @tap="inviteToFriend"
                                    >
                                        立即邀请
                                        <c-icons
                                            size="30"
                                            type="icon-tiaozhuan"
                                            class="invitation__btn-icon"
                                        />
                                    </c-button>
                                </view>
                            </c-colors>
                        </view>
                    </c-colors>
                </view>
                <view class="c-col-6">
                    <c-colors
                        :pro="['bgc']"
                        :theme="[blockBack_]"
                        radius="8"
                    >
                        <view
                            class="item"
                            @click="$jump('teamMember')"
                        >
                            <c-colors
                                class="item__icon"
                                :theme="[iconBlockBack_]"
                            >
                                <c-icons
                                    color="false"
                                    size="86"
                                    type="icon-wodetuandui1"
                                ></c-icons>
                            </c-colors>
                            <view class="value">
                                <text>{{ cData.total_count || 0 }}</text>
                            </view>
                            <view class="label">
                                <text>我的团队</text>
                            </view>
                        </view>
                    </c-colors>
                </view>
                <view
                    v-if="!isSee_"
                    class="c-col-6"
                >
                    <c-colors
                        :pro="['bgc']"
                        :theme="[blockBack_]"
                        radius="8"
                    >
                        <view
                            class="item"
                            @click="$jump('teamMember', { menuIndex: 1 })"
                        >
                            <c-colors
                                class="item__icon"
                                :theme="[iconBlockBack_]"
                            >
                                <c-icons
                                    color="false"
                                    size="86"
                                    type="icon-jinrixinzeng"
                                ></c-icons>
                            </c-colors>
                            <view class="value">
                                <text>{{ cData.today_count || 0 }}</text>
                            </view>
                            <view class="label">
                                <text>今日新增</text>
                            </view>
                        </view>
                    </c-colors>
                </view>
                <view
                    v-if="isSee_"
                    class="c-col-6"
                >
                    <c-colors
                        :pro="['bgc']"
                        :theme="['t|0.05']"
                        radius="8"
                    >
                        <view
                            class="item"
                            @click="$jump('teamMember', { menuIndex: 1 })"
                        >
                            <c-colors
                                class="item__icon"
                                :theme="[iconBlockBack_]"
                            >
                                <c-icons
                                    color="false"
                                    size="86"
                                    type="icon-jinrixinzeng"
                                ></c-icons>
                            </c-colors>
                            <view class="value">
                                <text>{{ cData.staff_count || 0 }}</text>
                            </view>
                            <view class="label">
                                <text>员工团队</text>
                            </view>
                        </view>
                    </c-colors>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'

export default {
    mixins: [userComponentMixins],
    props: {
        userInfo: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            cData: {}
        }
    },
    computed: {
        followTheme_() {
            return Number(this.extra_.followTheme)
        },
        iconBlockBack_() {
            return this.followTheme_ ? 't|0.15' : this.rgbToRgba(this.extra_.innerLayer.backgroundColor, 0.3)
        },
        blockBack_() {
            return this.followTheme_ ? 't|0.05' : this.rgbToRgba(this.extra_.innerLayer.backgroundColor, 0.15)
        },
        btnBack_() {
            return this.followTheme_ ? 't' : this.rgbToRgba(this.extra_.innerLayer.backgroundColor, 0.15)
        },
        btnColorBack_() {
            return this.followTheme_ ? '#fff' : this.outerLayer_.color
        },
        colorBack_() {
            return this.followTheme_ ? 't' : this.rgbToRgba(this.extra_.innerLayer.backgroundColor, 0.6)
        },
        // 用户是否为合伙人权益
        isShared_() {
            return this.userInfo.is_partner_equity
        },
        isAuth() {
            // 是否授权
            /**
             * @Number wx_app_auth 公众号授权 0 未授权 1 已授权
             * @String unionid 小程序unionid
             */
            const { wx_app_auth = 3 } = this.userInfo || {}
            const h5Normal = !this.$isWechatBrowser
            return h5Normal ? true : wx_app_auth
        },
        title_() {
            return this.isShared_ ? '我的客源' : '我的团队'
        },
        // 是否有查看其他成员团队权限
        isSee_() {
            return this.cData.is_see
        }
    },
    methods: {
        inviteToFriend() {
            this.$emit('inviteToFriend', {
                type: 'inviteToFriend',
                detail: {}
            })
        },
        getUserInfo() {
            this.$emit('getUserInfo', {
                type: 'getUserInfo',
                detail: {}
            })
        },
        rgbToRgba(color, alp) {
            let r, g, b
            const rgbaAttr = color.match(/[\d.]+/g)
            if (rgbaAttr.length >= 3) {
                r = rgbaAttr[0]
                g = rgbaAttr[1]
                b = rgbaAttr[2]
                return 'rgba(' + r + ',' + g + ',' + b + ',' + alp + ')'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.my-team {
    &__box {
        overflow: hidden;
    }
    &__icon {
        display: inline-block;
        height: 32rpx;
        line-height: 32rpx;
        vertical-align: middle;
    }
    &__title {
        @include flex(row);
        align-items: center;
    }
    border-radius: 16rpx;
    overflow: hidden;
    .top {
        display: flex;
        align-items: center;
        border-bottom: solid 0.5px #ededed;
        .label {
            font-size: 32rpx;
            line-height: 44rpx;
        }
        .value {
            font-size: 26rpx;
            line-height: 38rpx;
            margin-left: auto;
            display: flex;
            align-items: center;
        }
    }
    .invitation {
        padding: 24rpx;
        position: relative;
        border-radius: 8rpx;
        .label {
            font-size: 32rpx;
            line-height: 44rpx;
            padding-bottom: 12rpx;
            font-weight: bold;
        }
        .sub {
            font-size: 28rpx;
            line-height: 40rpx;
            // padding-bottom: 12rpx;
            color: #999;
        }
        &__btn {
            position: absolute;
            top: 50%;
            right: 22rpx;
            transform: translateY(-50%);
            &-icon {
                margin-top: 2rpx;
                margin-right: -16rpx;
            }
        }
    }
    .item {
        padding: 24rpx;
        position: relative;
        &__icon {
            @include abs(null, 0, 0);
        }
        .value {
            font-size: 42rpx;
            font-weight: bold;
            line-height: 42rpx;
            padding-bottom: 24rpx;
        }
        .label {
            font-size: 24rpx;
            line-height: 34rpx;
            color: #999;
        }
    }
}
</style>

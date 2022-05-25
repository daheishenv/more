<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-11-27 17:46:35
-->
<template>
    <view class="define-form-layout">
        <c-image
            src="platform/home/form-layout.png"
            height="810"
            width="750"
            class="define-form-layout__bg"
        ></c-image>

        <view class="define-form-layout__title">
            <c-image
                src="drag/home/center/crown.png"
                size="46"
                class="mr12"
            ></c-image>
            最高可申请100万元
        </view>
        <view class="define-form-layout__desc">
            已为 {{total_mem_num}}+ 位业主服务
        </view>
        <view class="define-form-comp">
            <sub-home-define-form
                :config="config"
                @backNotice="handleNotice"
            ></sub-home-define-form>
            <view class="notice-comp">
                <sub-home-notice-comp :list="noticeList"></sub-home-notice-comp>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    options: {
        styleIsolation: 'shared'
    },
    name: 'HomeDefineFormLayout',
    props: {
        config: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            noticeList: [],
            total_mem_num: 0
        }
    },
    created() {
        // this.handleNotice()
    },
    methods: {
        async handleNotice(data) {
            // const { data } = await this.$http('ZzskLoanOrder/scrollApply')
            this.noticeList = data.list
            this.total_mem_num = data.total_mem_num

        },
    }
}
</script>
<style lang="scss">
.define-form-layout {
    position: relative;
    // height: 810rpx;
    &__bg {
        position: absolute;
        top: 0;
        left: 0;
    }
    &__title {
        @include flex(row);
        align-items: center;
        height: 66rpx;
        width: fit-content;
        font-weight: bold;
        font-size: 48rpx;
        font-weight: blod;
        color: #651503;
        position: absolute;
        top: 50rpx;
        left: 50%;
        transform: translateX(-50%);
    }
    &__desc {
        position: absolute;
        top: 126rpx;
        left: 50%;
        transform: translateX(-50%);
    }
    .define-form-comp {
        padding: 206rpx 0 0;
        position: relative;
        z-index: 10;
        .notice-comp {
            position: absolute;
            bottom: 12rpx;
            left: 0;
            padding: 0 32rpx;
            width: 100%;
        }
        /deep/ .c-cell--normal {
            position: relative;
            &::after {
                content: '';
                @include abs(null, 0, 0, 0);
                z-index: 2;
                height: 1px;
                transform: scaleY(0.5);
                background-color: #ededed;
            }
            &:nth-last-child(1) {
                &::after {
                    display: none;
                }
            }
        }
        /deep/ .c-btn--inherit, .c-btn--inherit__plain {
            color: #fff;
            background: linear-gradient(90deg, #fd6b03 0%, #fa3926 100%);
            font-size: 28rpx;
            border-radius: 44rpx !important;
        }
    }

    /deep/ .define-form {
        padding-bottom: 78rpx;
    }
}
</style>

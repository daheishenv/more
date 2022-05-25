<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-06-16 09:04:32
-->
<template>
    <view class="slideMenu">
        <!-- 客服 -->
        <view class="item">
            <!-- <view class="item" v-if="contactBtn || shopInfo_.customer_index"> -->
            <!-- 小程序客服 -->
            <view v-if="contactBtn || shopInfo_.customer_type && shopInfo_.customer_type === 1">
                <!-- #ifdef MP-WEIXIN -->
                <c-button
                    open-type="contact"
                    bindcontact="handleContact"
                    height="110"
                >
                    <c-image
                        src="home/kefu.png"
                        size="110"
                        radius="56"
                        mode="aspectFill"
                    />
                </c-button>
                <!-- #endif -->
            </view>
            <view v-else>
                <c-image
                    @click="handleClick"
                    src="home/kefu.png"
                    size="110"
                    radius="56"
                    mode="aspectFill"
                />
            </view>
        </view>
    </view>
</template>
<script>
import { mapState } from "vuex";
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HomeSlideMenu',
    mixins: [homeComponentMixins],
    computed: {
        ...mapState({
            shopInfo_: (state) =>
                state.config.shopInfo ? state.config.shopInfo : {},
        }),
    },
    props: {
        contactBtn: { //集速配物流
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            let url = this.shopInfo_.customer_url;
            // if (!url) return this.$toast("未配置地址");
            this.$serverJump({
                app_page: /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g.test(url) ? url : this.$config.hostUrl + url,
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.slideMenu {
    position: fixed;
    right: 30rpx;
    @include iosSafeArea(bottom, 200rpx, bottom);
    z-index: 10;
    .item {
        // margin-top: 20rpx;
        padding: 0;
        background-color: transparent;
        & + .item {
            margin-top: 20rpx;
        }
        /deep/ button {
            padding: 0;
        }
        &::after {
            display: none;
        }
    }
}
</style>

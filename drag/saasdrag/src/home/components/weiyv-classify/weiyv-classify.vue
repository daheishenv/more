
<template>
    <view class="home-weiyv-classify" :class="[ blockClass_ ]" v-if="!noData_">
        <view class="home-weiyv-classify-bd" :class="[ radiusClass_ ]">
            <sub-home-module-weiyv-title :title="config.title" more="category" />
            <view class="classify-wrap c-row">
                <view :class="'c-col-' + itemClass[index]" v-for="(item, index) in cData" :key="index" @click="$serverJump(item)">
                    <view class="classify">
                        <c-image :src="item.img" mode="" radius="8" width="100%" height="240"></c-image>
                        <text class="classify-text c-ellipsis">{{ item.title}}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import homeComponentMixins from "@/home/components/component/home-component-mixins";
export default {
    name: "home-weiyv-classify",
    mixins: [homeComponentMixins],
    data() {
        return {
            itemClass: [4, 8, 6, 6, 8, 4],
            cData: [
                {
                    "app_page": "seckill",
                    "desc": "",
                    "img": "https://betastatic-saas.zzsupei.com/saas/upload/20210428/b5366dcb2ffd9a6027fa0ea5c1ce0871.png",
                    "title": "马桶系列",
                    "subTitle": "",
                    "color": "",
                    "id": ""
                },
                {
                    "app_page": "newGift",
                    "desc": "",
                    "img": "https://betastatic-saas.zzsupei.com/saas/upload/20210510/560dae5af3d016a85d8e9db5932efc3c.png",
                    "title": "龙头系列",
                    "subTitle": "",
                    "color": "",
                    "id": ""
                },
                {
                    "app_page": "logisticsServicesInquiry",
                    "desc": "",
                    "img": "https://betastatic-saas.zzsupei.com/saas/upload/20210428/9066c01fbed00cdef0699c8efa29016f.png",
                    "title": "卫浴系列",
                    "subTitle": "",
                    "color": "",
                    "id": ""
                },
                {
                    "app_page": "couponsList",
                    "desc": "",
                    "img": "https://betastatic-saas.zzsupei.com/saas/upload/20210428/4d5b5059eeb36bb3729e3a8c5071de8e.png",
                    "title": "陶瓷系列",
                    "subTitle": "",
                    "color": "",
                    "id": ""
                },
                {
                    "app_page": "memberVip",
                    "desc": "",
                    "img": "https://betastatic-saas.zzsupei.com/saas/upload/20210428/08b4668d9bdbe24e7cdb0585a99889f2.png",
                    "title": "花洒系列",
                    "subTitle": "",
                    "color": "",
                    "id": ""
                },
                {
                    "app_page": "couponsList",
                    "desc": "",
                    "img": "https://betastatic-saas.zzsupei.com/saas/upload/20210428/fcc4b739a84a8558acaaac8c53981e3f.png",
                    "title": "配件",
                    "subTitle": "",
                    "color": "",
                    "id": ""
                }
            ]
        };
    },
    created() {
        this.config.title = "热门分类";
    }
}
</script>

<style lang="scss" scoped>
.home-weiyv-classify {
    &-bd {
        margin: -1 * $spacing-col-lg -1 * $spacing-row-lg;
    }

    &[class*="area-mt-"] {
        .home-weiyv-classify-bd {
            margin: 0;
        }
    }
    .classify-wrap {
        margin-top: 8rpx;
        padding-bottom: 20rpx;
        .classify {
            position: relative;
            &-text {
                @include abs(null, 24rpx, 14rpx, 24rpx);
                font-size: 28rpx;
                font-weight: bold;
                color: #ffffff;
                line-height: 40rpx;
            }
        }
    }
}
</style>
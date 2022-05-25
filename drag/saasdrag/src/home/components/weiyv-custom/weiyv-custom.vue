
<template>
    <view class="home-weiyv-custom" :class="[ blockClass_ ]" v-if="!noData_">
        <view class="home-weiyv-custom-bd" :class="[ radiusClass_ ]">
            <sub-home-module-weiyv-title :title="config.title" more="starCustom" />
            <sub-home-star-custom :list="cData && cData.list" />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from "@/home/components/component/home-component-mixins";

export default {
    name: "home-weiyv-custom",
    mixins: [homeComponentMixins],
    data() {
        return {
            cData: {
                list: [
                    {
                        "id": 2,
                        "made_name": "MARION卫浴套间",
                        "sub_title": "卫浴定制空间",
                        "img": "https://betastatic-saas.zzsupei.com/saas/upload/20210428/a559f66b1df528a2e58ef71df1e72f28.png",
                        "goods_list": [
                            {
                                "id": 5430,
                                "goods_name": "陶的卫浴 多层实木浴室柜 TD-85130-80",
                                "goods_img": "https://shop.oss.meijiabang.com/data/gallery_album/1/images/1_P_1617759589957.jpg",
                                "price_show": "1899.00",
                                "price_market": "3599.00"
                            },
                            {
                                "id": 5420,
                                "goods_name": "云米 （VIOMI）1.5匹变频冷暖iCool1C新三级制热取暖器暖风机壁挂式空调挂机 KFRd-35GW/Y4PC7-A3",
                                "goods_img": "https://shop.oss.meijiabang.com/data/gallery_album/1/images/1_P_1617299846848.jpg",
                                "price_show": "2199.00",
                                "price_market": "4699.00"
                            },
                            {
                                "id": 5419,
                                "goods_name": "双虎北欧风钢化玻璃台面实木脚大象灰+月光蓝哑光烤漆餐桌椅",
                                "goods_img": "https://shop.oss.meijiabang.com/images/202104/goods_img/0_G_1617305139298.jpg",
                                "price_show": "949.00",
                                "price_market": "1782.00"
                            },
                            {
                                "id": 6140,
                                "goods_name": "测试123",
                                "goods_img": "https://betastatic-saas.zzsupei.com/saas/upload/20210413/b2e4253c01883d2bb6bd0ad4e6755d68.jpg",
                                "price_show": "1000.00",
                                "price_market": "1000.00"
                            }
                        ]
                    },
                ]
            }
        }
    },
    created() {
        this.config.title = "明星定制";
    }
};
</script>

<style lang="scss" scoped>
.home-weiyv-custom {
    &-bd {
        margin: -1 * $spacing-col-lg -1 * $spacing-row-lg;
    }

    &[class*="area-mt-"] {
        .home-weiyv-custom-bd {
            margin: 0;
        }
    }
}
</style>
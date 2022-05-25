<template>
    <view class="home-weiyv-like" :class="[ blockClass_ ]" v-if="!noData_">
        <view class="home-weiyv-like-bd" :class="[ radiusClass_ ]">
            <sub-home-module-weiyv-title :title="config.title" more="searchList" />
            <view class="like">
                <gc-list :bgColor="config.isFull ? '#fff' : '#f5f5f5'" type="weiyvLike" mode="row" :list="cData.list" imgSize="240" radius="8" />
            </view>
        </view>
    </view>
</template>

<script>
import homeComponentMixins from "@/home/components/component/home-component-mixins";

export default {
    name: "home-weiyv-like",
    mixins: [ homeComponentMixins ],
    data() {
        return {
            cData: {
                list: [
                    {
                        "id": 4745,
                        "goods_name": "飞科剃须刀FS379电动充电式刮胡子刀胡须刀男生款全身水洗鬓刀",
                        "goods_img": "https://shop.oss.meijiabang.com/images/202004/goods_img/0_G_1588211372482.jpg",
                        "market_price": "299.00",
                        "shop_price": "299.00",
                        "sales_volume": 228,
                        "virtual_sales_volume": 123,
                        "goods_unit": "个",
                        "goods_sku_id": 60602,
                        "price_prefix": "¥",
                        "price": "299.00",
                        "price_market": "299.00",
                        "price_unit": "",
                        "price_shipping": 0,
                        "price_show_unit": "",
                        "price_sale": "299.00",
                        "price_show": "299.00",
                        "price_final": "299.000000"
                    },
                    {
                        "id": 5169,
                        "goods_name": "消息推送test1",
                        "goods_img": "https://betastatic-saas.zzsupei.com/saas/upload/20210412/7eae363185f358ca4fa9fa3eaa3bbb1e.jpeg",
                        "market_price": "51.00",
                        "shop_price": "50.00",
                        "sales_volume": 45,
                        "virtual_sales_volume": 0,
                        "goods_unit": "",
                        "goods_sku_id": 61208,
                        "price_prefix": "¥",
                        "price": "50.00",
                        "price_market": "51.00",
                        "price_unit": "",
                        "price_shipping": 0,
                        "price_show_unit": "",
                        "price_sale": "50.00",
                        "price_show": "50.00",
                        "price_final": "50.000000"
                    },
                    {
                        "id": 5371,
                        "goods_name": "测试",
                        "goods_img": "https://betastatic-saas.zzsupei.com/saas/upload/20210318/e8ee8ae0910220c5405e9d3932f19a50.jpg",
                        "market_price": "55.88",
                        "shop_price": "50.80",
                        "sales_volume": 4,
                        "virtual_sales_volume": 0,
                        "goods_unit": "",
                        "goods_sku_id": 61496,
                        "price_prefix": "¥",
                        "price": "50.80",
                        "price_market": "55.88",
                        "price_unit": "",
                        "price_shipping": 0,
                        "price_show_unit": "",
                        "price_sale": "50.80",
                        "price_show": "50.80",
                        "price_final": "50.800000"
                    },

                ]
            }
        }
    },
    created() {
        this.config.title = "猜你喜欢";
    }
};
</script>

<style lang="scss" scoped>
	.home-weiyv-like {
		&-bd{
			margin: -1 * $spacing-col-lg -1 * $spacing-row-lg;
		}
		
		&[class*='area-mt-']{
			.home-weiyv-like-bd {
				margin: 0;
			}
		}
	}
</style>
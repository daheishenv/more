<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-27 11:36:03
-->
<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-goods"
            :style="[outerLayer_]"
        >
            <sub-home-goods-list
                :list="cData.list"
                :extra="extra_"
                jump-name="goodsDetails"
                @addShopCar="addShopCar"
            />
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[outerLayer_]"
        >
            <c-image
                :src="`skeleton-screen/${config.module}_${mode_}.png`"
                width="100%"
                mode="widthFix"
            />
        </view>
        <!-- 选择规格 -->
        <gc-select-spec
            v-model="specFlag"
            :config="specData"
        />
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页特色组件
export default {
    name: 'HomeGoods',
    mixins: [homeComponentMixins],
    data() {
        return {
            cData: {
                list: []
            },
            specFlag: false,
            specData: {}
        }
    },
    methods: {
        addShopCar(e) {
            console.log(e);
            this.specFlag = true;
            this.specData = e.detail;
            console.log(this.specData);
            // this.$emit("handleAddCar", {
            // 	detail: {
            // 		value: item
            // 	}
            // })
        }
    }
}
</script>

<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-29 20:26:34
-->
<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-group-buying"
            :style="[ outerLayer_ ]"
        >
            <template v-if="config.module === 'hot_goods'">
                <view :style="[titleLayer_]">
                    <sub-home-module-title
                        :title="config.title"
                        :full="config.isFull"
                        :title-layer="titleLayer_"
                        :more="isMore_ ? (config.module === 'sales_group' ? 'group' : 'hotSelling') :''"
                    />
                </view>
                <view :style="[innerLayer_]">
                    <sub-home-scroll-goods
                        :config="cData.list"
                        :jump-name="config.module === 'sales_group' ? 'groupDetails' : 'goodsDetails'"
                        :mode="config.module === 'sales_group' ? 'group': 'normal'"
                    />
                </view>

            </template>
            <template v-if="config.module === 'sales_group'">
                <view :style="[innerLayer_]">
                    <sub-home-goods-list
                        :list="cData.list"
                        :extra="extra_"
                        type="group"
                        jump-name="groupDetails"
                    />
                </view>

            </template>
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
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页拼团组件
export default {
    name: 'HomeGroupBuying',
    mixins: [homeComponentMixins],
    data() {
        return {
            cData: {
                list: []
            }
        }
    }
}
</script>

<style scoped lang="scss">
.home-group-buying {
    // background-color: #fff;
    overflow: hidden;
}
</style>

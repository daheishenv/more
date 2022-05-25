<template>
    <view
        class="home-hot-sale"
        :style="[outerLayer_]"
    >
        <!-- <sub-home-card
            :title="config.title"
            :more="isMore_ ? 'hotSelling' : ''"
        >
            <sub-home-scroll-goods
                v-if="!noData_ && cFinish"
                :config="cData.list"
            />
            <c-no-data
                v-if="noData_ && cFinish"
                :show-img="noData_"
                :text="noDataText_"
            />
        </sub-home-card> -->
        <view :style="[titleLayer_]">
            <sub-home-module-title
                :title="config.title"
                :full="config.isFull"
                :title-layer="titleLayer_"
                :more="isMore_ ? 'hotSelling' : ''"
            />
        </view>
        <view :style="[innerLayer_]">
            <sub-home-scroll-goods
                v-if="!noData_ && cFinish"
                :config="cData.list"
            />
        </view>
    </view>
</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HomeHotSale',
    mixins: [homeComponentMixins]
}
</script>

<style lang="scss" scoped>
.home-hot-sale {
    overflow: hidden;
}
</style>

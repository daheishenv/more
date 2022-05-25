<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-26 14:37:24
-->
<template>
    <view class="homr-search-wrap">
        <view
            :style="[ outerLayer_ ]"
            class="homr-search-wrap-bd"
            @click="$serverJump(jump_)"
        >
            <sub-home-search
                :nowrap="false"
                :mode="extra_.mode"
                :inputHeight="innerLayer_.height"
                :inputBgColor="innerLayer_.backgroundColor"
                :inputRaduis="innerRadius_"
                :inputColor="innerLayer_.color"
                :placeholder="config.title"
            />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    mixins: [homeComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    computed: {
        jump_() {
            return this.extra_.jump ? (this.extra_.jump[0] || {}) : {}
        }
    }
}
</script>

<style lang="scss" scoped>
.homr-search-wrap {
    &-bd {
        padding: 0 24rpx;
    }
    /deep/ .home-search {
        padding: 0 !important;
    }
}
</style>
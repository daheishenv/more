<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-06 14:54:54
-->
<template>
    <!-- flex-ajcenter -->
    <view
        class="separation flex-ajcenter"
        :style="[ outerLayer_ ]"
    >
        <view
            v-if="mode_ === 'split'"
            class="separation-item"
            :style="[{ borderStyle: extra_.genre, borderColor: extra_.innerLayer.bgColor } ]"
        ></view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    mixins: [homeComponentMixins]
}
</script>

<style lang="scss" scoped>
.separation {
    position: relative;

    &-item {
        border-width: 0 0 1px;
        width: 100%;
        left: 0;
        height: 0;
    }
}
</style>

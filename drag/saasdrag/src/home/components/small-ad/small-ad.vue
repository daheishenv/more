<template>
    <view
        class="home-small-ad"
        :style="[iStyle_]"
    >   
        <c-image
            :height="height_"
            width="100%"
            :radius="iStyle_.borderRadius"
            :src="smallAd_.img_url"
            :mode="smallAd_.img_url ? 'scaleToFill' : 'aspectFill'"
            @click="$serverJump(smallAd_)"
        />
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页公司简介组件
export default {
    name: 'HomeSmallAd',
    mixins: [homeComponentMixins],
    props: {
        config: {
            type: Object,
            default: () => {
                return {

                }
            }
        }
    },
    computed: {
        smallAd_() {
            return (this.cData || [])[0]
        },
        height_() {
            if (this.config.iStyle) {
                return this.config.iStyle.height ? this.config.iStyle.height : '140rpx'
            }
            return '140rpx'
        },
        iStyle_() {
            return this.config.iStyle ? this.config.iStyle : {}
        }
    }
}
</script>

<template>
    <view class="user-ad mt24">
        <view
            class="user-ad__img"
            :style="[ outerLayer_ ]"
        >
            <c-image
                width="100%"
                height="94px"
                :src="icon_"
                @click="$serverJump(jump_)"
            />
        </view>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'
import allConfig from '@/config'
// 首页公司简介组件
export default {
    name: 'UserAd',
    mixins: [userComponentMixins],
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
        jump_() {
            return this.extra_.jump[0]
        },
        icon_() {
            return this.outerLayer_.backgroundImage
        }

    }
}
</script>
<style lang="scss" scoped>
.user-ad {
    &__img {
        overflow: hidden;
    }
}
</style>

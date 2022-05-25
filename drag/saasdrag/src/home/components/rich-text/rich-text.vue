<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-04 16:35:37
-->
<template>
    <view
        class="home-rick-home"
        :style="[ outerLayer_ ]"
    >
        <view
            class="ptb24"
            :style="[ innerLayer_ ]"
            :class="{'c-999': html_ === '请输入文本内容' }"
            @click="$serverJump(jump_)"
        >
            <c-jyf-parser :html="html_" />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HomeRickText',
    mixins: [homeComponentMixins],
    data() {
        return {}
    },
    computed: {
        html_() {
            let content = ''
            if (this.cData && this.cData[0]) {
                content = this.cData[0].desc
            }
            return content
        },
        jump_() {
            return this.extra_.jump ? (this.extra_.jump[0] || {}) : {}
        }
    }
}
</script>


<template>
    <view
        class="home-count-down"
        :style="[ outerLayer_ ]"
    >
        <view
            class="ptb24 flex align-center"
            :style="[innerLayer_]"
        >
            <template v-if="activeType !== 1">
                <view
                    :style="{color: innerLayer_.subColor}"
                    class="pr12"
                >{{ activeText }}</view>
                <gc-count-down
                    :timestamp="timestamp"
                    :show-days="false"
                    font-size="32"
                    :color="mode_ !== 'style2' ? '#ffffff' : innerLayer_.color"
                    :bg-color="mode_ !== 'style2' ? innerLayer_.color : 'transparent' "
                    :separator="mode_ === 'style2' ? 'zh' : 'colon'"
                    :separator-color="outerLayer_.subColor"
                    @zero="handleAgain"
                />
            </template>
            <view v-else>
                <view :style="{color: innerLayer_.subColor}">{{ activeText }}</view>
            </view>
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HomeCountDown',
    mixins: [homeComponentMixins],
    data() {
        return {
            timestamp: 0,
            activeType: 0, // 0位默认或进行中, 1 结束, 2 未开始
            activeText: '',
            startTime: '',
            endTime: ''
        }
    },
    watch: {
        cData: {
            handler(val) {
                let timestamp = 0
                if (val && val.length) {
                    const data = val[0].data
                    const startTime = data.start_time
                    const endTime = data.end_time
                    this.startTime = startTime
                    this.endTime = endTime
                    // 系统时间
                    const systemTime = this.$store.state.timeDiff !== undefined ? (Date.now() + this.$store.state.timeDiff) : data.system_time
                    // 进行中
                    if (systemTime > startTime && systemTime < endTime) {
                        this.activeType = 0
                        this.activeText = this.titleLayer_['doText']
                        timestamp = parseInt((endTime - systemTime) / 1000)
                    } else if (systemTime > endTime) { // 已结束
                        this.activeType = 1
                        this.activeText = this.titleLayer_['endText']
                    } else if (startTime > systemTime) { // 未开始
                        this.activeType = 2
                        this.activeText = this.titleLayer_['startText']
                        timestamp = parseInt((startTime - systemTime) / 1000)
                    }
                } else {
                    this.activeText = this.titleLayer_['doText']
                }
                this.timestamp = timestamp
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        handleAgain() {
            if (this.activeType === 2) {
                this.activeType = 0
                this.activeText = this.titleLayer_['doText']
                this.timestamp = parseInt((this.endTime - this.startTime) / 1000)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home-count-down {
    font-size: 28rpx;
}
.align-center {
    align-items: center;
}
</style>

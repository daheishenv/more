<template>
    <div class="time">
        <div
            v-if="showDays && (d != '00' || !hideZeroDay)"
            class="time-item"
        >{{ d }}天</div>
        <div
            v-if="h != '00' || !hideZeroHour"
            class="time-item"
        >{{ h }}时</div>
        <div class="time-item">{{ i }}分</div>
        <div class="time-item">{{ s }}秒</div>
    </div>
</template>

<script>
import TimeUtil from '@/utils/countDown'
export default {
    props: {
        // 倒计时的时间，秒为单位
        timestamp: {
            type: [Number, String],
            default: 0
        },
        timeObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 是否显示“天”
        showDays: {
            type: Boolean,
            default: true
        },
        // 当"天"的部分为0时，不显示
        hideZeroDay: {
            type: Boolean,
            default: true
        },
        // 当"时"的部分为0时，不显示
        hideZeroHour: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            d: '00', // 天的默认值
            h: '00', // 小时的默认值
            i: '00', // 分钟的默认值
            s: '00', // 秒的默认值
            firstZero: true, //
            time: null,
            overTimestamp: -1
        }
    },
    computed: {
        showD_() {
            return this.overTimestamp >= 60 * 60 * 24
        }
    },
    watch: {
        timeObj: {
            handler(val) {
                if (Object.keys(val).length) {
                    this.handleInit(val)
                }
            }
        },
        timestamp: {
            handler(val) {
                if (!val) return
                this.time && this.time.end()
                this.time = new TimeUtil()
                this.time.addTask(val)
                this.time.start((res) => {
                    if (res[0].timestamp <= 0 && this.firstZero) {
                        this.firstZero = false

                        this.$emit('zero', true)
                        this.time.end()
                    }
                    this.handleInit(res[0].time)
                })
            },
            immediate: true
        }
    },
    beforeDestroy() {
        this.time && this.time.end()
    },
    methods: {
        handleInit(res) {
            this.d = res.day
            this.h = this.showDays ? res.hour : res.showHour
            this.i = res.minute
            this.s = res.second
        }
    }
}
</script>

<style lang="scss" scoped>
.time {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>

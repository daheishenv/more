<template>
    <view class="turntable">
        <!-- 大转盘 -->
        <view
            v-if="type === 1"
            class="turntable__draw"
        >
            <sub-activity-lucky-wheel
                ref="luckyDraw"
                width="688rpx"
                height="688rpx"
                :prizes="prizes_"
                :default-style="draw.defaultStyle"
                :blocks="draw.blocks"
                :buttons="draw.buttons"
                @start="startCallBack"
                @end="endCallBack"
            />
            <view class="turntable__draw-shadow">
                <c-image
                    src="activity/lucky-draw/disk-shadow.png"
                    width="556rpx"
                    height="118rpx"
                />
            </view>
        </view>
        <!-- 九宫格 -->
        <view
            v-else-if="type === 2"
            class="turntable__draw"
        >
            <c-image
                src="activity/lucky-draw/square-bg.png"
                height="653"
                width="643"
            />
            <sub-activity-lucky-grid
                ref="luckyDraw"
                width="510rpx"
                height="500rpx"
                class="turntable__draw-square"
                :prizes="prizes_"
                :buttons="draw.buttons"
                :blocks="draw.blocks"
                :default-config="draw.defaultConfig"
                :default-style="draw.defaultStyle"
                :active-style="draw.activeStyle"
                @start="startCallBack"
                @end="endCallBack"
            />
        </view>
    </view>
</template>

<script>
// 为圆盘不同尺寸格式的转盘设置样式
const prizeParamMap = new Map(
    [
        [4, { maxLength: 32, fontsTop: '22rpx', fontSize: '24rpx', lineHeight: '30rpx', lengthLimit: '58%', imgsTop: '94rpx', imgsWidth: '90rpx', imgsHeight: '90rpx' }],
        [5, { maxLength: 30, fontsTop: '24rpx', fontSize: '24rpx', lineHeight: '30rpx', lengthLimit: '74%', imgsTop: '94rpx', imgsWidth: '90rpx', imgsHeight: '90rpx' }],
        [6, { maxLength: 30, fontsTop: '20rpx', fontSize: '22rpx', lineHeight: '30rpx', lengthLimit: '88%', imgsTop: '90rpx', imgsWidth: '90rpx', imgsHeight: '90rpx' }],
        [7, { maxLength: 28, fontsTop: '16rpx', fontSize: '22rpx', lineHeight: '30rpx', lengthLimit: '88%', imgsTop: '90rpx', imgsWidth: '86rpx', imgsHeight: '86rpx' }],
        [8, { maxLength: 22, fontsTop: '14rpx', fontSize: '22rpx', lineHeight: '30rpx', lengthLimit: '88%', imgsTop: '90rpx', imgsWidth: '76rpx', imgsHeight: '76rpx' }],
        [9, { maxLength: 18, fontsTop: '12rpx', fontSize: '22rpx', lineHeight: '30rpx', lengthLimit: '88%', imgsTop: '86rpx', imgsWidth: '76rpx', imgsHeight: '76rpx' }]
    ]
)
// 为方盘不同尺寸格式的转盘设置样式
const prizeSquareParamMap = new Map(
    [
        [8, { maxLength: 8 }]
    ])
export default {
    props: {
        type: {
            type: Number,
            default: -1
        },
        draw: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {

        }
    },
    computed: {
        prizes_() {
            if (this.type === 1) {
                if (this.draw.prizes && this.draw.prizes.length > 0 && prizeParamMap.has(this.draw.prizes.length)) {
                    const defaultObj = prizeParamMap.get(this.draw.prizes.length)
                    const prizes = this.draw.prizes.map(item => {
                        const fonts = item.fonts.map(o => {
                            return {
                                ...o,
                                text: this.getByteStr(o.text, defaultObj.maxLength),
                                top: defaultObj.fontsTop,
                                lengthLimit: defaultObj.lengthLimit,
                                fontSize: defaultObj.fontSize,
                                lineHeight: defaultObj.lineHeight

                            }
                        })
                        const imgs = item.imgs.map(o => {
                            return {
                                ...o,
                                width: defaultObj.imgsWidth,
                                top: defaultObj.imgsTop,
                                height: defaultObj.imgsHeight
                            }
                        })
                        return {
                            ...item,
                            title: item.title,
                            fonts,
                            imgs
                        }
                    })
                    return prizes
                }
                return this.draw.prizes
            } else {
                if (this.draw.prizes.length > 0 && prizeSquareParamMap.has(this.draw.prizes.length)) {
                    const defaultObj = prizeSquareParamMap.get(this.draw.prizes.length)
                    const prizes = this.draw.prizes.map(item => {
                        const fonts = item.fonts.map(o => {
                            return {
                                ...o,
                                text: this.getByteStr(o.text, defaultObj.maxLength)
                            }
                        })
                        return {
                            ...item,
                            title: item.title,
                            fonts
                        }
                    })
                    return prizes
                }
                return this.draw.prizes
            }
        }
    },
    methods: {
        startCallBack() {
            this.$emit('startCallBack') // 点击抽奖
        },
        endCallBack(prize) {
            this.$emit('endCallBack', prize) // 抽奖完成
        },
        play() { // 运行转盘
            this.$refs.luckyDraw.play()
        },
        stop(index) { // 停止转盘
            this.$refs.luckyDraw.stop(index)
        },
        getByteStr(val = '', length = 0) {
            let len = 0
            let str = ''
            for (let i = 0; i < val.length; i++) {
                if (len <= length) {
                    const a = val.charAt(i)
                    if (a.match(/[^\x00-\xff]/ig) != null) {
                        len += 2
                    } else {
                        len += 1
                    }
                    str += a
                } else {
                    str += '...'
                    break
                }
            }
            return str
        }
    }
}
</script>

<style lang="scss" scoped>
.turntable {
    &__draw {
        position: relative;
        width: 687rpx;
        height: 720rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        &-shadow {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 16%);
            z-index: -1;
        }
        &-square {
            position: absolute;
            transform: translateY(-6rpx);
        }
    }
}
</style>

<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-10 09:34:32
-->
<template>
    <view class="base-magic-square">
        <view
            class="base-magic-square__title"
            v-if="title"
        >{{title}}</view>
        <view
            class="base-magic-square__summary"
            v-if="summary"
        >{{summary}}</view>
        <view
            v-if="finish"
            class="magic-square"
        >
            <view
                class="magic-square__imgs"
                @click="handleChangeSelect"
            >
                <template v-for="(item, index) in imgList_">
                    <view
                        class="magic-square__imgs"
                        v-if="Array.isArray(item)"
                        :style="{
                        width: imgList_[index - 1].width,
                        height: imgList_[index - 1].height
                    }"
                    >
                        <view
                            v-for="(it, idx) in item"
                            :key="idx"
                            class="magic-square__img"
                            :class="{'magic-square__img--active': selectIndex === index + idx}"
                            :data-index="index + idx"
                            :style="{
                            width: it.width,
                            height: it.height,
                            marginTop: it.marginTop + 'rpx', 
                            marginLeft: it.marginLeft + 'rpx'
                    }"
                        >
                            {{Math.ceil(it.widthTip)}}*{{Math.ceil(it.heightTip)}}或同等比例
                        </view>
                    </view>
                    <view
                        v-else
                        class="magic-square__img"
                        :data-index="index"
                        :class="{'magic-square__img--active': selectIndex === index}"
                        :key="index"
                        :style="{
                        width: item.width,
                        height: item.height,
                        marginTop: item.marginTop + 'rpx', 
                        marginLeft: item.marginLeft + 'rpx'
                    }"
                    >
                        {{Math.ceil(item.widthTip)}}*{{Math.ceil(item.heightTip)}}或同等比例
                    </view>
                </template>
            </view>
        </view>
        <!-- 上传图片组件 -->
        <base-upload
            v-model="curImgInfo"
            @change="changeImgInfo"
            v-if="showUpload"
        ></base-upload>
    </view>
</template>

<script>
import { formatItemData } from '@/utils/drag'
const imgLens = {
    style1: 2,
    style2: 3,
    style3: 4,
    style4: 4,
    style5: 3,
    style6: 3,
    style7: 4,
    style8: 1
}
const emptyImg = { img_url: '' }
export default {
    name: 'HomeMagicSquare',
    data() {
        return {
            cData: [],
            finish: false,
            width: 0,
            selectIndex: 0,
            dataList: [],
            componentInfo: {},
            curImgInfo: [],
            defaultValue: []
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        summary: {
            type: String,
            default: ''
        },
        value: {
            type: Array,
            default: () => []
        },
        showUpload: {
            type: [String, Boolean],
            default: true
        },
        blockHeight: {
            type: [String, Number],
            default: 375
        }
    },
    computed: {
        extra_() {
            return this.componentInfo.extra || {}
        },
        outerLayer_() {
            return this.extra_.outerLayer || {}
        },
        mode_() {
            return this.extra_.mode
        },
        innerLayer_() {
            return this.extra_.innerLayer || {}
        },
        // 左右边距
        pageMargin_() {
            const pageMargin = String(this.outerLayer_.margin).split(' ')[1]
            const margin = parseInt(pageMargin)
            return (isNaN(margin) ? 0 : margin) * 2
        },
        // 图片间距
        imgMargin_() {
            const imgMargin = String(this.innerLayer_.margin).split(' ')[1]
            const margin = parseInt(imgMargin)
            return isNaN(margin) ? 0 : margin
        },
        // 图片高度
        imgHeight_() {
            return parseInt(this.outerLayer_.height || this.innerLayer_.height)
        },
        /**
         * style1 1行2个（同大小）  ---  （大）
         * style2 1行3个（同大小）  ---  （大）
         * style3 1行4个（同大小）  ---  （大）
         * style4 分2行     1行2个（同大小）  ---  （大）
         * style5 1左（大） 2右（小）
         * style6 1上（大） 2下（小）
         * style7 1左（大） 1右上（中） 2右下（小）
         * style8 1（大）
         * 
        */
        imgInfo_() {
            let smallWidth = 0
            let middleWidth = 0
            let largeWidth = 0
            let smallHeight = 0
            let middleHeight = 0
            let largeHeight = 0
            let smallWidthTip = 0
            let middleWidthTip = 0
            let largeWidthTip = 0
            let smallHeightTip = 0
            let middleHeightTip = 0
            let largeHeightTip = 0
            //等宽
            const largeWidthArr = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6', 'style7', 'style8']
            const middleWidthArr = ['style7']
            const smallWidthArr = ['style5', 'style6', 'style7']
            const largeWidthIndex = largeWidthArr.findIndex(o => o === this.mode_)
            const middleWidthIndex = middleWidthArr.findIndex(o => o === this.mode_)
            const smallWidthIndex = smallWidthArr.findIndex(o => o === this.mode_)
            // 这边只求最大宽度高度
            if (largeWidthIndex !== -1) {
                const splitWidthArr = [2, 3, 4, 2, 2, 1, 2, 1]
                const splitHeightArr = [1, 1, 1, 2, 1, 2, 1, 1]
                const splitWidthNum = splitWidthArr[largeWidthIndex]
                const splitHeightNum = splitHeightArr[largeWidthIndex]
                largeWidthTip = (750 - this.pageMargin_ - this.imgMargin_ * (splitWidthNum - 1)) / splitWidthNum
                // 只能用百分比，不然会有间隙
                // if (this.imgMargin_ === 0) {
                largeWidth = (100 / splitWidthNum).toFixed(8) * 1 + '%'
                // } else {
                //     largeWidth = largeWidthTip + 'rpx'
                // }
                largeHeightTip = (this.imgHeight_ - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum
                largeHeight = (this.blockHeight - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum + 'rpx'
            }
            // 只求中等高度
            if (middleWidthIndex !== -1) {
                const splitWidthArr = [2]
                const splitHeightArr = [2]
                const splitWidthNum = splitWidthArr[middleWidthIndex]
                const splitHeightNum = splitHeightArr[middleWidthIndex]
                middleWidthTip = (750 - this.pageMargin_ - this.imgMargin_ * (splitWidthNum - 1)) / splitWidthNum
                middleHeightTip = (this.imgHeight_ - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum
                middleHeight = (this.blockHeight - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum + 'rpx'
                // 只能用百分比，不然会有间隙
                // if (this.imgMargin_ === 0) {
                if (this.mode_ === 'style7') {
                    middleWidth = '100%'
                    middleHeight = '50%'
                } else {
                    middleWidth = (100 / splitWidthNum).toFixed(8) * 1 + '%'
                }
                // } else {
                //     middleWidth = middleWidthTip + 'rpx'
                // }
            }
            // 只求小宽高
            if (smallWidthIndex !== -1) {
                const splitWidthArr = [2, 2, 4]
                const splitHeightArr = [2, 2, 2]
                const splitWidthNum = splitWidthArr[smallWidthIndex]
                const splitHeightNum = splitHeightArr[smallWidthIndex]

                smallWidthTip = (750 - this.pageMargin_ - this.imgMargin_ * (splitWidthNum - 1)) / splitWidthNum
                smallHeightTip = (this.imgHeight_ - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum
                smallHeight = (this.blockHeight - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum + 'rpx'
                // 只能用百分比，不然会有间隙
                // if (this.imgMargin_ === 0) {
                if (this.mode_ === 'style7') {
                    smallWidth = '50%'
                } else if (this.mode_ === 'style5') {
                    smallWidth = '100%'
                    smallHeight = '50%'
                } else {
                    smallWidth = (100 / splitWidthNum).toFixed(8) * 1 + '%'
                }
                // } else {
                //     smallWidth = smallWidthTip + 'rpx'
                // }
            }

            return {
                smallWidth,
                middleWidth,
                largeWidth,
                smallHeight,
                middleHeight,
                largeHeight,
                smallWidthTip,
                middleWidthTip,
                largeWidthTip,
                smallHeightTip,
                middleHeightTip,
                largeHeightTip
            }
        },
        imgList_() {
            let imgList = []
            switch (this.mode_) {
                case 'style1':
                    imgList.length = 2
                    imgList.fill({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    break;
                case 'style2':
                    imgList.length = 3
                    imgList.fill({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    break;
                case 'style3':
                    imgList.length = 4
                    imgList.fill({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    break;
                case 'style4':
                    imgList.length = 2
                    imgList.fill({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    imgList.push({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    imgList.push({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    break;
                case 'style5':
                    imgList = [{
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }, [{
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        widthTip: this.imgInfo_.smallWidthTip,
                        heightTip: this.imgInfo_.smallHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        widthTip: this.imgInfo_.smallWidthTip,
                        heightTip: this.imgInfo_.smallHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }]]
                    break;
                case 'style6':
                    imgList = [{
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        widthTip: this.imgInfo_.smallWidthTip,
                        heightTip: this.imgInfo_.smallHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        widthTip: this.imgInfo_.smallWidthTip,
                        heightTip: this.imgInfo_.smallHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }]
                    break;
                case 'style7':
                    imgList = [{
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }, [{
                        width: this.imgInfo_.middleWidth,
                        height: this.imgInfo_.middleHeight,
                        widthTip: this.imgInfo_.middleWidthTip,
                        heightTip: this.imgInfo_.middleHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        widthTip: this.imgInfo_.smallWidthTip,
                        heightTip: this.imgInfo_.smallHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        widthTip: this.imgInfo_.smallWidthTip,
                        heightTip: this.imgInfo_.smallHeightTip,
                        marginTop: 0,
                        marginLeft: 0,
                    }]]
                    break;
                case 'style8':
                    imgList = [{
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        widthTip: this.imgInfo_.largeWidthTip,
                        heightTip: this.imgInfo_.largeHeightTip,
                        marginTop: 0,
                        marginLeft: 0
                    }]
                    break;
                default:
                    break;
            }
            return imgList
        }
    },
    watch: {
        '$store.state.currentCheckAttr.componentInfo': {
            handler(val) {
                this.componentInfo = formatItemData(val)
            },
            deep: true,
            immediate: true
        },
        value: {
            handler(val) {
                if (!this.$c.diffByObj(val, this.defaultValue)) {
                    this.mode_ && this.fillArrData(val)
                }
                this.defaultValue = this.$deepClone(val)
            },
            deep: true,
            immediate: true
        },
        dataList: {
            handler(val) {
                if (this.$c.diffByObj(val, this.defaultValue)) {
                    return
                }
                this.$emit('input', val)
                this.$emit('change', {
                    type: 'upload',
                    detail: val
                })
            },
            deep: true
        },
        mode_() {
            if (this.dataList.length) {
                this.fillArrData()
            }
        },
        selectIndex(val) {
            this.$emit('changeIndex', {
                type: 'change',
                detail: val
            })
        }
    },
    mounted() {
        this.finish = true
        this.width = this.$parent.$el.offsetWidth
        // 初始化选中第一个
        this.handleChangeSelect({
            target: {
                dataset: {
                    index: 0
                }
            }
        })
    },
    methods: {
        fillArrData(val = false) {
            // 数组的长度
            const len = imgLens[this.mode_]
            let dataList = this.$deepClone(val || this.dataList)
            // 如果选中值大于数组最大长度，则选中第一个
            if (this.selectIndex >= len) {
                this.selectIndex = 0
            }
            dataList.length = len
            for (let i = 0; i < len; i++) {
                !dataList[i] && (dataList[i] = emptyImg)
            }
            this.dataList = dataList
            this.curImgInfo = dataList.slice(this.selectIndex, this.selectIndex + 1)
        },
        changeImgInfo(e) {
            this.dataList.splice(this.selectIndex, 1, e.detail[0])
        },
        handleChangeSelect(e) {
            this.selectIndex = e.target.dataset.index
            this.curImgInfo = this.dataList.slice(this.selectIndex, this.selectIndex + 1)

        }
    }
}
</script>

<style lang="scss" scope>
.base-magic-square {
    text-align: left;
    &__title {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        line-height: 20px;
        margin-bottom: 8px;
    }
    &__summary {
        font-size: 12px;
        color: #999999;
        line-height: 17px;
        margin-bottom: 8px;
    }
    .magic-square {
        &__imgs {
            width: 100%;
            @include flex(row);
            justify-content: space-between;
            align-items: stretch;
            flex-wrap: wrap;
            .magic-square__imgs {
                width: 50%;
                justify-content: flex-end;
            }
        }
        &__img {
            @include flex(row);
            align-items: center;
            justify-content: center;
            padding: 15px;
            position: relative;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            &::after {
                content: '';
                @include abs(0, null, null, 0);
                transform: scale(0.5);
                transform-origin: 0 0;
                width: 200%;
                height: 200%;
                border: 1px solid #eee;
            }
            &--active {
                &::after {
                    border-color: $uni-color-primary;
                }
            }
        }
    }
}
</style>
<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-10 09:34:32
-->
<template>
    <view>
        <view
            v-if="noImg_"
            class="magic-square__no-img"
            :style="{height: imgHeight_ + 'rpx'}"
        >
            <c-image
                mode="heightFix"
                :height="noImgHeight_"
                :src="noImgUrl_"
            />
        </view>
        <view
            v-else
            class="magic-square"
            :style="[outerLayer_]"
        >
            <view class="magic-square__imgs">
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
                            :style="{
                                width: it.width,
                                height: it.height,
                                marginTop: it.marginTop + 'rpx', 
                                marginLeft: it.marginLeft + 'rpx',
                        }"
                            @click="$serverJump(cData[index])"
                        >
                            <c-image
                                v-if="imgUrl_(index + idx)"
                                :radius="innerLayer_.borderRadius"
                                width="100%"
                                height="100%"
                                type="upload"
                                :src="imgUrl_(index + idx)"
                                :mode="imgUrl_(index + idx) ? 'scaleToFill' : 'aspectFit'"
                            />
                            <view
                                v-else
                                class="magic-square__no-img"
                                style="width: 100%; height: 100%"
                            >
                                <c-image
                                    mode="heightFix"
                                    height="120"
                                    src="drag/no-data/magic-square.png"
                                />
                            </view>
                        </view>
                    </view>
                    <view
                        v-else
                        class="magic-square__img"
                        :key="index"
                        :style="{
                            width: item.width,
                            height: item.height,
                            marginTop: item.marginTop + 'rpx', 
                            marginLeft: item.marginLeft + 'rpx',
                        }"
                        @click="$serverJump(cData[index])"
                    >
                        <c-image
                            v-if="imgUrl_(index)"
                            width="100%"
                            height="100%"
                            :radius="innerLayer_.borderRadius"
                            type="upload"
                            :src="imgUrl_(index)"
                            :mode="imgUrl_(index) ? 'scaleToFill' : 'aspectFit'"
                        />
                        <view
                            v-else
                            class="magic-square__no-img"
                            style="width: 100%; height: 100%"
                        >
                            <c-image
                                mode="heightFix"
                                height="120"
                                src="drag/no-data/magic-square.png"
                            />
                        </view>
                    </view>
                </template>
            </view>
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
export default {
    name: 'HomeMagicSquare',
    mixins: [homeComponentMixins],
    computed: {
        /**
         * style1 1行2个（同大小）  ---  （大）
         * style2 1行3个（同大小）  ---  （大）
         * style3 1行4个（同大小）  ---  （大）
         * style4 分2行     1行2个（同大小）  ---  （大）
         * style5 1左（大） 2右（小）
         * style6 1上（大） 2下（小）
         * style7 1左（大） 1右上（中） 2右下（小）
         * style8 1大
        */
        imgUrl_() {
            return index => this.cData[index] ? this.cData[index].img_url : ''
        },
        noImg_() {
            // 一个有即有数据
            return !this.cData.some(o => o && o.img_url)
        },
        noImgUrl_() {
            return `drag/magic-square/${this.mode_}.png`
        },
        // 左右边距
        pageMargin_() {
            const pageMargin = String(this.outerLayer_.padding || this.outerLayer_.margin).split(' ')[1]
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
            return parseInt(this.outerLayer_.height)
        },
        // 暂无图片高度
        noImgHeight_() {
            const minHeight = 20
            const imageHeight = parseInt(0.27 * this.imgHeight_)
            return imageHeight > minHeight ? imageHeight : minHeight
        },
        imgInfo_() {
            let smallWidth = 0
            let middleWidth = 0
            let largeWidth = 0
            let smallHeight = 0
            let middleHeight = 0
            let largeHeight = 0
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
                // 只能用百分比，不然会有间隙
                if (this.imgMargin_ === 0) {
                    largeWidth = (100 / splitWidthNum).toFixed(8) * 1 + '%'
                } else {
                    largeWidth = (750 - this.pageMargin_ - this.imgMargin_ * (splitWidthNum - 1)) / splitWidthNum + 'rpx'
                }
                largeHeight = (this.imgHeight_ - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum + 'rpx'
            }
            // 只求中等高度
            if (middleWidthIndex !== -1) {
                const splitWidthArr = [2]
                const splitHeightArr = [2]
                const splitWidthNum = splitWidthArr[middleWidthIndex]
                const splitHeightNum = splitHeightArr[middleWidthIndex]
                middleHeight = (this.imgHeight_ - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum + 'rpx'
                // 只能用百分比，不然会有间隙
                if (this.imgMargin_ === 0) {
                    if (this.mode_ === 'style7') {
                        middleWidth = '100%'
                        middleHeight = '50%'
                    } else {
                        middleWidth = (100 / splitWidthNum).toFixed(8) * 1 + '%'
                    }
                } else {
                    middleWidth = (750 - this.pageMargin_ - this.imgMargin_ * (splitWidthNum - 1)) / splitWidthNum + 'rpx'
                }
            }
            // 只求小宽高
            if (smallWidthIndex !== -1) {
                const splitWidthArr = [2, 2, 4]
                const splitHeightArr = [2, 2, 2]
                const splitWidthNum = splitWidthArr[smallWidthIndex]
                const splitHeightNum = splitHeightArr[smallWidthIndex]
                smallHeight = (this.imgHeight_ - this.imgMargin_ * (splitHeightNum - 1)) / splitHeightNum + 'rpx'
                // 只能用百分比，不然会有间隙
                if (this.imgMargin_ === 0) {
                    if (this.mode_ === 'style7') {
                        smallWidth = '50%'
                    } else if (this.mode_ === 'style5') {
                        smallWidth = '100%'
                        smallHeight = '50%'
                    } else {
                        smallWidth = (100 / splitWidthNum).toFixed(8) * 1 + '%'
                    }
                } else {
                    smallWidth = (750 - this.pageMargin_ - this.imgMargin_ * (splitWidthNum - 1)) / splitWidthNum + 'rpx'
                }
            }

            return {
                smallWidth,
                middleWidth,
                largeWidth,
                smallHeight,
                middleHeight,
                largeHeight
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
                        marginTop: 0,
                        marginLeft: 0
                    })
                    break;
                case 'style2':
                    imgList.length = 3
                    imgList.fill({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    break;
                case 'style3':
                    imgList.length = 4
                    imgList.fill({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    break;
                case 'style4':
                    imgList.length = 2
                    imgList.fill({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: 0,
                        marginLeft: 0
                    })
                    imgList.push({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: this.imgMargin_,
                        marginLeft: 0
                    })
                    imgList.push({
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: this.imgMargin_,
                        marginLeft: 0
                    })
                    break;
                case 'style5':
                    imgList = [{
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: 0,
                        marginLeft: 0
                    }, [{
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        marginTop: 0,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        marginTop: this.imgMargin_,
                        marginLeft: 0
                    }]]
                    break;
                case 'style6':
                    imgList = [{
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: 0,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        marginTop: this.imgMargin_,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        marginTop: this.imgMargin_,
                        marginLeft: 0
                    }]
                    break;
                case 'style7':
                    imgList = [{
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: 0,
                        marginLeft: 0
                    }, [{
                        width: this.imgInfo_.middleWidth,
                        height: this.imgInfo_.middleHeight,
                        marginTop: 0,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        marginTop: this.imgMargin_,
                        marginLeft: 0
                    }, {
                        width: this.imgInfo_.smallWidth,
                        height: this.imgInfo_.smallHeight,
                        marginTop: this.imgMargin_,
                        marginLeft: this.imgMargin_,
                    }]]
                    break;
                case 'style8':
                    imgList = [{
                        width: this.imgInfo_.largeWidth,
                        height: this.imgInfo_.largeHeight,
                        marginTop: 0,
                        marginLeft: 0
                    }]
                    break;
                default:
                    break;
            }
            return imgList
        }
    }
}
</script>

<style lang="scss" scope>
.magic-square {
    &__no-img {
        background-color: #f3f8ff;
        @include flex;
        justify-content: center;
        align-items: center;
    }
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
    }
    // ifdef MP-WEIXIN
    c-image {
        width: 100%;
        height: 100%;
    }
    // endif
}
</style>
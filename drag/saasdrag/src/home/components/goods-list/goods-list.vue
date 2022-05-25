<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-27 11:36:03
-->
<template>
    <view class="home-goods">
        <view
            v-if="cFinish"
            class="home-goods__box"
            :class="['home-goods--' + direction_, mode_]"
        >
            <!-- 风格6 第一张为大图 -->
            <view
                v-if="isStyle6_"
                class="home-goods__list c-row pb0 style6-big"
            >
                <view
                    v-for="(item, index) in listFirst"
                    :key="index"
                    class="c-col-12"
                >
                    <view
                        class="home-goods__item"
                        :class="[goodsStyle_]"
                        :style="[innerLayer_]"
                        @click="jumpDetail(item)"
                    >
                        <view
                            class="home-goods__item-img"
                            :style="[{paddingTop: paddingPercent_}]"
                        >

                            <view
                                v-if="item.is_example"
                                class="home-goods__no-img"
                            >
                                <c-image
                                    class="home-goods__item-img-is_example"
                                    mode="heightFix"
                                    width="400"
                                    height="400"
                                    :src="item.goods_img"
                                />
                            </view>

                            <c-image
                                v-else
                                class="home-goods__item-img-box"
                                :src="item.goods_img"
                                :width="imgWidth_"
                                :height="imgHeight_"
                                :radius="0"
                            />
                            <view
                                v-if="groupNumShow_"
                                class="home-goods__group-already"
                            >
                                {{ item.sales }}人已拼团
                            </view>
                            <view
                                v-if="type === 'seckill'"
                                class="home-goods__seckill-text"
                            >
                                <c-icons
                                    class="pr8"
                                    type="icon-miaosha2"
                                    size="24"
                                />
                                <text>限时秒杀</text>
                            </view>
                        </view>
                        <view
                            v-if="showInfo_"
                            class="home-goods__item-bd flex-1"
                        >
                            <view class="line-height20">
                                <view
                                    v-if="titileShow_"
                                    :style="[itemLayer_]"
                                    class="home-goods__title c-ellipsis-2"
                                >
                                    <view
                                        v-if="item.joint_quantity"
                                        class="group-many mr8"
                                    >
                                        <c-colors
                                            :pro="['bgc', 'c']"
                                            :theme="['t|0.1', 't']"
                                            radius="4rpx"
                                        >
                                            <view class="c-font-sm plr8">{{ item.joint_quantity }}人团</view>
                                        </c-colors>
                                    </view>
                                    {{ item.goods_name }}
                                </view>
                            </view>
                            <view
                                v-if="briefShow_"
                                class="home-goods__brief pt4 c-font-sm c-ellipsis-1 c-666"
                            >
                                {{ item.goods_brief }}
                            </view>
                            <!-- <view
                                v-if="stockShow_"
                                class="pt4 c-font-sm c-ellipsis-1 c-666"
                            >
                                仅剩{{ 1 }}件
                            </view> -->
                            <view class="home-goods__desc flex-ajcenter mt12">
                                <view
                                    class="home-goods__price flex-column"
                                    :class="{'justify-center align-center': textCenter_}"
                                >
                                    <c-colors :theme="['s2']">
                                        <view
                                            v-if="priceShow_"
                                            class="price-com"
                                        >{{ item.price_show }}</view>
                                    </c-colors>
                                    <view
                                        v-if="marketPriceShow_"
                                        class="price-com price-com__market d-din"
                                    >
                                        {{ item.price_market || item.price_show }}
                                    </view>
                                </view>
                                <view
                                    v-if="purchaseShow_ && item.price_market"
                                    class="home-goods__shopcard"
                                    @click.stop
                                >
                                    <c-colors
                                        v-if="shopcardIconsShow_"
                                        :theme="['t']"
                                        :pro="['c']"
                                        radius="50"
                                    >
                                        <view
                                            class="home-goods__shopcard-icons"
                                            @click="handleAddShoppingCar(item)"
                                        >
                                            <c-icons
                                                :type="shopcard_"
                                                size="40"
                                            ></c-icons>
                                        </view>
                                    </c-colors>
                                    <c-colors
                                        v-else
                                        type="button"
                                        :pro="shopcardBtnPro"
                                        :theme="shopcardBtnTheme"
                                    >
                                        <c-button
                                            height="48"
                                            :shape="shopcardSquare"
                                            class="home-goods__shopcard-btn"
                                            @click="handleAddShoppingCar(item)"
                                        >{{ shopcardText_ }}</c-button>
                                    </c-colors>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 风格 1-5, 图片比例大小相同 -->
            <scroll-view
                :scroll-x="true"
                :scroll-with-animation="true"
                :class="{pr12: mode_ === 'style4' || mode_ === 'style6'}"
            >
                <view
                    class="home-goods__list c-row"
                    :class="{'flex-nowrap': mode_ === 'style4' || mode_ === 'style6'}"
                    :style="[{marginTop: isStyle6_ ? '-12rpx': '0'}]"
                >
                    <view
                        v-for="(item, index) in listClone"
                        :key="index"
                        :class="['c-col-' + colIndex]"
                    >
                        <view
                            class="home-goods__item"
                            :class="[goodsStyle_]"
                            :style="[innerLayer_]"
                            @click="jumpDetail(item)"
                        >
                            <view
                                class="home-goods__item-img"
                                :style="[{paddingTop: paddingPercent_}]"
                            >

                                <view
                                    v-if="item.is_example"
                                    class="home-goods__no-img"
                                >
                                    <c-image
                                        class="home-goods__item-img-is_example"
                                        mode="heightFix"
                                        :width="noImgWidth_"
                                        :height="noImgHeight_"
                                        :src="item.goods_img"
                                    />
                                </view>

                                <c-image
                                    v-else
                                    class="home-goods__item-img-box"
                                    :src="item.goods_img"
                                    :width="imgWidth_"
                                    :height="imgHeight_"
                                    :radius="0"
                                />
                                <view
                                    v-if="groupNumShow_"
                                    class="home-goods__group-already"
                                    :style="[transformGroupScale_]"
                                >
                                    {{ item.sales }}人已拼团
                                </view>
                                <view
                                    v-if="type === 'seckill'"
                                    class="home-goods__seckill-text"
                                    :style="[transformScale_]"
                                >
                                    <c-icons
                                        v-if="colIndex !== 4"
                                        class="pr8"
                                        type="icon-miaosha2"
                                        size="24"
                                    />
                                    <text>限时秒杀</text>
                                </view>
                            </view>
                            <view
                                v-if="showInfo_"
                                class="home-goods__item-bd flex-1"
                            >
                                <view class="line-height20">
                                    <view
                                        v-if="titileShow_"
                                        :style="[itemLayer_]"
                                        class="home-goods__title c-ellipsis-2"
                                    >
                                        <view
                                            v-if="item.joint_quantity"
                                            class="group-many mr8"
                                        >
                                            <c-colors
                                                :pro="['bgc', 'c']"
                                                :theme="['t|0.1', 't']"
                                                radius="4rpx"
                                            >
                                                <view class="c-font-sm plr8">{{ item.joint_quantity }}人团</view>
                                            </c-colors>
                                        </view>
                                        {{ item.goods_name }}
                                    </view>
                                </view>
                                <view
                                    v-if="briefShow_"
                                    class="home-goods__brief pt4 c-font-sm c-ellipsis-1 c-666"
                                >
                                    {{ item.goods_brief }}
                                </view>
                                <!-- <view
                                    v-if="stockShow_"
                                    class="pt4 c-font-sm c-ellipsis-1 c-666"
                                >
                                    仅剩{{ 1 }}件
                                </view> -->
                                <view class="home-goods__desc flex-ajcenter mt12">
                                    <view
                                        class="home-goods__price flex-column"
                                        :class="{'justify-center align-center': textCenter_}"
                                    >
                                        <c-colors :theme="['s2']">
                                            <view
                                                v-if="priceShow_"
                                                class="price-com"
                                            >{{ item.price_show }}</view>
                                        </c-colors>
                                        <view
                                            v-if="marketPriceShow_"
                                            class="price-com price-com__market d-din"
                                        >
                                            {{ item.price_market || item.price_show }}
                                        </view>
                                    </view>
                                    <view
                                        v-if="purchaseShow_ && item.price_market"
                                        class="home-goods__shopcard"
                                        @click.stop
                                    >
                                        <c-colors
                                            v-if="shopcardIconsShow_"
                                            :theme="['t']"
                                            :pro="['c']"
                                            radius="50"
                                        >
                                            <view
                                                class="home-goods__shopcard-icons"
                                                @click="handleAddShoppingCar(item)"
                                            >
                                                <c-icons
                                                    :type="shopcard_"
                                                    :size="shopcardSize"
                                                ></c-icons>
                                            </view>
                                        </c-colors>
                                        <c-colors
                                            v-else
                                            type="button"
                                            :pro="shopcardBtnPro"
                                            :theme="shopcardBtnTheme"
                                        >
                                            <c-button
                                                height="48"
                                                :shape="shopcardSquare"
                                                class="home-goods__shopcard-btn"
                                                @click="handleAddShoppingCar(item)"
                                            >{{ shopcardText_ }}</c-button>
                                        </c-colors>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[outerLayer_]"
        >
            <c-image
                :src="`skeleton-screen/${config.module}_${mode_}.png`"
                width="100%"
                mode="widthFix"
            />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
import TimeUtil from 'zzsp-saas-ui/common/utils/countDown'
// 首页特色组件
export default {
    mixins: [homeComponentMixins],
    props: {
        // 数据
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        extra: {
            type: Object,
            default: () => {
                return {}
            }
        },
        type: {
            type: String,
            default: 'goods'
        },
        // 倒计时间总秒数
        remainTime: {
            type: [String, Number],
            default: 0
        },
        jumpName: {
            type: String,
            default: 'goodsDetails'
        }
    },
    data() {
        return {
            colIndex: 12,
            shopcardSize: 36, // 购物车size
            imgHeight: 280, // 图片高度
            firstZero: true,
            transformScale: 1, // 秒杀缩放
            transformGroupScale: 1, // 拼团缩放
            hour: '',
            minute: '',
            second: '',
            timer: '',
            shopcardBtnTheme: ['t', '#fff'], // 购物车主题色
            shopcardBtnPro: ['bgc', 'c'], // 购物车样式属性
            shopcardSquare: 'square', // 购物车按钮圆角
            listFirst: [], // 风格6时第一条数据
            listClone: [] // 克隆list
        }
    },
    computed: {
        extra_() {
            return this.extra
        },
        mode_() {
            // 兼容旧的, 默认值
            let mode = 'style2' // 商品
            if (this.type === 'seckill' || this.type === 'group') {
                mode = 'style4'
            }
            return this.extra_.mode || mode
        },
        // 排列方式
        direction_() {
            return this.mode_ === 'style5' ? 'row' : 'column'
        },
        // 商品样式
        goodsStyle_() {
            return this.extra_.goodsStyle || 'goodStyle1'
        },
        // 图片比例
        scale_() {
            return this.extra_.scale || 'scale1'
        },
        paddingPercent_() {
            let paddingPercent = '100%'
            switch (this.scale_) {
                case 'scale1':
                    paddingPercent = '100%'
                    break
                case 'scale2':
                    paddingPercent = '56.25%'
                    break
                case 'scale3':
                    paddingPercent = '133.333333%'
                    break
                case 'scale4':
                    paddingPercent = '75%'
                    break
            }
            return this.mode_ === 'style5' ? 0 : paddingPercent
        },
        // 文本是否居中居中
        textCenter_() {
            return this.itemLayer_.textAlign === 'center'
        },
        // 图片宽度
        imgWidth_() {
            return this.mode_ === 'style5' ? 240 : '100%'
        },
        // 图片高度
        imgHeight_() {
            return this.mode_ === 'style5' ? this.imgHeight : '100%'
        },
        noImgWidth_() {
            return this.mode_ === 'style1' ? 400 : 200
        },
        noImgHeight_() {
            return this.mode_ === 'style1' ? 400 : 200
        },
        countDown_() {
            return this.hour + ' : ' + this.minute + ' : ' + this.second
        },
        // 秒杀缩放
        transformScale_() {
            console.log(this.transformScale)
            return {
                transform: `scale(${this.transformScale})`,
                transformOrigin: 0
            }
        },
        // 拼团缩放
        transformGroupScale_() {
            return {
                transform: `scale(${this.transformGroupScale})`,
                transformOrigin: 0
            }
        },
        type_() {
            return this.type === 'group' || this.type === 'seckill'
        },
        label_() {
            if (this.type === 'group') return '钜惠拼团'
            if (this.type === 'seckill') return '限时秒杀'
            return ''
        },
        isStyle6_() {
            return this.mode_ === 'style6'
        },
        // 商品名称
        titileShow_() {
            const titileShow = parseInt(this.extra_.titileShow)
            return isNaN(titileShow) ? 1 : titileShow
        },
        // 商品描述
        briefShow_() {
            return false
            // const briefShow = parseInt(this.extra_.briefShow)
            // return isNaN(briefShow) ? 1 : briefShow
        },
        // 价格
        priceShow_() {
            const priceShow = parseInt(this.extra_.priceShow)
            return isNaN(priceShow) ? 1 : priceShow
        },
        // 划线价
        marketPriceShow_() {
            const marketPriceShow = parseInt(this.extra_.marketPriceShow)
            return isNaN(marketPriceShow) ? 1 : marketPriceShow
        },
        // 购买按钮, 购物车
        purchaseShow_() {
            // if (this.type !== 'goods') return false
            const purchaseShow = parseInt(this.extra_.purchaseShow)
            return isNaN(purchaseShow) ? 0 : purchaseShow
        },
        // 购物车样式
        shopcard_() {
            return this.extra_.shopcard || ''
        },
        shopcardText_() {
            return this.extra_.shopcardText || ''
        },
        // 购物车是icons样式
        shopcardIconsShow_() {
            return this.shopcard_.indexOf('icon-') !== -1
        },
        // 拼团人数
        groupNumShow_() {
            if (this.type !== 'group') return false
            return parseInt(this.extra_.groupNumShow)
        },
        // 是否售罄
        sellOutShow_() {
            if (this.type === 'group' || this.type === 'seckill') return false
            return parseInt(this.extra_.sellOutShow)
        },
        // 剩余库存
        stockShow_() {
            if (this.type !== 'seckill') return false
            return parseInt(this.extra_.stockShow)
        },
        showInfo_() {
            return this.titileShow_ || this.briefShow_ || this.priceShow_ || this.stockShow_ || this.purchaseShow_ || this.marketPriceShow_
        }
    },
    watch: {
        list: {
            handler(val) {
                this.listClone = this.$deepClone(val)
                if (this.mode_ === 'style6') {
                    this.listFirst = this.listClone.splice(0, 1)
                } else {
                    this.listFirst = []
                }
            },
            immediate: true
        },
        // 风格1:大图模式, 风格2: 一行2个, 风格3: 一行3个, 风格3: 横向滑动, 风格5: 详细列表, 风格6: 1大2小
        mode_: {
            handler(val) {
                if (val !== 'style6') {
                    this.listClone = this.$deepClone(this.list)
                    this.listFirst = []
                }
                switch (val) {
                    case 'style1':
                        this.colIndex = 12
                        this.shopcardSize = 40
                        this.transformScale = 1
                        this.transformGroupScale = 1
                        break
                    case 'style2':
                        this.colIndex = 6
                        this.shopcardSize = 36
                        this.transformScale = 0.8
                        this.transformGroupScale = 0.85
                        break
                    case 'style3':
                        this.colIndex = 4
                        this.shopcardSize = 34
                        this.transformScale = 0.8
                        this.transformGroupScale = 0.75
                        break
                    case 'style4':
                        this.colIndex = 4
                        this.shopcardSize = 34
                        this.transformScale = 0.8
                        this.transformGroupScale = 0.75
                        break
                    case 'style5':
                        this.colIndex = 12
                        this.shopcardSize = 40
                        this.transformScale = 0.8
                        this.transformGroupScale = 0.85
                        break
                    case 'style6':
                        this.colIndex = 4
                        this.shopcardSize = 34
                        this.transformScale = 0.8
                        this.transformGroupScale = 0.8
                        this.listFirst = this.listFirst.length ? this.listFirst : this.listClone.splice(0, 1)
                        break
                }
            },
            immediate: true
        },
        scale_: {
            handler(val) {
                switch (val) {
                    case 'scale1':
                        this.imgHeight = 240
                        break
                    case 'scale4':
                        this.imgHeight = 180
                        break
                }
            },
            immediate: true
        },
        shopcard_: {
            handler(val) {
                switch (val) {
                    case 'btn1':
                        this.shopcardBtnTheme = ['t', '#fff']
                        this.shopcardBtnPro = ['bgc', 'c']
                        this.shopcardSquare = 'square'
                        break
                    case 'btn2':
                        this.shopcardBtnTheme = ['t', 't']
                        this.shopcardBtnPro = ['bdc', 'c']
                        this.shopcardSquare = 'square'
                        break
                    case 'btn3':
                        this.shopcardBtnTheme = ['t', '#fff']
                        this.shopcardBtnPro = ['bgc', 'c']
                        this.shopcardSquare = 'circle'
                        break
                    case 'btn4':
                        this.shopcardBtnTheme = ['t', 't']
                        this.shopcardBtnPro = ['bdc', 'c']
                        this.shopcardSquare = 'circle'
                        break
                }
            },
            immediate: true
        }
    },
    mounted() {
        if (this.remainTime > 0) {
            // this.hour = Math.floor((this.remainTime / 3600) % 24)
            // this.minute = Math.floor((this.remainTime / 60) % 60)
            // this.second = Math.floor(this.remainTime % 60)
            this.time = new TimeUtil()
            this.time.addTask(this.remainTime)
            this.time.start((res) => {
                if (res[0].timestamp <= 0 && this.firstZero) {
                    this.firstZero = false
                    this.$emit('zero', true)
                    this.time.end()
                }
                this.handleInit(res[0].time)
            })
        }
    },
    destroyed() {
        this.time && this.time.end()
    },
    methods: {
        handleInit(res) {
            this.hour = res.showHour
            this.minute = res.minute
            this.second = res.second
        },
        // 加入购物车
        handleAddShoppingCar(e) {
            if (this.type !== 'goods') {
                this.jumpDetail(e)
            } else {
                this.$emit('addShopCar', {
                    detail: e
                })
            }
        },
        jumpDetail(item) {
            let id = ''
            const params = {}
            switch (this.type) {
                case 'goods':
                    id = item.id
                    break
                case 'group':
                    params.activity_id = item.id
                    params.activity_type = item.activity_type
                    params.activity_order_id = item.order_id
                    id = item.goods_id
                    break
                case 'seckill':
                    params.activity_id = item.id
                    params.activity_type = item.activity_type
                    params.activity_order_id = item.order_id
                    id = item.goods_id
                    break
            }
            this.$jumpDetail(this.jumpName, id, params)
        }
    }
}
</script>

<style lang="scss">
.home-goods {
    &__no-img {
        background-color: #f3f8ff;
        @include abs(0, 0, 0, 0);
        @include flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
    }
    .style1,
    .style6-big {
        .home-goods {
            &__title {
                height: auto;
            }
        }
    }
    .group-many {
        display: inline-block;
    }
    &__item {
        @include flex;
        background: #ffffff;
        border-radius: 16rpx;
        width: 100%;
        overflow: hidden;
        &-bd {
            position: relative;

            @include flex;
            padding: 12rpx;
            .group-many {
                line-height: 1.5;
            }
        }
        &-img {
            flex-shrink: 0;
            position: relative;
        }
    }
    .style6-big {
        .home-goods__shopcard {
            position: absolute !important;
        }
    }
    &__title {
        font-size: 28rpx;
        color: #333;
        word-break: break-all;
        height: 80rpx;
    }
    &__brief {
        height: 40rpx;
    }

    &__desc {
        position: relative;
        & > .flex-ajcenter {
            position: relative;
        }
    }
    &__price {
        width: 100%;
    }
    &__shopcard {
        // transform-origin: 100% center;
        @include abs(50%, 0);
        transform: translateY(-50%);
        &-icons {
            width: 48rpx;
            height: 48rpx;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        /deep/ .c-btn {
            font-size: 24rpx;
            padding: 0 24rpx;
        }
    }
    &__group {
        &-already {
            @include abs(16rpx, null, null, 0);
            background: #808285;
            border-radius: 0 20rpx 20rpx 0;
            color: #fff;
            font-size: 24rpx;
            padding: 4rpx 12rpx;
        }
    }
    &__seckill {
        &-text {
            font-size: 24rpx;
            @include flex(row);
            @include abs(16rpx, null, null, 16rpx);
            color: #fff;
            background: linear-gradient(270deg, #ff983a 0%, #fa3f1e 100%);
            border-radius: 24rpx;
            text-align: center;
            padding: 8rpx 24rpx;
            font-weight: normal !important;
            white-space: nowrap;
            align-items: center;
        }
    }
    &--row {
        .home-goods__item {
            @include flex(row);
            &-img {
                height: auto;
                padding-top: 0;
            }
            &-bd {
                padding: 24rpx;
            }
        }
        .home-good__brief {
            height: auto;
        }
        .home-goods__desc {
            @include abs(null, 24rpx, 24rpx, 24rpx);
        }
    }
    &--column {
        .home-goods__item {
            &-img {
                position: relative;
                height: 0;
                padding-top: 100%;
                &-box {
                    @include abs(0, 0, 0, 0);
                }
            }
            &-bd {
                width: 100%;
                justify-content: space-between;
            }
        }
    }
    .style4 .c-col-4,
    .style6 .c-col-4 {
        flex-shrink: 0;
        width: 31%;
    }
    .price-com__market {
        margin-bottom: 4rpx;
        font-size: 80%;
        color: #999;
        text-decoration: line-through;
    }
    .price-com__show {
        font-weight: normal;
        &::before {
            font-weight: normal;
        }
    }

    .flex-nowrap {
        flex-wrap: nowrap;
    }
    // 卡片阴影
    .goodStyle2 {
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    }
    // 描边白底
    .goodStyle3 {
        box-shadow: 0px 0px 1px 1px #ebedf0;
    }
    // 透明底
    .goodStyle4 {
        background: transparent;
    }
    .c-col-4 {
        .home-goods__item {
            &-bd {
                padding: 12rpx 8rpx 24rpx;
            }
        }
        .home-goods__seckill {
            &-text {
                @include abs(16rpx, null, null, 0);
                border-radius: 0 24rpx 24rpx 0;
            }
        }
        .price-com {
            margin-top: 4rpx;
        }
        .market-box {
            height: 26rpx;
        }
    }
    .c-col-6 {
        .home-goods__item {
            &-bd {
                padding: 16rpx 16rpx 24rpx;
            }
        }
        .price-com {
            margin-top: 4rpx;
        }
        .market-box {
            height: 26rpx;
        }
    }
    .c-col-12 {
        .home-goods__item {
            &-bd {
                padding: 16rpx 24rpx 24rpx;
            }
        }
        .home-goods {
            &__price {
                flex: 1;
                @include flex(row);
            }
        }
        .home-goods__seckill {
            &-text {
                @include abs(24rpx, null, null, 24rpx);
            }
        }
        .home-goods__group {
            &-already {
                @include abs(24rpx, null, null, 0);
            }
        }
        .price-com__market {
            margin-left: 4rpx;
        }
    }
    .style5 {
        .c-col-12 {
            .home-goods__item {
                &-bd {
                    padding: 24rpx 16rpx;
                }
            }
            .home-goods__no-img {
                position: static !important;
            }
        }
        .home-goods__seckill {
            &-text {
                @include abs(16rpx, null, null, 16rpx);
            }
        }
    }
    .price-com::before {
        // bottom: 4rpx;
    }
    .price-com__market::before {
        // #ifdef H5
        // bottom: 2rpx;
        // #endif
    }
    .line-height20 {
        line-height: 40rpx;
    }
}
</style>

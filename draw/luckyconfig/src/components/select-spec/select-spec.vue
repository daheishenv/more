<template>
    <view>
        <c-popup
            v-model="modalFlag"
            mode="bottom"
            radius="24rpx 24rpx 0 0"
        >
            <view class="select-rule-box">
                <view class="top-box flex">
                    <view class="flex-image">
                        <c-image
                            size="180"
                            radius="8"
                            :src="curSku_.product_img"
                            @click="previewImage"
                        ></c-image>
                    </view>
                    <view class="flex-1 pl24">
                        <c-colors :theme="[ priceColor ]">
                            <view
                                class="price-com"
                                :class="[tempCurSku.activity_type == 4 ? 'integral-price': '']"
                            >
                                <c-image
                                    v-if="tempCurSku.activity_type == 4"
                                    :src="'integral/gold-coin.png'"
                                    size="32"
                                    class="integral-coin"
                                ></c-image>
                                {{ priceShow_ || '' }}
                                <view
                                    v-if="priceShowUnit_ && saleSet_"
                                    class="price-com__samll"
                                >{{ priceShowUnit_ }}</view>
                            </view>
                        </c-colors>
                        <view class="goods-rule-text">{{ selectSpecText_ || '' }}</view>
                        <view class="goods-stock">
                            库存：{{ skuStock_ }}
                            <block v-if="priceSaleUnit_ && saleSet_">{{ priceSaleUnit_ }}</block>
                        </view>
                    </view>
                </view>
                <scroll-view
                    v-if="goods_sku_attr_value.length"
                    scroll-y
                    class="goods-rule-box"
                >
                    <view class="goods-rule-content">
                        <view
                            v-for="(item, pIndex) in goods_sku_attr_value"
                            :key="item.id"
                        >
                            <view class="goods-rule-title">{{ item.attr_name }}</view>
                            <view class="goods-rule-list">
                                <view
                                    v-for="(type, index) in item.goods_type_attr"
                                    :key="type.id"
                                    class="p12"
                                    type="button"
                                >
                                    <c-colors
                                        :theme="[type.checked ? blockColor : '#333', type.checked ? `${blockColor}|0.06` : '#f5f5f5', type.checked ? blockColor : '#f5f5f5']"
                                        :pro="['c', 'bgc', 'bdc']"
                                        radius="8"
                                    >
                                        <c-button
                                            v-if="type.attr_value"
                                            height="68"
                                            plain
                                            :class="{'select': type.checked}"
                                            @click="handleSelect(pIndex, index)"
                                        >
                                            <text>{{ type.attr_value }}</text>
                                        </c-button>
                                    </c-colors>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
                <view class="goods-rule-calc">
                    <view class="goods-rule-title">
                        购买数量
                        <block v-if="priceSaleUnit_ && saleSet_">
                            （{{ priceSaleUnit_ }}）
                            <view class="goods-rule-title__text">
                                <text class="color-price">{{ totalArea_ }}{{ curSku_.area_unit }}</text>
                                （每{{ priceSaleUnit_ }}{{ area_ }}含{{ curSku_.sale_stock_ratio }}{{ priceStockUnit_ }}）
                            </view>
                        </block>
                    </view>
                    <view class="calc-box">
                        <view
                            class="flex-ajcenter"
                            @click.stop.prevent
                        >
                            <c-icons
                                class="calc-btn"
                                :class="{'calc-btn__disabled': minNum_}"
                                type="icon-jian"
                                :color="minNum_ ? '#bbb' : '#333'"
                                @click="handleUpdateNum(false)"
                            ></c-icons>
                            <view
                                class="flex-middle flex-1"
                                @click="inputFlag = true"
                            >
                                <text class="flex-middle__text d-din-bold">{{ tempCurSku.num }}</text>
                            </view>
                            <c-icons
                                class="calc-btn"
                                :class="{'calc-btn__disabled': maxNum_}"
                                type="icon-jia"
                                :color="maxNum_ ? '#bbb' : '#333'"
                                @click="handleUpdateNum(true)"
                            ></c-icons>
                        </view>
                    </view>
                </view>
                <view class="c-underline__top select-rule-btns c-row">
                    <block v-if="action_ === 0">
                        <view
                            v-if="!activityInfo_.id"
                            class="p12 flex-1"
                        >
                            <c-colors
                                :theme="joinTheme"
                                :pro="['bgc', 'c']"
                                :radius="radius_"
                                type="button"
                            >
                                <c-button
                                    :disabled="joinDisabled_"
                                    @click="handleSubmit('join')"
                                >
                                    {{ joinText ? joinText : '加入购物车' }}
                                </c-button>
                            </c-colors>
                        </view>
                        <view
                            v-if="activityInfo_.activity_type == 5"
                            class="p12 flex-1"
                        >
                            <c-colors
                                :theme="buyTheme"
                                :pro="['bgc', 'c']"
                                :radius="radius_"
                                type="button"
                            >
                                <c-button
                                    :disabled="buyDisabled_"
                                    @click="handleSubmit('buy')"
                                >
                                    {{ buyText ? buyText : `立即付定金 ¥${depositPrice_}` }}
                                </c-button>
                            </c-colors>
                        </view>
                        <view
                            v-else
                            class="p12 flex-1"
                        >
                            <c-colors
                                :theme="buyTheme"
                                :pro="['bgc', 'c']"
                                :radius="radius_"
                                type="button"
                            >
                                <c-button
                                    :theme="buyTheme"
                                    :pro="['bgc', 'c']"
                                    :disabled="buyDisabled_"
                                    @click="handleSubmit('buy')"
                                >
                                    {{ buyText ? buyText : '立即购买' }}
                                </c-button>
                            </c-colors>
                        </view>
                    </block>
                    <block v-else-if="action_ === 1">
                        <view class="p12 flex-1">
                            <c-colors
                                :theme="joinTheme"
                                :pro="['bgc', 'c']"
                                :radius="radius_"
                                type="button"
                            >
                                <c-button
                                    :disabled="joinDisabled_"
                                    @click="handleSubmit('join')"
                                >
                                    {{ joinText ? joinText : '加入购物车' }}
                                </c-button>
                            </c-colors>
                        </view>
                    </block>
                    <block v-else-if="action_ === 2">
                        <view class="p12 flex-1">
                            <c-colors
                                :theme="buyTheme"
                                :pro="['bgc', 'c']"
                                :radius="radius_"
                                type="button"
                            >
                                <c-button
                                    :disabled="joinDisabled_"
                                    @click="handleSubmit('buy')"
                                >
                                    {{ buyText ? buyText : '立即购买' }}
                                </c-button>
                            </c-colors>
                        </view>
                    </block>
                    <block v-else-if="action_ === 3">
                        <view class="p12 flex-1">
                            <c-colors
                                :theme="buyTheme"
                                :pro="['bgc', 'c']"
                                :radius="radius_"
                                type="button"
                            >
                                <c-button
                                    :disabled="joinDisabled_"
                                    @click="handleSubmit('buy')"
                                >
                                    {{ buyText ? buyText : '立即购买' }}
                                </c-button>
                            </c-colors>
                        </view>
                    </block>
                    <!-- 定金逻辑 -->
                    <block v-else-if="action_ === 4">
                        <view class="p12 flex-1">
                            <c-colors
                                :theme="buyTheme"
                                :pro="['bgc', 'c']"
                                :radius="radius_"
                                type="button"
                            >
                                <c-button
                                    :disabled="buyDisabled_"
                                    @click="handleSubmit('buy')"
                                >
                                    {{ buyText ? buyText : `立即付定金 ¥${depositPrice_}` }}
                                </c-button>
                            </c-colors>
                        </view>
                    </block>
                </view>
            </view>
        </c-popup>

        <!-- 件数输入框 -->
        <gc-input-modal
            v-model="inputFlag"
            :num="tempCurSku.num"
            :max="buyMax_"
            @confirm="changeBuyNum"
        />
    </view>
</template>

<script>
export default {
    props: {
        config: {
            type: Object,
            default: () => {
                return {}
            }
        },
        value: {
            type: Boolean,
            default: false
        },
        // 规格颜色
        blockColor: {
            type: String,
            default: 't'
        },
        priceColor: {
            type: String,
            default: 's2'
        },
        /**
         * 0 显示全部
         * 1 加入购物车
         * 2 立即购买
         * 3 拼团单独购买
         * 4 付定金
         */
        action: {
            type: [Number, String],
            default: 0
        },
        addressId: { // 地址id
            type: [Number, String],
            default: 0
        },
        // 按钮样式
        joinTheme: {
            type: Array,
            default: () => {
                return ['s1', '#fff']
            }
        },
        joinDisabled: {
            type: [Boolean, String],
            default: false
        },
        joinText: {
            type: String,
            default: ''
        },
        buyTheme: {
            type: Array,
            default: () => {
                return ['t', '#fff']
            }
        },
        buyDisabled: {
            type: [Boolean, String],
            default: false
        },
        buyText: {
            type: String,
            default: ''
        },
        // 定金的信息, 用于计算支付定金金额
        deposit: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            specIndex: -1,
            pageData: {},
            modalFlag: false,
            goods_sku_attr_value: [], // sku相关信息
            goods_sku_relation: [], // sku关联组合信息
            tempCurSku: {},
            btnAction: null,
            saleSet: 0,
            inputFlag: false
        }
    },
    computed: {
        radius_() {
            return this.cmptStyle_ === 'style2' ? 40 : 8
        },
        buyDisabled_() {
            return String(this.buyDisabled) !== 'false'
        },
        joinDisabled_() {
            return String(this.joinDisabled) !== 'false'
        },
        activityInfo_() {
            return this.config.activity_info ? this.config.activity_info : {}
        },
        action_() {
            return parseInt(this.action)
        },
        selectSpec_() {
            const arr = []
            // 如果没有规格则选中主商品  主商品规格id为0
            if (this.goods_sku_attr_value.length === 0) {
                return [{
                    id: 0
                }]
            }
            this.goods_sku_attr_value.forEach(po => {
                arr.push(po.goods_type_attr.find(o => o.checked))
            })
            return arr
        },
        selectSpecText_() {
            return this.selectSpec_.map(o => o.attr_value).join(' - ')
        },
        selectIds_() {
            return this.selectSpec_.map(o => String(o.id))
        },
        saleSet_() { // 是否开启件数比
            return this.saleSet === 1
        },
        curSku_() {
            return this.goods_sku_relation.find(o => this.$c.isArrayEqual(o.goods_sku_values, this.selectIds_)) || {
                price_show: this.$c.numFormat(null),
                price_market: this.$c.numFormat(null),
                price_sale: this.$c.numFormat(null),
                sku_able_stock: this.$c.numFormat(null)
            }
        },
        priceSale_() {
            return this.$c.numFormat(this.curSku_.price_sale)
        },
        skuStock_() {
            return this.$c.numFormat(this.curSku_.sku_able_stock, 'stock')
        },
        buyMax_() {
            return this.activityInfo_.stint_num ? this.activityInfo_.stint_num : (this.activityInfo_
                .quantity_limit ? this.activityInfo_.quantity_limit : this.skuStock_)
        },
        priceShowUnit_() {
            return this.curSku_.price_show_unit || ''
        },
        priceSaleUnit_() {
            return this.curSku_.price_sale_unit ? this.curSku_.price_sale_unit.substr(1) : ''
        },
        priceStockUnit_() { // 售卖单位
            return this.curSku_.price_stock_unit ? this.curSku_.price_stock_unit.substr(1) : ''
        },
        area_() {
            return this.curSku_.area_ ? (this.curSku_.area_ * 1 + this.curSku_.area_unit) : ''
        },
        totalArea_() {
            if (!this.tempCurSku.area || !this.tempCurSku.num) return 0
            return this.$c.calcFn.mul(this.tempCurSku.area, this.tempCurSku.num)
        },
        maxNum_() {
            return this.tempCurSku.num >= this.buyMax_
        },
        minNum_() {
            return this.tempCurSku.num <= 1
        },
        priceShow_() { // 显示价格, action为3, 显示拼团单买价
            if (this.action_ === 3) return this.$c.numFormat(this.curSku_.price_joint_origin)
            // 积分兑换, 显示积分价格
            if (this.activityInfo_.activity_type === 4) return this.$c.numFormat(this.curSku_.credit)
            return this.$c.numFormat(this.curSku_.price_show)
        },
        depositPrice_() { // 定金弹框中支付定金的金额
            if (this.activityInfo_.activity_type === 5 && this.deposit && this.curSku_.id) {
                const {
                    skuinfo
                } = this.deposit
                const depositSku = skuinfo.find(sku => sku.id === this.curSku_.id)
                return this.$c.calcFn.mul(depositSku.deposit, this.tempCurSku.num)
            } else {
                return 0
            }
        }
    },
    watch: {
        config(val) {
            if (val.id) {
                this.handleGoodsSkuInfo()
            }
        },
        curSku_(newVal) {
            const tempCurSku = this.$deepClone(newVal)
            tempCurSku.num = (this.skuStock_ >= 1 && this.buyMax_ >= 1) ? 1 : 0
            this.tempCurSku = tempCurSku
        },
        value: {
            handler(val) {
                this.modalFlag = val
            },
            immediate: true
        },
        modalFlag(val) {
            this.$emit('input', val)
            if (!val && this.tempCurSku.id) {
                this.$emit('change', {
                    type: 'change',
                    detail: {
                        sku: this.selectSpec_,
                        product_img: this.btnAction === 'join' ? this.curSku_.product_img : '',
                        skuInfo: this.curSku_
                    }
                })
            } else {
                this.btnAction = null
            }
        }
    },
    methods: {
        changeBuyNum({ detail: { value } }) {
            this.inputFlag = false
            this.tempCurSku.num = value
        },
        previewImage() {
            uni.previewImage({
                urls: [this.curSku_.product_img]
            })
        },
        handleSelect(pIndex, index) {
            this.goods_sku_attr_value[pIndex].goods_type_attr.forEach((o, i) => {
                o.checked = index === i
            })
            this.$set(this.goods_sku_attr_value, pIndex, this.goods_sku_attr_value[pIndex])
        },
        handleDefault() {
            const defaultLen = this.config.default_sku ? this.config.default_sku.length : 0
            if (defaultLen && defaultLen === this.goods_sku_attr_value.length) {
                this.config.default_sku.forEach(dor => {
                    this.goods_sku_attr_value.forEach((po, pi) => {
                        const index = po.goods_type_attr.findIndex(o => o.id === dor.id)
                        index !== -1 && this.$set(this.goods_sku_attr_value[pi].goods_type_attr[
                            index], 'checked', true)
                    })
                })
            } else {
                this.goods_sku_attr_value.forEach((o, i) => {
                    this.handleSelect(i, 0)
                })
            }
            this.$nextTick(() => {
                this.$emit('change', {
                    type: 'change',
                    detail: {
                        sku: this.selectSpec_,
                        skuInfo: this.curSku_
                    }
                })
            })
        },
        async handleGoodsSkuInfo() {
            const params = {
                goods_id: this.config.id
            }
            if (this.activityInfo_.id) {
                params.activity_id = this.activityInfo_.id
                params.activity_type = this.activityInfo_.activity_type
            }
            const {
                data
            } = await this.$http('goodsSkuInfo', params)
            this.goods_sku_relation = data.goods_sku_relation
            this.goods_sku_attr_value = data.goods_sku_attr_value
            this.saleSet = data.sale_set
            this.handleDefault()
        },
        handleUpdateNum(isAdd) {
            let num = this.tempCurSku.num
            if (isAdd) {
                if (num < this.buyMax_) {
                    this.$set(this.tempCurSku, 'num', ++num)
                }
            } else {
                if (num > 1) {
                    this.$set(this.tempCurSku, 'num', --num)
                }
            }
        },
        async handleSubmit(action) {
            if (action === 'buy' && this.buyDisabled_) return
            if (action === 'buy' && this.joinDisabled_) return
            if (!this.curSku_.goods_stock || !this.curSku_.goods_stock.sku_able_stock) {
                return this.$toast('该商品暂无库存')
            }
            if (this.activityInfo_.activity_type === 3 && this.activityInfo_.is_new_user !== 1) {
                return this.$toast('新人专享商品')
            }
            const {
                data: {
                    token
                }
            } = await this.$http('wxuserinfo', null, {
                source: 'catch'
            })
            if (!token) {
                return this.$jump('login', {
                    action: 'referrer'
                })
            }
            const shareData = uni.getStorageSync(this.$config.shareOriginName) || {}
            const shareUserId = shareData.routeName === this.$Route.name && this.config.id * 1 === shareData
                .detailId * 1
                ? shareData.parent_id : false
            const params = {
                goods_id: this.tempCurSku.goods_id,
                goods_sku_id: this.tempCurSku.id,
                num: this.tempCurSku.num
            }
            if (action === 'join') { // 加入购物车
                params.is_change = 0
                await this.$http('addCart', params)
                this.btnAction = action
            } else {
                shareUserId ? (params.share_user_id = shareUserId) : ''
                // 活动id, activity_id: 1秒杀, 2拼团, 3拼团单独购买
                if (this.tempCurSku && this.tempCurSku.activity_id && this.action_ !== 3) {
                    params.activity_type = this.tempCurSku.activity_type
                    params.activity_id = this.tempCurSku.activity_id
                    params.activity_sku_id = this.tempCurSku.activity_sku_id
                }
                this.config.activity_order_id ? (params.activity_order_id = this.config.activity_order_id) : ''
                this.addressId && (params.address_id = this.addressId)
                this.$jump('orderConfirm', params)
            }
            this.modalFlag = false
        }
    }
}
</script>

<style
    lang="scss"
    scoped
>
.select-rule-box {
    background-color: #fff;
    width: 100%;
    // height: 818rpx;
    border-radius: 24rpx 24rpx 0px 0px;
    transform: translateX(0);

    .goods-rule {
        &-box {
            max-height: 45vh;
        }

        &-content {
            padding: 0 12rpx 32rpx;
        }

        &-calc {
            padding: 0 24rpx 12rpx;
            @include flex(row);
            justify-content: space-between;
        }

        &-title {
            font-size: 28rpx;
            font-weight: bold;
            color: #333333;
            line-height: 40rpx;
            padding: 12rpx 0;

            &__text {
                font-size: 24rpx;
                font-weight: 400;
                color: #999999;
                margin-top: 12rpx;
                line-height: 28rpx;
            }
        }

        &-list {
            display: flex;
            flex-wrap: wrap;
        }
    }

    .top-box {
        padding: 56rpx 24rpx;

        .price-com {
            font-size: 48rpx;

            &:before,
            &__samll {
                font-size: 24rpx;
            }
        }

        .integral-price {
            .integral-coin {
                margin-right: 9rpx;
                margin-bottom: 4rpx;
            }

            &::before {
                content: '';
            }
        }

        .goods-stock {
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
            line-height: 33rpx;
            @include abs(null, 0, 0, 24rpx);
        }

        &:after {
            left: 0;
            right: 0;
        }

        .goods-rule-text {
            margin-top: 16rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: #333333;
            line-height: 40rpx;
        }
    }
}
</style>

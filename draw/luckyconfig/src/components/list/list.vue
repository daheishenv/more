<template>
    <view
        class="gc-list"
        :style="{backgroundColor: bgColor}"
    >
        <c-waterfall
            v-if="mode === 'column' && waterfall_"
            ref="uWaterfall"
            v-model="list"
            class="gc-list-group"
            :class="[ full_ ? '' : 'c-row' ]"
            :other-attr="itemObj_"
        >
            <template v-slot:left="{ leftList, otherAttr }">
                <view
                    v-for="(item, leftIndex) in leftList"
                    :key="leftIndex"
                    :class="[ full_ ? '' : 'c-col-12' ]"
                    @click="goDetial(item)"
                >
                    <gc-list-item
                        :item-data="item"
                        mode="column"
                        :item-obj="otherAttr"
                        @addShopCar="addShopCar"
                    />
                </view>
            </template>
            <template v-slot:right="{ rightList, otherAttr }">
                <view
                    v-for="(item, rightIndex) in rightList"
                    :key="rightIndex"
                    :class="[ full_ ? '' : 'c-col-12' ]"
                    @click="goDetial(item)"
                >
                    <gc-list-item
                        :item-data="item"
                        :item-obj="otherAttr"
                        mode="column"
                        @addShopCar="addShopCar"
                    />
                </view>
            </template>
        </c-waterfall>
        <view
            v-for="(item, index) in list"
            v-else-if="full_"
            :key="index"
            @click="goDetial(item)"
        >
            <gc-list-item
                :item-data="item"
                :item-obj="itemObjNormal_(index)"
                mode="row"
                @addShopCar="addShopCar"
            />
        </view>
        <view
            v-else
            class="c-row gc-list-group"
        >
            <view
                v-for="(item, index) in list"
                :key="index"
                :class="mode === 'column' ? 'c-col-6' : 'c-col-12'"
                @click="goDetial(item)"
            >
                <gc-list-item
                    :item-data="item"
                    :item-obj="itemObjNormal_(index)"
                    :mode="mode"
                    @share="handleShare"
                    @addShopCar="addShopCar"
                />
            </view>
        </view>
        <!-- 暂无数据 -->
        <c-no-data
            v-if="lodingText"
            :text-style="loadingStyle"
            :show-img="noData"
            :text="lodingText"
        ></c-no-data>

        <!-- 分享朋友圈 -->
        <c-share-wechat
            v-if="type === 'customer'"
            v-model="shareFlag"
            :share-url="shareUrl"
            :title="goods_name"
            summary="向您分享了一件宝贝"
            :share-img="goods_img"
        ></c-share-wechat>

        <!-- 选择规格 -->
        <gc-select-spec
            v-model="specFlag"
            :config="specData"
        />
    </view>
</template>

<script>
export default {
    name: 'GcList',
    props: {
        // 数据
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        loadingStyle: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 没有数据
        noData: {
            type: Boolean,
            default: false
        },
        // 加载文字
        lodingText: {
            type: String,
            default: ''
        },
        // 是否平铺开(无间距)
        full: {
            type: [Boolean, String],
            default: false
        },
        // 是否开启瀑布流,仅在mode为column时生效
        waterfall: {
            type: [Boolean, String],
            default: true
        },
        /**
         * 展示模式
         * column 2列
         * row 一行
         */
        mode: {
            type: String,
            default: 'column'
        },
        /**
         * 主要是用来区分展示字段，或样式
         * normal 正常产品列表(精选好物、)
         * giftPack 新人礼包
         * setMeal 套餐包
         * group 团购
         * seckill 限时秒杀
         */
        type: {
            type: String,
            default: 'normal'
        },
        /**
        * ios 在scroll-view里用 fixed 会有问题,因此通过这个字段来判断
        * 如果再scroll-view里用了 fixed 需要再croll-view外执行该组件不在里面执行
        * normal 正常
        * scroll
        */
        specType: {
            type: String,
            default: 'normal'
        },
        /**
         * 支持数字或者百分比，如果是横竖切换的布局，传入逗号分隔的字符串：column的宽，row的宽, imgWidth > imgSize, imgHeight > imgSize
         */
        imgSize: {
            type: [String, Number, Array],
            default: 200
        },
        /**
         * 同imgSize
         */
        imgWidth: {
            type: [String, Number, Array],
            default: ''
        },
        /**
         * 同imgSize
         */
        imgHeight: {
            type: [String, Number, Array],
            default: ''
        },
        /**
         * 是否要显示下边框
         */
        border: {
            type: [String, Boolean],
            default: false
        },
        /**
         * 如果是横竖切换的布局，传入逗号分隔的字符串：column的圆角，row的圆角
         */
        radius: {
            type: [String, Number, Array],
            default: 16
        },
        /**
         * 默认继承radius
         */
        imgRadius: {
            type: [String, Number, Array],
            default: 0
        },
        /**
         * 要显示的图片 key值
         */
        imgKey: {
            type: String,
            default: 'goods_img'
        },
        /**
         * 要显示的title key值
         */
        titleKey: {
            type: String,
            default: 'goods_name'
        },
        /**
         * title显示几行开始点点点  仅支持false  1 2 3这4个参数
         */
        ellipsis: {
            type: [String, Number],
            default: 2
        },
        titleSize: {
            type: [String, Number],
            default: 28
        },
        bgColor: {
            type: String,
            default: '#f5f5f5'
        }
    },
    data() {
        return {
            shareFlag: false,
            specFlag: false, // 选择规格
            goods_name: '',
            goods_img: '',
            shareUrl: '',
            specData: {}
        }
    },
    computed: {
        waterfall_() {
            return String(this.waterfall) !== 'false'
        },
        full_() {
            return String(this.full) !== 'false'
        },
        imgWidth_() {
            return this.formatData(this.imgWidth, this.imgSize)
        },
        imgHeight_() {
            return this.formatData(this.imgHeight, this.imgSize)
        },
        radius_() {
            return this.formatData(this.radius)
        },
        itemStyle_() {
            return {
                borderRadius: this.addUnit(this.radius_)
            }
        },
        border_() {
            return String(this.border) !== 'false'
        },
        imgRadius_() {
            return this.formatData(this.imgRadius, this.mode === 'column' ? this.radius_[0] : this.radius_[1], true)
        },
        imgStyle_() {
            const radius = this.addUnit(this.imgRadius_)
            const width = this.addUnit(this.imgWidth_)
            const height = this.addUnit(this.imgHeight_)
            return {
                width: width,
                height: height,
                borderRadius: this.mode === 'row' ? radius : `${radius} ${radius} 0 0`
            }
        },
        titleClass_() {
            let titleClass = {}
            String(this.ellipsis) !== 'false' && (titleClass = 'c-ellipsis-' + this.ellipsis)
            return titleClass
        },
        titleHight_() {
            return this.titleHight ? String(this.titleHight).replace(/[^0-9]/ig, '') : ''
        },
        titleStyle_() {
            const fontSizes = this.formatData(this.titleSize)
            return {
                fontSize: this.addUnit(fontSizes)
            }
        },
        itemObj_() {
            return {
                titleStyle: this.titleStyle_,
                titleClass: this.titleClass_,
                imgStyle: this.imgStyle_,
                itemStyle: this.itemStyle_,
                titleKey: this.titleKey,
                imgKey: this.imgKey,
                type: this.type,
                mode: this.mode,
                waterfall: this.waterfall_,
                border: this.border_
            }
        },
        itemObjNormal_() {
            return (index) => {
                return {
                    ...this.itemObj_,
                    index
                }
            }
        }
    },
    methods: {
        formatData(any, oAny, existZero = false) {
            any = existZero ? (any !== undefined ? any : oAny) : (any || oAny)
            any = String(any).split(',')
            if (any.length < 2) {
                any.push(any[0])
            }
            return any
        },
        addUnit(arr, dVal = 0) {
            var val = this.mode === 'column' ? arr[0] : arr[1]
            return this.$c.formatUnit(val, 'rpx', dVal)
        },
        async goDetial(item) {
            let routeName = ''
            let id = ''
            const params = {}
            if (item.api_url) {
                const { data: { appid, domain, goods_id } } = await this.$http(item.api_url, {}, { loading: true })
                const jumpPath = `/goods/details/index?detailId=${goods_id}`
                // #ifdef MP-WEIXIN
                if (appid) {
                    uni.navigateToMiniProgram({
                        appId: appid,
                        path: jumpPath,
                        success(res) {
                            // 打开成功
                        }
                    })
                } else if (domain) {
                    uni.showToast({
                        title: '商品未存在!'
                    })
                }
                // #endif
                // #ifdef H5
                if (domain) {
                    this.$serverJump({
                        app_page: `${domain}${jumpPath}`,
                        hideTitle: true
                    })
                }
                // #endif
            } else {
                switch (this.type) {
                    case 'decoration':
                        routeName = 'decorationDetails'
                        id = item.id
                        break
                    case 'setMeal':
                        routeName = 'setMealDetails'
                        id = item.id
                        break
                    case 'case':
                        routeName = 'caseDetails'
                        id = item.id
                        break
                    case 'group':
                        routeName = 'groupDetails'
                        params.activity_id = item.id
                        params.activity_type = item.activity_type
                        id = item.goods_id
                        break
                    case 'groupDetails':
                        routeName = 'groupDetails'
                        params.activity_id = item.id
                        params.activity_type = item.activity_type
                        params.activity_order_id = item.order_id
                        id = item.goods_id
                        break
                    case 'seckill':
                        params.activity_id = item.id
                        params.activity_type = item.activity_type
                        routeName = 'seckillDetails'
                        id = item.goods_id
                        break
                    case 'giftPack':
                        params.activity_id = item.id
                        params.activity_type = item.activity_type
                        routeName = 'goodsDetails'
                        id = item.goods_id
                        break
                    case 'integral':
                        params.activity_id = item.id
                        params.activity_type = item.activity_type
                        routeName = 'integralDetails'
                        id = item.goods_id
                        break
                    default:
                        routeName = 'goodsDetails'
                        id = item.id
                }
            }
            // if(this.type === 'customer') return
            this.$jumpDetail(routeName, id, params)
        },
        handleShare(e) {
            const item = e.detail.value
            this.goods_name = item.goods_name
            this.goods_img = item.goods_img
            this.shareUrl = `/goods/details/index?detailId=${item.id}`
            this.shareFlag = true
            this.$emit('share', {
                detail: {
                    value: item
                }
            })
        },
        addShopCar(e) {
            if (this.specType === 'scroll') {
                const obj = {
                    detail: {
                        specFlag: true,
                        specData: e.detail
                    }
                }
                this.$emit('handleAddCar', obj)
            } else {
                this.specFlag = true
                this.specData = e.detail
            }
            // this.$emit("handleAddCar", {
            // 	detail: {
            // 		value: item
            // 	}
            // })
        }
    }

}
</script>

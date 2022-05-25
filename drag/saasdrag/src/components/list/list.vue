<template>
    <view
        class="gc-list"
        :style="{'background-color': bgColor}"
    >
        <c-waterfall
            v-if="mode === 'column' && waterfall_"
            v-model="list"
            ref="uWaterfall"
            class="gc-list-group"
            :class="[ full_ ? '' : 'c-row' ]"
            :otherAttr="itemObj_"
        >
            <template v-slot:left="{ leftList, otherAttr }">
                <view
                    :class="[ full_ ? '' : 'c-col-12' ]"
                    v-for="(item, leftIndex) in leftList"
                    :key="leftIndex"
                    @click="goDetial(item)"
                >
                    <gc-list-item
                        :itemData="item"
                        mode="column"
                        :itemObj="otherAttr"
                        @addShopCar="addShopCar"
                    />
                </view>
            </template>
            <template v-slot:right="{ rightList, otherAttr }">
                <view
                    :class="[ full_ ? '' : 'c-col-12' ]"
                    v-for="(item, rightIndex) in rightList"
                    :key="rightIndex"
                    @click="goDetial(item)"
                >
                    <gc-list-item
                        :itemData="item"
                        :itemObj="otherAttr"
                        mode="column"
                        @addShopCar="addShopCar"
                    />
                </view>
            </template>
        </c-waterfall>
        <view
            v-else-if="full_"
            v-for="(item, index) in list"
            :key="index"
            @click="goDetial(item)"
        >
            <gc-list-item
                :itemData="item"
                :itemObj="itemObjNormal_(index)"
                mode="row"
                @addShopCar="addShopCar"
            />
        </view>
        <view
            v-else
            class="c-row gc-list-group"
        >
            <view
                :class="mode === 'column' ? 'c-col-6' : 'c-col-12'"
                v-for="(item, index) in list"
                :key="index"
                @click="goDetial(item)"
            >
                <gc-list-item
                    :itemData="item"
                    :itemObj="itemObjNormal_(index)"
                    mode="row"
                    @share="handleShare"
                    @addShopCar="addShopCar"
                />
            </view>
        </view>
        <!-- 暂无数据 -->
        <c-no-data
            :textStyle="loadingStyle"
            :showImg="noData"
            :text="lodingText"
            v-if="lodingText"
        ></c-no-data>

        <!-- 分享朋友圈 -->
        <gc-share-wechat
            v-if="mode === 'customer'"
            v-model="shareFlag"
            :shareUrl="shareUrl"
            :title="goods_name"
            summary="向您分享了一件宝贝"
            :shareImg="goods_img"
        />

        <!-- 选择规格 -->
        <gc-select-spec
            v-model="specFlag"
            :config="specData"
        />
    </view>
</template>

<script>
export default {
    name: 'gc-list',
    data() {
        return {
            shareFlag: false,
            specFlag: false,//选择规格
            goods_name: '',
            goods_img: '',
            shareUrl: '',
            specData: {}
        }
    },
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
        //是否开启瀑布流,仅在mode为column时生效
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
        },
    },
    computed: {
        waterfall_() {
            // 头条不支持作用域插槽
            // #ifdef MP-TOUTIAO
            return false;
            // #endif
            return String(this.waterfall) === 'false' ? false : true;
        },
        full_() {
            return String(this.full) === 'false' ? false : true;
        },
        imgWidth_() {
            return this.formatData(this.imgWidth, this.imgSize);
        },
        imgHeight_() {
            return this.formatData(this.imgHeight, this.imgSize);
        },
        radius_() {
            return this.formatData(this.radius);
        },
        itemStyle_() {
            return {
                borderRadius: this.addUnit(this.radius_)
            }
        },
        border_() {
            return String(this.border) === 'false' ? false : true;
        },
        imgRadius_() {
            return this.formatData(this.imgRadius, this.mode === 'column' ? this.radius_[0] : this.radius_[1], true);
        },
        imgStyle_() {
            let radius = this.addUnit(this.imgRadius_);
            return {
                width: this.addUnit(this.imgWidth_),
                height: this.addUnit(this.imgHeight_),
                borderRadius: this.mode === 'row' ? radius : `${radius} ${radius} 0 0`
            }
        },
        titleClass_() {
            let titleClass = {};
            String(this.ellipsis) !== 'false' && (titleClass = 'c-ellipsis-' + this.ellipsis);
            return titleClass;
        },
        titleHight_() {
            return this.titleHight ? String(this.titleHight).replace(/[^0-9]/ig, "") : '';
        },
        titleStyle_() {
            let fontSizes = this.formatData(this.titleSize);
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
        },
    },
    methods: {
        toggleRowSelection(item, flag = 'toggle') {
            const newFlag = Boolean(flag)
            const index = this.list.findIndex(o => o.id === item.id)
            if (index === -1) return
            this.$set(this.list[index], '_checked', flag === 'toggle' ? !o.checked : newFlag)
        },
        formatData(any, oAny, existZero = false) {
            any = existZero ? (any !== undefined ? any : oAny) : (any || oAny);
            any = String(any).split(',');
            if (any.length < 2) {
                any.push(any[0]);
            }
            return any;
        },
        addUnit(arr, dVal = 0) {
            var val = this.mode === 'column' ? arr[0] : arr[1];
            return this.$c.formatUnit(val, 'rpx', dVal);
        },
        goDetial(item) {
            let routeName = "",
                id = "",
                params = {};
            switch (this.type) {
                case "decoration":
                    routeName = 'decorationDetails';
                    id = item.id;
                    break;
                case "setMeal":
                    routeName = 'setMealDetails';
                    id = item.id;
                    break;
                case "case":
                    routeName = 'caseDetails';
                    id = item.id;
                    break;
                case "group":
                    routeName = 'groupDetails';
                    params.activity_id = item.id;
                    params.activity_type = item.activity_type;
                    id = item.goods_id;
                    break;
                case "groupDetails":
                    routeName = 'groupDetails';
                    params.activity_id = item.id;
                    params.activity_type = item.activity_type;
                    params.activity_order_id = item.order_id;
                    id = item.goods_id;
                    break;
                case "seckill":
                    params.activity_id = item.id;
                    params.activity_type = item.activity_type;
                    routeName = 'seckillDetails';
                    id = item.goods_id;
                    break;
                case "giftPack":
                    params.activity_id = item.id;
                    params.activity_type = item.activity_type;
                    routeName = 'goodsDetails';
                    id = item.goods_id;
                    break;
                case "integral":
                    params.activity_id = item.id;
                    params.activity_type = item.activity_type;
                    routeName = 'integralDetails';
                    id = item.goods_id;
                    break;
                default:
                    routeName = 'goodsDetails';
                    id = item.id;

            }
            this.$emit('select', {
                type: 'click',
                detail: item
            })
            // if(this.type === 'customer') return
            this.$jumpDetail(routeName, id, params);
        },
        handleShare(e) {
            let item = e.detail.value
            this.goods_name = item.goods_name;
            this.goods_img = item.goods_img;
            this.shareUrl = `/goods/details/index?detailId=${item.id}`
            this.shareFlag = true;
            this.$emit("share", {
                detail: {
                    value: item
                }
            })
        },
        addShopCar(e) {
            console.log(e);
            this.specFlag = true;
            this.specData = e.detail;
            console.log(this.specData);
            // this.$emit("handleAddCar", {
            // 	detail: {
            // 		value: item
            // 	}
            // })
        }
    }

}
</script>

<template>
    <view>
        <!-- 头部导航 star -->
        <sub-home-header
            v-if="cmptId_ === 'sub-home-header'"
            :config="cmptConfig_"
        />
        <!-- 头部导航 end -->

        <!-- banner图 -->
        <sub-home-banner
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-banner'"
        />

        <!-- 特色服务 -->
        <sub-home-special-service
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-special-service'"
        />

        <!-- 三宫格 -->
        <sub-home-three-palace-grid
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-three-palace-grid'"
        />

        <!-- 案例 -->
        <sub-home-decoration-cases
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-decoration-cases'"
        />

        <!-- 设计师 -->
        <sub-home-designer
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-designer'"
        />

        <!-- 套餐包 -->
        <sub-home-package
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-package'"
        />

        <!-- 导航栏模块 -->
        <sub-home-matrix-menu
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-matrix-menu'"
        />

        <!-- 新人专享 -->
        <sub-home-new-gift-pack
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-new-gift-pack'"
        />

        <!-- 秒杀 -->
        <sub-home-seckill
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-seckill'"
        />

        <!-- 拼团 -->
        <sub-home-group-buying
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-group-buying'"
        />

        <!-- 拼团(新) -->
        <sub-home-group-buying-new
            v-if="cmptId_ === 'sub-home-group-buying-new'"
            :config="cmptConfig_"
        />

        <!-- 小广告 -->
        <sub-home-small-ad
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-small-ad'"
        />

        <!-- 3d展厅-->
        <sub-home-room-three
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-room-three'"
        />

        <!-- 四宫格 -->
        <sub-home-tetragonal-grid
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-tetragonal-grid'"
        />

        <!-- 专题 -->
        <sub-home-special
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-special'"
        />
        <!-- 热销爆款 -->
        <sub-home-hot-sale
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-hot-sale'"
        />  
        <!-- 爆品 -->
        <sub-home-hot-sale-goods
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-hot-sale-goods'"
        />
        <!-- 定制服务 -->
        <sub-home-custom-service
            v-else-if="cmptId_ === 'sub-home-custom-service'"
            :config="cmptConfig_"
        ></sub-home-custom-service>

        <!-- 施工团队 -->
        <sub-home-construction-team
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-construction-team'"
        />

        <!-- 施工工艺 -->
        <sub-home-construction-technology
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-construction-technology'"
        />

        <!-- 预约活动 -->
        <sub-home-decoration-activities
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-decoration-activities'"
        />

        <!-- 店铺信息 -->
        <sub-home-shop-info
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-shop-info'"
        />

        <!-- 公司简介 -->
        <sub-home-company-profile
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-company-profile'"
        />

        <!-- 公司动态 -->
        <sub-home-news
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-news'"
        />

        <!-- 侧边菜单，客服 -->
        <sub-home-slide-menu
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-slide-menu'"
        />

        <!-- 新人红包 -->
        <sub-home-red-paket
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-red-paket'"
        />

        <!-- 分类推荐商品 -->
        <sub-home-recommend-cate-goods
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-recommend-cate-goods'"
            @change="handleRecmdChange"
        />

        <!-- 企业荣誉 -->
        <sub-home-honor
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-honor'"
        />

        <!-- 卖场-快报 -->
        <sub-home-market-news
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-market-news'"
        />

        <!-- 卖场-优惠券 -->
        <sub-home-market-coupons
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-market-coupons'"
        />

        <!-- 卖场-店铺推荐 -->
        <sub-home-market-shops
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-market-shops'"
        />

        <!-- 卖场-直播专场 -->
        <sub-home-market-lives
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-market-lives'"
        />

        <sub-home-magic-square
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-magic-square'"
        />
        <!-- 模块间距 -->
        <sub-home-separation
            v-if="cmptId_ === 'sub-home-separation'"
            :config="cmptConfig_"
            class="separation"
        />
        <!-- 示例 富文本 -->
        <sub-home-rich-text
            v-if="cmptId_ === 'sub-home-rick'"
            :config="cmptConfig_"
        />
        <!-- 倒计时 -->
        <sub-home-count-down
            v-if="cmptId_ === 'sub-home-count-down'"
            :config="cmptConfig_"
        />
        <!-- 搜索框 -->
        <sub-home-search-wrap
            v-if="cmptId_ === 'sub-home-search-wrap'"
            :config="cmptConfig_"
        />
        <!-- 视频播放 -->
        <sub-home-video
            :config="cmptConfig_"
            v-if="cmptId_ === 'sub-home-video'"
        />
        <!-- 推荐商品 -->
        <gc-recommend-goods
            v-if="cmptId_ === 'c-recommend-goods' && ajaxName"
            :config="cmptConfig_"
            :title="cmptConfig_.title"
            :ajaxParams="ajaxParams_"
            :ajaxName="ajaxName"
        />
        <!-- 模块标题 -->
        <sub-home-module-title
            v-if="cmptId_ === 'sub-home-module-title'"
            :config="cmptConfig_"
        />
        <!-- 商品 -->
        <sub-home-goods
            v-if="cmptId_ === 'sub-home-goods'"
            :config="cmptConfig_"
        />
        <!-- 自定义表单 -->
        <sub-home-define-form
            v-if="cmptId_ === 'sub-home-define-form'"
            :config="cmptConfig_"
        />
        <!-- 最高可申请表单 -->
        <sub-home-define-form-layout
            v-if="cmptId_ === 'sub-home-define-form-layout'"
            :config="cmptConfig_"
        />

        <!-- 分类/关键词 -->
        <sub-home-category
            v-if="cmptId_ === 'sub-home-category'"
            :config="cmptConfig_"
        />

        <!-- 分享 -->
        <sub-home-share
            v-if="cmptId_ === 'sub-home-share'"
            :config="cmptConfig_"
        />
    </view>
</template>

<script>
export default {
    data() {
        return {
            pageIndex: 0,
            brandData: [],
            cateData: [],
            ajaxName: 'recommendGoods'
        }
    },
    props: {
        //组件名称id
        config: {
            type: Object,
            default: () => {
                return {}
            }
        },
        cmptId: {
            type: String,
            default: ''
        },
        value: {
            type: Object,
            default: () => {
                return {
                    cat_id: -1,
                    pageIndex: 0
                }
            }
        },
        mode: {
            type: String,
            default: ''
        },
        module_no: {
            type: [Number, String],
            default: ''
        },
        apiParam: {
            type: Object,
            default: () => {
                return {}
            }
        },
        isPreview: {
            type: Boolean,
            default: false
        },
        timeStamp: {
            type: [String, Number],
            default: ''
        },
        module_name: {
            type: String,
            default: ''
        }
    },
    computed: {
        cmptConfig_() {
            let cmptConfig = { ...this.config, timeStamp: this.timeStamp, module: this.config.module_name || this.config.module };
            return cmptConfig
        },
        shopHomeData() {
            return this.$store.state.shopHomeData
        },
        cmptId_() {
            return this.cmptConfig_.cmptId;
        },
        ajaxParams_() {
            return {
                goods_category_id: this.value.cat_id,
                limit: this.apiParam.limit || 4,
                timeStamp: this.timeStamp,
                request_example: 1
            }
        },
        // 是否是头部分类关联的组件
        cateAssCmpt_() {
            return ['sub-home-header-cate', 'sub-home-header-cate-collapse'].includes(this.cmptId_)
        }
    },
    mounted() {
        // console.log(this.cmptId);
    },
    methods: {
        // 分类组件切换
        handleRecmdChange() {

        }
    }
}
</script>

<style lang="scss" scoped>
.separation {
    background: transparent;
}
</style>

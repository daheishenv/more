<template>
    <view class="share-wechat-box">
        <c-popup
            v-model="modalFlag"
            mode="bottom"
            show-close="false"
            height="100%"
            bg-color="transparent"
            :mask-bg-color="maskBgColor"
            :mask="mask"
            :z-index="zIndex"
        >
            <view
                class="share-wechat"
                @touchmove.stop.prevent
            >
                <view
                    class="share-wechat-clear-header"
                    :style="{
                        paddingTop: clearHeaderHeight +'px'
                    }"
                >
                    <c-status-bar />
                </view>
                <view
                    class="share-wechat-hd"
                    @click="handleCancel"
                >
                    <template v-if="!isCreatePost && poster.finalPath">
                        <view
                            id="poster-box"
                            class="share-wechat-hd__box"
                            :style="{
                                transform: `scale(${scale})`,
                                opacity: 1
                            }"
                            @click.stop
                        >
                            <c-image
                                v-if="poster.finalPath"
                                :radius="posterRadius"
                                mode="heightFix"
                                :src="poster.finalPath"
                                show-menu-by-longpress
                                @click="preview(poster.finalPath)"
                            />
                        </view>
                        <view class="share-wechat-hd__text">{{ saveTips }}</view>
                    </template>
                </view>
                <view class="share-menu">
                    <template v-if="mode !== 'plotter'">
                        <view class="share-menu-title">
                            <view class="share-menu-title__left">
                                <c-image
                                    src="share/header-left.png"
                                    width="240"
                                    height="84"
                                    mode="heightFix"
                                />
                                <text class="share-menu-title__title">分享至</text>
                            </view>
                            <view
                                class="share-menu-title__right"
                                :style="[titleStyle_]"
                                :class="[mode !== 'article' ? 'flex align-center' : 'flex-column justify-center']"
                            >
                                <slot name="header">
                                    <view
                                        v-if="title"
                                        :class="[mode !== 'article' ? 'flex-1' : 'plr24']"
                                    ><text class="title-elli">{{ title }}</text></view>
                                    <slot name="headerRight">
                                        <view
                                            v-if="['goods', 'group', 'skill'].includes(mode)"
                                            class="share-menu-bd__price line-block"
                                        >
                                            <view
                                                class="price-com"
                                                data-price_prefix="￥"
                                            >
                                                {{ goodsInfo[priceKey] }}
                                                <text class="share-menu-bd__price--small">{{ goodsInfo.price_show_unit }}</text>
                                            </view>
                                        </view>
                                        <view
                                            v-else-if="mode === 'integral'"
                                            class="share-menu-bd__price line-block"
                                        >
                                            <view class="flex align-center">
                                                <c-image
                                                    src="integral/gold-coin.png"
                                                    size="30"
                                                />
                                                <view class="integral-num">
                                                    {{ goodsInfo.credit }}
                                                </view>
                                            </view>
                                        </view>
                                        <view
                                            v-else-if="mode ==='live'"
                                            class="flex-1 line-block"
                                        >
                                            <view class="flex align-center">
                                                <c-image
                                                    size="48"
                                                    radius="24"
                                                    :src="playerInfo.anchor.headingimg"
                                                />
                                                <text class="ml12 c-ellipsis">{{ playerInfo.anchor.wechat_nickname }}</text>
                                            </view>
                                        </view>
                                    </slot>
                                </slot>
                            </view>
                        </view>
                        <view class="share-menu-bd">
                            <!-- #ifdef MP-WEIXIN -->
                            <view class="share-menu-bd__item">
                                <c-button
                                    open-type="share"
                                    height="142"
                                >
                                    <view class="flex-column align-center">
                                        <c-image
                                            size="90"
                                            src="common/wechat-share.png"
                                        ></c-image>
                                        <text class="share-menu-bd__text">分享给好友</text>
                                    </view>
                                </c-button>
                            </view>
                            <!-- #endif -->

                            <!-- #ifdef APP-PLUS -->
                            <view
                                class="share-menu-bd__item"
                                @click="hanlderAppShare('WXSceneSession')"
                            >
                                <c-image
                                    size="90"
                                    src="common/wechat-share.png"
                                ></c-image>
                                <text class="share-menu-bd__text">分享给好友</text>
                            </view>
                            <view
                                class="share-menu-bd__item"
                                @click="hanlderAppShare('WXSenceTimeline')"
                            >
                                <c-image
                                    size="90"
                                    src="common/wechat-timeline.png"
                                ></c-image>
                                <text class="share-menu-bd__text">分享到朋友圈</text>
                            </view>
                            <!-- #endif -->

                            <!-- #ifdef H5 -->
                            <template v-if="$isWechatBrowser">
                                <view
                                    class="share-menu-bd__item"
                                    @click="handleShowPoster('h5')"
                                >
                                    <c-image
                                        size="90"
                                        src="common/wechat-share.png"
                                    ></c-image>
                                    <text class="share-menu-bd__text">分享给好友</text>
                                </view>
                                <view
                                    class="share-menu-bd__item"
                                    @click="handleShowPoster('h5')"
                                >
                                    <c-image
                                        size="90"
                                        src="common/wechat-timeline.png"
                                    ></c-image>
                                    <text class="share-menu-bd__text">分享到朋友圈</text>
                                </view>
                            </template>
                            <!-- #endif -->

                            <view
                                v-if="showPoster_"
                                class="share-menu-bd__item"
                                @click="handleShowPoster('posters')"
                            >
                                <c-image
                                    size="90"
                                    src="common/share-poster.png"
                                ></c-image>
                                <text class="share-menu-bd__text">生成分享海报</text>
                            </view>
                        </view>
                        <view class="share-menu-ft">
                            <view class="c-underline__top">
                                <c-button
                                    size="large"
                                    @click="handleCancel"
                                >
                                    <text class="c-999">取消</text>
                                </c-button>
                            </view>
                        </view>
                    </template>
                    <template v-else>
                        <!-- 海报 -->
                        <!-- #ifdef MP-WEIXIN -->
                        <c-fixed-menu
                            position="bottom"
                            height="136"
                        >
                            <view class="flex p24">
                                <view class="flex-1">
                                    <c-colors
                                        :theme="['t', '#fff']"
                                        :pro="['bgc', 'c']"
                                        type="button"
                                        @click="handleDowmload"
                                    >
                                        <c-button
                                            size="large"
                                            radius="16"
                                            form-type="submit"
                                        >
                                            <c-icons
                                                size="36"
                                                type="icon-xiazai"
                                                class="mr8"
                                            />保存海报
                                        </c-button>
                                    </c-colors>
                                </view>
                            </view>
                        </c-fixed-menu>
                        <!-- #endif -->
                    </template>
                </view>
            </view>
        </c-popup>
        <canvas
            v-if="!poster.finalPath"
            class="share-wechat__hide"
            canvas-id="testShareType"
            :style="{ 
                width: (poster.width || 640) + 'px',
                height: (poster.height || 940) + 'px'
            }"
        />

        <!-- 微信H5的黑窗口提示 -->
        <c-popup
            v-model="shareH5"
            mode="cover"
            show-close="false"
            bg-color="transparent"
        >
            <view>
                <view class="share-wechat-h5__img">
                    <c-image
                        width="435"
                        src="common/share-tips.png"
                        mode="widthFix"
                    />
                </view>
                <view class="share-wechat-h5__btn">
                    <c-colors
                        :theme="['#fff', '#fff']"
                        :pro="['bdc', 'c']"
                        radius="38"
                        type="button"
                    >
                        <c-button
                            plain
                            @click="handleCancel"
                        >我知道了</c-button>
                    </c-colors>
                </view>
            </view>
        </c-popup>
    </view>
</template>
<script>
// #ifdef APP-PLUS
import shareFn from '@/common/mixins/share'
// #endif
import { mapState } from 'vuex'
import { getSharePoster, drawAbort } from 'zzsp-saas-ui/common/utils/cavasTool/QS-SharePoster'
let systemInfo = null
export default {
    options: {
        styleIsolation: 'shared'
    },
    props: {
        /**
         * 海报类型：
         * goods 商品相关
         * live 直播相关
         * article 文章咨询相关
         * plotter 海报列表
         * skill 秒杀
        */
        mode: {
            type: String,
            default: 'goods'
        },
        shareDesc: {
            type: String,
            default: '长按图片，可快捷转发哦～'
        },
        zIndex: {
            type: [String, Number],
            default: 999
        },
        /**
         * 控制弹窗显示隐藏
         */
        value: {
            type: Boolean,
            default: false
        },
        /**
         * 分享海报标题
         */
        title: {
            type: String,
            default: ''
        },
        titleStyle: {
            type: Object,
            default: () => {
                return {
                    backgroundColor: 't'
                }
            }
        },
        /**
         * 分享描述
         */
        summary: {
            type: String,
            default: '长按识别或扫码看详情'
        },
        /**
         * 分享主图
         */
        shareImg: {
            type: String,
            default: ''
        },
        /**
         * 分享的页面url，图片上面的二维码
         */
        shareUrl: {
            type: String,
            default: ''
        },
        /**
         *	商品相关的信息
         */
        goodsInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
        /**
         * 展示生成海报按钮
         */
        showPoster: {
            type: [Boolean, String],
            default: true
        },
        mask: {
            type: [Boolean, String],
            default: true
        },
        // 遮罩层
        maskBgColor: {
            type: String,
            default: 'rgba(0, 0, 0, 0.55)'
        },
        posterMargin: {
            type: [String, Number],
            default: 24
        },
        posterBg: {
            type: String,
            default: '#fff'
        },
        /**
         * 主播信息
         */
        playerInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
        /**
         * 显示边框
         */
        showBorder: {
            type: [Boolean, String],
            default: true
        },
        canvasBg: {
            type: String,
            default: '#fff'
        },
        saveTips: {
            type: String,
            default: '长按图片，可快捷转发哦～'
        },
        // 是否点击关闭弹窗
        clickClose: {
            type: [Boolean, String],
            default: true
        },
        // 
        posterRadius: {
            type: [Number, String],
            default: 16
        },
        priceKey: {
            type: String,
            default: 'price_show'
        }
    },
    data() {
        return {
            modalFlag: false,
            isCreatePost: false, // 是否正在生成海报
            poster: {},
            canvasId: 'testShareType',
            userInfo: {},
            qrCode: '', // 小程序码
            defaultColors: {
                theme: '#FF5D0C',
                subColor1: '#FFAE37',
                subColor2: '#FF5D0C'
            },
            showStep: false,
            scale: 1,
            shareH5: false,
            clearHeaderHeight: 0 // 0表示存在顶部导航栏
        }
    },
    computed: {
        ...mapState({
            shopConfig_: (state) => (state.config.shopConfig ? state.config.shopConfig : null),
            shopInfo_: (state) => (state.config.shopInfo ? state.config.shopInfo : {})
        }),
        colors_() {
            return this.shopConfig_?.color || this.defaultColors
        },
        showBorder_() {
            return String(this.showBorder) !== 'false'
        },
        showPoster_() {
            return String(this.showPoster) !== 'false'
        },
        titleStyle_() {
            const titleStyle = {}
            const colorsMap = new Map([
                ['t', 'theme'],
                ['s1', 'subColor1'],
                ['s2', 'subColor2']
            ])
            if (this.titleStyle.backgroundColor) {
                titleStyle.backgroundColor = colorsMap.has(this.titleStyle.backgroundColor) && this.colors_ ? this.colors_[colorsMap.get(this.titleStyle.backgroundColor)] : titleStyle.backgroundColor
            }
            if (this.titleStyle.color) {
                titleStyle.color = colorsMap.has(this.titleStyle.color) && this.colors_ ? this.colors_[colorsMap.get(this.titleStyle.color)] : titleStyle.color
            }
            return {
                ...this.titleStyle,
                ...titleStyle
            }
        }
    },
    watch: {
        value: {
            async handler(val) {
                if (val) {
                    this.modalFlag = true
                }
            },
            immediate: true
        },
        modalFlag(val) {
            this.$emit('input', val)
            this.$emit('change', val)
            if (!val) {
                drawAbort()
            }
        },
        /**
         * 分享主图改变时重置绘画
         */
        shareImg(val) {
            this.poster = {}
        },
        playerInfo() {
            this.poster = {}
        },
        goodsInfo() {
            this.poster = {}
        }
    },
    beforeDestroy() {
        drawAbort()
    },
    created() {
        systemInfo = uni.getSystemInfoSync()
        this.getClearHeaderHeight()
    },
    methods: {
        handleDowmload() {
            this.$emit('save')
        },
        hanlderAppShare(val) {
            // #ifdef APP-PLUS
            shareFn.call(this, val)
            // #endif
        },
        async getClearHeaderHeight() {
            this.clearHeaderHeight = systemInfo.screenHeight === systemInfo.windowHeight ? 44 : 0
            if (this.clearHeaderHeight === 0) {
                const data = await this.$c.getRect.call(this.$root, '.c-page-head')
                // 说明页面里面含有自定义头部
                if (data) {
                    this.clearHeaderHeight = 44
                }
            }
        },
        /**
         * @name 清除已经生成的海报
         */
        clear() {
            this.poster.finalPath = ''
        },
        /**
         * @name 获取用户信息
         */
        async getUserInfo() {
            const { data } = await this.$http('userInfo')
            this.userInfo = data
        },
        /**
         * @name 海报生成
         */
        async handleShowPoster(val) {
            if (val === 'h5') {
                this.shareH5 = true
                this.modalFlag = false
            } else if (val === 'posters') {
                if (this.poster.finalPath || this.isCreatePost) return
                try {
                    this.isCreatePost = true
                    this.scale = 1
                    await this.shareFc()
                    this.isCreatePost = false
                    if (this.poster.finalPath) {
                        this.$nextTick(async () => {
                            const data = await this.$c.getRect.call(this, '#poster-box')
                            const u48 = uni.upx2px(200)
                            if (data && data.width > systemInfo.screenWidth - u48) {
                                this.scale = (systemInfo.screenWidth / (data.width + u48)).toFixed(2)
                            } else {
                                this.scale = 1
                            }
                        })
                    }
                } catch (error) {
                    this.isCreatePost = false
                }
            } else if (this.mode === 'content') this.$emit('outerFlag', val)
        },
        /**
         * @name 取消按钮触发函数
         */
        handleCancel() {
            if (!this.clickClose) return
            this.modalFlag = false
            this.shareH5 = false
            this.sharePosters = false
        },
        /**
         * @name 获取太阳码
         */
        async getShareQrcode(httpName) {
            const page = this.$c.getUrlQuery(this.shareUrl || `${this.$Route.path}${this.$c.parse(this.$Route.query)}`)
            page.query.source_type = this.$Route?.meta?.relate_type || 99
            page.query.source_id = page.query.detailId
            const { data: { src = '' } } = await this.$http(httpName, {
                page: `${page.path}${this.$c.parse(page.query)}`
            })
            this.qrCode = src
        },
        /**
         * @name 生成海报的方法
         */
        async shareFc() {
            if (this.poster.finalPath) return
            // #ifdef MP-WEIXIN
            await this.getShareQrcode('getShareQrcode')
            // #endif
            // #ifndef MP-WEIXIN
            await this.getShareQrcode('getH5ShareQrcode')
            // #endif
            if (!this.qrCode) {
                this.$toast('获取小程序二维码失败')
                return
            }
            await this.getUserInfo()
            // 内容外边距
            const posterMargin = Number(this.posterMargin || 0)
            // 内容内边距
            const ctxPadding = posterMargin + 0
            // 海报默认宽
            const posterWidth = 548
            // 海报默认高
            const posterHeight = 500
            // 二维码大小（H5有白边，所以设置大一点）
            let qrcodeInfo = {
                dWidth: 112,
                dHeight: 112
            }
            // #ifndef H5
            qrcodeInfo = {
                dWidth: 100,
                dHeight: 100
            }
            console.log('this.colors_.subColor2', this.colors_.subColor2)
            console.log(this.goodsInfo)
            // #endif
            try {
                const d = await getSharePoster({
                    _this: this, // 若在组件中使用 必传
                    type: 1,
                    background: {
                        // 设置自定义背景画布, 若传该属性则背景图失效
                        width: posterWidth, // 画布宽度
                        height: posterHeight, // 画布高度
                        backgroundColor: this.posterBg // 背景颜色
                    },
                    bgScale: 1,
                    posterCanvasId: this.canvasId, // canvasId
                    drawArray: () => {
                        return new Promise((rs, rj) => {
                            const postArr = [
                                // 分享主图
                                {
                                    type: 'image',
                                    url: this.proxyImgUrl_ + this.shareImg,
                                    dx: ctxPadding,
                                    dy: ctxPadding,
                                    dWidth: posterWidth - 2 * ctxPadding,
                                    roundRectSet: {
                                        r: [this.posterRadius, this.posterRadius, 0, 0]
                                    },
                                    serialNum: 10,
                                    id: 'shareImg',
                                    // 动态设置自身的宽高
                                    infoCallBack: (info) => {
                                        const { width, height } = info
                                        const calcHeight = parseInt(((posterWidth - 2 * ctxPadding) / width) * height)
                                        const params = {
                                            dHeight: calcHeight
                                        }
                                        return params
                                    },
                                    allInfoCallback: ({ drawArray }) => {
                                        console.log('所有信息:', drawArray)
                                        return new Promise((resolve) => {
                                            const titleEl = drawArray.find(item => item.id === 'playerTitle')
                                            const shareImgEl = drawArray.find(item => item.id === 'shareImg')
                                            shareImgEl.dy = ctxPadding
                                            // 是否存在主播消息，如果存在，则dy会被改变
                                            if (titleEl) {
                                                shareImgEl.dy = this.getNodeHeight(drawArray, 'playerTitle') + 6
                                            }
                                            resolve(shareImgEl)
                                        })
                                    }
                                },
                                // 昵称
                                {
                                    type: 'text',
                                    text: this.userInfo.nick_name || this.userInfo.mobile,
                                    size: 22,
                                    color: '#333',
                                    textBaseline: 'top',
                                    lineFeed: {
                                        lineNum: 1,
                                        maxWidth: this.mode === 'plotter' ? 200 : 110
                                    },
                                    zIndex: 2,
                                    serialNum: 998, // 这个值只要大于类型type非image的个数就行
                                    id: 'userName',
                                    allInfoCallback: ({ drawArray }) => {
                                        return new Promise((resolve) => {
                                            const offsetY = systemInfo.platform === 'devtools' ? 20 : (systemInfo.platform === 'ios' ? 16 : 14)
                                            resolve(this.dynamicCalcLocal({
                                                drawArray,
                                                rId: 'avatarImg',
                                                tId: 'userName',
                                                isSameLine: true,
                                                offset: {
                                                    x: 16,
                                                    y: offsetY
                                                }
                                            }))
                                        })
                                    }
                                },
                                // 昵称下面的矩形
                                {
                                    type: 'roundFillRect',
                                    url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                    circleSet: true,
                                    zIndex: 1,
                                    height: 58,
                                    r: 29,
                                    serialNum: 999, // 这个值只要大于类型type非image的个数就行
                                    id: 'userNameRect',
                                    backgroundColor: '#F7F8F9',
                                    allInfoCallback: ({ drawArray }) => {
                                        return new Promise((resolve) => {
                                            const { textLength, lineFeed } = drawArray.find(o => o.id === 'userName')
                                            const maxWidth = textLength > lineFeed.maxWidth ? lineFeed.maxWidth : textLength
                                            resolve({
                                                ...this.dynamicCalcLocal({
                                                    drawArray,
                                                    rId: 'avatarImg',
                                                    tId: 'userNameRect',
                                                    isSameLine: true,
                                                    offset: {
                                                        x: -45,
                                                        y: 0
                                                    }
                                                }),
                                                width: Math.ceil(maxWidth + 90)
                                            })
                                        })
                                    }
                                }
                            ]
                            switch (this.mode) {
                                case 'goods':
                                    postArr.push(
                                        // 标题
                                        {
                                            type: 'text',
                                            text: this.title,
                                            size: 26,
                                            color: '#333',
                                            textBaseline: 'top',
                                            serialNum: 12,
                                            id: 'posterName', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcPosterNameInfo({ drawArray, ctxPadding }))
                                                })
                                            }
                                        },
                                        // 售价符号
                                        {
                                            type: 'text',
                                            text: this.goodsInfo[this.priceKey] && this.goodsInfo[this.priceKey] !== '???' ? this.pricePrefix_ : '',
                                            size: 26,
                                            color: this.colors_.subColor2,
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            serialNum: 13,
                                            lineFeed: {
                                                lineHeight: 30
                                            },
                                            id: 'priceShowSymbol', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcPriceShowSymbolInfo({ drawArray }))
                                                })
                                            }
                                        },
                                        // 售价
                                        {
                                            type: 'text',
                                            text: this.goodsInfo[this.priceKey] || '',
                                            size: 40,
                                            color: this.colors_.subColor2,
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            lineFeed: {
                                                lineHeight: 40
                                            },
                                            serialNum: 14,
                                            id: 'priceShow', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'priceShowSymbol',
                                                        tId: 'priceShow',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 0,
                                                            y: -10
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 售价单位
                                        {
                                            type: 'text',
                                            text: this.goodsInfo[this.priceKey] && this.goodsInfo[this.priceKey] !== '???' ? this.goodsInfo.price_show_unit : '',
                                            size: 24,
                                            color: this.colors_.subColor2,
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            serialNum: 15,
                                            id: 'priceShowUnit', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'priceShow',
                                                        tId: 'priceShowUnit',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 0,
                                                            y: 10
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 市场格
                                        {
                                            type: 'text',
                                            text: this.goodsInfo.price_market ? `${this.pricePrefix_}${this.goodsInfo.price_market}${this.goodsInfo.price_show_unit
                                                }` : '',
                                            size: 24,
                                            color: '#999',
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            serialNum: 16,
                                            lineFeed: {
                                                lineHeight: 24
                                            },
                                            lineThrough: {
                                                width: 1,
                                                color: '#999'
                                            },
                                            id: 'priceMarket', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'priceShowUnit',
                                                        tId: 'priceMarket',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 8,
                                                            y: 2
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 二维码
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.qrCode,
                                            ...qrcodeInfo,
                                            serialNum: 100,
                                            id: 'imgBarcode',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const posterNameInfo = this.getNodeInfo(drawArray, 'posterName')
                                                    let offsetY = 50
                                                    let offsetX = 12
                                                    // #ifndef H5
                                                    offsetY = 62
                                                    offsetX = 4
                                                    // #endif
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'imgBarcode',
                                                        offset: {
                                                            x: posterNameInfo.width - qrcodeInfo.dWidth + offsetX,
                                                            y: offsetY
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 长按识别
                                        {
                                            type: 'text',
                                            text: this.summary,
                                            size: 22,
                                            color: '#999',
                                            textAlign: 'center',
                                            serialNum: 101,
                                            lineFeed: {
                                                lineHeight: 22
                                            },
                                            id: 'longTips', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        tId: 'longTips',
                                                        offset: {
                                                            x: qrcodeInfo.dWidth / 2,
                                                            y: 20
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 头像
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                            dWidth: 58,
                                            dHeight: 58,
                                            circleSet: true,
                                            zIndex: 2,
                                            serialNum: 105, // 这个值只要大于类型type非image的个数就行
                                            id: 'avatarImg',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const tempEl = this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        tId: 'avatarImg',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    })
                                                    const resEl = this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    })
                                                    resEl.dy = tempEl.dy + (qrcodeInfo.dHeight - 58)
                                                    resolve(resEl)
                                                })
                                            }
                                        }
                                    )
                                    break
                                case 'live':
                                    postArr.push(
                                        // 主播头像
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.playerInfo.anchor.headingimg,
                                            dx: ctxPadding,
                                            dy: ctxPadding,
                                            dWidth: 72,
                                            dHeight: 72,
                                            circleSet: true,
                                            id: 'playerImg'
                                        },
                                        // 主播名称
                                        {
                                            type: 'text',
                                            text: `主播: ${this.playerInfo.anchor.wechat_nickname || '张伟'}`,
                                            size: 28,
                                            color: '#333',
                                            textBaseline: 'top',
                                            lineFeed: {
                                                maxWidth: posterWidth - 2 * ctxPadding - 16 - 72,
                                                lineNum: 1
                                            },
                                            id: 'playerName',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'playerImg',
                                                        tId: 'playerName',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 16,
                                                            y: 22
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 直播间标题
                                        {
                                            type: 'text',
                                            text: this.title,
                                            size: 30,
                                            color: '#333',
                                            fontWeight: 'bold',
                                            lineFeed: {
                                                maxWidth: posterWidth - 2 * ctxPadding,
                                                lineNum: 2,
                                                lineHeight: 42
                                            },
                                            textBaseline: 'top',
                                            id: 'playerTitle',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'playerImg',
                                                        tId: 'playerTitle',
                                                        offset: {
                                                            x: 0,
                                                            y: 16
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 二维码
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.qrCode,
                                            ...qrcodeInfo,
                                            serialNum: 100,
                                            id: 'imgBarcode',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const posterImgInfo = this.getNodeInfo(drawArray, 'shareImg')
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'shareImg',
                                                        tId: 'imgBarcode',
                                                        offset: {
                                                            x: posterImgInfo.width - qrcodeInfo.dWidth - 24,
                                                            y: 20
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 长按识别
                                        {
                                            type: 'text',
                                            text: this.summary,
                                            size: 20,
                                            color: '#333',
                                            textAlign: 'right',
                                            serialNum: 101,
                                            id: 'longTips', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcLongTipsInfo({ drawArray, qrcodeInfo }))
                                                })
                                            }
                                        },
                                        // 分隔线
                                        {
                                            type: 'fillRect',
                                            backgroundColor: '#DFDFDF',
                                            width: 1,
                                            height: 76,
                                            serialNum: 102,
                                            id: 'line',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const longTips = this.getNodeInfo(drawArray, 'longTips')
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        tId: 'line',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: -(qrcodeInfo.dWidth + longTips.width + 24),
                                                            y: (qrcodeInfo.dHeight - 76) / 2
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 头像
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                            dWidth: 58,
                                            dHeight: 58,
                                            circleSet: true,
                                            zIndex: 2,
                                            serialNum: 101, // 这个值只要大于类型type非image的个数就行
                                            id: 'avatarImg',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'shareImg',
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 24,
                                                            y: 24
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 邀请语
                                        {
                                            type: 'text',
                                            text: '邀请您进入直播间',
                                            size: 22,
                                            color: '#999',
                                            textBaseline: 'top',
                                            lineFeed: {
                                                maxWidth: 202,
                                                lineNum: 1
                                            },
                                            serialNum: 103,
                                            id: 'summary',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'avatarImg',
                                                        tId: 'summary',
                                                        offset: {
                                                            x: 0,
                                                            y: 12
                                                        }
                                                    }))
                                                })
                                            }
                                        })
                                    break
                                case 'article':
                                    postArr.push(
                                        // 文章标题
                                        {
                                            type: 'text',
                                            text: this.title,
                                            size: 26,
                                            color: '#333',
                                            serialNum: 99,
                                            textBaseline: 'top',
                                            id: 'posterName',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcPosterNameInfo({ drawArray, ctxPadding }))
                                                })
                                            }
                                        },
                                        // 二维码
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.qrCode,
                                            ...qrcodeInfo,
                                            serialNum: 100,
                                            id: 'imgBarcode',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const posterNameInfo = this.getNodeInfo(drawArray, 'posterName')
                                                    let offsetX = 0
                                                    let offsetY = 0
                                                    // #ifndef H5
                                                    offsetY = 22
                                                    offsetX = -6
                                                    // #endif
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'imgBarcode',
                                                        offset: {
                                                            x: posterNameInfo.width - qrcodeInfo.dWidth - offsetX,
                                                            y: offsetY
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 长按识别
                                        {
                                            type: 'text',
                                            text: this.summary,
                                            size: 20,
                                            color: '#333',
                                            textAlign: 'right',
                                            serialNum: 101,
                                            id: 'longTips', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcLongTipsInfo({ drawArray, qrcodeInfo }))
                                                })
                                            }
                                        },
                                        // 分隔线
                                        {
                                            type: 'fillRect',
                                            backgroundColor: '#DFDFDF',
                                            width: 1,
                                            height: 76,
                                            serialNum: 102,
                                            id: 'line',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    let offsetX = 16
                                                    // #ifndef H5
                                                    offsetX = 24
                                                    // #endif
                                                    const longTips = this.getNodeInfo(drawArray, 'longTips')
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        tId: 'line',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: -(qrcodeInfo.dWidth + longTips.width + offsetX),
                                                            y: (qrcodeInfo.dHeight - 76) / 2
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 头像
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                            dWidth: 58,
                                            dHeight: 58,
                                            circleSet: true,
                                            zIndex: 2,
                                            serialNum: 101, // 这个值只要大于类型type非image的个数就行
                                            id: 'avatarImg',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const tempEl = this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        isSameLine: true,
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    })
                                                    const resEl = this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    })
                                                    resEl.dy = tempEl.dy + (qrcodeInfo.dHeight - 58) / 2
                                                    resolve(resEl)
                                                })
                                            }
                                        })
                                    break
                                case 'group':
                                case 'skill':
                                    // 拼团、秒杀
                                    postArr.push( // 标题
                                        {
                                            type: 'text',
                                            text: this.title,
                                            size: 26,
                                            color: '#333',
                                            serialNum: 11,
                                            textBaseline: 'top',
                                            zIndex: 2,
                                            id: 'posterName', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcPosterNameInfo({ drawArray, ctxPadding }))
                                                })
                                            }
                                        },
                                        // 售价符号
                                        {
                                            type: 'text',
                                            text: this.goodsInfo[this.priceKey] && this.goodsInfo[this.priceKey] !== '???' ? this.pricePrefix_ : '',
                                            size: 26,
                                            color: this.colors_.subColor2,
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            serialNum: 16,
                                            lineFeed: {
                                                lineHeight: 30
                                            },
                                            id: 'priceShowSymbol', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcPriceShowSymbolInfo({ drawArray }))
                                                })
                                            }
                                        },
                                        // 售价
                                        {
                                            type: 'text',
                                            text: this.goodsInfo[this.priceKey],
                                            size: 40,
                                            color: this.colors_.subColor2,
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            lineFeed: {
                                                lineHeight: 40
                                            },
                                            serialNum: 17,
                                            id: 'priceShow', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'priceShowSymbol',
                                                        tId: 'priceShow',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 0,
                                                            y: -12
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 售价单位
                                        {
                                            type: 'text',
                                            text: this.goodsInfo[this.priceKey] && this.goodsInfo[this.priceKey] !== '???' ? this.goodsInfo.price_show_unit : '',
                                            size: 24,
                                            color: this.colors_.subColor2,
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            serialNum: 18,
                                            id: 'priceShowUnit', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'priceShow',
                                                        tId: 'priceShowUnit',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 0,
                                                            y: 10
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 市场格
                                        {
                                            type: 'text',
                                            text: this.goodsInfo.price_market ? `${this.pricePrefix_}${this.goodsInfo.price_market}${this.goodsInfo.price_show_unit}` : '',
                                            size: 24,
                                            color: '#999',
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            serialNum: 19,
                                            lineFeed: {
                                                lineHeight: 24
                                            },
                                            lineThrough: {
                                                width: 1,
                                                color: '#999'
                                            },
                                            id: 'priceMarket', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'priceShowUnit',
                                                        tId: 'priceMarket',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 8,
                                                            y: 2
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 拼团件数
                                        {
                                            type: 'text',
                                            text: this.goodsInfo.group_sales,
                                            size: 24,
                                            color: '#333',
                                            textAlign: 'right',
                                            textBaseline: 'top',
                                            serialNum: 19,
                                            lineFeed: {
                                                lineHeight: 24
                                            },
                                            id: 'groupSales', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const posterNameInfo = this.getNodeInfo(drawArray, 'posterName')
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'groupSales',
                                                        offset: {
                                                            x: this.mode === 'skill' ? 999999 : posterNameInfo.width,
                                                            y: 16
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 角标
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.frontOssImgUrl_ + 'share/angle-mark.png',
                                            dWidth: 85,
                                            dHeight: 90,
                                            serialNum: 11,
                                            zIndex: 2,
                                            id: 'angleMark',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const shareImgInfo = this.getNodeInfo(drawArray, 'shareImg')
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'shareImg',
                                                        tId: 'angleMark',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: -shareImgInfo.width + 34,
                                                            y: 0
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 角标内容（大）
                                        {
                                            type: 'text',
                                            text: this.mode === 'skill' ? '限时秒杀' : '拼团',
                                            size: 26,
                                            color: '#FFE3B2',
                                            textAlign: 'right',
                                            textBaseline: 'top',
                                            serialNum: 12,
                                            lineFeed: {
                                                lineHeight: 28,
                                                lineNum: 2,
                                                maxWidth: 52
                                            },
                                            zIndex: 3,
                                            id: 'angleMarkText', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'angleMark',
                                                        tId: 'angleMarkText',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: -16,
                                                            y: 10
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 角标内容(小)
                                        {
                                            type: 'text',
                                            text: this.goodsInfo.joint_quantity,
                                            size: 20,
                                            color: '#FFE3B2',
                                            textAlign: 'center',
                                            textBaseline: 'top',
                                            serialNum: 12,
                                            zIndex: 3,
                                            id: 'jointQuantity', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve, reject) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'angleMark',
                                                        tId: 'jointQuantity',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: this.mode === 'skill' ? 999999 : -43,
                                                            y: 40
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 二维码
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.qrCode,
                                            ...qrcodeInfo,
                                            serialNum: 100,
                                            id: 'imgBarcode',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const posterNameInfo = this.getNodeInfo(drawArray, 'posterName')
                                                    let offsetY = 50
                                                    let offsetX = 12
                                                    // #ifndef H5
                                                    offsetY = 62
                                                    offsetX = 4
                                                    // #endif
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'imgBarcode',
                                                        offset: {
                                                            x: posterNameInfo.width - qrcodeInfo.dWidth + offsetX,
                                                            y: offsetY
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 长按识别
                                        {
                                            type: 'text',
                                            text: this.summary,
                                            size: 20,
                                            color: '#333',
                                            textAlign: 'right',
                                            serialNum: 101,
                                            id: 'longTips', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcLongTipsInfo({ drawArray, qrcodeInfo }))
                                                })
                                            }
                                        },
                                        // 分隔线
                                        {
                                            type: 'fillRect',
                                            backgroundColor: '#DFDFDF',
                                            width: 1,
                                            height: 76,
                                            serialNum: 102,
                                            id: 'line',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    let offsetX = 16
                                                    // #ifndef H5
                                                    offsetX = 24
                                                    // #endif
                                                    const longTips = this.getNodeInfo(drawArray, 'longTips')
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        tId: 'line',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: -(qrcodeInfo.dWidth + longTips.width + offsetX),
                                                            y: (qrcodeInfo.dHeight - 76) / 2
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 头像
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                            dWidth: 58,
                                            dHeight: 58,
                                            circleSet: true,
                                            zIndex: 2,
                                            serialNum: 104, // 这个值只要大于类型type非image的个数就行
                                            id: 'avatarImg',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const tempEl = this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        isSameLine: true,
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    })
                                                    const resEl = this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    })
                                                    resEl.dy = tempEl.dy + (qrcodeInfo.dHeight - 58) / 2
                                                    resolve(resEl)
                                                })
                                            }
                                        })
                                    break

                                case 'integral':
                                    postArr.push(
                                        // 标题
                                        {
                                            type: 'text',
                                            text: this.title,
                                            size: 26,
                                            color: '#333',
                                            textBaseline: 'top',
                                            serialNum: 12,
                                            id: 'posterName', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcPosterNameInfo({ drawArray, ctxPadding }))
                                                })
                                            }
                                        },
                                        // 售价符号
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.frontOssImgUrl_ + 'integral/gold-coin.png',
                                            dWidth: 38,
                                            dHeight: 38,
                                            serialNum: 13,
                                            id: 'priceShowSymbol',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcPriceShowSymbolInfo({ drawArray }))
                                                })
                                            }
                                        },
                                        // 售价
                                        {
                                            type: 'text',
                                            text: this.goodsInfo.credit || '',
                                            size: 40,
                                            color: this.colors_.subColor2,
                                            textBaseline: 'top',
                                            lineFeed: {
                                                lineHeight: 40
                                            },
                                            serialNum: 14,
                                            id: 'priceShow', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const offsetY = systemInfo.platform === 'ios' ? -4 : (systemInfo.platform === 'devtools' ? 3 : -8)
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'priceShowSymbol',
                                                        tId: 'priceShow',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 4,
                                                            y: this.handlePlatform(offsetY)
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 市场格
                                        {
                                            type: 'text',
                                            text: this.goodsInfo.price_market ? `${this.pricePrefix_}${this.goodsInfo.price_market}${this.goodsInfo.price_show_unit
                                                }` : '',
                                            size: 24,
                                            color: '#999',
                                            textAlign: 'left',
                                            textBaseline: 'top',
                                            serialNum: 16,
                                            lineFeed: {
                                                lineHeight: 24
                                            },
                                            lineThrough: {
                                                width: 1,
                                                color: '#999'
                                            },
                                            id: 'priceMarket', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'priceShow',
                                                        tId: 'priceMarket',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: 8,
                                                            y: this.handlePlatform(13)
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 二维码
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.qrCode,
                                            ...qrcodeInfo,
                                            serialNum: 100,
                                            id: 'imgBarcode',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    let offsetY = 50
                                                    let offsetX = 352
                                                    // #ifndef H5
                                                    offsetX = 364
                                                    offsetY = 62
                                                    // #endif
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'imgBarcode',
                                                        offset: {
                                                            x: offsetX,
                                                            y: offsetY
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 长按识别
                                        {
                                            type: 'text',
                                            text: this.summary,
                                            size: 20,
                                            color: '#333',
                                            textAlign: 'right',
                                            serialNum: 101,
                                            id: 'longTips', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.calcLongTipsInfo({ drawArray, qrcodeInfo }))
                                                })
                                            }
                                        },
                                        // 分隔线
                                        {
                                            type: 'fillRect',
                                            backgroundColor: '#DFDFDF',
                                            width: 1,
                                            height: 76,
                                            serialNum: 102,
                                            id: 'line',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    let offsetX = 16
                                                    // #ifndef H5
                                                    offsetX = 24
                                                    // #endif
                                                    const longTips = this.getNodeInfo(drawArray, 'longTips')
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        tId: 'line',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: -(qrcodeInfo.dWidth + longTips.width + offsetX),
                                                            y: (qrcodeInfo.dHeight - 76) / 2
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 头像
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                            dWidth: 58,
                                            dHeight: 58,
                                            circleSet: true,
                                            zIndex: 2,
                                            serialNum: 101, // 这个值只要大于类型type非image的个数就行
                                            id: 'avatarImg',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const tempEl = this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        isSameLine: true,
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    })
                                                    const resEl = this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'posterName',
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    })
                                                    resEl.dy = tempEl.dy + (qrcodeInfo.dHeight - 58) / 2
                                                    resolve(resEl)
                                                })
                                            }
                                        })
                                    break
                                case 'plotter':
                                    postArr.push(
                                        // 二维码
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.qrCode,
                                            ...qrcodeInfo,
                                            serialNum: 100,
                                            id: 'imgBarcode',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const shareImgInfo = this.getNodeInfo(drawArray, 'shareImg')
                                                    let offsetX = 20
                                                    let offsetY = 20
                                                    // #ifndef H5
                                                    offsetX = 32
                                                    offsetY = 32
                                                    // #endif
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'shareImg',
                                                        tId: 'imgBarcode',
                                                        isSameLine: true,
                                                        offset: {
                                                            x: -qrcodeInfo.dWidth - offsetX,
                                                            y: shareImgInfo.height + offsetY
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 头像
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                            dWidth: 58,
                                            dHeight: 58,
                                            circleSet: true,
                                            zIndex: 2,
                                            serialNum: 101, // 这个值只要大于类型type非image的个数就行
                                            id: 'avatarImg',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const imgBarcodeInfo = this.getNodeInfo(drawArray, 'imgBarcode')
                                                    resolve({
                                                        ...this.getNodeInfo(drawArray, 'avatarImg'),
                                                        dy: imgBarcodeInfo.dy + 12,
                                                        dx: 32
                                                    })
                                                })
                                            }
                                        },
                                        // 分享描述
                                        {
                                            type: 'text',
                                            text: this.summary,
                                            size: 18,
                                            color: '#999',
                                            id: 'summary',
                                            textBaseline: 'top',
                                            serialNum: 102,
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const imgBarcodeInfo = this.getNodeInfo(drawArray, 'imgBarcode')
                                                    resolve({
                                                        ...this.dynamicCalcLocal({
                                                            drawArray,
                                                            rId: 'avatarImg',
                                                            tId: 'summary',
                                                            offset: {
                                                                x: 0,
                                                                y: 16
                                                            }
                                                        }),
                                                        lineFeed: {
                                                            maxWidth: imgBarcodeInfo.dx - 2 * 24,
                                                            lineNum: 1,
                                                            lineHeight: 44
                                                        }
                                                    })
                                                })
                                            }
                                        },
                                    )
                                    break
                                case 'home':
                                    // 首页
                                    postArr.push(
                                        // 标题
                                        {
                                            type: 'text',
                                            text: this.title,
                                            size: 26,
                                            color: '#333',
                                            textBaseline: 'top',
                                            serialNum: 12,
                                            id: 'goodsName', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    const shareImgInfo = this.getNodeInfo(drawArray, 'shareImg')
                                                    resolve({
                                                        ...this.dynamicCalcLocal({
                                                            drawArray,
                                                            rId: 'shareImg',
                                                            tId: 'goodsName',
                                                            offset: {
                                                                x: 24,
                                                                y: 24
                                                            }
                                                        }),
                                                        lineFeed: {
                                                            maxWidth: shareImgInfo.width - 48,
                                                            lineHeight: 38,
                                                            lineNum: 2
                                                        }
                                                    })
                                                })
                                            }
                                        },
                                        // 二维码
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.qrCode,
                                            ...qrcodeInfo,
                                            serialNum: 100,
                                            id: 'imgBarcode',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    let offsetY = 50
                                                    let offsetX = 352
                                                    // #ifndef H5
                                                    offsetX = 364
                                                    offsetY = 62
                                                    // #endif
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'goodsName',
                                                        tId: 'imgBarcode',
                                                        offset: {
                                                            x: offsetX,
                                                            y: offsetY
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 长按识别
                                        {
                                            type: 'text',
                                            text: this.summary,
                                            size: 22,
                                            color: '#999',
                                            textAlign: 'center',
                                            textBaseline: 'top',
                                            serialNum: 101,
                                            lineFeed: {
                                                lineHeight: 22
                                            },
                                            id: 'longTips', // 自定义标识
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'imgBarcode',
                                                        tId: 'longTips',
                                                        offset: {
                                                            x: 54,
                                                            y: 10
                                                        }
                                                    }))
                                                })
                                            }
                                        },
                                        // 头像
                                        {
                                            type: 'image',
                                            url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                            dWidth: 58,
                                            dHeight: 58,
                                            circleSet: true,
                                            zIndex: 2,
                                            serialNum: 101, // 这个值只要大于类型type非image的个数就行
                                            id: 'avatarImg',
                                            allInfoCallback: ({ drawArray }) => {
                                                return new Promise((resolve) => {
                                                    resolve(this.dynamicCalcLocal({
                                                        drawArray,
                                                        rId: 'goodsName',
                                                        tId: 'avatarImg',
                                                        offset: {
                                                            x: 0,
                                                            y: 100
                                                        }
                                                    }))
                                                })
                                            }
                                        }
                                    )
                                    break
                                default:
                                    postArr.push({
                                        type: 'image',
                                        url: this.proxyImgUrl_ + this.userInfo.user_picture,
                                        dWidth: 58,
                                        dHeight: 58,
                                        circleSet: true,
                                        zIndex: 2,
                                        serialNum: 101, // 这个值只要大于类型type非image的个数就行
                                        id: 'avatarImg',
                                        allInfoCallback: ({ drawArray }) => {
                                            return new Promise((resolve) => {
                                                resolve(this.dynamicCalcLocal({
                                                    drawArray,
                                                    rId: 'shareImg',
                                                    tId: 'avatarImg',
                                                    offset: {
                                                        x: 0,
                                                        y: 60
                                                    }
                                                }))
                                            })
                                        }
                                    })
                                    break
                            }
                            // 底部引导图
                            if (this.showStep) {
                                postArr.push({
                                    type: 'image',
                                    url: this.proxyImgUrl_ + this.frontOssImgUrl_ + 'share/boot-step.png',
                                    dx: ctxPadding,
                                    dWidth: posterWidth - 2 * ctxPadding,
                                    dHeight: 82,
                                    roundRectSet: {
                                        r: [0, 0, 16, 16]
                                    },
                                    serialNum: 999,
                                    id: 'showStep',
                                    allInfoCallback: ({ drawArray }) => {
                                        const height = Math.max.apply(null, drawArray.map(o => {
                                            return this.getNodeHeight(drawArray, o.id, 'showStep')
                                        }))
                                        let disHeight = 10
                                        // #ifndef H5
                                        disHeight = 24
                                        // #endif
                                        return {
                                            dy: height + disHeight
                                        }
                                    }
                                })
                            }
                            if (this.showBorder_) {
                                // 边框
                                postArr.push({
                                    color: '#EDEDED',
                                    type: 'roundStrokeRect',
                                    lineWidth: 1,
                                    zIndex: 9999,
                                    dx: posterMargin,
                                    dy: posterMargin,
                                    r: 16,
                                    width: posterWidth - 2 * posterMargin,
                                    height: 0,
                                    serialNum: 9999,
                                    allInfoCallback: ({ drawArray }) => {
                                        const shareImg = this.getNodeInfo(drawArray, 'shareImg')
                                        console.log(shareImg)
                                        console.log(drawArray)
                                        return {
                                            height: Math.max.apply(null, drawArray.map(o => {
                                                return this.getNodeHeight(drawArray, o.id)
                                            })) + (this.showStep ? 0 : 12) - shareImg.dy,
                                            dy: shareImg.dy,
                                            dx: shareImg.dx
                                        }
                                    }
                                })
                            }
                            console.log(postArr)
                            rs(postArr)
                        })
                    },
                    drawBefore: ({ drawArray }) => {
                        const height = Math.max.apply(null, drawArray.map(o => {
                            return this.getNodeHeight(drawArray, o.id)
                        }))
                        return {
                            posterWidth,
                            height: height + posterMargin + (this.showStep ? 0 : 12)
                        }
                    },
                    setCanvasWH: async ({ bgObj }) => {
                        // 为动态设置画布宽高的方法，
                        this.poster = bgObj
                        console.log(bgObj)
                    },
                    setCanvasToTempFilePath(bgObj) { // 这里是为了解决CanvasToTempFilePath生成的图片模糊的情况
                        return {
                            quality: 1,
                            destWidth: bgObj.width * systemInfo.pixelRatio,
                            destHeight: bgObj.height * systemInfo.pixelRatio
                        }
                    }
                })
                this.poster.finalPath = d.poster.tempFilePath
                // this.$emit('posterFile', d.poster.tempFilePath)
            } catch (e) {
                this.$toast(JSON.stringify(e))
            }
        },
        // 计算分享名称的位置信息
        calcPosterNameInfo({ drawArray, ctxPadding }) {
            const shareImgInfo = this.getNodeInfo(drawArray, 'shareImg')
            return {
                ...this.dynamicCalcLocal({
                    drawArray,
                    rId: 'shareImg',
                    tId: 'posterName',
                    offset: {
                        x: 24,
                        y: 24
                    }
                }),
                lineFeed: {
                    maxWidth: shareImgInfo.width - 2 * ctxPadding,
                    lineHeight: 38,
                    lineNum: 2
                }
            }
        },
        // 计算售价的位置信息
        calcPriceShowSymbolInfo({ drawArray }) {
            return this.dynamicCalcLocal({
                drawArray,
                rId: 'posterName',
                tId: 'priceShowSymbol',
                offset: {
                    x: 0,
                    y: 20
                }
            })
        },
        // 计算长按识别的位置信息
        calcLongTipsInfo({ drawArray, qrcodeInfo }) {
            // 二维码旁边的文字最小宽度
            const summaryInfo = {
                min: 80,
                max: 120
            }
            let offsetX = 0
            // #ifndef H5
            offsetX = 8
            // #endif
            const longTips = this.getNodeInfo(drawArray, 'longTips')
            const lineHeight = 28
            const lineNum = 2
            let maxWidth = longTips.textLength <= summaryInfo.max ? longTips.textLength : Math.ceil(longTips.text.length / lineNum) * longTips.size
            maxWidth = maxWidth >= summaryInfo.max ? summaryInfo.max : maxWidth <= summaryInfo.min ? summaryInfo.min : maxWidth
            let curLineNum = Math.ceil(longTips.textLength / maxWidth)
            curLineNum = curLineNum > lineNum ? lineNum : curLineNum
            longTips.height = lineHeight * curLineNum
            return {
                ...this.dynamicCalcLocal({
                    drawArray,
                    rId: 'imgBarcode',
                    tId: 'longTips',
                    isSameLine: true,
                    offset: {
                        x: -(qrcodeInfo.dWidth + offsetX),
                        y: (qrcodeInfo.dHeight - longTips.height) / 2 + (lineHeight - longTips.size) * 2
                    }
                }),
                lineFeed: {
                    lineHeight,
                    lineNum,
                    maxWidth
                }
            }
        },
        getNodeInfo(drawArray, nodeId) {
            const nodeInfo = drawArray.find(o => o.id === nodeId)
            if (!nodeInfo) return {}
            // 组件高度
            const { lineFeed = {}, textLength, dHeight, height: rHeight, dWidth, width: rWidth, size } = nodeInfo
            let width = textLength || dWidth || rWidth || 1
            width = lineFeed.maxWidth || width
            const lineHeight = lineFeed.lineHeight || size
            const lineNum = Math.ceil(textLength / width)
            const height = rHeight || dHeight || lineNum * lineHeight
            return this.$deepClone({
                ...nodeInfo,
                lineNum,
                width,
                height
            })
        },
        // 兼容安卓、ios、devtool样式
        handlePlatform(val, fontSize = 28) {
            let scale = 0
            switch (systemInfo.platform) {
                case 'devtools':
                    scale = fontSize / (28 + 3)
                    break
                case 'ios':
                    scale = 1
                    break
                case 'android':
                    scale = fontSize / (28 - 2)
                    break
            }
            console.log(scale)
            return Math.ceil(val * scale)
        },
        getNodeHeight(drawArray, nodeId, filterId) {
            const nodeInfo = drawArray.find(o => o.id === nodeId)
            if (!nodeInfo || nodeId === filterId) return 0
            // 组件高度
            const { lineFeed = {}, size, textLength, dHeight, height: rHeight, dWidth, width: rWidth, dy } = nodeInfo
            let height = rHeight
            if (nodeInfo.type === 'text') {
                const textLineHeight = lineFeed.lineHeight || size
                // 参照物最大宽度
                // 参照物宽
                const width = textLength || dWidth || rWidth || 1
                const maxWidth = lineFeed.maxWidth || width || 0
                let lineNum = maxWidth ? Math.ceil(width / maxWidth) : 0
                lineNum = lineNum > lineFeed.lineNum && lineFeed.lineNum !== -1 ? lineFeed.lineNum : lineNum
                height = Math.ceil(lineNum * textLineHeight)
            } else if (nodeInfo.type === 'image') {
                height = dHeight
            }
            return height + dy
        },
        /**
        * 动态计算元素位置
        * drawArray {Array}全部的绘画数组
        * tId {String}目标id
        * rId {String}参照物id
        * isSameLine 是否处于同一行
        * offset {Object}距离参照物的dy偏移量
        *        x  左右偏移量
        *        y  上下偏移量
        */
        dynamicCalcLocal({
            drawArray,
            tId,
            rId,
            isSameLine = false,
            offset = {
                x: 0,
                y: 0
            }
        }) {
            rId = rId || tId
            // 目标对象
            const tEl = drawArray.find(item => item.id === tId)
            !tEl && console.error(`目标元素${tId}不存在`)
            // 参照对象，参照物可能为空
            const rEl = drawArray.find(item => item.id === rId)
            !rEl && console.error(`参照元素${rId}不存在(${tId})`)
            // 如果参展物为空，这边默认有边距
            const { lineFeed = {} } = rEl || {
                dx: 24,
                dy: 24
            }
            // 参照物宽
            const rWidth = rEl.textLength || rEl.dWidth || 1
            // 参照物最大宽度
            const rMaxWidth = lineFeed.maxWidth || rWidth || 0
            // 参照物长度
            const rLineHeight = lineFeed.lineHeight || rEl.size || 0
            // 参照物行数
            let rLineNum = rMaxWidth ? Math.ceil(rWidth / rMaxWidth) : 0
            rLineNum = rLineNum > lineFeed.lineNum && lineFeed.lineNum !== -1 ? lineFeed.lineNum : rLineNum
            // 参照物高度
            const rHeight = rEl.type === 'image' ? rEl.dHeight : rLineNum * rLineHeight
            // 偏移量
            const offsetX = offset.x || 0
            const offsetY = offset.y || 0
            return this.$deepClone({
                ...tEl,
                dy: rEl.dy + offsetY + (isSameLine ? 0 : rHeight),
                dx: rEl.dx + offsetX + (isSameLine ? rMaxWidth : 0)
            })
        },
        /**
         * @name 下载海报
         */
        downloadPosters() {
            // if (!this.qrCode) return false
            // if (!Object.keys(this.playerInfo).length) {
            //     return false
            // }
            // if (!this.sharePosters) {
            //     this.$toast('海报生成中')
            //     return false
            // }
            uni.saveImageToPhotosAlbum({
                filePath: this.poster.finalPath,
                success: () => {
                    this.$toast('图片保存成功')
                },
                fail: (err) => {
                    if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                        this.$toast('请开启保存图片相册')
                    }
                }
            })
        },
        /**
         * @name 生成的海报预览
         */
        preview(url) {
            uni.previewImage({
                current: 0,
                urls: [url]
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.share-menu {
    width: 750rpx;

    &-title {
        position: relative;
        height: 84rpx;
        padding-top: 10rpx;
        &__left {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 84rpx;
            top: 0;
            z-index: 2;
        }
        &__title {
            @include abs(50%, null, null, 48rpx);
            transform: translateY(-50%);
            font-size: $font-lg;
            color: $color-text;
            font-weight: bold;
        }
        &__right {
            color: #fff;
            padding-left: 206rpx;
            height: 100%;
            border-top-right-radius: 16rpx;
            font-size: 0;

            .price-com {
                position: relative;
                top: 4rpx;
                &::before {
                    bottom: 4rpx;
                }
            }
            .integral-num {
                font-family: 'd-din-bold';
                font-size: 36rpx;
                margin-left: 8rpx;
            }
            .flex-1 {
                padding: 0 24rpx;
            }
            .title-elli {
                width: 100%;
                display: inline-block;
                @include ellipsis;
                font-size: 28rpx;
            }
        }
    }
    .line-block {
        position: relative;
        &::before {
            content: '';
            width: 2px;
            height: 32rpx;
            @include abs(50%, null, null, 0);
            transform: scaleX(0.5) translateY(-50%);
            background-color: #fff;
        }
    }
    &-bd {
        height: 228rpx;
        @include flex(row);
        align-items: center;
        justify-content: center;
        background: #ffffff;
        &__price,
        &__anchor {
            padding: 0 24rpx;
            &--small {
                font-size: 24rpx;
                position: relative;
                bottom: 4rpx;
            }
        }
        &__item {
            flex: 1;
            @include flex(row);
            align-items: center;
            flex-direction: column;
            font-size: 28rpx;

            &::after {
                display: none;
            }
        }
        &__text {
            font-size: 28rpx;
            margin-top: 12rpx;
            color: #333333;
        }
    }

    &-ft {
        padding: 0 24rpx;
        background-color: #fff;
        @include iosSafeArea(padding-bottom, 0px, bottom);
    }
}
.share-wechat {
    @include flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &-box {
        /deep/ .c-modal-hd--bottom {
            padding-bottom: 0;
        }
    }

    &-h5 {
        &__img {
            @include fixed(30rpx, 30rpx);
        }
        &__btn {
            @include fixed(null, 50%, 156rpx);
            transform: translateX(50%);
            width: 186rpx;
        }
    }
    &-hd {
        width: 100%;
        flex: 1;
        height: 50%;
        /* #ifdef H5 */
        padding-top: 24rpx;
        /* #endif */
        /* #ifndef H5 */
        padding-top: calc(24rpx + var(--window-top));
        /* #endif */
        @include flex;
        align-items: center;
        /* #ifdef MP */
        /deep/ c-image {
            width: 100%;
            height: 100%;
        }
        /* #endif */
        &__box {
            height: calc(100% - 50rpx);
            @include tst;
            opacity: 0;
        }
        &__text {
            font-size: 26rpx;
            font-weight: 400;
            color: #ffffff;
            line-height: 50rpx;
            letter-spacing: 1px;
            text-align: center;
        }
    }
    &__hide {
        position: fixed;
        top: -99999rpx;
        left: -99999rpx;
        z-index: -99999;
    }
    &-bd {
        background: transparent;
        width: 100%;
        &__title {
            font-size: 32px;
            font-weight: 500;
            color: #333333;
            padding-left: 48rpx;
            height: 86rpx;
            @include flex(row);
            align-items: center;

            .close {
                position: absolute;
                right: 25rpx;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        &-bd {
            width: 100%;
            @include flex(row);
            justify-content: center;
        }

        .share-posterst {
            &-bd {
                min-height: 600rpx;
                padding: 24rpx 75rpx;
                display: flex;
                flex-direction: column;
            }

            &__box {
                background: #ffffff;
                border-radius: 16rpx;
                box-shadow: 0px 4rpx 10rpx 2rpx rgba(0, 0, 0, 0.06);
            }
        }
    }
}
</style>

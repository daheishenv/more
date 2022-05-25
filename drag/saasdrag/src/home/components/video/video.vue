<template>
    <view>
        <!-- 不能直接复制使用，修改默认空状态展示样式 -->
        <view
            v-if="videoFinish && !noImg_"
            class="flex video-box"
            :style="[outerLayer_]"
        >
            <view
                v-for="(item, index) in cData"
                :key="index"
                class="flex-1"
                :style="[innerLayer_]"
            >
                <view
                    v-if="item.data"
                    class="video-item"
                >
                    <video
                        :id="`${config.moduleId}-video${index}`"
                        class="video-player"
                        :style="{borderRadius: innerLayer_.imageRadius,height: innerLayer_.height}"
                        :src="item.data"
                        controls
                        :muted="muted"
                        :poster="item.img_url"
                        @play="handleChangeStatus('play')"
                        @pause="handleChangeStatus('pause')"
                        @error="videoErrorCallback"
                        @click="handleVideoClick"
                    >
                    </video>
                    <!-- :show-mute-btn="true" -->
                </view>
                <view
                    v-else
                    class="video-item"
                >
                    <c-image
                        src="guest/play-icon.png"
                        size="108"
                        class="video-icon"
                    ></c-image>
                    <view class="video-item__bule"></view>
                </view>
            </view>
        </view>
        <view
            v-if="!videoFinish || noImg_"
            class="bright-card"
            :style="[outerLayer_, {height: innerLayer_.height}]"
        >
            <view class="video-item__bule"></view>
        </view>
    </view>
</template>

<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
const systemInfo = uni.getSystemInfoSync()
let videoContext = null // 视频对象
export default {
    mixins: [homeComponentMixins],
    data() {
        return {
            videoSrc: '', // 视频地址
            videoFlag: false, // 视频弹窗
            isWifi: false, // 是否处于wifi情况下
            muted: true, // 静音播放
            playStatus: 'pause', // 视频播放状态
            videoId: '', // 视频id
            isVisible: false, // 视频组件是否在当前屏幕内
            videoFinish: false
        }
    },
    computed: {
        // 是否是用户主动关闭
        isUserPause_() {
            return this.isVisible && this.playStatus === 'pause'
        },
        cData_() {
            return Number(this.mode_ === 'style1') ? this.cData : this.cData[0] ? this.cData.slice(0, 1) : this.cData
        },
        noImg_() {
            // 一个有即有数据
            return !this.cData_.some(o => o && o.data)
        }
    },
    created() {
        // #ifndef H5
        this.muted = false
        // #endif
        this.curRouteName = this.$Route.name
        uni.$on('pageScroll', (e) => {
            this.curRouteName === this.$Route.name && this.calcEleLocal(e)
        })
        uni.$on('pageHide', () => {
            this.stopVideo()
        })
        this.videoId = `${this.config.moduleId}-video0`
    },
    mounted() {
        this.$nextTick(() => {
            this.calcEleLocal()
        })
    },
    methods: {
        finishData(data) {
            this.cData = data.map(o => {
                if (!o.data) return
                return {
                    ...o,
                    img_url: this.getFullImgPath(o),
                    data: this.getFullPath(o.data)
                }
            })
            this.$nextTick(() => {
                setTimeout(() => {
                    this.videoFinish = true
                }, 300)
            })
        },
        handleVideoClick() {
            // #ifdef H5
            this.muted = false
            // #endif
        },
        handleChangeStatus(e) {
            console.log(e)
            this.playStatus = e
        },
        getFullPath(src) {
            if (/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g.test(src)) {
                return src
            } else {
                return this.$config?.baseOssImgUrl + src
            }
        },
        getFullImgPath({ img_url, data }) {
            if (img_url) {
                return this.getFullPath(img_url)
            } else {
                return this.getFullPath(data) + '?x-oss-process=video/snapshot,t_0,f_jpg'
            }
        },
        async calcEleLocal() {
            // wifi情况下要做视频播放
            const networkType = await this.getNetworkType()
            // this.isWifi = false
            this.isWifi = networkType === 'wifi'
            if (!this.isUserPause_) {
                // 父节点位置
                const nodeInfo = await this.$c.getRect.call(this.$root, `#${this.config.moduleId}`)
                // 用户判断视频是否存在
                const videoNodeInfo = await this.$c.getRect.call(this, `#${this.videoId}`)
                if (!nodeInfo || !videoNodeInfo) return
                if (nodeInfo.top > 0 && nodeInfo.top <= systemInfo.screenHeight - nodeInfo.height) {
                    if (this.playStatus === 'play') return
                    // console.log('我被看见了')
                    this.isVisible = true
                    this.$c.throttle(() => {
                        this.isWifi && this.playVideo()
                    })
                } else {
                    if (this.playStatus === 'pause') return
                    // console.log('我被隐藏了')
                    this.isVisible = false
                    this.stopVideo()
                }
            }
        },
        playVideo() {
            this.setVideoContext()
            videoContext && videoContext.play()
        },
        stopVideo() {
            this.setVideoContext()
            try {
                videoContext && videoContext.pause()
            } catch (error) {
                videoContext && videoContext.stop()
            }
        },
        setVideoContext() {
            !videoContext && (videoContext = uni.createVideoContext(this.videoId, this))
        },
        getNetworkType() {
            return new Promise(rs => {
                uni.getNetworkType({
                    success: function (res) {
                        rs(res.networkType)
                        console.log('当前网络类型:', res.networkType)
                    }
                })
            })
        },
        videoErrorCallback(e) {
            console.log('视频错误信息:')
            console.log(e.target.errMsg)
        }
    }
}
</script>

<style lang="scss">
.video-box {
    overflow: hidden;
    .flex-1:last-child {
        margin-right: 0 !important;
    }
}
.video-item {
    position: relative;
    width: 100%;
    height: 100%;
    .video-icon {
        @include siteCenter();
        z-index: 3;
    }
    .video-player {
        width: 100%;
        height: 100%;
    }
    &__mask,
    &__bule {
        @include abs(0, 0, 0, 0);
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.15);
    }
    &__bule {
        background-color: #eaeef8;
    }
}
</style>

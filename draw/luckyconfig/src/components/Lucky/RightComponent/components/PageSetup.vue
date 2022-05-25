<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-18 09:22:19
-->
<template>
    <view class="page-setup right-common-set-item">
        <!-- <el-form
            ref="form"
            label-width="auto"
            size="small"
        > -->
        <el-form-item
            label="分享标题"
            align="right"
        >
            <el-input
                class="el-input__text"
                type="textarea"
                v-model="pageSetting.share_title"
                :show-word-limit="true"
                maxlength="30"
                size="mini"
            ></el-input>
        </el-form-item>
        <el-form-item
            label="分享内容"
            align="right"
        >
            <el-input
                class="el-input__text"
                type="textarea"
                v-model="pageSetting.share_intro"
                :show-word-limit="true"
                maxlength="30"
                size="mini"
            ></el-input>
        </el-form-item>
        <el-form-item
            class="el-form-item__shareImage"
            label="分享图片"
        >
            <div class="base-upload">
                <div class="base-upload-item">
                    <div
                        v-for="(item, index) in dataList"
                        :key="index"
                        class="base-upload-item--inline"
                    >
                        <div class="base-upload-item-hd">
                            <div
                                class="base-upload__title"
                                v-if="item.title"
                            >{{item.title}}</div>
                            <div
                                class="base-upload__summary"
                                v-if="item.summary"
                            >{{item.summary}}</div>
                        </div>
                        <div class="base-upload-item-bd">
                            <div
                                v-if="item.value"
                                class="base-upload-item-bd__left"
                            >
                                <c-image
                                    class="base-upload-item-bd__left-img"
                                    size="70px"
                                    type="upload"
                                    :src="item.value"
                                    mode="aspectFill"
                                />
                                <div
                                    v-if="progressList[index] > 0 && progressList[index]<100"
                                    class="base-upload-item-bd__progress"
                                    @click.stop="stopTip"
                                >
                                    <text
                                        class="base-upload-item-bd__progress-bg"
                                        :style="{height: progressList[index] + '%'}"
                                    ></text>
                                    <text class="base-upload-item-bd__progress-text">{{progressList[index]}}%</text>
                                </div>
                                <div
                                    class="base-upload-item-bd__left-btn"
                                    @click="handleUpload(index)"
                                >
                                    更换图片
                                </div>

                            </div>
                            <div
                                v-else
                                class="base-upload-item-bd__left"
                                @click="handleUpload(index)"
                            >
                                <div
                                    v-if="progressList[index] > 0 && progressList[index]<100"
                                    class="base-upload-item-bd__progress"
                                    @click.stop="stopTip"
                                >
                                    <text
                                        class="base-upload-item-bd__progress-bg"
                                        :style="{height: progressList[index] + '%'}"
                                    ></text>
                                    <text class="base-upload-item-bd__progress-text">{{progressList[index]}}%</text>
                                </div>
                                <span class="el-icon-plus"></span>
                                <div class="base-upload-item-bd__left-text">添加图片</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="预览效果">
            <div class="preview-box">
                <div class="c-row">
                    <div class="c-col-3 mr10">
                        <el-button
                            size="small"
                            :type="prevIndex === 0 ? 'primary' : ''"
                            plain
                            @click="handleClick(0)"
                        >小程序</el-button>
                    </div>
                    <div class="c-col-3 mr10">
                        <el-button
                            size="small"
                            :type="prevIndex === 1 ? 'primary' : ''"
                            plain
                            @click="handleClick(1)"
                        >H5</el-button>
                    </div>
                    <!-- <div class="c-col-3">
                            <el-button
                                size="small"
                                :type="prevIndex === 2 ? 'primary' : ''"
                                plain
                                @click="handleClick(2)"
                            >推广海报</el-button>
                        </div> -->
                </div>
                <div style="width: 280px">
                    <swiper
                        class="preview-swiper"
                        :current="prevIndex"
                        disable-touch
                    >
                        <swiper-item>
                            <view class="xcxshare-img">
                                <view class="xcxshare-apply">小程序应用名称</view>
                                <view class="xcxshare-title c-ellipsis-2">{{pageSetting.share_title}}</view>
                                <c-image
                                    width="150px"
                                    height="120px"
                                    class="xcxshare-poster"
                                    mode="aspectFill"
                                    type="upload"
                                    :src="dataList[0].value"
                                />
                            </view>
                        </swiper-item>
                        <swiper-item>
                            <view class="h5share-tip">朋友圈</view>
                            <view class="h5share-img1">
                                <view class="h5share-title c-ellipsis">{{pageSetting.share_title}}</view>
                                <c-image
                                    width="30px"
                                    height="30px"
                                    class="h5share-poster"
                                    mode="scaleToFill"
                                    type="upload"
                                    :src="dataList[1].value"
                                />
                            </view>
                            <view class="h5share-tip">发送给好友</view>
                            <view class="h5share-img2">
                                <view class="h5share-title c-ellipsis">{{pageSetting.share_title}}</view>
                                <view class="h5share-summary c-ellipsis-2">{{pageSetting.share_intro}}</view>
                                <c-image
                                    width="38px"
                                    height="38px"
                                    class="h5share-poster"
                                    mode="scaleToFill"
                                    type="upload"
                                    :src="dataList[1].value"
                                />
                            </view>
                        </swiper-item>
                        <!-- <swiper-item>
                              <view class="poster-img">
                                  <view class="poster-title c-ellipsis">{{pageSetting.share_title}}</view>
                                  <view class="poster-summary c-ellipsis-2">{{pageSetting.share_intro}}</view>
                                  <c-image
                                      width="240px"
                                      height="240px"
                                      class="poster"
                                      mode="aspectFill"
                                      type="upload"
                                      :src="dataList[1].value"
                                  />
                              </view>
                          </swiper-item> -->
                    </swiper>
                </div>
            </div>
        </el-form-item>
        <!-- </el-form> -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            pageSetting: {},
            progressList: [],
            dataList: [{
                title: '小程序',
                key: 'wechat_share_img', // H5分享图片
                summary: '建议尺寸5:4',
                value: ''
            }, {
                title: 'H5',
                key: 'mini_program_share_img', // H5分享图片
                summary: '建议尺寸1:1',
                value: ''
            }],
            selectIndex: 0,
            prevIndex: 0
        }
    },
    props: {
        value: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    watch: {
        value: {
            handler(val) {
                this.pageSetting = val
                this.dataList.forEach(o => {
                    o.value = val[o.key]
                })
            },
            immediate: true
        },
        dataList: {
            handler(val) {
                val.forEach(o => {
                    this.pageSetting[o.key] = o.value
                })
            },
            deep: true
        },
        pageSetting: {
            handler(val) {
                this.$emit('input', val)
            },
            deep: true
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        /**
         * @name: 更换图片
         * @param {String} index 索引值
         */
        async handleUpload(index) {
            let files = await uni.chooseImage({ count: 1 })
            const file = files[0] ? files[0] : files[1]
            if (!file) return this.$toast('上传出错')
            try {
                const filePath = file.tempFilePaths[0]
                this.$set(this.progressList, index, 0)
                const { data } = await this.$http('uploadImg', {
                    filePath,
                    name: 'file',
                    getTask: (e) => {
                        let progress = e.progress >= 99 ? 99 : progress
                        this.$set(this.progressList, index, progress)
                    }
                })
                this.$set(this.dataList[index], 'value', data.file_path)
                this.$nextTick(() => {
                    this.$set(this.progressList, index, 100)
                })
            } catch (err) {
                this.$set(this.progressList, index, 0)
            }
        },
        stopTip() {
            this.$message.warning('图片正在上传')
        },
        handleClick(index) {
            this.prevIndex = index
        }
    }
}
</script>

<style lang="scss">
.page-setup {
    background: #fff;
    width: 650px;
    // padding: 12px 15px;
    .preview {
        &-box {
            .el-button {
                width: 100%;
                display: block;
            }
            .c-row,
            .c-col-4 {
                padding-top: 0;
                padding-bottom: 0;
            }
        }
        &-swiper {
            margin-top: 12px;
            height: 360px;
            .poster-img {
                margin: 0 auto;
                width: 260px;
                height: 360px;
                background: url($ossImgUrl + 'drag/page/postershare.png') center
                    center / 100% 100% no-repeat;
                position: relative;
                line-height: 1.3;
                .poster {
                    @include abs(10px, 10px);
                }
                .poster-title {
                    color: #333;
                    @include abs(null, null, 65px, 10px);
                    font-size: 13px;
                    width: 160px;
                }
                .poster-summary {
                    color: #666;
                    font-size: 18px;
                    transform: scale(0.5);
                    transform-origin: 0 0;
                    @include abs(300px, null, null, 10px);
                    width: 320px;
                }
            }
            .h5share-tip {
                font-size: 12px;
                color: #595961;
                line-height: 20px;
                margin-bottom: 5px;
                font-weight: bold;
            }
            .h5share-img1 {
                margin: 0 auto;
                width: 260px;
                height: 101px;
                background: url($ossImgUrl + 'drag/page/h5share1.png') center
                    center / 100% 100% no-repeat;
                position: relative;
                .h5share-poster {
                    @include abs(36px, null, null, 49px);
                }
                .h5share-title {
                    @include abs(38px, null, null, 85px);
                    width: 160px;
                    font-size: 12px;
                    color: #333;
                }
            }
            .h5share-img2 {
                margin: 0 auto;
                width: 260px;
                height: 134px;
                background: url($ossImgUrl + 'drag/page/h5share2.png') center
                    center / 100% 100% no-repeat;
                position: relative;
                .h5share-poster {
                    @include abs(36px, 55px);
                }
                .h5share-title {
                    @include abs(10px, null, null, 55px);
                    width: 152px;
                    font-size: 12px;
                    color: #333;
                }
                .h5share-summary {
                    @include abs(40px, null, null, 55px);
                    width: 210px;
                    font-size: 18px;
                    color: #666;
                    transform-origin: 0 0;
                    transform: scale(0.5);
                    line-height: 1.3;
                }
            }
            .xcxshare-img {
                margin: 0 auto;
                width: 260px;
                height: 218px;
                background: url($ossImgUrl + 'drag/page/wxshare.png') center
                    center / 100% 100% no-repeat;
                position: relative;
                .xcxshare-apply {
                    font-size: 18px;
                    padding-left: 144px;
                    padding-top: 36px;
                    width: 200%;
                    color: #848484;
                    transform-origin: 0 0;
                    transform: scale(0.5);
                }
                .xcxshare-title {
                    margin-top: -27px;
                    font-size: 21px;
                    color: #333;
                    width: 200%;
                    transform-origin: 0 0;
                    transform: scale(0.5);
                    padding: 0 110px;
                }
                .xcxshare-poster {
                    @include abs(null, 50%, 34px);
                    transform: translateX(50%);
                }
            }
        }
    }
    // /deep/ .el-form-item__shareImage {
    //     text-align: left;
    //     .el-form-item__label {
    //         float: none;
    //     }
    //     .el-form-item__content {
    //         margin-left: 0 !important;
    //     }
    // }
    .base-upload-item {
        display: flex;
        &--inline {
            flex: 1;
        }
        &-hd {
            display: block;
        }
        &-bd {
            justify-content: flex-start;
            &__left {
                margin-right: 10px;
            }
        }
    }
}
</style>
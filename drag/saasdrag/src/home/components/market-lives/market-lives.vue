<template>
    <view
        class="home-market-lives"
        :style="[outerLayer_]"
    >
        <view
            :style="[titleLayer_]"
            style="padding: 0 12px"
        >
            <sub-home-module-title
                :title="config.title"
                :more="isMore_ ? 'live':''"
            />
        </view>
        <view>
            <view
                class="home-market-lives-bd"
                v-if="!noData_ && cFinish"
            >
                <view class="home-market-lives__list c-row">
                    <view
                        class="flex-1 bg-fff"
                        v-for="(item, index) in cData"
                        :key="index"
                        :style="[innerLayer_]"
                        @tap="liveJump(item)"
                    >
                        <view class="home-market-lives__box">
                            <view class="img">
                                <c-image
                                    height="290"
                                    width="100%"
                                    :radius="imgRadius_"
                                    :src="item.broad_img"
                                    mode="aspectFill"
                                />
                            </view>
                            <view class="view flex">
                                <view class="view-img flex-ajcenter">
                                    <c-icons
                                        size="24"
                                        color="#fff"
                                        type="saas-zhibo"
                                    />
                                </view>
                                <view class="view-text">{{item.viewer}}观看</view>
                            </view>
                            <view class="man">
                                <view class="header">
                                    <c-image
                                        size="64"
                                        radius="50%"
                                        :src="item.anchor.headingimg"
                                        mode="aspectFill"
                                    />
                                </view>
                                <view class="text">
                                    <view class="title c-ellipsis">
                                        <text>{{item.broad_name}}</text>
                                    </view>
                                    <!-- <view class="subtitle c-ellipsis">
                                    <text>{{item.broad_name}}</text>
                                </view> -->
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <c-no-data
                v-if="noData_ && cFinish"
                :show-img="noData_"
                :text="noDataText_"
            />
        </view>
    </view>
</template>

<script>
import homeComponentMixins from "@/home/components/component/home-component-mixins"
// 首页拼团组件
export default {
    name: "home-market-lives",
    mixins: [homeComponentMixins],
    computed: {
        imgRadius_() {
            const radius = this.innerLayer_.borderRadius || 0
            return [radius, radius, 0, 0].join(' ')
        }
    },
    methods: {
        liveJump(item) {
            uni.navigateTo({
                url: `plugin-private://${item.appid}/pages/live-player-plugin?room_id=${item.room_id}`,
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.home-market-lives {
    overflow: hidden;
    &__list {
        padding: 0;
        .flex-1 {
            &:nth-of-type(1) {
                margin-left: 0 !important;
            }
        }
    }
    &__box {
        height: 380rpx;
        border-radius: 16rpx;
        position: relative;
        .view {
            position: absolute;
            top: 8rpx;
            left: 8rpx;
            height: 36rpx;
            text-align: center;
            background: rgba(#000, 0.6);
            color: #fff;
            border-radius: 18rpx;
            &-img {
                width: 48rpx;
                border-radius: 18rpx;
                background: #f49554;
            }
            &-text {
                font-size: 22rpx;
                line-height: 36rpx;
                padding: 0 12rpx;
            }
        }

        .man {
            position: absolute;
            top: 258rpx;
            left: 0;
            width: 100%;
            text-align: center;

            .header {
                width: 66rpx;
                height: 66rpx;
                margin: 0 auto;
                border-radius: 50%;
            }
            .text {
                .title {
                    padding-top: 12rpx;
                    line-height: 40rpx;
                    font-size: 28rpx;
                    color: #000;
                    font-weight: bold;
                }

                .subtitle {
                    padding-top: 4rpx;
                    line-height: 30rpx;
                    font-size: 22rpx;
                    color: #999;
                }
            }
        }
    }
}
</style>
<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-news"
            :class="[mode_]"
            :style="[outerLayer_]"
        >
            <view
                :style="[titleLayer_]"
                style="padding: 0 12px"
            >   
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    :more="isMore_ ? 'company?type=1' : ''"
                />
            </view>
            <view
                class="home-news-bd bg-transparent"
                :style="[ innerLayer_ ]"
            >
                <view
                    v-for="(item, i) in cData.list"
                    :key="i"
                    :class="{
                        'c-underline': i !== cData.list.length - 1 && mode_ === 'style1', 
                        'mb24': i !== cData.list.length - 1 && mode_ === 'style2'
                    }"
                    class="home-news__item flex"
                    :style="[ innerLayer_ ]"
                    @tap="$jumpDetail('companyDetails', item.id)"
                >
                    <template v-if="mode_ === 'style1'">
                        <view class="flex-1">
                            <view class="home-news__title c-ellipsis-2">{{ item.title }}</view>
                            <view class="home-news__summary c-ellipsis">{{ item.state }}</view>
                            <view class="home-news__time">
                                <view class="pr12">
                                    <c-image
                                        src="home/date.png"
                                        width="22"
                                        height="22"
                                        mode="aspectFit"
                                    />
                                </view>
                                {{ item.create_time }}
                            </view>
                        </view>
                        <c-image
                            :src="item.head_img"
                            width="230"
                            height="172"
                            mode="aspecrFill"
                            radius="16"
                        />
                    </template>
                    <template v-if="mode_ === 'style2'">
                        <view class="flex-1 ">
                            <view class="home-news__title c-ellipsis-2">{{ item.title }}</view>
                            <view class="home-news__summary c-ellipsis">{{ item.state }}</view>
                            <view class="home-news__time">
                                {{ item.create_time }}
                            </view>
                        </view>
                    </template>
                </view>
            </view>
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
export default {
    name: 'HomeCompanyProfile',
    mixins: [homeComponentMixins]
}
</script>

<style lang="scss">
.home-news {
    overflow: hidden;
    &__item {
        padding: 24rpx;
    }
    &__time {
        font-size: 24rpx;
        color: #999;
        line-height: 32rpx;
        @include flex(row);
        align-items: center;
        @include abs(null, 0, 0, 0);
    }
    &__title {
        font-size: 28rpx;
        color: #333;
        line-height: 40rpx;
    }
    &__summary {
        margin-top: 14rpx;
        font-size: 24rpx;
        color: #999;
        line-height: 32rpx;
    }
    &.style2 {
        .home-news {
            &__time {
                margin-top: 8rpx;
                position: static !important; 
            }
            &__title {
                font-weight: bold;
            }
        }
        .bg-transparent {
          background: transparent !important;  
        }
    }
}
</style>

<template>
    <view
        class="brand"
        v-if="hasCData_"
        @click="handleJump"
    >
        <swiper
            v-if="slideList_ && slideList_.length"
            class="brand__swiper brand__item"
            :indicator-dots="false"
            :autoplay="true"
            :interval="5000"
            :circular="true"
            :vertical="false"
            :duration="500"
            :acceleration="true"
        >
            <swiper-item
                v-for="(item, i) in slideList_"
                :key="i"
            >
                <c-image
                    mode="aspectFill"
                    hight="180"
                    :src="item.pic_url"
                />
            </swiper-item>
        </swiper>
        <view
            v-if="hasPhoto_"
            class="brand__info brand__item"
        >
            <view class="brand__title">{{ photo_.name }}</view>
            <view class="brand__info-content">
                <c-image
                    mode="widthFix"
                    :src="photo_.pic_url"
                    width="100%"
                />
            </view>
        </view>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'
export default {
    name: 'Brand',
    mixins: [userComponentMixins], // 品牌

    data() {
        return {
            brandInfo: {}
        }
    },
    created() {
        this.getData()
    },
    computed: {
        cData_() {
            return this.cData || {}
        },
        hasPhoto_() {
            return this.cData_.photo && Object.keys(this.cData_.photo).length
        },
        photo_() {
            return this.cData_.photo || {}
        },
        slideList_() {
            return this.cData_.slideshow_list || []
        },
        info_() {
            return this.cData_.info || []
        },
        hasCData_() {
            return Object.keys(this.cData_).length
        }
    },
    methods: {
        handleJump() {
            this.$jumpDetail('brand', this.info_.id)
        }
    }
}
</script>

<style lang="scss" scoped>
.brand {
    padding: 24rpx 24rpx 0 24rpx;
    &__swiper {
        height: 180rpx;
        border-radius: 20rpx;
        overflow: hidden;
        margin-bottom: 24rpx;
    }
    &__title {
        position: relative;
        font-size: 32rpx;
        font-weight: bold;
        color: #000000;
        line-height: 46rpx;
        padding-bottom: 24rpx;
        &::after {
            content: '';
            position: absolute;
            right: -50%;
            bottom: 0;
            left: -50%;
            border-bottom: 1px solid #ededed;
            transform: scale(0.5);
            transform-origin: 50% 50% 0;
            box-sizing: border-box;
        }
    }
    &__info {
        padding: 24rpx;
        background: #ffffff;
        border-radius: 16rpx;
    }
    &__item {
        &:not(:last-child) {
            margin-bottom: 24rpx;
        }
    }
}
</style>

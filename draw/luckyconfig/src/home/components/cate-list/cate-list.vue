<template>
    <view
        class="cate-list"
        :style="{
            'padding-top':pt+'rpx'
        }"
        :class="type===3?'cate-list--line':''"
    >
        <view
            v-for="item in list_"
            :key="item[configKey_.id]"
            class="cate-list__item"
            :class="class_"
            @click="!isDemo?jumpSearch(item):''"
        >
            <view class="item-view">
                <c-image
                    v-if="isBranch"
                    :src="item[configKey_.img]"
                    width="154"
                    height="80"
                    mode="aspectFit"
                    class="img"
                />
                <c-image
                    v-else
                    :src="item[configKey_.img]"
                    :size="imageSize_"
                    class="img"
                />
                <view class="name">{{ item[configKey_.name] }}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        isDemo: { // 是否在后台使用
            type: Boolean,
            default: false
        },
        isBranch: {
            type: Boolean,
            default: false
        },
        pt: {
            type: Number,
            default: 32
        },
        list: {
            type: Array,
            default() {
                return [
                ]
            }
        },
        type: {
            type: [String, Number],
            default: 1
        },
        maxSize: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {}
    },
    computed: {
        configKey_() {
            return this.isBranch ? {
                id: 'id',
                img: 'brand_logo_img',
                name: 'brand_name'
            } : {
                id: 'cat_id',
                img: 'touch_icon_img',
                name: 'cat_name'
            }
        },
        list_() {
            if (this.maxSize > 0) {
                return this.list.slice(0, this.maxSize)
            }
            return this.list
        },
        class_() {
            if (this.type === 1) {
                return 'c-col-4 cate-list__item-4'
            } else if (this.type === 2) {
                return 'c-col-3 cate-list__item-3'
            } else if (this.type === 3) {
                return 'cate-list__item--line'
            }
            return ''
        },
        imageSize_() {
            if (this.type === 1) {
                return '154'
            } else if (this.type === 2) {
                return '120'
            } else if (this.type === 3) {
                return '122'
            }
            return ''
        }
    },
    methods: {
        jumpSearch(item) {
            this.$jump('searchList', { [!this.isBranch ? 'cat_id' : 'brand_id']: !this.isBranch ? item.cat_id : item.id })
        }
    }
}
</script>

<style lang="scss" scoped>
.cate-list {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: #ffffff;
    &--line {
        padding: 0;
        background-color: transparent;
    }
    &__item {
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        align-items: center;
        margin-bottom: 32rpx;
        padding: 0;
        .item-view {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .img {
            flex-shrink: 0;
        }
        .name {
            width: 100%;
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
            line-height: 33rpx;
            @include ellipsis;
            text-align: center;
        }
        &-4 {
            &:nth-child(3n + 1) {
                align-items: flex-start;
            }
            &:nth-child(3n) {
                align-items: flex-end;
            }
            .name {
                width: 154rpx;
                margin-top: 18rpx;
            }
        }
        &-3 {
            &:nth-child(4n + 1) {
                align-items: flex-start;
            }
            &:nth-child(4n) {
                align-items: flex-end;
            }
            .name {
                width: 120rpx;
                margin-top: 16rpx;
            }
        }
        &--line {
            height: 154rpx;
            width: 100%;
            padding: 0 24rpx;
            border-radius: 16rpx;
            margin-bottom: 24rpx;
            justify-content: center;

            .item-view {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
            }

            .name {
                width: 200rpx;
                margin: 0 0 0 24rpx;
                font-size: 28rpx;
                font-weight: 400;
                color: #333333;
                line-height: 40rpx;
                text-align: left;
            }
        }
    }
}
</style>

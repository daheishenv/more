<template>
    <view class="home-search">
        <view
            class="home-search-bd"
            :class="{nowrap: nowrap}"
        >
            <view
                class="name c-ellipsis"
                :class="{'justify-center': !nowrap}"
                v-if="title"
                :style="[ nameStyle_ ]"
            >
                <text>{{title}}</text>
            </view>
            <view
                class="inputBox"
                @tap="$jump(path)"
                :style="{height: inputHeight}"
            >
                <view
                    class="input"
                    :class="{'justify-center': mode === 'center'}"
                    :style="{ backgroundColor: inputBgColor ,color: inputColor, borderRadius: inputRaduis_ }"
                >
                    <c-icons
                        class="sou-icon"
                        size="32"
                        :color="inputColor"
                        type="icon-sousuo"
                    ></c-icons>
                    <text>{{ placeholder }}</text>
                </view>
                <view
                    :style="{width: capsuleLength + 'px'}"
                    class="right"
                ></view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        mode: {
            type: String,
            default: 'nomal'
        },
        nowrap: { // 搜索行显示
            type: Boolean,
            default: false
        },
        inputBgColor: {
            type: String,
            default: 'rgba(255,255,255, .5)'
        },
        inputColor: {
            type: String,
            default: '#fff'
        },
        path: {
            type: String,
            default: 'search'
        },
        title: {
            type: String,
            default: null
        },
        titleColor: {
            type: String,
            default: '#fff'
        },
        inputHeight: {
            type: String,
            default: null
        },
        paddingTop_: {
            type: String,
            default: null
        },
        inputRaduis: {
            type: [String, Number],
            default: null
        },
        placeholder: {
            type: String,
            default: '请输入搜索关键词'
        }
    },
    data() {
        return {
            capsuleLength: 0,
            capsuleTop: 0,
            capsuleHeight: '50rpx',
            nameEl: {},
            scrollTop: 0
        }
    },
    created() {
        uni.$on('pageScroll', (e) => {
            this.scrollTop = e.scrollTop;
        })
    },
    computed: {
        nameOpacity_() {
            const scrollTop = this.scrollTop < 100 ? this.scrollTop : 100
            return (100 - scrollTop) / 100
        },
        nameWidth_() {
            if (!this.title) return;
            const scrollTop = this.scrollTop >= 0 ? this.scrollTop : 0
            const width = scrollTop < 100 ? (100 - scrollTop) : 0
            const length = this.title.length < 6 ? this.title.length : 6
            return (length * 36 + 24) * width / 100 + 'rpx'
        },
        nowrap_() {
            return String(this.nowrap) === 'false' ? false : true;
        },
        nameStyle_() {
            let mameStyle = {
                color: this.titleColor
            }
            if (!this.nowrap_) {
                return mameStyle
            }
            return {
                ...mameStyle,
                opacity: this.nameOpacity_,
                width: this.nameWidth_
            }
        },
        inputRaduis_() {
            return this.$c.formatUnit(this.inputRaduis)
        }
    },
    methods: {
        // #ifdef MP
        // 获取左移动位置
        getSearchTop() {
            const data = uni.getMenuButtonBoundingClientRect();
            this.nowrap_ ? (this.capsuleLength = data.width + 8) : '';
            this.capsuleHeight = data.height + 'px'
        },
        // #endif
    },
    mounted() {
        // #ifdef MP
        this.getSearchTop()
        // #endif
    }
}
</script>
<style lang="scss" scoped>
.home-search {
    padding: 0 24rpx;

    .home-search-bd {
        @include tst(all, 0.3s);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        overflow-y: hidden;

        .name {
            @include flex(row);
            align-items: center;
            height: 64rpx;
            width: 100%;
            color: #fff;
            font-weight: bold;
            font-size: 36rpx;

            & + .inputBox {
                margin-top: 12rpx;
            }
        }

        .right,
        .name {
            flex-shrink: 0;
        }

        .inputBox {
            display: flex;
            align-items: center;
            width: 100%;

            .input {
                height: 100%;
                border-radius: 30rpx;
                border: 1px solid transparent;
                display: flex;
                align-items: center;
                color: #fff;
                font-size: 26rpx;
                @include tst(all, 0.3s);
                width: 100%;
                white-space: nowrap;
                overflow: hidden;

                .sou-icon {
                    margin: 0 16rpx 0 24rpx;
                }
            }

            .right {
                flex-shrink: 0;
            }
        }

        &.nowrap {
            flex-wrap: nowrap;

            .name {
                width: auto;
                white-space: nowrap;
                margin-bottom: 0;
                text-align: left;
            }

            .inputBox {
                margin-top: 0;
            }
        }
    }

    &.top {
        @include tst(all, 0.2s);

        .home-search-bd {
            opacity: 0;
        }
    }
}
</style>

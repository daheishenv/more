<template>
    <view>
        <view
            v-if="!noData_ && cFinish"
            class="home-construction-team"
            :class="{'home-construction-team-big': mode_ === 'style2'}"
            :style="[outerLayer_]"
        >
            <view
                :style="[titleLayer_]"
                class="home-construction-team__title"
            >
                <sub-home-module-title
                    :full="config.isFull"
                    :title="config.title"
                    :sub-title="config.sub_title"
                    :title-layer="titleLayer_"
                    :more="isMore_ ? 'worker' : ''"
                />
            </view>
            <view class="home-construction-team-bd">
                <scroll-view
                    :scroll-x="true"
                    :scroll-with-animation="true"
                    :style="[innerLayer_]"
                >
                    <sub-home-construction-team-list
                        v-if="mode_ === 'style1'"
                        has-bg
                        :list="cData.list"
                    />
                    <sub-home-construction-team-list
                        v-if="mode_ === 'style2'"
                        :list="cData.list"
                        img-width="212"
                        img-height="246"
                        img-radius="0"
                    />
                </scroll-view>
            </view>
        </view>
        <view
            v-if="!cFinish"
            class="bright-card"
            :style="[brightCardLayer_]"
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
    name: 'HomeConstructionTeam',
    mixins: [homeComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    computed: {
        // 风格类型
        mode() {
            if (this.mode_ === 'style1') {
                return true
            } else {
                return false
            }
        },
        hasMargin() {
            if (this.outerMargin_) {
                return true
            } else {
                return false
            }
        },
        // 这边需要吧margin转换成padding，不然会影响外层
        brightCardLayer_() {
            return {
                padding: this.outerLayer_.margin,
                paddingRight: '0rpx'
            }
        }
    }
}
</script>

<style lang="scss">
.home-construction-team {
    /deep/ .home-construction-team-item__bd {
        padding-top: 30rpx;
        border-radius: 16rpx;
        box-shadow: 0 0 3px #f5f5f5;
    }
}
.home-construction-team-big {
    /deep/ .home-construction-team-item__bd,
    /deep/ .home-construction-team-list {
        padding-top: 0;
        border-radius: 0;
    }
}
</style>

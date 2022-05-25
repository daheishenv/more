<template>
    <view
        class="three-palace-grid"
        :style="[ outerLayer_ ]"
    >
        <view class=" c-row p0">
            <view v-if="!noData_ && cFinish" class="three-palace-grid__left c-col-6 p0">
                <view class="pr12 w100">
                    <c-image
                        width="100%"
                        height="332"
                        :radius="radius_"
                        :src="leftData_.img"
                        mode="aspectFill"
                        @click="$serverJump(leftData_)"
                    />
                </view>
            </view>
            <view class="three-palace-grid__right c-col-6 p0">
                <view class="pl12 w100">
                    <c-image
                        width="100%"
                        height="154"
                        :radius="radius_"
                        :src="rightTopData_.img"
                        mode="aspectFill"
                        @click="$serverJump(rightTopData_)"
                    />
                </view>
                <view class="pl12 w100">
                    <c-image
                        width="100%"
                        height="154"
                        :radius="radius_"
                        :src="rightBottomData_.img"
                        mode="aspectFill"
                        @click="$serverJump(rightBottomData_)"
                    />
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import homeComponentMixins from '@/home/components/component/home-component-mixins'
// 首页三宫格组件
export default {
    name: 'ThreePalaceGrid',
    mixins: [homeComponentMixins],
    data() {
        return {
            cData: []
        }
    },
    computed: {
        leftData_() {
            return this.cData[0] ? this.cData[0] : {}
        },
        rightTopData_() {
            return this.cData[1] ? this.cData[1] : {}
        },
        rightBottomData_() {
            return this.cData[2] ? this.cData[2] : {}
        }
    },
    methods: {
        finishData(data) {
            this.cData = data.data
        }
    }
}
</script>
<style lang="scss" scoped>
.three-palace-grid {
    &__left,
    &__right {
        @include flex;
        align-items: flex-end;
    }
    &__right {
        align-items: flex-start;
        justify-content: space-between;
    }
    .w100 {
        width: 100%;    
    }
}
</style>

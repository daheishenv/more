<template>
    <!-- TODO 共享合伙人-会员中心咨询 -->
    <view>
        <view class="user-adviser-wrap" :style="[ outerLayer_ ]">
            <view
                v-if="cData && cData.mobile || showAdvisory"
                class="user-adviser flex"
            >
                <view class="user-adviser__l">
                    <c-image
                        size="70"
                        src="home/user/user-advisory2.png"
                    />
                </view>
                <view class="user-adviser__c">
                    <view class="user-adviser__c-t c-ellipsis">{{ cData.service_name || '服务管家' }}</view>
                    <view class="user-adviser__c-b c-ellipsis">{{ cData.service_desc || '为您分配的专属顾问' }}</view>
                </view>
                <view
                    class="user-adviser__r"
                    @click="handleCallPhone(cData.mobile)"
                >
                    <c-image
                        size="50"
                        src="home/user/user-advisory1.png"
                    />
                </view>
            </view>

        </view>
    </view>
</template>

<script>
import userComponentMixins from '@/home/components/user-component/user-component-mixins'

export default {
    name: 'UserAdvisory',
    mixins: [userComponentMixins],
    options: {
        styleIsolation: 'shared'
    },
    props: {
    },
    data() {
        return {
            cData: {}
        }
    },
    methods: {
        finishData(data) {
            this.cData = data.service_parent_info
        },
        handleCallPhone(phoneNumber) {
            if (!phoneNumber) return
            uni.makePhoneCall({
                phoneNumber
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.user-adviser-wrap {
    background: #fff;
}
.user-adviser {
    padding: 24rpx 12rpx;
    margin-top: 24rpx;
    &__l {
        width: 15%;
    }

    &__c {
        width: 65%;
        &-t {
            font-size: 28rpx;
            color: #000;
        }
        &-b {
            font-size: 24rpx;
            color: #666;
        }
    }
    &__r {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 20%;
        flex: 1;
    }
}
</style>

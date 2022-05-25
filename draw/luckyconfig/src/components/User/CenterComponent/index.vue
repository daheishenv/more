<template>
    <view class="user-center-component">
        <PhoneFrame :title-config="config">
            <template v-slot:container>
                <ComponentItem
                    :id="item.cmptId"
                    v-for="(item,index) in pageList_"
                    :key="index"
                    class="component-item"
                    :class="item.cmptId !== 'member-upgrade' && index === 2 ? 'marginTop': ''"
                    @selected="handleSelected(item)"
                >
                    <template>
                        <view
                            class="component-item__sub"
                            :class="[currentChecked_(item) ? 'component-item__sub--active' : '']"
                        >
                            <sub-home-user-component
                                v-bind="item"
                                :config="item"
                                :id="item.cmptId"
                            />
                        </view>
                        <!-- 底部tabbar -->

                        <view class="component-item__tips c-tc">
                            <text class="flex component-item__tips-text">{{ item.title }}</text>
                        </view>
                    </template>
                </ComponentItem>
                <view class="p12"></view>
                <c-tabbar id="home-tabbar" />
            </template>
        </PhoneFrame>

    </view>
</template>

<script>
import PhoneFrame from "@/components/User/PhoneFrame/PhoneFrame";
import ComponentItem from './ComponentItem'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        PhoneFrame,
        ComponentItem,
    },
    data() {
        return {
            config: {
                title: '标题'
            }
        }
    },
    mounted() {
        console.log(this.currentCheckAttr_);
    },
    computed: {
        ...mapState({
            currentCheckAttr_: state => state.user.currentCheckAttr || {},
            pageList_: state => state.user.pageList
        }),
        currentChecked_() {
            return item => {
                return item.cmptId === this.currentCheckAttr_.cmptId
            }
        }
    },
    methods: {
        ...mapActions(['setCurrentCheckAttr']),
        handleSelected(item) {
            this.setCurrentCheckAttr({
                cmptId: item.cmptId
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.user-center-component {
    .marginTop {
        position: relative;
        z-index: 2;
        margin-top: -84rpx;
    }
    .component-item {
        padding-right: 100px;
        position: relative;
        &__sub {
            position: relative;
            &::before {
                content: '';
                @include abs(0, 0, 0, 0);
                z-index: 999;
            }
            &--active {
                &::before {
                    border: 2px solid transparent;
                    border-color: #007aff;
                }
            }
        }
        &__tips {
            @include abs(0, 0);
            width: 100px;
            padding-left: 10px;
            &-text {
                width: auto;
                background-color: #ffffff;
                box-shadow: 0px 2px 8px 0px;
                font-size: 12px;
                border-radius: 2px;
                color: #666666;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                display: block;
                max-width: 80px;
                overflow: hidden;
                text-overflow: ellipsis;
                &::after {
                    content: '';
                    width: 6px;
                    height: 6px;
                    background-color: #fff;
                    transform: rotate(45deg);
                    margin-top: -3px;
                    position: absolute;
                    top: 50%;
                    left: 7px;
                }
            }
        }
    }
    /deep/ .c-bottom-menu__fixed {
        width: 375px;
        margin: 0;
    }
}
</style>
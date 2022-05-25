<template>
    <view class="base-coupons">
        <view v-loading="operationLoading">
            <view class="flex c-tc pb8 plr24">
                <view class="flex-1">面值</view>
                <view class="flex-1">优惠券名称</view>
                <view class="flex-1">使用门槛</view>
            </view>
            <view class="base-coupons__bd">
                <draggable
                    filter=".forbid"
                    v-model="dataList"
                    animation="500"
                    class="flex"
                    :class="[dataList.length ? 'c-row' : '']"
                    @change="draggableChange"
                >
                    <view
                        v-for="(item, index) in dataList"
                        :key="index"
                        class="base-coupons__list c-col-12"
                    >   
                        <view class="base-coupons__item p12">
                            <view class="base-coupons__item-delete">
                                <c-image
                                    :size="40"
                                    class="base-coupons__item-delete-icon"
                                    src="drag/goods/close.png"
                                    @click="handleDelete(index)"
                                />
                                <!-- <i
                                    class="choose-item__delete-icon el-icon-close"
                                ></i> -->
                            </view>
                            <view class="flex-1">{{ item.show_coupon_price_text }}</view>
                            <view class="flex-1">{{ item.coupon_name }}</view>
                            <view class="flex-1">{{ item.condition }}</view>
                        </view>
                    </view>
                </draggable>
            </view>
            <view class="base-coupons__ft mt24">
                <el-button
                    class="base-coupons__ft-add"
                    plain
                    icon="el-icon-plus"
                    @click="handleAdd"
                >
                    添加优惠券
                </el-button>
            </view>
        </view>
    </view>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        operationReqParam: {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            dataList: [],
            operationLoading: false, 
        }
    },
    computed: {
        api_() {
            return this.$store.state.currentCheckAttr.componentInfo.api
        },
        apiParam_() {
            const obj = this.$store.state.currentCheckAttr.componentInfo.apiParam
            return Object.assign({}, obj, {ids: this.value})
        },
        ids_() {
            return this.dataList.map(o => o.coupon_id).join(',')
        }
    },
    watch: {
        'apiParam_': {
            handler(val) {
                console.log(val, 2222222222);
                this.$c.debounce(() => {
                    this.initPage()
                }, 50)
            },
            deep: true,
            immediate: true
        },
    },
    created() {
        // this.initPage()
    },
    methods: {
        async initPage() {
            if (this.operationLoading) return
            this.operationLoading = true
            try {
                const { data } = await this.$http(this.api_, this.apiParam_)
                this.dataList = data || []
                this.operationLoading = false
            } catch (error) {
                this.operationLoading = false
            }
        },
        handleDelete(index) {
            this.dataList.splice(index, 1)
            this.$emit('input', this.ids_)
        },
        draggableChange() {
            this.$emit('input', this.ids_)
        },
        handleAdd() {
            this.$emit('select')
        }
    }
}
</script>

<style scoped lang="scss">
    .base-coupons {
        &__bd {
            background: #f7f8fa;
            border-radius: 8rpx;
        }
        &__item {
            cursor: pointer;
            // border: 1px solid #DCDFE6;
            box-shadow: 0 0 2px #DCDFE6;
            background: #fff;
            position: relative;
            display: flex;
            text-align: center;
            width: 100%;
            border-radius: 8rpx;
            &:hover {
                box-shadow: 0 0 0 2px #1b7aff;
            }
            &-delete {
                &-icon {
                    @include abs(-20rpx, -20rpx, null, null);
                    // transform: translate(50%, -50%);
                    z-index: 10;
                    font-size: 20px;
                    color: #fff;
                    cursor: pointer;
                    display: none;
                }
            }
            &:hover &-delete {
                @include abs(null, null, 0, 0);
                width: 100%;
                height: 100%;
                z-index: 10;
                &-icon {
                    display: block;
                }
            }
        }
        &__ft {
            &-add {
                width: 100%;
                height: 40px;
                display: block;
                background: #ffffff;
                border-radius: 2px;
                border: 1px solid #1b7aff;
                font-size: 14px;
                font-weight: 400;
                color: #1b7aff;
            }
        }
    }
</style>
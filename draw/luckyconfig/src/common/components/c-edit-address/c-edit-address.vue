<template>
    <view>
        <c-popup mode="right" width="750rpx" v-model="showHippingAddress">
            <view class="edit-address">
                <view class="ss-modal__title">{{itemObj.id ? '编辑地址' : '新增地址'}}</view>
                <view class="c-row">
                    <view class="c-col-12">
                        <view class="pl24 edit-address-box c-radius-lg">
                            <view class="edit-address-item c-underline">
                                <view class="edit-address-item__name">收货姓名</view>
                                <c-input class="edit-address-item__input" maxlength="20" pattern="name" ref="nameRef" msgName="姓名" v-model="itemObj.user_name" placeholder="请输入收货人姓名"></c-input>
                            </view>
                            <view class="edit-address-item c-underline">
                                <view class="edit-address-item__name">手机号码</view>
                                <c-input class="edit-address-item__input" maxlength="11" pattern="mobile" ref="telRef" msgName="手机号" type="number" v-model="itemObj.mobile" placeholder="请输入收货人电话"></c-input>
                            </view>
                            <view class="edit-address-item c-underline">
                                <view class="edit-address-item__name">所在地区</view>
                                <c-input class="edit-address-item__input" disabled pattern="notnull" ref="localRef" msgName="所在地区" :value="local_" placeholder="请选择省/市/区/街道" type="select" @select="handleSelectLocal(true)" />
                            </view>
                            <view class="edit-address-item c-underline">
                                <view class="edit-address-item__name">详情地址</view>
                                <c-input class="edit-address-item__input" pattern="notnull" ref="addressRef" msgName="详情地址" v-model="itemObj.address" placeholder="请输入街道详情地址"></c-input>
                            </view>
                            <view class="edit-address-item">
                                <view class="flex-1">设置默认地址</view>
                                <switch :checked="itemObj.is_default === 1" :color="shopConfigColor_.theme" @change="handleDefault" />
                            </view>
                        </view>
                    </view>
                </view>
                <c-fixed-menu position="bottom" height="136">
                    <view class="flex p24">
                        <view class="flex-1 pr24" v-if="itemObj.id">
                            <c-button class="cancel-btn" height="88" radius="16" @click="handlerDelete">删除</c-button>
                        </view>
                        <view class="flex-1">
                            <c-colors :theme="['t', '#fff']" :pro="['bgc', 'c']" radius="16">
                              <c-button type="inherit" height="88" @click="handlerSave">保存</c-button>
                            </c-colors>
                        </view>
                    </view>
                </c-fixed-menu>
            </view>
        </c-popup>
        <c-modal v-model="deleteFlag" title="是否确认删除该收货地址？" @confirm="confirmDelete"></c-modal>
        <c-select-city v-model="selectCityFlag" :defaultValue="defaultValue_" @confirm="sureLocal" />
    </view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'c-edit-address',
	    data() {
	        return {
	            deleteFlag: false,
	            selectCityFlag: false,
	            itemObj: {
	                id: "",
	                user_name: "",
	                mobile: "",
	                province_id: "",
	                city_id: "",
	                district_id: "",
	                address: "",
	                is_default: 0
	            },
	            showHippingAddress: false
	        };
	    },
	    computed: {
			...mapState({
				shopConfigColor_: state => state.config.shopConfig ? state.config.shopConfig.color : {}
			}),
	        local_() {
	            return this.itemObj.province ? `${this.itemObj.province} ${this.itemObj.city} ${this.itemObj.district}` : ''
	        },
	        defaultValue_() {
	            if(this.itemObj.province){
	                return [{
	                    value: this.itemObj.province_id,
	                    label: this.itemObj.province
	                }, {
	                    value: this.itemObj.city_id,
	                    label: this.itemObj.city
	                }, {
	                    value: this.itemObj.district_id,
	                    label: this.itemObj.district
	                }]
	            }else{
	                return []
	            }
	        }
	    },
	    props: {
	        value: {
	            type: Boolean,
	            default: false
	        },
	        tempItem: {
	             type: Object,
	            default: () => {}
	        }
	    },
	    watch: {
	        value: {
	            handler(val) {
	                this.showHippingAddress = val;
	            },
	            immediate: true
	        },
	        tempItem(newVal){
				console.log(newVal);
				if(Object.keys(newVal).length > 0){
					this.itemObj = newVal;
				}else{
					this.initData();
				}
	        },
	        showHippingAddress(newVal) {
	            this.$emit("input", newVal);
	        }
	    },
	    methods: {
	        async confirmDelete() {
	            await this.$http('userShippingAddressDel', {
	                id: this.itemObj.id
	            });
	            this.$toast('删除成功', 1);
	            this.showHippingAddress = false;
	            this.$emit('change')
	        },
	        handlerDelete() {
	           this.deleteFlag = true;
	        },
	        async handlerSave() {
	            let isGoing = true;
	   //          for(var key in this.$refs){
	   //              let validateObj = this.$refs[key] ? this.$refs[key].validate(true) : null;
	   //              if(validateObj !== null && !validateObj.validate){
	   //                  isGoing = false;
	   //                  break;
	   //              }
	   //          }
				// console.log(this.itemObj)
	            if(!isGoing) return ;
	            let params = this.$deepClone(this.itemObj);
	            delete params.province;
	            delete params.city;
	            delete params.district;
	            let res = await this.$http('userShippingAddressSave', params);
	            this.$toast(params.id ? '修改成功' : '新增成功', 1);
	            this.showHippingAddress = false;
	            params.id = res.data.id;
	            this.initData();
	            this.$emit('change', params)
	        },
			initData() {
				this.itemObj = {
				    id: "",
				    user_name: "",
				    mobile: "",
				    province_id: "",
				    city_id: "",
				    district_id: "",
				    address: "",
				    is_default: 0
				};
			},
	        sureLocal(e) {
	            let { detail } = e;
	            let local = {
	                province: detail.province.label,
	                province_id: detail.province.value,
	                city: detail.city.label,
	                city_id: detail.city.value,
	                district: detail.district.label,
	                district_id: detail.district.value
	            }
	            this.itemObj = Object.assign({}, this.itemObj, local);
	        },
	        handleDefault(e) {
	            this.itemObj.is_default = e.detail.value ? 1 : 0;
	        },
	        handleSelectLocal() {
	            this.selectCityFlag = true;
	        }
	    }
	}
</script>
<style lang="scss">
    .edit-address {
        width: 100%;
        height: 100%;
        background: $bg-color;
        .cancel-btn{
            background: #EDEDED;
            font-size: 32rpx;
            color: #333333;
            &::after{
              border: none;
            }
        }

        &-box{
            background-color: #fff;
        }

        .ss-modal__title {
            height: 88rpx;
            background-color: #fff;
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            padding: 0 80rpx;
            font-size: 32rpx;
        }

        .back {
            position: absolute;
            left: 0;
        }

        .pl24 {
            padding-left: 24rpx;
            box-sizing: border-box;
        }

        .edit-address-item {
            display: flex;
            align-items: center;
            height: 88rpx;

            switch{
                transform: scale(.75);
            }

            &__name {
                font-size: 28rpx;
                width: 160rpx;
                color: #333333;
            }

            &__input {
                flex: 1;
                padding: 12rpx 0;
            }
        }

        .set-default-address {
            padding: 0 24rpx;
            height: 88rpx;
            background: #ffffff;
            display: flex;
            align-items: center;
        }
    }
</style>

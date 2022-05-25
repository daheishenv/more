<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:01:01
-->
<template>
    <view class="change-img">
        <div class="change-img-hd">
            <div
                class="change-img-hd__span flex"
                @click="handleChangeImgStatus"
            >
                <i class="el-icon-arrow-left"></i>
                <span>返回</span>
            </div>
            <span>替换奖项图片</span>
        </div>
        <div
            class="change-img-hc flex"
            v-for="(item, index) in formData.prize_info"
            :key="index"
        >
            <view class="col">{{index+1}}</view>
            <view class="col-name">{{item.prize_name}}</view>
            <ImgUpload
                v-model="item.prize_config_img"
                width="80px"
                height="80px"
                :defaultImg="item.defaultImg"
            />
        </div>
    </view>
</template>

<script>
import ImgUpload from './ImgUpload'
import { mapState } from 'vuex'
import { getQueryVariable } from '@/common/utils/utils'

export default {
    name: "change-img", // 替换奖项图片
    data() {
        return {
            change: false, // 判断有没修改
            formData: {}
        };
    },
    components: {
        ImgUpload
    },
    computed: {
        ...mapState({
            //第三步
            thirdStepData: state => state.project.thirdStepData
        })
    },
    created() {
        this.formData = this.thirdStepData
    },
    watch: {
        thirdStepData(val) {
            this.formData = val
            this.formData.prize_info.forEach(v => {
                const vv = v
                vv.defaultImg = v.prize_config_img
            });
        },
        formData: {
            handler(val) {
                this.$c.debounce(() => {
                    this.$store.dispatch('setThirdStepData', val)
                }, 500)
            },
            deep: true
        },
    },
    methods: {
        async handleChangeImgStatus() {
            // 保存奖品设置
            const prize_info = this.formData.prize_info.map(({ id, big_wheel_prize_id, prize_config_img, weight_ratio }, index) => {
                return {
                    id,
                    big_wheel_prize_id,
                    prize_config_img,
                    weight_ratio,
                    sort: index,
                }
            })
            const formData = Object.assign({}, this.formData, { prize_info })
            await this.$http('ruleSet', formData)
            // 重新获取配置信息
            await this.getBigWheelPrizeConfig()
            this.$store.dispatch('setChangeImgStatus', false)
        },
        async getBigWheelPrizeConfig() { // 获取奖品信息，默认值在奖项信息中获取
            const { data = [] } = await this.$http('getBigWheelPrizeConfig', {
                big_wheel_activity_id: getQueryVariable('big_wheel_activity_id')
            })
            if (data.length > 0) {
                const prize_info = data.map((o, index) => {
                    return {
                        ...o,
                        name: index
                    }
                })
                this.formData = Object.assign({}, this.formData, { prize_info })
                this.$store.dispatch('setThirdStepData', this.formData)
            }
        }
    },
};
</script>

<style lang="scss" scope>
.change-img {
    &-hd {
        padding: 19px 24px;
        position: relative;
        text-align: center;
        font-weight: bold;
        margin-bottom: 10px;

        &__span {
            @include abs(50%, null, null, 0);
            transform: translateY(-50%);
            cursor: pointer;
            font-weight: normal;
            // padding-left: 20px;
            color: #595959;

            i {
                font-size: 18px;
            }
        }
    }
    &-hc {
        margin-bottom: 20px;
        align-items: center;
        &__span {
            color: #999;
            margin-right: 20px;
            width: 150px;
        }
        .col {
            margin-right: 40px;
        }
        .col-name {
            width: 120px;
            margin-right: 10px;
            @include ellipsis;
        }
    }
}
</style>

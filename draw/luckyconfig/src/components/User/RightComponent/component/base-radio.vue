<template>
    <view class="base-switch">
        <el-radio-group
            v-model="radioValue_"
            size="mini"
            @change="handleChange"
        >
            <el-radio
                v-for="(item,index) in options"
                :key="index"
                :label="item.value"
            >   
                
                <span>{{ item.label }}</span>
            </el-radio>
        </el-radio-group>
    </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        titleDisabledRule: {
            type: [Array],
            default: () => []
        }
    },
    computed: {
        ...mapState({
            ShopTheme_: state => state.user.ShopTheme 
        }),
        radioValue_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    watch: {
        options: {
            handler(val) {
                const showIndex = val.findIndex(o => o.show)
                // 当存在 ShopTheme7 时, 重置 mode 为 style2, 
                if (showIndex !== -1) {
                    // 当前值与show的值不用时移除
                    if (val[showIndex].show.value !== this.value) {
                        val.splice(showIndex, 1)
                    }
                }
                if (this.ShopTheme_ === 'ShopTheme7' && this.value === 'style2') {
                    this.handleChange()
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        handleChange() {
            this.$emit('change', {
                value: this.radioValue_,
                rule: this.titleDisabledRule
            })
        }
    }
}
</script>

<style>
</style>
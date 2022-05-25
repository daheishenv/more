<template>
    <view class="base-checkbox flex justify-end">
        <view v-if="selOptionsText_" class="pr48">{{selOptionsText_}}</view>
        <el-checkbox
            v-model="newValue_"
            :true-label="1"
            :false-label="0"
        ></el-checkbox>
    </view>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        newValue_: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
        selOptionsText_() {
            return (this.options.find(o => o.value == this.newValue_) || this.options[0]).label
        }
    }
}
</script>

<style>
</style>
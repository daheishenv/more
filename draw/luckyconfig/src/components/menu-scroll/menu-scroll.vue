<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sky
 * @Date: 2021-06-07 17:08:23
-->
<template>
    <view class="gc-menu-scroll">
        <template v-if="cmptStyle_ === 'style1'">
            <gc-menu-scroll-style1
                v-model="menuIndex"
                :mode="mode"
                :scroll-index="scrollIndex"
                :text-style="textStyle"
                :height="height"
                :bg-color="bgColor"
                :border="border"
                :color="color"
                :sel-color="selColor"
                :scroll-x="scrollX"
                :label="label"
                :list="list"
                :sel-theme="selTheme"
                :sel-pro="selPro"
                @change="emitChange"
                @click="emitClick"
            />
        </template>
        <template v-else-if="cmptStyle_ === 'style2'">
            <gc-menu-scroll-style2
                v-model="menuIndex"
                :mode="mode"
                :scroll-index="scrollIndex"
                :text-style="textStyle"
                :height="height"
                :bg-color="bgColor"
                :border="border"
                :color="color"
                :sel-color="selColor"
                :scroll-x="scrollX"
                :label="label"
                :list="list"
                :sel-theme="selTheme"
                :sel-pro="selPro"
                @change="emitChange"
                @click="emitClick"
            />
        </template>
        <template v-else-if="cmptStyle_ === 'style3'">
            <gc-menu-scroll-style3
                v-model="menuIndex"
                :mode="mode"
                :scroll-index="scrollIndex"
                :text-style="textStyle"
                :height="height"
                :bg-color="bgColor"
                :border="border"
                :color="color"
                :sel-color="selColor"
                :scroll-x="scrollX"
                :label="label"
                :list="list"
                :sel-theme="selTheme"
                :sel-pro="selPro"
                @change="emitChange"
                @click="emitClick"
            />
        </template>
    </view>
</template>

<script>
import menuScrollMixins from '@/components/menu-scroll/mixins/index'
const {
    props,
    methods,
    name
} = menuScrollMixins
export default {
    mixins: [{
        props,
        methods,
        name
    }],
    computed: {
        menuIndex: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    }
}
</script>

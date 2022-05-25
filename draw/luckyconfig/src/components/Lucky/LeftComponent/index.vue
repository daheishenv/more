<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:01:01
-->
<template>
    <view class=“left-component>
        <el-menu default-active="1">
            <el-menu-item
                :index="item.index"
                v-for="item in menubar"
                :key="item.index"
                @click="handleShowPopup(item.pro)"
            >{{item.name}}</el-menu-item>
        </el-menu>
    </view>
</template>

<script>
export default {
    data() {
        return {
            menubar: [
                { index: '1', name: '首页', pro: { showCName: 'lucky-draw' } },
                { index: '2', name: '活动规则', pro: { showCName: 'lucky-details', methodName: 'changeIndex', params: { index: 0 } } },
                { index: '3', name: '我的奖品', pro: { showCName: 'lucky-details', methodName: 'changeIndex', params: { index: 1 } } },
                { index: '4', name: '没有机会', pro: { popupName: 'showReward', methodName: 'handleShowReward', params: { type: 2 } } },
                { index: '5', name: '抽奖机会', pro: { showCName: 'lucky-details', popupName: 'chancePopup', methodName: 'changeIndex', params: { type: 0 } } },
                { index: '6', name: '中奖页', pro: { popupName: 'showReward', methodName: 'handleShowReward', params: { type: 0 } } },
                { index: '7', name: '未中奖页', pro: { popupName: 'showReward', methodName: 'handleShowReward', params: { type: 1 } } },
                { index: '8', name: '填写资料', pro: { isMain: true, showCName: 'lucky-details', popupName: 'showInfo' } },
                { index: '9', name: '海报预览', pro: { isMain: true, showCName: 'lucky-draw', popupName: 'showPoster' } }
            ]
        }
    },
    component: {
    },
    onLoad() {

    },
    methods: {
        handleShowPopup(pro) {
            this.$store.dispatch('setControlPage', pro)
        }
    }
}
</script>

<style>
.left-component {
    background: #fff;
}
</style>

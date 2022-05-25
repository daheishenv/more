<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Teemor
 * @Date: 2022-04-27 17:22:21
-->
<template>
    <div class="activity">
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
        >
            <el-tab-pane
                label="全部赛场"
                name="0"
            >
                <AllCourt
                    :list="list"
                    @handleGetData="initData"
                />
            </el-tab-pane>
            <el-tab-pane
                label="我的报名"
                name="1"
            >
                <MyCourt :list="myList" />
            </el-tab-pane>

        </el-tabs>
    </div>
</template>
<script>
import AllCourt from './components/all-court'
import MyCourt from './components/my-court'
export default {
    components: {
        AllCourt,
        MyCourt
    },
    data() {
        return {
            activeName: '0',
            list: [],
            myList: []
        }
    },
    watch: {
        activeName: {
            handler() {
                this.initData()
            },
            immediate: true
        }
    },
    created() {
    },
    methods: {
        handleClick(e) {
            console.log(e, 3)
        },
        async initData() {
            if (this.activeName === '0') {
                const { data: { list } } = await this.$axios.$post('/JobContest/getList', { page: 1, limit: 1000 })
                this.list = list
            } else {
                console.log('0000000000000000000000')
                const { data: { list } } = await this.$axios.$post('/JobContest/getApplyList', { page: 1, limit: 1000 })
                this.myList = list
            }
        }
    }
}
</script>
<style lang="scss">
.activity {
    padding: 0 0 40px;
    background: #fff;
    margin-top: 24px;
    /deep/ .el-tabs__nav {
        justify-content: center;
    }
    .el-tabs__nav-wrap {
        line-height: 78px;
        .el-tabs__nav-scroll {
            display: flex;
            justify-content: center;
            .el-tabs__item {
                font-size: 20px;
                padding-right: 40px;
            }
            .el-tabs__active-bar {
                width: 80px;
            }
        }
    }
}
</style>

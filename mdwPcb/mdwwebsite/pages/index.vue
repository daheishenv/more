<template>
    <div
        v-infinite-scroll="reachBottomFn"
        :infinite-scroll-distance="20"
        :infinite-scroll-disabled="busy"
        class="index"
    >
        <banner :banner-list="bannerList" />
        <div class="index__notice mt30">
            <line-title
                icon="icon-gonggao"
                title="公告栏"
            />
            <div class="gonggao-content">
                <el-carousel
                    height="30px"
                    :interval="5000"
                    indicator-position="none"
                    direction="vertical"
                    arrow="never"
                >
                    <el-carousel-item
                        v-for="(aditem,index) in ad"
                        :key="index"
                    >
                        <div class="index__notice-desc">
                            {{ aditem }}
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>

        </div>
        <div class="index__order">
            <div class="index__order-header flex justify-between">
                <line-title
                    icon="icon-dingdanliebiao"
                    title="订单列表"
                >
                    <div
                        v-if="balance_time > 0"
                        class="index__title-order"
                    >
                        <div class="index__order-time">(抢单倒计时：
                            <count-down
                                :timestamp="balance_time"
                                @zero="zero"
                            />)
                        </div>

                    </div>
                </line-title>
                <ul class="flex align-center">
                    <li
                        v-for="(item,index) in statusList"
                        :key="index"
                        :class="['status',status == item.status ? 'status--active':'' ]"
                        @click="changeStatus(item.status)"
                    >
                        {{ item.title }}
                    </li>
                </ul>
            </div>
            <div class="index__order-info">
                <order-list-item
                    v-for="item in pageList"
                    :key="item.order_id"
                    :order="item"
                    class="index__order-info-order"
                    @handleClick="handleOrder"
                />

            </div>
            <no-data
                :class="[noData ? 'white-bg' : '']"
                :show-img="noData"
                :description="lodingText"
            />
        </div>
        <el-dialog
            title="记录"
            :visible.sync="dialogVisible"
        >
            <el-form :model="form">
                <el-form-item
                    label="内容"
                    prop="content"
                >
                    <el-input
                        v-model="form.content"
                        type="textarea"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="addRecord"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import banner from '@/components/home/banner'
import orderListItem from '@/components/home/order-list-item'
import listMixins from '@/mixins/list.js'
export default {
    components: {
        banner,
        orderListItem
    },
    mixins: [listMixins],
    layout: 'default',
    async asyncData({ $axios }) {
        let bannerList = []
        let pageList = []
        let balance_time = 0
        let ad = []
        let statusList = []
        // 轮播图
        try {
            const { data } = await $axios.$post('/index/getBanner')
            bannerList = data || []
        } catch (error) {
            console.log(error)
        }
        // 订单列表
        try {
            const { data } = await $axios.$post('/order/myorder', { page: 1, limit: 10 })
            pageList = data.list || []
            balance_time = data.balance_time || 0
        } catch (error) {
            console.log(error)
        }
        // 公告
        try {
            const { data } = await $axios.$post('/index/getCompanyNotice')
            ad = data || []
        } catch (error) {
            console.log(error)
        }
        // 订单状态
        try {
            const { data } = await $axios.$post('/order/getOrderStatus')
            statusList = data || []
        } catch (error) {
            console.log(error)
        }

        // const { data: orderType } = await $axios.$post('/order/getOrderStatus')
        return {
            // orderType: orderType || [],
            bannerList,
            ad,
            pageList,
            balance_time,
            page: 2,
            statusList
        }
    },
    data() {
        return {
            ad: [],
            orderIndex: 0,
            orderType: [],
            reqName: '/order/myorder',
            dialogVisible: false,
            bannerList: [],
            form: {
                content: ''
            },
            currentItem: {

            },
            zeroOver: false,
            balance_time: 0,
            statusList: [],
            status: 0
        }
    },
    computed: {
        search() {
            return this.$store.state.search.menuSearch
        }
    },
    watch: {
        search(nv, ov) {
            this.keyword = nv
            this.page = 1
            this.debounce(this.getOrder, 500)()
            // this.$nextTick(() => {
            //     const d = document.querySelector('.index__order-header')
            //     d.scrollIntoView({ behavior: 'smooth' })
            //     console.log(1)
            // })
        }
    },
    methods: {
        handleOrder(e, data) {
            if (e.msg === '写记录') {
                this.currentItem = e.data
                this.dialogVisible = true
            } else if (e.msg === 'refresh') {
                this.initPage()
            }
        },
        async addRecord() {
            const { content } = this.form
            if (!content) {
                return this.$message({
                    message: '请输入内容',
                    type: 'warning'
                })
            }
            const { order_id } = this.currentItem
            const query = {
                order_id,
                remark: this.form.content
            }
            const { code, msg } = await this.$axios.$post('/order/handleOrder', query)
            this.$message({
                message: msg,
                type: code === 0 ? 'success' : 'warning'
            })
            if (code === 0) {
                this.dialogVisible = false
                this.updateOrderDetail(order_id)
                this.form.content = ''
            }
        },
        async updateOrderDetail(order_id) {
            const { data } = await this.$axios.$post('/order/orderDetail', { order_id })
            this.pageList.forEach((item, index) => {
                if (item.order_id === data.id) {
                    this.$set(this.pageList, index, data)
                }
            })
        },
        zero() {
            this.zeroOver = true
            this.$nextTick(() => {
                this.initPage()
            })
        },
        async getOrder() {
            const params = {
                status: this.status,
                keyword: this.keyword,
                page: this.page,
                limit: 10
            }
            this.defaultParams = {
                status: this.status,
                keyword: this.keyword
            }
            const { data } = await this.$axios.$post('/order/myorder', params)
            this.pageList = data.list || []
            this.noData = !this.pageList.length
            this.lodingText = this.pageList.length ? '-我是有底线的-' : '暂无数据'
        },
        debounce(fn, delay, params) {
            let timer = null
            return function () {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(fn, delay, params)
            }
        },
        changeStatus(status) {
            this.status = status
            this.page = 1
            this.getOrder({ status })
        }
    }
}
</script>

<style lang="scss" scoped>
.index {
    height: calc(100vh - 80px);
    padding: 30px 0;
    overflow: auto;
    &__block {
        padding: 23px 40px 26px 40px;
        background: #ffffff;
        margin-top: 30px;
    }
    &__title {
        &-order {
            padding-left: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    &__notice {
        display: flex;
        padding: 25px 40px;
        background: #ffffff;
        .gonggao-content {
            flex: 1;
            margin-left: 30px;
            box-sizing: border-box;
        }
        &-desc {
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 30px;
            @include ellipsis;
        }
    }
    &__order {
        margin-top: 30px;
        &-header {
            box-sizing: border-box;
            padding: 35px 40px 20px;
            border-bottom: 1px solid #d6d6d6;
            background: #ffffff;
            .status {
                margin-right: 60px;
                position: relative;
                cursor: pointer;
                &:hover {
                    color: #4185ec;
                }
                &:last-child {
                    margin-right: 0;
                }
                &--active {
                    color: #4185ec;
                    font-weight: bold;
                    &::before {
                        content: "";
                        display: inline-block;
                        width: 100%;
                        height: 3px;
                        background-color: #4185ec;
                        border-radius: 2px;
                        position: absolute;
                        bottom: -28px;
                    }
                }
            }
        }
        &-time {
            font-size: 14px;
            font-weight: 400;
            color: #fa0000;
            line-height: 1em;
        }
        &-info {
            &-order {
                &:not(:first-child) {
                    margin-top: 30px;
                }
            }
        }
        .white-bg {
            background-color: #fff;
        }
    }
    &__menu {
        display: flex;
        align-items: center;
        margin-top: 8px;
        &-item {
            position: relative;
            font-size: 16px;
            font-weight: bold;
            color: #333333;
            line-height: 22px;
            padding: 0 30px 28px 30px;
            cursor: pointer;
            &.active {
                color: $--color-primary;
                &::after {
                    position: absolute;
                    display: block;
                    content: "";
                    width: 34px;
                    height: 3px;
                    background: $--color-primary;
                    border-radius: 2px;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }
}
</style>

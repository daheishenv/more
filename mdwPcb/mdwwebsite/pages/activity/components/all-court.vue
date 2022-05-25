<template>
    <div class="court">
        <div
            v-if="list.length > 0"
            class="court-wrap"
        >
            <div
                v-for="(item, index) in list"
                :key="index"
                class="court-item"
            >
                <div class="court-item__top">
                    <div class="court-item__top-l">
                        <div>大赛小区</div>
                        <div>{{ item.housing_estate_name }}</div>
                    </div>
                    <div class="court-item__top-r">
                        <div>赛事时间</div>
                        <div>{{ item.contest_time }}</div>
                    </div>
                </div>
                <div class="court-item__bottom">
                    <div class="title">赛事优惠</div>
                    <div class="coupon-wrap">
                        <div class="coupon-list">
                            <div
                                v-for="couponItem in item.coupon_list"
                                :key="couponItem.id"
                                class="coupon-item"
                            >
                                {{ couponItem.title }}
                            </div>
                        </div>
                        <div
                            v-if="!item.is_contest"
                            class="court-btn"
                        >
                            <div @click="handleJoin(item.id)">报名参赛</div>
                        </div>
                        <div
                            v-else
                            class="court-btn joined"
                        >
                            <div>已参赛</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="no-data"
        >
            <no-data :show-img="true" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AllCourt',
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        async handleJoin(id) {
            const { code, msg } = await this.$axios.$post('/JobContest/applyContest', { id })
            this.$message({
                type: code === 0 ? 'success' : 'error',
                message: msg
            })
            code === 0 && this.$emit('handleGetData')
        }
    }
}
</script>

<style lang="scss" scoped>
.court {
    padding: 0 40px;
    &-wrap {
        display: flex;
        flex-wrap: wrap;
    }
    &-item {
        width: 32.33%;
        margin-right: 1.5%;
        border: 1px solid #d8d8d8;
        padding: 24px;
        margin-bottom: 24px;
        &:nth-child(3n + 3) {
            margin-right: 0;
        }
        &__top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 26px;
            &-l,
            &-r {
                width: 50%;
                div:nth-child(1) {
                    font-size: 12px;
                    color: #999;
                    margin-bottom: 8px;
                }
                div:nth-child(2) {
                    @include ellipsis;
                    font-size: 14px;
                    color: #333;
                }
            }
        }
        &__bottom {
            font-size: 12px;
            color: #999;
            margin-bottom: 8px;
            .title {
                margin-bottom: 8px;
            }
            .coupon-wrap {
                display: flex;
                justify-content: space-between;
                .coupon-list {
                    display: flex;
                    flex-wrap: wrap;
                    flex: 3;
                    .coupon-item {
                        font-size: 14px;
                        width: 132px;
                        margin: 0 8px 8px 0;
                        text-align: center;
                        height: 36px;
                        line-height: 36px;
                        border: 1px solid #4185ec;
                        color: #4185ec;
                        border-radius: 4px;
                    }
                }
                .court-btn {
                    flex: 1;
                    padding: 0 0 0 10px;
                    div {
                        width: 60px;
                        height: 60px;
                        background: #4185ec;
                        border-radius: 50%;
                        padding: 16px;
                        font-weight: 500;
                        font-size: 14px;
                        color: #fff;
                        text-align: center;
                        cursor: pointer;
                    }
                    &.joined {
                        div {
                            background: gray;
                        }
                    }
                }
            }
        }
    }
}
</style>

<template>
    <div class="court">
        <div
            v-if="listData_.length > 0"
            class="court-wrap"
        >
            <div
                v-for="item in listData_"
                :key="item.id"
                class="court-item"
            >
                <div
                    class="status-cls"
                    :class="item.statusCls"
                >{{ item.audit_status_text }}</div>
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
                    <div class="court-item__bottom-item">
                        <div>参赛设计师</div>
                        <div>{{ item.job_user_num }}</div>
                    </div>
                    <div class="court-item__bottom-item">
                        <div>参赛案例</div>
                        <div>{{ item.pattern_case_num }}</div>
                    </div>
                    <div class="court-item__bottom-item">
                        <div>总获赞数</div>
                        <div>{{ item.total_vote_num }}</div>
                    </div>
                    <div class="court-item__bottom-item">
                        <div>最高名次</div>
                        <div>{{ item.vote_rank_num }}</div>
                    </div>
                </div>
                <div class="btn">
                    <el-button
                        v-if="item.audit_status !== 1"
                        disabled
                    >查看详情</el-button>
                    <!-- @click="handleToDetail(item)" -->
                    <el-button
                        v-else
                        type="primary"
                        plain
                        @click="handleToDetail(item)"
                    >查看详情</el-button>
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
    name: 'MyCourt',
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
    computed: {
        listData_() {
            let list = []
            list = this.list.map((v) => {
                if (v.audit_status === 1) {
                    v.statusCls = 'status-cls__blue'
                } else if (v.audit_status === 2) {
                    v.statusCls = 'status-cls__red'
                } else {
                    v.statusCls = 'status-cls__gray'
                }
                return v
            })
            return list
        }
    },
    methods: {
        handleToDetail({ job_contest_id, housing_estate_name }) {
            this.$router.push({ path: 'activity/list', query: { job_contest_id, housing_estate_name } })
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
        position: relative;
        width: 32.33%;
        border: 1px solid #d8d8d8;
        padding: 24px;
        margin-right: 1.5%;
        .btn {
            display: flex;
            justify-content: center;
            margin-top: 24px;
        }
        .status-cls {
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 0px 0px 0px 13px;
            width: 90px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            &__gray {
                background: #999;
            }
            &__blue {
                background: #4185ec;
            }
            &__red {
                background: #f60d0d;
            }
        }
        &__top {
            display: flex;
            justify-content: space-between;
            padding-bottom: 16px;
            border-bottom: 1px solid #d8d8d8;
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
            padding-top: 15px;
            display: flex;
            margin: 0 -20px;
            &-item {
                flex: 1;
                text-align: center;
                div:nth-child(1) {
                    font-size: 12px;
                    color: #999;
                    margin-bottom: 4px;
                }
                div:nth-child(2) {
                    font-size: 12px;
                    color: #999;
                    margin-bottom: 4px;
                    font-size: 20px;
                    color: #4185ec;
                    font-weight: 500;
                }
            }
        }
    }
    &-item:nth-child(3n + 3) {
        margin-right: 0;
    }
}
</style>

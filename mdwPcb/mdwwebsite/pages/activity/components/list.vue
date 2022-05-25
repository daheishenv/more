<template>
    <div class="case-list">
        <div
            v-if="listData_.length > 0"
            class="case-list-wrap"
        >
            <div
                v-for="item in listData_"
                :key="item.id"
                @click="toDetail(item.id, item.job_user_id)"
            >
                <div class="img-cont">
                    <img :src="item.image" />
                    <div class="id-cls">
                        <span>{{ item.vote_num }}人投票</span>
                        <span>排名{{ item.vote_rank }}</span>
                    </div>
                    <div
                        class="status-cls"
                        :class="item.statusCls"
                    >{{ item.statusLabel }}</div>
                </div>
                <div class="word">
                    <div>{{ item.name }}</div>
                    <div>{{ item.job_user_name }}</div>
                </div>
                <div class="name">{{ item.housing_type.name }} {{ item.housing_type.area ? ' | '+item.housing_type.area+'m²':'' }} {{ item.style?' | '+item.style:'' }}</div>
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
    components: {
    },
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
            const list = this.list.map((v) => {
                if (v.audit_status === 1) {
                    v.statusLabel = '审核通过'
                    v.statusCls = 'status-cls__blue'
                } else if (v.audit_status === 2) {
                    v.statusLabel = '审核不通过'
                    v.statusCls = 'status-cls__red'
                } else {
                    v.statusLabel = '未审核'
                    v.statusCls = 'status-cls__gray'
                }
                return v
            })
            return list
        }
    },
    methods: {
        toDetail(id, job_user_id) {
            this.$router.push({ path: '/activity/case-edit', query: { id, job_user_id } })
        }
    }
}
</script>

<style lang="scss" scoped>
.case-list {
    margin: 20px -8px 0;
    &-wrap {
        display: flex;
        flex-wrap: wrap;
        & > div {
            position: relative;
            width: 25%;
            padding: 0 8px;
            margin-bottom: 24px;
            .img-cont {
                position: relative;
                cursor: pointer;
                height: 218px;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .id-cls {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 32px;
                    line-height: 32px;
                    background: rgba(0, 0, 0, 0.5);
                    color: #fff;
                    padding: 0 16px;
                    font-size: 14px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }
                .status-cls {
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 0px 0px 13px 0px;
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
            }
            .word {
                font-size: 16px;
                margin: 8px 0 4px 0;
                display: flex;
                justify-content: space-between;
                div {
                    flex: 1;
                    @include ellipsis;
                }
                div:nth-child(2) {
                    text-align: right;
                }
            }
            .name {
                color: #999;
                margin-top: 10px;
                font-size: 14px;
            }
        }
    }
}
</style>

<template>
    <div class="work-list">
        <div
            v-if="list.length > 0"
            class="work-list-wrap"
        >
            <div
                v-for="(item, index) in listData_"
                :key="index"
                class="work-list-item"
                @click="toDetail(item.id)"
            >
                <div class="img-wrap">
                    <img :src="item.cover_image">
                    <div
                        class="status-cls"
                        :class="item.statusCls"
                    >{{ item.audit_status_text }}</div>
                </div>
                <div class="item-word">
                    <div class="name">{{ item.title }}</div>
                    <div class="word">{{ item.desc }}</div>
                    <div class="time">{{ item.update_time }}</div>
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
    created() {
    },
    methods: {
        handleSearch(type) {
            if (type === 'clear') {
                this.searchData = {
                    name: '',
                    job_style_id: '',
                    estate_id: '',
                    housing_type_id: ''
                }
            }
            this.$emit('handleSearch', this.searchData)
        },
        toDetail(id) {
            this.$router.push({ path: 'work/case-edit', query: { id } })
        }
    }
}
</script>
<style lang="scss">
.work-list {
    .no-data {
        margin: 0 auto;
    }
    .work-list-wrap {
        display: flex;
        flex-wrap: wrap;
        margin-top: 24px;
    }
    &-item {
        display: flex;
        padding: 24px;
        border-radius: 4px;
        border: 1px solid #d8d8d8;
        width: 49%;
        margin-right: 2%;
        margin-bottom: 24px;
        cursor: pointer;
        &:nth-child(2n + 2) {
            margin-right: 0;
        }
        .img-wrap {
            flex-shrink: 0;
            width: 200px;
            position: relative;
            img {
                display: block;
                width: 100%;
                height: 150px;
                overflow: hidden;
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
        .item-word {
            padding: 0 0 0 24px;
            flex: 1;
            overflow: hidden;
            .name {
                color: #333;
                font-weight: 500;
                font-size: 20px;
                @include ellipsis();
            }
            .word {
                font-size: 16px;
                color: #999;
                margin: 12px 0 20px;
                @include ellipsis(3);
                line-height: 26px;
            }
            .time {
                text-align: right;
                color: #999;
                font-size: 14px;
            }
        }
    }
}
</style>

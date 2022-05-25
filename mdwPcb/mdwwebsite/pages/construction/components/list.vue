<template>
    <div class="case-list">
        <div
            class="add"
            @click="handleEdit"
        >
            <div class="add-cont">
                +
            </div>
        </div>
        <div
            v-for="item in listData_"
            :key="item.id"
            @click="handleEdit(item)"
        >
            <div class="img-cont">
                <img :src="item.cover_img" />
                <div class="id-cls">
                    <span>ID: {{ item.id }}</span>
                    <span>{{ item.stage_name }}</span>
                </div>
                <div
                    class="status-cls"
                    :class="item.statusCls"
                >{{ item.audit_status_text }}</div>
            </div>
            <div class="word">{{ item.site_name }}</div>
            <div class="name">
                <span>{{ item.housing_estate_name }} | {{ item.housing_type_name }} | {{ item.housing_style }}</span>
                <el-button
                    v-if="item.stage_status === 0 && item.audit_status === 2"
                    type="primary"
                    plain
                    size="mini"
                    @click.stop="handleAddProgress(item)"
                >新增进度</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        listData: {
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
            let data = this.listData
            data = data.map((v) => {
                if (v.audit_status === 2) {
                    v.statusCls = 'status-cls__red'
                } else if (v.audit_status === 1) {
                    v.statusCls = 'status-cls__blue'
                } else {
                    v.statusCls = 'status-cls__gray'
                }
                return v
            })
            return data
        }

    },
    methods: {
        // 新增进度
        handleAddProgress(item) {
            this.$router.push({
                path: '/construction/schedule',
                query: {
                    id: item.id || 0,
                    type: 'add'
                }
            })
        },
        // 新加工地(新加id=0)
        handleEdit(item) {
            const id = item.id || 0
            this.$router.push({
                path: '/construction/detail',
                query: {
                    id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.case-list {
    display: flex;
    margin: 40px -8px 0;
    flex-wrap: wrap;

    & > div {
        position: relative;
        width: 25%;
        padding: 0 8px;
        margin-bottom: 24px;
        cursor: pointer;
        .img-cont {
            position: relative;
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
            @include ellipsis;
            font-size: 16px;
            margin: 8px 0 4px 0;
        }
        .name {
            color: #999;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            span {
                width: 70%;
                @include ellipsis;
                line-height: 28px;
            }
        }
    }
    .add {
        color: #999;
        font-size: 50px;
        &-cont {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background: #f9f9f9;
            height: 218px;
        }
    }
}
</style>

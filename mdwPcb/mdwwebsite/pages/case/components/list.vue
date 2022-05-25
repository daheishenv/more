<template>
    <div class="case-list">
        <div
            class="add"
            @click="toDetail(0)"
        >
            <div class="add-cont">
                +
            </div>
        </div>
        <div
            v-for="item in listData_"
            :key="item.id"
            @click="toDetail(item.id)"
        >
            <div class="img-cont">
                <img :src="item.image" />
                <div class="id-cls">ID: {{ item.id }}</div>
                <div
                    class="status-cls"
                    :class="item.statusCls"
                >{{ item.statusLabel }}</div>
            </div>
            <div class="word">{{ item.name }}</div>
            <div class="name">{{ item.housing_type.name }} {{ item.housing_type.area ? ' | '+item.housing_type.area+'m²':'' }} {{ item.style?' | '+item.style:'' }}</div>
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
        toDetail(id) {
            this.$router.push({ path: 'case/case-edit', query: { id } })
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
                padding-left: 16px;
                font-size: 14px;
                width: 100%;
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
            margin-top: 10px;
            font-size: 14px;
        }
    }
    .add {
        color: #999;
        font-size: 50px;
        cursor: pointer;
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

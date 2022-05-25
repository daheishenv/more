<template>
    <div class="construction-list">
        <div
            v-for="(item, i) in list_"
            :key="i"
            class="construction-list-item"
        >
            <!-- :class="isSelecd?'active':''" -->
            <div class="construction-list-item__title">
                <span>{{ item.site_name }}</span>
                <span>负责人：{{ item.director_name }}</span>
                <span>所属小区：{{ item.housing_estate_name }}</span>
            </div>
            <div class="construction-list-item__img">
                <div class="left-cont">
                    <div class="img-cont">
                        <template v-for="(j, index) in item.imgArray">
                            <img
                                v-if="index<=5"
                                :key="index"
                                :src="j.src"
                                alt=""
                            >
                        </template>
                    </div>
                </div>
                <div class="right-cont">
                    <el-button
                        type="primary"
                        @click="selectChange(item)"
                    >{{ mode === 'case'? '选择该案例' : '选择该工地' }}</el-button>
                </div>
            </div>
        </div>
        <div
            v-if="!list_.length"
            class="nodata"
        >
            暂无数据!
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        type: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        mode: {
            type: String,
            default: ''
        }
        // selecded: {
        //     type: [String, Number],
        //     default: null
        // }
    },
    async asyncData({ $axios }) {
    },
    data() {
        return {
        }
    },
    computed: {
        list_() {
            const list = this.list.map((item) => {
                return {
                    ...item,
                    // isSelecd: Number(this.selecded) === item.id,
                    imgArray: JSON.parse(item.site_images)
                }
            })
            return list
        }
    },
    methods: {
        selectChange(item) {
            this.$emit('change', item)
        }
    }
}
</script>
<style lang="scss">
.nodata {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    border: 1px solid #ddd;
}
.construction-list {
    padding-top: 24px;
    &-item {
        margin-top: 24px;
        padding: 24px;
        border-radius: 4px;
        border: 1px solid #d8d8d8;
        &:first-child {
            margin-top: 0;
        }
        &__title {
            color: #999;
            margin-bottom: 16px;
            span:nth-child(1) {
                font-size: 16px;
                font-weight: 500;
                color: #333;
            }
            span {
                margin-right: 24px;
            }
        }
        &__img {
            display: flex;
            .left-cont {
                width: 85%;

                .img-cont {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    img {
                        flex: 1;
                        overflow: hidden;
                        margin-right: 16px;
                    }
                }
            }
            .right-cont {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 15%;
            }
        }
    }
}
</style>

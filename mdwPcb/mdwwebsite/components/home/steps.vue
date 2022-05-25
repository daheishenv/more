<template>
    <div class="steps">
        <div
            v-for="(item, index) in list"
            :key="index"
            class="steps-item"
            :class="active>index? 'active':''"
        >
            <div class="steps-item-left">
                <div class="spot"></div>
                <div
                    class="line"
                    :class="active-1>index? 'active':''"
                ></div>
            </div>
            <div class="steps-item-title">

                <div class="name">{{ item.remark }}
                </div>
                <div class="desc">{{ item.create_time }}</div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Number,
            default: 0
        },
        list: {
            type: Array,
            default: () => {
                return []
            }
        },
        activeColor: {
            type: String,
            default: '$--color-primary'
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.steps {
    &-item {
        display: flex;
        align-items: flex-start;
        &-left {
            align-self: stretch;
            display: flex;
            flex-direction: column;
            .spot {
                position: relative;
                width: 16px;
                height: 16px;
                background: #dedede;
                border-radius: 50%;
                margin-right: 16px;
                flex-shrink: 0;
                top: 3px;
                &::before {
                    position: absolute;
                    content: "";
                    width: 6px;
                    height: 6px;
                    background: #ffffff;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                }
            }
            .line {
                min-height: 46px;
                width: 1px;
                border-left: 2px dashed #dedede;
                margin-left: 7px;
                flex: 1;
                &.active {
                    border-color: $--color-primary;
                }
            }
        }
        &-title {
            display: flex;
            align-items: flex-start;
            margin-bottom: 46px;
            .name {
                font-size: 16px;
                font-weight: 400;
                color: #333333;
                line-height: 22px;
                margin-right: 20px;
                word-break: break-all;
            }
            .desc {
                font-size: 16px;
                font-weight: 400;
                color: #999999;
                line-height: 22px;
                flex-shrink: 0;
            }
        }
        &:last-child {
            .line {
                display: none;
            }
        }
        &.active {
            .steps-item-left {
                .spot {
                    background: $--color-primary;
                }
            }
        }
    }
}
</style>

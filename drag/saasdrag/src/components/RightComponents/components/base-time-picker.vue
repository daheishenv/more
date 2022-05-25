<template>
    <div>
        <el-date-picker
            ref="form"
            v-model="dataList"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="timestamp"
            end-placeholder="结束日期"
            format="MM-dd HH:mm"
        ></el-date-picker>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [Object, Array],
            default: () => {
                return {}
            }
        },
    },
    data() {
        return {
            dataList: [],
            defaultList: []
        }
    },
    watch: {
        value: {
            handler(val) {
                console.log(val);
                if (val && val[0]) {
                    let start_time = 0;
                    let end_time = 0;
                    // 前端传入的数据格式与服务端返回的格式不同
                    if (val[0].start_time && val[0].end_time) {
                        start_time = val[0].start_time
                        end_time = val[0].end_time
                    }
                    if (val[0].data && val[0].data.start_time && val[0].data.end_time) {
                        start_time = val[0].data.start_time
                        end_time = val[0].data.end_time
                    }
                    const time = [start_time, end_time]
                    this.dataList = this.$deepClone(time)
                    this.defaultList = this.$deepClone(time)
                }
            },
            deep: true,
            immediate: true
        },
        dataList: {
            handler(val) {
                if (!val) return
                if (this.$c.diffByObj(val, this.defaultList)) return
                const options = [
                    {
                        data: {
                            start_time: val[0],
                            end_time: val[1]
                        }
                    }
                ]
                this.$emit('input', options)
            },
            deep: true
        }
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-date-editor {
    width: 220px;
}
</style>
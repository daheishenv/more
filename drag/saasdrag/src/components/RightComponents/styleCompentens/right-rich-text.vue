<template>
    <div>
        <el-form ref="form" label-width="auto">
            <el-form-item :label="item.label" v-for="(item,i) in formList" :key="i">
                <div align="right">
                    <base-button v-if="item.type === 'select'" v-model="item.value" :type="item.key" @change="onchange($event, item.pro)" />
                    <div
                        v-if="item.type === 'color'"
                        style="display: inline-block;width: 120px;text-align: right;"
                    >
                        <el-color-picker
                            v-model="item.value"
                            @change="changeColor($event,item.key)"
                            :show-alpha="false"
                        ></el-color-picker>
                    </div>
                </div>
            </el-form-item>
            <div id="div1"></div>
        </el-form>
    </div>
</template>

<script>
/** 富文本编辑器 文档地址 https://www.wangeditor.com/doc/ */
import E from 'wangeditor'
export default {
    props: {
        formList: {
            type: Array,
            default() {
                return []
            }
        },
        iStyle: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            richText: ''
        }
    },
    watch: {
        '$store.state.currentCheckAttr.item.module_no': {
            handler(val) {
                let newVal = parseInt(val)
                let arr = this.$store.state.shopHomeData.find(item => item.module_no == newVal) || {}
                this.richText = arr.data
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        const editor = new E(document.getElementById('div1'))
        // 设置编辑区域高度为 500px
        editor.config.height = 300
        // 配置全屏功能按钮是否展示
        editor.config.showFullScreen = false
        editor.config.colors = [
            '#000000',
            '#eeece0',
            '#1c487f',
            '#4d80bf'
        ]
        // 注意，先配置 height ，再执行 create()
        editor.create()
        this.$nextTick(() => {
            editor.txt.html(this.richText) // 重新设置编辑器内容
            // 配置 onblur 回调函数
            editor.config.onblur  = (newHtml) => {
                console.log("onblur 之后最新的 html", newHtml);
                let dataList = {}
                dataList.data = newHtml
                // 修改homeData的值
                this.$store.dispatch('setHomeData', {
                    data: dataList,
                    refresh: true
                })
            };
        }) 
    },
    methods: {
        // 背景颜色
        changeColor(val, key) {
            this.$store.commit('setItemKey', {
                key: 'formList',
                value: this.formList
            })
            this.$store.commit('setCurrentCheckItemStyle', {
                data: {
                    ...this.iStyle,
                    [key]: val
                }
            })
        },
        // 全屏展示
        onchange(e) {
            console.log(e);
        },
        submit () {
            console.log(this.$refs.text.value)
        }
    }
}
</script>

<style>
    #div1 {
        /* border: 1px solid #ebedf0; */
        box-shadow: 0px 0px 1px 1px #ebedf0;
    }
</style>
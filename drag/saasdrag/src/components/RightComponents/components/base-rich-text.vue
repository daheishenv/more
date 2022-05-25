<template>
    <div>
        <div class="c-tl" id="rich-text"></div>
    </div>
</template>

<script>
/** 富文本编辑器 文档地址 https://www.wangeditor.com/doc/ */
import E from 'wangeditor'
export default {
    props: {
        value: {
            type: [Object, Array],
            default: () => {
                return []
            }
        }
    },
    mounted() {
        const oDiv = document.getElementById('rich-text')
        console.log(oDiv);
        const editor = new E(oDiv)
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
        let content = this.value[0].desc
        editor.txt.html(content) // 重新设置编辑器内容
        // 配置 onblur 回调函数
        editor.config.onchange  = (newHtml) => {
            console.log("onblur 之后最新的 html", newHtml);
            this.$emit('input', [
                {
                    desc: newHtml
                }
            ])
        };
    }
}
</script>

<style lang="scss" scoped>
    #rich-text {
        /* border: 1px solid #ebedf0; */
        box-shadow: 0px 0px 1px 1px #ebedf0;
    }
</style>
<template>
    <div class="base-rich-text-new">
        <vue-ueditor-wrap
            v-model="dataList"
            :config="myConfig"
            :destroy="true"
        ></vue-ueditor-wrap>
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
        }
    },
    data() {
        return {
            dataList: '',
            defaultList: '',
            myConfig: {
                // 编辑器不自动被内容撑高
                // autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 300,
                // 初始容器宽度
                initialFrameWidth: '100%',
                imageUrlPrefix: '',
                wordCount: true, // 字数限制
                maximumWords: 10000,   // 字数限制长度
                toolbars: [
                    [
                        'undo', //撤销
                        // 'redo', //重做
                        'bold', //加粗
                        'indent', //首行缩进
                        'italic', //斜体
                        'underline', //下划线
                        'strikethrough', //删除线
                        'subscript', //下标
                        'fontborder', //字符边框
                        'superscript', //上标
                        'formatmatch', //格式刷
                        'pasteplain', //纯文本粘贴模式
                        'selectall', //全选
                        'horizontal', //分隔线
                        'time', //时间
                        'date', //日期
                        // 'insertrow', //前插入行
                        // 'insertcol', //前插入列
                        // 'mergeright', //右合并单元格
                        // 'mergedown', //下合并单元格
                        // 'deleterow', //删除行
                        // 'deletecol', //删除列
                        // 'splittorows', //拆分成行
                        // 'splittocols', //拆分成列
                        // 'splittocells', //完全拆分单元格
                        // 'deletecaption', //删除表格标题
                        'inserttitle', //插入标题
                        // 'mergecells', //合并多个单元格
                        // 'deletetable', //删除表格
                        'cleardoc', //清空文档
                        // 'insertparagraphbeforetable', //"表格前插入行"
                        'fontfamily', //字体
                        'fontsize', //字号
                        // 'paragraph', //段落格式
                        'simpleupload', //单图上传
                        // 'edittd', //单元格属性
                        'justifyleft', //居左对齐
                        'justifyright', //居右对齐
                        'justifycenter', //居中对齐
                        'justifyjustify', //两端对齐
                        'forecolor', //字体颜色
                        'backcolor', //背景色
                        'insertorderedlist', //有序列表
                        'insertunorderedlist', //无序列表
                        'directionalityltr', //从左向右输入
                        'directionalityrtl', //从右向左输入
                        'rowspacingtop', //段前距
                        // 'imageleft', //左浮动
                        // 'imageright', //右浮动
                        // 'imagecenter', //居中
                        'lineheight', //行间距
                        'edittip ', //编辑提示
                        'touppercase', //字母大写
                        'tolowercase', //字母小写
                        // 'inserttable', //插入表格
                    ]
                ],
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                serverUrl: location.origin + '/static/plugin/ueditoross/php/controller.php?action=uploadimage',
                // UEDITOR_HOME_URL: 'http://devsj.zzsupei.com/static/plugin/ueditoross/',
                UEDITOR_HOME_URL: location.origin + '/static/plugin/ueditoross/',
                langPath: location.origin + '/static/plugin/ueditoross/'
            }
        }
    },
    watch: {
        value: {
            handler(val) {
                if (val && val[0] && Object.keys(val[0]).indexOf('desc') !== -1) {
                    this.dataList = val[0].desc
                    this.defaultList = val[0].desc
                }
            },
            immediate: true,
            deep: true
        },
        dataList: {
            handler(val) {
                if (this.$c.diffByObj(val, this.defaultList)) {
                    return
                }
                const options = [
                    {
                        desc: val
                    }
                ]
                this.$emit('input', options)
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.base-rich-text-new {
    text-align: left;
}
</style>
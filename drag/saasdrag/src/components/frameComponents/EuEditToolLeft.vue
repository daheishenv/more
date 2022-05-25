<template>
    <div class="tool">
        <template v-if="(pattern === 'component') || (checkFile && checkFile.isCanDrag === true)">
            <div class="tool-item">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="把组件托到这里删除"
                    placement="right"
                >
                    <draggable
                        :group="{ name: deleteGroupName}"
                        :options="{
                                }"
                        :sort="false"
                        class="tool-item-icon"
                        @change="draggableChange"
                    >
                        <i
                            class="el-icon-delete-solid"
                            style="font-size: 23px;color: white;"
                        ></i>
                    </draggable>
                </el-tooltip>
            </div>
            <div class="tool-item">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击查看uni代码"
                    placement="right"
                >
                    <div
                        class="tool-item-icon"
                        @click="outPort"
                    >
                        <i
                            class="el-icon-view"
                            style="font-size: 23px;color: white;"
                        ></i>
                    </div>
                </el-tooltip>
            </div>

            <div class="tool-item">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="创建新项目"
                    placement="right"
                >
                    <div
                        class="tool-item-icon"
                        @click="addProject"
                    >
                        <i
                            class="el-icon-circle-plus"
                            style="font-size: 23px;color: white;"
                        ></i>
                    </div>
                </el-tooltip>
            </div>

            <div
                class="tool-item block"
                style="height: 130px"
            >
                <el-slider
                    v-model="phoneSize"
                    vertical
                    :min="100"
                    :step="5"
                    :max="150"
                    input-size="mini"
                    height="100px"
                >
                </el-slider>
            </div>

            <div
                class="tool-item"
                v-if="pattern === 'component'"
            >
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="保存组件"
                    placement="right"
                >
                    <div
                        class="tool-item-icon"
                        style="background-color: #00d2dc"
                        @click="saveComponenet"
                    >
                        <i
                            class=" el-icon-s-check"
                            style="font-size: 23px;color: white;"
                        ></i>
                    </div>
                </el-tooltip>
            </div>
        </template>
    </div>
</template>

<script>
import draggable from '@/utils/vuedraggable'
import { outExportFileByStr, outExportStr, VUE_NAME } from '@/utils/outExportFile'

let validateComponentName = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入组件名称'));
    } else {
        let regx = /^[a-zA-Z]+$/;
        if (!regx.test(value)) {
            callback(new Error('名称只能由大小写字母组成'));
        } else {
            callback();
        }
    }
};

export default {
    name: 'EuEditTool',
    data() {
        return {
            saveComponentModel: false,
            addComponentsFrom: {
                ComponentName: ''
            },
            addComponentsFromRule: {
                ComponentName: [{ validator: validateComponentName, trigger: 'blur' },]
            },

            form: {
                fileName: ''
            },
            rule: {
                fileName: [{ required: true, message: '请输入导出文件名称', trigger: 'blur' },]
            },
            dialogTableVisible: false,
            showDialogData: '',

            addProjcetFrom: {
                projectName: '',
                projectType: 'uni-app'
            },
            addProjcetFromRule: {
                projectName: [{ required: true, message: '请输入项目名称' }],
            },

            addFileForm: {
                fileName: '',
                fileType: '0',
                isAddPagePath: false
            },
            addFileRule: {
                fileName: [{ required: true, message: '请输入文件或文件夹名称' }],
                fileType: [{ required: true, message: '请选择文件类型' }],
            },
            addFileTypeSelect: [{
                value: '0',
                label: '文件夹'
            }, {
                value: '1',
                label: '拖拽文件'
            }],
        }
    },
    created() {

    },
    watch: {
        addFileModel(val) {
            if (val) {
                this.$refs['addFileForm'].clearValidate()
            }
        }
    },
    methods: {
        yesaddComponents(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    let name = this.addComponentsFrom.ComponentName
                    let list = this.$store.state.patternComponents.list
                    if (list.length === 0) {
                        this.$notify.error({
                            title: '错误',
                            message: '组件内容为空！'
                        });
                        return false
                    }
                    this.$store.commit('setComponentsList', { name, list })
                    this.$store.commit('setPatternComponentslList', { list: [] })
                    this.closeComponentsModel()
                } else {
                    return false;
                }
            });
        },
        closeComponentsModel() {
            this.addComponentsFrom.ComponentName = ''
            this.saveComponentModel = false
        },
        addFileNameInput(val) {
            if (this.addFileForm.fileType !== 'folder') {
                this.addFileForm.fileName = val + '.vue'
            }
            this.addFileForm.fileName = val
        },
        addProject() {
            this.$store.commit('setAddProjectModel', { addProjectModel: true })
        },
        outPort() {
            let list = []
            let fileStyleAndClass = {}
            let mode = 'page'
            switch (this.$store.state.pattern) {
                case 'page':
                    list = this.checkFile.dragList
                    this.form.fileName = this.checkFile.label.replace('.vue', '')
                    fileStyleAndClass = this.checkFile.fileStyleAndClass
                    break
                case 'component':
                    list = this.$store.state.patternComponents.list
                    mode = 'component'
                    break
            }

            let showDialogData = outExportStr(list, this.$store.state.currentCheckAttr.customClass, fileStyleAndClass, mode)
            this.showDialogData = showDialogData.replace(VUE_NAME, this.form.fileName)
            this.dialogTableVisible = true
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    outExportFileByStr(this.form.fileName + '.vue', this.showDialogData)
                } else {
                    return false;
                }
            });
        },
        closeProjectModel() {
            this.$store.commit('setAddProjectModel', { addProjectModel: false })
        },
        closeAddFileModel(formName = undefined) {
            this.addFileForm.fileName = ''
            this.addFileForm.fileType = '0'
            this.addFileForm.isAddPagePath = false
            this.$store.commit('setAddFileModel', { addFileModel: false })
        },
        saveComponenet() {
            this.saveComponentModel = true
        },
        draggableChange(e) {
            if (e.added) {
                this.delMyComponentsToFolder(e.added)
            }
        },
        delMyComponentsToFolder(el) {
            let { componentName } = el.element
            if (componentName === "MyComponentsEntity") {
                this.$store.dispatch('delCompentsFile', { componentName: el.element.name })
            }
        },
    },
    computed: {
        pattern() {
            return this.$store.state.pattern
        },
        phoneSize: {
            get() {
                return this.$store.state.phoneSize
            },
            set(val) {
                let obj = { phoneSize: val }
                this.$store.commit('setPhoneSize', obj)
            }
        },
        deleteGroupName() {
            return this.$store.state.project.deleteGroupName
        },
        addProjectModel() {
            return this.$store.state.euEditTool.addProjectModel
        },
        addFileModel() {
            return this.$store.state.euEditTool.addFileModel
        },
        checkFile() {
            if (this.$store.state.project.checkFile) {
                return this.$store.state.project.checkFile
            }
            return {}
        },
    },
    components: {
        draggable
    }
}
</script>

<style scoped lang="scss">
.tool {
    $toolWidth: 50px;

    position: absolute;
    left: 10px;
    top: 20px;
    width: $toolWidth;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    &-item {
        width: $toolWidth;
        height: $toolWidth;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &-icon {
            width: $toolWidth * 0.8;
            height: $toolWidth * 0.8;
            background-color: #ff5b3d;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: $toolWidth;
            box-shadow: 0 2px 11px 3px rgba(0, 0, 0, 0.15),
                0 0 6px 0px rgba(0, 0, 0, 0.04);
        }
    }
}

.code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
        monospace;
    color: #476582;
    padding: 0.25rem 0.5rem;
    margin: 0;
    font-size: 13px;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    user-select: text;
    text-align: left;
}
</style>

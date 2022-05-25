<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-20 11:48:28
-->
<template>
    <div>
        <select-dialog
            v-model="showDialog_"
            :title="title"
            @submit="handleSubmit"
        >
            <div class="pb24 flex-space-between">
                <div class="flex">
                    <el-button
                        type="primary"
                        class="el-form-item__btn"
                        @click="handleSetAdd"
                    >新增</el-button>
                    <el-button
                        type="primary"
                        class="el-form-item__btn"
                        @click="handleRefrsh"
                    >刷新</el-button>
                </div>
            </div>
            <el-tabs
                type="border-card"
                v-model="tabValue"
                @tab-click="handleTabClick"
            >
                <el-tab-pane
                    label="全部展厅"
                    name="table"
                >
                    <el-table
                        v-loading="isLoading"
                        ref="multipleTable"
                        border
                        :data="tableData"
                        :title="title"
                        @select="handleSelectionChange"
                        @select-all="handleSelectAll"
                    >
                        <el-table-column
                            type="selection"
                            align="center"
                            width="55"
                        >
                        </el-table-column>
                        <el-table-column
                            property="title"
                            label="标题"
                            align="center"
                            width="120"
                        ></el-table-column>
                        <el-table-column
                            label="封面图片"
                            align="center"
                            width="120"
                        >
                            <template slot-scope="{row}">
                                <c-image
                                    size="80"
                                    :src="row.img_url"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column
                            property="target_url"
                            label="3D全景链接地址"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            label="操作"
                            width="160"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    class="mr12"
                                    @click="handleEdit(scope.$index, scope.row)"
                                >编辑</el-button>
                                <el-popconfirm
                                    width="190"
                                    title="确定删除吗？"
                                    @confirm="handleDelete(scope.$index, scope.row)"
                                >
                                    <el-button
                                        slot="reference"
                                        size="mini"
                                        type="danger"
                                    >删除</el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="el-pagination-box">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-sizes="[10, 20, 50, 100]"
                            background
                            :page-size="limit"
                            layout="prev, pager, next, sizes"
                            :total="count"
                        >
                        </el-pagination>
                        <span>共{{count}}条</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    :label="`已选展厅（${multipleSelection.length}）`"
                    name="operation"
                >
                    <chooseOperation
                        ref="chooseOperation"
                        imgKey="img_url"
                        titleKey="title"
                        row="5"
                        @change="handleDragChange"
                        :operationReqName='operationReqName'
                        :operationReqParam="operationReqParam_"
                        :multipleSelection="multipleSelection"
                    />
                </el-tab-pane>
            </el-tabs>
        </select-dialog>
        <select-dialog
            v-model="showSetDialog"
            title="展厅配置"
            @submit="handleSetSubmit"
            @input="handleClearFiles"
        >
            <div>
                <el-form
                    label-width="130px"
                    style="width: 600px"
                    ref="setForm"
                    :rules="rules"
                    :model="form"
                >
                    <el-form-item label="封面图片">
                        <el-upload
                            :class="{hide: hideUpload_}"
                            ref="upload"
                            action="1"
                            list-type="picture-card"
                            :auto-upload="false"
                            accept="image/png, image/jpeg"
                            :on-change="handleUpload"
                            :on-remove="handleRemove"
                            :limit="1"
                            :file-list="uploadArr"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item
                        label="标题"
                        prop="title"
                        class="mb36"
                    >
                        <el-input
                            width="150"
                            v-model="form.title"
                            placeholder="请输入标题"
                        />
                    </el-form-item>
                    <el-form-item
                        label="3D全景链接地址"
                        prop="data"
                    >
                        <el-input
                            width="150"
                            v-model="form.data"
                            placeholder="请输入地址"
                        />
                    </el-form-item>
                    <el-form-item>
                        <span style="color: #999;">只支持小红屋、酷家乐的外部链接</span>
                    </el-form-item>
                    <el-form-item
                        label="介绍"
                        prop="intro"
                    >
                        <el-input
                            width="150"
                            v-model="form.intro"
                            placeholder="请输入内容"
                        />
                    </el-form-item>
                </el-form>
            </div>
        </select-dialog>
    </div>
</template>

<script>
import tableMixins from './mixins/table'
export default {
    mixins: [tableMixins],
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableData: [],
            selectData: [],
            count: 0,
            page: 1,
            limit: 10,
            showSetDialog: false,
            form: {
                id: '',
                cover_img_url: '',
                title: '',
                data: '', // 3d
                intro: ''
            },
            hideUpload: false,
            listReqName: 'd3room',
            uploadArr: [],
            operationReqName: 'Shop/d3room',
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                data: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ],
                intro: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        hideUpload_() {
            return !!this.form.cover_img_url || (this.uploadArr && this.uploadArr.length)
        }
    },
    methods: {
        handleSetSubmit(e) {
            if (!this.form.cover_img_url) return this.$message.error('请添加图片')
            this.$refs.setForm.validate((valid) => {
                if (valid) {
                    try {
                        this.$http('d3roomSet', {
                            ...this.form
                        })
                        this.handleClearFiles()
                        this.showSetDialog = false
                        this.$nextTick(() => {
                            this.getList()
                            // this.$message('刷新数据')
                        })
                    } catch (err) {
                        console.log(err);
                        this.$message.error(err.msg)
                    }
                }
            })
        },
        handleUpload() {
            const ev = event || window.event;
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (e) => {
                // console.log('e.target.result', e.target.result);
                const filePath = e.target.result
                const { data } = await this.$http('uploadImg', {
                    filePath,
                    name: 'file',
                })
                this.form.cover_img_url = data.src
                // this.$refs.setForm.resetFields();
            }
        },
        handleRemove() {
            this.form.cover_img_url = ''
            this.uploadArr = []
        },
        handleClearFiles() {
            this.$refs && this.$refs.upload && this.$refs.upload.clearFiles()
        },
        handleSetAdd() {
            this.form = {
                cover_img_url: '',
                title: '',
                data: '', // 3d
                intro: ''
            }
            this.showSetDialog = true
        },

        handleEdit(index, row) {
            this.form.id = row.id
            this.form.cover_img_url = row.img_url
            this.form.data = row.target_url
            this.uploadArr = [{ url: row.img_url }]
            this.showSetDialog = true
        },
        async handleDelete(index, row) {
            await this.$http('d3roomDel', {
                id: row.id
            })
            this.getList()
        },
    }
}
</script>


<style lang="scss" scope>
.select-dialog {
    /deep/ .hide .el-upload--picture-card {
        display: none;
    }
    .el-pagination-box {
        margin-top: 12px;
        font-size: 12px;
        @include flex(row);
        align-items: center;
        justify-content: center;
        /deep/ .el-pagination {
            .btn-next,
            .btn-prev {
                height: 28px;
                line-height: 28px;
                border: none;
            }
        }
    }
}
</style>
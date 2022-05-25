<template>
    <el-row class="eu-header">
        <el-col
            :span="6"
            class="eu-header-hd"
        >
            <h2> {{ shopName }}</h2>
        </el-col>
        <!-- <el-col :span="12">
            <view>
                <el-select v-model="centerValue" placeholder="请选择" size="mini"  style="width: 130px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </view>
        </el-col>
        <el-col :span="6">

            <view style="display: flex;align-items: center;font-size: 14px;color: #5f5e5e;justify-content: flex-end">

                <span style="margin-right: 5px">布局锁定</span>
                <el-switch
                        v-model="layoutLock"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
                <div style="width: 20px;"></div>
                <span style="margin-right: 5px">预览</span>
                <el-switch
                        v-model="preview"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
                <a href="https://github.com/wozhishilaonanhai/dragUI" target="_blank"
                   style="position: relative;width: 50px;display: flex;justify-content: center;align-items: center;margin-left: 20px">
                    <el-image
                            style="width: 40px; height: 40px;border-radius: 40px;cursor: pointer"
                            src="https://github.com/fluidicon.png"
                            fit="fill"></el-image>
                </a>
            </view>
        </el-col> -->
        <el-col
            class="eu-header-ft"
            :span="18"
        >
            <el-popover
                class="btn-prev"
                placement="bottom"
                width="174"
                trigger="click"
            >
                <div v-loading="!prevQRCode">
                    <c-image
                        size="150px"
                        :src="prevQRCode"
                    />
                </div>
                <el-button
                    slot="reference"
                    @click="handleView"
                >
                    <div class="flex align-center">
                        <c-image
                            size="20px"
                            src="drag/EuHeader/prev.png"
                        />
                        预览
                    </div>
                </el-button>
            </el-popover>
            <el-button
                type="danger"
                @click="closeProject"
            >
                <div class="flex align-center">
                    <c-image
                        size="14px"
                        src="drag/EuHeader/cancel.png"
                    />取消
                </div>
            </el-button>
            <el-button
                type="primary"
                @click="saveProject"
            >
                <div class="flex align-center">
                    <c-image
                        size="14px"
                        src="drag/EuHeader/save.png"
                    />发布
                </div>
            </el-button>
        </el-col>
    </el-row>
</template>

<script>
import { getQueryVariable } from '@/utils/utils'
import html2canvas from "html2canvas";
import { mapActions } from 'vuex'

import { Loading } from 'element-ui'; //项目已经全局引入element的话可以不单独引入
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
export default {
    name: 'EuHeader',
    data() {
        return {
            options: [{
                value: 'page',
                label: '页面模式'
            }, {
                value: 'component',
                label: '组件模式'
            }],
            shopName: '',
            prevQRCode: '',
            saveBusy: false
        }
    },
    created() {
        this.shopName = decodeURIComponent(getQueryVariable('shop_name') || '商家名称')
    },
    updated(e) {
        console.log('updatedupdatedupdatedupdated', e);
    },
    computed: {
        centerValue: {
            set(val) {
                this.$store.commit('setPattern', { pattern: val })
            },
            get() {
                return this.$store.state.pattern
            }
        },
        preview: {
            get() {
                return this.$store.state.preview
            },
            set(val) {
                this.$store.commit('setPreview', { preview: val })
            }
        },
        layoutLock: {
            get() {
                return this.$store.state.showFlexDraggalbeHandle
            },
            set(val) {
                this.$store.commit('setShowFlexDraggalbeHandle', { showFlexDraggalbeHandle: val })
            }
        }
    },
    methods: {
        ...mapActions(['getCustomPreviewQRcode']),
        async saveProject() {
            if (this.saveBusy) return
            this.saveBusy = true
            const itemList = this.$store.state.project.pageList
            if (!itemList.length) return this.$message('请先创建项目');
            let params = {
                page_id: this.$store.state.page_id,
                login_uid: this.$store.state.login_uid,       
                username: this.$store.state.username, 
                list: itemList.map(o => {
                    return {
                        api: o.api,
                        // 如果有extra.keyword且长度不为零，则代表当前切换到关键词模式，需要清空apiParam（因为apiParam里保存的是分类的草稿数据）
                        apiParam: (o.extra.keyword && o.extra.keyword.length) ? {} : o.apiParam,
                        cmptId: o.cmptId,
                        extra: o.extra,
                        id: o.id,
                        module_name: o.module_name,
                        module_no: o.module_no,
                        sub_title: o.sub_title,
                        title: o.title
                    }
                })
            }
            try {
                await this.$confirm('是否要保存项目?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                await this.$http('saveModule', params);
                let { data: {
                    version_id
                } } = await this.$http('shopInfo');
                if (version_id === 4) {
                    try {
                        await this.$confirm('发布成功，是否要生成预览图?', '提示', {
                            confirmButtonText: '生成',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        await this.savePosterImg();
                    } catch (error1) {
                        console.log('error1', error1);
                    }
                } else {
                    this.$message({
                        message:'发布成功',
                        type: 'success'
                    })
                }
                setTimeout(() => {
                    console.log('closeDrayLayer');
                    this.closeDrayLayer()
                }, 1000)
            } catch (error) {
                console.log('error', error);
            }
            this.saveBusy = false
        },
        async savePosterImg() {
            const loading = Loading.service({           // 声明一个loading对象
                lock: true,                             // 是否锁屏
                text: '正在生成预览图,大概等待10秒钟',                     // 加载动画的文字
                spinner: 'el-icon-loading',             // 引入的loading图标
                background: 'rgba(0, 0, 0, 0.5)',       // 背景颜色
                target: '.sub-main',                    // 需要遮罩的区域
                body: true,
                customClass: 'poster-loading'                     // 遮罩层新增类名
            })
            await this.$store.dispatch('setScrollTop', { top: Math.random() / 2, animate: false })
            this.$emit('select', { detail: { value: -1 } })
            // 保证触发滚动
            await delay(100)
            // 滚动滚动到顶部
            await this.$store.dispatch('setScrollTop', { top: 0, animate: false })

            const container = document.getElementById('phone-scroll-container')
            // 设置放大倍数
            const scale = window.devicePixelRatio;

            // 传入节点原始宽高
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            // const height = document.getElementById('phone-scroll-view').offsetHeight;

            // html2canvas配置项
            const ops = {
                scale,
                width,
                height,
                useCORS: true, // 【重要】开启跨域配置
                allowTaint: false, //允许跨域图,一般不适用，他会导致无法转换成图片，因为安全策略问题
                taintTest: true, //是否在渲染前测试图片
                imageTimeout: 1000
            };

            const canvas = await html2canvas(container, ops)
            const imgBlobData = canvas.toDataURL("image/png", 1.0)
            const { data } = await this.$http('uploadImg', {
                filePath: imgBlobData,
                name: 'file'
            })
            const { file_path: cover_img_url } = data
            const { msg } = await this.$http('saveCoverImg', {
                cover_img_url,
                id: this.$store.state.page_id
            })
            loading.close()
            this.$message({
                type: 'success',
                message: msg
            });
        },
        // 取消
        closeProject() {
            parent.closeDrayLayer && parent.closeDrayLayer()
        },
        // 后台关闭layer所有弹窗
        closeDrayLayer() {
            parent.closeLayerAll && parent.closeLayerAll()
        },
        async handleView() {
            this.prevQRCode = ''
            const data = await this.getCustomPreviewQRcode()
            this.prevQRCode = data
        },
    }
}
</script>

<style lang="scss" scoped>
.eu-header {
    &-hd {
        color: #675e6f;
        text-align: left;
        font-size: 18px;
        font-weight: bold;
    }
    &-ft {
        text-align: right;
        // @include flex(row);
        // align-items: center;
        // justify-content: flex-end;
        height: 100%;
        .el-button {
            padding: 8px 20px;
            margin-left: 10px;
            vertical-align: middle;
            .c-image {
                margin-right: 5px;
            }
        }
        .btn-prev {
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            /deep/ .el-popover__reference-wrapper {
                display: block;
            }
            .el-button {
                padding: 5px 20px;
                background-color: transparent;
                color: #595961;
                border-color: transparent;
            }
        }
    }
}
</style>

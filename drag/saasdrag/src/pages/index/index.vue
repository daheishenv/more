<template>
    <div class="home">
        <el-container>
            <el-header>
                <eu-header @select="handleSelect">
                </eu-header>
            </el-header>
            <el-container>
                <el-aside
                    width="274px"
                    align="center"
                >
                    <LeftComponents></LeftComponents>
                </el-aside>
                <el-main style="position: relative">
                    <!-- 注释左右侧工具栏 -->
                    <!-- <eu-edit-tool-left></eu-edit-tool-left> -->
                    <PhoneFrame ref="phoneFrameEl"></PhoneFrame>
                    <!-- 组件小角标 -->
                    <CrabEditToolRight
                        @select="handleSelect"
                        @delete="handleDelete"
                    ></CrabEditToolRight>
                    <!-- 组件小角标 -->
                    <CrabManageToolRight
                        @select="handleSelect"
                        @delete="handleDelete"
                    ></CrabManageToolRight>
                </el-main>
                <el-aside width="380px">
                    <RightComponents></RightComponents>
                </el-aside>
            </el-container>
        </el-container>
        <design-dialog
            v-model="designDialogFlag"
            title="设计师"
            :defaultValue="defaultValue"
            :panelValue="panelValue"
            :condition="condition"
            @submit="handleSubmit"
        />
        <case-dialog
            v-model="caseDialogFlag"
            title="案例"
            :defaultValue="defaultValue"
            :panelValue="panelValue"
            :condition="condition"
            @submit="handleSubmit"
        />
        <d3room-dialog
            v-model="d3roomDialogFlag"
            :defaultValue="defaultValue"
            :panelValue="panelValue"
            :condition="condition"
            title="全方位展厅"
            @submit="handleSubmit"
        />
        <team-dialog
            v-model="teamDialogFlag"
            :defaultValue="defaultValue"
            :panelValue="panelValue"
            :condition="condition"
            title="施工团队"
            @submit="handleSubmit"
        />
        <craft-dialog
            v-model="craftDialogFlag"
            :defaultValue="defaultValue"
            :panelValue="panelValue"
            :condition="condition"
            title="施工工艺"
            @submit="handleSubmit"
        />

        <goods-dialog
            v-model="goodsDialogFlag"
            :defaultValue="defaultValue"
            :panelValue="panelValue"
            :condition="condition"
            title="选中商品"
            @submit="handleSubmit"
        />
        <coupons-dialog
            v-model="couponsDialogFlag"
            title="优惠券"
            :defaultValue="defaultValue"
            :panelValue="panelValue"
            :condition="condition"
            @submit="handleSubmit"
        />

        <form-dialog
            v-model="fromDialogFlag"
            :defaultValue="defaultValue"
            :panelValue="panelValue"
            :condition="condition"
            title="表单定义"
            @submit="handleSubmit"
        />

        <!-- 分类弹窗 -->
        <category-dialog
            v-model="categoryDialogFlag"
            :defaultValue="defaultValue"
            title="选择分类"
            @submit="handleSubmit"
        />

        <!-- 选择套餐包弹窗 -->
        <package-dialog
            v-model="packageDialogFlag"
            :defaultValue="defaultValue"
            title="选择套餐包"
            @submit="handleSubmit"
        />
    </div>
</template>

<script>
import PhoneFrame from '@/components/PhoneFrame/PhoneFrame'
import LeftComponents from '@/components/LeftComponents/LeftComponents'
import CrabEditToolRight from '@/components/frameComponents/CrabEditToolRight'
import CrabManageToolRight from '@/components/frameComponents/CrabManageToolRight'
import EuHeader from '@/components/frameComponents/EuHeader'
import EuEditToolLeft from '@/components/frameComponents/EuEditToolLeft'
import RightComponents from '@/components/RightComponents/RightComponents'

export default {
    data() {
        return {
            designDialogFlag: false,
            caseDialogFlag: false,
            d3roomDialogFlag: false,
            teamDialogFlag: false,
            craftDialogFlag: false,
            goodsDialogFlag: false,
            couponsDialogFlag: false,
            fromDialogFlag: false,
            defaultValue: '',
            panelValue: '',
            condition: {},

            categoryDialogFlag: false, // 选择分类弹层
            packageDialogFlag: false, // 选择套餐包弹层
        }
    },
    onLoad() {
        uni.$on('showDialog', ({ pro, defaultValue, panelValue, condition }) => {
            this[pro] = true
            this.defaultValue = defaultValue
            this.panelValue = panelValue
            this.condition = condition

            console.log('defaultValue', defaultValue)
        })
    },
    methods: {
        handleSubmit(e) {
            uni.$emit('submitDialog', e)
        },
        addProject() {
            this.$store.commit('setAddProjectModel', { addProjectModel: true })
        },
        handleSelect({ detail: { value } }) {
            this.$refs.phoneFrameEl && this.$refs.phoneFrameEl.selComponent(value)
        },
        handleDelete({ detail: { value } }) {
            this.$refs.phoneFrameEl && this.$refs.phoneFrameEl.deleteComponent(value)
        },
        handleCancle() {
            console.log('handleCancle');
        }
    },
    computed: {
        pattern() {
            return this.$store.state.pattern
        },
        listLen() {
            return this.$store.state.project.list.length
        }
    },
    components: {
        PhoneFrame,
        LeftComponents,
        EuHeader,
        EuEditToolLeft,
        RightComponents,
        CrabEditToolRight,
        CrabManageToolRight

    }
}
</script>

<style lang="scss">
.el-header,
.el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: #c8c7cc solid 1px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    z-index: 100;
}

.el-aside {
    background-color: white;
    color: #333;
    // text-align: center;
    height: calc(100vh - 60px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    z-index: 99;
}

.el-main {
    min-width: 600px;
    background-color: #f7f8fa;
    color: #333;
    height: calc(100vh - 60px);
    width: 50%;
    // background-image: linear-gradient(
    //         45deg,
    //         #f5f5f5 25%,
    //         transparent 0,
    //         transparent 75%,
    //         #f5f5f5 0
    //     ),
    //     linear-gradient(
    //         45deg,
    //         #f5f5f5 25%,
    //         transparent 0,
    //         transparent 75%,
    //         #f5f5f5 0
    //     );
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    padding: 20px 20px 0;
}

body > .el-container {
    margin-bottom: 40px;
}
</style>

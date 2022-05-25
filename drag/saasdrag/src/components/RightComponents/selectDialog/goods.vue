<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-27 09:15:51
-->
<template>
    <select-dialog
        v-model="showDialog_"
        :title="title"
        @submit="handleSubmit"
    >
        <el-tabs
            class="select-goods-box"
            tab-position="left"
            v-model="tabValue"
        >
            <el-tab-pane
                name="goodsId"
                label="指定商品"
            >

                <el-tabs
                    class="select-goods-first"
                    type="border-card"
                    v-model="goodsTabValue"
                    @tab-click="handleTabClick"
                >
                    <el-tab-pane
                        label="全部指定商品"
                        name="table"
                    >
                        <div class="dialog-form-inline small">
                            <el-form
                                :inline="true"
                                label-width="70px"
                            >
                                <el-form-item
                                    label="名称"
                                    label-width="40px"
                                >
                                    <el-input
                                        v-model="keyword"
                                        placeholder="商品编码/名称/关键词"
                                    />
                                </el-form-item>
                                <el-form-item label="商品分类">
                                    <el-cascader
                                        v-if="tabValue === 'goodsId'"
                                        v-model="goodsMultipleSelection"
                                        :props="props"
                                        clearable
                                        :placeholder="goodsPlaceholder || '请选择'"
                                        @change="handleCascader1"
                                        @expand-change="handleCascader1"
                                    ></el-cascader>
                                </el-form-item>
                                <el-form-item
                                    label="来源"
                                    label-width="40px"
                                >
                                    <el-select
                                        v-model="sourceType"
                                        placeholder="请选择"
                                        clearable
                                        :loading="sourceTypeLoading"
                                    >
                                        <el-option
                                            v-for="item in sourceTypes"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="标签"
                                    label-width="40px"
                                >
                                    <el-select
                                        v-model="goodsTag"
                                        placeholder="请选择"
                                        clearable
                                        :loading="goodsTagLoading"
                                    >
                                        <el-option
                                            v-for="item in goodsTags"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    style="float: right;"
                                    label-width="40px"
                                >
                                    <div class="el-form-item__content">
                                        <div class="flex">
                                            <el-button
                                                class="el-form-item__btn"
                                                @click="handleReset"
                                            >重置</el-button>
                                            <el-button
                                                type="primary"
                                                class="el-form-item__btn"
                                                @click="handleGetList"
                                            >查询</el-button>
                                        </div>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div
                            class="select-goods-list scrollbar1"
                            v-loading="isLoading"
                        >
                            <gc-list
                                ref="multipleTable"
                                mode="row"
                                ellipsis="1"
                                imgSize="70px"
                                imgRadius="4px"
                                radius="4px"
                                bgColor="transparent"
                                :list="tableData"
                                @select="handleSelect"
                            />
                            <c-no-data
                                text="暂无相关数据商品"
                                showImg
                                v-if="!isLoading && !tableData.length"
                            />
                        </div>
                        <div class="el-pagination-box">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="page"
                                :page-sizes="pageSizes"
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
                        :label="`已选商品（${multipleSelection.length}）`"
                        name="operation"
                    >
                        <chooseOperation
                            ref="chooseOperation"
                            :operationReqName="operationReqName"
                            :operationReqParam="operationReqParam_"
                            imgKey="goods_img"
                            titleKey="goods_name"
                            row="5"
                            @change="handleDragChange"
                        />
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane
                name="cateId"
                label="指定分类"
            >
                <div
                    class="cascader-box"
                    v-if="tabValue === 'cateId'"
                >
                    <goods-search @change="handleCateMultiple">
                        <template v-slot:default="{refreshKey}">
                            <el-cascader-panel
                                :key="refreshKey"
                                v-model="cateMultipleSelection"
                                :props="props"
                                @change="handleCascader"
                                @expand-change="handleCascader"
                            ></el-cascader-panel>
                        </template>

                    </goods-search>

                </div>
            </el-tab-pane>
            <el-tab-pane
                name="all"
                label="全部商品"
            >
                <div
                    class="flex-ajcenter"
                    style="height: 100%"
                >
                    已选全部商品参与，新增商品会自动参与
                </div>
            </el-tab-pane>
        </el-tabs>
    </select-dialog>
</template>

<script>
import tableMixins from './mixins/table'
import goodsSearch from './components/goodsSearch';
export default {
    mixins: [tableMixins],
    components: {
        goodsSearch
    },
    data() {
        let that = this
        return {
            listReqName: 'goodsSearchGoodsList',
            limit: 20,
            idType: '',
            showCateId: false,
            props: {
                // checkStrictly: true,
                lazy: true,
                emitPath: true,
                label: 'cat_name',
                value: 'cat_id',
                children: 'sub',
                async lazyLoad(node, resolve) {
                    const { value, level } = node
                    let dealData = []
                    if (value) {
                        const { data: { child_category = [] } } = await that.$http('getChildCategory', {
                            cat_id: value
                        })
                        dealData = child_category.map(o => {
                            return {
                                ...o,
                                sub: o.sub.map(o1 => {
                                    return {
                                        ...o1,
                                        leaf: true
                                    }
                                })
                            }
                        })
                        console.log(dealData);
                    } else {
                        const { data } = await that.$http('getTopCategory', {})
                        dealData = data
                    }
                    resolve(dealData);
                }
            },
            operationReqName: '/Goods/getGoodsModuleList',
            goodsTabValue: 'table',
            keyword: '',// 关键词
            cateMultipleSelection: [], // 默认分类值
            tempCateMultipleSelection: [],// 指定分类（临时用，不能用v-model绑定，不然不能返回多次选择的结果，绑定之后，每次改变自会返回自身，不会返回上一级）
            goodsMultipleSelection: [], // 分类选择筛选
            tempGoodsMultipleSelection: [], // 重置分类筛选，不能直接绑定筛选条件上去，不然选择的id只会返回一个
            goodsPlaceholder: '',// 分类选择接口
            sourceTypes: [],// 来源数组
            sourceType: '',// 来源
            sourceTypeLoading: true, // 来源请求状态
            goodsTags: [], // 标签列表
            goodsTag: '', // 已选中标签
            goodsTagLoading: true, // 标签请求状态
        }
    },
    computed: {
        operationReqParam_() {
            return {
                idType: "goodsId",
                ids: this.multipleSelection.join(',')
            }
        }
    },
    methods: {
        handleCateMultiple(v) {
            console.log(v, "-----");
            this.cateMultipleSelection = v.detail.value;
        },
        handleReset() {
            this.sourceTypeLoading = true
            this.tempGoodsMultipleSelection = []
            this.goodsMultipleSelection = []
            this.keyword = ''
            this.goodsTag = ''
            this.sourceType = ''
            this.goodsPlaceholder = ''
            this.handleGetList()
        },
        initDialog() {
            this.getSourceTypeList()
            this.getGoodsTags()
        },
        async handleCascader1(e) {
            this.tempGoodsMultipleSelection = e
            const { data } = await this.$http('getGoodsCategoryListByIds', {
                ids: e.join(',')
            })
            this.goodsPlaceholder = data.map(o => o.cat_name).join('/')
        },
        async getGoodsTags() {
            this.goodsTagLoading = true
            const { data } = await this.$http('getGoodsTags')
            this.goodsTags = data
            this.goodsTagLoading = false
        },
        async getSourceTypeList() {
            this.sourceTypeLoading = true
            const { data: {
                list = []
            } } = await this.$http('getSourceTypeList', {
                limit: 100
            })
            this.sourceTypes = list
            this.sourceTypeLoading = false
        },
        handleCascader(e) {
            console.log(e);
            this.tempCateMultipleSelection = e
        },
        handleSelect({ detail }) {
            const selectId = detail.id
            const oldIndex = this.multipleSelection.findIndex(o => o === selectId)
            if (oldIndex !== -1) {
                this.multipleSelection.splice(oldIndex, 1)
            } else {
                if (this.condition.max > 0 && this.condition.max <= this.multipleSelection.length) {
                    this.$message.warning(`最多只能选择${this.condition.max}项`)
                    this.$refs.multipleTable.toggleRowSelection(detail, false);
                    return
                }
                this.multipleSelection.push(selectId)
            }
            this.$refs.multipleTable.toggleRowSelection(detail, oldIndex === -1);
        },
        handleGetList() {
            this.reqParams = {
                goods_name: this.keyword,
                goods_category_ids: this.tempGoodsMultipleSelection.slice(-1)[0] || '',
                source_type: this.sourceType,
                tag_name: this.goodsTag
            }
            this.goodsMultipleSelection = this.tempGoodsMultipleSelection
            this.$c.debounce(() => {
                this.getList()
            }, 150)
        }
    }

}
</script>

<style lang="scss">
.select-goods {
    &-first {
        box-shadow: none;
        margin: -10px;
        height: calc(100% + 24px);
        /deep/ .select-goods-list {
            margin: 0 -12px;
            height: calc(100% - 180px);
        }
        /deep/ .el-tabs__content {
            height: calc(100% - 40px) !important;
        }
    }
    &-box {
        height: 510px;
        height: 57.8vh;
        /deep/ .el-tab-pane {
            height: 100%;
        }
        /deep/ .el-tabs__content {
            background-color: #f2f2f6;
            height: 100%;
            padding: 10px;
        }
        /deep/ .el-cascader-menu {
            min-width: 33.33%;
            height: 100%;
            background-color: #fff;
        }
        /deep/ .el-cascader-panel {
            height: 100%;
        }
        /deep/ .el-cascader {
            .el-input__inner {
                &::-webkit-input-placeholder {
                    color: #606266;
                }
                &::-moz-placeholder {
                    //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                    color: #606266;
                }
                &:-ms-input-placeholder {
                    //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                    color: #606266;
                }
            }
        }
        /deep/ .el-cascader-menu__wrap {
            height: 100%;
        }
        .cascader-box {
            width: 100%;
            height: 100%;
        }
    }

    &-list {
        height: calc(100% - 98px);
        overflow-y: auto;
        /deep/ .gc-list-group {
            .c-col-12 {
                width: 25%;
            }
            .gc-list-item {
                padding: 0;
                &-tag {
                    display: none;
                }
                &__shopcard-box {
                    display: none;
                }
                &__desc {
                    bottom: 6px;
                }
                .price-com {
                    font-size: 14px;
                }
                .price-com__market {
                    display: none;
                }
                &--active {
                    box-shadow: 0 0 0 1px #2589ff;
                    &::after {
                        content: '\e6da';
                        @include abs(null, 12rpx, 12rpx);
                        font-family: element-icons !important;
                        color: #fff;
                        z-index: 2;
                    }
                    &::before {
                        content: '';
                        @include abs(null, 12rpx, 12rpx);
                        width: 30px;
                        height: 30px;
                        z-index: 1;
                        border-color: transparent #2589ff #2589ff transparent;
                        border-style: solid;
                        border-width: 15px;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.classify {
    height: calc(100% - 65px);
}
</style>
<template>
    <AppPhone :title-config="config_">
        <template v-slot:container>
            <gc-category
                :cmpt-style="style"
                :context="context_"
                :menu-list="menuList"
                :isDemo="true"
                :pageConfig="pageConfig_"
                @notify="notify"
            />
        </template>
    </AppPhone>
</template>
<script>
import listMixins from '@/common/mixins/list'
import AppPhone from "@/appComponents/AppPhone";
import { mapGetters } from "vuex";

export default {
    mixins: [listMixins],
    components: {
        AppPhone,
    },
    computed: {
        ...mapGetters(["style"]),
        config_() { // 头部导航栏配置
            return {
                title: '分类'
            }
        },
        context_() {
            return {
                menuList: this.menuList,
                cateData: this.cateData,
                topLoading: this.topLoading,
                childLoading: this.childLoading,
                reqIndex: this.reqIndex
            }
        },
        pageConfig_() {
            return {
                pageList: this.pageList,
                lodingText: this.lodingText,
                noData: this.noData
            }
        }
    },
    data() {
        return {
            menuList: [],
            topLoading: true,
            childLoading: true,
            cateData: {},
            reqIndex: 0,
            autoReq: false,
            reqName: 'goodsSearchGoodsList',
        }
    },
    created() {
        this.getTopCategory();
    },
    methods: {
        notify(actionKey, arg) {
            const actions = [
                "getTopCategory",
                "handleChange1",
                "reachBottomFn",
                "handleChange2",
                "changeClear"
            ]
            const triggerActionName = actions.find(v => actionKey === v);
            if (triggerActionName) {
                this[triggerActionName](...arg)
            } else {
                console.warn("方法穿错了")
            }
        },
        async getTopCategory() {
            this.topLoading = true;
            const res = await this.$http('getTopCategory')
            this.topLoading = false;
            this.menuList = res.data
            this.reqIndex++
        },
        // 一级分类切换
        async handleChange1(cat_id) {
            this.cateData = {};
            this.childLoading = true;
            const {
                data
            } = await this.$http('getChildCategory', {
                cat_id
            })
            this.childLoading = false;
            this.cateData = data
            this.reqIndex++
        },
        handleChange2(cat_id) {
            if (cat_id < 0) {
                this.pageList = []
                this.noData = false;
                this.lodingText = '数据加载中';
                return
            }
            this.$nextTick(() => {
                setTimeout(() => {
                    this.defaultParams.goods_category_ids = cat_id
                    this.initPage()
                }, 10)
            })
        },
        changeClear() {
            this.pageList = []
            this.noData = false;
            this.lodingText = '数据加载中';
        }
    }
}
</script>

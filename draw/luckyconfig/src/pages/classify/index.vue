<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: czq
 * @Date: 2021-11-29 16:15:37
 * @LastEditors: czq
 * @LastEditTime: 2021-12-01 11:24:53
-->
<template>
    <Layout
        is-submit
        is-close
        is-reverse
        @save="save"
    >
        <template v-slot:title>效果图预览</template>
        <template v-slot:rightTitle>
            样式选择
            <text class="pl24 c-font-sm c-999">说明：系统提供以下不同的分类展示，需结合自身商品的分类及层级选择对应的展示样式</text>
        </template>
        <template v-slot:center>
            <CenterComponent :key="style" />
        </template>
        <template v-slot:right>
            <RightComponent />
        </template>
    </Layout>
</template>
<script>
import Layout from "@/appComponents/Layout"
import CenterComponent from "@/components/classify/CenterComponent"
import RightComponent from "@/components/classify/RightComponent"
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            choice: (state) => state.classify.choice
        }),
        ...mapGetters(["style"])
    },
    components: {
        Layout,
        CenterComponent,
        RightComponent
    },
    created() {
        this.getStyleList();
        this.getStyle();
    },
    methods: {
        ...mapMutations(["SET_CHOICE", "SET_CHOICES"]),
        async getStyle() {
            const { data: { goods_category_style_id } } = await this.$http("getGoodsCategoryStyle")
            this.SET_CHOICE(goods_category_style_id);
        },
        async getStyleList() {
            const { data } = await this.$http("getStyleList")
            this.SET_CHOICES(data);
        },
        async save() {
            const { code, msg } = await this.$http("saveGoodsCategoryStyle", {
                goods_category_style_id: this.choice
            })
            if (code === 0) {
                this.$message.success(msg);
            } else {
                this.$message.warning(msg);
            }
        }
    }
}
</script>

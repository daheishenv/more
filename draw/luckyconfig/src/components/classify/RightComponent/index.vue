<style lang="scss" scoped>
.classify {
    background: #fff;
    &-content {
        background: rgba(242, 242, 242, 1);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 22px 42px;
        &-item {
            margin-bottom: 38px;
        }
    }
}
</style>
<template>
    <view class="classify">
        <view class="classify-content">
            <el-radio-group v-model="choice">
                <sub-classify-choice
                    v-model="choice"
                    v-for="(v,key) in  choices"
                    :key="key"
                    :img="v.img"
                    :label-text="v.labelText"
                    :title="v.title"
                    :msg="v.msg"
                    :label="v.id"
                    class="classify-content-item"
                ></sub-classify-choice>
            </el-radio-group>
        </view>
    </view>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
    computed: {
        ...mapState({
            choices: (state) => state.classify.choices,
        }),
        choice: {
            get() {
                return this.$store.state.classify.choice
            },
            set(val) {
                this.SET_CHOICE(val);
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations(["SET_CHOICE"])
    }
}
</script>
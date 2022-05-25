<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:01:01
-->
<template>
    <view class="first-step">
        <el-form
            ref="firstForm"
            :model="firstData"
            :rules="rules"
            label-width="100px"
            size="small"
            :disabled="noIsEdit_"
        >
            <div class="c-el-module__title">基本选项</div>
            <el-divider class="c-el-module__divider-h"></el-divider>
            <el-form-item label="转盘样式">
                <el-radio
                    v-model="firstData.style_type"
                    :label="1"
                >圆盘</el-radio>
                <el-radio
                    v-model="firstData.style_type"
                    :label="2"
                >方盘</el-radio>
            </el-form-item>
            <el-form-item
                label="活动名称"
                prop="activity_name"
            >
                <el-input
                    v-model="firstData.activity_name"
                    type="text"
                    placeholder="请输入活动名称"
                    maxlength="25"
                    show-word-limit
                    size="small"
                    class="maxWidth"
                ></el-input>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-date-picker
                    v-model="firstData.dateTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :clearable="false"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    size="small"
                    :picker-options="pickerOptions"
                    autocomplete="off"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="选择人群">
                <template>
                    <el-radio
                        v-model="firstData.people_type"
                        :label="1"
                    >不限</el-radio>
                    <el-radio
                        v-model="firstData.people_type"
                        :label="2"
                    >部分人群</el-radio>
                </template>
                <el-alert
                    v-if="firstData.people_type === 2"
                    :closable="false"
                    type="info"
                >
                    <el-checkbox-group v-model="firstData.member_rank">
                        <el-checkbox
                            v-for="item in firstData.users_level"
                            :key="item.id"
                            :label="item.id"
                            :value="item.id"
                        >
                            {{ item.level_name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-alert>
            </el-form-item>
            <el-form-item label="活动说明">
                <el-input
                    type="textarea"
                    placeholder="请输入活动说明"
                    v-model="firstData.activity_desc"
                    size="small"
                    class="maxWidth"
                ></el-input>
            </el-form-item>
            <div class="c-el-module__title">展示设置</div>
            <el-divider class="c-el-module__divider-h"></el-divider>
            <el-form-item label="背景图片">
                <ImgUpload
                    v-model="firstData.background_img"
                    type="backgroundImg"
                    width="100px"
                    height="193px"
                    :disabled="noIsEdit_"
                    :defaultImg="background_img"
                />
            </el-form-item>
            <el-form-item label="Banner图">
                <ImgUpload
                    v-model="firstData.banner_img"
                    type="banner"
                    width="249px"
                    height="53px"
                    :disabled="noIsEdit_"
                    :defaultImg="banner_img"
                />
            </el-form-item>
            <el-form-item label="自定义海报">
                <ImgUpload
                    v-model="firstData.poster_img"
                    type="shareImg"
                    width="100px"
                    height="163px"
                    :disabled="noIsEdit_"
                    :defaultImg="poster_img"
                />
            </el-form-item>
            <div class="c-el-module__title">分享设置</div>
            <el-divider class="c-el-module__divider-h"></el-divider>
            <PageSetup v-model="firstData.pageSetting" />
        </el-form>
    </view>
</template>

<script>
import ImgUpload from './components/ImgUpload';
import PageSetup from './components/PageSetup';
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import { getQueryVariable, formatDate } from '@/common/utils/utils'

export default {
    name: 'first-step', // 步骤一
    data() {
        return {
            firstData: {},
            rules: {
                activity_name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                rule: [{ required: true, message: '请输入活动说明', trigger: 'blur' }],
            },
            pickerOptions: {
                disabledDate: (time) => {
                    // 设置禁用状态，参数为当前日期，要求返回 Boolean 返回为true禁用
                    // 只能选择大于今天的日期
                    const curTime = dayjs(dayjs().format('YYYY-MM-DD')).valueOf()
                    //  HH:mm:ss
                    return curTime > dayjs(time).valueOf()
                }
            },
            background_img: '', // 默认背景图片
            banner_img: '', // 默认banner图片
            poster_img: '', // 默认海报图片
        };
    },
    props: {},
    watch: {
        firstData: {
            handler(val) {
                this.$c.throttle(() => {
                    this.$store.dispatch('setFirstStepData', val)
                }, 500)
            },
            deep: true
        },
    },
    components: {
        ImgUpload,
        PageSetup
    },
    computed: {
        ...mapState({
            firstStepData: state => state.project.firstStepData
        }),
        noIsEdit_() {
            return !this.firstStepData.is_edit
        }

    },
    created() {
        this.handleGetData()
    },
    methods: {
        // 获取基础信息
        async handleGetData() {
            const { data } = await this.$http('baseSetInfo', {
                big_wheel_activity_id: getQueryVariable('big_wheel_activity_id')
            })
            await this.$store.dispatch('setFirstStepData', data);
            const firstStepData = this.firstStepData
            let member_rank = firstStepData.member_rank || []
            let newMember_rank = member_rank.map(Number)
            const firstData = {
                big_wheel_activity_id: getQueryVariable('big_wheel_activity_id'),
                activity_name: firstStepData.activity_name, // 活动名称
                member_rank: newMember_rank, // 部分人群勾选的会员等级
                pageSetting: { // 分享内容
                    wechat_share_img: firstStepData.wechat_share_img,
                    mini_program_share_img: firstStepData.mini_program_share_img,
                    share_intro: firstStepData.share_intro,
                    share_title: firstStepData.share_title
                },
                users_level: firstStepData.users_level, // 会员等级
                people_type: firstStepData.people_type, // 人群类型 1表示不限 2部分人群
                activity_desc: firstStepData.activity_desc, // 活动说明
                background_img: firstStepData.background_img || `/saas/activity/lucky-draw/admin/lucky_default_bg.png`, // 背景图片
                banner_img: firstStepData.banner_img || `/saas/activity/lucky-draw/admin/lucky_default_title.png`, // banner图片
                poster_img: firstStepData.poster_img || `/saas/activity/lucky-draw/admin/lucky_default_share_img.png`, // 海报背景
                start_time: firstStepData.start_time || formatDate(new Date().getTime() + 180000),
                end_time: firstStepData.end_time || formatDate(new Date().getTime() + 3600 * 1000 * 24 * 7 + 180000),
                style_type: firstStepData.style_type,
                dateTime: [firstStepData.start_time || formatDate(new Date().getTime() + 180000),
                firstStepData.end_time || formatDate(new Date().getTime() + 3600 * 1000 * 24 * 7 + 180000)], // 活动开始结束时间
            }
            this.firstData = firstData
            this.background_img = firstData.background_img
            this.banner_img = firstData.banner_img
            this.poster_img = firstData.poster_img
            this.$store.dispatch('setFirstStepData', firstData);
        },
        // 提交验证表单
        submitForm() {
            // 如果活动已结束，则不进行保存操作
            if (this.noIsEdit_) {
                // 设置loading
                this.$emit('listenFormData', {
                    step: 'first'
                })
                return
            }
            return new Promise((resolve) => {
                this.$refs['firstForm'].validate(async (valid) => {
                    if (valid) {
                        if (!this.firstData.dateTime[0] && !this.firstData.dateTime[1]) {
                            this.$toast('请填写活动时间')
                            return
                        }
                        // 存储第一步骤数据
                        let firstData = this.$deepClone(this.firstData)
                        firstData.start_time = firstData.dateTime[0]
                        firstData.end_time = firstData.dateTime[1]
                        if (firstData.people_type === 1) {
                            delete firstData.member_rank
                        } else {
                            firstData.member_rank = firstData.member_rank.join(',')
                        }
                        firstData = { ...firstData, ...firstData.pageSetting }
                        try {
                            await this.$http('baseSet', firstData)
                        } catch (error) {
                            this.$toast(error.msg)
                            // 设置loading
                            this.$emit('listenFormData', {
                                step: 'first'
                            })
                            return
                        }
                        setTimeout(() => {
                            // 设置loading
                            this.$emit('listenFormData', {
                                step: 'first'
                            })
                            resolve(true)
                        }, 500)
                    } else {
                        // 设置loading
                        this.$emit('listenFormData', {
                            step: 'first'
                        })
                        this.$toast('还有必选项未填写')
                    }
                })
            })
        }
    }
};
</script>

<style lang="scss" scope>
.first-step {
    padding-top: 10px;

    .title {
        font-size: 24px;
    }

    .maxWidth {
        width: 550px;
    }
}
</style>

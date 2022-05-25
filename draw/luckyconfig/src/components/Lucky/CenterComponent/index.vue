<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-09-23 18:01:01
-->
<template>
    <AppPhone :title-config="config_">
        <template v-slot:container>
            <sub-activity-lucky-draw
                ref="lucky-draw"
                :default-value="defaultValue_"
                :isDemo="true"
                :reward-data="rewardData"
                @startCallBack="startCallBack"
                @endCallBack="endCallBack"
                v-if="isInitDraw_ && showCName === 'lucky-draw'"
            />
            <sub-activity-lucky-details
                ref="lucky-details"
                v-if="isInitDraw_ && showCName === 'lucky-details'"
                :isDemo="true"
                :page-list="demoPageList"
                :rules-info="rulesInfo_"
                :active-list="activeList_"
            />
        </template>

        <template v-slot:other>
            <sub-activity-lucky-poster
                v-model="showPoster"
                :config="config_"
                :info="posterInfo_"
                :demoPageList="demoPageList"
            />
            <sub-activity-lucky-info-popup
                :isDemo="true"
                v-model="showInfo"
                :demoTemp="demoTemp"
            />
        </template>
    </AppPhone>
</template>

<script>
import { mapState } from 'vuex'
import AppPhone from "@/appComponents/AppPhone";
export default {
    components: {
        AppPhone
    },
    data() {
        return {
            showPoster: false, // 分享海报弹窗
            showInfo: false, // 资料填写弹窗
            showCName: 'lucky-draw', // 当前展示页ref
            demoPageList: [ // 奖品示例数据
                { status: 0, prize_type: 1, status_text: '待领取', big_wheel_prize: { prize_name: '实物奖品（示例）', prize_img: 'activity/lucky-draw/detail-gift.png', receive_prize_start_time: '2021.10.1', receive_prize_end_time: '2022.10.1', receive_prize_way: 1 } },
                { status: 2, status_text: '已发放', big_wheel_prize: { prize_name: '100积分奖品（示例）', prize_img: 'activity/lucky-draw/detail-coins.png', receive_prize_way: 2, prize_type: 3, points: 100 }, create_time: '2021-10-1 12:00:00' },
                { status: 2, status_text: '已发放', big_wheel_prize: { prize_name: '200积分奖品（示例）', prize_img: 'activity/lucky-draw/detail-coins.png', receive_prize_way: 2, prize_type: 3, points: 200 }, create_time: '2021-10-1 12:00:00' },
            ],
            demoTemp: { // 资料填写示例数据
                user_name: "张三",
                mobile: "13000000000",
                address: "软件园65号-1",
                province: "福建省",
                province_id: "35",
                city: "厦门市",
                city_id: "3502",
                district: "湖里区",
                district_id: "350206",
                email: '123456789@qq.com'
            },
            rewardData: {} // 抽奖结果弹窗数据
        };
    },
    computed: {
        ...mapState({
            controPage: state => state.project.controPage,
            firstStepData: state => state.project.firstStepData,
            secondStepData: state => state.project.secondStepData,
            thirdStepData: state => state.project.thirdStepData
        }),
        config_() { // 头部导航栏配置
            return {
                title: this.firstStepData.activity_name
            }
        },
        draw_() { // 圆盘数据
            if (!this.thirdStepData.prize_info) return []
            const prizes = this.thirdStepData.prize_info.map((item, index) => {
                let url = ''
                if (item.prize_config_img && item.prize_config_img.indexOf('http') === 0) {
                    url = item.prize_config_img
                } else {
                    url = `${this.$config.baseOssImgUrl}${item.prize_config_img}` || ''
                }
                return {
                    id: item.id,
                    goodImg: item.prize_img, // 奖品图片用在抽奖结果弹窗中使用
                    rewardType: item.prize_type, // 奖品类型 失败、成功、没次数
                    title: item.prize_name,
                    background: index % 2 ? '#ffda69' : '#ffe4c1',
                    fonts: [{ text: item.prize_name, top: '10%', lengthLimit: '90%' }],
                    imgs: [
                        {
                            src: url,
                            width: '30%',
                            top: '35%'
                        }
                    ]
                }
            })
            return {
                prizes,
                defaultStyle: {
                    fontColor: '#d64737',
                    fontSize: '14px'
                },
                blocks: [
                    {
                        padding: '66rpx',
                        imgs: [{
                            src: 'http://betastatic-saas.zzsupei.com/saas/upload/20210930/108d7c40ed7ea1e45ef005c560817774.png',
                            width: '100%',
                            rotate: true
                        }]
                    }
                ],
                buttons: [
                    {
                        radius: '108rpx',
                        pointer: false,
                        imgs: [{ src: 'http://betastatic-saas.zzsupei.com/saas/upload/20210930/1de3573bcf0e3eb9df76ab19e50fe273.png', width: '100%', top: '-116%' }]
                    }
                ]
            }
        },
        drawSquare_() { // 方盘数据
            if (!this.thirdStepData.prize_info) return []
            const axis = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]]
            const prizes = this.thirdStepData.prize_info.slice(0, 8).map((item, index) => {
                let url = ''
                if (item.prize_config_img && item.prize_config_img.indexOf('http') === 0) {
                    url = item.prize_config_img
                } else {
                    url = `${this.$config.baseOssImgUrl}${item.prize_config_img}` || ''
                }
                return {
                    id: item.id,
                    goodImg: item.prize_img, // 奖品图片用在抽奖结果弹窗中使用
                    rewardType: item.prize_type, // 奖品类型 失败、成功、没次数
                    x: axis[index][0],
                    y: axis[index][1],
                    fonts: [{ text: item.prize_name, top: '70%' }],
                    imgs: [{
                        src: url,
                        width: '86rpx',
                        height: '86rpx',
                        top: '8%'
                    }]
                }
            })
            return {
                prizes,
                defaultConfig: {
                    gutter: 7
                },
                defaultStyle: {
                    borderRadius: 15,
                    fontColor: '#98520e',
                    fontSize: '22rpx',
                    textAlign: 'center',
                    background: '#fff',
                    fontWeight: 600,
                    shadow: '0 6 1 #f1f1f1'
                },
                buttons: [{
                    x: 1, y: 1, background: 'rgba(0, 0, 0, 0)',
                    imgs: [
                        { src: 'http://betastatic-saas.zzsupei.com/saas/upload/20211009/1cfefb3a3fe2f266e6271fd037ba9e64.png', width: '100%', top: '0' }
                    ]
                }],
                activeStyle: {
                    background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
                    shadow: ''
                }
            }
        },
        defaultValue_() { // 首页数据
            const firstStepData = this.firstStepData
            const draw = firstStepData.style_type === 1 ? this.draw_ : this.drawSquare_
            const baseConfig = {
                pageBg: firstStepData.background_img,
                pageTitle: firstStepData.banner_img
            }
            const noticeList = [
                "恭喜小**获得100元现金",
                "恭喜小**获得200元现金",
                "恭喜小**获得300元现金",
            ];
            return {
                draw,
                type: firstStepData.style_type,
                baseConfig,
                noticeList,
            };
        },
        posterInfo_() { // 海报预览页数据
            const firstStepData = this.firstStepData
            return {
                shareImg: firstStepData.poster_img,
                avatar: 'activity/lucky-draw/share_avatar_defualt.png',
                qrCode: 'activity/lucky-draw/share_code_defualt.png',
                userName: '用户昵称',
                desc: firstStepData.pageSetting?.share_title
            }
        },
        rulesInfo_() { // 规则页数据
            return {
                activeTime: `${this.firstStepData.start_time} - ${this.firstStepData.end_time}`, // 活动时间
                activeDesc: this.firstStepData.activity_desc, // 活动介绍
                joinPermission: 1, // 用户参与权限 0无权限1有权限
                todaySurplusJoinTimes: this.thirdStepData.everyone_everyday_join_times || 0, // 今日剩余参与次数
                pullNewExchangeTime: this.thirdStepData.pull_new_exchange_time || 0, // 拉新兑换多少次抽奖
                pullNewTimes: this.thirdStepData.pull_new_times || 0, // 拉新多少次兑换抽奖
                pointExchangeTimes: this.thirdStepData.point_exchange_times || 0, // 消耗多少积分兑换一次抽奖机会
                todayPullNewGetTimes: 0, // 今日拉新兑换次数
                notExchangePullNewNum: 0, // 没有兑换的拉新数
                joinPermissionText: '您符合活动参与条件'
            }
        },
        activeList_() {
            if (!this.thirdStepData.prize_info) return []
            return this.thirdStepData.prize_info.filter((o, i) => {
                if (o.prize_type === 4 || o.id === 0) {
                    return false
                }
                const index = this.thirdStepData.prize_info.findIndex(v => v.big_wheel_prize_id === o.big_wheel_prize_id)
                if (index !== i) {
                    return false
                }
                return true
            })
        },
        isInitDraw_() {
            return this.thirdStepData.prize_info
        }
    },
    mounted() {
        this.showPopu()
    },
    watch: {
        controPage(nVal, oVal) { // 控制当前展示内容
            this.showPopu(nVal)
        }
    },
    methods: {
        startCallBack() { // 点击抽奖
            this.$refs['lucky-draw'].play()
            setTimeout(() => {
                this.$refs[['lucky-draw']].stop(Math.random() * 8 >> 0)
            }, 3000)
        },
        endCallBack(prize) { // 抽奖结束
            console.log(prize)
            if (prize.rewardType == 4) {
                this.rewardData = {
                    type: 1
                }
            } else {
                this.rewardData = {
                    type: 0,
                    desc: prize.title,
                    goodImg: prize.goodImg
                }
            }
            this.$refs['lucky-draw'].showReward = true

        },
        handleShowReward(obj) { // 弹窗内容修改
            this.rewardData = obj
        },
        showPopu(obj) {
            if (!obj) return
            const { popupName = '', methodName, params, showCName = '' } = obj
            this.showCName = showCName || 'lucky-draw'
            const mainPopup = ['showPoster', 'showInfo']
            const otherPopup = ['showReward', 'showShare', 'chancePopup']

            this.$nextTick(() => {
                mainPopup.forEach(o => {
                    this[o] = o === popupName
                })
                otherPopup.forEach(o => {
                    if (this.$refs[this.showCName]) {
                        this.$refs[this.showCName][o] = o === popupName
                    }
                })
                if (methodName && showCName && this.$refs[this.showCName]) {
                    this.$refs[this.showCName][methodName](params)
                } else if (methodName && this[methodName]) {
                    this[methodName](params)
                }
            })
        }
    },
};
</script>


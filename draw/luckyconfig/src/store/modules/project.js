/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: sky
 * @Date: 2021-09-26 10:32:56
 */
const project = {
    state: {
        controPage: {
            popupName: '',
            params: {}
        },
        changeImgStatus: false, // 替换奖项图片
        firstStepData: {}, // 第一步骤数据
        secondStepData: [
            {
                name: '1',
                id: 0,
                tipName: '奖品1',
                points: 0,
                prize_desc: "",
                prize_img: `/saas/activity/lucky-draw/admin/prize_default_img.png`,
                prize_limit: 1,
                prize_name: "",
                prize_num: 1,
                points: 0,
                prize_type: 1,
                receive_prize_end_time: '',
                receive_prize_start_time: '',
                receive_prize_way: 1,
                dateTime: [],
                discountsCheckData: [],
                weight_ratio: 0
            },
            // {
            //     name: '2',
            //     id: 0,
            //     tipName: '奖品2',
            //     points: 0,
            //     prize_desc: "奖品描述",
            //     prize_img: "http://betastatic-saas.zzsupei.com/saas/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png",
            //     prize_limit: -1,
            //     prize_name: "谢谢参与",
            //     prize_num: -1,
            //     points: 0,
            //     prize_type: 4,
            //     receive_prize_end_time: '',
            //     receive_prize_start_time: '',
            //     receive_prize_way: 2,
            //     dateTime: [],
            //     discountsCheckData: [],
            //     weight_ratio: 0
            // },
            // {
            //     name: '3',
            //     id: 0,
            //     tipName: '奖品3',
            //     points: 0,
            //     prize_desc: "奖品描述",
            //     prize_img: "http://betastatic-saas.zzsupei.com/saas/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png",
            //     prize_limit: -1,
            //     prize_name: "谢谢参与",
            //     prize_num: -1,
            //     points: 0,
            //     prize_type: 4,
            //     receive_prize_end_time: '',
            //     receive_prize_start_time: '',
            //     receive_prize_way: 2,
            //     dateTime: [],
            //     discountsCheckData: [],
            //     weight_ratio: 0
            // },
            // {
            //     name: '4',
            //     id: 0,
            //     tipName: '奖品4',
            //     points: 0,
            //     prize_desc: "奖品描述",
            //     prize_img: "http://betastatic-saas.zzsupei.com/saas/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png",
            //     prize_limit: -1,
            //     prize_name: "谢谢参与",
            //     prize_num: -1,
            //     points: 0,
            //     prize_type: 4,
            //     receive_prize_end_time: '',
            //     receive_prize_start_time: '',
            //     receive_prize_way: 2,
            //     dateTime: [],
            //     discountsCheckData: [],
            //     weight_ratio: 0
            // },
            // {
            //     name: '5',
            //     id: 0,
            //     tipName: '奖品5',
            //     points: 0,
            //     prize_desc: "奖品描述",
            //     prize_img: "http://betastatic-saas.zzsupei.com/saas/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png",
            //     prize_limit: -1,
            //     prize_name: "谢谢参与",
            //     prize_num: -1,
            //     points: 0,
            //     prize_type: 4,
            //     receive_prize_end_time: '',
            //     receive_prize_start_time: '',
            //     receive_prize_way: 2,
            //     dateTime: [],
            //     discountsCheckData: [],
            //     weight_ratio: 0
            // },
            // {
            //     name: '6',
            //     id: 0,
            //     tipName: '奖品6',
            //     points: 0,
            //     prize_desc: "奖品描述",
            //     prize_img: "http://betastatic-saas.zzsupei.com/saas/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png",
            //     prize_limit: -1,
            //     prize_name: "谢谢参与",
            //     prize_num: -1,
            //     points: 0,
            //     prize_type: 4,
            //     receive_prize_end_time: '',
            //     receive_prize_start_time: '',
            //     receive_prize_way: 2,
            //     dateTime: [],
            //     discountsCheckData: [],
            //     weight_ratio: 0
            // },
            // {
            //     name: '7',
            //     id: 0,
            //     tipName: '奖品7',
            //     points: 0,
            //     prize_desc: "奖品描述",
            //     prize_img: "http://betastatic-saas.zzsupei.com/saas/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png",
            //     prize_limit: -1,
            //     prize_name: "谢谢参与",
            //     prize_num: -1,
            //     points: 0,
            //     prize_type: 4,
            //     receive_prize_end_time: '',
            //     receive_prize_start_time: '',
            //     receive_prize_way: 2,
            //     dateTime: [],
            //     discountsCheckData: [],
            //     weight_ratio: 0
            // },
            // {
            //     name: '8',
            //     id: 0,
            //     tipName: '奖品8',
            //     points: 0,
            //     prize_desc: "奖品描述",
            //     prize_img: "http://betastatic-saas.zzsupei.com/saas/upload/20211012/482661bb157ac355c762d2cb48e4c4e7.png",
            //     prize_limit: -1,
            //     prize_name: "谢谢参与",
            //     prize_num: -1,
            //     points: 0,
            //     prize_type: 4,
            //     receive_prize_end_time: '',
            //     receive_prize_start_time: '',
            //     receive_prize_way: 2,
            //     dateTime: [],
            //     discountsCheckData: [],
            //     weight_ratio: 0
            // }
        ], // 第二步骤数据
        thirdStepData: {}, // 第三步骤数据
        stepStatusInfo: {
            step: 'first',
            timer: new Date().getTime()
        }, // 步骤信息
        firstEntry: {
            setSecondStep: false,
            setThirdStep: false
        }, // 第一次进入得先设置奖品
    },
    mutations: {
        SET_CHANGE_IMG_STATUS(state, data) {
            state.changeImgStatus = data
        },
        // 设置第一步骤数据
        SET_FIRST_STEP_DATA(state, data) {
            state.firstStepData = { ...state.firstStepData, ...data }
        },
        // 设置第二步骤数据
        SET_SECOND_STEP_DATA(state, data) {
            state.secondStepData = data
        },
        SER_CONTROL_PAGE(state, data = '') {
            state.controPage = data
        },
        // 设置第三步骤数据
        SET_THIRD_STEP_DATA(state, data) {
            state.thirdStepData = data
        },
        // 目前步骤状态
        SET_STEP_STATUS_INFO(state, data) {
            state.stepStatusInfo = Object.assign(state.stepStatusInfo, { ...data })
        },
        SET_FIRST_ENTRY(state, data) {
            state.firstEntry = { ...state.firstEntry, ...data }
        },
    },
    getters: {

    },
    actions: {
        setChangeImgStatus({ commit }, data) {
            commit('SET_CHANGE_IMG_STATUS', data)
        },
        setFirstStepData({ commit }, data) {
            commit('SET_FIRST_STEP_DATA', data)
        },
        setSecondStepData({ commit }, data) {
            commit('SET_SECOND_STEP_DATA', data)
        },
        setControlPage({ commit }, data) {
            commit('SER_CONTROL_PAGE', Object.assign({ popupName: '', params: {} }, data))
        },
        setThirdStepData({ commit }, data) {
            commit('SET_THIRD_STEP_DATA', data)
        },
        setStepStatusInfo({ commit }, data) {
            commit('SET_STEP_STATUS_INFO', data)
        },
        setFirstEntry({ commit }, data) {
            commit('SET_FIRST_ENTRY', data)
        },
    }
}

export default project
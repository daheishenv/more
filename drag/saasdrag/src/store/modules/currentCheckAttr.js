/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-07-16 09:56:42
 */
import Vue from 'vue'
import { outerPro } from '@/utils/drag'
const currentCheckAttr = {
    state: {
        currentCheckIndex: -1, //当前选中对应的下标
        tempCurrentCheckIndex: -1,
        cacheComponentInfo: null, // 缓存组件，用户复制黏贴样式
        componentInfo: undefined, // 当前选中的组件信息
        manegeInfo: undefined, // 右侧管理内容的类型
        tempTimeStamp: 0// 临时时间戳
    },
    mutations: {
        SET_CURRENT_INDEX(state, index) {
            state.currentCheckIndex = index
        },
        SET_CURRENT_COMPONENT_INFO(state, obj) {
            state.componentInfo = obj
        },
        SET_CACHE_COMPONENT_INFO(state, obj) {
            state.cacheComponentInfo = obj
        },
        SET_CURRENT_RIGHT_CONFIG(state, config) {
            state.componentInfo.rightConfig = config
        },
        // 设置选中下标
        SET_CURRENT_INDEX_BY_TEMP(state) {
            state.currentCheckIndex = Number(state.tempCurrentCheckIndex)
        },
        // 设置临时选中下标
        SET_TEMP_CURRENT_INDEX(state, index) {
            state.tempCurrentCheckIndex = Number(index)
        },
        SET_MANAGE_COMPONENT_INFO(state, info) {
            state.manegeInfo = info
        },
        SET_TEMP_TIME_STAME(state, value) {
            state.tempTimeStamp = value
        }
    },
    actions: {
        setTempTimeStamp({ commit }, value) {
            commit('SET_TEMP_TIME_STAME', value)
        },
        setComponentInfoKey({ state, commit }, { pro, key, value }) {
            const data = Vue.prototype.$deepClone(state.componentInfo)
            const { extra = {} } = data
            if (outerPro.includes(pro)) {
                !data[pro] && key && (data[pro] = {})
                key ? (data[pro][key] = value) : (data[pro] = value)
            } else if (pro) {
                !extra[pro] && key && (extra[pro] = {})
                key ? (extra[pro][key] = value) : (extra[pro] = value)
            } else if (key) {
                data[key] = value
            }
            data.extra = extra
            commit('REPLACE_PAGE_ITEM', {
                index: state.currentCheckIndex,
                data
            })
        },
        setCurrentCheckIndex({ commit }, index) {
            commit('SET_CURRENT_INDEX', index)
        },
        // 清除选中下标
        clearCurrentCheckIndex({ commit }) {
            // 清空选中下标
            commit('SET_CURRENT_INDEX', -1)
            // 清空临时选中下标
            commit('SET_TEMP_CURRENT_INDEX', -1)
            // 清空时间戳
            commit('SET_TEMP_TIME_STAME', 0)
        },
        // 调用这个方法时候可能组件还没渲染，所以需要用到临时变量
        async setCurrentRightConfig({ commit, state, dispatch }, data) {
            commit('SET_CURRENT_RIGHT_CONFIG', data)
            await dispatch('replaceItemList', {
                index: state.tempCurrentCheckIndex !== -1 ? state.tempCurrentCheckIndex : state.currentCheckIndex,
                data: state.componentInfo
            })
        },
        /**
         * 删除当前节点
         */
        deleteCurrentCheckeAttr({ commit, dispatch, state }) {
            commit('REMOVE_PAGE_ITEM', { index: state.currentCheckIndex })
            // 清空选中的组件信息
            commit('SET_CURRENT_COMPONENT_INFO', undefined)
            // 清空组件选中下标
            dispatch('clearCurrentCheckIndex')
            // 重新保存草稿箱
            dispatch('setCachesFolder')
        },
        // 设置管理内容
        setManageInfo({ commit, dispatch }, info) {
            // 清空选中的组件信息
            commit('SET_CURRENT_COMPONENT_INFO', undefined)
            // 设置管理内容展示
            commit('SET_MANAGE_COMPONENT_INFO', info)
            // 清空组件选中下标
            dispatch('clearCurrentCheckIndex')
        },
        // 设置复制样式节点
        setCacheComponentInfo({ state, commit }, toast = true) {
            if (!state.componentInfo) {
                Vue.prototype.$message({
                    message: '请先选中组件',
                    type: 'error'
                });
                return
            }
            commit('SET_CACHE_COMPONENT_INFO', Vue.prototype.$deepClone(state.componentInfo))
            toast && Vue.prototype.$message({
                message: '复制成功',
                type: 'success'
            });
        },
        // 选中节点
        setCurrentCheckAttr({ commit, rootState, state }, index) {
            const currentObj = Vue.prototype.$deepClone(rootState.project.pageList)
            // 选中的组件
            let currentCmpt = currentObj[index]
            if (currentCmpt) {
                // 清空管理内容展示
                commit('SET_MANAGE_COMPONENT_INFO', undefined)
                // 设置临时选中下标
                commit('SET_TEMP_CURRENT_INDEX', index)
                setTimeout(() => {
                    commit('SET_TEMP_CURRENT_INDEX', -1)
                }, 50)
                if (state.componentInfo && state.componentInfo.module_no === currentCmpt.module_no) {
                    Vue.prototype.$nextTick(() => {
                        commit('SET_CURRENT_INDEX_BY_TEMP')
                    })
                    return
                }
                // 清空选中的组件信息
                commit('SET_CURRENT_COMPONENT_INFO', currentCmpt)
                Vue.prototype.$nextTick(() => {
                    commit('SET_CURRENT_INDEX_BY_TEMP')
                })
            }
        }
    }
}

export default currentCheckAttr
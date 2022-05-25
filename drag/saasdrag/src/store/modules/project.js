/*
 * @Descripttion:
 * @version: 1.0
 * @Author: sanhui
 * @Date: 2021-08-17 18:26:06
 */
import Vue from 'vue'
import { formatItemData, fillItemData } from '@/utils/drag'

const project = {
    state: {
        insertIndex: '', // 点击组件插入位置,这边要做监听变化来定位组件位置
        pageScrollTop: 0, // 页面滚动高度
        scrollAnimation: true, // 页面滚动动画
        pageList: [], // 页面托拉拽列表
        cmptAPIData: {}, // api数据
        pageInfo: {}
    },
    mutations: {
        // 设置组件选中时scroll- view是scrollTop值
        SET_SCROLL_TOP(state, top) {
            state.pageScrollTop = top
        },
        SET_SCROLL_ANIMATION(state, animate = true) {
            state.scrollAnimation = animate
        },
        // 新增某一项
        ADD_PAGE_ITEM(state, { index, data }) {
            console.log('新增操作----ADD_PAGE_ITEM----', index);
            state.pageList.splice(parseInt(index), 0, formatItemData(data))
        },
        // 替换某一项
        REPLACE_PAGE_ITEM(state, { index, data }) {
            console.log('替换操作----REPLACE_PAGE_ITEM----', index);
            state.pageList.splice(parseInt(index), 1, formatItemData(data))
        },
        // 移除某一项
        REMOVE_PAGE_ITEM(state, { index }) {
            console.log('移除操作----REMOVE_PAGE_ITEM----', index);
            state.pageList.splice(parseInt(index), 1)
        },
        // 更新整个列表
        SET_PAGE_LIST(state, data) {
            console.log('初始化操作----SET_PAGE_LIST----');
            state.pageList = data
        },
        // 设置选中的组件,一般在this.$nextTick里面调用，不然会导致节点没插入就选中会计算误差
        SET_INSERT_INDEX(state, index) {
            console.log('设置插入位置----SET_INSERT_INDEX----', index);
            state.insertIndex = index
        },
        // 更新接口请求得到的组件数据
        SET_NEW_HOME_DATA(state, data) {
            state.cmptAPIData = data
        },
        SET_PAGE_INFO(state, data) {
            state.pageInfo = data
        }
    },
    getters: {
    },
    actions: {
        setScrollTop({ commit }, { top = 0, animate = true }) {
            commit('SET_SCROLL_ANIMATION', animate)
            commit('SET_SCROLL_TOP', top)
        },
        setPageInfo({ commit }, data) {
            commit('SET_PAGE_INFO', data)
        },
        setPageList({ commit, dispatch }, data) {
            commit('SET_PAGE_LIST', data)
            dispatch('setCachesFolder')
        },
        // 清空全部组件（除头部）
        delAllItemList({ commit, dispatch, state }) {
            console.log('清空全部组件（除头部）')
            commit('SET_PAGE_LIST', state.pageList.slice(0, 1))
            dispatch('setCachesFolder')
        },
        setAPIData({ commit, state }, obj) {
            const cmptAPIData = { ...state.cmptAPIData, [obj.module_no]: obj }
            const allNo = state.pageList.map(o => o.module_no)
            const curAllNo = Object.keys(cmptAPIData).filter(o => allNo.includes(Number(o)))
            let newCmptAPIData = {};
            curAllNo.forEach(o => {
                newCmptAPIData[o] = cmptAPIData[o]
            })
            commit('SET_NEW_HOME_DATA', newCmptAPIData)
        },
        // 替换组件对象 flag 1 替换data 2替换extra
        saveItemList({ dispatch, rootState }, { flag, data = undefined }) {
            if (flag === 1) {
                dispatch('saveModuleData', formatItemData(data || rootState.currentCheckAttr.componentInfo))
            }
            // 重新保存草稿箱
            dispatch('setCachesFolder', flag === 2)
        },
        replaceItemList({ commit }, { index, data }) {
            commit('REPLACE_PAGE_ITEM', {
                index,
                data
            })
        },
        // 插入数据
        addComponents({ state, rootState, dispatch }, { data, index }) {
            let insertIndex = -1
            // 获取项目数据
            // const itemList = state.pageList[0].itemList
            const itemList = state.pageList
            const itemLen = itemList.length
            if (itemLen === 0) {
                insertIndex = 0
            } else {
                const currentCheckIndex = index !== undefined ? index : rootState.currentCheckAttr.currentCheckIndex
                // 没有选中要在哪里插入要放到最后面，直接插入到最下面或者他是推荐商品，则放到最后一个
                if (currentCheckIndex === -1 || data.module_name === 'recommend_goods') {
                    insertIndex = itemLen
                } else {
                    insertIndex = currentCheckIndex + 1
                }
                // 如果他要插入的位置是推荐商品，则往前一个插入
                if (insertIndex === itemLen && itemList[itemLen - 1].module_name === 'recommend_goods') {
                    insertIndex -= 1
                }
            }
            const newData = Vue.prototype.$deepClone(data)
            newData.module_no = ++rootState.max_module_no
            dispatch('addItemList', {
                index: insertIndex,
                data: newData,
                isClick: true
            })
        },
        async moveItemList({ state, dispatch }, { oldIndex, newIndex, isSelect = true }) {
            let data = Vue.prototype.$deepClone(state.pageList)
            data.splice(newIndex, 0, data.splice(oldIndex, 1)[0])
            await dispatch('setPageList', data)
            isSelect && dispatch('setCurrentCheckAttr', newIndex)
        },
        addItemList({ commit, dispatch }, { index, data }) {
            commit('ADD_PAGE_ITEM', {
                index: index,
                data: data
            })
            commit('SET_INSERT_INDEX', index)
            dispatch('setCachesFolder')
        },
        delItemList({ commit, dispatch }, { newIndex }) {
            commit('REMOVE_PAGE_ITEM', {
                index: newIndex
            })
            dispatch('setCachesFolder')
        },
        // 保存草稿箱，本地缓存 + 接口保存
        setCachesFolder({ dispatch }, flag = true) {
            // cachesFolder(state.pageList)
            flag && dispatch('setSaveDrafts')
        },
        // 获取组件信息, is_get_drafts是否存在草稿箱, 1为存在
        async getModuleList({ dispatch, commit, rootState }, is_get_drafts) {
            const { data } = await Vue.prototype.$http('getModuleList', {
                page_id: rootState.page_id,
                is_get_drafts,
            })
            let itemList = data.list.map(o => {
                return fillItemData(o)
            })
            // 设置本地跟服务器的时间差值
            commit('SET_SYSTEM_TIME_DIff', data.system_time - Date.now())
            // 设置最大module_no
            commit('SET_MAX_MODULE_NO', data.max_module_no)
            // 设置本地数据
            dispatch('setPageList', itemList)

        },
        // 保存组件
        async saveModuleData({ rootState, dispatch, commit }, obj) {
            let params = {
                page_id: rootState.page_id,
                login_uid: rootState.login_uid,
                username: rootState.username,
                module_no: obj.module_no,
                list: obj.data || []
            }
            await Vue.prototype.$http('saveModuleData', params)
            // 如果存在临时时间戳的话  这边就要去设置组件的时间戳来触发组件内容的重发请求机制
            if (rootState.currentCheckAttr.tempTimeStamp) {
                dispatch('setComponentInfoKey', { key: 'timeStamp', value: rootState.currentCheckAttr.tempTimeStamp })
                commit('SET_TEMP_TIME_STAME', 0)
            }
        },
        // 保存草稿箱
        async setSaveDrafts({ dispatch, state, rootState }, flag = false) {
            // 修改itemList的数据格式
            let params = {
                page_id: rootState.page_id,
                login_uid: rootState.login_uid,
                username: rootState.username,
                list: state.pageList.map(o => {
                    return {
                        id: o.id,
                        module_no: o.module_no,
                        module_name: o.module_name,
                        title: o.title,
                        sub_title: o.sub_title,
                        api: o.api,
                        apiParam: o.apiParam,
                        cmptId: o.cmptId,
                        extra: o.extra
                    }
                })
            }
            await Vue.prototype.$http('saveDrafts', params)
            flag && await dispatch('getModuleList', 1)
        }
    }
}

export default project


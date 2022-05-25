/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zgt
 * @Date: 2021-12-28 10:33:52
 */
export const state = () => ({
    isLogin: -1,
    userInfo: undefined
})

export const mutations = {
    SET_ISLOGIN: (state, status) => {
        state.isLogin = status
    },
    SET_USERINFO: (state, info) => {
        state.userInfo = info
    }
}
export const actions = {
    async getUserInfo({ dispatch, commit }) {
        try {
            const { data, code } = await this.$axios.$post('company/getInfo')
            if (code === 20200) {
                this.$router.push('/login')
            } else if (code === 0) {
                delete data.introduction
                this.$cookies.set('userInfo', data)
                commit('SET_USERINFO', data)
                commit('SET_ISLOGIN', 1)
            } else {
                dispatch('getIsLogin')
            }
        } catch (err) {
        }
    },
    getIsLogin({ commit, dispatch }) {
        const userInfo = this.$cookies.get('userInfo')
        if (userInfo) {
            commit('SET_USERINFO', userInfo)
            commit('SET_ISLOGIN', 1)
        } else {
            commit('SET_ISLOGIN', -1)
        }
    },
    clearLogin({ commit }) {
        this.$cookies.remove('applet_token')
        this.$cookies.remove('userInfo')
        this.$router.push('/login')
        commit('SET_USERINFO', '')
        commit('SET_ISLOGIN', -1)
    }
}


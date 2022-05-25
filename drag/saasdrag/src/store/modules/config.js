import Vue from 'vue'
/** 基本用户信息 */
export default {
	namespaced: true,
	state: {
		pagePath: {},
		pagePathFrom: {},
		shopConfig: null,
		shopInfo: null,
        pricePrefix: '',
	},
	mutations: {
		SET_SHOP_CONFIG(state, data) {
			state.shopConfig = data;
		},
		SET_SHOP_INFO(state, data) {
			state.shopInfo = data;
		},
        SET_SHOP_INFO(state, data) {
            state.shopInfo = data
            state.pricePrefix = data.price_prefix || '¥'
        },
	},
	actions: {
		async setShopConfig({ commit }, o) {
			let { data = {} } = await Vue.prototype.$http('shopConfig');
			console.log('****当前模板：' + data.theme + '****');
			commit('SET_SHOP_CONFIG', data);
		},
		async setShopInfo({ commit }, o) {
			let { data = {} } = await Vue.prototype.$http('shopInfo');
			commit('SET_SHOP_INFO', data);
		}
	},
	getters: {
		getPagePath: (state) => {
			return state.pagePath
		},
		getPagePathFrom: (state) => {
			return state.pagePathFrom
		},
		getShopInfo: (state) => {
			return state.shopInfo
		}
	}
}

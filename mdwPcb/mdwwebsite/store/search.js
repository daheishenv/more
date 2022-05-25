export const state = () => ({
    menuSearch: ''
})
export const mutations = {
    search(state, keyword) {
        state.menuSearch = keyword
    }
}

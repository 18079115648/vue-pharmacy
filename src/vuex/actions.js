export default {
    getLoadingStatus({ commit }, data) {
        commit('setLoadingStatus', data)
    }
}
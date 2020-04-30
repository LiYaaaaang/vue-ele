//types
const types = {
    REMARk_INFO: 'REMARk_INFO'
}
//state
const state = {
    remarkInfo: {
        tableware: '',
        remark: ''
    }
}
//getters
const getters = {
    remarkInfo: state => state.remarkInfo
}
//mutations
const mutations = {
    [types.REMARk_INFO](state, remarkInfo) {
        if (remarkInfo) {
            state.remarkInfo = remarkInfo
        } else {
            state.remarkInfo = null
        }
    }
}
//actions
const actions = {
    setRemarkInfo: ({
        commit
    }, remarkInfo) => {
        commit(types.REMARk_INFO, remarkInfo)
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}
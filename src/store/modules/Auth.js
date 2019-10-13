import types from '../types'
import consts from '../../consts'

const state = {
    user: null,
    userState: consts.Auth.NOT_LOGIN
}

const mutations = {
    [types.Auth.LOGIN] (state, params) {
        const user = params.user || null

        state.user = user
        state.userState = consts.Auth.LOGIN
    },
    [types.Auth.LOGOUT] (state) {
        state.user = null
        state.userState = consts.Auth.NOT_LOGIN
    }
}

const actions = {
    [types.Auth.LOGIN] ({ commit }, params) {
        commit(types.Auth.LOGIN, params)
    },
    [types.Auth.LOGOUT] ({ commit }) {
        commit(types.Auth.LOGOUT)
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}

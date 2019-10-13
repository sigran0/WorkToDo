
import types from '../types'
import Vue from 'vue'

const state = {
    queue: { }
}

const mutations = {
    [types.API.PUSH_QUEUE_ITEM] (state, params) {
        const methodName = params.methodName
        const key = params.key

        Vue.set(state.queue, key, methodName)
    },
    [types.API.POP_QUEUE_ITEM] (state, params) {
        const key = params.key

        Vue.delete(state.queue, key)
    }
}

const actions = {
    [types.API.PUSH_QUEUE_ITEM] ({ commit }, params) {
        commit(types.API.PUSH_QUEUE_ITEM, params)
    },
    [types.API.POP_QUEUE_ITEM] ({ commit }, params) {
        commit(types.API.POP_QUEUE_ITEM, params)
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



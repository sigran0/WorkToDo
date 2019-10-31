
import types from '../types'
import Vue from 'vue'

const state = {
    todo: []
}

const mutations = {
    [types.mutation.todo.writeAll] (state, params) {
        state.todo.push(...params)
    },
    [types.mutation.todo.write] (state, params) {
        state.todo.push(params)
    },
    [types.mutation.todo.modify] (state, params) {
        const id = params.id
        const index = state.articles.findIndex(item => item.id === id)

        Vue.set(state.articles, index, params)
    },
    [types.mutation.todo.delete] (state, params) {
        const id = params.id
        const index = state.articles.findIndex(item => item.id === id)

        Vue.delete(state.articles, index)
    },
    [types.mutation.todo.deleteAll] (state) {
        state.articles.splice(0, state.articles.length)
    }
}

const actions = {

    [types.action.todo.fetch] ({ commit }, params) {
        commit(types.mutation.todo.deleteAll)
        commit(types.mutation.todo.writeAll, params)
    },
    [types.action.todo.write] ({ commit }, params) {
        commit(types.mutation.todo.write, params)
    },
    [types.action.todo.modify] ({ commit }, params) {
        commit(types.action.todo.modify, params)
    },
    [types.action.todo.delete] ({ commit }, params) {
        commit(types.action.todo.delete, params)
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

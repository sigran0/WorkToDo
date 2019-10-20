
import types from '../types'
import Vue from 'vue'

const state = {
    articles: []
}

const mutations = {
    [types.Article.READ_ARTICLES] (state, params) {
        state.articles.push(...params)
    },
    [types.Article.WRITE_ARTICLE] (state, params) {
        state.articles.push(params)
    },
    [types.Article.MODIFY_ARTICLE] (state, params) {
        const key = params.key
        const index = state.articles.findIndex(item => item.key === key)

        Vue.set(state.articles, index, params)
    },
    [types.Article.DELETE_ARTICLE] (state, params) {
        const id = params.id
        const index = state.articles.findIndex(item => item.id === id)
        Vue.delete(state.articles, index)
    },
    [types.Article.EMPTY_ARTICLES] (state) {
        state.articles.splice(0, state.articles.length)
    }
}

const actions = {

    [types.Article.READ_ARTICLES] ({ commit }, params) {
        commit(types.Article.EMPTY_ARTICLES)
        commit(types.Article.READ_ARTICLES, params)
    },
    [types.Article.WRITE_ARTICLE] ({ commit }, params) {
        commit(types.Article.WRITE_ARTICLE, params)
    },
    [types.Article.MODIFY_ARTICLE] ({ commit }, params) {
        commit(types.Article.MODIFY_ARTICLE, params)
    },
    [types.Article.DELETE_ARTICLE] ({ commit }, params) {
        commit(types.Article.DELETE_ARTICLE, params)
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

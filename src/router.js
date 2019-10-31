
import Vue from 'vue'
import VueRouter from 'vue-router'

import Place from "./pages/Place"
import Login from './pages/Login'
import Index from './pages/Index'

import { Allow } from './constant'
import store from './store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Index, name: 'Index', meta: { hide: true, allow: Allow.Both } },
        { path: '/Place', component: Place, name: 'Place', meta: { hide: false, allow: Allow.User } },
        { path: '/Login', component: Login, name: 'Login', meta: { hide: true, allow: Allow.Guest } },
        { path: '*', redirect: '/'}
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.allow === Allow.User && !store.getters.checkLogin) {
        next('/Index')
    }

    next()
})

export default router

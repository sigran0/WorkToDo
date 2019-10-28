
import Vue from 'vue'
import VueRouter from 'vue-router'

import Place from "./pages/Place"
import Login from './pages/Login'
import Index from './pages/Index'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Index, name: 'Index', meta: { hide: true } },
        { path: '/Place', component: Place, name: 'Place', meta: { hide: false } },
        { path: '/Login', component: Login, name: 'Login', meta: { hide: true } }
    ]
})

export default router

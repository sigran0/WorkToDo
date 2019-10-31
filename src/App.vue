<template>
    <v-app id="app">
        <toolbar app @clickMenu="drawerShow = !drawerShow" v-if="!hide"/>
        <drawer app v-model="drawerShow" v-if="!hide"/>
        <v-content>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
    import Toolbar from './components/base/Toolbar'
    import Drawer from './components/base/Drawer'
    import firebase from './firebase/firebase'
    import { mapActions, mapState } from 'vuex'
    import types from './store/types'

    export default {
        name: 'App',
        components: {
            Drawer,
            Toolbar
        },
        data () {
            return {
                drawerShow: false,
                hide: false
            }
        },
        computed: {
            ...mapState({
                user: state => state.Auth.user
            })
        },
        watch: {
            $route: {
                handler (value) {
                    console.log(value)
                    this.hide = value.meta.hide
                },
                immediate: true
            }
        },
        methods: {
            ...mapActions({
                setUser: types.Auth.SET_USER
            })
        },
        mounted () {
            firebase.auth.onAuthStateChanged(user => {
                this.setUser({ user: user })
            })
        }
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>

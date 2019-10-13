<template>
    <v-app id="app">
        <toolbar app @clickMenu="drawerShow = !drawerShow"/>
        <drawer app v-model="drawerShow"/>
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
    import { mapActions } from 'vuex'
    import types from './store/types'

    export default {
        name: 'App',
        components: {
            Drawer,
            Toolbar
        },
        data () {
            return {
                drawerShow: false
            }
        },
        methods: {
            ...mapActions({
                apiPush: types.API.PUSH_QUEUE_ITEM
            })
        },
        mounted() {
            const params = {
                key: 'hello World',
                methodName: 'fuck you'
            }
            console.log(this.$store)
            this.apiPush(params)
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

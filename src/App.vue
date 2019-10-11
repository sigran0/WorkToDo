<template>
    <v-app>
        <v-content>
            <toolbar @clickMenu="drawerShow = !drawerShow"/>
            <drawer v-model="drawerShow"/>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
    import Toolbar from './components/base/Toolbar'
    import Drawer from './components/base/Drawer'

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

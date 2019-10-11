<template>
    <v-toolbar dark>
        <v-app-bar-nav-icon @click="clickMenu"></v-app-bar-nav-icon>
        <v-toolbar-title>WorkToDo</v-toolbar-title>
    </v-toolbar>
</template>

<script>
    export default {
        name: 'Toolbar',
        methods: {
            clickMenu () {
                this.$emit('clickMenu')
            }
        }
    }
</script>

<style scoped>

</style>

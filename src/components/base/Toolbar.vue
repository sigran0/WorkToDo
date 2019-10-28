<template>
    <v-app-bar clipped-left app dark flat>
        <template v-if="$vuetify.breakpoint.smAndDown">
            <v-app-bar-nav-icon @click="clickMenu"></v-app-bar-nav-icon>
        </template>
        <v-toolbar-title>WorkToDo</v-toolbar-title>
    </v-app-bar>
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

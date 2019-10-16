<template>
    <v-navigation-drawer
        dark
        clipped
        absolute
        v-model="show"
        style="padding-top: 50px"
    >
        <v-list>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <div class="pa-2">
                <v-btn block>Logout</v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
    import { showModel } from '../../mixins'
    export default {
        name: "Drawer",
        mixins: [showModel],
        data () {
            return {
                items: [
                    { title: 'Home', icon: 'mdi-home' },
                    { title: 'About', icon: 'mdi-about' },
                ]
            }
        }
    }
</script>

<style scoped>

</style>

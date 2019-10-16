<template>
    <v-container>
        <v-row
            justify="center"
            align="center">

            <v-col lg="8" md="10" sm="12">
                <v-card outlined tile>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            What will you do?
                        </v-toolbar-title>
                        <v-spacer />
                        <template v-if="$vuetify.breakpoint.smAndUp">
                            <v-btn icon>
                                <v-icon>mdi-export-variant</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-delete-circle</v-icon>
                            </v-btn>
                        </template>
                        <v-btn icon @click="writing = !writing">
                            <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                        <v-progress-linear
                            :active="loading"
                            :indeterminate="loading"
                            absolute
                            bottom
                            color="deep-purple accent-4"
                        ></v-progress-linear>
                    </v-toolbar>
                    <v-card-text>
                        <div v-show="articles.length === 0 && !writing" style="text-align: center;">
                            Good job today 😎
                        </div>
                        <v-list v-show="articles.length > 0">
                            <v-list-item
                                v-for="(item, index) in articles"
                                :key="`${index}-article`"
                                 @click="OnClickDelete(item)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list>
                        <div v-show="writing">
                            <v-text-field v-model="text" @keyup.enter="OnClickWrite(text)" outlined flat autofocus placeholder="Write down whatever you want."/>
                        </div>
                    </v-card-text>
                    <v-card-actions v-show="writing">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="OnClickWrite(text)">Write</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    import api from '../api'
    import { mapState } from 'vuex'

    export default {
        name: 'Home',
        data () {
            return {
                text: '',
                writing: false
            }
        },
        computed: {
            ...mapState({
                articles: state => state.Article.articles,
                apiQueue: state => state.API.queue
            }),
            loading () {
                return Object.keys(this.apiQueue).length > 0
            }
        },
        methods: {
            async OnClickWrite () {
                if (this.text.length > 0) {
                    const text = this.text
                    this.$nextTick(async () => {
                        await api.Article.write(text)
                        await api.Article.read()
                    })
                }
                this.text = ''
            },
            async OnClickRead () {
                await api.Article.read()
            },
            async OnClickDelete (item) {
                await api.Article.deleteItem(item.id)
                await api.Article.read()
            }
        },
        async mounted () {
            await api.Article.read()
        }
    }
</script>

<style scoped>

</style>

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
                        <v-btn icon @click="OnClickAddIcon">
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
                            >
                                <v-hover v-slot:default="{ hover }">
                                    <v-row>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{ item.text }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon style="color: rgba(0,0,0,0)">.</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-icon v-if="hover === true" @click="OnClickModifyIcon(item)">
                                            <v-icon>mdi-border-color</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-icon v-if="hover === true" @click="OnClickDelete(item)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-list-item-icon>
                                    </v-row>
                                </v-hover>
                            </v-list-item>
                        </v-list>
                        <v-text-field v-show="writing" v-model="text" @keyup.enter="OnClickWrite(text)" outlined flat autofocus placeholder="Write down whatever you want."/>
                        <v-text-field v-show="modifying" v-model="text" @keyup.enter="OnClickModify()" outlined flat autofocus placeholder="Write down whatever you wanna modify it." />
                    </v-card-text>
                    <v-card-actions v-show="writing || modifying">
                        <v-spacer></v-spacer>
                            <v-btn v-show="writing" text color="primary" @click="OnClickWrite()">Write</v-btn>
                        <v-btn v-show="modifying" text color="warning" @click="OnClickModify()">Modify</v-btn>
                    </v-card-actions>
                    {{ visibleText }}, {{ hashtags }}
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    import api from '../api'
    import { mapState } from 'vuex'
    import twitter from 'twitter-text'


    export default {
        name: 'Home',
        data () {
            return {
                text: '',
                writing: false,
                modifying: false,
                modifyingItem: { text: '' }
            }
        },
        computed: {
            ...mapState({
                articles: state => state.Article.articles,
                apiQueue: state => state.API.queue
            }),
            loading () {
                return Object.keys(this.apiQueue).length > 0
            },
            visibleText () {
                const regexp = new RegExp('#([^\\s]*)','g');
                return this.text.replace(regexp, '')
            },
            hashtags () {
                return twitter.extractHashtags(this.text)
            }
        },
        watch: {
        },
        methods: {
            async OnClickWrite () {
                if (this.text.length > 0) {
                    const text = this.text
                    this.$nextTick(async () => {
                        await api.Article.write(text)
                    })
                }
                this.text = ''
            },
            async OnClickRead () {
                await api.Article.read()
            },
            async OnClickDelete (item) {
                this.modifyingItem = { text: '' }
                this.modifying = false
                this.text = ''
                await api.Article.deleteItem(item.id)
            },
            async OnClickModify () {
                const id = this.modifyingItem.id
                const text = this.text

                this.modifyingItem = { text: '' }
                this.modifying = false
                this.text = ''

                await api.Article.modify(id, text)
            },
            OnClickModifyIcon (item) {
                this.writing = false
                this.modifying = true
                this.modifyingItem = item
                this.text = item.text
            },
            OnClickAddIcon () {
                this.writing = true
                this.modifying = false
                this.text = ''
            }
        },
        async mounted () {
            await api.Article.read()
        }
    }
</script>

<style scoped>
</style>

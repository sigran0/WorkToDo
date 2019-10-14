<template>
    <v-container>
        <v-row
            justify="center"
            align="center">
            <v-col cols="4">
                <v-text-field
                    v-model="text"
                    label="text"
                    placeholder="text"
                    outlined
                    @keydown.enter="OnClickWrite"
                >
                </v-text-field>
                <v-btn class="pa-2 elevation-1" style="margin-bottom: 20px;" width="100%" @click="OnClickWrite">write text</v-btn>
                <v-btn class="pa-2 elevation-1" style="margin-bottom: 20px;" width="100%" @click="OnClickRead">read text</v-btn>
            </v-col>
            <v-col cols="8">
<!--                <v-list v-if="articles.length > 0">-->
<!--                    <v-list-item-->
<!--                        v-for="(item, index) in articles"-->
<!--                        :key="`${index}-data-item`"-->
<!--                    >-->
<!--                        <v-list-item-content>-->
<!--                            {{ item.text }}-->
<!--                        </v-list-item-content>-->
<!--                    </v-list-item>-->
<!--                </v-list>-->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import api from '../api'
    import { mapState, mapActions } from 'vuex'
    import types from '../store/types'

    export default {
        name: 'Home',
        data () {
            return {
                text: ''
            }
        },
        computed: {
            ...mapState({
                articles: state => state.Article.articles
            })
        },
        methods: {
            ...mapActions([types.Article.WRITE_ARTICLE]),
            async OnClickWrite () {
                const result = await api.Article.write(this.text)
                // const result = await this.$store.dispatch(types.Article.WRITE_ARTICLE, this.text)
                console.log(result)
            },
            async OnClickRead () {
                const result = await api.Article.read()
                console.log(result)
            }
        },
        async mounted () {
            await this.OnClickRead()
        }
    }
</script>

<style scoped>

</style>

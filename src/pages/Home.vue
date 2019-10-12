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
                >
                </v-text-field>
                <v-btn class="pa-2 elevation-1" style="margin-bottom: 20px;" width="100%" @click="write">write text</v-btn>
                <v-btn class="pa-2 elevation-1" style="margin-bottom: 20px;" width="100%" @click="read">read text</v-btn>
            </v-col>
            <v-col cols="8">
                <v-list>
                    <v-list-item
                        v-for="(item, index) in dataList"
                        :key="`${index}-data-item`"
                        @click="deleteItem(item)"
                    >
                        <v-list-item-content>
                            {{ item.text }}
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import firebaseAdapter from "../firebase/firebaseAdapter"
    export default {
        name: "Home",
        data () {
            return {
                dataList: [],
                text: ''
            }
        },
        methods: {
            async write () {
                await firebaseAdapter.write(this.text)
                await this.read()
                this.text = ''
            },
            async read () {
                const snapshot = await firebaseAdapter.read()
                const datas = snapshot.docs.reduce((list, doc) => {
                    const id = doc.id
                    const data = doc.data()
                    list.push( { id: id, text: data.text })
                    return list
                }, [])
                this.dataList.splice(0, this.dataList.length)
                this.dataList.push(...datas)
            },
            async deleteItem (item) {
                await firebaseAdapter.deleteItem(item.id)
                await this.read()
            }
        }
    }
</script>

<style scoped>

</style>

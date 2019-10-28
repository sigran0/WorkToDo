<template>
    <v-container>
        <v-row
            justify="center"
            align="center"
        >
            <v-col sm="10" lg="8" xl="6">
                <v-card flat>
                    <v-card-title>
                        Login
                    </v-card-title>
                    <v-card-text>
                        <v-btn block dark color="primary" height="50" @click="OnClickLoginByGoogle">
                            <v-icon style="padding-right: 20px;">mdi-google</v-icon>
                            Login by Google
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import firebaseAuth from '../firebase/firebaseAdapter'
    export default {
        name: 'Login',
        methods: {
            async OnClickLoginByGoogle () {
                const result = await firebaseAuth.loginByGoogle()
                console.log(result)
            }
        }
    }
</script>

<style scoped>

</style>

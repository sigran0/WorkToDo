<template>
    <div>
        Hello Index
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Index',
        computed: {
            ...mapGetters(['checkLogin'])
        },
        methods: {
            ...mapActions([]),
            goLogin () {
                this.$router.push('/Login')
            },
            goPlace () {
                this.$router.push('/Place')
            }
        },
        mounted () {
            if (this.checkLogin === true) {
                this.goPlace()
            } else {
                this.goLogin()
            }
        }
    }
</script>

<style scoped>

</style>

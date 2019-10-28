<template>
    <div>
        Hello Index
    </div>
</template>

<script>
    export default {
        name: 'Index',
        mounted () {
            setTimeout(() => {
                this.$router.push('/Place')
            }, 1000)
        }
    }
</script>

<style scoped>

</style>

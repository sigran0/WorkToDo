<template>
    <div class="index-container background" :class="{ dark: dark }">
        <div class="lds-dual-ring" :class="{ dark: dark }"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'Index',
        data () {
            return {
                dark: false
            }
        },
        computed: {
            ...mapGetters(['checkLogin'])
        },
        methods: {
            goLogin () {
                this.$router.push('/Login')
            },
            goPlace () {
                this.$router.push('/Place')
            }
        },
        mounted () {
            setTimeout(() => {
                if (this.checkLogin === true) {
                    this.goPlace()
                } else {
                    this.goLogin()
                }
            }, 3000)
        }
    }
</script>


<style scoped>
    .index-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .lds-dual-ring {
        display: inline-block;
        width: 64px;
        height: 64px;
    }
    .lds-dual-ring:after {
        width: 46px;
        height: 46px;

        content: " ";
        display: block;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #4f4f4f;
        border-color: #4f4f4f transparent #4f4f4f transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    .dark.lds-dual-ring:after  {
        border: 5px solid #ffffff;
        border-color: #ffffff transparent #ffffff transparent;
    }

    .dark.background {
        background-color: #4f4f4f;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>

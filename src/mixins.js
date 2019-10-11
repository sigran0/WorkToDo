
const showModel = {
    data () {
        return {
            show: false
        }
    },
    computed: {
        model () {
            return this.$attrs.value
        }
    },
    watch: {
        model (value) {
            if (this.show !== value) {
                this.show = value
            }
        },
        show (value) {
            this.$emit('input', value)
        }
    }
}

export default {
    showModel
}

export { showModel }

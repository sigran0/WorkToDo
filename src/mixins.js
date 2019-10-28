
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

const hide = {
    data () {
        return {
            hide: false
        }
    },
    watch: {
        $route: {
            handler (value) {
                this.hide = value.meta.hide
            },
            immediate: true
        }
    },
}

export default {
    showModel,
    hide
}

export { showModel, hide }

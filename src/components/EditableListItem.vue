<template>
    <div class="input-wrapper" >
        <input class="input" v-model="text" type="text" v-show="editing" @focusout="OnFocusOut" autofocus />
        <div @click="OnClickText" v-show="!editing" style="height: 50px; vertical-align: middle; padding: 10px;" @>
            {{ text }}
        </div>
    </div>

</template>

<script>
    export default {
        name: 'EditableListItem',
        data () {
            return {
                text: '',
                editing: false
            }
        },
        methods: {
            OnClickText () {
                this.editing = true
            },
            OnFocusOut () {
                this.editing = false
            }
        }
    }
</script>

<style scoped>

    .input-wrapper {
        width: 100%;
    }

    .input {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
    }

</style>

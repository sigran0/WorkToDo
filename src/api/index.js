
import store from '../store'
import types from '../store/types'
import firebaseAdapter from '../firebase/firebaseAdapter'

const caller = {
    get generateKey () {
        return Math.random().toString(16).substring(2).toUpperCase();
    },
    async call (func, params) {
        const key = this.generateKey
        const methodName = func.name

        const apiParams = { key: key, methodName: methodName }

        await store.dispatch(types.API.PUSH_QUEUE_ITEM, apiParams)

        let result = null

        try {
            result = await func(params)
        } catch (e) {
            console.error(`Occured an error in ${methodName}!`, e)
        } finally {
            await store.dispatch(types.API.POP_QUEUE_ITEM, apiParams)
        }

        return result
    }
}

export default {

    Article: {
        async read () {
            const result = await caller.call(firebaseAdapter.read)
            this.dispatch(types.Article.WRITE_ARTICLE, result)
            return result
        },
        async write (text) {
            const result = await caller.call(firebaseAdapter.write, text)
            return result
        }
    }
}

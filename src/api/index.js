
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

const generateHexString = (length) => {
    let ret = ""
    while (ret.length < length) {
        ret += Math.random().toString(16).substring(2)
    }
    return ret.substring(0,length);
}

const generate258BitKey = () =>  generateHexString(58)


export default {

    Article: {
        async read () {
            const result = await caller.call(firebaseAdapter.read)
            store.dispatch(types.Article.READ_ARTICLES, result)
            return result
        },
        async write (text) {
            const timestamp = new Date().toISOString()
            const id = generate258BitKey()

            const params = { text: text, timestamp: timestamp, id: id }
            store.dispatch(types.Article.WRITE_ARTICLE, params)

            const result = await caller.call(firebaseAdapter.write, { id: id, text: text, timestamp: timestamp })

            return result
        },
        async modify (id, text) {
            const timestamp = new Date().toISOString()
            const params = { text: text, timestamp: timestamp, id: id }
            store.dispatch(types.Article.MODIFY_ARTICLE, params)

            const result = await caller.call(firebaseAdapter.write, params)
            return result
        },
        async deleteItem (id) {
            store.dispatch(types.Article.DELETE_ARTICLE, { id: id })
            const result = await caller.call(firebaseAdapter.deleteItem, id)
            return result
        }
    }
}

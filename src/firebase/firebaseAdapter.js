
import firebaseKey from './firebase-key'
import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
    apiKey: firebaseKey.apiKey,
    authDomain: firebaseKey.authDomain,
    projectId: firebaseKey.projectId
})

const db = firebase.firestore()


const extractItemFromSnapshot = (snapshot) => {
    return snapshot.docs.reduce((list, doc) => {
        const id = doc.id
        const data = doc.data()
        list.push( { id: id, timestamp: data.timestamp, visibleText: data.visibleText, hashtags: data.hashtags, modifying: false })
        return list
    }, [])
}

const write = async (params) => {
    const doc = await db.collection('text').doc(params.id).set({
        timestamp: params.timestamp,
        visibleText: params.visibleText,
        hashtags: params.hashtags
    })
    return doc
}

const read = async () => {
    const snapshot = await db.collection('text').orderBy('timestamp').get()
    return extractItemFromSnapshot(snapshot)
}

const deleteItem = async (id) => {
    await db.collection('text').doc(id).delete()
    return true
}

db.collection('text').onSnapshot((snapshot) => {
    return extractItemFromSnapshot(snapshot)
})


const provider = new firebase.auth.GoogleAuthProvider()

const loginByGoogle = async () => {
    const result = {
        error: null,
        data: null
    }
    try {
        const res = await firebase.auth().signInWithPopup(provider)
        const token = res.credential.accessToken
        const user = res.user
        result.data = {
            token: token,
            user: user
        }
    } catch (error) {
        console.error(error)
        result.error = error
    }
    return result
}

const checkLogin = async () => {
    return firebase.auth().currentUser
}

export default {
    write,
    read,
    deleteItem,
    loginByGoogle,
    checkLogin
}

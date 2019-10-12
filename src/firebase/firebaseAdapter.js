
import firebaseKey from './firebase-key'
import firebase from 'firebase'

firebase.initializeApp({
    apiKey: firebaseKey.apiKey,
    authDomain: firebaseKey.authDomain,
    projectId: firebaseKey.projectId
})

const db = firebase.firestore()

const write = async (text) => {
    const doc = await db.collection('text').add({
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    return doc
}

const read = async () => {
    const snapshot = await db.collection('text').orderBy('timestamp', 'desc')
        .get()
    return snapshot
}

const deleteItem = async (id) => {
    await db.collection('text').doc(id).delete()
    return true
}

db.collection('text').onSnapshot((item) => {
    item.forEach(doc => {
        console.log('fucking', doc.data())
    })
})

export default {
    write,
    read,
    deleteItem
}

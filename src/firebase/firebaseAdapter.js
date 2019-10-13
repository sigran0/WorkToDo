
import firebaseKey from './firebase-key'
import firebase from 'firebase'

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
        const timestamp = doc.timestamp
        list.push( { id: id, text: data.text, timestamp: timestamp })
        return list
    }, [])
}

const write = async (text) => {
    const doc = await db.collection('text').add({
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    return doc
}

const read = async () => {
    const snapshot = await db.collection('text').orderBy('timestamp', 'desc').get()
    return extractItemFromSnapshot(snapshot)
}

const deleteItem = async (id) => {
    await db.collection('text').doc(id).delete()
    return true
}

db.collection('text').onSnapshot((snapshot) => {
    return extractItemFromSnapshot(snapshot)
})

export default {
    write,
    read,
    deleteItem
}

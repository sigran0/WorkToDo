
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

export default {
    write,
    read,
    deleteItem
}

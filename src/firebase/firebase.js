import firebase from 'firebase/app'
import firebaseKey from './firebase-key'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: firebaseKey.apiKey,
        authDomain: firebaseKey.authDomain,
        databaseURL: firebaseKey.databaseURL,
        projectId: firebaseKey.projectId,
        storageBucket: firebaseKey.storageBucket,
        messagingSenderId: firebaseKey.messagingSenderId,
        appId: firebaseKey.appId
    })
}

export default (context, inject) => {
    inject('firebase', firebase)
    inject('firestore', firebase.firestore())
    inject('auth', firebase.auth())
}

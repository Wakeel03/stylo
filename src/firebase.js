import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAs3ZZIdrlcZEYFP0D87e6PR5VFQpu-Ojo",
    authDomain: "stylo-ba986.firebaseapp.com",
    projectId: "stylo-ba986",
    storageBucket: "stylo-ba986.appspot.com",
    messagingSenderId: "188835587292",
    appId: "1:188835587292:web:1f9514a0c24f29e5678019",
    measurementId: "G-QK1K3KVSND"

});

const db = firebaseApp.firestore();

export default db;
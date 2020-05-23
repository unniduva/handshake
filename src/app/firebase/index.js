import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB_ylaQk5Ti2A97iBP-nNZBi6jnd9jkD-k",
    authDomain: "handshake-362ff.firebaseapp.com",
    databaseURL: "https://handshake-362ff.firebaseio.com",
    projectId: "handshake-362ff",
    storageBucket: "handshake-362ff.appspot.com",
    messagingSenderId: "19521589112",
    appId: "1:19521589112:web:e1d89e7ff20dd27931828d",
    measurementId: "G-7M09K44HPB"
  };
  
export const FirebaseAdmin = firebase.initializeApp(firebaseConfig);
const baseDb = FirebaseAdmin.firestore();

export const db = baseDb;
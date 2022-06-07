// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2XGolBYrEspLJu1TP459KrluYPoCQjCk",
    authDomain: "alif-test-fb3d7.firebaseapp.com",
    projectId: "alif-test-fb3d7",
    storageBucket: "alif-test-fb3d7.appspot.com",
    messagingSenderId: "252632196337",
    appId: "1:252632196337:web:632a72e922baef20823550"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
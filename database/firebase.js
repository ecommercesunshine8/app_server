// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiiUAi7KSJGZFAasBZZUNxIxA9ROslhuE",
    authDomain: "arduino-client.firebaseapp.com",
    databaseURL: "https://arduino-client-default-rtdb.firebaseio.com",
    projectId: "arduino-client",
    storageBucket: "arduino-client.appspot.com",
    messagingSenderId: "420306785680",
    appId: "1:420306785680:web:4c76236682548900580f15",
    measurementId: "G-Z1PJYW15K5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let database = getFirestore(app);


export { database }
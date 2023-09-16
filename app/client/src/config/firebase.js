// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    getFirestore,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAU0XBrglS5ycRdJ4bbX1dzNUW0HVRCUDg",
    authDomain: "dategowhere-96993.firebaseapp.com",
    projectId: "dategowhere-96993",
    storageBucket: "dategowhere-96993.appspot.com",
    messagingSenderId: "377126877496",
    appId: "1:377126877496:web:7505bf1c487884fa34a9cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db,
}
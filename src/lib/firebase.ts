import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtmKTEjM2p3Cavqg175VDG615oOUgQgPk",
    authDomain: "jsbet-1.firebaseapp.com",
    projectId: "jsbet-1",
    storageBucket: "jsbet-1.firebasestorage.app",
    messagingSenderId: "148992261450",
    appId: "1:148992261450:web:a22d889688ba63457ed5b3",
    measurementId: "G-9CTCGRGQP4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

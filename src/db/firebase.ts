// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKeVmF2kP2lAzm66c_QAtt8b3AWF5JuvQ",
    authDomain: "cesigames-f4c38.firebaseapp.com",
    projectId: "cesigames-f4c38",
    storageBucket: "cesigames-f4c38.firebasestorage.app",
    messagingSenderId: "885817464414",
    appId: "1:885817464414:web:3d93993b945563b85046cf",
    measurementId: "G-YEHCTTVGTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
// client/src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // ✅ Import this
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCKy1Fkd1HZdn2h2x4M69OTWKukBqC9iFw",
    authDomain: "snatched-80d93.firebaseapp.com",
    projectId: "snatched-80d93",
    storageBucket: "snatched-80d93.firebasestorage.app",
    messagingSenderId: "421780360346",
    appId: "1:421780360346:web:07cdb0af9cecc1cb8da323",
    measurementId: "G-2XP0YF7QVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);                     // ✅ Initialize auth
const analytics = getAnalytics(app);

export { auth };                               // ✅ Export it

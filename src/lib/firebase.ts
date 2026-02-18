import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDqnuNKaZt11_fLqjWwMfeN1wXLLheOMi8",
    authDomain: "omad-1bc90.firebaseapp.com",
    projectId: "omad-1bc90",
    storageBucket: "omad-1bc90.firebasestorage.app",
    messagingSenderId: "782040620963",
    appId: "1:782040620963:web:aeae48c9530cf6e6f24416",
    measurementId: "G-V7Y6L5EQRC"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, storage, analytics };

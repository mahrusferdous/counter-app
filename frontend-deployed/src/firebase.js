import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCAR03Ue3cEdZ16SN4xkKUyC_p1yCBJFwQ",
	authDomain: "counter-app-counter.firebaseapp.com",
	projectId: "counter-app-counter",
	storageBucket: "counter-app-counter.firebasestorage.app",
	messagingSenderId: "670995716737",
	appId: "1:670995716737:web:3ae53876a024e808be4b80",
	measurementId: "G-HNQCEEBPS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth + Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

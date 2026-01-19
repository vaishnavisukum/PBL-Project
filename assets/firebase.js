// firebase.js
// Firebase CDN ES Module imports (browser-safe)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// IMPORTANT — Replace these values with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAqwagg62ETKpJDkvj6ffqb3-JgnDt17dk",
  authDomain: "alalankar--jewellers.firebaseapp.com",
  projectId: "alalankar--jewellers",
  storageBucket: "alalankar--jewellers.firebasestorage.app",
  messagingSenderId: "397333430083",
  appId: "1:397333430083:web:498eb7e4fa75854584f9f6",
  measurementId: "G-Z08BKRB7GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore & Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Exports
export { db, auth };

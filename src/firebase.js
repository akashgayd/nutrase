// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPdUbUFzFO8XtOh9FJt0DmEpgZpFhyQcc",
  authDomain: "dietplan-1b8df.firebaseapp.com",
  databaseURL: "https://dietplan-1b8df-default-rtdb.firebaseio.com",
  projectId: "dietplan-1b8df",
  storageBucket: "dietplan-1b8df.firebasestorage.app",
  messagingSenderId: "172149690520",
  appId: "1:172149690520:web:966949b27cf505f0b580ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

// Initialize Realtime Database
const db = getDatabase(app);

// Export database and related functions
export { db,auth };
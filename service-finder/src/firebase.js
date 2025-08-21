// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (Group configuration)
const firebaseConfig = {
  apiKey: "AIzaSyDGk1cSrFrVo8qPhKCVRMS7IE5GjBwfdzU",
  authDomain: "service-finder-8c0b7.firebaseapp.com",
  projectId: "service-finder-8c0b7",
  storageBucket: "service-finder-8c0b7.firebasestorage.app",
  messagingSenderId: "607230335548",
  appId: "1:607230335548:web:fb24615f3f1ade6985c139",
  measurementId: "G-PC8H5020TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
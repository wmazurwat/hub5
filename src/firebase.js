// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX7KA01TmaGgSTEO887vzoT6CbJrBgLf4",
  authDomain: "hub-5-7f3ec.firebaseapp.com",
  projectId: "hub-5-7f3ec",
  storageBucket: "hub-5-7f3ec.appspot.com",
  messagingSenderId: "728690736102",
  appId: "1:728690736102:web:ec999633c3a06f22e2b427",
  measurementId: "G-8P3TVR6Y0L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

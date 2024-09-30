// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-332a7.firebaseapp.com",
  projectId: "real-estate-332a7",
  storageBucket: "real-estate-332a7.appspot.com",
  messagingSenderId: "346521343293",
  appId: "1:346521343293:web:820f2ce06d767fc2046154"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import firebase from "firebase";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk7CLQUgMGmIYSkK9uGayKe-nmZ67vozA",
  authDomain: "casket-with-memories-rn.firebaseapp.com",
  projectId: "casket-with-memories-rn",
  storageBucket: "casket-with-memories-rn.appspot.com",
  messagingSenderId: "1598523207",
  appId: "1:1598523207:web:d40ee6a409332d60f1ee62",
  measurementId: "G-4ZB6W5PM2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getAuth();

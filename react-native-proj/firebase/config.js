import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAk7CLQUgMGmIYSkK9uGayKe-nmZ67vozA",
  authDomain: "casket-with-memories-rn.firebaseapp.com",
  projectId: "casket-with-memories-rn",
  storageBucket: "casket-with-memories-rn.appspot.com",
  messagingSenderId: "1598523207",
  appId: "1:1598523207:web:d40ee6a409332d60f1ee62",
  measurementId: "G-4ZB6W5PM2F",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

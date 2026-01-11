import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcbyXUonl5oy9q6Vi2hi8i7eOdjWx165U",
  authDomain: "thegroomingroom-ee47a.firebaseapp.com",
  projectId: "thegroomingroom-ee47a",
  storageBucket: "thegroomingroom-ee47a.firebasestorage.app",
  messagingSenderId: "72313877032",
  appId: "1:72313877032:web:516c49fb9632d0524abb1d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

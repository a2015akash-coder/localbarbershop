import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbIR3eBsJnG9QOhROdwiThK4JeAw7MLJw",
  authDomain: "barbershop-e57a8.firebaseapp.com",
  projectId: "barbershop-e57a8",
  storageBucket: "barbershop-e57a8.firebasestorage.app",
  messagingSenderId: "893284898174",
  appId: "1:893284898174:web:0776274172924acac60f2f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

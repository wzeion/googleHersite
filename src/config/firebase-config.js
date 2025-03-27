import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQRGZnwfIB8-Sl-IXo8TCrBwL929z0OSE",
  authDomain: "hersite-67676.firebaseapp.com",
  projectId: "hersite-67676",
  storageBucket: "hersite-67676.firebasestorage.app",
  messagingSenderId: "503426599070",
  appId: "1:503426599070:web:10e2ea0ade9985e082138f",
  measurementId: "G-CSMWEHV5TZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
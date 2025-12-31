
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Reemplaza estos valores con los de tu consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDDleUbC-p4TxGhpAuwF3wTz5RU_3QAUv4",
  authDomain: "asistente-luna-clinicdental.firebaseapp.com",
  projectId: "asistente-luna-clinicdental",
  storageBucket: "asistente-luna-clinicdental.firebasestorage.app",
  messagingSenderId: "1001523825600",
  appId: "1:1001523825600:web:e2c24f45a6a7bf324b1625"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

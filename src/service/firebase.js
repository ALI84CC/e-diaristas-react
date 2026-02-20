// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importante para o banco de dados
import { getStorage } from "firebase/storage";     // Importante para as fotos

const firebaseConfig = {
  apiKey: "AIzaSyCk-EULAdDoEkUkUADoh2mu8TmgbcuQ9b4",
  authDomain: "e-diarista.firebaseapp.com",
  projectId: "e-diarista",
  storageBucket: "e-diarista.firebasestorage.app",
  messagingSenderId: "983636253828",
  appId: "1:983636253828:web:a648cb3bae1e28557e76d1",
  measurementId: "G-D7YYMHBRTM"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exportamos as instâncias para usar nos outros arquivos
export const db = getFirestore(app);
export const storage = getStorage(app);
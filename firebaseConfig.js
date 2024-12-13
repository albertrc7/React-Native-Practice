import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5rm-hyPFsjgLLcoM0kjuu4TiDQRewHnU",
    authDomain: "poke-4cdbe.firebaseapp.com",
    projectId: "poke-4cdbe",
    storageBucket: "poke-4cdbe.appspot.com",
    messagingSenderId: "653227068828",
    appId: "1:653227068828:android:11684ab89de32dcc7f8c59", 
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);    

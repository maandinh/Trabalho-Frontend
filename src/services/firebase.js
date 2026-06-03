import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_t0PfTyk5y5gKTnUn89IL9jCbUE8DbTY",
  authDomain: "loja-online-c0494.firebaseapp.com",
  projectId: "loja-online-c0494",
  storageBucket: "loja-online-c0494.firebasestorage.app",
  messagingSenderId: "231354773148",
  appId: "1:231354773148:web:76cd1b1cd0e349f0388759"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
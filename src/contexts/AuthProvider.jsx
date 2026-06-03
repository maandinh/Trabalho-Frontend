import { useEffect, useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { auth, db } from "../services/firebase";
import { AuthContext } from "./AuthContext";

import { doc, setDoc } from "firebase/firestore";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, senha) {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  }

  async function cadastrar(nome, email, senha) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

    const user = userCredential.user;

    // salva dados extras no Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nome,
      email,
      criadoEm: new Date()
    });

    return user;
  }

  async function recuperarSenha(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function logout() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        cadastrar,
        recuperarSenha,
        logout,
        autenticado: !!usuario
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
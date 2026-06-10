import React, { useEffect, useState } from "react";

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
import { routemisrAuth } from "../services/api";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, senha) {
    console.log("Iniciando login Firebase:", { email });
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    console.log("Usuário Firebase logado:", user.uid);

    try {
      const token = await routemisrAuth.entrar(email, senha);
      console.log("Token Routemisr obtido:", token);
      // aqui você pode salvar esse token em contexto global ou no CartProvider
    } catch (error) {
      console.error("Erro ao logar na Routemisr:", error);
    }

    return user;
  }

  async function cadastrar(nome, email, senha) {
    console.log("Iniciando cadastro Firebase:", { nome, email });
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

    const user = userCredential.user;
    console.log("Usuário Firebase criado:", user.uid);

    // salva dados extras no Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nome,
      email,
      criadoEm: new Date()
    });
    console.log("Dados salvos no Firestore");

    try {
      const resposta = await routemisrAuth.cadastro(nome, email, senha);
      console.log("Usuário Routemisr criado:", resposta);
    } catch (error) {
      console.error("Erro ao criar usuário na Routemisr:", error);
    }

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
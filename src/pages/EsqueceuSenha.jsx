import "./EsqueceuSenha.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/useAuth"

export default function EsqueceuSenha() {
  const navigate = useNavigate();

  const { recuperarSenha } = useAuth();

  const [email, setEmail] = useState("");

  async function handleRecuperarSenha(e) {
    e.preventDefault();

    try {
      await recuperarSenha(email);

      alert(
        "Verifique seu Email para Redefinição. (obs: olhe o spam também)!"
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/user-not-found":
          alert("Usuário não encontrado.");
          break;

        case "auth/invalid-email":
          alert("Email inválido.");
          break;

        default:
          alert("Erro ao enviar email.");
      }
    }
  }

  return (
    <div className="esqueceu-senha-container">
      <form
        className="esqueceu-senha-form"
        onSubmit={handleRecuperarSenha}
      >
        <h1>ESQUECEU A SENHA?</h1>

        <p className="descricao">
          Digite seu email para receber
         <br />
         um link de recuperação.
      </p>

      <label>E-mail</label>

      <input
        type="email"
        placeholder=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

        <button type="submit">
          ENVIAR
        </button>

       <button
        type="button"
        onClick={() => navigate("/login")}
        >
          ← LOGIN
        </button>
      </form>
    </div>
  );
}
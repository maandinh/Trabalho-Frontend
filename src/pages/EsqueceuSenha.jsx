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
        "Enviamos um link para redefinição de senha."
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
        <h1>Recuperar Senha</h1>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <button type="submit">
          ENVIAR
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
        >
          CANCELAR
        </button>
      </form>
    </div>
  );
}
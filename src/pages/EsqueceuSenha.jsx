import "./EsqueceuSenha.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";

export default function EsqueceuSenha() {
  const navigate = useNavigate();

  const { recuperarSenha } = useAuth();

  const [email, setEmail] = useState("");

  const [modal, setModal] = useState({
    open: false,
    message: "",
  });

  async function handleRecuperarSenha(e) {
    e.preventDefault();

    try {
      await recuperarSenha(email);

      setModal({
        open: true,
        message:
          "Verifique seu e-mail para redefinição (e o spam também, porque o mundo é cruel).",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/user-not-found":
          setModal({
            open: true,
            message: "Usuário não encontrado.",
          });
          break;

        case "auth/invalid-email":
          setModal({
            open: true,
            message: "E-mail inválido.",
          });
          break;

        default:
          setModal({
            open: true,
            message: "Erro ao enviar email.",
          });
      }
    }
  }

  return (
    <div className="esqueceu-senha-container">
      <form className="esqueceu-senha-form" onSubmit={handleRecuperarSenha}>
        <h1>ESQUECEU A SENHA?</h1>

        <p className="descricao">
          Digite seu email para receber <br />
          um link de recuperação.
        </p>

        <label>E-mail</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">ENVIAR</button>

        <button type="button" onClick={() => navigate("/login")}>
          ← LOGIN
        </button>
      </form>

      {modal.open && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{modal.message}</p>

            <button onClick={() => setModal({ open: false, message: "" })}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import "./Login.css";
import logo from "../assets/logo.png";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({open: false, message: "",});
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setErroEmail("");
    setErroSenha("");

    let possuiErro = false;

    if (!email.trim()) {
      setErroEmail("O campo de email é obrigatório.");
      possuiErro = true;
    }

    if (!senha.trim()) {
      setErroSenha("O campo de senha é obrigatório.");
      possuiErro = true;
    }

    if (possuiErro) return;

    try {
      setLoading(true);

      await login(email, senha);

      navigate("/");
    } catch (error) {
      console.error(error);

switch (error.code) {
  case "auth/user-not-found":
  case "auth/invalid-credential":
    setModal({
      open: true,
      message: "E-mail ou senha incorretos.",
    });
    setEmail("");
    setSenha("");
    break;

     case "auth/wrong-password":
      setModal({
      open: true,
      message: "Senha incorreta.",
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
      message: "Erro ao fazer login.",
     });
}
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-login">
      <form onSubmit={handleLogin} className="form-login">
        <img src={logo} alt="Logo" className="logo-login" />

        <h1>ENTRAR</h1>

        <label>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {erroEmail && (
          <p className="mensagem-erro">{erroEmail}</p>
        )}

       <label htmlFor="senha">Senha </label>

        <div className="senha-container">
          <input
           id="senha"
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <span
            className="olhinho"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
          </span>
        </div>

        {erroSenha && (
          <p className="mensagem-erro">{erroSenha}</p>
        )}

        <Link to="/esqueceu-senha">
          Esqueci a Senha
        </Link>

        <button
          className="buton-login"
          type="submit"
          disabled={loading}
        >
          {loading ? "ENTRANDO..." : "ENTRAR"}
        </button>

        <button
          type="button"
          className="buton-cadastro"
          onClick={() => navigate("/cadastro")}
        >
          CRIAR CONTA
        </button>

        {modal.open && (
       <div className="modal-overlay">
       <div className="modal-box">
       <p>{modal.message}</p>

      <button
        onClick={() => setModal({ open: false, message: "" })}
      >
        OK
      </button>
    </div>
  </div>
)}
      </form>
    </div>
  );
}

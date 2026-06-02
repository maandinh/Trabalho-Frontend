import "./Login.css";
import logo from "../assets/logo.png";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../contexts/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await login(email, senha);

      navigate("/");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/user-not-found":
          alert("Usuário não encontrado");
          break;

        case "auth/wrong-password":
          alert("Senha incorreta");
          break;

        case "auth/invalid-email":
          alert("E-mail inválido");
          break;

        case "auth/invalid-credential":
          alert("E-mail ou senha incorretos");
          break;

        default:
          alert("Erro ao fazer login");
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

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="senha-container">
           <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
           onChange={(e) => setSenha(e.target.value)}
          />

            <span onClick={() => setMostrarSenha(!mostrarSenha)}>
            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>

        <Link to="/esqueceu-senha">
          Esqueci a Senha
        </Link>

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "ENTRAR"}
        </button>

    
        <button
       type="button"
       className="buton-cadastro"
       onClick={() => navigate("/cadastro")}
        >CRIAR CONTA
        </button>
      </form>
    </div>
  );
}
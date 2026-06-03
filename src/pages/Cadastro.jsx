import "./Cadastro.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { cadastrar } = useAuth();
  const navigate = useNavigate();

  async function handleCadastro(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await cadastrar(nome, email, senha);

      alert("Conta criada com sucesso!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          alert("E-mail já está em uso");
          break;

        case "auth/weak-password":
          alert("Senha muito fraca");
          break;

        case "auth/invalid-email":
          alert("E-mail inválido");
          break;

        default:
          alert("Erro ao criar conta");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-cadastro">
      <form onSubmit={handleCadastro} className="form-cadastro">
        <h1>CRIAR CONTA</h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "CRIANDO..." : "CRIAR CONTA"}
        </button>

        <Link to="/login">
          CANCELAR
        </Link>
      </form>
    </div>
  );
}
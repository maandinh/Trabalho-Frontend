import "./Cadastro.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    message: "",
  });

  const { cadastrar } = useAuth();
  const navigate = useNavigate();

  async function handleCadastro(e) {
    e.preventDefault();

    if (!nome.trim()) {
    setModal({
      open: true,
      message: "O nome é obrigatório.",
    });
    return;
  }

  if (!email.trim()) {
    setModal({
      open: true,
      message: "O e-mail é obrigatório.",
    });
    return;
  }

  if (!senha.trim()) {
    setModal({
      open: true,
      message: "A senha é obrigatória.",
    });
    return;
  }

    try {
      setLoading(true);

      await cadastrar(nome, email, senha);

      setModal({
        open: true,
        message: "Conta criada com sucesso!",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setModal({
            open: true,
            message: "E-mail já está em uso",
          });
          break;

        case "auth/weak-password":
          setModal({
            open: true,
            message: "Senha muito fraca",
          });
          break;

        case "auth/invalid-email":
          setModal({
            open: true,
            message: "E-mail inválido",
          });
          break;

        default:
          setModal({
            open: true,
            message: "Erro ao criar conta",
          });
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

        <Link to="/login">CANCELAR</Link>
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
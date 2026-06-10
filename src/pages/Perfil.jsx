import "./Perfil.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { FaUser } from "react-icons/fa";

import { updatePassword } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "../services/firebase";

function Perfil() {
  const { usuario, logout } = useAuth();

  const navigate = useNavigate();

  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    async function carregarDados() {
      if (!usuario) return;

      try {
        const referencia = doc(
          db,
          "usuarios",
          usuario.uid
        );

        const documento = await getDoc(referencia);

        if (documento.exists()) {
          const dados = documento.data();

          setEndereco(
            dados.endereco || ""
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    carregarDados();
  }, [usuario]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      if (senha.trim()) {
        await updatePassword(
          usuario,
          senha
        );
      }

      await updateDoc(
        doc(db, "usuarios", usuario.uid),
        {
          endereco
        }
      );

      alert(
        "Dados atualizados com sucesso!"
      );

      setSenha("");

    } catch (error) {
      console.error(error);

      alert(
        "Erro ao atualizar os dados."
      );
    }
  }

  async function handleLogout() {
    try {
      await logout();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="perfil-container">

      <section className="perfil-card">

        <header className="perfil-header">
          <h1>MEU PERFIL</h1>
        </header>

        <figure className="perfil-foto">
          <section className="avatar-circle">
            <FaUser />
          </section>
        </figure>

        <form
          className="perfil-form"
          onSubmit={handleSubmit}
        >

          <label htmlFor="email">
            E-mail
          </label>

          <input
            id="email"
            type="email"
            value={usuario?.email || ""}
            readOnly
          />

          <label htmlFor="senha">
            Nova Senha
          </label>

          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
            placeholder="Digite uma nova senha"
          />

          <label htmlFor="endereco">
            Endereço
          </label>

          <input
            id="endereco"
            type="text"
            value={endereco}
            onChange={(e) =>
              setEndereco(e.target.value)
            }
            placeholder="Digite seu endereço"
          />

          <button
            type="submit"
            className="btn-salvar"
          >
            SALVAR ALTERAÇÕES
          </button>

          <button
            type="button"
            className="btn-sair"
            onClick={handleLogout}
          >
            SAIR
          </button>

        </form>

      </section>

    </main>
  );
}

export default Perfil;
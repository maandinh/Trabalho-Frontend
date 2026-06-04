import "./Perfil.css";
import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { FaUser } from "react-icons/fa";

function Perfil() {
  const { usuario } = useAuth();

  const [endereco, setEndereco] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      email: usuario?.email,
      endereco
    });
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
            Senha
          </label>

          <input
            id="senha"
            type="password"
            value="12345678"
            readOnly
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

        </form>

      </section>
    </main>
  );
}

export default Perfil;
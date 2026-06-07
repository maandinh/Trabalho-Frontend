import "./Produtos.css";
import { useState } from "react";
import Carousel from "../components/Carousel";

function Produtos() {
  const [filtro, setFiltro] = useState("");

  return (
    <main className="produtos-container">

      <header className="produtos-header">
        <h1>PRODUTOS</h1>
      </header>

      <section className="filtro-container">

        <label htmlFor="filtro">
          FILTRO
        </label>

        <select
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="">
            FEMININO/MASCULINO
          </option>

          <option value="feminino">
            Feminino
          </option>

          <option value="masculino">
            Masculino
          </option>
        </select>

      </section>

      <section className="lista-carrosseis">
        <Carousel />
        <Carousel />
        <Carousel />
      </section>

    </main>
  );
}

export default Produtos;
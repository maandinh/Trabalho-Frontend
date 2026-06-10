import "./Produtos.css";
import { useEffect, useState } from "react";

import ProdutoCard from "../components/ProdutoCard";
import { produtoService } from "../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta =
          await produtoService.buscarTodos();

        setProdutos(resposta.data);
      } catch (erro) {
        console.error(erro);
      }
    }

    carregarProdutos();
  }, []);

  const produtosFiltrados =
  filtro === ""
    ? produtos
    : produtos.filter((produto) => {
        const categoria =
          produto.category?.name || "";

        if (filtro === "women") {
          return categoria === "Women's Fashion";
        }

        if (filtro === "men") {
          return categoria === "Men's Fashion";
        }

        return true;
      });

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
          onChange={(e) =>
            setFiltro(e.target.value)
          }
        >
          <option value="">
            Todos
          </option>

          <option value="women">
            Feminino
          </option>

          <option value="men">
            Masculino
          </option>
        </select>

      </section>

      <section className="produtos-grid">

        {produtosFiltrados.map((produto) => (
          <ProdutoCard
            key={produto._id}
            produto={produto}
          />
        ))}

      </section>

    </main>
  );
}

export default Produtos;
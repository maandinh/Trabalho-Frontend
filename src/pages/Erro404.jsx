import "./Erro404.css";

import { Link } from "react-router-dom";

export default function Erro404() {
  return (
    <div className="erro404-container">
      <h1>404</h1>

      <h2>Página não encontrada</h2>


      <Link to="/">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
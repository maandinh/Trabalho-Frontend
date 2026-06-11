import "./ProdutoCard.css";
import { useNavigate } from "react-router-dom";

function ProdutoCard({ produto }) {
  const navigate = useNavigate();

  function abrirProduto() {
    navigate(`/produto/${produto._id}`);
  }

  return (
    <article
      className="produto-card"
      onClick={abrirProduto}
    >
      <img
        src={produto.imageCover}
        alt={produto.title}
      />

      <h3>{produto.title}</h3>

      <p className="categoria">
        {produto.category?.name}
      </p>

      <strong>
        R$ {produto.price}
      </strong>
    </article>
  );
}

export default ProdutoCard;
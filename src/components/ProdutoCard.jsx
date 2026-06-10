import "./ProdutoCard.css";

function ProdutoCard({ produto }) {
  return (
    <article className="produto-card">
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
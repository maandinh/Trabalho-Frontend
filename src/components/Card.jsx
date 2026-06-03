import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { produtoService } from "../services/api";
import './Card.css'

function Card() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);

  useEffect(() => {
    async function carregarProduto() {
      const resposta = await produtoService.buscarPorId(id);

  setProduto(resposta.data);
    }

    carregarProduto();
  }, [id]);

if (!produto) {
  return <p>Carregando...</p>;
}

  return (

    <div className="CardProduto">

        <h1>{produto.title}</h1>

      <img className= 'imgProd'src={produto.imageCover} alt={produto.title} />

      <p className="descProd">{produto.description}</p>

        <p className="PrecoProd">R$ {produto.price}</p>
        

    </div>
  );
}

export default Card;
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { TbShoppingBag } from "react-icons/tb";
import './DetalhesProduto.css'
import Carousel from "../components/Carousel";
import { useCarrinho } from "../contexts/CartContext.jsx";
import { useState } from "react";

function DetalhesProduto() {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();
  const [mensagem, setMensagem] = useState("");

  const handleAdicionar = () => {
    adicionarAoCarrinho(id, 1);
    setMensagem("Produto adicionado ao carrinho!");
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <>
      <div className="detalheProd">
        <Card />

        <button className="btnProd" onClick={handleAdicionar}> <TbShoppingBag /> <br /> Adicionar </button>

        {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

      </div>

      <h2 className="textProd"> Você também pode gostar</h2>
      <div className="carousel">
        <Carousel />
      </div>
    </>


  );
}
export default DetalhesProduto;
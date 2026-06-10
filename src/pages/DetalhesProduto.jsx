import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { TbShoppingBag } from "react-icons/tb";
import './DetalhesProduto.css'
import Carousel from "../components/Carousel";
import { useCarrinho } from "../contexts/CartContext.jsx";

function DetalhesProduto() {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();

  return (
    <>
      <div className="detalheProd">
        <Card />

        <button className="btnProd" onClick={() => {console.log("Clicou em adicionar produto:", id); adicionarAoCarrinho(id, 1);}}> <TbShoppingBag /> <br /> Adicionar </button>

      </div>

      <h2 className="textProd"> Você também pode gostar</h2>
      <div className="carousel">
        <Carousel />
      </div>
    </>


  );
}
export default DetalhesProduto;
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { TbShoppingBag } from "react-icons/tb";
import './DetalhesProduto.css'
import Carousel from "../components/Carousel";

function DetalhesProduto() {


  return (
  <>  
    <div className="detalheProd">
      <Card/>

       <button className="btnProd"> <TbShoppingBag /> <br/> Adicionar </button>

</div>

<h2 className="textProd"> Você também pode gostar</h2>
<div className="carousel">
<Carousel/>
</div>
</>


  );
}
export default DetalhesProduto;
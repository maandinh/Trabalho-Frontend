import { useState, useEffect } from "react";
import "./Carousel.css";
import CarouselCard from "./CarouselCard";
import { GrNext, GrPrevious } from "react-icons/gr";
import { produtoService } from "../services/api";

function Carousel() {
  const [products, setProducts] = useState([]);
  const [inicio, setInicio] = useState(0);
  const [cardsVisiveis, setCardsVisiveis] = useState(3);


  useEffect(() => {
    async function carregarProdutos() {
      const resposta = await produtoService.buscarTodos();

      setProducts(resposta.data || resposta);
    }

    carregarProdutos();
  }, []);


  useEffect(() => {
    const verificarTela = () => {
      if (window.innerWidth >= 1024) {
        setCardsVisiveis(10);
      } else {
        setCardsVisiveis(3);
      }
    };

    verificarTela();

    window.addEventListener("resize", verificarTela);

    return () => {
      window.removeEventListener("resize", verificarTela);
    };
  }, []);


  const proximos = () => {
    if (inicio < products.length - cardsVisiveis) {
      setInicio(inicio + 1);
    }
  };

  const anteriores = () => {
    if (inicio > 0) {
      setInicio(inicio - 1);
    }
  };


  const produtosVisiveis = products.slice(
    inicio,
    inicio + cardsVisiveis
  );

  return (
    <div className="carousel">
      <button className="btnhome" onClick={anteriores}>
        <GrPrevious />
      </button>

      <div className="cards">
        {produtosVisiveis.map((produto) => (
          <CarouselCard
            key={produto.id}
            title={produto.title}
            image={produto.imageCover}
            price={produto.price}
          />
        ))}
      </div>

      <button className="btnhome" onClick={proximos}>
        <GrNext />
      </button>
    </div>
  );
}

export default Carousel;
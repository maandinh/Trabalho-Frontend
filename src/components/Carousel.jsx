import { useState } from "react"
import './Carousel.css'
import CarouselCard from "./CarouselCard"
import { GrNext, GrPrevious } from "react-icons/gr";
import blusa2 from '../assets/blusa2.jpg'

function Carousel() {

 const cards = [
  {
    id: 1,
    title: 'Blusa 1',
    image: blusa2
  },
  {
    id: 2,
    title: 'Blusa 2',
    image: 'https://picsum.photos/200/300?random=2'
  },
  {
    id: 3,
    title: 'Blusa 3',
    image: 'https://picsum.photos/200/300?random=3'
  },
  {
    id: 4,
    title: 'Blusa 4',
    image: 'https://picsum.photos/200/300?random=4'
  },
  {
    id: 5,
    title: 'Blusa 5',
    image: 'https://picsum.photos/200/300?random=5'
  }
]

  const [inicio, setInicio] = useState(0)

  const proximos = () => {
    if (inicio < cards.length - 3) {
      setInicio(inicio + 1)
    }
  }

  const anteriores = () => {
    if (inicio > 0) {
      setInicio(inicio - 1)
    }
  }

  return(
    <div className="carousel">

      <button onClick={anteriores}>
      <GrPrevious />
      </button>

      <div className="cards">

        {cards
          .slice(inicio, inicio + 3)
          .map((card) => (
            <CarouselCard
            image={card.image}
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
            />
        ))}

      </div>

      <button onClick={proximos}>
      <GrNext />
      </button>

    </div>
  )
}

export default Carousel;
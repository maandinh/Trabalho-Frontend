import './CarouselCard.css'
import imagem from '../assets/blusa.png'

function CarouselCard({ image, title }) {

  return(
    <div>
      <a>
        <img src= {imagem} alt="" />
      </a>

      <div>
        <a>
          <h5> Blusa </h5>
        </a>
      </div>
    </div>
  )
}

export default CarouselCard
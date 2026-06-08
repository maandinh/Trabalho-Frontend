import { Link } from 'react-router-dom'
import './CarouselCard.css'

function CarouselCard({id, title, image, price }) {

  return (
    <div className="card">
       <Link to={`/produto/${id}`}>
      <img src={image} alt={title} />

      <h5>{title}</h5>

      <h5>R$ {price}</h5>
      </Link>
    </div>
  )
}
export default CarouselCard
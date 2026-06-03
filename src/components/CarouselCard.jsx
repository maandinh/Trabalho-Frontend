import './CarouselCard.css'

function CarouselCard({ title, image, price }) {

  return (
    <div className="card">
      <img src={image} alt={title} />

      <h5>{title}</h5>

      <p>R$ {price}</p>
    </div>
  )
}
export default CarouselCard
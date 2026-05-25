import './CarouselCard.css'


function CarouselCard({ title, image }) {

  return(
    <div className="container">

      <img src={image} alt={title} />

      <h5>{title}</h5>

    </div>
  )
}

export default CarouselCard
import { useState } from "react"
import './Carousel.css'
import CarouselCard from "./CarouselCard"

function Carousel() {
    const cards = []

return(
 <section>
    <div className= "container">
        <button> Prev
        </button>
        <div>
            <ul>
                <li>
                </li>
                <li><CarouselCard/></li>
                <li><CarouselCard/></li>
                <li><CarouselCard/></li>
                <li><CarouselCard/></li>
                <li><CarouselCard/></li>
                <li><CarouselCard/></li>
            </ul>
        </div>
        <button> Next </button>
    </div>
 </section>
)
  }
  
  export default Carousel
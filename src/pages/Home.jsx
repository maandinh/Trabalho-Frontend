import Carousel from '../components/Carousel';
import imgHome from '../assets/img-home.jpg';
import Menu from '../components/Menu';
import './Home.css';

function Home() {
    return (
        <>
    <img className= 'HomeImg'src={imgHome}/>

    <h2 className='tituloHome'> PROMOÇÕES </h2>

    <Carousel/>

    <h2 className='tituloHome'> SUGESTÕES </h2>

    <Carousel/>
    </>
    )
}
export default Home;
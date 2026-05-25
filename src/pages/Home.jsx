import Carousel from '../components/Carousel';
import Menu from '../components/Menu';
import './Home.css';

function Home() {
    return (
        <>
    <img className= 'HomeImg'src={'https://picsum.photos/200/300?random=2'}/>

    <h2> PROMOÇÕES </h2>

    <Carousel/>

    <h2> SUGESTÕES </h2>

    <Carousel/>
    </>
    )
}
export default Home;
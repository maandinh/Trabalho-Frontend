import "./Menu.css";
import { Link, NavLink } from "react-router";

function Menu() {

  return (
    <>
      <ul>
        <li><NavLink to="/">Início</NavLink></li>
        <li><NavLink to={`/Produtos`}>Produtos</NavLink></li>
        <li><NavLink to="/Perfil">Perfil</NavLink></li>
        <li><Link to="/">Sair</Link></li>
      </ul>
    </>
  );
}

export default Menu;
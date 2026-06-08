import "./Menu.css";
import { Link, NavLink } from "react-router";

function Menu({ aberto, fecharMenu }) {
  return (
    <>
      {aberto && (
        <div className="overlay" onClick={fecharMenu}></div>
      )}

      <nav className={aberto ? "menu aberto" : "menu"}>

      <ul>
        <li><h1>MENU</h1></li>
        <li><NavLink to="/">INÍCIO</NavLink></li>
        <li><NavLink to={`/perfil`}>PERFIL</NavLink></li>
        <li><NavLink to="/produtos">PRODUTOS</NavLink></li>
        <li><Link to="/">SAIR</Link></li>
      </ul>

    </nav>
  </>
  );
}

export default Menu;
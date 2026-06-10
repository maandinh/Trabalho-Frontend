import "./Menu.css";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/useAuth";

function Menu({ aberto, fecharMenu }) {
  const { logout } = useAuth();
  const navegar = useNavigate();

  const handleLogout = async () => {
    await logout();
    navegar("/");
  };

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
        <li><NavLink to="/" onClick={handleLogout}>SAIR</NavLink></li>
      </ul>

    </nav>
  </>
  );
}

export default Menu;
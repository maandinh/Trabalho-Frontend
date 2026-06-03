import "./Header.css";
import { TbMenu2, TbShoppingBag, TbUser } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";

function Header() {

   const [menuAberto, setMenuAberto] = useState(false);
   
  return (
    <header>
     <button className="btnhome" onClick={() => setMenuAberto(!menuAberto)}><TbMenu2 /> </button>

  <Menu  aberto={menuAberto}  fecharMenu={() => setMenuAberto(false)}
  />
  

    <div className="icons">

     <button className="btnhome"> <NavLink to="/perfil"> <TbUser /> </NavLink> </button>
    <button className="btnhome"> <NavLink to="/carrinho"> <TbShoppingBag /> </NavLink> </button>

    </div>
    </header>
  )
}

export default Header;
import "./Header.css";
import { TbMenu2, TbShoppingBag, TbUser } from "react-icons/tb";

function Header() {
  return (
    <header>
     <button><TbMenu2 /> </button>

    <div className="right-icons">

     <button> <TbUser /> </button>
    <button> <TbShoppingBag /> </button>

    </div>
    </header>
  )
}

export default Header;
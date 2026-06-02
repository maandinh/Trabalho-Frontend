import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Layout from "./layouts/Layout"
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Produtos from "./pages/Produtos";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
       <Route path="/" element={<Layout />}> 

      <Route index element={<Home />} />

      <Route path="cadastro" element={<Cadastro/>} />

      <Route path="carrinho" element={<Carrinho />} />

      <Route path="checkout" element={<Checkout />} />

      <Route path="perfil" element={<Perfil />} />

      <Route path="produtos" element={<Produtos />} />

      <Route path="login" element={<Login />} /> 

    </Route>
    
    </Routes>
  );
}

export default App;
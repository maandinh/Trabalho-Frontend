import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Layout from "./layouts/Layout"
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
       <Route path="/" element={<Layout />}/> 
      <Route index element={<Home />} />
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/login" element={<Login />} />    
    
    </Routes>
  );
}

export default App;
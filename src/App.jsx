import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Layout from "./layouts/Layout"

function App() {
  return (
    <Routes>
       <Route path="/" element={<Layout />}/> 
      <Route index element={<Home />} />
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/carrinho" element={<Carrinho />} />  
    
    </Routes>
  );
}

export default App;
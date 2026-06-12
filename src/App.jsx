import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Cadastro from "./pages/Cadastro";
import Erro404 from "./pages/Erro404";
import Layout from "./layouts/Layout";
import useAuth from "./contexts/useAuth";
import DetalhesProduto from "./pages/DetalhesProduto";

function App() {

  const {autenticado} = useAuth();

  return (

    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="/carrinho"
          element={!autenticado ? <Navigate to="/login" /> : <Carrinho />}

        />

        <Route 
          path="/checkout"
          element={!autenticado ? <Navigate to="/login" /> : <Checkout />}
        />

       <Route 
          path="/perfil" 
          element={!autenticado ? <Navigate to="/login" /> : <Perfil />} 
       />

       <Route 
          path="/produtos" 
          element={<Produtos />}
     
       />
      

      <Route path="/produto/:id" element={<DetalhesProduto />} />
</Route>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/esqueceu-senha"
        element={<EsqueceuSenha />}
      />

      <Route
        path="/cadastro"
        element={<Cadastro />}
      />

       <Route path="*" element={<Erro404 />} />
    </Routes>
  
  );
}


export default App;
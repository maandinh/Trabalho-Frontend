import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Cadastro from "./pages/Cadastro";

import Layout from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="/carrinho"
          element={<Carrinho />}
        />

       <Route 
          path="perfil" 
          element={<Perfil />} 
       />

       <Route 
          path="produtos" 
          element={<Produtos />} 
       />
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
    </Routes>
  );
}

export default App;
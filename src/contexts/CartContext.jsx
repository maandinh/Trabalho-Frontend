import { createContext, useContext, useEffect, useState } from "react";
import { carrinhoService, routemisrAuth } from "../services/api";
import { useAuth } from "./useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { usuario } = useAuth();
  const [carrinho, setCarrinho] = useState([]);
  const [totalCarrinho, setTotalCarrinho] = useState(0);
  const [selecionados, setSelecionados] = useState([]);
  const [tokenRoutemisr, setTokenRoutemisr] = useState(null);

  const toggleSelecionado = (itemId) => {
    setSelecionados((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  useEffect(() => {
    const loginRoutemisr = async () => {
      try {
        console.log("Tentando login Routemisr com usuário fixo...");
        const token = await routemisrAuth.entrar("teste1@teste.com", "123456");
        console.log("Token Routemisr obtido:", token);
        setTokenRoutemisr(token);
        await carregarCarrinho(token);
      } catch (error) {
        console.error("Erro ao logar na Routemisr:", error);
      }
    };
    if (usuario) loginRoutemisr();
  }, [usuario]);

  const carregarCarrinho = async (token) => {
    if (!tokenRoutemisr && !token) return;
    try {
      const resposta = await carrinhoService.buscarCarrinho(token || tokenRoutemisr);
      console.log("Carrinho carregado:", resposta);
      setCarrinho(resposta.data.products || []);
      setTotalCarrinho(resposta.data.totalCartPrice || 0);
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  };

  const adicionarAoCarrinho = async (productId, quantidade) => {
    if (!tokenRoutemisr) return;
    try {
      console.log("Chamando adicionarAoCarrinho com:", productId, quantidade);
      const resposta = await carrinhoService.adicionarAoCarrinho(
        { productId, count: quantidade },
        tokenRoutemisr
      );
      console.log("Resposta adicionarAoCarrinho:", resposta);
      await carregarCarrinho();
    } catch (error) {
      console.error("Erro em adicionarAoCarrinho:", error);
      throw error;
    }
  };

  const removerDoCarrinho = async (itemId) => {
    if (!tokenRoutemisr) return;
    try {
      console.log("Chamando removerDoCarrinho com:", itemId);
      const resposta = await carrinhoService.removerDoCarrinho(itemId, tokenRoutemisr);
      console.log("Resposta removerDoCarrinho:", resposta);
      await carregarCarrinho();
      setSelecionados((prev) => prev.filter((id) => id !== itemId));
    } catch (error) {
      console.error("Erro em removerDoCarrinho:", error);
      throw error;
    }
  };

  const limparCarrinho = async () => {
    if (!tokenRoutemisr) return;
    try {
      console.log("Chamando limparCarrinho...");
      await carrinhoService.limparCarrinho(tokenRoutemisr);
      setCarrinho([]);
      setTotalCarrinho(0);
    } catch (error) {
      console.error("Erro em limparCarrinho:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        totalCarrinho,
        selecionados,
        toggleSelecionado,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCarrinho() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCarrinho deve ser usado com CartProvider");
  return context;
}

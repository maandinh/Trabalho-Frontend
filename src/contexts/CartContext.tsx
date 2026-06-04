import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { carrinhoService } from "../services/api";

interface CartContextProps {
  carrinho: any[];
  adicionarAoCarrinho: (productId: string, quantidade: number) => Promise<void>;
  removerDoCarrinho: (itemId: string) => Promise<void>;
  limparCarrinho: () => Promise<void>;
  totalCarrinho: number;
  selecionados: string[];
  toggleSelecionado: (itemId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartproviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartproviderProps> = ({ children }) => {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [totalCarrinho, setTotalCarrinho] = useState<number>(0);
  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggleSelecionado = (itemId: string) => {
    setSelecionados((prev) => prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]);
  };

  const tokenTeste =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTVjYjFkZmMzM2Q4MDAxMjEwNjMyZSIsIm5hbWUiOiJNYXJpYW5hIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3ODAzMzYzMDcsImV4cCI6MTc4ODExMjMwN30.36y75eGwqHeVXMu22EEPfwIzBOMg9-jy2FSILVf_gYo";

  useEffect(() => {
    const carregarCarrinho = async () => {
      try {
        const resposta = await carrinhoService.buscarCarrinho(tokenTeste);
        console.log("Resposta do carrinho:", resposta);
        // Ajuste: pega os produtos dentro de resposta.data
        setCarrinho(resposta.data.products || []);
        setTotalCarrinho(resposta.data.totalCartPrice || 0);
      } catch (error) {
        console.error("Erro ao buscar carrinho:", error);
      }
    };
    carregarCarrinho();
  }, []);

  const adicionarAoCarrinho = async (productId: string, quantidade: number) => {
    await carrinhoService.adicionarAoCarrinho({ productId, count: quantidade }, tokenTeste);
    const atualizado = await carrinhoService.buscarCarrinho(tokenTeste);
    setCarrinho(atualizado.data.products || []);
    setTotalCarrinho(atualizado.data.totalCartPrice || 0);
  };

  const removerDoCarrinho = async (itemId: string) => {
    await carrinhoService.removerDoCarrinho(itemId, tokenTeste);
    const atualizado = await carrinhoService.buscarCarrinho(tokenTeste);
    setCarrinho(atualizado.data.products || []);
    setTotalCarrinho(atualizado.data.totalCartPrice || 0);
    setSelecionados((prev) => prev.filter((id) => id !== itemId));
  };

  const limparCarrinho = async () => {
    await carrinhoService.limparCarrinho(tokenTeste);
    setCarrinho([]);
    setTotalCarrinho(0);
  };

  return (
    <CartContext.Provider
      value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, totalCarrinho, selecionados, toggleSelecionado }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCarrinho deve ser usado com CartProvider");
  return context;
};

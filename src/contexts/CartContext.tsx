import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { carrinhoService } from "../services/api";
import { useAuth } from "./useAuth";
import { User } from "firebase/auth";

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

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { usuario } = useAuth() as { usuario: User | null };
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [totalCarrinho, setTotalCarrinho] = useState<number>(0);
  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggleSelecionado = (itemId: string) => {
    setSelecionados((prev) => prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]);
  };

  useEffect(() => {
    const carregarCarrinho = async () => {
      if (!usuario) {
        return;
      }

      const token = await usuario.getIdToken();
      const resposta = await carrinhoService.buscarCarrinho(token);
      setCarrinho(resposta.data.products || []);
      setTotalCarrinho(resposta.data.totalCartPrice || 0);
    };
    carregarCarrinho();
  }, [usuario]);

  const adicionarAoCarrinho = async (productId: string, quantidade: number) => {
    if (!usuario) {
      return;
    }

    const token = await usuario.getIdToken();
    await carrinhoService.adicionarAoCarrinho({ productId, count: quantidade }, token );
    const atualizado = await carrinhoService.buscarCarrinho(token);
    setCarrinho(atualizado.data.products || []);
    setTotalCarrinho(atualizado.data.totalCartPrice || 0);
  };

  const removerDoCarrinho = async (itemId: string) => {
    if (!usuario) {
      return;
    }

    const token = await usuario.getIdToken();
    await carrinhoService.removerDoCarrinho(itemId, token);
    const atualizado = await carrinhoService.buscarCarrinho(token);
    setCarrinho(atualizado.data.products || []);
    setTotalCarrinho(atualizado.data.totalCartPrice || 0);
    setSelecionados((prev) => prev.filter((id) => id !== itemId));
  };

  const limparCarrinho = async () => {
    if (!usuario) {
      return;
    }
    const token = await usuario.getIdToken();
    await carrinhoService.limparCarrinho(token);
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

export function useCarrinho() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCarrinho deve ser usado com CartProvider");
  return context;
};

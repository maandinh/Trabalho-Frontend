import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Checkout from "../../pages/Checkout.jsx";
import * as useAuthHook from "../../contexts/useAuth";
import { vi } from "vitest";

vi.spyOn(useAuthHook, "useAuth").mockReturnValue({ usuario: { uid: "123" } });

vi.mock("../../contexts/CartContext.jsx", () => ({
  useCarrinho: vi.fn()
}));

import { useCarrinho } from "../../contexts/CartContext.jsx";

const itensSelecionados = [
  { _id: "1", product: { title: "Produto A" }, price: 100, count: 1 },
  { _id: "2", product: { title: "Produto B" }, price: 50, count: 2 },
];

describe("Página Checkout", () => {
  test("renderiza título CHECKOUT", () => {
    useCarrinho.mockReturnValue({ carrinho: [], selecionados: [] });
    render(<BrowserRouter><Checkout /></BrowserRouter>);
    expect(screen.getByText("CHECKOUT")).toBeInTheDocument();
  });

  test("renderiza seção de endereço", () => {
    useCarrinho.mockReturnValue({ carrinho: [], selecionados: [] });
    render(<BrowserRouter><Checkout /></BrowserRouter>);
    expect(screen.getByText("ENDEREÇO")).toBeInTheDocument();
  });

  test("renderiza resumo de pagamento com itens selecionados", () => {
    useCarrinho.mockReturnValue({
      carrinho: itensSelecionados,
      selecionados: ["1", "2"]
    });

    render(<BrowserRouter><Checkout /></BrowserRouter>);

    expect(screen.getByText(/^Total:/i)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/Frete/i)).toBeInTheDocument();
  });

  test("calcula total corretamente com frete", () => {
    useCarrinho.mockReturnValue({
      carrinho: itensSelecionados,
      selecionados: ["1", "2"]
    });

    render(<BrowserRouter><Checkout /></BrowserRouter>);

    expect(screen.getByText(/R\$\s*225/)).toBeInTheDocument();
  });

  test("lista os produtos selecionados", () => {
    useCarrinho.mockReturnValue({
      carrinho: itensSelecionados,
      selecionados: ["1", "2"]
    });

    render(<BrowserRouter><Checkout /></BrowserRouter>);

    expect(screen.getByText("Produto A")).toBeInTheDocument();
    expect(screen.getByText("Produto B")).toBeInTheDocument();
  });

  test("não lista produtos não selecionados", () => {
    useCarrinho.mockReturnValue({
      carrinho: itensSelecionados,
      selecionados: ["1"] 
    });

    render(<BrowserRouter><Checkout /></BrowserRouter>);

    expect(screen.getByText("Produto A")).toBeInTheDocument();
    expect(screen.queryByText("Produto B")).not.toBeInTheDocument();
  });

  test("abre modal Pix ao clicar em GERAR PIX", async () => {
    useCarrinho.mockReturnValue({ carrinho: [], selecionados: [] });
    const user = userEvent.setup();
    render(<BrowserRouter><Checkout /></BrowserRouter>);

    await user.click(screen.getByRole("button", { name: /gerar pix/i }));

    expect(screen.getByText(/pagamento via pix/i)).toBeInTheDocument();
  });

  test("fecha modal Pix ao clicar em Fechar", async () => {
    useCarrinho.mockReturnValue({ carrinho: [], selecionados: [] });
    const user = userEvent.setup();
    render(<BrowserRouter><Checkout /></BrowserRouter>);

    await user.click(screen.getByRole("button", { name: /gerar pix/i }));
    expect(screen.getByText(/pagamento via pix/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /fechar/i }));
    expect(screen.queryByText(/pagamento via pix/i)).not.toBeInTheDocument();
  });

  test("exibe botão VOLTAR À BAG", () => {
    useCarrinho.mockReturnValue({ carrinho: [], selecionados: [] });
    render(<BrowserRouter><Checkout /></BrowserRouter>);
    expect(screen.getByRole("button", { name: /voltar à bag/i })).toBeInTheDocument();
  });
});

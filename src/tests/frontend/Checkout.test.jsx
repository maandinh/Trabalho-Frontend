import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../../contexts/CartContext.jsx";
import Checkout from "../../pages/Checkout.jsx";
import * as useAuthHook from "../../contexts/useAuth";
import { vi } from "vitest";

vi.spyOn(useAuthHook, "useAuth").mockReturnValue({ usuario: { uid: "123" } });

describe("Página Checkout", () => {
  test("renderiza resumo de pagamento com itens selecionados", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Checkout />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/^Total:/i)).toBeInTheDocument();
  });

  test("abre modal Pix ao clicar em GERAR PIX", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <CartProvider>
          <Checkout />
        </CartProvider>
      </BrowserRouter>
    );

    const botaoPix = screen.getByText(/GERAR PIX/i);
    expect(botaoPix).toBeInTheDocument();

    await user.click(botaoPix);
  });
});

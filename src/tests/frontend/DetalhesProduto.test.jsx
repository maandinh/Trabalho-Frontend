import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetalhesProduto from "../../pages/DetalhesProduto.jsx";
import * as useAuthHook from "../../contexts/useAuth";
import { vi } from "vitest";

vi.spyOn(useAuthHook, "useAuth").mockReturnValue({
  usuario: { uid: "123", email: "teste@email.com" },
  login: vi.fn(),
  logout: vi.fn()
});

const adicionarAoCarrinhoMock = vi.fn();
vi.mock("../../contexts/CartContext.jsx", () => ({
  useCarrinho: () => ({ adicionarAoCarrinho: adicionarAoCarrinhoMock })
}));

vi.mock("../../components/Card", () => ({
  default: () => <div data-testid="card-mock">Card</div>
}));
vi.mock("../../components/Carousel", () => ({
  default: () => <div data-testid="carousel-mock">Carousel</div>
}));

const renderComRota = (id = "abc123") =>
  render(
    <MemoryRouter initialEntries={[`/produto/${id}`]}>
      <Routes>
        <Route path="/produto/:id" element={<DetalhesProduto />} />
      </Routes>
    </MemoryRouter>
  );

describe("Página DetalhesProduto", () => {
  test("renderiza o componente Card", () => {
    renderComRota();
    expect(screen.getByTestId("card-mock")).toBeInTheDocument();
  });

  test("renderiza o componente Carousel", () => {
    renderComRota();
    expect(screen.getByTestId("carousel-mock")).toBeInTheDocument();
  });

  test("renderiza botão Adicionar", () => {
    renderComRota();
    expect(screen.getByText(/Adicionar/i)).toBeInTheDocument();
  });

  test("mostra mensagem de sucesso ao adicionar produto", async () => {
    const user = userEvent.setup();
    renderComRota();

    await user.click(screen.getByText(/Adicionar/i));

    expect(adicionarAoCarrinhoMock).toHaveBeenCalled();
    expect(screen.getByText(/Produto adicionado ao carrinho!/i)).toBeInTheDocument();
  });

  test("chama adicionarAoCarrinho com o id correto", async () => {
    const user = userEvent.setup();
    renderComRota("xyz999");

    await user.click(screen.getByText(/Adicionar/i));

    expect(adicionarAoCarrinhoMock).toHaveBeenCalledWith("xyz999", 1);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ProdutoCard from "../../components/ProdutoCard";
import { vi } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

const produtoMock = {
  _id: "abc123",
  title: "Camiseta Teste",
  imageCover: "img.png",
  price: 99.9,
  category: { name: "Men's Fashion" },
};

describe("Componente ProdutoCard", () => {
  test("renderiza título, categoria e preço do produto", () => {
    render(<MemoryRouter><ProdutoCard produto={produtoMock} /></MemoryRouter>);

    expect(screen.getByText("Camiseta Teste")).toBeInTheDocument();
    expect(screen.getByText("Men's Fashion")).toBeInTheDocument();
    expect(screen.getByText(/99/)).toBeInTheDocument();
  });

  test("renderiza a imagem do produto", () => {
    render(<MemoryRouter><ProdutoCard produto={produtoMock} /></MemoryRouter>);
    const img = screen.getByAltText("Camiseta Teste");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "img.png");
  });

  test("navega para a página do produto ao clicar", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><ProdutoCard produto={produtoMock} /></MemoryRouter>);

    await user.click(screen.getByRole("article"));
    expect(mockNavigate).toHaveBeenCalledWith("/produto/abc123");
  });
});

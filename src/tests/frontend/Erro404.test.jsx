import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Erro404 from "../../pages/Erro404";

describe("Página Erro404", () => {
  test("renderiza o título 404", () => {
    render(<MemoryRouter><Erro404 /></MemoryRouter>);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  test("renderiza a mensagem de página não encontrada", () => {
    render(<MemoryRouter><Erro404 /></MemoryRouter>);
    expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument();
  });

  test("renderiza link para voltar à página inicial", () => {
    render(<MemoryRouter><Erro404 /></MemoryRouter>);
    const link = screen.getByRole("link", { name: /voltar para a página inicial/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});

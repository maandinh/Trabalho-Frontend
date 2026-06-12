import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Produtos from "../../pages/Produtos";
import { produtoService } from "../../services/api";
import userEvent from "@testing-library/user-event";

describe("Página Produtos", () => {
  test("renderiza o título da página", () => {
    render(
      <BrowserRouter>
        <Produtos />
      </BrowserRouter>
    );
    expect(screen.getByText("PRODUTOS")).toBeInTheDocument();
  });

  test("renderiza o filtro", () => {
    render(
      <BrowserRouter>
        <Produtos />
      </BrowserRouter>
    );

    expect(
      screen.getByLabelText(/filtro/i)
    ).toBeInTheDocument();
  });

  test("possui opção masculino", () => {
    render(
      <BrowserRouter>
        <Produtos />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("option", {
        name: /masculino/i
      })
    ).toBeInTheDocument();
  });

  test("possui opção feminino", () => {
    render(
      <BrowserRouter>
        <Produtos />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("option", {
        name: /feminino/i
      })
    ).toBeInTheDocument();
  });

  test("permite alterar filtro para feminino", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Produtos />
      </BrowserRouter>
    );

    const filtro =
      screen.getByRole("combobox");

    await user.selectOptions(
      filtro,
      "women"
    );

    expect(
      filtro
    ).toHaveValue("women");
  });

  test("carrega lista de produtos da API", async () => {
    vi.spyOn(produtoService, "buscarTodos").mockResolvedValue({
      data: [{ id: "1", title: "Produto Teste" }]
    });

    render(
      <BrowserRouter>
        <Produtos />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Produto Teste/i)).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Produtos from "../pages/Produtos";

describe("Página Produtos", () => {

  test("renderiza o título da página", () => {
    render(
      <BrowserRouter>
        <Produtos />
      </BrowserRouter>
    );

    expect(
      screen.getByText("PRODUTOS")
    ).toBeInTheDocument();
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
      "feminino"
    );

    expect(
      filtro
    ).toHaveValue("feminino");
  });

});
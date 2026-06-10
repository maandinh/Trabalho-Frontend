import { render, screen } from "@testing-library/react";
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

});
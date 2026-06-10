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
});

describe("Endpoint /produtos", () => {
  it("deve retornar lista de produtos", async () => {
    const res = await request(app).get("/produtos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve lidar com erro do banco", async () => {
    jest.spyOn(db, "query").mockRejectedValue(new Error("DB error"));
    const res = await request(app).get("/produtos");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("erro");
  });
});
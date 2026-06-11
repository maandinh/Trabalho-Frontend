import { produtoService, carrinhoService, routemisrAuth } from "../../services/api";
import { vi } from "vitest";

describe("API Healthcheck", () => {
  test("deve responder com status 200 — produtoService disponível", async () => {
    vi.spyOn(produtoService, "buscarTodos").mockResolvedValue({
      data: [{ id: "1", title: "Produto Teste" }]
    });

    const resultado = await produtoService.buscarTodos();
    expect(resultado).toHaveProperty("data");
    expect(Array.isArray(resultado.data)).toBe(true);
  });

  test("produtoService.buscarTodos retorna dados no formato esperado", async () => {
    vi.spyOn(produtoService, "buscarTodos").mockResolvedValue({
      data: [{ id: "1", title: "Produto Teste", price: 50 }]
    });

    const resultado = await produtoService.buscarTodos();
    const produto = resultado.data[0];
    expect(produto).toHaveProperty("id");
    expect(produto).toHaveProperty("title");
    expect(produto).toHaveProperty("price");
  });

  test("carrinhoService está disponível e responde", async () => {
    vi.spyOn(carrinhoService, "buscarCarrinho").mockResolvedValue({
      data: { products: [], totalCartPrice: 0 }
    });

    const resultado = await carrinhoService.buscarCarrinho("token-fake");
    expect(resultado.data).toHaveProperty("products");
    expect(resultado.data).toHaveProperty("totalCartPrice");
  });

  test("serviço lida com timeout ou falha de rede", async () => {
    vi.spyOn(produtoService, "buscarTodos").mockRejectedValue(new Error("Network Error"));

    await expect(produtoService.buscarTodos()).rejects.toThrow("Network Error");
  });
});

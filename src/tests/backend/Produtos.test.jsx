import { produtoService } from "../../services/api";
import { vi } from "vitest";

describe("Endpoint /produtos", () => {
  test("deve retornar lista de produtos", async () => {
    vi.spyOn(produtoService, "buscarTodos").mockResolvedValue({
      data: [{ id: "1", title: "Produto Teste" }]
    });

    const resultado = await produtoService.buscarTodos();
    expect(resultado.data).toHaveLength(1);
    expect(resultado.data[0]).toHaveProperty("title", "Produto Teste");
  });

  test("deve lidar com erro da API externa", async () => {
    vi.spyOn(produtoService, "buscarTodos").mockRejectedValue(new Error("API error"));

    await expect(produtoService.buscarTodos()).rejects.toThrow("API error");
  });

  test("deve retornar produto por id", async () => {
    vi.spyOn(produtoService, "buscarPorId").mockResolvedValue({
      data: { id: "1", title: "Produto Específico", price: 99 }
    });

    const resultado = await produtoService.buscarPorId("1");
    expect(resultado.data).toHaveProperty("title", "Produto Específico");
    expect(resultado.data).toHaveProperty("price", 99);
  });

  test("deve lidar com erro ao buscar produto por id inválido", async () => {
    vi.spyOn(produtoService, "buscarPorId").mockRejectedValue(new Error("Produto não encontrado"));

    await expect(produtoService.buscarPorId("id-invalido")).rejects.toThrow("Produto não encontrado");
  });

  test("deve retornar lista vazia quando não há produtos", async () => {
    vi.spyOn(produtoService, "buscarTodos").mockResolvedValue({ data: [] });

    const resultado = await produtoService.buscarTodos();
    expect(resultado.data).toHaveLength(0);
    expect(Array.isArray(resultado.data)).toBe(true);
  });

  test("deve retornar múltiplos produtos", async () => {
    vi.spyOn(produtoService, "buscarTodos").mockResolvedValue({
      data: [
        { id: "1", title: "Produto 1" },
        { id: "2", title: "Produto 2" },
        { id: "3", title: "Produto 3" },
      ]
    });

    const resultado = await produtoService.buscarTodos();
    expect(resultado.data).toHaveLength(3);
  });
});

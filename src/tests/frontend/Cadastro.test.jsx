import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Cadastro from "../../pages/Cadastro";
import * as useAuthHook from "../../contexts/useAuth";
import { vi } from "vitest";

const mockCadastrar = vi.fn();
vi.spyOn(useAuthHook, "useAuth").mockReturnValue({ cadastrar: mockCadastrar });

describe("Página Cadastro", () => {
  test("exibe modal de erro quando nome está vazio", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Cadastro /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");
    await user.type(screen.getByPlaceholderText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(screen.getByText("O nome é obrigatório.")).toBeInTheDocument();
  });

  test("exibe modal de erro quando email está vazio", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Cadastro /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText("Nome"), "Maria");
    await user.type(screen.getByPlaceholderText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(screen.getByText("O e-mail é obrigatório.")).toBeInTheDocument();
  });

  test("exibe modal de erro quando senha está vazia", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Cadastro /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText("Nome"), "Maria");
    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(screen.getByText("A senha é obrigatória.")).toBeInTheDocument();
  });

  test("exibe mensagem de sucesso ao criar conta", async () => {
    mockCadastrar.mockResolvedValue({});
    const user = userEvent.setup();
    render(<MemoryRouter><Cadastro /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText("Nome"), "Maria");
    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");
    await user.type(screen.getByPlaceholderText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(await screen.findByText("Conta criada com sucesso!")).toBeInTheDocument();
  });

  test("exibe erro quando email já está em uso", async () => {
    mockCadastrar.mockRejectedValue({ code: "auth/email-already-in-use" });
    const user = userEvent.setup();
    render(<MemoryRouter><Cadastro /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText("Nome"), "Maria");
    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");
    await user.type(screen.getByPlaceholderText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(await screen.findByText("E-mail já está em uso")).toBeInTheDocument();
  });

  test("exibe erro de senha fraca", async () => {
    mockCadastrar.mockRejectedValue({ code: "auth/weak-password" });
    const user = userEvent.setup();
    render(<MemoryRouter><Cadastro /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText("Nome"), "Maria");
    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");
    await user.type(screen.getByPlaceholderText("Senha"), "123");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(await screen.findByText("Senha muito fraca")).toBeInTheDocument();
  });

  test("fecha modal ao clicar em Fechar", async () => {
    mockCadastrar.mockRejectedValue({ code: "auth/weak-password" });
    const user = userEvent.setup();
    render(<MemoryRouter><Cadastro /></MemoryRouter>);

    await user.type(screen.getByPlaceholderText("Nome"), "Maria");
    await user.type(screen.getByPlaceholderText("E-mail"), "teste@email.com");
    await user.type(screen.getByPlaceholderText("Senha"), "123");
    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    await screen.findByText("Senha muito fraca");
    await user.click(screen.getByRole("button", { name: /fechar/i }));

    expect(screen.queryByText("Senha muito fraca")).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import EsqueceuSenha from "../../pages/EsqueceuSenha";
import * as useAuthHook from "../../contexts/useAuth";
import { vi } from "vitest";

const mockRecuperarSenha = vi.fn();
vi.spyOn(useAuthHook, "useAuth").mockReturnValue({ recuperarSenha: mockRecuperarSenha });

const getInputEmail = () => screen.getByRole("textbox", { type: "email" });

describe("Página EsqueceuSenha", () => {
  test("renderiza o formulário corretamente", () => {
    render(<MemoryRouter><EsqueceuSenha /></MemoryRouter>);

    expect(screen.getByText(/esqueceu a senha/i)).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  test("exibe modal de sucesso ao enviar email válido", async () => {
    mockRecuperarSenha.mockResolvedValue({});
    const user = userEvent.setup();
    render(<MemoryRouter><EsqueceuSenha /></MemoryRouter>);

    await user.type(getInputEmail(), "teste@email.com");
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(await screen.findByText(/verifique seu e-mail/i)).toBeInTheDocument();
  });

  test("exibe erro quando usuário não encontrado", async () => {
    mockRecuperarSenha.mockRejectedValue({ code: "auth/user-not-found" });
    const user = userEvent.setup();
    render(<MemoryRouter><EsqueceuSenha /></MemoryRouter>);

    await user.type(getInputEmail(), "naoexiste@email.com");
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(await screen.findByText("Usuário não encontrado.")).toBeInTheDocument();
  });

  test("exibe erro quando email é inválido", async () => {
    mockRecuperarSenha.mockRejectedValue({ code: "auth/invalid-email" });
    const user = userEvent.setup();
    render(<MemoryRouter><EsqueceuSenha /></MemoryRouter>);

    await user.type(getInputEmail(), "invalido@teste.com");
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(await screen.findByText("E-mail inválido.")).toBeInTheDocument();
  });

  test("fecha modal ao clicar em Fechar", async () => {
    mockRecuperarSenha.mockRejectedValue({ code: "auth/user-not-found" });
    const user = userEvent.setup();
    render(<MemoryRouter><EsqueceuSenha /></MemoryRouter>);

    await user.type(getInputEmail(), "naoexiste@email.com");
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await screen.findByText("Usuário não encontrado.");
    await user.click(screen.getByRole("button", { name: /fechar/i }));

    expect(screen.queryByText("Usuário não encontrado.")).not.toBeInTheDocument();
  });
});

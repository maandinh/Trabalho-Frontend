import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import Perfil from "../pages/Perfil";

describe("Página Perfil", () => {

  const renderPerfil = () => {
    const mockLogout = vi.fn();

    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            usuario: {
              uid: "123",
              email: "teste@email.com"
            },
            logout: mockLogout
          }}
        >
          <Perfil />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    return { mockLogout };
  };

  test("renderiza título do perfil", () => {
    renderPerfil();

    expect(
      screen.getByText("MEU PERFIL")
    ).toBeInTheDocument();
  });

  test("exibe o email do usuário logado", () => {
    renderPerfil();

    expect(
      screen.getByDisplayValue(
        "teste@email.com"
      )
    ).toBeInTheDocument();
  });

  test("permite alterar endereço", async () => {
    const user = userEvent.setup();

    renderPerfil();

    const input = screen.getByPlaceholderText(
      "Digite seu endereço"
    );

    await user.type(
      input,
      "Rua das Flores"
    );

    expect(input).toHaveValue(
      "Rua das Flores"
    );
  });

  test("permite alterar senha", async () => {
    const user = userEvent.setup();

    renderPerfil();

    const input = screen.getByPlaceholderText(
      "Digite uma nova senha"
    );

    await user.type(
      input,
      "12345678"
    );

    expect(input).toHaveValue(
      "12345678"
    );
  });

  test("renderiza botão salvar alterações", () => {
    renderPerfil();

    expect(
      screen.getByRole("button", {
        name: /salvar alterações/i
      })
    ).toBeInTheDocument();
  });

  test("renderiza botão sair", () => {
    renderPerfil();

    expect(
      screen.getByRole("button", {
        name: /sair/i
      })
    ).toBeInTheDocument();
  });

  test("chama logout ao clicar em sair", async () => {
    const user = userEvent.setup();

    const { mockLogout } = renderPerfil();

    await user.click(
      screen.getByRole("button", {
        name: /sair/i
      })
    );

    expect(
      mockLogout
    ).toHaveBeenCalled();
  });

});
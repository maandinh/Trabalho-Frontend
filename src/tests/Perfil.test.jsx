import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import Perfil from "../pages/Perfil";

describe("Página Perfil", () => {
  test("renderiza título do perfil", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            usuario: {
              uid: "123",
              email: "teste@email.com"
            },
            logout: vi.fn()
          }}
        >
          <Perfil />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(
      screen.getByText("MEU PERFIL")
    ).toBeInTheDocument();
  });
});
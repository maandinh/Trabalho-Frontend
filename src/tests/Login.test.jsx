import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { vi } from "vitest";

vi.mock("../contexts/useAuth", () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}));


describe("Login", () => {
    test("mostra erro quando email está vazio", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const senha = screen.getByLabelText(/senha/i);

  await user.type(senha, "123456");

  await user.click(
    screen.getByRole("button", {
      name: /entrar/i,
    })
  );

  expect(
    screen.getByText(
      "O campo de email é obrigatório."
    )
  ).toBeInTheDocument();
});

test("mostra erro quando senha está vazia", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const email = screen.getByLabelText(/e-mail/i);

  await user.type(
    email,
    "teste@email.com"
  );

  await user.click(
    screen.getByRole("button", {
      name: /entrar/i,
    })
  );

  expect(
    screen.getByText(
      "O campo de senha é obrigatório."
    )
  ).toBeInTheDocument();
});

}
)
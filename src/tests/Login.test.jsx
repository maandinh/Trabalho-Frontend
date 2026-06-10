import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

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



}
)
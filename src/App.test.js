import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the name as the page heading", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /akash kumar barnwal/i })
  ).toBeInTheDocument();
});

test("renders every navigation section anchor target", () => {
  const { container } = render(<App />);
  ["about", "projects", "capabilities", "education", "contact"].forEach((id) => {
    expect(container.querySelector(`#${id}`)).not.toBeNull();
  });
});

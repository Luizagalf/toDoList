import { fireEvent, render, screen } from "@testing-library/react";
import { act, Simulate } from "react-dom/test-utils";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);

  const title = screen.getByText(/To Do List/i);
  expect(title).toBeInTheDocument();
});

test("add a new task", async () => {
  render(<App />);

  act(() => {
    Simulate.click(screen.getByText("Add new note"));
  });

  const input = screen.getByPlaceholderText("Header");
  fireEvent.change(input, { target: { value: "Title" } });
  const input2 = screen.getByPlaceholderText("Description");
  fireEvent.change(input2, { target: { value: "Description" } });

  act(() => {
    Simulate.submit(screen.getByText("Add"));
  });

  await screen.findByText("Title");
  await screen.findByText("Description");

  expect(
    screen.queryByTestId<HTMLInputElement>("form-input-Header")
  ).toBeNull();
  expect(
    screen.queryByTestId<HTMLInputElement>("form-input-Description")
  ).toBeNull();

  expect(screen.getByText("Title")).toBeDefined();
  expect(screen.getByText("Description")).toBeDefined();
});

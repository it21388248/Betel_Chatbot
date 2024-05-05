import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", async () => {
  render(<App />);

  // Use findByText for asynchronous rendering
  const linkElement = await screen.findByText(/learn react/i);

  // Check if the element is in the document
  expect(linkElement).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Mock store for testing
import App from "./App";

const mockStore = configureStore([]);

test("renders Item Search App heading", () => {
  const store = mockStore({
    // mock your store state here
    items: [],
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Update the text to match the current content of the component
  const headingElement = screen.getByText(/search your favourite city/i);
  expect(headingElement).toBeInTheDocument();
});

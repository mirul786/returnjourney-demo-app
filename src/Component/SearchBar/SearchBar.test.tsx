import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchBar from "./SearchBar";
import { setSearchTerm } from "../../redux/itemSlice";
import { useDebounce } from "../ConstantFunction/ConstantFunction";

// Mock the debounce function
jest.mock("../ConstantFunction/ConstantFunction", () => ({
  useDebounce: jest.fn((value) => value),
}));

// Initialize a mock store
const mockStore = configureStore([]);
const store = mockStore({
  items: { searchTerm: "" },
});

describe("SearchBar Component", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("should render search input with placeholder", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Search items...");
    expect(inputElement).toBeInTheDocument();
  });

  it("should dispatch setSearchTerm with the debounced value", () => {
    // Mock the debounced value
    (useDebounce as jest.Mock).mockReturnValueOnce("Apple");

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Search items...");

    // Simulate typing into the input field
    fireEvent.change(inputElement, { target: { value: "Apple" } });

    // Wait for debounce
    expect(useDebounce).toHaveBeenCalledWith("Apple", 1000);

    const actions = store.getActions();
    expect(actions).toContainEqual(setSearchTerm("Apple"));
  });

  it("should update the input value when typing", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("Search items...");

    // Simulate typing into the input field
    fireEvent.change(inputElement, { target: { value: "Banana" } });

    expect(inputElement).toHaveValue("Banana");
  });
});

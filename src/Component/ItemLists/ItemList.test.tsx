import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ItemList from "./ItemLists";
import { setCurrentPage } from "../../redux/itemSlice";

// Create a mock store
const mockStore = configureStore([]);
jest.mock("../../redux/itemSlice", () => ({
  setCurrentPage: jest.fn(),
}));

describe("ItemList Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      items: {
        items: [
          { id: 1, city: "Mumbai" },
          { id: 2, city: "Agra" },
          { id: 3, city: "Delhi" },
          { id: 4, city: "Pune" },
        ],
        searchTerm: "",
        currentPage: 1,
        itemsPerPage: 2,
      },
    });

    store.dispatch = jest.fn(); // Mock dispatch function
  });

  it("should render a list of items from the store", () => {
    render(
      <Provider store={store}>
        <ItemList />
      </Provider>
    );

    // Check if paginated items are rendered
    expect(screen.getByText(/Mumbai/i)).toBeInTheDocument();
    expect(screen.getByText(/Agra/i)).toBeInTheDocument();

    // Ensure pagination buttons are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should handle pagination correctly", () => {
    render(
      <Provider store={store}>
        <ItemList />
      </Provider>
    );

    // Simulate clicking on page 2
    fireEvent.click(screen.getByText("2"));

    // Manually update the mock store state to simulate page change
    store = mockStore({
      items: {
        items: [
          { id: 1, city: "Mumbai" },
          { id: 2, city: "Agra" },
          { id: 3, city: "Delhi" },
          { id: 4, city: "Pune" },
        ],
        searchTerm: "",
        currentPage: 2,
        itemsPerPage: 2,
      },
    });

    // Re-render with the updated store state
    render(
      <Provider store={store}>
        <ItemList />
      </Provider>
    );

    // Expect the second page (Delhi and Pune) to be shown
    expect(screen.getByText(/Delhi/i)).toBeInTheDocument();
    expect(screen.getByText(/Pune/i)).toBeInTheDocument();
  });
});

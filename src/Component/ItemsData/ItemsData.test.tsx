import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { setItems } from "../../redux/itemSlice";
import LoadItems from "./ItemsData";

// Mock the store
const mockStore = configureStore([]);
const store = mockStore({ items: { items: [], searchTerm: "" } });

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, city: "Mumbai" }]),
  })
) as jest.Mock;

describe("LoadItems Component", () => {
  it("should display loading message initially", () => {
    render(
      <Provider store={store}>
        <LoadItems />
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should dispatch setItems with fetched data", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <LoadItems />
        </Provider>
      );
    });

    // Wait for the component to finish loading
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const actions = store.getActions();
    const expectedAction = setItems([{ id: 1, city: "Mumbai" }]);

    expect(actions).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedAction)])
    );
  });

  it("should handle error state", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch"))
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <LoadItems />
        </Provider>
      );
    });

    // Wait for error to appear (if you handle it in the UI)
    await waitFor(() =>
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
    );
  });
});

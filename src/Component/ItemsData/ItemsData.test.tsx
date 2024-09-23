import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { setItems } from "../../redux/itemSlice";
import { MockItems } from "../MockItems/MockItems";
import LoadItems from "./ItemsData";

// Mock the store
const mockStore = configureStore([]);
const store = mockStore({ items: { items: [], searchTerm: "" } });

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, city: "Mumbai" },
        { id: 2, city: "Delhi" },
        { id: 3, city: "Bengaluru" },
        // Add more mock data if needed
      ]),
  })
) as jest.Mock;

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

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

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const actions = store.getActions();
    const expectedAction = setItems([
      { city: "Mumbai", id: 1 },
      { city: "Delhi", id: 2 },
      { city: "Bengaluru", id: 3 },
      { city: "Hyderabad", id: 4 },
      { city: "Ahmedabad", id: 5 },
      { city: "Chennai", id: 6 },
      { city: "Kolkata", id: 7 },
      { city: "Surat", id: 8 },
      { city: "Pune", id: 9 },
      { city: "Jaipur", id: 10 },
      { city: "Lucknow", id: 11 },
      { city: "Kanpur", id: 12 },
      { city: "Nagpur", id: 13 },
      { city: "Ghaziabad", id: 14 },
      { city: "Indore", id: 15 },
      { city: "Coimbatore", id: 16 },
      { city: "Kochi", id: 17 },
      { city: "Patna", id: 18 },
      { city: "Bhopal", id: 19 },
      { city: "Thane", id: 20 },
      { city: "Visakhapatnam", id: 21 },
      { city: "Vadodara", id: 22 },
      { city: "Ludhiana", id: 23 },
      { city: "Agra", id: 24 },
      { city: "Nashik", id: 25 },
      { city: "Faridabad", id: 26 },
      { city: "Meerut", id: 27 },
      { city: "Rajkot", id: 28 },
      { city: "Varanasi", id: 29 },
      { city: "Srinagar", id: 30 },
      { city: "Amritsar", id: 31 },
      { city: "Allahabad", id: 32 },
      { city: "Ranchi", id: 33 },
      { city: "Howrah", id: 34 },
      { city: "Coonoor", id: 35 },
      { city: "Jodhpur", id: 36 },
      { city: "Madurai", id: 37 },
      { city: "Gwalior", id: 38 },
      { city: "Jabalpur", id: 39 },
      { city: "Raipur", id: 40 },
      { city: "Chandigarh", id: 41 },
      { city: "Guwahati", id: 42 },
      { city: "Solapur", id: 43 },
      { city: "Cuttack", id: 44 },
      { city: "Bhubaneswar", id: 45 },
      { city: "Jamnagar", id: 46 },
      { city: "Gurgaon", id: 47 },
      { city: "Mysuru", id: 48 },
      { city: "Tiruchirappalli", id: 49 },
      { city: "Kolhapur", id: 50 },
    ]);

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

    await waitFor(() =>
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
    );

    const actions = store.getActions();
    const expectedAction = setItems(MockItems); // Ensure MockItems is defined

    expect(actions).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedAction)])
    );
  });
});

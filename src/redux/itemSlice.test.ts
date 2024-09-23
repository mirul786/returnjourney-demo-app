import itemReducer, { setItems, setSearchTerm, ItemState } from "./itemSlice";

describe("itemSlice", () => {
  const initialState: ItemState = {
    items: [],
    searchTerm: "",
    currentPage: 1, // matching the actual reducer's default
    itemsPerPage: 5, // matching the actual reducer's default
  };

  it("should handle initial state", () => {
    expect(itemReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setItems", () => {
    const mockItems = [{ id: 1, city: "Mumbai" }];
    const action = setItems(mockItems);
    const newState = itemReducer(initialState, action);

    expect(newState.items).toEqual(mockItems);
  });

  it("should handle setSearchTerm", () => {
    const action = setSearchTerm("Agra");
    const newState = itemReducer(initialState, action);

    expect(newState.searchTerm).toEqual("Agra");
  });
});

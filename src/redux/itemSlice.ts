import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: number;
  name: string;
}

interface ItemState {
  items: Item[];
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ItemState = {
  items: [],
  searchTerm: "",
  currentPage: 1, // Starting from page 1
  itemsPerPage: 5, // I am displaying 5 items per page (it can be adjusted)
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to the first page when search term changes
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});


export const { setItems, setSearchTerm, setCurrentPage } = itemSlice.actions;
export default itemSlice.reducer;

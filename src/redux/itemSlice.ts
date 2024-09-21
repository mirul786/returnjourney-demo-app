import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: number;
  name: string;
}

interface ItemState {
  items: Item[];
  searchTerm: string;
}

const initialState: ItemState = {
  items: [],
  searchTerm: "",
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
    },
  },
});

export const { setItems, setSearchTerm } = itemSlice.actions;
export default itemSlice.reducer;

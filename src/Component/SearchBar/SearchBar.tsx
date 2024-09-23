import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/itemSlice";
import { RootState } from "../../redux/store";
import { useDebounce } from "../ConstantFunction/ConstantFunction";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.items.searchTerm);
  const [inputValue, setInputValue] = useState(searchTerm);

  // Use the debounce hook to debounce the search term
  const debouncedSearchTerm = useDebounce(inputValue, 1000); // 1 seconds delay

  // Dispatch the debounced value
  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search City"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default SearchBar;

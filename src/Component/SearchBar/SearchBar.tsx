import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/itemSlice";
import { AppDispatch } from "../../redux/store";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search items..."
      onChange={handleSearchChange}
    />
  );
};

export default React.memo(SearchBar);

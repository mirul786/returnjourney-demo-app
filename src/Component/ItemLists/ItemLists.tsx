import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setCurrentPage } from "../../redux/itemSlice";
import Item from "../Items/Item";
import './ItemLists.css'

const ItemList: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);
  const searchTerm = useSelector((state: RootState) => state.items.searchTerm);
  const currentPage = useSelector(
    (state: RootState) => state.items.currentPage
  );
  const itemsPerPage = useSelector(
    (state: RootState) => state.items.itemsPerPage
  );

  // Filter the items based on the search term
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item?.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Calculate the indices for slicing the items array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the items for the current page
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(setCurrentPage(newPage));
    },
    [dispatch]
  );

  return (
    <div>
      <ul>
        {paginatedItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ItemList);

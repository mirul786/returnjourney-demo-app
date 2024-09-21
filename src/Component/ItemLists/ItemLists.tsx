import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Item from "../Items/Item";

const ItemList: React.FC = () => {
  const { items, searchTerm } = useSelector((state: RootState) => state.items);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul>
      {filteredItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default React.memo(ItemList);

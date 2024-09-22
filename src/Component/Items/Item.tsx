import React from "react";

interface ItemProps {
  item: { id: number; city: string };
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return <li>{item.city}</li>;
};

export default React.memo(Item);

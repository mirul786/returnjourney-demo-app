import React from "react";

interface ItemProps {
  item: { id: number; name: string };
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return <li>{item.name}</li>;
};

export default React.memo(Item);

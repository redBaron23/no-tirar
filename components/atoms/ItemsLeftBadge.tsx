import React from "react";

interface Props {
  itemsLeft: number;
}

const ItemsLeftBadge = ({ itemsLeft }: Props) => {
  return (
    <div className="w-20 rounded-full bg-yellow-300 py-1 text-center text-sm font-semibold text-yellow-700">
      {itemsLeft} left
    </div>
  );
};

export default ItemsLeftBadge;

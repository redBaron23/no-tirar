"use client";

import React from "react";

interface Props {
  price: number;
  originalPrice: number;
}

const PriceDisplay = ({ price, originalPrice }: Props) => {
  return (
    <div className="mb-2 flex flex-col items-center text-gray-500">
      <span className="mb-1 text-sm line-through">
        ${originalPrice.toFixed(2)}
      </span>
      <span className="text-lg font-semibold text-green-600">
        ${price.toFixed(2)}
      </span>
    </div>
  );
};

export default PriceDisplay;

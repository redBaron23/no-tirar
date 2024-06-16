"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  maxQuantity?: number;
  onChange: (newQuantity: number) => void;
}

export default function Counter({ onChange, maxQuantity = 100 }: CounterProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    onChange(quantity);
  }, [quantity, onChange]);

  return (
    <div className="flex w-32 items-center justify-between rounded-full border border-gray-200 px-4 text-black">
      <button
        type="button"
        onClick={handleDecrement}
        className={`${
          quantity === 1 ? "cursor-not-allowed opacity-50" : ""
        } size-10 leading-10 text-gray-600 transition hover:opacity-75`}
        disabled={quantity === 1}
      >
        &minus;
      </button>

      <input
        type="number"
        id="Quantity"
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 1;
          setQuantity(value > maxQuantity ? maxQuantity : value);
        }}
        className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={handleIncrement}
        className={`${
          quantity === maxQuantity ? "cursor-not-allowed opacity-50" : ""
        } size-10 leading-10 text-gray-600 transition hover:opacity-75`}
        disabled={quantity === maxQuantity}
      >
        +
      </button>
    </div>
  );
}

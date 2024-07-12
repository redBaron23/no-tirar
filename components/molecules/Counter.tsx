"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useEffect, useState } from "react";

interface CounterProps extends InputHTMLAttributes<HTMLInputElement> {
  maxQuantity?: number;
  minQuantity?: number;
  onChangeQuantity: (newQuantity: number) => void;
  quantity: number;
  borderRadius?: string;
}

export default function Counter({
  quantity,
  onChangeQuantity,
  maxQuantity = 100,
  minQuantity = 0,
  borderRadius = "rounded-md",
  ...inputProps
}: CounterProps) {
  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onChangeQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      onChangeQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(
        Math.max(numValue, minQuantity),
        maxQuantity,
      );
      onChangeQuantity(clampedValue);
    }
  };

  const handleBlur = () => {
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue)) {
      setInputValue(quantity.toString());
    } else {
      const clampedValue = Math.min(
        Math.max(numValue, minQuantity),
        maxQuantity,
      );
      setInputValue(clampedValue.toString());
      onChangeQuantity(clampedValue);
    }
  };

  return (
    <div
      className={cn(
        "flex w-32 items-center justify-between border border-gray-200 px-4 text-black",
        borderRadius,
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        className={cn(
          "size-10 leading-10 text-gray-600 transition hover:opacity-75",
          {
            "cursor-not-allowed opacity-50": quantity <= minQuantity,
          },
        )}
        disabled={quantity <= minQuantity}
      >
        &minus;
      </button>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="h-10 w-16 border-transparent text-center sm:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {...inputProps}
      />

      <button
        type="button"
        onClick={handleIncrement}
        className={cn(
          "size-10 leading-10 text-gray-600 transition hover:opacity-75",
          {
            "cursor-not-allowed opacity-50": quantity >= maxQuantity,
          },
        )}
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
}

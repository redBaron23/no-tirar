"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface CounterProps extends InputHTMLAttributes<HTMLInputElement> {
  maxQuantity?: number;
  onChangeQuantity: (newQuantity: number) => void;
  quantity: number;
  borderRadius?: string; // New prop for customizable border radius
}

export default function Counter({
  quantity,
  onChangeQuantity,
  maxQuantity = 100,
  borderRadius = "rounded-md", // Default border radius
  ...inputProps // Spread the remaining input props
}: CounterProps) {
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onChangeQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onChangeQuantity(quantity - 1);
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseInt(e.target.value) || 1;
    onChangeQuantity(value > maxQuantity ? maxQuantity : value);
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
            "cursor-not-allowed opacity-50": quantity === 1,
          },
        )}
        disabled={quantity === 1}
      >
        &minus;
      </button>

      <input
        type="number"
        id="Quantity"
        value={quantity}
        onChange={handleInputChange}
        className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        {...inputProps}
      />

      <button
        type="button"
        onClick={handleIncrement}
        className={cn(
          "size-10 leading-10 text-gray-600 transition hover:opacity-75",
          {
            "cursor-not-allowed opacity-50": quantity === maxQuantity,
          },
        )}
        disabled={quantity === maxQuantity}
      >
        +
      </button>
    </div>
  );
}

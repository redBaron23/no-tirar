"use client";
import { InputHTMLAttributes, useReducer } from "react";
import { Input } from "../ui/input"; // Shadcn UI Input

type Props = {
  name: string;
  placeholder: string;
  value: number;
  onChange: (newValue: number) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const moneyFormatter = Intl.NumberFormat("es-AR", {
  currency: "ARS",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function MoneyInput({
  name,
  placeholder,
  value,
  onChange,
}: Props) {
  const initialValue = value
    ? moneyFormatter.format(value)
    : moneyFormatter.format(0);

  const [formattedValue, setFormattedValue] = useReducer(
    (_: any, next: string) => {
      const digits = next.replace(/\D/g, "");
      return moneyFormatter.format(Number(digits) / 100);
    },
    initialValue,
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setFormattedValue(newValue);
    const digits = newValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    onChange(realValue);
  }

  return (
    <div className="form-item">
      <div className="form-control">
        <Input
          placeholder={placeholder}
          name={name}
          type="text"
          value={formattedValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

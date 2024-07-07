"use client";
import { useReducer } from "react";
import { Control, useController } from "react-hook-form";
import { Input } from "../ui/input"; // Shadcn UI Input

type MoneyInputProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
};

// Argentine currency config
const moneyFormatter = Intl.NumberFormat("es-AR", {
  currency: "ARS",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function MoneyInput({
  control,
  name,
  label,
  placeholder,
}: MoneyInputProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

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
      <label className="form-label">{label}</label>
      <div className="form-control">
        <Input
          placeholder={placeholder}
          type="text"
          value={formattedValue}
          onChange={handleChange}
        />
      </div>
      {error && <div className="form-message">{error.message as string}</div>}
    </div>
  );
}

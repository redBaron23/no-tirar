"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import MoneyInput from "../atoms/MoneyInput";
import { Controller, Control } from "react-hook-form";
import Counter from "../molecules/Counter"; // Assuming Counter is in the same directory
import { cx } from "class-variance-authority";

interface ProductInfoForm {
  productType: string;
  startTime: string;
  endTime: string;
  quantity: number;
  price: number;
}

interface Props {
  hide: boolean;
  control: Control<ProductInfoForm>;
}

const ProductInfoStep = ({ hide, control }: Props) => {
  return (
    <div
      className={cx(
        hide && "hidden",
        "my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600",
      )}
    >
      <div className="grid w-full grid-cols-1 gap-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="product-type">
              Tipo de Producto
            </Label>
            <Select disabled>
              <SelectTrigger id="product-type" className="w-full">
                <SelectValue placeholder="Bandeja Sorpresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="bandeja-sorpresa">
                    Bandeja Sorpresa
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="time-range">
              Franja horaria de pickup
            </Label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <Input
                    id="start-time"
                    placeholder="Hora de Inicio"
                    type="time"
                    {...field}
                  />
                )}
              />
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <Input
                    id="end-time"
                    placeholder="Hora de Fin"
                    type="time"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="quantity">
              Cantidad
            </Label>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Counter
                  quantity={field.value}
                  onChangeQuantity={(newQuantity) =>
                    field.onChange(newQuantity)
                  }
                  maxQuantity={100}
                  borderRadius="rounded-md"
                />
              )}
            />
          </div>
          <div className="grid gap-2">
            <MoneyInput
              control={control}
              name="price"
              label="Precio por producto"
              placeholder="Ingresa el precio"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoStep;

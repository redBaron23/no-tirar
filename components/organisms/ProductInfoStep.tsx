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
import { useForm, UseFormReturn } from "react-hook-form";
import Counter from "../molecules/Counter"; // Assuming Counter is in the same directory
import { useState } from "react";

interface ProductInfoForm {
  productType: string;
  startTime: string;
  endTime: string;
  quantity: number;
  price: number;
}

const ProductInfoStep: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const form: UseFormReturn<ProductInfoForm> = useForm<ProductInfoForm>({
    defaultValues: {
      productType: "bandeja-sorpresa",
      startTime: "",
      endTime: "",
      quantity: 1,
      price: 0,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: ProductInfoForm) => {
    console.log(data);
  };

  return (
    <form
      className="bg-secondary my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border p-4 text-gray-600"
      onSubmit={handleSubmit(onSubmit)}
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
              <Input
                id="start-time"
                placeholder="Hora de Inicio"
                type="time"
                {...form.register("startTime")}
              />
              <Input
                id="end-time"
                placeholder="Hora de Fin"
                type="time"
                {...form.register("endTime")}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="quantity">
              Cantidad
            </Label>
            <Counter
              quantity={quantity}
              onChange={(newQuantity) => setQuantity(newQuantity)}
              maxQuantity={100}
              borderRadius="rounded-md" // Ensure consistency with other inputs
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
    </form>
  );
};

export default ProductInfoStep;

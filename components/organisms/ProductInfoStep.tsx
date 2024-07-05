"use client";

import { createRestaurantFirstStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { cx } from "class-variance-authority";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProductInfoStep = () => {
  const { register, handleSubmit, control } = useForm<
    z.infer<typeof createRestaurantFirstStepSchema>
  >({
    resolver: zodResolver(createRestaurantFirstStepSchema),
  });

  return (
    <div
      className={cx(
        "my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600",
      )}
    >
      {/* <div className="grid w-full grid-cols-1 gap-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label className="text-gray-700" htmlFor="product-type">
              Tipo de Producto
            </Label>
            <Controller
              name="productType"
              control={control}
              render={({ field }) => (
                <Select
                  disabled
                  onValueChange={field.onChange}
                  value={field.value || ProductType.SURPRISE}
                >
                  <SelectTrigger id="product-type" className="w-full">
                    <SelectValue placeholder="Bandeja Sorpresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={ProductType.SURPRISE}>
                        Bandeja Sorpresa
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
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
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />

              <Controller
                name="endTime"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      id="end-time"
                      placeholder="Hora de Fin"
                      type="time"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500">
                        {error.message}
                      </p>
                    )}
                  </>
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
      </div> */}
    </div>
  );
};

export default ProductInfoStep;

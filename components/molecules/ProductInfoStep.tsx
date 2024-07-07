"use client";

import { createRestaurantThirdStep } from "@/app/actions/restaurant/createRestaurant";
import { createRestaurantThirdStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType, Restaurant } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import AtomicSelect from "../atoms/AtomicSelect";
import MoneyInput from "../atoms/MoneyInput";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useStepper } from "../ui/stepper";
import { Textarea } from "../ui/textarea";
import Counter from "./Counter";

const PRODUCT_TYPE_OPTIONS = [
  { key: ProductType.SURPRISE, value: "Bandeja Sorpresa" },
];

type FormSchema = z.infer<typeof createRestaurantThirdStepSchema>;

const ProductInfoStep = () => {
  const { nextStep, stepData: restaurant } = useStepper<Restaurant>();

  const form = useForm<z.infer<typeof createRestaurantThirdStepSchema>>({
    resolver: zodResolver(createRestaurantThirdStepSchema),
    defaultValues: {
      restaurantId: restaurant?.id,
      productType: ProductType.SURPRISE,
      quantity: 1,
      startTime: "10:00",
      endTime: "18:00",
      regularPrice: 0,
      currentPrice: 0,
      description: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  console.log(errors);

  const { executeAsync, isExecuting } = useAction(createRestaurantThirdStep);

  const onSubmit = async (data: FormSchema) => {
    try {
      const response = await executeAsync(data);

      if (!response?.data?.success) {
        return;
      }

      const currentRestaurant = response?.data?.restaurant;

      nextStep(currentRestaurant);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600`}
        >
          <div className="grid w-full grid-cols-1 gap-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-gray-700" htmlFor="product-type">
                  Tipo de Producto
                </Label>
                <Controller
                  name="productType"
                  control={control}
                  render={({ field }) => (
                    <AtomicSelect
                      options={PRODUCT_TYPE_OPTIONS}
                      disabled
                      onValueChange={field.onChange}
                      value={field.value}
                      placeholder="Seleccione un tipo de producto"
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripcion</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe brevemente que contendra la bandeja sorpresa"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can <span>@mention</span> other users and
                        organizations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
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
                  name="regularPrice"
                  label="Precio regular"
                  placeholder="Ingresa el precio regular"
                />
              </div>
              <div className="grid gap-2">
                <MoneyInput
                  control={control}
                  name="currentPrice"
                  label="Precio actual"
                  placeholder="Ingresa el precio con descuento"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            size="sm"
            className="bg-green-600 px-4 py-2 text-white hover:bg-green-500"
            type="submit"
            isLoading={isExecuting}
          >
            Siguiente
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductInfoStep;

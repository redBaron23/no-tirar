"use client";

import { createRestaurantThirdStep } from "@/app/actions/restaurant/createRestaurant";
import FormInput from "@/components/atoms/form-inputs/FormInput";
import { createRestaurantThirdStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType, Restaurant } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormCounter from "../../../atoms/form-inputs/FormCounter";
import FormMoneyInput from "../../../atoms/form-inputs/FormMoneyInput";
import FormSelect from "../../../atoms/form-inputs/FormSelect";
import FormTextarea from "../../../atoms/form-inputs/FormTextarea";
import FormTimeInput from "../../../atoms/form-inputs/FormTimeInput";
import { Button } from "../../../ui/button";
import { Form } from "../../../ui/form";
import { Label } from "../../../ui/label";
import { useStepper } from "../../../ui/stepper";

const PRODUCT_TYPE_OPTIONS = [
  { key: ProductType.SURPRISE, value: "Bandeja Sorpresa" },
];

type FormSchema = z.infer<typeof createRestaurantThirdStepSchema>;

const ProductInfoStep = () => {
  const { nextStep, prevStep, stepData: restaurant } = useStepper<Restaurant>();

  const form = useForm<z.infer<typeof createRestaurantThirdStepSchema>>({
    resolver: zodResolver(createRestaurantThirdStepSchema),
    defaultValues: {
      restaurantId: restaurant?.id,
      type: ProductType.SURPRISE,
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
              <FormInput
                control={control}
                name="name"
                label="Nombre del producto"
                placeholder="Ingresa el nombre"
              />
              <FormSelect
                control={control}
                name="productType"
                label="Tipo de Producto"
                options={PRODUCT_TYPE_OPTIONS}
                placeholder="Seleccione un tipo de producto"
                disabled
              />
              <FormTextarea
                control={control}
                name="description"
                label="Descripcion"
                placeholder="Describe brevemente que contendra la bandeja sorpresa"
              />
              <div className="grid gap-2">
                <Label className="text-gray-700" htmlFor="time-range">
                  Franja horaria de pickup
                </Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormTimeInput
                    control={control}
                    name="startTime"
                    placeholder="Hora de Inicio"
                  />
                  <FormTimeInput
                    control={control}
                    name="endTime"
                    placeholder="Hora de Fin"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormCounter
                control={control}
                name="quantity"
                label="Cantidad"
                maxQuantity={100}
              />
              <FormMoneyInput
                control={control}
                name="regularPrice"
                label="Precio regular"
                placeholder="Ingresa el precio regular"
              />
              <FormMoneyInput
                control={control}
                name="currentPrice"
                label="Precio actual"
                placeholder="Ingresa el precio con descuento"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            size="sm"
            variant="outline"
            className="px-4 py-2 hover:bg-green-500"
            type="button"
            onClick={prevStep}
            disabled={isExecuting}
          >
            Anterior
          </Button>
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

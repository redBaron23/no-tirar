"use client";

import { createRestaurantSecondStep } from "@/app/actions/restaurant/createRestaurant";
import { createRestaurantSecondStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Restaurant } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormGoogleAddressInput from "../../atoms/form-inputs/FormGoogleAddressInput";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { Skeleton } from "../../ui/skeleton";
import { useStepper } from "../../ui/stepper";

type FormSchema = z.infer<typeof createRestaurantSecondStepSchema>;

interface Props {
  isLoaded: boolean;
}

const LocationStep = ({ isLoaded }: Props) => {
  const { nextStep, prevStep, stepData: restaurant } = useStepper<Restaurant>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(createRestaurantSecondStepSchema),
    defaultValues: {
      address: restaurant?.address || "",
      restaurantId: restaurant?.id,
    },
  });

  const { control, handleSubmit } = form;

  const { executeAsync, isExecuting } = useAction(createRestaurantSecondStep);

  const onSubmit = async (data: FormSchema) => {
    try {
      const response = await executeAsync(data);

      if (!response?.data?.success) {
        return;
      }

      const updatedRestaurant = response?.data?.restaurant;

      nextStep(updatedRestaurant);
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
          {isLoaded ? (
            <div className="grid w-full grid-cols-1 gap-8">
              <FormGoogleAddressInput
                control={control}
                name="address"
                label="Dirección del Establecimiento"
              />
            </div>
          ) : (
            <div className="flex w-full flex-col gap-3">
              <Skeleton className="h-8 w-1/4 rounded-xl" />
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-8 w-1/4 rounded-xl" />
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-8 w-1/4 rounded-xl" />
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-8 w-1/4 rounded-xl" />
              <Skeleton className="h-8 w-full rounded-xl" />
            </div>
          )}
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

export default LocationStep;

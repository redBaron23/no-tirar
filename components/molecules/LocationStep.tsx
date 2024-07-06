"use client";

import { createRestaurantSecondStep } from "@/app/actions/restaurant/createRestaurant";
import { createRestaurantSecondStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Restaurant } from "@prisma/client";
import { useLoadScript } from "@react-google-maps/api";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import GoogleAddressInput from "../atoms/GoogleAddressInput";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { useStepper } from "../ui/stepper";

type FormSchema = z.infer<typeof createRestaurantSecondStepSchema>;

const LocationStep = () => {
  const { nextStep, stepData } = useStepper<Restaurant>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(createRestaurantSecondStepSchema),
    defaultValues: {
      address: "",
    },
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries: ["places"],
  });

  const { executeAsync, isExecuting } = useAction(createRestaurantSecondStep);

  const onSubmit = async (data: FormSchema) => {
    try {
      const response = await executeAsync({
        ...data,
        restaurantId: stepData!.id,
      });
      const restaurant = response?.data?.restaurant;

      nextStep(restaurant);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600`}
      >
        {isLoaded ? (
          <div className="grid w-full grid-cols-1 gap-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-gray-700" htmlFor="name">
                  Nombre del Establecimiento
                </Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => <GoogleAddressInput {...field} />}
                />
                {errors.address && (
                  <span className="text-sm text-red-500">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </div>
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
          className="bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          type="submit"
          isLoading={isExecuting}
        >
          Siguiente
        </Button>
      </div>
    </form>
  );
};

export default LocationStep;

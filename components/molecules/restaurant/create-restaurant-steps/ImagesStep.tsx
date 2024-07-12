"use client";

import { createRestaurantImagesStep } from "@/app/actions/restaurant/createRestaurant";
import { createRestaurantImagesStepSchema } from "@/app/actions/restaurant/schemas";
import FormImageInput from "@/components/atoms/form-inputs/FormImageInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Restaurant } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../ui/button";
import { Form } from "../../../ui/form";
import { useStepper } from "../../../ui/stepper";

type FormSchema = z.infer<typeof createRestaurantImagesStepSchema>;

const ImagesStep = () => {
  const { nextStep, prevStep, stepData: restaurant } = useStepper<Restaurant>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(createRestaurantImagesStepSchema),
    defaultValues: {
      restaurantId: restaurant?.id,
      profileImage: restaurant?.profileImageUrl || undefined,
      backgroundImage: restaurant?.backgroundImageUrl || undefined,
    },
  });

  const { control, handleSubmit } = form;

  const { executeAsync, isExecuting } = useAction(createRestaurantImagesStep);

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

  console.log(restaurant?.profileImageUrl);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600`}
        >
          <div className="grid w-full grid-cols-1 gap-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormImageInput
                control={control}
                name="profileImage"
                label="Logo"
                type="profile"
                defaultUrl={restaurant?.profileImageUrl}
              />
              <FormImageInput
                control={control}
                name="backgroundImage"
                label="Imagen de fondo (opcional)"
                type="background"
                defaultUrl={restaurant?.backgroundImageUrl}
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

export default ImagesStep;

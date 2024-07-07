"use client";

import { createRestaurantSecondStep } from "@/app/actions/restaurant/createRestaurant";
import FormImageInput from "@/components/atoms/form-inputs/FormImageInput";
import { createRestaurantImagesStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Restaurant } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import { useStepper } from "../../ui/stepper";

type FormSchema = z.infer<typeof createRestaurantImagesStepSchema>;

const ImagesStep = () => {
  const { nextStep, stepData: restaurant } = useStepper<Restaurant>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(createRestaurantImagesStepSchema),
    defaultValues: {
      profileImage: null,
      backgroundImage: null,
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
          <div className="grid w-full grid-cols-1 gap-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormImageInput
                control={control}
                name="profileImage"
                label="Logo"
                type="profile"
              />
              <FormImageInput
                control={control}
                name="profileImage"
                label="Imagen de fondo"
                type="background"
              />
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

export default ImagesStep;

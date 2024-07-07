"use client";

import { createRestaurantFirstStep } from "@/app/actions/restaurant/createRestaurant";
import { createRestaurantFirstStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessType, ContactMethodType } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../atoms/form-inputs/FormInput";
import FormPhoneInput from "../atoms/form-inputs/FormPhoneInput";
import FormSelect from "../atoms/form-inputs/FormSelect";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useStepper } from "../ui/stepper";

const businessTypeOptions = [
  { key: BusinessType.BAKERY, value: "Panaderia" },
  { key: BusinessType.RESTAURANT_AND_CAFE, value: "Restaurant y Cafe" },
  { key: BusinessType.OTHER, value: "Others" },
];

const contactOptions = [
  { key: ContactMethodType.PHONE, value: "Telefono" },
  { key: ContactMethodType.WHATSAPP, value: "Whatsapp" },
  { key: ContactMethodType.EMAIL, value: "Email" },
];

type FormSchema = z.infer<typeof createRestaurantFirstStepSchema>;

const GeneralInfoStep = () => {
  const { nextStep, stepData: restaurant } = useStepper();
  const form = useForm<FormSchema>({
    resolver: zodResolver(createRestaurantFirstStepSchema),
    defaultValues: {
      type: restaurant?.type || BusinessType.RESTAURANT_AND_CAFE,
      contactMethod: restaurant?.contactMethod || ContactMethodType.WHATSAPP,
      name: restaurant?.name || "",
      phone: restaurant?.phone || "",
    },
  });

  const { control, handleSubmit } = form;

  const { executeAsync, isExecuting } = useAction(createRestaurantFirstStep);

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
        <div className="my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600">
          <div className="grid w-full grid-cols-1 gap-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormInput
                control={control}
                name="name"
                label="Nombre del Establecimiento"
                placeholder="Ingresa el nombre"
              />
              <FormSelect
                control={control}
                name="type"
                label="Tipo de negocio"
                options={businessTypeOptions}
                placeholder="Seleccione un tipo de negocio"
              />
              <FormSelect
                control={control}
                name="contactMethod"
                label="Metodo de Contacto"
                options={contactOptions}
                placeholder="Seleccione un metodo de contacto"
              />
              <FormPhoneInput
                control={control}
                name="phone"
                label="Telefono"
                placeholder="Ingresa el telefono"
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

export default GeneralInfoStep;

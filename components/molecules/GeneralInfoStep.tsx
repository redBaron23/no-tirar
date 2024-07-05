"use client";

import { createRestaurantFirstStep } from "@/app/actions/restaurant/createRestaurant";
import { createRestaurantFirstStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessType, ContactMethodType } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import AtomicSelect from "../atoms/AtomicSelect";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PhoneInput } from "../ui/phone-input";
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
  const { nextStep } = useStepper();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(createRestaurantFirstStepSchema),
    defaultValues: {
      type: BusinessType.RESTAURANT_AND_CAFE,
      contactMethod: ContactMethodType.WHATSAPP,
      name: "",
      phone: "",
    },
  });

  const { executeAsync, isExecuting } = useAction(createRestaurantFirstStep);

  const onSubmit = async (data: FormSchema) => {
    try {
      await executeAsync(data);
      nextStep();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600`}
      >
        <div className="grid w-full grid-cols-1 gap-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="name">
                Nombre del Establecimiento
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input id="name" placeholder="Ingresa el nombre" {...field} />
                )}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="businessType">
                Tipo de negocio
              </Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <AtomicSelect
                    options={businessTypeOptions}
                    disabled={false}
                    onValueChange={field.onChange}
                    value={field.value}
                    placeholder="Seleccione un tipo de negocio"
                  />
                )}
              />
              {errors.type && (
                <span className="text-sm text-red-500">
                  {errors.type.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="contactMethod">
                Metodo de Contacto
              </Label>
              <Controller
                name="contactMethod"
                control={control}
                render={({ field }) => (
                  <AtomicSelect
                    options={contactOptions}
                    disabled={false}
                    onValueChange={field.onChange}
                    value={field.value}
                    placeholder="Seleccione un metodo de contacto"
                  />
                )}
              />
              {errors.contactMethod && (
                <span className="text-sm text-red-500">
                  {errors.contactMethod.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-700" htmlFor="phone">
                Telefono
              </Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="phone"
                    placeholder="Ingresa el telefono"
                    defaultCountry="AR"
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <span className="text-sm text-red-500">
                  {errors.phone.message}
                </span>
              )}
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
  );
};

export default GeneralInfoStep;

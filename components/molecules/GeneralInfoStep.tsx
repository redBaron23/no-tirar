"use client";

import { createRestaurantFirstStep } from "@/app/actions/restaurant/createRestaurant";
import { createRestaurantFirstStepSchema } from "@/lib/validations/actions/restaurant/createRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadScript } from "@react-google-maps/api";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import AtomicSelect from "../atoms/AtomicSelect";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PhoneInput } from "../ui/phone-input";
import { Skeleton } from "../ui/skeleton";
import { useStepper } from "../ui/stepper";

const businessTypeOptions = [
  { key: "panaderia", value: "Panaderia" },
  { key: "restaurant-cafe", value: "Restaurant y Cafe" },
  { key: "other", value: "Others" },
];

const contactOptions = [
  { key: "phone", value: "Telefono" },
  { key: "whatsapp", value: "Whatsapp" },
  { key: "email", value: "Email" },
];

type FormSchema = z.infer<typeof createRestaurantFirstStepSchema>;

const GeneralInfoStep = () => {
  const { nextStep } = useStepper();
  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(createRestaurantFirstStepSchema),
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries: ["places"],
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
        {isLoaded ? (
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
                    <Input
                      id="name"
                      placeholder="Ingresa el nombre"
                      {...field}
                    />
                  )}
                />
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
                      value={field.value || businessTypeOptions[0].value}
                      placeholder="Seleccione un tipo de negocio"
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-700" htmlFor="businessType">
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
                      value={field.value || contactOptions[0].value}
                      placeholder="Seleccione un tipo de negocio"
                    />
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-700" htmlFor="name">
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
              </div>
              {/* <Label className="text-gray-700" htmlFor="address">
                  Dirección
                </Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <GoogleAddressInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                /> */}
            </div>
            {/* <div className="grid gap-6 md:grid-cols-2">
              <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <ImageInput
                    type="profile"
                    value={field.value}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                  />
                )}
              />
              <Controller
                name="backgroundImage"
                control={control}
                render={({ field }) => (
                  <ImageInput
                    type="background"
                    value={field.value}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                  />
                )}
              />
            </div> */}
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
        {/* <Button size="sm" variant="secondary" className="px-4 py-2">
          Anterior
        </Button> */}
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

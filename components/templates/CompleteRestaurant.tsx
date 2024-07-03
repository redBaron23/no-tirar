"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { Step, StepItem, Stepper } from "@/components/ui/stepper";
import { APP_NAME } from "@/constants";
import GeneralInfoStep from "@/components/molecules/GeneralInfoStep";
import ProductInfoStep from "@/components/organisms/ProductInfoStep";
import StepFooter from "../organisms/StepperFooter";
import { EstablishmentForm } from "@/types/forms/Establishment";
import { CreateRestaurantType } from "@/lib/validations/actions/restaurant/createRestaurant";

const steps = [
  { label: "Información General" },
  { label: "Productos" },
] satisfies StepItem[];

const CompleteEstablishment = () => {
  const form: UseFormReturn<CreateRestaurantType> =
    useForm<CreateRestaurantType>({
      defaultValues: {
        name: "",
        description: "",
        address: "",
        profileImage: null,
        backgroundImage: null,
        quantity: 1,
      },
    });

  // Without this submit, is failing
  const { control, handleSubmit } = form;
  const onSubmit = (data: CreateRestaurantType) => {};

  return (
    <div className="flex flex-col items-center px-4 pb-8 lg:px-0">
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-bold text-gray-800 lg:text-left">
            Configura tu establecimiento
          </h1>
          <p className="text-center text-lg text-gray-600 lg:text-left">
            Configura tu establecimiento para poder comenzar a usar {APP_NAME}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
          <Stepper orientation="vertical" initialStep={0} steps={steps}>
            {steps.map((stepProps, index) => (
              <Step key={stepProps.label} {...stepProps}>
                {index === 0 && <GeneralInfoStep control={control} />}
                {index === 1 && <ProductInfoStep control={control} />}
              </Step>
            ))}
            <StepFooter form={form} />
          </Stepper>
        </form>
      </div>
    </div>
  );
};

export default CompleteEstablishment;

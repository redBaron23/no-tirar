"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { Step, StepItem, Stepper } from "@/components/ui/stepper";
import { APP_NAME } from "@/constants";
import GeneralInfoStep from "@/components/molecules/GeneralInfoStep";
import ProductInfoStep from "@/components/organisms/ProductInfoStep";
import StepFooter from "../organisms/StepperFooter";

const steps = [
  { label: "Información General" },
  { label: "Productos" },
] satisfies StepItem[];

interface EstablishmentForm {
  name: string;
  address: string;
  profileImage: File | null;
  backgroundImage: File | null;
  productType: string;
  startTime: string;
  endTime: string;
  quantity: number;
  price: number;
}

const CompleteEstablishment = () => {
  const form: UseFormReturn<EstablishmentForm> = useForm<EstablishmentForm>({
    defaultValues: {
      name: "",
      address: "",
      profileImage: null,
      backgroundImage: null,
      productType: "bandeja-sorpresa",
      startTime: "",
      endTime: "",
      quantity: 1,
      price: 0,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: EstablishmentForm) => {
    console.log(data);
  };

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
                {index === 0 && (
                  <GeneralInfoStep hide={false} control={control} />
                )}
                {index === 1 && (
                  <ProductInfoStep hide={false} control={control} />
                )}
              </Step>
            ))}
            <StepFooter />
          </Stepper>
        </form>
      </div>
    </div>
  );
};

export default CompleteEstablishment;

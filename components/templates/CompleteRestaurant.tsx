"use client";

import { Step, StepItem, Stepper } from "@/components/ui/stepper";
import { APP_NAME } from "@/constants";
import GeneralInfoStep from "@/components/molecules/GeneralInfoStep";
import ProductInfoStep from "@/components/organisms/ProductInfoStep";
import StepFooter from "../organisms/StepperFooter";

const steps = [
  { label: "Información General" },
  { label: "Productos" },
] satisfies StepItem[];

const CompleteEstablishment = () => {
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
        <div className="pb-10">
          <Stepper orientation="vertical" initialStep={0} steps={steps}>
            {steps.map((stepProps, index) => {
              return (
                <Step key={stepProps.label} {...stepProps}>
                  {index === 0 && <GeneralInfoStep />}
                  {index === 1 && <ProductInfoStep />}
                </Step>
              );
            })}
            <StepFooter />
          </Stepper>
        </div>
      </div>
    </div>
  );
};

export default CompleteEstablishment;

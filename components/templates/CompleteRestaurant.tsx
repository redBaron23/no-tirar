"use client";

import { Button } from "@/components/ui/button";
import { Step, StepItem, Stepper, useStepper } from "@/components/ui/stepper";
import { APP_NAME } from "@/constants";
import GeneralInfoStep from "@/components/molecules/GeneralInfoStep";
import ProductInfoForm from "@/components/organisms/ProductInfoForm";

const steps = [
  { label: "Información General" },
  { label: "Productos" },
] satisfies StepItem[];

const CompleteEstablishment = () => {
  return (
    <div className="flex flex-col items-center pb-5">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Configura tu establecimiento
          </h1>
          <p className="text-gray-600">
            Configura tu establecimiento para poder comenzar a usar {APP_NAME}
          </p>
        </div>
        <div className="pb-10">
          <Stepper orientation="vertical" initialStep={0} steps={steps}>
            {steps.map((stepProps, index) => {
              return (
                <Step key={stepProps.label} {...stepProps}>
                  {index === 0 && <GeneralInfoStep />}
                  {index === 1 && <ProductInfoForm />}
                </Step>
              );
            })}
            <Footer />
          </Stepper>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="bg-secondary text-primary flex h-40 items-center justify-center rounded-md border">
          <h1 className="text-xl">¡Woohoo! ¡Todos los pasos completados! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reiniciar
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Anterior
            </Button>
            <Button
              size="sm"
              onClick={nextStep}
              className="bg-green-600 text-white"
            >
              {isLastStep
                ? "Finalizar"
                : isOptionalStep
                  ? "Saltar"
                  : "Siguiente"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default CompleteEstablishment;

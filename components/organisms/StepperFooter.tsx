"use client";

import { APP_NAME } from "@/constants";
import { Button } from "../ui/button";
import { useStepper } from "../ui/stepper";
import { useRouter } from "next/navigation";
import { pages } from "@/constants/pages";

const StepperFooter = () => {
  const {
    nextStep,
    prevStep,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  const router = useRouter();

  const handleEndStep = () => {
    router.push(pages.home);
  };

  const handleNextStep = () => {
    if (!isLastStep) {
      nextStep();
    }
  };

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="my-4 flex h-40 flex-col items-center justify-center gap-2 rounded-md border bg-secondary p-6 text-primary">
          <h1 className="text-xl font-semibold">
            ¡Todos los pasos han sido completados! 🎉
          </h1>
          <p className="text-md">Ya puedes comenzar a utilizar {APP_NAME}</p>
        </div>
      )}
      <div className="mt-4 flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button
            size="sm"
            onClick={handleEndStep}
            className="bg-green-600 px-4 py-2 hover:bg-green-500"
          >
            Comenzar
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
              className="px-4 py-2"
            >
              Anterior
            </Button>
            <Button
              size="sm"
              onClick={handleNextStep}
              className="bg-green-600 px-4 py-2 text-white hover:bg-green-500"
              type={isLastStep ? "submit" : "button"}
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

export default StepperFooter;

"use client";

import { APP_NAME } from "@/constants";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "../../../ui/button";
import { useStepper } from "../../../ui/stepper";

const SuccessStep = () => {
  const router = useRouter();
  const { hasCompletedAllSteps, stepData: restaurant } =
    useStepper<Restaurant>();

  if (!hasCompletedAllSteps) {
    return;
  }

  const handleFinish = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`my-4 flex h-full w-full max-w-3xl flex-col items-center justify-center rounded-md border bg-secondary p-4 text-gray-600`}
      >
        <div className="my-4 flex h-40 flex-col items-center justify-center gap-2 rounded-md bg-secondary p-6 text-primary">
          <h1 className="text-xl font-semibold">
            ¡Todos los pasos han sido completados! 🎉
          </h1>
          <p className="text-md">
            Ya puedes comenzar a utilizar {APP_NAME} con tu {restaurant?.name}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          size="sm"
          className="bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          type="button"
          onClick={handleFinish}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default SuccessStep;

"use client";

import { Step, StepItem, Stepper } from "@/components/ui/stepper";
import { APP_NAME } from "@/constants";
import { Restaurant } from "@prisma/client";
import { useJsApiLoader } from "@react-google-maps/api";
import GeneralInfoStep from "../molecules/GeneralInfoStep";
import LocationStep from "../molecules/LocationStep";
import ProductInfoStep from "../organisms/ProductInfoStep";

const steps = [
  { label: "Información General" },
  { label: "Ubicacion" },
  { label: "Productos" },
] satisfies StepItem[];

interface Props {
  restaurant: Restaurant;
}

const CompleteEstablishment = ({ restaurant }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
    libraries: ["places"],
  });

  return (
    <div className="flex flex-col items-center px-4 pb-8 lg:px-0">
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-bold text-gray-800 lg:text-left">
            Configura tu negocio
          </h1>
          <p className="text-center text-lg text-gray-600 lg:text-left">
            Configura tu negocio para poder comenzar a usar {APP_NAME}
          </p>
        </div>
        <div>
          <Stepper
            orientation="vertical"
            initialStep={0}
            steps={steps}
            stepData={restaurant}
          >
            {steps.map((stepProps, index) => (
              <Step key={stepProps.label} {...stepProps}>
                {index === 0 && <GeneralInfoStep />}
                {index === 1 && <LocationStep isLoaded={isLoaded} />}
                {index === 2 && <ProductInfoStep />}
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </div>
  );
};

export default CompleteEstablishment;

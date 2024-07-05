"use client";

import GeneralInfoStep from "@/components/molecules/GeneralInfoStep";
import { Step, StepItem, Stepper } from "@/components/ui/stepper";
import { APP_NAME } from "@/constants";

const steps = [
  { label: "Información General" },
  { label: "Productos" },
] satisfies StepItem[];

const CompleteEstablishment = () => {
  // const form: UseFormReturn<CreateRestaurantType> =
  //   useForm<CreateRestaurantType>({
  //     resolver: zodResolver(createRestaurantSchema),
  //     defaultValues: {
  //       name: "",
  //       description: "",
  //       address: "",
  //       profileImage: null,
  //       backgroundImage: null,
  //       quantity: 1,
  //       productType: ProductType.SURPRISE, // Default value set here
  //     },
  //   });

  // const { control, handleSubmit, formState } = form;
  // const onSubmit = (data: CreateRestaurantType) => {};

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
          <Stepper orientation="vertical" initialStep={0} steps={steps}>
            {steps.map((stepProps, index) => (
              <Step key={stepProps.label} {...stepProps}>
                {index === 0 && <GeneralInfoStep />}
                {/* {index === 1 && <ProductInfoStep />} */}
              </Step>
            ))}
            {/* <StepFooter form={form} /> */}
          </Stepper>
        </div>
      </div>
    </div>
  );
};

export default CompleteEstablishment;

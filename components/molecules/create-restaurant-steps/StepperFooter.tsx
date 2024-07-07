// "use client";

// import { APP_NAME } from "@/constants";
// import { Button } from "../ui/button";
// import { useStepper } from "../ui/stepper";
// import { useRouter } from "next/navigation";
// import { pages } from "@/constants/pages";
// import { UseFormReturn, useWatch } from "react-hook-form";
// import { useAction } from "next-safe-action/hooks";
// import { createRestaurant } from "@/app/actions/restaurant/createRestaurant";
// import { CreateRestaurantType } from "@/lib/validations/actions/restaurant/createRestaurant";
// import { useState, useEffect } from "react";

// interface StepperFooterProps {
//   form: UseFormReturn<CreateRestaurantType>;

// // Define the fields for each step
// const stepFields: Array<Array<keyof CreateRestaurantType>> = [
//   ["name", "description", "address", "profileImage", "backgroundImage"],
//   ["productType", "startTime", "endTime", "quantity", "price"],
// ];

// const StepperFooter = ({ form }: StepperFooterProps) => {
//   const { result, executeAsync, isExecuting, hasSucceeded } =
//     useAction(createRestaurant);

//   const {
//     nextStep,
//     prevStep,
//     hasCompletedAllSteps,
//     isLastStep,
//     isOptionalStep,
//     activeStep,
//   } = useStepper();
//   const router = useRouter();

//   const watchedFields = useWatch({
//     control: form.control,
//     name: stepFields[activeStep],
//   });

//   const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

//   useEffect(() => {
//     const checkFormValidity = async () => {
//       const results = await form.trigger(stepFields[activeStep]);
//       setIsNextButtonDisabled(!results);
//     };

//     checkFormValidity();
//   }, [watchedFields, form, activeStep]);

//   const handleEndStep = () => {
//     router.push(pages.home);
//   };

//   const handleNextStep = async () => {
//     const isValid = await form.trigger(stepFields[activeStep]);
//     if (!isValid) return;

//     if (!isLastStep) {
//       nextStep();
//       return;
//     }

//     const data = form.getValues();
//     console.log(data);

//     try {
//       await executeAsync(data);
//       hasSucceeded && nextStep();
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <>
//       {hasCompletedAllSteps && (
//         <div className="my-4 flex h-40 flex-col items-center justify-center gap-2 rounded-md border bg-secondary p-6 text-primary">
//           <h1 className="text-xl font-semibold">
//             ¡Todos los pasos han sido completados! 🎉
//           </h1>
//           <p className="text-md">
//             Ya puedes comenzar a utilizar {APP_NAME} con tu establecimiento{" "}
//             {result.data?.restaurant.name}
//           </p>
//         </div>
//       )}
//       <div className="mt-4 flex w-full justify-end gap-2">
//         {hasCompletedAllSteps ? (
//           <Button
//             size="sm"
//             onClick={handleEndStep}
//             className="bg-green-600 px-4 py-2 hover:bg-green-500"
//           >
//             Comenzar
//           </Button>
//         ) : (
//           <>
//             <Button
//               disabled={isExecuting || activeStep === 0}
//               onClick={prevStep}
//               size="sm"
//               variant="secondary"
//               className="px-4 py-2"
//             >
//               Anterior
//             </Button>
//             <Button
//               size="sm"
//               onClick={handleNextStep}
//               className="bg-green-600 px-4 py-2 text-white hover:bg-green-500"
//               isLoading={isExecuting}
//               disabled={isExecuting || isNextButtonDisabled}
//             >
//               {isLastStep
//                 ? "Finalizar"
//                 : isOptionalStep
//                   ? "Saltar"
//                   : "Siguiente"}
//             </Button>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default StepperFooter;

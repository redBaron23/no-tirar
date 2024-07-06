import * as React from "react";
import type { StepperProps } from "./types";

export interface StepperContextValue<T = any> extends StepperProps {
  clickable?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isVertical?: boolean;
  stepCount?: number;
  expandVerticalSteps?: boolean;
  activeStep: number;
  initialStep: number;
  stepData: T | null;
  nextStep: (data?: T) => void;
  prevStep: () => void;
  resetSteps: () => void;
  setStep: (step: number, data?: T) => void;
  updateStepData: (data: T) => void;
}

type StepperContextProviderProps<T> = {
  value: Omit<
    StepperContextValue<T>,
    | "activeStep"
    | "stepData"
    | "nextStep"
    | "prevStep"
    | "resetSteps"
    | "setStep"
    | "updateStepData"
  >;
  children: React.ReactNode;
};

const StepperContext = React.createContext<StepperContextValue>({
  steps: [],
  activeStep: 0,
  initialStep: 0,
  stepData: null,
  nextStep: () => {},
  prevStep: () => {},
  resetSteps: () => {},
  setStep: () => {},
  updateStepData: () => {},
});

function StepperProvider<T>({
  value,
  children,
}: StepperContextProviderProps<T>) {
  const isError = value.state === "error";
  const isLoading = value.state === "loading";

  const [activeStep, setActiveStep] = React.useState(value.initialStep);
  const [stepData, setStepData] = React.useState<T | null>(null);

  const nextStep = (data?: T) => {
    setActiveStep((prev) => prev + 1);
    if (data !== undefined) {
      setStepData(data);
    }
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const resetSteps = () => {
    setActiveStep(value.initialStep);
    setStepData(null);
  };

  const setStep = (step: number, data?: T) => {
    setActiveStep(step);
    if (data !== undefined) {
      setStepData(data);
    }
  };

  const updateStepData = (data: T) => {
    setStepData(data);
  };

  const contextValue: StepperContextValue<T> = {
    ...value,
    isError,
    isLoading,
    activeStep,
    stepData,
    nextStep,
    prevStep,
    resetSteps,
    setStep,
    updateStepData,
  };

  return (
    <StepperContext.Provider value={contextValue}>
      {children}
    </StepperContext.Provider>
  );
}

export { StepperContext, StepperProvider };

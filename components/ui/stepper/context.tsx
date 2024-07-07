import * as React from "react";
import { StepperProps } from "./types";

export interface StepperContextValue<T = any>
  extends Omit<StepperProps, "stepData"> {
  clickable?: boolean;
  activeStep: number;
  stepData?: T;
  nextStep: (data?: T) => void;
  prevStep: () => void;
  resetSteps: () => void;
  setStep: (step: number, data?: T) => void;
  updateStepData: (data: T) => void;
  isError?: boolean;
  isLoading?: boolean;
  isVertical?: boolean;
  stepCount?: number;
  expandVerticalSteps?: boolean;
  initialStep: number;
}

type StepperContextProviderProps<T> = {
  value: Omit<
    StepperContextValue<T>,
    | "activeStep"
    | "nextStep"
    | "prevStep"
    | "resetSteps"
    | "setStep"
    | "updateStepData"
  >;
  children: React.ReactNode;
};

const StepperContext = React.createContext<StepperContextValue<any>>({
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
  const [activeStep, setActiveStep] = React.useState(value.initialStep);
  const [stepData, setStepData] = React.useState<T | undefined>(
    value.stepData || undefined,
  );

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
    setStepData({} as T);
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

import * as React from "react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  className?: string;
}

export const Stepper = ({ steps, currentStep, completedSteps, className }: StepperProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = completedSteps.includes(step.number);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-start gap-4">
              {/* Step Circle and Connector */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 flex-shrink-0",
                    isActive &&
                      "bg-[#009688] text-white ring-4 ring-[#009688]/20 scale-110",
                    isCompleted &&
                      "bg-[#009688] text-white",
                    !isActive &&
                      !isCompleted &&
                      "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                {/* Vertical Connector Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 mt-2 transition-colors duration-300 min-h-[40px]",
                      completedSteps.includes(step.number + 1) || currentStep > step.number
                        ? "bg-[#009688]"
                        : "bg-gray-200"
                    )}
                  />
                )}
              </div>
              {/* Step Info */}
              <div className="flex-1 pt-2 pb-4">
                <p
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200 mb-1",
                    isActive && "text-[#009688]",
                    isCompleted && "text-[#009688]",
                    !isActive && !isCompleted && "text-gray-500"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

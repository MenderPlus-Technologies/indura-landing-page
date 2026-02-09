import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
  showBack?: boolean;
  showNext?: boolean;
  showSubmit?: boolean;
  className?: string;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSubmit,
  isNextDisabled = false,
  isSubmitting = false,
  showBack = true,
  showNext = true,
  showSubmit = false,
  className,
}: StepNavigationProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between pt-6 border-t border-[#dfe1e6]",
        className
      )}
    >
      <div className="flex-1">
        {showBack && currentStep > 1 && (
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="h-12 px-6 rounded-xl border border-[#dfe1e6] hover:bg-gray-50"
          >
            Back
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[#666d80]">
          Step {currentStep} of {totalSteps}
        </span>
        {showNext && currentStep < totalSteps && (
          <Button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            className="h-12 px-8 bg-[#009688] hover:bg-[#00897b] text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </Button>
        )}
        {showSubmit && currentStep === totalSteps && onSubmit && (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || isNextDisabled}
            className="h-12 px-8 bg-[#009688] hover:bg-[#00897b] text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

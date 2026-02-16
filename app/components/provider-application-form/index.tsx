"use client";
import React, { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSubmitProviderApplicationMutation } from "@/lib/api/apiSlice";
import type { ProviderApplicationRequest } from "@/lib/api/apiSlice";
import { getLGAsForState } from "@/lib/nigerian-states";
import { Stepper } from "./stepper";
import { StepNavigation } from "./step-navigation";
import { Step1ProviderBasics } from "./steps/step-1-provider-basics";
import { Step2LegalVerification } from "./steps/step-2-legal-verification";
import { Step3ContactPerson } from "./steps/step-3-contact-person";
import { Step4Services } from "./steps/step-4-services";
import { Step5Availability } from "./steps/step-5-availability";
import { Step6Review } from "./steps/step-6-review";
import {
  fullSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  type FullFormData,
} from "./step-schemas";

const STEPS = [
  { number: 1, title: "Provider Basics" },
  { number: 2, title: "Legal & Verification" },
  { number: 3, title: "Contact Person" },
  { number: 4, title: "Services" },
  { number: 5, title: "Availability" },
  { number: 6, title: "Review & Submit" },
];

export const ProviderApplicationForm = (): JSX.Element => {
  const router = useRouter();
  const [submitApplication, { isLoading }] = useSubmitProviderApplicationMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [availableLGAs, setAvailableLGAs] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward">("forward");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
    defaultValues: {
      serviceCategories: [],
      daysOpen: [],
      agreeToTerms: false,
      consentToVerification: false,
    },
  });

  const watchedState = watch("state");

  // Update LGAs when state changes
  useEffect(() => {
    if (watchedState) {
      const lgas = getLGAsForState(watchedState);
      setAvailableLGAs(lgas);
      // Reset LGA when state changes to allow fresh selection
      setValue("lga", "");
    } else {
      setAvailableLGAs([]);
      setValue("lga", "");
    }
  }, [watchedState, setValue]);

  // Step validation schemas
  const stepSchemas = [
    step1Schema,
    step2Schema,
    step3Schema,
    step4Schema,
    step5Schema,
    step6Schema,
  ];

  // Validate current step
  const validateStep = async (step: number): Promise<boolean> => {
    const schema = stepSchemas[step - 1];
    if (!schema) return true;

    const fieldsToValidate = Object.keys(schema.shape);
    const isValid = await trigger(fieldsToValidate as any);
    return isValid;
  };

  // Handle next step
  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCompletedSteps((prev) => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep];
        }
        return prev;
      });
      setTransitionDirection("forward");
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    } else {
      toast.error("Please complete all required fields before proceeding");
    }
  };

  // Handle back step
  const handleBack = () => {
    setTransitionDirection("backward");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Handle final submission
  const handleFinalSubmit = async () => {
    const isValid = await validateStep(6);
    if (!isValid) {
      toast.error("Please complete all required fields");
      return;
    }

    // Validate entire form
    const isFormValid = await trigger();
    if (!isFormValid) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: FullFormData) => {
    try {
      // Ensure all required fields are present
      if (!data.lga || data.lga.trim() === "") {
        toast.error("Please enter or select an LGA");
        return;
      }

      if (!data.documentUrl) {
        toast.error("Please upload a document before submitting");
        return;
      }

      const payload: ProviderApplicationRequest = {
        facilityName: data.facilityName,
        providerType: data.providerType,
        state: data.state,
        lga: data.lga,
        phoneNumber: data.phoneNumber,
        email: data.email,
        registrationNumber: data.registrationNumber,
        documentType: data.documentType,
        documentUrl: data.documentUrl,
        contactFullName: data.contactFullName,
        contactRole: data.contactRole,
        contactPhoneNumber: data.contactPhoneNumber,
        serviceCategories: data.serviceCategories,
        serviceDescription: data.serviceDescription || undefined,
        daysOpen: data.daysOpen,
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        agreeToTerms: data.agreeToTerms,
        consentToVerification: data.consentToVerification,
        // Backend requires this flag for validation
        declarationAccepted: true,
      };

      const result = await submitApplication(payload).unwrap();

      const successMessage =
        result.message ||
        "Your application has been submitted and is under review.";

      toast.success(successMessage);
      setIsSubmitted(true);
      reset();

      // Don't redirect, show success state instead
    } catch (error: unknown) {
      let errorMessage = "Failed to submit application. Please try again.";

      if (error && typeof error === "object" && "data" in error) {
        const apiError = error.data as {
          error?: string;
          message?: string;
          errors?: Record<string, string[]>;
        };
        if (apiError.message) {
          errorMessage = apiError.message;
        } else if (apiError.error) {
          errorMessage = apiError.error;
        } else if (apiError.errors) {
          const firstError = Object.values(apiError.errors)[0];
          if (Array.isArray(firstError) && firstError.length > 0) {
            errorMessage = firstError[0];
          }
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      console.error("Provider application error:", error);
    }
  };

  return (
    <section className="relative w-full plusJakarta bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Page Intro Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0d0d12] mb-4 leading-tight">
            Become an Indura Provider
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#666d80] max-w-2xl leading-relaxed mb-2">
            Apply to join Indura and start accepting health savings payments from
            customers near you.
          </p>
          <p className="text-sm sm:text-base text-[#666d80] opacity-75">
            This takes about 2–3 minutes.
          </p>
        </div>

        {/* Form Card */}
        <Card className="rounded-2xl border border-solid border-[#eceff3] shadow-[0px_2px_8px_-1px_#0d0d120a] bg-white">
          <CardContent className="p-6 md:p-8 lg:p-10">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                </div>
                <h2 className="text-2xl font-semibold text-[#0d0d12] mb-2">
                  Application Submitted
                </h2>
                <p className="text-[#666d80] max-w-md">
                  Your application has been submitted and is under review. We will
                  contact you shortly with an update.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                {/* Side Stepper Navigation */}
                <div className="hidden lg:block">
                  <div className="sticky top-8">
                    <Stepper
                      steps={STEPS}
                      currentStep={currentStep}
                      completedSteps={completedSteps}
                    />
                  </div>
                </div>

                {/* Step Content Column */}
                <div className="flex flex-col gap-8">
                  {/* Mobile Stepper - Top */}
                  <div className="lg:hidden mb-6">
                    <Stepper
                      steps={STEPS}
                      currentStep={currentStep}
                      completedSteps={completedSteps}
                    />
                  </div>

                  {/* Step Content with Transition */}
                  <div className="relative min-h-[400px] overflow-hidden">
                    <div
                      key={currentStep}
                      className={`transition-all duration-300 ease-in-out ${
                        transitionDirection === "forward"
                          ? "animate-[fadeInRight_0.3s_ease-in-out_forwards]"
                          : "animate-[fadeInLeft_0.3s_ease-in-out_forwards]"
                      }`}
                    >
                      {currentStep === 1 && (
                        <Step1ProviderBasics
                          register={register}
                          control={control}
                          watch={watch}
                          errors={errors}
                          availableLGAs={availableLGAs}
                          disabled={isSubmitted}
                        />
                      )}
                      {currentStep === 2 && (
                        <Step2LegalVerification
                          register={register}
                          control={control}
                          watch={watch}
                          errors={errors}
                          disabled={isSubmitted}
                          onUploadComplete={(url) => {
                            setValue("documentUrl", url);
                            trigger("documentUrl");
                          }}
                        />
                      )}
                      {currentStep === 3 && (
                        <Step3ContactPerson
                          register={register}
                          control={control}
                          errors={errors}
                          disabled={isSubmitted}
                        />
                      )}
                      {currentStep === 4 && (
                        <Step4Services
                          register={register}
                          control={control}
                          errors={errors}
                          disabled={isSubmitted}
                        />
                      )}
                      {currentStep === 5 && (
                        <Step5Availability
                          register={register}
                          control={control}
                          errors={errors}
                          disabled={isSubmitted}
                        />
                      )}
                      {currentStep === 6 && (
                        <Step6Review
                          control={control}
                          watch={watch}
                          errors={errors}
                          disabled={isSubmitted}
                        />
                      )}
                    </div>
                  </div>

                  {/* Step Navigation */}
                  <StepNavigation
                    currentStep={currentStep}
                    totalSteps={STEPS.length}
                    onNext={handleNext}
                    onBack={handleBack}
                    onSubmit={handleFinalSubmit}
                    isNextDisabled={isSubmitted}
                    isSubmitting={isLoading}
                    showBack={currentStep > 1}
                    showNext={currentStep < STEPS.length}
                    showSubmit={currentStep === STEPS.length}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

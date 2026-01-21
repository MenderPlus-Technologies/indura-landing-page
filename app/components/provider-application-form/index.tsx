"use client";
import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useSubmitProviderApplicationMutation } from "@/lib/api/apiSlice";
import type { ProviderApplicationRequest } from "@/lib/api/apiSlice";

// Validation schema
const providerApplicationSchema = z.object({
  facilityName: z.string().min(2, "Facility name must be at least 2 characters"),
  facilityType: z.string().min(2, "Facility type is required"),
  yearEstablished: z
    .number()
    .min(1800, "Year must be valid")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  contactPerson: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    role: z.string().min(2, "Role is required"),
  }),
  declarationAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the declaration",
  }),
});

type ProviderApplicationFormData = z.infer<typeof providerApplicationSchema>;

export const ProviderApplicationForm = (): JSX.Element => {
  const router = useRouter();
  const [submitApplication, { isLoading }] = useSubmitProviderApplicationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProviderApplicationFormData>({
    resolver: zodResolver(providerApplicationSchema),
    defaultValues: {
      declarationAccepted: false,
    },
  });

  const onSubmit = async (data: ProviderApplicationFormData) => {
    try {
      const payload: ProviderApplicationRequest = {
        ...data,
        yearEstablished: Number(data.yearEstablished),
      };

      const result = await submitApplication(payload).unwrap();

      // If unwrap() succeeds without throwing, the request was successful (200 status)
      // Use the API's message if provided, otherwise use default success message
      const successMessage = result.message || "Your application has been submitted successfully. Our team will review it and contact you shortly.";

      toast.success(successMessage);
      reset();

      // Redirect to home page after toast is shown (2 seconds delay to ensure toast is visible)
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: unknown) {
      let errorMessage = "Failed to submit application. Please try again.";

      if (error && typeof error === "object" && "data" in error) {
        const apiError = error.data as { error?: string; message?: string; errors?: Record<string, string[]> };
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Page Intro Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0d0d12] mb-4 leading-tight">
            Become an Indura Provider
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#666d80] max-w-2xl leading-relaxed mb-2">
            Apply to join Indura and start accepting health savings payments from customers near you.
          </p>
          <p className="text-sm sm:text-base text-[#666d80] opacity-75">
            This takes about 2–3 minutes.
          </p>
        </div>

        {/* Form Card */}
        <Card className="rounded-2xl border border-solid border-[#eceff3] shadow-[0px_2px_8px_-1px_#0d0d120a] bg-white">
          <CardContent className="p-6 md:p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 md:gap-12">
              {/* Facility Information Section */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 w-8 bg-[#009688] rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#0d0d12]">
                    Facility Information
                  </h2>
                </div>

                <div className="flex flex-col gap-5 pl-0 md:pl-11">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="facilityName" className="text-[#444] text-sm md:text-base font-medium">
                        Facility Name
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="facilityName"
                      placeholder="Enter facility name"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("facilityName")}
                    />
                    {errors.facilityName && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.facilityName.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="facilityType" className="text-[#444] text-sm md:text-base font-medium">
                        Facility Type
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="facilityType"
                      placeholder="e.g., Hospital, Clinic, Medical Center"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("facilityType")}
                    />
                    {errors.facilityType && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.facilityType.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="yearEstablished" className="text-[#444] text-sm md:text-base font-medium">
                        Year Established
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="yearEstablished"
                      type="number"
                      placeholder="e.g., 2010"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("yearEstablished", { valueAsNumber: true })}
                    />
                    {errors.yearEstablished && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.yearEstablished.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="description" className="text-[#444] text-sm md:text-base font-medium">
                        Description
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Describe your facility, services offered, and specialties"
                      className="h-[132px] px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] resize-none w-full transition-all"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.description.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Divider */}
              <div className="border-t border-[#dfe1e6]"></div>

              {/* Location Details Section */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 w-8 bg-[#009688] rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#0d0d12]">
                    Location Details
                  </h2>
                </div>

                <div className="flex flex-col gap-5 pl-0 md:pl-11">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="country" className="text-[#444] text-sm md:text-base font-medium">
                        Country
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="country"
                      placeholder="Enter country"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("country")}
                    />
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.country.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="state" className="text-[#444] text-sm md:text-base font-medium">
                        State/Province
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="state"
                      placeholder="Enter state or province"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("state")}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.state.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="city" className="text-[#444] text-sm md:text-base font-medium">
                        City
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("city")}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="address" className="text-[#444] text-sm md:text-base font-medium">
                        Address
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Textarea
                      id="address"
                      placeholder="Enter full address"
                      className="h-[100px] px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] resize-none w-full transition-all"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.address.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Divider */}
              <div className="border-t border-[#dfe1e6]"></div>

              {/* Contact Person Section */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 w-8 bg-[#009688] rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#0d0d12]">
                    Contact Person
                  </h2>
                </div>

                <div className="flex flex-col gap-5 pl-0 md:pl-11">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="contactPerson.fullName" className="text-[#444] text-sm md:text-base font-medium">
                        Full Name
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="contactPerson.fullName"
                      placeholder="Enter full name"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("contactPerson.fullName")}
                    />
                    {errors.contactPerson?.fullName && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.contactPerson.fullName.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="contactPerson.email" className="text-[#444] text-sm md:text-base font-medium">
                        Email
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="contactPerson.email"
                      type="email"
                      placeholder="example@email.com"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("contactPerson.email")}
                    />
                    {errors.contactPerson?.email && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.contactPerson.email.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="contactPerson.phone" className="text-[#444] text-sm md:text-base font-medium">
                        Phone
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="contactPerson.phone"
                      type="tel"
                      placeholder="08012345678"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("contactPerson.phone")}
                    />
                    {errors.contactPerson?.phone && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.contactPerson.phone.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="contactPerson.role" className="text-[#444] text-sm md:text-base font-medium">
                        Role/Position
                      </Label>
                      <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="contactPerson.role"
                      placeholder="e.g., Administrator, Medical Director"
                      className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
                      {...register("contactPerson.role")}
                    />
                    {errors.contactPerson?.role && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.contactPerson.role.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Divider */}
              <div className="border-t border-[#dfe1e6]"></div>

              {/* Declaration Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 pl-0 md:pl-11">
                  <input
                    type="checkbox"
                    id="declarationAccepted"
                    className="mt-1 w-4 h-4 text-[#009688] border-[#dfe1e6] rounded focus:ring-[#009688] focus:ring-2 cursor-pointer transition-all"
                    {...register("declarationAccepted", { required: true })}
                  />
                  <Label htmlFor="declarationAccepted" className="text-[#444] text-sm md:text-base font-medium cursor-pointer leading-relaxed">
                    I declare that the information provided is accurate and complete. I understand that false information may result in rejection of this application.
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                </div>
                {errors.declarationAccepted && (
                  <p className="text-red-500 text-xs ml-0 md:ml-14">{errors.declarationAccepted.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center w-full pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-[52px] cursor-pointer px-8 bg-[#009688] hover:bg-[#00897b] text-white font-semibold rounded-xl w-full sm:w-auto min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

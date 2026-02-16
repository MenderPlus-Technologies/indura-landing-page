import * as React from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSection } from "../form-section";
import { PROVIDER_TYPES, CONTACT_ROLES, SERVICE_CATEGORIES, DAYS_OF_WEEK } from "../constants";
import type { FullFormData } from "../step-schemas";

interface Step6Props {
  control: Control<FullFormData>;
  watch: UseFormWatch<FullFormData>;
  errors: any;
  disabled?: boolean;
}

export const Step6Review = ({ control, watch, errors, disabled = false }: Step6Props) => {
  const formData = watch();

  const getProviderTypeLabel = (value?: string) => {
    return value || "Not selected";
  };

  const getContactRoleLabel = (value?: string) => {
    return value || "Not selected";
  };

  const getServiceCategoryLabels = (values?: string[]) => {
    if (!values || values.length === 0) return "None selected";
    return values
      .map((val) => SERVICE_CATEGORIES.find((cat) => cat.value === val)?.label || val)
      .join(", ");
  };

  const getDaysOpenLabels = (values?: string[]) => {
    if (!values || values.length === 0) return "None selected";
    return values.join(", ");
  };

  const getDocumentTypeLabel = (value?: string) => {
    if (value === "operatingLicense") return "Operating License";
    if (value === "cacCertificate") return "CAC Certificate";
    return "Not selected";
  };

  return (
    <>
      {/* Review Summary */}
      <FormSection title="Review Your Application">
        <div className="space-y-6">
          {/* Provider Basics */}
          <div className="border-b border-[#dfe1e6] pb-4">
            <h4 className="font-semibold text-[#0d0d12] mb-3">Provider Basics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[#666d80]">Facility Name:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.facilityName || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-[#666d80]">Provider Type:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {getProviderTypeLabel(formData.providerType)}
                </span>
              </div>
              <div>
                <span className="text-[#666d80]">State:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.state || "Not provided"}
                </span>
              </div>
              {formData.lga && (
                <div>
                  <span className="text-[#666d80]">LGA:</span>
                  <span className="ml-2 text-[#0d0d12] font-medium">{formData.lga}</span>
                </div>
              )}
              <div>
                <span className="text-[#666d80]">Phone:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.phoneNumber || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-[#666d80]">Email:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.email || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Legal & Verification */}
          <div className="border-b border-[#dfe1e6] pb-4">
            <h4 className="font-semibold text-[#0d0d12] mb-3">Legal & Verification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[#666d80]">Registration Number:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.registrationNumber || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-[#666d80]">Document Type:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {getDocumentTypeLabel(formData.documentType)}
                </span>
              </div>
              <div>
                <span className="text-[#666d80]">Document:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.documentUrl ? (
                    <a
                      href={formData.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#009688] hover:underline"
                    >
                      View Document
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Person */}
          <div className="border-b border-[#dfe1e6] pb-4">
            <h4 className="font-semibold text-[#0d0d12] mb-3">Primary Contact Person</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[#666d80]">Full Name:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.contactFullName || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-[#666d80]">Role:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {getContactRoleLabel(formData.contactRole)}
                </span>
              </div>
              <div>
                <span className="text-[#666d80]">Phone Number:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.contactPhoneNumber || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="border-b border-[#dfe1e6] pb-4">
            <h4 className="font-semibold text-[#0d0d12] mb-3">Services Offered</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-[#666d80]">Service Categories:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {getServiceCategoryLabels(formData.serviceCategories)}
                </span>
              </div>
              {formData.serviceDescription && (
                <div>
                  <span className="text-[#666d80]">Description:</span>
                  <p className="mt-1 text-[#0d0d12]">{formData.serviceDescription}</p>
                </div>
              )}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="font-semibold text-[#0d0d12] mb-3">Availability</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[#666d80]">Days Open:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {getDaysOpenLabels(formData.daysOpen)}
                </span>
              </div>
              <div>
                <span className="text-[#666d80]">Hours:</span>
                <span className="ml-2 text-[#0d0d12] font-medium">
                  {formData.openingTime && formData.closingTime
                    ? `${formData.openingTime} - ${formData.closingTime}`
                    : "Not provided"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      {/* Agreement & Consent */}
      <FormSection title="Agreement & Consent">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="agreeToTerms"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={disabled}
                  error={!!errors.agreeToTerms}
                />
              )}
            />
            <Label
              htmlFor="agreeToTerms"
              className="text-[#444] text-sm md:text-base font-medium cursor-pointer leading-relaxed"
            >
              I agree to the terms and conditions
              <span className="text-red-500 ml-1">*</span>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-xs">{errors.agreeToTerms.message}</p>
          )}

          <div className="flex items-start gap-3">
            <Controller
              name="consentToVerification"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="consentToVerification"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={disabled}
                  error={!!errors.consentToVerification}
                />
              )}
            />
            <Label
              htmlFor="consentToVerification"
              className="text-[#444] text-sm md:text-base font-medium cursor-pointer leading-relaxed"
            >
              I consent to verification of the information provided
              <span className="text-red-500 ml-1">*</span>
            </Label>
          </div>
          {errors.consentToVerification && (
            <p className="text-red-500 text-xs">{errors.consentToVerification.message}</p>
          )}
        </div>
      </FormSection>
    </>
  );
};

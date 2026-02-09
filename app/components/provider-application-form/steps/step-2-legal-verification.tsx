import * as React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio } from "@/components/ui/radio";
import { FileInput } from "@/components/ui/file-input";
import { FormSection } from "../form-section";
import type { FullFormData } from "../step-schemas";

interface Step2Props {
  register: UseFormRegister<FullFormData>;
  control: Control<FullFormData>;
  errors: any;
  disabled?: boolean;
}

export const Step2LegalVerification = ({
  register,
  control,
  errors,
  disabled = false,
}: Step2Props) => {
  return (
    <FormSection title="Legal & Verification">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label
            htmlFor="registrationNumber"
            className="text-[#444] text-sm md:text-base font-medium"
          >
            Registration Number
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Input
          id="registrationNumber"
          placeholder="Enter registration number"
          className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
          {...register("registrationNumber")}
          disabled={disabled}
        />
        {errors.registrationNumber && (
          <p className="text-red-500 text-xs mt-0.5">{errors.registrationNumber.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label className="text-[#444] text-sm md:text-base font-medium">
            Document Type
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <div className="flex flex-col gap-3">
          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex items-center gap-2">
                  <Radio
                    id="operatingLicense"
                    value="operatingLicense"
                    checked={field.value === "operatingLicense"}
                    onChange={() => field.onChange("operatingLicense")}
                    disabled={disabled}
                    error={!!errors.documentType}
                  />
                  <Label htmlFor="operatingLicense" className="cursor-pointer font-normal">
                    Operating License
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="cacCertificate"
                    value="cacCertificate"
                    checked={field.value === "cacCertificate"}
                    onChange={() => field.onChange("cacCertificate")}
                    disabled={disabled}
                    error={!!errors.documentType}
                  />
                  <Label htmlFor="cacCertificate" className="cursor-pointer font-normal">
                    CAC Certificate
                  </Label>
                </div>
              </>
            )}
          />
        </div>
        {errors.documentType && (
          <p className="text-red-500 text-xs mt-0.5">{errors.documentType.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label
            htmlFor="documentUpload"
            className="text-[#444] text-sm md:text-base font-medium"
          >
            Document Upload
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Controller
          name="documentUpload"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <FileInput
              id="documentUpload"
              accept=".pdf,.jpg,.jpeg,.png"
              disabled={disabled}
              error={!!errors.documentUpload}
              {...field}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                }
              }}
            />
          )}
        />
        {errors.documentUpload && (
          <p className="text-red-500 text-xs mt-0.5">{errors.documentUpload.message}</p>
        )}
        <p className="text-xs text-[#666d80] mt-1">
          Upload either CAC certificate OR Operating License (one file only)
        </p>
        <p className="text-xs text-[#666d80]">
          Accepted formats: PDF, JPEG, PNG (Max 5MB)
        </p>
      </div>
    </FormSection>
  );
};

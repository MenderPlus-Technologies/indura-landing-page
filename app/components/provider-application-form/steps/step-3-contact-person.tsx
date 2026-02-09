import * as React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { FormSection } from "../form-section";
import { CONTACT_ROLES } from "../constants";
import type { FullFormData } from "../step-schemas";

interface Step3Props {
  register: UseFormRegister<FullFormData>;
  control: Control<FullFormData>;
  errors: any;
  disabled?: boolean;
}

export const Step3ContactPerson = ({
  register,
  control,
  errors,
  disabled = false,
}: Step3Props) => {
  return (
    <FormSection title="Primary Contact Person">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label
            htmlFor="contactFullName"
            className="text-[#444] text-sm md:text-base font-medium"
          >
            Full Name
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Input
          id="contactFullName"
          placeholder="Enter full name"
          className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
          {...register("contactFullName")}
          disabled={disabled}
        />
        {errors.contactFullName && (
          <p className="text-red-500 text-xs mt-0.5">{errors.contactFullName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label htmlFor="contactRole" className="text-[#444] text-sm md:text-base font-medium">
            Role
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Controller
          name="contactRole"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              placeholder="Select role"
              disabled={disabled}
              error={!!errors.contactRole}
              name={field.name}
              options={CONTACT_ROLES.map((role) => ({
                value: role,
                label: role,
              }))}
            />
          )}
        />
        {errors.contactRole && (
          <p className="text-red-500 text-xs mt-0.5">{errors.contactRole.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label
            htmlFor="contactPhoneNumber"
            className="text-[#444] text-sm md:text-base font-medium"
          >
            Phone Number
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Input
          id="contactPhoneNumber"
          type="tel"
          placeholder="08012345678"
          className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
          {...register("contactPhoneNumber")}
          disabled={disabled}
        />
        {errors.contactPhoneNumber && (
          <p className="text-red-500 text-xs mt-0.5">{errors.contactPhoneNumber.message}</p>
        )}
      </div>
    </FormSection>
  );
};

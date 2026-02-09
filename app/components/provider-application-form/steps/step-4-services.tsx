import * as React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "../form-section";
import { SERVICE_CATEGORIES } from "../constants";
import type { FullFormData } from "../step-schemas";

interface Step4Props {
  register: UseFormRegister<FullFormData>;
  control: Control<FullFormData>;
  errors: any;
  disabled?: boolean;
}

export const Step4Services = ({
  register,
  control,
  errors,
  disabled = false,
}: Step4Props) => {
  return (
    <FormSection title="Services Offered">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label className="text-[#444] text-sm md:text-base font-medium">
            Service Categories
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <div className="flex flex-col gap-3">
          {SERVICE_CATEGORIES.map((category) => (
            <div key={category.value} className="flex items-center gap-2">
              <Controller
                name="serviceCategories"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={category.value}
                    checked={field.value?.includes(category.value)}
                    onChange={(e) => {
                      const currentValue = field.value || [];
                      if (e.target.checked) {
                        field.onChange([...currentValue, category.value]);
                      } else {
                        field.onChange(currentValue.filter((v) => v !== category.value));
                      }
                    }}
                    disabled={disabled}
                    error={!!errors.serviceCategories}
                  />
                )}
              />
              <Label htmlFor={category.value} className="cursor-pointer font-normal">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.serviceCategories && (
          <p className="text-red-500 text-xs mt-0.5">{errors.serviceCategories.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label
            htmlFor="serviceDescription"
            className="text-[#444] text-sm md:text-base font-medium"
          >
            Service Description
          </Label>
        </div>
        <Textarea
          id="serviceDescription"
          placeholder="Describe the services you offer (optional)"
          className="h-[132px] px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] resize-none w-full transition-all"
          {...register("serviceDescription")}
          disabled={disabled}
        />
        {errors.serviceDescription && (
          <p className="text-red-500 text-xs mt-0.5">{errors.serviceDescription.message}</p>
        )}
      </div>
    </FormSection>
  );
};

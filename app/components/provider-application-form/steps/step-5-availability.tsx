import * as React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSection } from "../form-section";
import { DAYS_OF_WEEK } from "../constants";
import type { FullFormData } from "../step-schemas";

interface Step5Props {
  register: UseFormRegister<FullFormData>;
  control: Control<FullFormData>;
  errors: any;
  disabled?: boolean;
}

export const Step5Availability = ({
  register,
  control,
  errors,
  disabled = false,
}: Step5Props) => {
  return (
    <FormSection title="Availability">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label className="text-[#444] text-sm md:text-base font-medium">Days Open</Label>
          <span className="text-red-500">*</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="flex items-center gap-2">
              <Controller
                name="daysOpen"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={day}
                    checked={field.value?.includes(day)}
                    onChange={(e) => {
                      const currentValue = field.value || [];
                      if (e.target.checked) {
                        field.onChange([...currentValue, day]);
                      } else {
                        field.onChange(currentValue.filter((v) => v !== day));
                      }
                    }}
                    disabled={disabled}
                    error={!!errors.daysOpen}
                  />
                )}
              />
              <Label htmlFor={day} className="cursor-pointer font-normal text-sm">
                {day}
              </Label>
            </div>
          ))}
        </div>
        {errors.daysOpen && (
          <p className="text-red-500 text-xs mt-0.5">{errors.daysOpen.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Label htmlFor="openingTime" className="text-[#444] text-sm md:text-base font-medium">
              Opening Time
            </Label>
            <span className="text-red-500">*</span>
          </div>
          <Input
            id="openingTime"
            type="time"
            className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
            {...register("openingTime")}
            disabled={disabled}
          />
          {errors.openingTime && (
            <p className="text-red-500 text-xs mt-0.5">{errors.openingTime.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Label htmlFor="closingTime" className="text-[#444] text-sm md:text-base font-medium">
              Closing Time
            </Label>
            <span className="text-red-500">*</span>
          </div>
          <Input
            id="closingTime"
            type="time"
            className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
            {...register("closingTime")}
            disabled={disabled}
          />
          {errors.closingTime && (
            <p className="text-red-500 text-xs mt-0.5">{errors.closingTime.message}</p>
          )}
        </div>
      </div>
    </FormSection>
  );
};

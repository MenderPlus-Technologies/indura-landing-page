import * as React from "react";
import { Control, Controller, UseFormRegister, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { FormSection } from "../form-section";
import { PROVIDER_TYPES } from "../constants";
import { AFRICAN_COUNTRIES, isProviderCountryNigeria } from "@/lib/african-countries";
import { nigerianStates } from "@/lib/nigerian-states";
import type { FullFormData } from "../step-schemas";

interface Step1Props {
  register: UseFormRegister<FullFormData>;
  control: Control<FullFormData>;
  watch: UseFormWatch<FullFormData>;
  errors: any;
  availableLGAs: string[];
  disabled?: boolean;
}

export const Step1ProviderBasics = ({
  register,
  control,
  watch,
  errors,
  availableLGAs,
  disabled = false,
}: Step1Props) => {
  const watchedCountry = watch("country");
  const watchedState = watch("state");
  const isNigeria = isProviderCountryNigeria(watchedCountry);

  return (
    <FormSection title="Provider Basics">
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
          disabled={disabled}
        />
        {errors.facilityName && (
          <p className="text-red-500 text-xs mt-0.5">{errors.facilityName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label htmlFor="providerType" className="text-[#444] text-sm md:text-base font-medium">
            Provider Type
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Controller
          name="providerType"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              placeholder="Select provider type"
              disabled={disabled}
              error={!!errors.providerType}
              name={field.name}
              options={PROVIDER_TYPES.map((type) => ({
                value: type,
                label: type,
              }))}
            />
          )}
        />
        {errors.providerType && (
          <p className="text-red-500 text-xs mt-0.5">{errors.providerType.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label htmlFor="country" className="text-[#444] text-sm md:text-base font-medium">
            Country
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              placeholder="Select country"
              disabled={disabled}
              error={!!errors.country}
              name={field.name}
              options={AFRICAN_COUNTRIES.map((country) => ({
                value: country,
                label: country,
              }))}
            />
          )}
        />
        <p className="text-xs text-[#666d80]">
          Listing all African markets we support — pick where your facility operates.
        </p>
        {errors.country && (
          <p className="text-red-500 text-xs mt-0.5">{errors.country.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label
            htmlFor={isNigeria ? "state" : "state-region"}
            className="text-[#444] text-sm md:text-base font-medium"
          >
            {isNigeria ? "State" : "State / Province / Region"}
          </Label>
          <span className="text-red-500">*</span>
        </div>
        {isNigeria ? (
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                id="state"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select state"
                disabled={disabled}
                error={!!errors.state}
                name={field.name}
                options={nigerianStates.map((state) => ({
                  value: state,
                  label: state,
                }))}
              />
            )}
          />
        ) : (
          <Input
            id="state-region"
            placeholder="e.g. Greater Accra, Gauteng, Central Region"
            className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
            {...register("state")}
            disabled={disabled || !watchedCountry}
          />
        )}
        {!watchedCountry && (
          <p className="text-xs text-[#666d80]">Select a country first</p>
        )}
        {errors.state && (
          <p className="text-red-500 text-xs mt-0.5">{errors.state.message}</p>
        )}
      </div>

      {isNigeria ? (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Label htmlFor="lga" className="text-[#444] text-sm md:text-base font-medium">
              Local Government Area (LGA)
            </Label>
            <span className="text-red-500">*</span>
          </div>
          {availableLGAs.length > 0 ? (
            <Controller
              name="lga"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Select LGA"
                  disabled={disabled}
                  error={!!errors.lga}
                  name={field.name}
                  options={availableLGAs.map((lga) => ({
                    value: lga,
                    label: lga,
                  }))}
                />
              )}
            />
          ) : (
            <Input
              id="lga"
              placeholder={watchedState ? "Enter LGA name" : "Select state first"}
              className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
              {...register("lga")}
              disabled={disabled || !watchedState}
            />
          )}
          {errors.lga && <p className="text-red-500 text-xs mt-0.5">{errors.lga.message}</p>}
          {availableLGAs.length === 0 && watchedState && (
            <p className="text-xs text-[#666d80] mt-1">
              Enter your Local Government Area if it is not in the list
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Label htmlFor="lga" className="text-[#444] text-sm md:text-base font-medium">
              City / district
            </Label>
          </div>
          <Input
            id="lga"
            placeholder="Optional — e.g. East Legon, Sandton"
            className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
            {...register("lga")}
            disabled={disabled || !watchedCountry}
          />
          {errors.lga && <p className="text-red-500 text-xs mt-0.5">{errors.lga.message}</p>}
          <p className="text-xs text-[#666d80]">
            Helps patients find you; leave blank if not applicable.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label htmlFor="phoneNumber" className="text-[#444] text-sm md:text-base font-medium">
            Phone Number
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="+234 or local number"
          className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
          {...register("phoneNumber")}
          disabled={disabled}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-0.5">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <Label htmlFor="email" className="text-[#444] text-sm md:text-base font-medium">
            Email
          </Label>
          <span className="text-red-500">*</span>
        </div>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all"
          {...register("email")}
          disabled={disabled}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>
        )}
      </div>
    </FormSection>
  );
};

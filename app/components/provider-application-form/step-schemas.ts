import * as z from "zod";

// Step 1: Provider Basics
export const step1Schema = z.object({
  facilityName: z.string().min(2, "Facility name must be at least 2 characters"),
  providerType: z.enum(["Clinic", "Hospital", "Pharmacy", "Lab", "Gym", "Others"], {
    errorMap: () => ({ message: "Please select a provider type" }),
  }),
  state: z.string().min(1, "State is required"),
  lga: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
});

// Step 2: Legal & Verification
export const step2Schema = z.object({
  registrationNumber: z.string().min(1, "Registration number is required"),
  documentType: z.enum(["operatingLicense", "cacCertificate"], {
    errorMap: () => ({ message: "Please select a document type" }),
  }),
  documentUpload: z
    .instanceof(File, { message: "Please upload a document" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB")
    .refine(
      (file) => ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      "File must be PDF, JPEG, or PNG"
    ),
});

// Step 3: Primary Contact Person
export const step3Schema = z.object({
  contactFullName: z.string().min(2, "Full name must be at least 2 characters"),
  contactRole: z.enum(["Owner", "Medical Director", "Manager"], {
    errorMap: () => ({ message: "Please select a contact role" }),
  }),
  contactPhoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
});

// Step 4: Services Offered
export const step4Schema = z.object({
  serviceCategories: z
    .array(z.string())
    .min(1, "Please select at least one service category"),
  serviceDescription: z.string().optional(),
});

// Step 5: Availability
export const step5Schema = z
  .object({
    daysOpen: z.array(z.string()).min(1, "Please select at least one day"),
    openingTime: z.string().min(1, "Opening time is required"),
    closingTime: z.string().min(1, "Closing time is required"),
  })
  .refine((data) => data.openingTime < data.closingTime, {
    message: "Opening time must be before closing time",
    path: ["closingTime"],
  });

// Step 6: Agreement & Consent
export const step6Schema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
  consentToVerification: z.boolean().refine((val) => val === true, {
    message: "You must consent to verification",
  }),
});

// Combined schema for final validation
export const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;
export type Step6Data = z.infer<typeof step6Schema>;
export type FullFormData = z.infer<typeof fullSchema>;

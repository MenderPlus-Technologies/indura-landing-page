import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface ProviderApplicationRequest {
  facilityName: string;
  providerType: string;
  state: string;
  lga?: string;
  phoneNumber: string;
  email: string;
  registrationNumber: string;
  documentType: "operatingLicense" | "cacCertificate";
  documentUrl?: string;
  documentFile?: File | Blob;
  contactFullName: string;
  contactRole: string;
  contactPhoneNumber: string;
  serviceCategories: string[];
  serviceDescription?: string;
  daysOpen: string[];
  openingTime: string;
  closingTime: string;
  agreeToTerms: boolean;
  consentToVerification: boolean;
}

export type ApplicationStatus = "draft" | "submitted" | "approved" | "rejected";

export interface ProviderApplication {
  id: string;
  status: ApplicationStatus;
  facilityName: string;
  providerType: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface ProviderApplicationResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    facilityName: string;
    [key: string]: unknown;
  };
}

export interface ApiError {
  error?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

// Custom baseQuery wrapper to handle FormData properly
const baseQueryWithFormData = async (args: any, api: any, extraOptions: any) => {
  // Check if body is FormData - if so, don't set Content-Type
  const isFormData = args?.body instanceof FormData;
  
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Only set Content-Type for non-FormData requests
      // Browser will automatically set Content-Type with boundary for FormData
      if (!isFormData) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  })(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithFormData,
  tagTypes: ["ProviderApplication"],
  endpoints: (builder) => ({
    submitProviderApplication: builder.mutation<
      ProviderApplicationResponse,
      ProviderApplicationRequest
    >({
      query: (body) => {
        // If documentFile exists, use FormData, otherwise use JSON
        if (body.documentFile) {
          const formData = new FormData();
          formData.append("facilityName", body.facilityName);
          formData.append("providerType", body.providerType);
          formData.append("state", body.state);
          if (body.lga) formData.append("lga", body.lga);
          formData.append("phoneNumber", body.phoneNumber);
          formData.append("email", body.email);
          formData.append("registrationNumber", body.registrationNumber);
          formData.append("documentType", body.documentType);
          formData.append("documentFile", body.documentFile);
          formData.append("contactFullName", body.contactFullName);
          formData.append("contactRole", body.contactRole);
          formData.append("contactPhoneNumber", body.contactPhoneNumber);
          body.serviceCategories.forEach((cat) => {
            formData.append("serviceCategories[]", cat);
          });
          if (body.serviceDescription) {
            formData.append("serviceDescription", body.serviceDescription);
          }
          body.daysOpen.forEach((day) => {
            formData.append("daysOpen[]", day);
          });
          formData.append("openingTime", body.openingTime);
          formData.append("closingTime", body.closingTime);
          formData.append("agreeToTerms", String(body.agreeToTerms));
          formData.append("consentToVerification", String(body.consentToVerification));

          return {
            url: "/provider-applications",
            method: "POST",
            body: formData,
          };
        }

        // JSON payload without file
        const { documentFile, ...jsonBody } = body;
        return {
          url: "/provider-applications",
          method: "POST",
          body: jsonBody,
        };
      },
      invalidatesTags: ["ProviderApplication"],
    }),
  }),
});

export const { useSubmitProviderApplicationMutation } = apiSlice;

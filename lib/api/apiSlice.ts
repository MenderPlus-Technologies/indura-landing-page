import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface ProviderApplicationRequest {
  facilityName: string;
  facilityType: string;
  yearEstablished: number;
  description: string;
  country: string;
  state: string;
  city: string;
  address: string;
  contactPerson: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
  };
  declarationAccepted: boolean;
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

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    submitProviderApplication: builder.mutation<
      ProviderApplicationResponse,
      ProviderApplicationRequest
    >({
      query: (body) => ({
        url: "/provider-applications",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubmitProviderApplicationMutation } = apiSlice;

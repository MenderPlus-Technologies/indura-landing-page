import * as React from "react";
import { useState, useEffect } from "react";
import { Control, Controller, UseFormRegister, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio } from "@/components/ui/radio";
import { FileInput } from "@/components/ui/file-input";
import { FormSection } from "../form-section";
import type { FullFormData } from "../step-schemas";
import { toast } from "sonner";

interface Step2Props {
  register: UseFormRegister<FullFormData>;
  control: Control<FullFormData>;
  watch: UseFormWatch<FullFormData>;
  errors: any;
  disabled?: boolean;
  onUploadComplete?: (url: string) => void;
}

export const Step2LegalVerification = ({
  register,
  control,
  watch,
  errors,
  disabled = false,
  onUploadComplete,
}: Step2Props) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const documentUrl = watch("documentUrl");

  // Reset uploaded file name when documentUrl is cleared
  useEffect(() => {
    if (!documentUrl) {
      setUploadedFileName(null);
      setUploadError(null);
    }
  }, [documentUrl]);

  const handleFileUpload = async (file: File) => {
    // Central place to configure the backend field name for the uploaded file
    const fileFieldName =
      process.env.NEXT_PUBLIC_PROVIDER_DOC_FIELD_NAME || "document";
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError("File size must be less than 10MB");
      return;
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError("File must be PDF, JPEG, or PNG");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append(fileFieldName, file);
      formData.append("folder", "providers/documents");

      // Helpful debug: inspect FormData before sending
      // Note: FormData can't be logged directly in all browsers, so iterate entries
      // eslint-disable-next-line no-console
      console.log("[Step2LegalVerification] Uploading verification document with FormData:");
      for (const [key, value] of formData.entries()) {
        // eslint-disable-next-line no-console
        console.log(`  ${key}:`, value instanceof File ? `${value.name} (${value.type}, ${value.size} bytes)` : value);
      }

      const uploadBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const response = await fetch(`${uploadBaseUrl}/providers/verification-doc`, {
        method: "POST",
        body: formData,
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        // If the response is not JSON, fall back to a generic error
      }

      if (!response.ok || !result?.success) {
        const serverMessage =
          result?.error?.message ||
          result?.message ||
          (typeof result?.error === "string" ? result.error : null);

        const finalMessage =
          serverMessage ||
          "Failed to upload file. Please try again or contact support if the issue persists.";

        throw new Error(finalMessage);
      }

      const returnedUrl: string | undefined =
        result?.data?.url || result?.url || result?.secure_url;

      // Accept the API's actual success shape:
      // { success: true, message: "...", data: { url: "..." } }
      if (result.success && returnedUrl) {
        const rawUrl: string | undefined = returnedUrl;

        let viewUrl: string | undefined;

        // Use the returned URL directly, with small fixes for common issues
        if (rawUrl) {
          viewUrl = rawUrl;

          // Fix common filename issue (e.g. .pdf.pdf)
          if (viewUrl.endsWith(".pdf.pdf")) {
            viewUrl = viewUrl.replace(/\.pdf\.pdf$/, ".pdf");
          }

          // Cloudinary: PDFs often need to be served from /raw/upload/ not /image/upload/
          if (viewUrl.includes("/image/upload/") && /\.pdf(\?.*)?$/i.test(viewUrl)) {
            viewUrl = viewUrl.replace("/image/upload/", "/raw/upload/");
          }
        }

        if (!viewUrl) {
          throw new Error("Upload succeeded but no valid document URL was returned");
        }

        setUploadedFileName(file.name);
        onUploadComplete?.(viewUrl);
        toast.success("Document uploaded successfully");
      } else {
        throw new Error("Upload succeeded but no valid document URL was returned");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to upload file";
      setUploadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setUploadError(null);
    onUploadComplete?.("");
    // Reset the file input
    const fileInput = document.getElementById("documentUpload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

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
          name="documentUrl"
          control={control}
          render={({ field }) => (
            <>
              {!uploadedFileName && !documentUrl && (
                <FileInput
                  id="documentUpload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={disabled || uploading}
                  error={!!errors.documentUrl || !!uploadError}
                  onChange={handleFileChange}
                />
              )}
              {uploading && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-[10px] border border-blue-200">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  <span className="text-sm text-blue-700">Uploading document...</span>
                </div>
              )}
              {(uploadedFileName || documentUrl) && !uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-[10px] border border-green-200">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <svg
                        className="w-5 h-5 text-green-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-green-700 truncate">
                        {uploadedFileName || "Document uploaded"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        disabled={disabled}
                        className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {!disabled && (
                    <div className="relative">
                      <FileInput
                        id="documentUploadReplace"
                        accept=".pdf,.jpg,.jpeg,.png"
                        disabled={disabled || uploading}
                        error={!!errors.documentUrl || !!uploadError}
                        onChange={handleFileChange}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      />
                      <label
                        htmlFor="documentUploadReplace"
                        className="block w-full text-center text-sm text-[#009688] hover:text-[#00897b] font-medium cursor-pointer py-2 border border-[#009688] rounded-[10px] transition-colors"
                      >
                        Replace Document
                      </label>
                    </div>
                  )}
                </div>
              )}
              {uploadError && (
                <p className="text-red-500 text-xs mt-0.5">{uploadError}</p>
              )}
              {errors.documentUrl && (
                <p className="text-red-500 text-xs mt-0.5">{errors.documentUrl.message}</p>
              )}
            </>
          )}
        />
        <p className="text-xs text-[#666d80] mt-1">
          Upload either CAC certificate OR Operating License (one file only)
        </p>
        <p className="text-xs text-[#666d80]">
          Accepted formats: PDF, JPEG, PNG (Max 10MB)
        </p>
      </div>
    </FormSection>
  );
};

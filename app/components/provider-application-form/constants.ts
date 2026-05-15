// Provider types
export const PROVIDER_TYPES = [
  "Clinic",
  "Hospital",
  "Pharmacy",
  "Lab",
  "Gym",
  "Spa",
  "Others",
] as const;

// Contact roles
export const CONTACT_ROLES = ["Owner", "Medical Director", "Manager"] as const;

// Service categories
export const SERVICE_CATEGORIES = [
  { value: "consultation", label: "Consultation" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "labDiagnostics", label: "Lab Diagnostics" },
  { value: "maternalCare", label: "Maternal Care" },
  { value: "fitnessFacility", label: "Fitness Facility" },
] as const;

// Days of the week
export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

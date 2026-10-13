import { redirect } from "next/navigation";

/**
 * Historical route. The policy now lives at /privacy.
 */
export default function PrivacyPolicyPage() {
  redirect("/privacy");
}

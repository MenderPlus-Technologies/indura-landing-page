import { redirect } from "next/navigation";
import { INDURA_PRIVACY_POLICY_URL } from "@/lib/indura-legal-links";

/**
 * Historical route — full policy lives on Mender Plus. Keeps bookmarks and /privacy-policy working.
 */
export default function PrivacyPolicyPage() {
  redirect(INDURA_PRIVACY_POLICY_URL);
}

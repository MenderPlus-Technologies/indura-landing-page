import { AppStoreButtons } from "@/app/components/app-store-buttons";

export function CampaignGetAppBanner() {
  return (
    <section className="rounded-3xl border border-[#009688]/20 bg-[#f7fffd] p-5 sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#009688]">
        Get the app
      </p>
      <h2 className="mt-2 text-xl font-bold text-[#0d0d12] sm:text-2xl">
        Save, pay, and support care with Indura
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#666d80]">
        Download Indura to manage your health wallet, track campaigns, and send
        support securely from your phone.
      </p>
      <div className="mt-5 w-full max-w-md">
        <AppStoreButtons />
      </div>
    </section>
  );
}

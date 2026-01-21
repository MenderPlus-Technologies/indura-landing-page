import { MinimalNavbar } from "../components/minimal-navbar";
import { ProviderApplicationForm } from "../components/provider-application-form";

export default function BecomeAProviderPage() {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <MinimalNavbar />
      <main className="w-full flex flex-col">
        <ProviderApplicationForm />
      </main>
    </div>
  );
}

import FooterSection from "../components/footer";
import { InstitutionalPortalSection } from "../components/institutional-portal";
import { NavigationMenuSection } from "../components/navbar";

export default function InstitutionalPortalPage() {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <NavigationMenuSection />
      <main className="w-full flex flex-col">
        <InstitutionalPortalSection />
      </main>
      <FooterSection />
    </div>
  );
}

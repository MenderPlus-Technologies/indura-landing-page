import { BlogSection } from "./components/blog-section";
import { ContactCtaSection } from "./components/contact-cta";
import { EcosystemSection } from "./components/ecosystem-section";
import { FaqSection } from "./components/frequently-asked-question";
import { FinalCtaSection } from "./components/final-cta";
import FooterSection from "./components/footer";
import { HomePageShell } from "./components/home-page-shell";
import { InfrastructureSection } from "./components/infrastructure-section";
import { NavigationMenuSection } from "./components/navbar";
import { RevampHeroSection } from "./components/revamp-hero";
import { TrustBannerSection } from "./components/trust-banner";

export default function Homepage() {
  return (
    <HomePageShell>
      <div className="bg-white w-full min-h-screen relative">
        <NavigationMenuSection />

        <main className="flex flex-col w-full">
          <RevampHeroSection />
          <TrustBannerSection />
          <EcosystemSection />
          <InfrastructureSection />
          <BlogSection />
          <ContactCtaSection />
          <div id="faq">
            <FaqSection />
          </div>
          <FinalCtaSection />
        </main>

        <FooterSection />
      </div>
    </HomePageShell>
  );
}

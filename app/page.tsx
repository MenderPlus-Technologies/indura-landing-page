import { ContactCtaSection } from "./components/contact-cta";
import { FinalCtaSection } from "./components/final-cta";
import FooterSection from "./components/footer";
import { FaqSection } from "./components/frequently-asked-question";
import { HealthcareFeaturesSection } from "./components/health-care-features";
import { HealthFacilityActivationSection } from "./components/health-facility-activation";
import { InstitutionalPartnersSection } from "./components/institutional-partners";
import { HeroSection } from "./components/hero-section";
import { NavigationMenuSection } from "./components/navbar";
import { SmartHealthFinanceOverviewSection } from "./components/smart-health-section";
import { TestimonialsSection } from "./components/testimonial-section";

export default function Homepage() {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <NavigationMenuSection />

      <main className="flex flex-col w-full">
        <HeroSection />
        {/* Features section (linked from navbar/footer) */}
        <div id="features">
          <SmartHealthFinanceOverviewSection />
          <HealthcareFeaturesSection />
        </div>
        <TestimonialsSection />
        <div id="providers">
          <HealthFacilityActivationSection />
        </div>
        <InstitutionalPartnersSection />
        <ContactCtaSection />
        {/* FAQ section anchor */}
        <div id="faq">
          <FaqSection />
        </div>
        {/* Join waiting list / final CTA anchor */}
        <div id="join-waiting-list">
          <FinalCtaSection />
        </div>
      </main>
      <FooterSection />

    </div>
  );
}
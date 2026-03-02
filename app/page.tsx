import { ContactFormSection } from "./components/contact-form-section";
import { ContactUsSection } from "./components/contact-us";
import { CallToActionFooterSection } from "./components/cta-footer";
import { CallToActionWrapperSection } from "./components/cta-section";
import { CustomerTestimonialsSection } from "./components/customer-testimonials";
import { FrequentlyAskedQuestionsSection } from "./components/faq-section";
import { FeatureHighlightsSection } from "./components/features-highlight";
import { FinalCtaSection } from "./components/final-cta";
import FooterSection from "./components/footer";
import { FaqSection } from "./components/frequently-asked-question";
import { HealthcareFeaturesSection } from "./components/health-care-features";
import { HealthFacilityActivationSection } from "./components/health-facility-activation";
import { HeroBannerSection } from "./components/hero-banner-section";
import { HeroSection } from "./components/hero-section";
import { KeyFeaturesSection } from "./components/key-section-features";
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
        <HealthFacilityActivationSection />
        {/* FAQ section anchor */}
        <div id="faq">
          <FaqSection />
        </div>
        {/* Contact section anchor */}
        <div id="contact">
          <ContactUsSection />
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
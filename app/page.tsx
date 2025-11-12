import { ContactFormSection } from "./components/contact-form-section";
import { CallToActionFooterSection } from "./components/cta-footer";
import { CallToActionWrapperSection } from "./components/cta-section";
import { CustomerTestimonialsSection } from "./components/customer-testimonials";
import { FrequentlyAskedQuestionsSection } from "./components/faq-section";
import { FeatureHighlightsSection } from "./components/features-highlight";
import FooterSection from "./components/footer";
import { HeroBannerSection } from "./components/hero-banner-section";
import { KeyFeaturesSection } from "./components/key-section-features";
import { NavigationMenuSection } from "./components/navbar";

export default function Homepage() {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <NavigationMenuSection />

      <main className="w-full flex flex-col">
        <HeroBannerSection />
        <section id="features">
          <KeyFeaturesSection />
          <FeatureHighlightsSection />
        </section>
        <CustomerTestimonialsSection />
        <CallToActionFooterSection />
        <section id="faq">
          <FrequentlyAskedQuestionsSection />
        </section>
        <section id="contact">
          <ContactFormSection />
        </section>
        <section id="join-waiting-list">
          <CallToActionWrapperSection />
        </section>
        <FooterSection />
      </main>
    </div>
  );
}
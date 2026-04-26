import { ContactUsSection } from "../components/contact-us";
import FooterSection from "../components/footer";
import { NavigationMenuSection } from "../components/navbar";

export default function ContactPage() {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <NavigationMenuSection />
      <main className="w-full flex flex-col">
        <ContactUsSection />
      </main>
      <FooterSection />
    </div>
  );
}

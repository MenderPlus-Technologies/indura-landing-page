import { BlogPageContent } from "../components/blog-page-content";
import FooterSection from "../components/footer";
import { NavigationMenuSection } from "../components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Indura Health",
  description:
    "Insights and updates from the Indura Health ecosystem on healthcare fintech, emergency readiness, and accessible care in Africa.",
};

export default function BlogPage() {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <NavigationMenuSection />
      <main className="w-full flex flex-col">
        <BlogPageContent />
      </main>
      <FooterSection />
    </div>
  );
}

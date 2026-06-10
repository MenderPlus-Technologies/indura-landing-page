export type BlogPostIcon =
  | "newspaper"
  | "heart"
  | "book"
  | "zap"
  | "trending-up";

export type BlogPost = {
  category: string;
  title: string;
  description: string;
  href: string;
  icon: BlogPostIcon;
};

export const HOMEPAGE_BLOG_PREVIEW_COUNT = 3;

export const blogPosts: BlogPost[] = [
  {
    category: "Industry Insight",
    title:
      "Why Mender Plus Is Set to Be Africa's Next $1 Billion Healthtech Unicorn",
    description:
      "Indura combines health savings, emergency services, telehealth, and pharmacy access into one ecosystem built for scale across Africa.",
    href: "https://medium.com/@DavidBobaii/why-mender-plus-is-set-to-be-africas-next-1-billion-healthtech-unicorn-and-why-you-can-t-miss-ecedf265345b",
    icon: "trending-up",
  },
  {
    category: "Indura Health",
    title: "Indura Health Is the Bolt and Uber of Healthcare in Nigeria",
    description:
      "Like Bolt made transport usable inside a broken system, Indura is building access pathways through the healthcare that already exists.",
    href: "https://medium.com/@DavidBobaii/indura-health-is-the-bolt-and-uber-of-healthcare-in-nigeria-ec12fb3691d6",
    icon: "zap",
  },
  {
    category: "Founder Story",
    title:
      "The Story Behind Mender Plus: Turning a Personal Experience into a Lifesaving Solution",
    description:
      "How a family emergency became the mission behind Indura Health—a dedicated savings wallet that connects patients directly to care.",
    href: "https://medium.com/@DavidBobaii/the-story-behind-mender-plus-turning-a-personal-experience-into-a-lifesaving-solution-david-bobai-ba9751b66948",
    icon: "book",
  },
  {
    category: "Our Mission",
    title: "When It Matters Most: The Mission Behind Mender Plus",
    description:
      "Born in crisis, Mender Plus exists for the moments when seconds count and help must be fast, reliable, and human.",
    href: "https://medium.com/@DavidBobaii/when-it-matters-most-the-mission-behind-mender-plus-da2a3132b3b1",
    icon: "heart",
  },
  {
    category: "Healthcare Fintech",
    title:
      "How Healthcare Fintech Platforms Like Mender Plus Are Transforming Patient Payments in Africa",
    description:
      "Mender Plus is integrating technology, financial services, and healthcare delivery to make medical payments instant, transparent, and accessible.",
    href: "https://medium.com/@DavidBobaii/how-healthcare-fintech-platforms-like-mender-plus-are-transforming-patient-payments-and-services-in-e9e39c9eb5b1",
    icon: "newspaper",
  },
];

export const homepageBlogPosts = blogPosts.slice(0, HOMEPAGE_BLOG_PREVIEW_COUNT);

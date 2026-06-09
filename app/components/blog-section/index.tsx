import { blogPosts } from "@/lib/site-config";
import { BookOpen, Heart, Newspaper } from "lucide-react";
import { JSX } from "react";

const blogIcons = {
  newspaper: Newspaper,
  heart: Heart,
  book: BookOpen,
};

export const BlogSection = (): JSX.Element => {
  return (
    <section id="blog" className="plusJakarta py-16 md:py-24 lg:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-16">
        <div className="mb-10 md:mb-12">
          <h2 className="text-[#0d0d12] text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-3">
            Latest Insights &amp; Updates
          </h2>
          <p className="text-[#666d80] text-sm md:text-base">
            Updates from the Indura Health ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => {
            const Icon = blogIcons[post.icon];

            return (
              <a
                key={post.href}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-lg border border-[#eceff3] bg-white overflow-hidden transition-all hover:-translate-y-1 hover:border-[#009688]/40"
              >
                <div className="flex h-[180px] items-center justify-center border-b border-[#eceff3] bg-[#f7fffd]">
                  <Icon className="h-10 w-10 text-[#009688]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col grow p-6 md:p-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#009688] mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-[#0d0d12] text-lg font-semibold leading-snug mb-3 group-hover:text-[#009688] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#666d80] text-sm leading-relaxed grow mb-5">
                    {post.description}
                  </p>
                  <span className="text-sm font-semibold text-[#009688] mt-auto">
                    Read Article →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

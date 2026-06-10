import { BlogPostCard } from "@/app/components/blog-post-card";
import { blogPosts } from "@/lib/blog-posts";
import { JSX } from "react";

export const BlogPageContent = (): JSX.Element => {
  return (
    <section className="plusJakarta w-full px-4 sm:px-8 lg:px-10 xl:px-16 py-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 md:mb-14 max-w-3xl">
          <p className="font-semibold text-[#009688] text-sm sm:text-base mb-3">
            Blog
          </p>
          <h1 className="text-[#0d0d12] text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4">
            Insights &amp; Updates from Indura Health
          </h1>
          <p className="text-[#666d80] text-sm sm:text-base md:text-lg leading-relaxed">
            Stories on healthcare fintech, our mission, and the future of
            accessible care across Africa.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.href} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

import { BlogPostCard } from "@/app/components/blog-post-card";
import { homepageBlogPosts } from "@/lib/blog-posts";
import Link from "next/link";
import { JSX } from "react";

export const BlogSection = (): JSX.Element => {
  return (
    <section id="blog" className="plusJakarta py-16 md:py-24 lg:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-16">
        <div className="mb-10 md:mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[#0d0d12] text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-3">
              Latest Insights &amp; Updates
            </h2>
            <p className="text-[#666d80] text-sm md:text-base">
              Updates from the Indura Health ecosystem.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md border-2 border-[#009688] px-6 py-3 text-sm font-semibold text-[#009688] hover:bg-[#009688]/5 transition-colors w-full sm:w-auto shrink-0"
          >
            See More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {homepageBlogPosts.map((post) => (
            <BlogPostCard key={post.href} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

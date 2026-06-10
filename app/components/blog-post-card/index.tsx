import { BlogPost, BlogPostIcon } from "@/lib/blog-posts";
import {
  BookOpen,
  Heart,
  Newspaper,
  TrendingUp,
  Zap,
} from "lucide-react";
import { JSX } from "react";

const blogIcons: Record<BlogPostIcon, typeof Newspaper> = {
  newspaper: Newspaper,
  heart: Heart,
  book: BookOpen,
  zap: Zap,
  "trending-up": TrendingUp,
};

export function BlogPostCard({ post }: { post: BlogPost }): JSX.Element {
  const Icon = blogIcons[post.icon];

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-[#eceff3] bg-white overflow-hidden transition-all hover:-translate-y-1 hover:border-[#009688]/40 h-full"
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
}

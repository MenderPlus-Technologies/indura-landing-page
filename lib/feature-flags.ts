/**
 * Blog section and links are hidden in production until real posts are ready.
 * Set NEXT_PUBLIC_ENABLE_BLOG=true in production when blog posts go live.
 */
export const showBlogSection =
  process.env.NEXT_PUBLIC_ENABLE_BLOG === "true" ||
  process.env.NODE_ENV !== "production";

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/quem-somos", "/blog", "/contato"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const articles = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles];
}

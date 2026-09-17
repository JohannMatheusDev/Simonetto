import Image from "next/image";
import Link from "next/link";
import { readingMinutes, type Post } from "@/lib/posts";

export default function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-stone ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
        />
      </div>
      <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-mist">
        {post.category} · {readingMinutes(post)} min de leitura
      </p>
      <h3 className={`mt-3 font-medium leading-snug text-balance ${large ? "text-2xl md:text-3xl" : "text-xl"}`}>
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-mist">{post.excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
        Ler artigo
        <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
      </span>
    </Link>
  );
}

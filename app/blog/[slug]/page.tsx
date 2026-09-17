import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/blog/PostCard";
import CtaBanner from "@/components/CtaBanner";
import Eyebrow from "@/components/Eyebrow";
import { getPost, posts, readingMinutes, type PostBlock } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [post.cover],
    },
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    default:
      return <p>{block.text}</p>;
  }
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} image={post.cover}>
        <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-paper/60">
          {readingMinutes(post)} min de leitura
        </p>
      </PageHero>

      <article className="bg-paper">
        <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
          <p className="text-xl leading-relaxed text-ink md:text-2xl">{post.excerpt}</p>
          <div className="article mt-12">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-16 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
          >
            <span className="h-px w-6 bg-gold" />
            Voltar para o blog
          </Link>
        </div>
      </article>

      <section className="bg-stone">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <Eyebrow tone="muted">Leia também</Eyebrow>
          <div className="mt-12 grid gap-14 md:grid-cols-3 md:gap-8">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

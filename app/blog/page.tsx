import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/blog/PostCard";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dicas, guias e respostas sobre móveis planejados: por que investir, materiais, cozinhas e como funciona um projeto.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog Simonetto Guarapuava"
        title="Ideias para planejar *com segurança*"
        text="Guias e respostas para as dúvidas mais comuns de quem está pensando em investir em móveis planejados."
        image="/images/loja/living.jpg"
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <PostCard post={featured} large />
          </Reveal>

          <Reveal className="mt-24 grid gap-14 border-t border-ink/10 pt-20 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3" stagger={0.12}>
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

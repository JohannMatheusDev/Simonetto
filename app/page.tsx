import Image from "next/image";
import StoreTour from "@/components/home/StoreTour";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import Emphasis from "@/components/Emphasis";
import CountUp from "@/components/CountUp";
import ButtonLink from "@/components/ButtonLink";
import CtaBanner from "@/components/CtaBanner";
import PostCard from "@/components/blog/PostCard";
import { brandNumbers } from "@/lib/site";
import { posts } from "@/lib/posts";

const environments = [
  {
    title: "Cozinhas & gourmet",
    text: "Ilhas, torres quentes, adegas e armários que organizam a rotina e recebem bem.",
    image: "/images/loja/cozinha-ilha.jpg",
  },
  {
    title: "Salas & living",
    text: "Painéis, estantes e nichos iluminados que integram e valorizam o ambiente.",
    image: "/images/loja/living.jpg",
  },
  {
    title: "Escritórios & corporativo",
    text: "Espaços de trabalho funcionais, elegantes e pensados para cada equipe.",
    image: "/images/loja/sala-reuniao.jpg",
  },
];

export default function Home() {
  return (
    <>
      <StoreTour />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40">
          <Reveal>
            <Eyebrow tone="muted">Milimetricamente você</Eyebrow>
            <h2 className="mt-6 text-4xl font-light leading-[1.1] text-balance md:text-5xl">
              <Emphasis text="Móveis planejados que nascem da *sua* forma de viver" />
            </h2>
          </Reveal>
          <Reveal className="md:pt-14">
            <p className="text-lg leading-relaxed text-graphite">
              Há 40 anos a Simonetto transforma casas e empresas com marcenaria de alto padrão. Em
              Guarapuava, você encontra essa assinatura em um showroom completo, com projeto,
              acompanhamento e montagem feitos com precisão milimétrica.
            </p>
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10">
              {brandNumbers.map((item) => (
                <div key={item.label} className="flex flex-col-reverse border-t border-ink/10 pt-5">
                  <dt className="mt-2 text-sm text-mist">{item.label}</dt>
                  <dd className="text-3xl font-light md:text-4xl">
                    <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Eyebrow tone="muted">Ambientes</Eyebrow>
              <h2 className="mt-6 text-4xl font-light leading-[1.1] text-balance md:text-5xl">
                <Emphasis text="Projetos para *todos* os espaços da casa e da empresa" />
              </h2>
            </div>
            <p className="max-w-sm text-mist">
              Cozinhas, dormitórios, salas, banheiros, lavanderias, escritórios e ambientes corporativos.
            </p>
          </Reveal>

          <Reveal className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6" stagger={0.15}>
            {environments.map((item) => (
              <article key={item.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:grid-cols-[5fr_6fr] md:px-10 md:py-36">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/loja/fachada.jpg"
                alt="Fachada da Simonetto Guarapuava"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <Eyebrow>Quem somos</Eyebrow>
            <h2 className="mt-6 text-4xl font-light leading-[1.1] text-balance md:text-5xl">
              <Emphasis text="De Ampére para *Guarapuava*" />
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/70">
              A Simonetto nasceu no Sudoeste do Paraná e se tornou uma das indústrias de móveis planejados
              mais conceituadas do país. Conheça essa trajetória e as pessoas que trouxeram a marca para o
              centro de Guarapuava.
            </p>
            <div className="mt-10">
              <ButtonLink href="/quem-somos" variant="light">
                Conheça nossa história
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Eyebrow tone="muted">Blog</Eyebrow>
              <h2 className="mt-6 text-4xl font-light leading-[1.1] text-balance md:text-5xl">
                <Emphasis text="Por que investir em *móveis planejados*" />
              </h2>
            </div>
            <ButtonLink href="/blog" variant="dark">
              Ver todos os artigos
            </ButtonLink>
          </Reveal>

          <Reveal className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8" stagger={0.15}>
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

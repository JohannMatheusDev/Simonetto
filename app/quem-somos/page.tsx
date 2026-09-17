import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import Emphasis from "@/components/Emphasis";
import CountUp from "@/components/CountUp";
import CtaBanner from "@/components/CtaBanner";
import { brandNumbers, site, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "Conheça a história da Simonetto Móveis Planejados, nascida em Ampére-PR, e a equipe da Simonetto Guarapuava.",
};

// Fontes: simonetto.com.br/conheca-a-empresa e blog oficial "Simonetto: 30 anos de tradição e credibilidade"
const timeline = [
  {
    period: "O começo",
    title: "Uma família, a madeira e um sonho",
    text: "Em Ampére, no Sudoeste do Paraná, uma família que já trabalhava com extração de madeira decidiu investir na fabricação de móveis. O início foi rústico: faltava energia elétrica e a serraria era movida por uma locomotiva a vapor.",
  },
  {
    period: "Primeiros pedidos",
    title: "Cozinhas em cerejeira e marfim",
    text: "As cozinhas em cerejeira e marfim eram as mais pedidas. Com o tempo, os roupeiros chegaram ao catálogo e a marca começou a ganhar espaço.",
  },
  {
    period: "1991",
    title: "Os primeiros 2 mil m² de fábrica",
    text: "A construção dos primeiros dois mil metros quadrados do barracão marca o início da estrutura industrial da Simonetto.",
  },
  {
    period: "Anos 90",
    title: "A era da cozinha americana",
    text: "A cozinha americana se torna um dos grandes sucessos de pedidos, acompanhando as mudanças na forma de morar dos brasileiros.",
  },
  {
    period: "2014",
    title: "Milimetricamente Você",
    text: "Nasce o slogan que traduz a essência da marca: projetos com alto nível de personalização, pensados milímetro a milímetro.",
  },
  {
    period: "Hoje",
    title: "Indústria 4.0 e presença nacional",
    text: "Um parque fabril com mais de 50 mil m² operando sob os princípios da Indústria 4.0, cerca de 80 revendas em 17 estados e frota própria para levar cada projeto até o cliente.",
  },
];

const gallery = [
  { src: "/images/loja/fachada.jpg", alt: "Fachada da Simonetto Guarapuava" },
  { src: "/images/loja/cozinha.jpg", alt: "Cozinha com ilha e forro amadeirado" },
  { src: "/images/loja/sala-reuniao.jpg", alt: "Sala de reuniões com marcenaria verde" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Uma história feita *milímetro a milímetro*"
        text="Da fábrica em Ampére ao showroom no centro de Guarapuava: tradição, tecnologia e cuidado em cada detalhe."
        image="/images/loja/living-cozinha.jpg"
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-2 md:px-10 md:py-36">
          <Reveal>
            <Eyebrow tone="muted">A Simonetto</Eyebrow>
            <h2 className="mt-6 text-4xl font-light leading-[1.1] text-balance md:text-5xl">
              <Emphasis text="Mais que uma indústria, uma *fábrica de felicidade*" />
            </h2>
          </Reveal>
          <Reveal className="space-y-6 text-lg leading-relaxed text-graphite md:pt-14">
            <p>
              Há 40 anos no mercado moveleiro, a Simonetto se tornou uma das indústrias de móveis planejados
              mais conceituadas do país. Produz cozinhas, dormitórios, salas, banheiros, lavanderias,
              escritórios e ambientes corporativos com alto nível de personalização.
            </p>
            <p>
              A fábrica combina automação avançada, maquinário de última geração e processos integrados. O
              resultado são móveis em MDF, MDP, lacas e vidros feitos para durar e para traduzir a
              personalidade de quem vive neles.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-28 md:px-10 md:pb-36">
          <Reveal className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ink/10 pt-14 md:grid-cols-4">
            {brandNumbers.map((item) => (
              <div key={item.label}>
                <p className="text-4xl font-light md:text-5xl">
                  <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />
                </p>
                <p className="mt-3 text-sm text-mist">{item.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
          <Reveal className="max-w-2xl">
            <Eyebrow>Nossa trajetória</Eyebrow>
            <h2 className="mt-6 text-4xl font-light leading-[1.1] text-balance md:text-5xl">
              <Emphasis text="De uma serraria a *vapor* à Indústria 4.0" />
            </h2>
          </Reveal>

          <ol className="mt-20 border-l border-paper/15">
            {timeline.map((item) => (
              <li key={item.period} className="relative pb-16 pl-10 last:pb-0 md:pl-16">
                <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-gold" aria-hidden />
                <Reveal className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-12">
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold md:pt-2">
                    {item.period}
                  </p>
                  <div>
                    <h3 className="text-2xl font-light md:text-3xl">{item.title}</h3>
                    <p className="mt-4 max-w-2xl leading-relaxed text-paper/65">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-stone">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:grid-cols-2 md:px-10 md:py-36">
          <Reveal>
            <Eyebrow tone="muted">Simonetto Guarapuava</Eyebrow>
            <h2 className="mt-6 text-4xl font-light leading-[1.1] text-balance md:text-5xl">
              <Emphasis text="Quem está *por trás* da loja" />
            </h2>
          </Reveal>
          <Reveal className="space-y-6 text-lg leading-relaxed text-graphite md:pt-14">
            <p>
              A Simonetto Guarapuava leva a assinatura da fábrica de Ampére para o centro-sul do Paraná. No
              showroom da {site.address.street}, ambientes completos mostram na prática o que a marcenaria
              sob medida é capaz de fazer.
            </p>
            <p>
              A nova loja foi inaugurada em 16 de agosto, com mais de 80 convidados, entre eles arquitetos
              parceiros e o arquiteto Gabriel Fernandes, criador do espaço Casa Veredas Simonetto na Casa Cor
              São Paulo.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-28 md:px-10 md:pb-36">
          <Reveal className="grid gap-6 md:grid-cols-2" stagger={0.15}>
            {team.map((person, i) => (
              <article key={i} className="flex flex-col gap-8 bg-paper p-8 sm:flex-row md:p-10">
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-graphite sm:w-40">
                  {person.photo ? (
                    <Image src={person.photo} alt={person.name} fill sizes="160px" className="object-cover" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-paper/40">
                      Foto
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-mist">{person.role}</p>
                  <h3 className="mt-3 text-2xl font-light">{person.name}</h3>
                  <p className="mt-4 leading-relaxed text-graphite">{person.bio}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-10">
          <Reveal className="grid gap-6 md:grid-cols-3" stagger={0.15}>
            {gallery.map((photo) => (
              <div key={photo.src} className="relative aspect-[4/5] overflow-hidden bg-stone">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

import Image from "next/image";
import ButtonLink from "./ButtonLink";
import Emphasis from "./Emphasis";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { whatsappLink } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <Image src="/images/loja/cozinha.jpg" alt="" fill sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/75 to-ink/20" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <Reveal className="max-w-2xl">
          <Eyebrow>Visite o showroom</Eyebrow>
          <h2 className="mt-6 text-4xl font-light leading-[1.08] text-balance md:text-6xl">
            <Emphasis text="Venha viver a experiência *Simonetto*" />
          </h2>
          <p className="mt-6 text-paper/70 md:text-lg">
            Traga suas ideias, a planta do imóvel ou apenas a vontade de transformar um ambiente. A gente
            desenha junto com você.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={whatsappLink()} external>
              Agendar pelo WhatsApp
            </ButtonLink>
            <ButtonLink href="/contato" variant="light">
              Como chegar
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

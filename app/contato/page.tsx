import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Agende uma visita ao showroom Simonetto em Guarapuava: ${site.address.street}, ${site.address.district}.`,
};

const channels = [
  { label: "WhatsApp", value: site.whatsapp, href: whatsappLink(), external: true },
  { label: "Telefone", value: site.phone, href: `tel:+55${site.phone.replace(/\D/g, "")}` },
  { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { label: "Instagram", value: site.instagramHandle, href: site.instagram, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar sobre o *seu projeto*?"
        text="Agende uma visita ao showroom ou envie uma mensagem. Nossa equipe retorna o mais breve possível."
        image="/images/loja/sala-reuniao.jpg"
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 py-24 md:grid-cols-[3fr_2fr] md:px-10 md:py-32">
          <Reveal>
            <Eyebrow tone="muted">Envie uma mensagem</Eyebrow>
            <div className="mt-12">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal className="space-y-12">
            <div>
              <Eyebrow tone="muted">Showroom</Eyebrow>
              <address className="mt-6 text-lg not-italic leading-relaxed">
                {site.address.street}
                <br />
                {site.address.district}, {site.address.city} - {site.address.state}
                <br />
                CEP {site.address.zip}
              </address>
              <p className="mt-4 text-mist">{site.hours}</p>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
              >
                <span className="h-px w-6 bg-gold" />
                Abrir no Google Maps
              </a>
            </div>

            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center justify-between gap-6 py-5 transition-colors hover:text-gold"
                  >
                    <span className="text-[11px] uppercase tracking-[0.25em] text-mist">{channel.label}</span>
                    <span className="truncate text-right">{channel.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone">
        <MapEmbed />
      </section>
    </>
  );
}

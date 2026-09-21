"use client";

import { writeConsent } from "@/lib/consent";
import { site } from "@/lib/site";
import { useConsent } from "./useConsent";

// O mapa é um iframe do Google e grava cookies de terceiros assim que carrega, então
// ele só entra depois do aceite. Sem aceite mostramos o endereço e o link para abrir
// o Maps em outra aba, que não deixa cookie nenhum neste site.
export default function MapEmbed() {
  const consent = useConsent();

  if (consent === "accepted") {
    return (
      <iframe
        title="Mapa do showroom Simonetto Guarapuava"
        src={site.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[28rem] w-full grayscale"
        data-lenis-prevent
      />
    );
  }

  return (
    <div className="flex h-[28rem] w-full flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="max-w-md leading-relaxed text-mist">
        O mapa é carregado pelo Google e grava cookies no seu navegador. Aceite os cookies para
        vê-lo aqui ou abra direto no Google Maps.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => writeConsent("accepted")}
          className="rounded-full bg-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold hover:text-ink"
        >
          Aceitar e ver o mapa
        </button>
        <a
          href={site.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/20 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
        >
          Abrir no Google Maps
        </a>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { writeConsent } from "@/lib/consent";
import { useConsent } from "./useConsent";

// Aviso de cookies (LGPD). Aparece enquanto não houver escolha registrada.
// Enquanto isso, o mapa do Google e a medição ficam desligados (veja MapEmbed e
// Analytics): sem isso o aviso seria decoração, porque os cookies de terceiros já
// teriam sido gravados antes de o visitante clicar em qualquer coisa.
export default function CookieBanner() {
  const consent = useConsent();

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso sobre cookies"
      className="fixed inset-x-4 bottom-24 z-50 max-w-md rounded-sm border border-paper/10 bg-ink p-6 text-paper shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:inset-x-auto md:bottom-6 md:left-6"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold">Cookies</p>
      <p className="mt-4 text-sm leading-relaxed text-paper/70">
        Usamos armazenamento no seu navegador para lembrar esta escolha e, com a sua permissão,
        carregamos o mapa do Google e ferramentas de medição de visitas.{" "}
        <Link href="/politica-de-privacidade" className="text-paper underline underline-offset-4">
          Política de privacidade
        </Link>
        .
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => writeConsent("accepted")}
          className="rounded-full bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-light"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => writeConsent("declined")}
          className="px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-paper"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
